# ELVYN

Independent web studio built with React, TypeScript, and the Next.js App Router for deployment on Vercel.

## Local development

Run npm install and npm run dev.
Put the three required Resend variables in ignored .env.local, then restart the development server:

- RESEND_API_KEY
- INQUIRY_TO_EMAIL
- INQUIRY_FROM_EMAIL

.env.example is a blank reference and is not loaded by the runtime.
The sender must be approved by Resend. Its test sender only permits delivery to the account owner's address; verify your own domain for production.

## Contact architecture

components/contact-form.tsx validates for immediate feedback and POSTs to /api/inquiry.
app/api/inquiry/route.ts is the single App Router route. There are no Pages Router API routes or Server Actions.
lib/inquiry.ts contains public shared validation and option lists only.
lib/server/inquiry-email.ts is guarded by server-only and uses the Resend Node SDK. Credentials are read from process.env only on the server.

The route revalidates every field, checks origin and payload size, handles a honeypot, returns useful HTTP status codes, and never forwards raw provider errors. The email contains every inquiry field in escaped HTML plus plain text. INQUIRY_FROM_EMAIL is the sender; the prospect is replyTo.

The frontend disables submission and uses an immediate ref lock against double clicks. A stable idempotency key is reused for retries of the same brief; changing the brief creates a new key. Resend suppresses duplicate accepted requests within its idempotency window.

## Deployment

Set the same three variables as Vercel Environment Variables before accepting enquiries. Local .env files are not deployment configuration and must never enter source control or a client bundle.

## Content

lib/content.ts holds pricing, services, process, FAQs and project metadata.
Portfolio images are original AI-generated concept imagery, not client work.
Instagram and LinkedIn profile URLs are pending; no fabricated links are published.

## Validation

npm run build
npx tsc --noEmit
node --conditions=react-server --experimental-strip-types --test tests/inquiry.test.mjs
node tests/check-client-secrets.mjs

The unit suite mocks the SDK transport and sends no real email. HTTP and browser integration checks are performed separately against the running site.
