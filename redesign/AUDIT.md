# Phase 0 Audit — The Madison County Observer

Completed 2026-07-18, before any template edits, on branch `redesign`.

## Stack

- Hand-authored static HTML. No build system, no framework, no package.json.
- Deployed two ways from the same GitHub repo (`joshpryor19/madison-county-observer`):
  - GitHub Pages, from `main`, at `joshpryor19.github.io/madison-county-observer/`.
  - Vercel, auto-deploying `main`, serving the production custom domain `themadisoncountyobserver.com` (both apex and `www`). No `vercel.json` in the repo — zero-config static deploy.
- This means every push to `main` goes live on the real domain within minutes. The redesign will be built on this `redesign` branch and only merged to `main` on explicit approval.

## Public routes (24 total)

`index.html`, `about.html`, `merch.html`, `contact.html`, `privacy.html`, `classifieds.html`, `townhall.html`, `commerce.html`, `society.html`, `crime.html`, `article.html`, `article2.html`–`article14.html` (13 numbered articles).

All routes must be preserved exactly — no renames, no redirects needed.

## Shared markup

Header (masthead, nav, hamburger toggle, dateline, weather ticker) and footer are identical inline-styled markup, hand-duplicated across all 24 files — no includes/partials. Same for the article template shell (breadcrumb → headline → deck → byline/meta → hero image → body → developing-story marker → Letters section → footer).

## Analytics & ads (must preserve exactly)

- Google Analytics `G-RS7QKGF82X` — present on all 24 pages.
- Google AdSense `ca-pub-3752702549456477` — present on all 24 pages, currently pending approval. Not mentioned in `CLAUDE.md`'s ad-network constraint, but since it's already live, treating it the same as GA: preserve as-is, don't touch.
- `ads.txt` at repo root — present, correct.

## SEO / social metadata

- **Zero** Open Graph tags, canonical links, or JSON-LD structured data anywhere on the site today. This is a real gap, not an oversight to preserve — Phase 6 work is additive, not a migration.
- No `robots.txt`, `sitemap.xml`, `favicon.ico`, or `404.html` exist yet.

## Brand asset check

- The existing footer mark (`<svg>` triangle + ellipse + filled circle, paired with "NOT ACTUALLY SURVEILLING YOU. PROBABLY.") is already a stylized eye — consistent with the "unowned eye" `CLAUDE.md` describes and the "ALL EYES ON MADISON COUNTY" tagline. It'll be treated as the temporary placeholder per the package's rules until `assets/mco-eye.svg` is supplied.

## Color note

The current site's accent green is `#1e4d3b`. The new token set specifies Bureau Green as `#294C3D` — a distinct (slightly more muted) green, not the same value. Flagging since this is a real, visible palette shift, not just a typography change.

## Comments system

All 24 article pages currently use giscus (GitHub Discussions-backed) for comments, mapped by URL pathname. An earlier, unfinished migration to a custom Cloudflare Worker backend exists but is stashed (`git stash list`) and untouched by this redesign — out of scope unless asked.

## Contact / Field Reports

`contact.html` currently builds a `mailto:madisoncountyobserver@gmail.com` link client-side (no backend). This satisfies `CLAUDE.md`'s "keep a usable direct email fallback" requirement already — the redesign should preserve this behavior under the reframed "File a Field Report" heading rather than wire up a new form processor.

## Risky items / unknowns requiring your decision (per MCO_OPEN_DECISIONS.md)

Nothing here will be guessed or implemented without your sign-off:

1. Final logo (`assets/mco-eye.svg`) — not supplied; temporary CSS marker will be used.
2. Newsletter/Intelligence Briefing endpoint — none approved; will render as "coming soon."
3. Field report form backend — none approved; mailto fallback stays.
4. Sponsor prospects (Dreaming Creek Brewery, Wink's, Whimsy's) — not approved advertisers; will not appear on the live site.
5. Merch platform — none selected; page stays as-is or becomes a restrained "coming soon."

## Plan

Proceed in the phases from `redesign/MCO_SITE_REDESIGN_SPEC.md`, on this branch, reporting progress and screenshots before any merge to `main`.
