const FIREBASE_API_KEY = 'AIzaSyDlGfYkINIo-4ncILVOOMbfi7CaaCdjeZQ';
const PADDLE_PRICE_ID = 'pri_01m712sf83k938k09dn15jpj0n';
const IMAGE_LIMIT = 100;
const ACTIVE_STATUSES = new Set(['active', 'trialing']);
const locks = globalThis.__pixelCleanUsageLocks || (globalThis.__pixelCleanUsageLocks = new Map());

function json(res, status, body) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(body);
}

async function verifyFirebaseToken(token) {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ idToken: token }),
  });
  const payload = await response.json().catch(() => ({}));
  const user = payload?.users?.[0];
  if (!response.ok || !user?.localId || !user.email || user.emailVerified !== true) {
    const error = new Error('A verified email account is required.');
    error.status = 401;
    throw error;
  }
  return { uid: user.localId, email: String(user.email).trim().toLowerCase() };
}

async function paddleRequest(path, options = {}) {
  const apiKey = process.env.PADDLE_API_KEY;
  if (!apiKey) {
    const error = new Error('Paddle server API key is not configured.');
    error.status = 503;
    throw error;
  }
  const response = await fetch(`https://api.paddle.com${path}`, {
    ...options,
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error('Paddle API request failed', { status: response.status, requestId: data?.meta?.request_id || null });
    const error = new Error('Could not verify the subscription with Paddle.');
    error.status = 502;
    throw error;
  }
  return data;
}

async function findSubscription(user) {
  const customers = await paddleRequest(`/customers?email=${encodeURIComponent(user.email)}&per_page=100`);
  const customer = (customers.data || []).find((candidate) => candidate.email?.toLowerCase() === user.email);
  if (!customer) return null;

  const subscriptions = await paddleRequest(`/subscriptions?customer_id=${encodeURIComponent(customer.id)}&status=active,trialing&per_page=100`);
  return (subscriptions.data || []).find((subscription) => {
    const hasPlan = (subscription.items || []).some((item) => item.price?.id === PADDLE_PRICE_ID);
    const linkedUid = subscription.custom_data?.pixel_clean_uid;
    return hasPlan && ACTIVE_STATUSES.has(subscription.status) && linkedUid === user.uid;
  }) || null;
}

function usageSnapshot(subscription) {
  const period = subscription.current_billing_period;
  const periodKey = period?.starts_at || 'no-current-period';
  const data = subscription.custom_data || {};
  const used = data.pixel_clean_period_key === periodKey
    ? Math.max(0, Math.min(IMAGE_LIMIT, Number(data.pixel_clean_images_used) || 0))
    : 0;
  return {
    active: true,
    used,
    limit: IMAGE_LIMIT,
    remaining: Math.max(0, IMAGE_LIMIT - used),
    periodEndsAt: period?.ends_at || null,
    subscriptionId: subscription.id,
  };
}

async function reserve(subscription, user, amount) {
  const period = subscription.current_billing_period;
  if (!period?.starts_at || !period?.ends_at) {
    const error = new Error('The subscription has no active billing period.');
    error.status = 402;
    throw error;
  }
  const periodKey = period.starts_at;
  const data = subscription.custom_data || {};
  const currentUsed = data.pixel_clean_period_key === periodKey
    ? Math.max(0, Math.min(IMAGE_LIMIT, Number(data.pixel_clean_images_used) || 0))
    : 0;
  if (currentUsed + amount > IMAGE_LIMIT) {
    const error = new Error('The monthly image limit has been reached.');
    error.status = 429;
    error.usage = { active: true, used: currentUsed, limit: IMAGE_LIMIT, remaining: IMAGE_LIMIT - currentUsed, periodEndsAt: period.ends_at };
    throw error;
  }

  const nextData = {
    ...data,
    pixel_clean_uid: user.uid,
    pixel_clean_email: user.email,
    pixel_clean_period_key: periodKey,
    pixel_clean_period_ends_at: period.ends_at,
    pixel_clean_images_used: currentUsed + amount,
  };
  await paddleRequest(`/subscriptions/${encodeURIComponent(subscription.id)}`, {
    method: 'PATCH',
    body: JSON.stringify({ custom_data: nextData }),
  });
  return {
    active: true,
    used: currentUsed + amount,
    limit: IMAGE_LIMIT,
    remaining: IMAGE_LIMIT - currentUsed - amount,
    periodEndsAt: period.ends_at,
    subscriptionId: subscription.id,
  };
}

async function withSubscriptionLock(id, work) {
  const prior = locks.get(id) || Promise.resolve();
  let release;
  const current = new Promise((resolve) => { release = resolve; });
  const tail = prior.then(() => current);
  locks.set(id, tail);
  await prior;
  try { return await work(); }
  finally {
    release();
    if (locks.get(id) === tail) locks.delete(id);
  }
}

export default async function handler(req, res) {
  if (process.env.PIXEL_CLEAN_PAID_ACCESS !== 'true') {
    return json(res, 403, { error: 'Subscription metering is paused.' });
  }
  try {
    if (req.method !== 'GET' && req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return json(res, 405, { error: 'Method not allowed.' });
    }
    const authorization = String(req.headers.authorization || '');
    if (!authorization.toLowerCase().startsWith('bearer ')) return json(res, 401, { error: 'Sign in with a verified email to continue.' });
    const user = await verifyFirebaseToken(authorization.slice(7).trim());
    const subscription = await findSubscription(user);
    if (!subscription) return json(res, 200, { active: false, used: 0, limit: IMAGE_LIMIT, remaining: 0, email: user.email });
    if (req.method === 'GET') return json(res, 200, { ...usageSnapshot(subscription), email: user.email });

    const amount = Number(req.body?.count ?? 1);
    if (!Number.isInteger(amount) || amount < 1 || amount > IMAGE_LIMIT) return json(res, 400, { error: 'Request between 1 and 100 images.' });
    const usage = await withSubscriptionLock(subscription.id, async () => {
      const fresh = await paddleRequest(`/subscriptions/${encodeURIComponent(subscription.id)}`);
      if (!ACTIVE_STATUSES.has(fresh.data?.status)) {
        const error = new Error('An active subscription is required.');
        error.status = 402;
        throw error;
      }
      return reserve(fresh.data, user, amount);
    });
    return json(res, 200, { ...usage, email: user.email });
  } catch (error) {
    const status = Number(error?.status) || 500;
    if (status >= 500) console.error('Pixel Clean usage check failed', error?.message || 'unknown error');
    return json(res, status, { error: error?.message || 'Unable to check image allowance.', ...(error?.usage ? { usage: error.usage } : {}) });
  }
}
