

# Fix: Character Animation Overlap, Size, and Landing Page Polish

## Problems

1. **3D character overlaps "What I Deliver" cards** — The GSAP scroll timeline in `GsapScroll.ts` targets `.whatIDO` class, but the redesigned section uses `.wid-section`. So `tl3` (which moves the character off-screen) never fires.
2. **Character continues showing through Experience/Certifications** — Same root cause: `tl3` never triggers, so the fixed-position character stays visible.
3. **Character is too large and overlaps card text** — Need to reduce the character model size in the "What I Deliver" view.
4. **Landing page is a plain black screen** — User wants a cybersecurity-themed animation on the initial view (before loading completes or as background).

## Plan

### 1. Fix Character Animation Class Mismatch
**File: `src/components/utils/GsapScroll.ts`**
- Change `tl3` trigger from `.whatIDO` to `.wid-section` (the new class name)
- This restores the scroll-based character hide: as user scrolls past "What I Deliver", the character moves to `y: -100%` and disappears before Career section

### 2. Reduce Character Size in "What I Deliver" View
**File: `src/components/utils/GsapScroll.ts`**
- In `tl2`, adjust the camera zoom or position so the character appears smaller when transitioning into the "What I Deliver" section
- Change `x: "-12%"` to `x: "-25%"` to push the character further left, reducing overlap with cards
- Add camera zoom increase (e.g. `z: 85` instead of `75`) to make the character appear smaller

### 3. Add Cybersecurity Background Animation to Landing
**File: `src/components/Landing.tsx`**
- Add a subtle animated background with floating cyber elements: a grid pattern, scanning lines, and particle dots
- Use CSS-only animations (keyframes) for performance — no heavy libraries
- Elements: faint grid lines, slow-moving scan line, subtle floating dots with cyan glow

**File: `src/components/styles/Landing.css`**
- Add `.landing-cyber-bg` with a CSS grid pattern overlay using `background-image: linear-gradient` for grid lines
- Add a scanning line animation (`@keyframes scan`) that moves top-to-bottom continuously
- Keep everything subtle (low opacity) so it doesn't compete with the 3D character or text

### 4. Ensure WhatIDo Section Has the Legacy Class
**File: `src/components/WhatIDo.tsx`**
- Add `whatIDO` as an additional class to the section element: `className="wid-section whatIDO"`
- This is the simplest fix — keeps both the new styling and the GSAP trigger working

## Technical Details

**Root cause**: When the "What I Do" section was redesigned, the class changed from `whatIDO` to `wid-section`, breaking the GSAP ScrollTrigger that hides the 3D character. Adding `whatIDO` back as a secondary class restores the animation without affecting the new design.

**Files modified:**
- `src/components/WhatIDo.tsx` — add `whatIDO` class back
- `src/components/utils/GsapScroll.ts` — adjust character position/size in tl2
- `src/components/Landing.tsx` — add cyber background elements
- `src/components/styles/Landing.css` — cyber background animations

