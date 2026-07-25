# Design Contract — Kaique Calefi Portfolio

## Goal

Build a premium single-page portfolio website for Kaique Calefi, a creative professional. The site must feel high-end, dark editorial with 3D subtlety, targeting premium clients and hiring managers.

## Target Artifact

Single-page React + Vite portfolio with Three.js 3D hero, GSAP scroll animations, 9 sections, deployed to Vercel at `site.kaiquecalefi.online`.

## Evidence Table

| Source | What it tells us | Confidence |
|---|---|---|
| nikolaradeski.com | Reference for dark editorial portfolio feel | observed |
| User input | Name: Kaique Calefi, Gold accent #d4a853 | provided |
| Open Design taste-skill | Anti-slop rules, layout variance, premium patterns | inferred |
| Open Design soft-skill | Double-bezel, macro-whitespace, fluid nav | inferred |
| Open Design color.md | Token discipline: 80% neutrals, 10% accent | inferred |

## Keep / Change / Do Not Copy

| Keep | Change | Do Not Copy |
|---|---|---|
| Dark minimal editorial feel | All content (name, skills, projects) | Screenshots of nikolaradeski.com |
| Gold accent warmth | Exact section count and structure | Logos, awards, testimonials |
| Scroll-driven narrative | Copy and microcopy | Pricing, claims, client names |
| Premium restrained aesthetic | Layout arrangements | Exact color values |
| 3D subtlety in hero | Font choices (Satoshi + Geist) | DOM structure |

## Final Design Stance

One page. Dark background (#0a0a0a) with warm gold accent (#d4a853). Sans-serif typography (Satoshi display + Geist body). Asymmetric layouts with macro-whitespace. Single 3D element (floating torus knot) in hero with mouse parallax. All scroll animations via GSAP ScrollTrigger. Double-bezel cards with button-in-button CTAs. Fluid glass island navigation.

## Risks & Unknowns

- User will provide actual content (projects, photos, testimonials) later
- 3D performance on low-end devices — include reduced-motion fallback
- Font loading (Satoshi + Geist are self-hosted — need to verify availability)

## Quality Gate Checklist

- [ ] No Inter, no serif as default
- [ ] No purple-blue gradients
- [ ] No emoji as feature icons
- [ ] Accent used max 2x per screen
- [ ] No pure black (#000) or pure white (#fff)
- [ ] 3D scene has reduced-motion fallback
- [ ] All animations respect prefers-reduced-motion
- [ ] Cards use double-bezel or equivalent premium pattern
- [ ] Each section has unique layout (no 3-equal-card repetition)
- [ ] WCAG AA contrast minimums met
- [ ] Responsive down to 320px
- [ ] LCP < 2.5s, CLS < 0.1
