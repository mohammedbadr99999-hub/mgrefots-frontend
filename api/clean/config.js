const FIREBASE_API_KEY = 'AIzaSyDlGfYkINIo-4ncILVOOMbfi7CaaCdjeZQ';
const PRICE_ID = 'pri_01m712sf83k938k09dn15jpj0n';

export default function handler(_req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (process.env.PIXEL_CLEAN_PAID_ACCESS !== 'true') {
    return res.status(200).json({ accessMode: 'guest', billingConfigured: false });
  }
  res.status(200).json({
    accessMode: 'subscription',
    firebaseApiKey: FIREBASE_API_KEY,
    paddleClientToken: process.env.PADDLE_CLIENT_TOKEN || null,
    priceId: PRICE_ID,
    imageLimit: 100,
    billingInterval: 'month',
    billingConfigured: Boolean(process.env.PADDLE_CLIENT_TOKEN && process.env.PADDLE_API_KEY),
  });
}
