
Issue findings
- Screenshot review shows the Privacy card gets the expected hover state, while GRC appears inconsistent.
- The current GRC behavior is tied mostly to text-level hover (`.wid-card-title:hover`) instead of reliable card-level hover (`.wid-card:hover ...`), so it fails depending on exact cursor position.
- Loader feels slow because timing is compounded by both delayed phase transitions and a slow progress tail.

Implementation plan

1) Make GRC hover behavior identical to Privacy card
- Refactor hover trigger in `WhatIDo.css` from element-only hover to card-level hover:
  - `.wid-card:hover .wid-card-title`
  - `.wid-card:hover .wid-card-subtitle`
  - include `:focus-within` for keyboard parity.
- Keep shield decoration non-interactive (`pointer-events: none`) and ensure card text stack is always hoverable (explicit z-index/position on content block if needed).
- Keep the same cyan glow style token as Privacy so both cards animate identically.

2) Speed up loading experience (without downgrading visuals)
- In `Loading.tsx`, reduce staged waits:
  - post-100% wait, ready hold, flash duration, and exit delay.
- In `setProgress`, increase progress cadence so it reaches completion faster after model load.
- Light performance trim:
  - reduce network canvas node density and update frequency for secondary effects (hex stream), preserving premium shield visuals.

3) Reconfirm mobile single-line title stability
- In `Landing.css`, harden one-line behavior for “GRC & Cybersecurity” with compact responsive typography (`clamp`) and nowrap safeguards for small widths.

Files to update
- `src/components/styles/WhatIDo.css`
- `src/components/WhatIDo.tsx` (only if a content wrapper/class hook is needed)
- `src/components/Loading.tsx`
- `src/components/styles/Loading.css`
- `src/components/styles/Landing.css`

Validation checklist before publish
- Desktop: Hover GRC and Privacy titles/subtitles/tags and confirm identical color/glow transitions.
- Verify GRC hover triggers from full card hover, not only exact text hitbox.
- Confirm no hover effect leaked to long descriptive paragraphs.
- Loader: visibly faster transition from splash to site while shield remains premium.
- Mobile (320/360/390/414): “GRC & Cybersecurity” stays on one line and no horizontal overflow.
