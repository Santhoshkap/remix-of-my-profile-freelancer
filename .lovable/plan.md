

# Fix Character Position & Update Tags

## Changes

### 1. Move 3D Character Down (`src/components/utils/GsapScroll.ts`)
- In `tl2`: change camera `y` from `8.4` to `6.0` — this shifts the character model lower so it sits below the "What I Deliver" heading instead of overlapping it
- Keep `x: "-35%"` and `z: 100` (already good for size/left position)
- In `tl3`: keep `y: "-120%"` exit animation and `end: "bottom bottom"` so character fades out when scrolling to Experience

### 2. Add More Tags to GRC Card (`src/components/WhatIDo.tsx`)
- Card 1 (GRC): add `HIPAA`, `HITRUST`, `ISO 42001`, `ISO 31000` to tags array
- Card 2 (Privacy): add `PDPL`, `CCPA` to tags array

### Files Modified
- `src/components/utils/GsapScroll.ts` — lower character position (camera y)
- `src/components/WhatIDo.tsx` — additional tags on cards 1 and 2

