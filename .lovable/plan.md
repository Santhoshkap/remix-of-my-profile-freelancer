

# Fix: Remove 3D Character Overlap on About Section

## Problem
The 3D character model (`.character-model`) is `position: fixed` on desktop and renders on top of the About section, covering the headshot photo. The `z-index: 12` on `.about-section` isn't sufficient because the character canvas sits in a different stacking context.

## Solution

**Hide the 3D character when scrolling past the About section** by modifying the GSAP scroll timeline in `GsapScroll.ts`:

1. **`src/components/utils/GsapScroll.ts`** — In `tl1` (landing→about transition), add `opacity: 0` to `.character-model` so the 3D character fades out as the user scrolls into the About section. This replaces the current behavior where it just slides left but remains visible and overlapping.

2. **`src/components/styles/Landing.css`** — Ensure `.character-model` on desktop (`min-width: 1025px`) has `z-index` below the about section, and add `pointer-events: none` during the about section scroll range.

### Specific changes in `GsapScroll.ts`:
- In `tl1` timeline (lines 66-72): Add `.to(".character-model", { opacity: 0, duration: 0.6 }, 0)` so the character fades out as you scroll from landing to about
- In `tl2` timeline: Remove or adjust the `.character-model` x-position tweens since the character will already be hidden

This ensures the headshot photo in the About section is fully visible without the 3D character overlapping it.

