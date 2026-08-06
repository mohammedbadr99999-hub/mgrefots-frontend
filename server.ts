import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  };

  // API Endpoints
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      const ai = getGeminiClient();
      
      if (!ai) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemInstruction ? `System instruction: ${systemInstruction}\n\n` : ""}${prompt}`,
        config: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("AI Chat error:", error);
      res.status(500).json({ error: error?.message || "AI generation failed" });
    }
  });

  app.post("/api/ai/analyze", async (req, res) => {
    try {
      const { goal, lang, fileBase64, mimeType } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }

      const languageStr = lang === "ar" ? "Arabic" : lang === "rw" ? "Kinyarwanda" : "English";
      const systemPrompt = `You are an ELITE bodybuilding coach with 13+ years of experience and NASM certification.
Analyze the user's InBody scan and goal: ${goal}.
Create an AGGRESSIVE, RESULT-DRIVEN, HIGH-VOLUME training & nutrition protocol.
Language: Respond ONLY in ${languageStr}.`;

      const contents: any[] = [{ text: systemPrompt }];
      if (fileBase64 && mimeType) {
        contents.push({
          inlineData: {
            mimeType,
            data: fileBase64
          }
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          maxOutputTokens: 4096,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("AI Analyze error:", error);
      res.status(500).json({ error: error?.message || "Analysis failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
