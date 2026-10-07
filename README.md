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
