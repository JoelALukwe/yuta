# Vercel deployment notes — 16 November 2026

This package restores missing local assets, fixes broken Maternal Anaemia and admin routes, reconnects the geographic map to editable location records, and restores media, editorial and admin scripts. Deploy the contents of this folder to the repository root, not a nested `yuta-main/` directory. Do not deploy the `/yuta/` GitHub Pages path-rewritten package to Vercel.

Vercel serverless functions require `ADMIN_PASSWORD`, `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` and optionally `GITHUB_BRANCH` for admin publishing, and `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` for email delivery. These are not included in the archive.

Live deployment, credentials, partner-logo rights and public media permissions are not verified by the ZIP integrity and local reference checks. Review the README and the audit report before launch.
