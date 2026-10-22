import { GoogleGenAI } from '@google/genai';
import { fitnessInstruction } from './fitness-method.js';

function classifyGeminiError(error) {
  const status = Number(error?.status) || 0;
  // The SDK puts Google's JSON error body in `message`. Read only known
  // reason codes so the response and logs never contain credentials or prompts.
  const message = String(error?.message || '');
  if (/API_KEY_INVALID|API key not valid|invalid API key/i.test(message)) return 'GEMINI_KEY_INVALID';
  if (/API_KEY_HTTP_REFERRER_BLOCKED|API_KEY_SERVICE_BLOCKED|API_KEY_IP_ADDRESS_BLOCKED/i.test(message)) return 'GEMINI_KEY_RESTRICTED';
  if (status === 402 || /BILLING_DISABLED|billing account/i.test(message)) return 'GEMINI_BILLING';
  if (status === 401 || status === 403) return 'GEMINI_AUTH';
  if (status === 429) return 'GEMINI_LIMIT';
  if (status === 404) return 'GEMINI_MODEL';
  if (status === 400) return 'GEMINI_REQUEST';
  if (status >= 400 && status <= 599) return `GEMINI_HTTP_${status}`;
  if (!status && /fetch failed|network|timeout|ETIMEDOUT|ECONNRESET|ENOTFOUND/i.test(message)) return 'GEMINI_NETWORK';
  if (!status) return 'GEMINI_RUNTIME';
  return 'GEMINI_UPSTREAM';
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';
  const selectedLang = ['en', 'ar', 'rw'].includes(req.body?.lang) ? req.body.lang : 'en';
  // Visitors may ask in Arabic while the storefront language is still English.
  const lang = /[\u0600-\u06ff]/u.test(prompt) ? 'ar' : selectedLang;
  if (!prompt || prompt.length > 2000) return res.status(400).json({ error: 'Enter a question of up to 2000 characters.' });
  const history = req.body?.history ?? [];
  if (!Array.isArray(history) || history.length > 8 ||
      history.some(item => !item || !['user', 'model'].includes(item.role) ||
        typeof item.text !== 'string' || item.text.length > 1200 || !item.text.trim())) {
    return res.status(400).json({ error: 'Invalid conversation history.' });
  }
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI service is not configured.', code: 'CONFIG_MISSING' });
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [...history.map(item => ({ role: item.role, parts: [{ text: item.text }] })),
        { role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: fitnessInstruction(lang),
        temperature: 0.3,
        maxOutputTokens: 1100,
      },
    });
    return res.status(200).json({ text: response.text || '' });
  } catch (error) {
    const providerStatus = Number(error?.status) || 0;
    const code = classifyGeminiError(error);
    console.error('Gemini chat request failed', { code, providerStatus, errorName: error?.name || 'unknown' });
    return res.status(502).json({ error: 'AI service is temporarily unavailable.', code });
  }
}
