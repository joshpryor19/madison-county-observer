# Madison County Observer — Claude Code Redesign Package

This package translates the approved Madison County Observer brand direction into instructions and starter code for Claude Code.

## Use it

1. Copy this entire folder into the root of the website repository.
2. Rename or copy `CLAUDE.md` to the repository root if it is not already there.
3. Open Claude Code in the repository.
4. Paste the prompt below.

## Copy-paste prompt for Claude Code

```text
Read CLAUDE.md and MCO_SITE_REDESIGN_SPEC.md in full before changing anything.

Audit the repository and tell me:
1. what stack/build system this site uses,
2. where shared header/footer/styles live,
3. how articles are structured,
4. what analytics, forms, and SEO metadata already exist,
5. which requested changes can be implemented safely without new credentials or final logo artwork.

Then implement the redesign in the ordered phases defined in the spec. Preserve every current public URL, article body, analytics installation, and working feature. Do not invent a permanent logo or connect an unapproved third-party service. Use the included CSS and HTML snippets as a reference, adapting them to the repository rather than blindly duplicating markup.

Before editing, create a backup or git branch. After each phase, run available tests/build checks and summarize the files changed. Stop only when a choice requires credentials, legal approval, final logo artwork, or a genuinely destructive migration.
```

## Package contents

- `CLAUDE.md` — permanent project rules and approved brand decisions.
- `MCO_SITE_REDESIGN_SPEC.md` — full implementation scope and acceptance criteria.
- `styles/mco-theme.css` — production-minded starter stylesheet and component system.
- `snippets/mco-components.html` — semantic markup examples for key modules.
- `scripts/mco-analytics.js` — optional event tracking that works only when `gtag` is present.
- `config/mco-brand-tokens.json` — machine-readable palette, type, spacing, and image rules.
- `MCO_OPEN_DECISIONS.md` — items Claude must not guess.

## Important

The CSS eye included here is a **temporary implementation marker**, not final logo art. It must not be used for merchandise or trademark filing. Replace it with the commissioned `assets/mco-eye.svg` when available.
