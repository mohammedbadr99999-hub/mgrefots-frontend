import { createServerApp } from '../../integration/coachmohamedzeina/server.ts';

let appPromise;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    appPromise ??= createServerApp(false);
    const app = await appPromise;
    return app(req, res);
  } catch (error) {
    console.error('Coach Mohamed Zeina API initialization failed', {
      name: error?.name || 'unknown',
    });
    return res.status(500).json({
      status: 'error',
      code: 'SERVICE_INITIALIZATION_FAILED',
      message: 'The service is temporarily unavailable. Please try again.',
    });
  }
}
