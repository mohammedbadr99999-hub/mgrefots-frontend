const PRODUCTS = {
  creatine: { name: 'Creatine Monohydrate', price: 50000 },
  citrulline: { name: 'L-Citrulline', price: 40000 },
  czinc: { name: 'C-Zinc', price: 27000 },
  carnitine: { name: 'L-Carnitine', price: 22000 },
  milga: { name: 'Milga Advance', price: 50000 },
};

const clean = (value, max) => String(value ?? '').trim().slice(0, max);
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  if (clean(body.website, 200)) return res.status(200).json({ ok: true });

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 24);
  const city = clean(body.city, 80);
  const area = clean(body.area, 100);
  const street = clean(body.street, 160);
  const items = body.items;
  if (!name || !phone || !city || !area || !street || !Array.isArray(items) ||
      items.length < 1 || items.length > Object.keys(PRODUCTS).length ||
      !/^\+?[0-9\s().-]{7,24}$/.test(phone) ||
      new Set(items.map((item) => clean(item?.product, 30))).size !== items.length) {
    return res.status(400).json({ message: 'Check your contact, delivery and product details, then try again.' });
  }

  const normalizedItems = items.map((item) => ({
    product: PRODUCTS[clean(item?.product, 30)],
    quantity: Number(item?.quantity),
  }));
  if (normalizedItems.some((item) => !item.product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99)) {
    return res.status(400).json({ message: 'Check your contact, delivery and product details, then try again.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL || 'MGREFOTS Orders <orders@notifications.mgrefots.com>';
  const recipient = process.env.ORDER_NOTIFICATION_EMAIL || 'info@mgrefots.com';
  if (!apiKey) return res.status(503).json({ code: 'ORDER_EMAIL_NOT_CONFIGURED' });

  const total = normalizedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const orderId = `MG-${Date.now().toString(36).toUpperCase()}`;
  const productLines = normalizedItems.map((item) =>
    `${item.product.name} — ${item.quantity} bottle(s) × ${item.product.price.toLocaleString('en-US')} RWF = ${(item.quantity * item.product.price).toLocaleString('en-US')} RWF`
  );
  const fields = [
    ['Order ID', orderId], ['Order total', `${total.toLocaleString('en-US')} RWF`], ['Customer name', name],
    ['Phone', phone], ['City', city], ['Area / district', area], ['Street / building', street],
  ];
  const text = [...fields.map(([label, value]) => `${label}: ${value}`), '', 'Products:', ...productLines].join('\n');
  const html = `<h2>New MGREFOTS order request</h2><table>${fields.map(([label, value]) =>
    `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(label)}</th><td style="padding:6px">${escapeHtml(value)}</td></tr>`
  ).join('')}</table><h3>Products</h3><ul>${normalizedItems.map((item) =>
    `<li>${escapeHtml(item.product.name)} — ${item.quantity} bottle(s) × ${item.product.price.toLocaleString('en-US')} RWF = ${(item.quantity * item.product.price).toLocaleString('en-US')} RWF</li>`
  ).join('')}</ul><p>Contact the customer to confirm availability, delivery and payment.</p>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: sender, to: [recipient], subject: `New MGREFOTS order — ${orderId}`, text, html }),
    });
    if (!response.ok) {
      console.error('Order email provider rejected request:', response.status, await response.text());
      return res.status(502).json({ message: 'We could not deliver your order notification. Please try again or contact us on WhatsApp.' });
    }
    return res.status(200).json({ ok: true, orderId, total });
  } catch (error) {
    console.error('Order email delivery failed:', error);
    return res.status(502).json({ message: 'We could not deliver your order notification. Please try again or contact us on WhatsApp.' });
  }
}
