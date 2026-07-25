# Design System — Kaique Calefi Portfolio

> Category: Dark Editorial Portfolio
> Premium dark portfolio with gold accents, asymmetric layouts, and subtle 3D motion for a creative professional.

## 1. Visual Theme & Atmosphere

Dark editorial portfolio with a premium, cinematic feel. Gold accents against deep charcoal backgrounds create warmth and sophistication. Subtle 3D elements in the hero add depth without overwhelming content. Macro-whitespace and asymmetric grids communicate confidence and taste.

- **Visual style:** dark, editorial, minimal, bold
- **Color stance:** dark neutral base, single warm gold accent
- **Design intent:** Feel like a high-end agency portfolio — restrained, confident, every pixel intentional

## 2. Color

- **Background:** `#0a0a0a` — Off-black, never pure #000
- **Surface:** `#141418` — Cards, sections, containers
- **Surface Elevated:** `#1a1a20` — Hover states, modals
- **Foreground:** `#f5f5f5` — Primary text
- **Muted:** `#a0a0a8` — Secondary text, captions
- **Accent:** `#d4a853` — Warm gold, single accent color
- **Accent Hover:** `#e0b963` — Gold hover state
- **Border:** `rgba(255,255,255,0.06)` — Subtle hairlines
- **Border Hover:** `rgba(255,255,255,0.12)` — Elevated borders
- **Success:** `#22c55e` — Status indicators
- **Danger:** `#ef4444` — Error states

- Accent used max 2 times per screen
- No pure black (#000) or pure white (#fff) anywhere
- Tinted shadows use `rgba(212,168,83,0.08)` for gold glow

## 3. Typography

- **Display:** Satoshi — `font-family: 'Satoshi', sans-serif`
- **Body:** Geist — `font-family: 'Geist', sans-serif`
- **Mono:** JetBrains Mono — `font-family: 'JetBrains Mono', monospace`

### Scale

| Token | Size | Weight | Line Height | Tracking |
|---|---|---|---|---|
| display-hero | clamp(3rem, 8vw, 8rem) | 700 | 0.9 | -0.04em |
| display-h2 | clamp(2rem, 4vw, 3.5rem) | 700 | 1.0 | -0.03em |
| display-h3 | clamp(1.5rem, 2.5vw, 2rem) | 600 | 1.1 | -0.02em |
| body | 1rem / 1.125rem | 400 | 1.6 | normal |
| body-large | 1.125rem | 400 | 1.6 | normal |
| caption | 0.875rem | 400 | 1.4 | 0.02em |
| eyebrow | 0.75rem | 600 | 1 | 0.12em |
| label | 0.875rem | 500 | 1 | 0.02em |

- Body max width: `65ch`
- Headings use `text-wrap: balance`
- No serif fonts — clean sans-only identity

## 4. Spacing & Grid

- **Spacing scale:** 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128
- **Section padding:** `py-24` to `py-40` (96px to 160px)
- **Max content width:** 1280px
- **Grid:** 12-column CSS Grid for main layout
- **Card gap:** 24px between cards, 16px between elements inside cards
- **Macro-whitespace:** Double standard padding on hero and footer sections
- **Shape consistency:** 8px radius for cards, 4px for small elements, 0px for big containers

## 5. Layout & Composition

- **Hero:** Full viewport, 3D element on right/behind, text left-aligned
- **Asymmetric layouts preferred** — never symmetrical 3-column grids
- **Each section uses a different layout family** — no layout repetition
- **Zigzag max:** 2 consecutive split sections max, then switch to full-width
- **Navigation:** Fluid island pill at top, glass morphism, detached from viewport edge
- **Cards only when elevation communicates hierarchy** — otherwise use borders or negative space
- **Double-bezel pattern for premium cards:** outer shell (bg, padding, radius) + inner core (distinct bg, small radius)
- **Button-in-button:** trailing icon in its own circular wrapper

## 6. Components

### Navigation
- Floating glass pill navbar (`backdrop-blur-xl`, `bg-[#0a0a0a]/80`)
- Detached from top with `mt-4`, centered
- Smooth scroll links to sections
- Hamburger morphs to X on mobile

### Hero Section
- Min height `100dvh`
- Headline max 2 lines, subtext max 20 words
- CTAs visible without scroll
- 3D element (torus knot) via Three.js/R3F — subtle float + mouse parallax
- No trust strips, taglines, or feature bullets inside hero
- Max 1 primary CTA

### Service Cards
- 8 cards in asymmetric grid (2 wide + 1 narrow per row)
- Double-bezel nested architecture
- Icon in button-in-button pattern
- Hover: subtle scale + border glow

### Portfolio Grid
- 3D tilt effect on hover via `drei`
- Smooth reveal on scroll
- Click opens external link

### Timeline
- Vertical line with staggered cards
- Alternating left/right at desktop, single column mobile

### Testimonials
- Horizontal scroll carousel
- Controlled dots navigation
- Smooth auto-scroll pause on hover

### Form (Contact)
- Minimal, clean inputs with gold focus ring
- Inline validation
- Submit button with loading state

## 7. Motion & Interaction

### Timing
- **Hover/active:** 100-150ms, `cubic-bezier(0.23, 1, 0.32, 1)`
- **Entrance (scroll):** 600-800ms, `power3.out`
- **Modal/sheet enter:** 300ms
- **State change:** 200ms

### Scroll Animation
- Sections fade up with `translateY(40px)` + `opacity: 0` → resolved
- Stagger children entrance (100ms gap)
- Count-up numbers trigger on scroll into view
- Horizontal ticker marquee (20s loop, paused on hover)

### 3D
- Torus knot: slow rotation (0.3 rad/s) + gentle float (sin wave)
- Mouse parallax: camera offset follows cursor
- Hover tilt on portfolio cards

### Micro-interactions
- Button press: `scale(0.98)` + `translateY(1px)`
- CTA arrow shifts right on hover
- Focus rings: gold outline

### Reduced Motion
- All animations respect `prefers-reduced-motion: reduce`
- Scroll reveals become instant
- 3D scene becomes static

## 8. Voice & Brand

- **Tone:** Confident, warm, professional. First-person singular.
- **Voice:** Direct, no filler. "I design" not "We create."
- **Pronouns:** First person ("I", "my") for personal, second person ("you") for CTAs and value props
- **CTA style:** Action verb + specific outcome — "View my work" not "Click here"
- **Avoid:** "Elevate", "Seamless", "Unleash", "Revolutionary", "Game-changing"
- **Do use:** Concrete outcomes, specific numbers, clear action language

## 9. Anti-patterns

- No default Tailwind indigo as accent (#6366f1, #4f46e5, etc.)
- No purple-blue trust gradients in hero
- No emoji as feature icons (sparkles, rockets, fire, etc.)
- No serif fonts for display text (banned unless editorial brand specifies)
- No rounded card with colored left-border accent
- No invented metrics or fake-precise numbers
- No filler copy, lorem ipsum, or "Feature 1/2/3" placeholders
- No symmetrical 3-column grids
- No Inter as default font (use Satoshi + Geist)
- No pure black (#000) or pure white (#fff)
- No overlapping elements that break readability
- No custom cursors
- No gradient text on headings
