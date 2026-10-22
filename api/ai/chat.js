import { GoogleGenAI } from '@google/genai';
import { fitnessInstruction } from './fitness-method.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';
  const lang = ['en', 'ar', 'rw'].includes(req.body?.lang) ? req.body.lang : 'en';
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
    const code = providerStatus === 401 || providerStatus === 403 ? 'GEMINI_AUTH'
      : providerStatus === 429 ? 'GEMINI_LIMIT'
      : providerStatus === 404 ? 'GEMINI_MODEL'
      : providerStatus === 400 ? 'GEMINI_REQUEST' : 'GEMINI_UPSTREAM';
    console.error('Gemini chat request failed', { code, providerStatus });
    return res.status(502).json({ error: 'AI service is temporarily unavailable.', code });
  }
}
