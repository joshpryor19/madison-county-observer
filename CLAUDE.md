# CLAUDE.md — The Madison County Observer

## Read this first

You are working on a live satirical news publication. Protect the writing, public URLs, analytics, accessibility, and reader trust. The redesign should make the site feel like the official newspaper of an adjacent timeline: credible, orderly, peculiar, and funny.

Do not treat this as a generic vintage-news theme. Do not make it spooky, occult-horror, rustic-Appalachian, or visually chaotic.

## Brand premise

**Formal name:** The Madison County Observer  
**Public shorthand:** The Observer  
**Internal abbreviation:** MCO  
**Primary lines:**
- ALL EYES ON MADISON COUNTY.
- ESTABLISHED WHEN NO ONE WAS LOOKING.

**Positioning:** An anonymous, competent news organization transmitting reports from a slightly adjacent version of Kentucky. The facts are recognizable. The metaphor has become literal. Humor leads, but every flagship story has a real point beneath it.

**Reader relationship:** Readers unknowingly belonged to the Observer network all along. The site should imply this gently; it should never require lore knowledge to understand a page.

**Tone:** Competent, informed, calm, watchful, restrained, mischievous, and oddly reassuring.

## The 80/20 rule

Eighty percent of every page should look useful, credible, and editorially disciplined. Twenty percent may quietly violate reality. One strange detail per module is usually enough.

## Hard constraints

1. Preserve all current public URLs, especially existing `article*.html` routes.
2. Do not rewrite article bodies unless explicitly requested.
3. Do not remove or duplicate Google Analytics. Preserve the existing measurement ID and consent/privacy behavior.
4. Do not deploy, publish, merge, or overwrite the production branch without explicit user action.
5. Do not add a newsletter, form, ad network, cookie service, payment system, or tracking vendor without approved credentials and disclosure.
6. Do not use the current borrowed eye as a long-term brand asset.
7. Do not invent final logo artwork. Use a wordmark-first masthead and the included temporary marker until `assets/mco-eye.svg` is supplied.
8. Do not create rounded app cards, pill buttons, glass effects, gradients, heavy shadows, or generic “vintage grunge.”
9. Do not use accent colors for long body copy.
10. Do not label fabricated imagery as documentary photography.
11. Do not make the satire disclaimer intrusive, but keep it clearly available in the footer and About page.
12. Do not break Open Graph images, canonical links, structured data, mobile navigation, keyboard navigation, or reduced-motion preferences.

## Approved visual system

### Colors

- Observer Ink: `#171915`
- Newsprint Cream: `#F4EBD8`
- Archive White: `#FBF8EF`
- Bureau Green: `#294C3D`
- Transmission Amber: `#C9972F`
- Correction Brick: `#A94834`
- File Gray: `#69675F`

Recommended use: 60% cream, 25% ink, 10% green, 4% amber, 1% brick.

### Typography

- Editorial: `Newsreader` — headlines, decks, article body, pull quotes.
- Institutional: `Archivo Narrow` — navigation, section labels, bylines, captions, buttons, notices.
- Data: `IBM Plex Mono` — file codes, timestamps, status fields, transmission IDs only.

Fallbacks:
- Newsreader → Georgia → Times New Roman
- Archivo Narrow → Arial Narrow → Arial
- IBM Plex Mono → Courier New → monospace

### Layout

- Site maximum width: 1200px
- Article reading width: 680px
- Body copy: 19px desktop; never below 18px article body
- Corners: square
- Default shadows: none
- Primary rule: 1px Observer Ink at 28% opacity
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px

## Image classifications

Every major article image must have one accurate classification:

1. `FIELD PHOTOGRAPH` — real location, person, object, or event.
2. `VISUAL RECONSTRUCTION` — fabricated/composited satirical depiction.
3. `INTERCEPTED BROADCAST` — TV, weather, emergency, or public-access framing.
4. `OBTAINED DOCUMENT` — map, memo, plan, diagram, presentation, agenda.
5. `ARCHIVAL IMAGE` — historical/lore material with uncertain date or source.
6. `EDITORIAL ILLUSTRATION` — clearly illustrated interpretation.

Each hero figure should include a file strip with classification, location or department, file code, and a short status. Never claim `PHOTOGRAPH: STAFF` for a fabricated image.

## Approved departments

- TOWN HALL DISPATCHES
- MATTERS OF COMMERCE
- THE SOCIETY PAGES
- CRIME BLOTTER
- ATMOSPHERIC SURVEILLANCE
- CORRECTIONS & CLARIFICATIONS
- CLASSIFIED INTELLIGENCE
- FIELD REPORTS
- DECLASSIFIED FILES

