

# About Me & What I Deliver — Refinements

## Changes

### 1. About Me Section (`src/components/About.tsx`)
- Remove the last paragraph ("Today, I work with organisations…") entirely (lines 101-107)
- Make "About Me" heading more prominent: add a glow text-shadow and slightly larger size
- Enhance accent-text highlights with stronger glow

### 2. About Me Heading Styles (`src/components/styles/About.css`)
- Increase `.about-content-col h3` font-size to 28px, add `text-shadow: 0 0 20px hsla(190,100%,50%,0.4)` for better visibility
- Reduce section padding to `60px 0` globally to cut excess whitespace

### 3. What I Deliver — Card Spacing & Fit (`src/components/styles/WhatIDo.css`)
- Reduce section padding from `100px 0` to `60px 0`
- Reduce card padding from `32px 36px` to `24px 28px` (desktop: `28px 32px`)
- Reduce card gap from `20px` to `16px`
- Reduce `.wid-card-header` margin-bottom from `14px` to `10px`
- Reduce `.wid-card-desc` margin-bottom from `18px` to `12px`
- These changes make all 3 cards fit within one viewport height

### 4. 3D Character Position Fix (`src/components/utils/GsapScroll.ts`)
- In `tl2`: push character further left (`x: "-35%"`) and increase camera z to `100` so the character is smaller and clearly left of cards
- In `tl3`: extend the scroll trigger end to `"bottom bottom"` so the character stays visible through all 3 cards before scrolling away
- Adjust `tl3` to use `y: "-120%"` so the character fully exits after the third card

### 5. Global Section Spacing Reduction
- **Career.css**: reduce padding from `80px 0 0` to `60px 0 0`
- **CertificationsSection.tsx**: reduce inline padding/margins if present
- **WhatIDo.css**: padding already reduced to `60px 0`

### 6. Animation Refinement
- Reduce `staggerChildren` from `0.15` to `0.12` in WhatIDo cards
- Reduce card entrance `y` from `40` to `24` for subtler motion
- Keep hover lift at `y: -4` (already premium)

## Files Modified
- `src/components/About.tsx` — remove last paragraph, enhance heading
- `src/components/styles/About.css` — heading glow, reduced padding
- `src/components/styles/WhatIDo.css` — tighter card spacing and padding
- `src/components/WhatIDo.tsx` — refined animation values
- `src/components/utils/GsapScroll.ts` — character position and sticky duration
- `src/components/styles/Career.css` — reduced top padding

