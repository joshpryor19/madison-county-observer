# Madison County Observer Website Redesign Specification

Version 1.0 — implementation brief for Claude Code

## 1. Objective

Transform the existing website from a collection of article links into the headquarters of a coherent satirical news institution. The redesign should improve:

- immediate brand recognition;
- story-to-story exploration;
- direct audience capture;
- mobile readability;
- future sponsor readiness;
- visual consistency without making every image identical;
- long-term maintainability for two people with limited time.

The site is newly launched. Avoid unnecessary migration, URL changes, or complicated tooling.

## 2. Success criteria

The implementation is successful when:

- a reader can identify an Observer page before reading the publisher name;
- the homepage has a clear lead story and editorial hierarchy;
- each article offers at least two relevant next actions;
- visual reconstructions and real photographs are accurately classified;
- site-wide typography, palette, rules, buttons, and spacing use shared tokens;
- existing article copy, URLs, and analytics continue to work;
- mobile navigation and article reading are comfortable;
- unconfigured services degrade honestly and gracefully;
- the code is easier, not harder, for two people to maintain.

## 3. Phase 0 — repository audit and safety

Before edits:

1. Identify the stack, host assumptions, build scripts, and deployment flow.
2. Record every public route and article URL.
3. Locate shared or repeated header/footer markup.
4. Locate current CSS and scripts.
5. Locate Google Analytics and preserve its ID.
6. Locate Open Graph and SEO metadata patterns.
7. Identify all uses of the current unowned eye asset.
8. Identify article data that could be centralized safely.
9. Create a git branch or complete backup.
10. Produce a short audit summary before implementation.

Acceptance:

- no file is modified before the audit is complete;
- a route inventory exists;
- risky dependencies and unknown credentials are listed.

## 4. Phase 1 — design foundation

### 4.1 Tokens

Adopt the values in `config/mco-brand-tokens.json`. Integrate them into the existing CSS architecture. Do not create duplicate competing variables when equivalent tokens already exist.

### 4.2 Fonts

Use Newsreader, Archivo Narrow, and IBM Plex Mono. Prefer `<link rel="preconnect">` and stylesheet links in the document head over a CSS `@import` when editing templates is practical.

Required weights:

- Newsreader 400, 600 italic, 700, 800
- Archivo Narrow 400, 600, 700
- IBM Plex Mono 400, 500, 600

### 4.3 Global reset and accessibility

Add box sizing, image defaults, focus styles, skip link, reduced motion handling, and text rendering. Do not remove browser focus indicators without replacing them.

### 4.4 Temporary logo handling

- Remove the current unowned eye from reusable brand locations when safe.
- Use a text-first masthead and temporary CSS eye marker from the starter stylesheet.
- Mark the asset in code comments as `TEMPORARY — replace with owned mco-eye.svg`.
- Build the component so swapping the final SVG requires changing one file or variable.

Acceptance:

- all main colors and fonts come from tokens;
- no generic rounded cards or gradients remain in the primary system;
- the temporary logo is clearly non-final in source comments.

## 5. Phase 2 — shared site chrome

### 5.1 Header

Implement semantic header structure:

- skip link;
- utility bar;
- masthead;
- responsive navigation;
- issue/free-take-one label;
- atmospheric surveillance ticker.

The primary masthead name must remain readable even if CSS, fonts, or SVG fail.

### 5.2 Navigation

Recommended public labels:

- Front Page
- Town Hall
- Commerce
- Society
- Crime Blotter
- About
- Field Reports

Keep current routes. Merch may remain but can be relabeled `Authorized Equipment` only if that does not confuse users or create an empty promise.

### 5.3 Ticker

Use one accessible text copy and visual duplicates marked `aria-hidden`. Pause on hover/focus if animated. Disable motion under `prefers-reduced-motion`.

### 5.4 Footer

Include:

- publication name;
- Madison County, Kentucky geographic text;
- visible satire statement;
- privacy link;
- contact/field report link;
- restrained footer joke;
- current year without requiring JavaScript if possible.

Acceptance:

- header/footer update once through shared templates where the stack allows;
- keyboard users can reach every navigation item;
- ticker does not cause horizontal page overflow.

