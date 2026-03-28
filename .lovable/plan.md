

# Plan: Premium Shield Animation, GRC Hover Fix & Mobile Text Fix

## Issues Identified

1. **Loading shield looks basic** — flat SVG with simple pulse, no depth or dynamism
2. **GRC card hover not working** — the `hover-invert` class on `.wid-card-title` is being applied to individual `h3` elements but the hover needs to trigger per-element, not per-card. The issue is likely that framer-motion's `whileHover` on the parent card is intercepting pointer events or the CSS specificity is fine but the title text color isn't visually changing because the transition needs `!important` to override the hardcoded `color: #ffffff` in `.wid-card-title`
3. **"GRC & Cybersecurity" wrapping on mobile** — the landing `h3` at small viewports wraps to 2 lines; needs `white-space: nowrap` and smaller font size

## Changes

### 1. Premium Shield Animation (Loading.tsx + Loading.css)

Redesign the shield SVG and its surrounding animation to look premium:

- **Multi-layer shield SVG**: Add a subtle gradient fill with multiple nested shield paths creating depth, hexagonal circuit pattern inside, and animated energy lines flowing along the shield edges using `stroke-dashoffset` animation
- **Animated draw-in effect**: Shield paths draw themselves in using `stroke-dasharray` + `stroke-dashoffset` CSS animation (like a pen drawing the shield)
- **Inner holographic lock**: Replace the basic lock with a more detailed lock icon that has a glowing keyhole with radial pulse
- **Shield energy field**: Add an animated radial gradient behind the shield that pulses with a breathing effect, plus subtle particle sparkles around the shield perimeter
- **Layered glow rings**: Replace the basic dashed ring with multiple concentric rings at different speeds, with varying opacity and a subtle neon glow effect using `box-shadow` and `filter: blur`
- **Data circuit lines**: Add thin animated lines extending from the shield outward (like a circuit board) using SVG paths with dash animation

### 2. GRC Card Hover Fix (WhatIDo.css)

- Add `hover-invert` hover override specifically for `.wid-card-title:hover` with `!important` to ensure the color change from white → cyan works despite the hardcoded `color: #ffffff`
- Also ensure `.wid-card-subtitle` hover works (it currently has `hover-invert` but base color is gray, not white — should use appropriate class)

### 3. Mobile "GRC & Cybersecurity" Fix (Landing.css)

- Add `white-space: nowrap` to `.landing-info h3` at mobile breakpoints
- Reduce font size at small viewports (below 500px) to ~16px so it fits on one line

## Files Modified

| File | Change |
|------|--------|
| `src/components/Loading.tsx` | Redesigned shield SVG with multi-layer paths, circuit patterns, animated draw-in |
| `src/components/styles/Loading.css` | New keyframes for shield draw-in, energy pulse, circuit flow, enhanced glow rings |
| `src/components/styles/WhatIDo.css` | Add `.wid-card-title:hover` color override |
| `src/components/styles/Landing.css` | Add `white-space: nowrap` and smaller font for mobile h3 |

