import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { configured, correctPassword, hasSession, signInCookie, signOutCookie } from '../integration/maqaam/access.mjs';
import { loginPage } from '../integration/maqaam/login.mjs';

const require = createRequire(import.meta.url);
const runtime = path.join(process.cwd(), 'maqaam-runtime');
const actions = new Set(['adapt-script', 'generate-speech', 'generate-idea', 'kinyarwanda-convert', 'suggest-soundscape']);
const attempts = new Map();
let api;

function respond(res, status, body, type = 'text/html; charset=utf-8') {
  res.statusCode = status;
  res.setHeader('Content-Type', type);
  res.end(body);
}
function json(res, status, error) {
  respond(res, status, JSON.stringify({ error }), 'application/json; charset=utf-8');
}
function back(res, cookie) {
  res.setHeader('Set-Cookie', cookie);
  res.setHeader('Location', '/maqaam');
  res.statusCode = 303;
  res.end();
}
function originAllowed(req) {
  const origin = req.headers.origin;
  if (origin) {
    try {
      const parsed = new URL(origin);
      if (parsed.protocol === 'https:' && ['mgrefots.com', 'www.mgrefots.com'].includes(parsed.hostname) && !parsed.port) return true;
      if (process.env.VERCEL_URL && parsed.origin === 'https://' + process.env.VERCEL_URL) return true;
    } catch {}
  }
  const fetchSite = req.headers['sec-fetch-site'];
  const forwardedHost = String(req.headers['x-forwarded-host'] || req.headers.host || '')
    .split(',')[0].trim().toLowerCase().replace(/:\d+$/, '');
  const forwardedProtocol = String(req.headers['x-forwarded-proto'] || 'https')
    .split(',')[0].trim().toLowerCase();
  return fetchSite === 'same-origin' && forwardedProtocol === 'https' &&
    ['mgrefots.com', 'www.mgrefots.com'].includes(forwardedHost);
}
function loginLimited(ip) {
  const now = Date.now();
  if (attempts.size >= 2000) {
    for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
    if (attempts.size >= 2000 && !attempts.has(ip)) return true;
  }
  let entry = attempts.get(ip);
  if (!entry || entry.until <= now) {
    entry = { count: 0, until: now + 10 * 60_000 };
    attempts.set(ip, entry);
  }
  return ++entry.count > 8;
}
async function formPassword(req) {
  if (!req.headers['content-type']?.startsWith('application/x-www-form-urlencoded')) return null;
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body.password;
  let data = req.body ? String(req.body) : '';
  if (!data) for await (const chunk of req) {
    data += chunk;
    if (data.length > 4096) return null;
  }
  return new URLSearchParams(data).get('password');
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  const url = new URL(req.url, 'https://www.mgrefots.com');
  const route = url.pathname === '/maqaam' || url.pathname.startsWith('/maqaam/')
    ? url.pathname.slice('/maqaam'.length).replace(/^\//, '')
    : (url.searchParams.get('studioPath') || '');
  const home = route === '';
  const password = process.env.MAQAAM_OWNER_PASSWORD;
  if (req.method === 'POST' && !originAllowed(req)) return json(res, 403, 'مصدر الطلب غير مسموح.');
  try {
    if (req.method === 'POST' && route === 'logout') return back(res, signOutCookie());
    if (req.method === 'POST' && route === 'login') {
      if (!configured(password)) return respond(res, 503, loginPage('لم يكتمل إعداد دخول المالك على الاستضافة.'));
      const ip = String(req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0];
      if (loginLimited(ip)) return respond(res, 429, loginPage('محاولات كثيرة. حاول بعد عشر دقائق.'));
      if (!correctPassword(await formPassword(req), password)) return respond(res, 401, loginPage('كلمة المرور غير صحيحة.'));
      attempts.delete(ip);
      return back(res, signInCookie(password));
    }
    if (!hasSession(req.headers.cookie, password)) {
      if (home && (req.method === 'GET' || req.method === 'HEAD')) return respond(res, 200, loginPage());
      return json(res, 401, 'سجّل الدخول إلى مقام أولاً.');
    }
    if (route.startsWith('api/')) {
      if (!actions.has(route.slice(4))) return json(res, 404, 'المسار غير موجود.');
      if (req.method !== 'POST') return json(res, 405, 'طريقة الطلب غير مسموحة.');
      if (!(process.env.MAQAAM_GEMINI_API_KEY || process.env.GEMINI_API_KEY)) return json(res, 503, 'أضف مفتاح Gemini في إعدادات الاستضافة لتشغيل هذه الأداة.');
      if (!api) {
        const [{ default: express }, sdk] = await Promise.all([import('express'), import('@google/genai')]);
        api = require(path.join(runtime, 'api.cjs')).createStudioApi({ express, sdk });
      }
      req.url = '/' + route;
      return api(req, res);
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, 'طريقة الطلب غير مسموحة.');
    if (!home && !/^assets\/[A-Za-z0-9_.-]+\.(js|css)$/.test(route)) return json(res, 404, 'المسار غير موجود.');
    const data = await readFile(path.join(runtime, 'ui', home ? 'index.html' : route));
    const mime = home ? 'text/html' : route.endsWith('.css') ? 'text/css' : 'text/javascript';
    return respond(res, 200, req.method === 'HEAD' ? undefined : data, mime + '; charset=utf-8');
  } catch (error) {
    if (error.code === 'ENOENT' && route.startsWith('assets/')) return json(res, 404, 'الملف غير موجود.');
    return json(res, 503, 'تعذّر تحميل الاستوديو. راجع إعدادات نشر مقام على الاستضافة.');
  }
}