## 6. Phase 3 — homepage front page

Reorganize existing stories without changing their copy or URLs.

### 6.1 Lead package

One lead story should occupy the largest visual and typographic area. Use the newest/highest-priority article based on existing site logic; do not hard-code a specific story if the repository already has data or sorting.

Lead package includes:

- department kicker;
- headline;
- deck;
- hero image;
- accurate evidence classification/file strip;
- clear `Read the full dossier` link.

### 6.2 Secondary package

Two or three secondary stories with smaller but still prominent images.

### 6.3 Department sections

Retain Town Hall Dispatches, Matters of Commerce, Society Pages, and Crime Blotter. Use ruled editorial layouts, not identical floating cards.

### 6.4 Brief modules

Add reusable shells for:

- Corrections & Clarifications
- Classified Intelligence
- Public Notices
- Atmospheric Surveillance
- Oddly Enough
- Intelligence Briefing
- Field Reports

If there is no content or service yet, use an honest editorial placeholder or omit the module. Do not create fake sponsor endorsements or a form that does not submit.

### 6.5 Responsive behavior

- Desktop: editorial grid with lead and secondary hierarchy.
- Tablet: two-column where practical.
- Mobile: single column, headline first, no horizontal scroll, images maintain aspect ratio.

Acceptance:

- lead story is unmistakable;
- no more than one H1;
- all story links remain intact;
- homepage remains useful without JavaScript.

## 7. Phase 4 — article template

Apply to every article through shared templates or a safe scripted migration.

### 7.1 Header block

Order:

1. Breadcrumb
2. Department kicker
3. H1 headline
4. Deck
5. Byline/location/file metadata
6. Evidence-classified hero

### 7.2 Evidence figure

Use semantic `<figure>` and `<figcaption>`. File strip fields:

- classification;
- file code;
- location or source;
- short status;
- decorative eye marker.

Examples:

- `FIELD PHOTOGRAPH · FILE 008 · RICHMOND · STATUS: ACTIVE`
- `VISUAL RECONSTRUCTION · FILE 014 · ACCURACY DISPUTED BY ALL PARTIES`
- `INTERCEPTED BROADCAST · TRANSMISSION 004 · SUBJECT: FOREST RESIDENT`

Do not infer a documentary class from filename alone. Create a per-article mapping that can be reviewed.

### 7.3 Reading experience

- 680px maximum article body.
- 19px body size.
- Comfortable paragraph spacing.
- Drop cap allowed only on first article paragraph and must not damage screen-reader reading order.
- Block quotes use ink/green rules and remain readable.

### 7.4 Internal discovery

Add:

- one in-article related link after a natural break where possible;
- `CONTINUE MONITORING` section with 2–3 related stories;
- related stories selected by department/topic, not random when data exists.

Do not inject related links inside quoted speech or break narrative rhythm.

### 7.5 Conversion and participation

Add reusable blocks:

- Intelligence Briefing signup — active only when endpoint configured;
- Field Report CTA;
- Enter a Statement into the Record / Letters CTA;
- optional Correction or Classified card.

Acceptance:

- all existing articles render correctly;
- each has at least two internal story links when enough stories exist;
- no unconfigured form appears to work;
- article pages contain one H1 and valid metadata.

## 8. Phase 5 — About, Contact, and utility pages

### About

Retain the existing strongest language. Improve hierarchy and add a short `How to read the Observer` or `Official Notice` panel explaining satire without flattening the joke.

### Field Reports / Contact

- Heading: `File a Field Report`
- Supporting line: tips, complaints, sightings, public documents, and confessions welcome.
- Keep direct email visible.
- Build accessible form markup.
- If no approved form endpoint exists, either retain mailto behavior transparently or show the form as non-submitting design only in a development branch—not on production.

### Corrections

Create a template or section for genuine site corrections and satirical corrections. Clearly distinguish actual editorial corrections from comedic entries when necessary.

### Classified Intelligence

Create a reusable listing format with:

- title;
- body;
- location;
- file/reference number;
- optional `PAID PUBLIC NOTICE` label;
- sponsor link tracking when applicable.

