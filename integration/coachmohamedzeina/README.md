# Coach Mohamed Zeina — MGREFOTS

The production-ready frontend is published under `/coachmohamedzeina/` from `public/coachmohamedzeina/`. Vercel rewrites the root route and nested page routes to the app entry while continuing to serve existing files such as JS, CSS, images, and the PWA service worker from that prefix.

The app intentionally opens without a login screen. Guest favorites, progress, and saved plan data are stored in the visitor's browser. The nutrition assistant calls the server-side Vercel function at `/api/nutrition/*`; its Gemini credential must remain in Vercel Project Environment Variables as `GEMINI_API_KEY` (Production and Preview as needed). Never put that value in frontend code, the public folder, or Git.

The app is not linked from the storefront homepage and its document is marked `noindex`. The URL is still public: anyone who has the link can open it. This is not access control.

The original editable AI Studio project remains available as the uploaded project archive. This folder contains the server integration and configuration used by the live deployment; the built frontend files are in the public directory above.
