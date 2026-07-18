# Open Decisions — Do Not Guess

Claude Code may prepare integration points but must not choose these on the user's behalf.

## 1. Final logo

Pending: original owned Eye of Record and custom wordmark.

Temporary behavior:

- use a text-first masthead;
- use the CSS eye marker only as a non-final placeholder;
- expect final asset at `assets/mco-eye.svg`;
- do not use the placeholder for merchandise, sponsor lockups, or trademark applications.

## 2. Newsletter provider

No provider or form endpoint has been approved in this implementation package.

Allowed:

- build and style the component;
- place endpoint in a single config location;
- display an honest `Briefing enrollment opens soon` state until configured.

Not allowed:

- create an account;
- submit addresses to a third party;
- pretend the form works.

## 3. Field report backend

The current direct email fallback should remain usable. Do not add Formspree, Netlify Forms, Google Forms, or another processor without approval and privacy review.

## 4. Sponsors

Dreaming Creek Brewery, Wink's Bar and Grill, and Whimsy's Book Store were identified as possible prospects, not approved advertisers. Do not place them on the live site or imply endorsement.

## 5. Merch

Print-on-demand is the preferred future model, but no platform or product has been selected. Keep the page usable as a restrained `Authorized Equipment` coming-soon page or preserve the current page.

## 6. Corrections content

The site should distinguish:

- real editorial corrections, which must be plain and unambiguous;
- satirical Corrections & Clarifications entries, which remain part of the comedy.

Do not create actual correction claims without source material.

## 7. Image classification mapping

Claude should produce a reviewable table assigning each current hero image one of the approved evidence classes. Do not assume every current image labeled `photograph` is documentary.
