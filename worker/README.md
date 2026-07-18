# Comments Worker — deployment

This replaces giscus with a small Cloudflare Worker + KV store, so comments
live on infrastructure the Observer controls instead of a GitHub Discussions
mirror. The frontend (`js/comments.js`) is already wired into all 14
articles and will show an honest "Letters are being filed by hand this
week" message until this Worker is deployed and its URL is set.

## One-time setup

You'll need a free Cloudflare account and Node installed locally.

```bash
cd worker
npx wrangler login          # opens a browser to authorize
npx wrangler kv namespace create COMMENTS
```

The second command prints an `id`. Copy it into `wrangler.toml`, replacing
`REPLACE_AFTER_KV_CREATE`:

```toml
kv_namespaces = [
  { binding = "COMMENTS", id = "paste-the-real-id-here" }
]
```

## Deploy

```bash
npx wrangler deploy
```

This prints a URL like `https://mco-comments.<your-subdomain>.workers.dev`.
That's the Worker's real, permanent address.

## Point the site at it

In `js/comments.js`, replace the placeholder:

```js
const API_BASE = 'https://mco-comments.YOUR-SUBDOMAIN.workers.dev';
```

with the real URL from the deploy step, then commit and push. The comment
boxes on every article go live as soon as that deploys.

## Notes

- `worker/src/worker.js` already restricts requests to
  `themadisoncountyobserver.com`, `www.themadisoncountyobserver.com`, and
  the GitHub Pages mirror. Add any other origin you serve the site from to
  `ALLOWED_ORIGINS` before deploying.
- There's no spam/moderation layer beyond basic length limits — same as
  giscus had none built in either. If that becomes a problem, the Worker
  is the place to add a honeypot field, per-IP rate limiting (Cloudflare
  KV can hold simple counters), or manual moderation via `wrangler kv key
  delete`.
- Comments are stored per article under a `comments:<slug>` key in KV.
  Slugs are hardcoded in each article's `data-mco-comments` attribute —
  they don't need to match the filename.
- Redeploying the Worker (`npx wrangler deploy`) after editing
  `worker/src/worker.js` is required for code changes to take effect;
  editing `wrangler.toml`'s KV id only matters before the first deploy.
