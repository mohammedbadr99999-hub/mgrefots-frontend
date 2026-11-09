import fs from 'node:fs';
import path from 'node:path';

let portraitBuffer;

export default function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }

  try {
    if (!portraitBuffer) {
      const portraitPath = path.join(
        process.cwd(),
        'integration',
        'coachmohamedzeina',
        'portrait',
        'portrait.b64',
      );
      const encoded = fs.readFileSync(portraitPath, 'utf8').trim();
      if (!encoded) throw new Error('Portrait asset is missing');
      portraitBuffer = Buffer.from(encoded, 'base64');
    }

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    res.setHeader('Content-Length', portraitBuffer.length);
    return req.method === 'HEAD' ? res.status(200).end() : res.status(200).send(portraitBuffer);
  } catch (error) {
    console.error('Coach portrait asset unavailable', {
      name: error?.name || 'unknown',
    });
    return res.status(503).json({ error: 'Coach portrait is temporarily unavailable.' });
  }
}