Do not publish fabricated endorsements for real businesses without approval.

## 9. Phase 6 — SEO, social, and analytics

### Metadata

Ensure each page has:

- unique title;
- meta description;
- canonical URL;
- Open Graph title, description, image, URL, and type;
- Twitter card metadata;
- descriptive HTML language attribute;
- favicon references ready for the final owned eye asset.

### Structured data

- Organization schema on site-wide layout.
- Article/NewsArticle schema on stories.
- Use real publication dates and modified dates from source data where available.
- Do not invent author identities.

### Analytics

Integrate `scripts/mco-analytics.js` or equivalent only if Google `gtag` is already installed. Track clicks and submissions, never field contents.

### Error page

Create or restyle 404 page:

- `THIS FILE HAS BEEN REMOVED`
- helpful links to Front Page, Latest Files, and Field Reports;
- still clearly functions as a normal 404.

Acceptance:

- metadata validates;
- social preview uses 1200×630 image;
- analytics fires once per action;
- 404 returns proper 404 status if hosting supports it.

## 10. Phase 7 — image system implementation

### Required master dimensions

- Website/hero master: 2400×1350
- Open Graph/Facebook: 1200×630
- Square: 1080×1080
- Portrait: 1080×1350

### CSS treatments

Starter styles may provide subtle filtering and overlays, but do not hide weak images behind effects. The central gag must remain legible at 320px width.

### Real vs fabricated visual integrity

- Real documentary image: Field Photograph.
- AI/composite/photorealistic fabricated scene: Visual Reconstruction.
- Parody TV frame: Intercepted Broadcast.
- Fake corporate/civic paperwork: Obtained Document.
- Drawn work: Editorial Illustration.

Add classification to alt text only when it helps prevent misinterpretation. Example: `Visual reconstruction of city commissioners portrayed as professional wrestlers in a damaged chamber.`

## 11. Phase 8 — sponsor readiness, not sponsor publication

Create hidden/unpublished component templates for:

- Paid Public Notice
- Authorized Local Merchant
- Business Under Observation

Sponsor units must:

- be unmistakably labeled;
- use the same restrained brand system;
- contain no fake quote or endorsement;
- support outbound click tracking;
- avoid interruptive popups or auto-playing media.

Do not add sponsor names from the brainstorm to the live site without explicit approval.

## 12. Maintainability

Where the existing stack permits, centralize:

- site identity and navigation;
- brand tokens;
- article metadata;
- evidence classifications;
- related-story selection;
- footer;
- SEO defaults.

If the site is hand-authored static HTML, prefer a small, understandable build/include solution only if it matches the current hosting. Do not migrate to a framework merely for elegance.

Document:

- how to publish a new article;
- how to set evidence class/file status;
- how to choose related stories;
- how to create an Open Graph image;
- how to activate newsletter or form endpoints later;
- how to replace the temporary logo with final SVG.

## 13. Quality assurance checklist

### Functional

- All original URLs return the expected page.
- Every navigation link works.
- Forms either work or clearly state they are inactive.
- Google Analytics remains present once.
- No console errors.
- No broken images.

### Visual

- Brand colors use approved tokens.
- Newsreader, Archivo Narrow, and IBM Plex Mono load or fall back safely.
- No primary rounded cards, pill buttons, gradients, or heavy shadows.
- Homepage lead is obvious.
- Article width is comfortable.
- Evidence file strips are consistent.

### Accessibility

- Skip link works.
- Heading order is logical.
- Focus is visible.
- Navigation works by keyboard.
- Motion respects reduced-motion.
- Text contrast passes.
- Forms have labels and errors.
- Images have useful alt text.

### Responsive

Test at approximately:

- 360px
- 768px
- 1024px
- 1440px

### SEO/social

- Canonical URLs correct.
- Metadata unique.
- Open Graph image correct.
- Article schema valid.
- No accidental `noindex` on public pages.

## 14. Deliverables from Claude Code

At completion provide:

1. audit summary;
2. files changed;
3. public URL preservation report;
4. screenshots or preview instructions for homepage, article, About, Contact, and 404;
5. test/build results;
6. remaining open decisions;
7. concise instructions for adding the next article.
