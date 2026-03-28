

# Fix: Hero Color, Spacing/Scrolling Issues, and UI Polish

## Problems Identified

1. **Hero section "GRC & Cybersecurity" text color** — The rotating role text below it is cyan (`hsl(190,100%,50%)`), but the `h3` "GRC & Cybersecurity" is also cyan via `color: var(--accentColor)`. User wants it **white** to match "SANTHOSH" on the left side.

2. **Content getting cut off / sections not flowing as one page** — The About section uses `min-height: var(--vh)` on desktop, but the content overflows. The `ScrollSmoother` with `speed: 1.7` accelerates scrolling, causing sections to appear cut. Multiple sections have fixed heights (`height: var(--vh)`, `height: 100vh`) that clip content.

3. **About section heading partially hidden** — The "ABOUT ME" h3 is too close to the top edge when scrolled into view.

## Plan

### 1. Hero Section — Change "GRC & Cybersecurity" to White
**File: `src/components/styles/Landing.css`**
- Change `.landing-info h3` color from `var(--accentColor)` to `#ffffff` (white) across all breakpoints
- Keep the rotating role text (`landing-role`) as cyan — that stays as-is

### 2. Fix Section Heights to Prevent Clipping
**File: `src/components/styles/About.css`**
- On desktop (`min-width: 1025px`): add `padding-top: 120px` to ensure heading clears the navbar
- Keep `min-height: var(--vh)` and `height: auto` (already correct)

**File: `src/components/styles/WhatIDo.css`**
- On desktop: change `.whatIDO` from `height: 100vh` to `min-height: 100vh; height: auto` so content doesn't clip
- Add `background-color: var(--backgroundColor)` and `z-index: 12` to mask the 3D character layer

**File: `src/components/styles/Career.css`**
- Add `padding-top: 80px` to `.career-section` to give breathing room from the section above

**File: `src/components/styles/Work.css`**
- Add `z-index: 12` and ensure `background-color: var(--backgroundColor)` is set

**File: `src/index.css`**
- `.techstack`: change `height: var(--vh)` to `min-height: var(--vh); height: auto`
- Remove `margin-bottom: -100px` which causes overlap with the Contact section

### 3. Reduce ScrollSmoother Speed
**File: `src/components/Navbar.tsx`**
- Reduce `speed` from `1.7` to `1.0` (normal speed) — the 1.7x speed is a major cause of content appearing to jump/cut between sections because the scroll distance is artificially compressed

### 4. Ensure All Sections Have Proper Background + Z-Index Stacking
Each section below the 3D character needs `background-color: var(--backgroundColor)` and appropriate `z-index` to mask the fixed-position character canvas:
- About: z-index 15 (already set)
- WhatIDo: bump to z-index 12, add background
- Career: z-index 12 (already set via inline style)
- Certifications: z-index 12 (already set via inline style)
- Work: z-index 12, add background
- TechStack: z-index 12, add background
- Contact: z-index 12 (already set via inline style)

### Files Modified
- `src/components/styles/Landing.css` — h3 color to white
- `src/components/styles/About.css` — padding-top increase
- `src/components/styles/WhatIDo.css` — min-height, background, z-index
- `src/components/styles/Career.css` — padding-top
- `src/components/styles/Work.css` — z-index, background
- `src/index.css` — techstack height fix, margin fix
- `src/components/Navbar.tsx` — reduce scroll speed

