import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';
  const lang = ['en', 'ar', 'rw'].includes(req.body?.lang) ? req.body.lang : 'en';
  if (!prompt || prompt.length > 2000) return res.status(400).json({ error: 'Enter a question of up to 2000 characters.' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI service is not configured.' });
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an MGREFOTS educational assistant. Respond in ${lang === 'ar' ? 'Arabic' : lang === 'rw' ? 'Kinyarwanda' : 'English'}. Give careful, evidence-aware general information about supplements, nutrition and training. Do not claim to be a certified clinician or diagnose disease. Do not invent product properties or promise outcomes. For personal medical decisions suggest speaking with a qualified professional.`,
        maxOutputTokens: 1200,
      },
    });
    return res.status(200).json({ text: response.text || '' });
  } catch {
    return res.status(502).json({ error: 'AI service is temporarily unavailable.' });
  }
}
