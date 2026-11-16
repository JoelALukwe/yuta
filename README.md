# SmartPath — Integrated Website Source (16 November 2026)

This is the complete **Vercel-oriented source package**, audited against the supplied `yuta-main (1).zip` and recovered media from the earlier SmartPath website package. Deploy the **contents** of this directory at the repository root. This is a static multi-page website with optional Vercel serverless API functions.

## Site structure

The approved primary navigation is Home, Our Model, Our Paths, Where We Work, Impact & Evidence, Community & Partners, Stories & Media, and About & Team, with Partner With Us as the main CTA. Dedicated pages cover Iron It Out, Maternal Anaemia and content administration. Redirect-only legacy pages are preserved for old bookmarks.

## Assets restored

`assets/logo.png` is the supplied official SmartPath brand mark. Recovered portraits: Joel, Fezokuhle, Harries and Sr Karin; `worcester.jpeg`; and `ironitout-video.mp4`. The original Iron It Out logo and verified partner logos were **not included in the source archives** and have not been fabricated. Media publication permissions should be checked.

## Content and editorial integrity

SmartPath is a South Africa-headquartered health-systems social enterprise and pathway integrator. It coordinates Community, Science and Technology to connect awareness, testing, clinical decisions, treatment, referral and follow-up, without replacing licensed clinical providers. Its first Path is Maternal Anaemia; Iron It Out is the awareness and early-entry component.

Founder titles: Joel Alukwe Majengo (CEO), Fezokuhle Ncedile Khumalo (CTO), Mampenyane Harries Molepo (COO). Sr Karin Davidson is Clinical Advisor & Mentor | Iron It Out Programme Lead. Sr Pippa Hime is credited separately for founding campaign collaboration with The Infusion Room. No verified portrait for Sr Pippa was available.

Geographic markers are approximate locality centres. Completed, planned, exploratory and origin categories must not be conflated. Partner names in the editorial database are **not evidence of a signed agreement or logo-use permission**.

## Administration

`/admin.html` allows an administrator to edit structured JSON content and upload approved media. Its server-side endpoints are `api/auth.js`, `api/publish.js`, `api/upload.js`. On Vercel, set:

- `ADMIN_PASSWORD`: strong unique secret, never committed.
- `GITHUB_TOKEN`: fine-grained token with repository contents write permission.
- `GITHUB_OWNER`: repository owner, e.g. `JoelALukwe`.
- `GITHUB_REPO`: `yuta`.
- `GITHUB_BRANCH`: `main` (optional default).

The admin currently publishes **structured records**, not arbitrary page HTML. Partners, location cards/map markers and approved story/gallery records are bound to `content/site.json`. Editorial sections elsewhere remain curated HTML and are not automatically updated by the CMS. Do not store clinical or patient records in this CMS. Authentication is a server-verified password per request; production hardening should add rate limiting, session controls, audit logs and multi-user access policy.

## Contact form

The Vercel function `api/contact.js` uses Resend. Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. Without them, the form returns a clear service-unavailable message. Configure abuse prevention and verify the sending domain before publishing widely.

## Deployment and verification

- Deploy to Vercel from the repository root with no build command and no output-directory override.
- `vercel.json` handles old route redirects and clean URLs.
- Visit `/index.html`, `/our-model.html`, `/paths.html`, `/paths/maternal-anaemia.html`, `/where-we-work.html`, `/impact.html`, `/partners.html`, `/stories.html`, `/about.html`, `/iron-it-out.html`, `/partner-with-us.html`, `/admin.html`.
- Verify logo, portraits, video, mobile menu, both themes, map layer switcher and status filters. Map tiles load from external providers.
- Check browser network logs for 404s and serverless API errors.
- Configure Vercel environment variables before testing contact/admin publishing.

**Remaining launch gates:** live browser QA, formal relationship and logo approvals, source-media rights, legal/privacy review, and secure operational configuration. The included source has been statically checked but is not certified as a live production deployment.