## Content and page hierarchy

### Global header

1. Slim utility line: establishment line + primary tagline.
2. Masthead: wordmark-first; temporary eye marker or final owned SVG.
3. Navigation: clear, keyboard accessible, responsive.
4. “FREE — TAKE ONE” may remain as a small issue/device label, not a competing headline.
5. Atmospheric surveillance ticker must not duplicate text visibly for screen readers. Respect `prefers-reduced-motion`.

### Homepage

The front page must feel edited, not like a flat database of equal cards:

1. One dominant lead story.
2. Two or three secondary stories.
3. Department sections with smaller story treatments.
4. Corrections & Clarifications module.
5. Classified Intelligence module.
6. Newsletter / Intelligence Briefing module, inactive or “coming soon” until an approved endpoint exists.
7. Oddly Enough module/placeholder as a distinct sub-brand.
8. Field Reports CTA.
9. Footer with satire disclosure and Kentucky identification.

### Article pages

Keep the article body intact. Add:

1. Breadcrumb and department kicker.
2. Headline, deck, byline, location, and file metadata.
3. Evidence-classified hero figure.
4. Reading column no wider than 680px.
5. One related-file link around the middle or after a natural section break.
6. End module titled `CONTINUE MONITORING` with two or three relevant stories.
7. Intelligence Briefing signup block or inactive placeholder.
8. A rotating correction/classified/public notice block when content exists.
9. `ENTER A STATEMENT INTO THE RECORD` or existing Letters CTA.
10. Article JSON-LD, canonical URL, Open Graph, Twitter card, descriptive image alt text.

### About page

Preserve the strongest existing copy. Clarify:

- satire published from Madison County, Kentucky;
- the anonymous and competent network premise;
- the hidden-history suggestion without overexplaining;
- masthead roles;
- clear satire disclaimer.

### Contact / Field Reports

Reframe contact as `FILE A FIELD REPORT`. Keep a usable direct email fallback. Do not silently send submissions to a new third party. The form should support:

- Name or alias
- Email
- Report type
- Location
- Message
- Optional image/file only if backend supports it safely
- Consent/accuracy notice for factual allegations

## SEO and sharing rules

- Homepage title pattern: `The Madison County Observer | Satire from Madison County, Kentucky`
- Article title pattern: `[Headline] — The Madison County Observer`
- Include `Madison County, Kentucky` in organization schema, About copy, footer metadata, and social profile descriptions.
- Keep `Kentucky` out of the primary visual wordmark unless a small legal/geographic descriptor is required.
- Preserve canonical URLs.
- Generate or maintain sitemap and robots file if the repository supports them.
- Every article should have a unique meta description and 1200×630 Open Graph image.
- Do not use misleading structured data. Use `NewsArticle` or `Article` with the publication clearly identified.

## Analytics events

Preserve current Google Analytics and add events only if `gtag` already exists:

- `related_file_click`
- `newsletter_signup`
- `field_report_start`
- `field_report_submit`
- `sponsor_click`
- `department_navigation`

Do not store article text, form content, names, or email addresses in analytics parameters.

## Performance

- Avoid a JavaScript framework migration unless the existing repository already uses one.
- Prefer shared templates/partials/build includes if the stack supports them.
- If the site is static HTML without a build system, choose the lowest-risk method to centralize repeated chrome; do not break hosting.
- Use responsive images, explicit width/height, lazy loading below the fold, and compressed WebP/AVIF where practical.
- Preload only the true lead image and critical font files.
- Keep CSS and JS modest. The brand should come from typography, hierarchy, framing, and copy—not effects.

## Accessibility

- Semantic landmarks and heading order.
- Skip link.
- Visible focus states.
- Minimum 44px touch targets.
- Normal text contrast at least 4.5:1.
- Image alt text explains the visual and classification when relevant.
- Decorative eye marks must be hidden from assistive technology.
- No infinite ticker motion for users requesting reduced motion.
- Forms require real labels, errors, and status messaging.

## Workflow

1. Inspect the repository before editing.
2. Create a branch or backup.
3. Inventory templates, CSS, JS, images, URLs, metadata, analytics, and forms.
4. Report assumptions.
5. Implement in phases from `MCO_SITE_REDESIGN_SPEC.md`.
6. Run build/lint/tests if available.
7. Check desktop and mobile layouts.
8. Check article URL preservation.
9. Check keyboard navigation and reduced motion.
10. Provide a concise change log and list unresolved decisions.
