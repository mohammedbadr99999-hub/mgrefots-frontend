<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/da44866f-5d48-4564-b742-9b2ea17d80ff

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Order form email delivery

The `/order` page validates the five supported products and their prices in `api/orders.js`. To deliver new-order notifications, configure these Vercel Production environment variables:

- `RESEND_API_KEY` — a Resend API key with permission to send email.
- `RESEND_FROM_EMAIL` — a sender address on a domain verified with Resend, for example `MGREFOTS Orders <orders@mgrefots.com>`.
- `ORDER_NOTIFICATION_EMAIL` — optional; defaults to `info@mgrefots.com`.

After adding the variables, redeploy the Vercel project. Until then the form displays a message directing customers to WhatsApp. This form records an order request; it does not charge the customer. The team confirms payment and delivery with the customer.

## Additional pages restored from the earlier Sports Nutrition project

The current storefront and `/order` checkout remain the source of truth for the five current products, prices, photos, and displayed ratings. `/explore` links to a product catalogue, product details, knowledge center, FAQ, supplement encyclopedia, InBody upload, AI chat, expanded about and contact pages. Older protein and B-Complex listings are enquiry-only and cannot be added to checkout. Older content is in `src/legacy/data`; review its health claims and references before publishing.

To activate AI chat and InBody analysis, set `GEMINI_API_KEY` in Vercel Production and redeploy. Without it, the endpoints return 503 and the page directs visitors to WhatsApp. The API never returns a fabricated analysis. The uploaded report is sent to the Gemini API for analysis; no scan is stored by this project. Maximum upload size is 2.5 MB.

The home page now has an “Ask MGREFOTS” training and nutrition box. It uses the same `/api/ai/chat` endpoint as `/chat` and sends up to eight recent conversation turns for follow-up questions. Its decision method and initial reviewed source registry are in [`docs/fitness-assistant-methodology.md`](docs/fitness-assistant-methodology.md) and `api/ai/fitness-method.js`. This is a starting evidence framework, not a complete sport-specific knowledge library; expand and review the source corpus and add abuse controls before public activation.
