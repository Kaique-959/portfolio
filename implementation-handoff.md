# Implementation Handoff — Kaique Calefi Portfolio

## Files to Read

- `DESIGN.md` — all design tokens, component specs, motion rules
- `design-contract.md` — keep/change boundaries, quality gates
- `src/data/content.js` — editable content placeholders

## Token Summary

```css
:root {
  --bg: #0a0a0a;
  --surface: #141418;
  --surface-elevated: #1a1a20;
  --fg: #f5f5f5;
  --muted: #a0a0a8;
  --accent: #d4a853;
  --accent-hover: #e0b963;
  --border: rgba(255,255,255,0.06);
  --border-hover: rgba(255,255,255,0.12);
  --font-display: 'Satoshi', sans-serif;
  --font-body: 'Geist', sans-serif;
  --radius: 8px;
  --max-width: 1280px;
}
```

## Asset Rules

- Fonts: Satoshi + Geist — use CDN or self-hosted @font-face
- Icons: Phosphor icons (light weight) — one family everywhere
- Images: User will provide later — use placeholder divs with aspect-ratio for now
- 3D: Torus knot geometry via Three.js R3F — no external models needed
- No external placeholder CDNs (unsplash, picsum, etc.)

## Layout Constraints

- Max content width: 1280px, centered
- Mobile: single column below 768px
- No horizontal scroll on mobile
- Touch targets min 44px
- Each section has unique layout family

## Responsive Requirements

- Desktop-first, collapse to single column at 768px
- Nav: horizontal at desktop → hamburger at mobile
- 3D scene: reduce complexity on mobile (disable if needed)
- Timeline: alternating at desktop → single column mobile

## Acceptance Notes

First artifact should prove:
1. Design system fidelity (colors, typography, spacing match DESIGN.md)
2. Animation quality (smooth scroll reveals, no jank)
3. 3D integration (torus knot visible, responds to mouse)
4. Responsive behavior (no broken layout at any breakpoint)
5. Reduced motion support
