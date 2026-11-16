# SmartPath editorial operations

The canonical editable content records are in `content/site.json`. The public pages use `assets/content.js` to render partner records, location cards and map pins, approved stories and galleries. The website also contains curated static editorial sections; editing `site.json` does not change every sentence on every page.

To publish, sign in at `/admin.html` using the `ADMIN_PASSWORD` environment variable. Edit valid JSON for the selected section and publish. The Vercel API commits the updated JSON to the configured GitHub branch, triggering deployment when Vercel Git integration is enabled. Media uploads are limited to 4 MB and are stored in `uploads/<category>/`. Reference the returned path from the appropriate content record (`image`, `logo` or `url`). Uploads do not automatically attach themselves to a record.

Never upload identifiable patient information, clinical records or consent forms to the public repository. Require editorial approval for partner descriptions, public photographs and logos. Keep completed implementation separate from planned or exploratory activity. Review every updated location's latitude, longitude, status and description before publishing.

The admin is not a replacement for a dedicated enterprise CMS or clinical data system. Configure authentication, secrets, rate limiting and audit controls before production use.
