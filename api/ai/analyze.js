import { GoogleGenAI } from '@google/genai';

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const { goal, lang, fileBase64, mimeType } = req.body || {};
  if (typeof goal !== 'string' || !goal.trim() || goal.length > 500 ||
      typeof fileBase64 !== 'string' || fileBase64.length > 3_400_000 ||
      !/^[a-zA-Z0-9+/]+={0,2}$/.test(fileBase64) || !allowedTypes.has(mimeType)) {
    return res.status(400).json({ error: 'Provide a goal and an image or PDF smaller than 2.5 MB.' });
  }
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI service is not configured.' });
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { text: `Read only the measurements visible in this InBody report and explain them in relation to this goal: ${goal.trim()}. If values are unreadable or absent, say so. Give cautious general training and nutrition guidance without diagnoses or promises.` },
        { inlineData: { mimeType, data: fileBase64 } },
      ],
      config: {
        systemInstruction: `Respond in ${lang === 'ar' ? 'Arabic' : lang === 'rw' ? 'Kinyarwanda' : 'English'}. You are an educational assistant, not a clinician. Never invent measured values or credentials. Suggest professional assessment for medical concerns.`,
        maxOutputTokens: 1600,
      },
    });
    return res.status(200).json({ text: response.text || '' });
  } catch {
    return res.status(502).json({ error: 'AI analysis is temporarily unavailable.' });
  }
}
