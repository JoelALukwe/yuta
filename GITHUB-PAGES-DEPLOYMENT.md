ARCHIVED: GitHub Pages instructions. Current recommended deployment is Vercel. See README.md and VERCEL-RESTORATION.md.

# SmartPath — GitHub Pages deployment

## Deployment
1. Upload the **contents** of this folder to the root of the `yuta` repository (not inside a nested `yuta` folder).
2. In GitHub Settings → Pages, deploy from the main branch root (or the configured Pages workflow).
3. Visit https://joelalukwe.github.io/yuta/ and verify navigation, images, scripts and both themes.
4. Hard-refresh the browser to clear cached styles and scripts.

## Changes
- All site-local absolute HTML URLs now use `/yuta/` for GitHub project Pages.
- Nested pages such as `paths/maternal-anaemia.html` use the same project prefix.
- `.nojekyll` included.

## Critical limitation
GitHub Pages is static and **does not execute** `api/contact.js`. The Partner With Us form cannot deliver messages on GitHub Pages without a separately deployed API or a form provider. Do not advertise this form as operational until connected and tested.

## Portability
This build targets exactly the `/yuta/` base path. To deploy at a root domain or another repository path, update the base prefix or introduce a configurable build-time base path.

## Testing status
Source paths and archive checked. Browser-based interaction and contrast testing still required on the deployed URL.
