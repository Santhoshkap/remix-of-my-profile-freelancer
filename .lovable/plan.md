

# Portfolio Fix & Enhancement Plan

## Issues to Fix

### 1. Remove LinkedIn from Header
Remove the `navbar-connect` link from `Navbar.tsx` (lines 49-57).

### 2. Fix Social Icons Hover — Icons Going Black
The bug is in `SocialIcons.css` line 22-23: `.social-icons:hover { color: var(--backgroundColor) }` and line 25: `.social-icons a:hover { color: var(--backgroundColor) }`. These set the icon color to the dark background on hover, making them invisible. Fix by changing hover color to `var(--accentColor)` (cyan) with a glow effect. Also update LinkedIn URL to `https://www.linkedin.com/in/santhosh-kapalavai` and add a phone icon with `+91-8125414012`.

### 3. Fix Landing Section — Merged Text Below "GRC & Cybersecurity"
The text below "GRC & Cybersecurity" has overlapping `h2` elements with `Strategy`/`Advisory` duplicated in two `h2` tags with absolute positioning causing merge. Replace with:
- Static: "GRC & Cybersecurity" (keep as is)
- Animated rotating words: cycle through "Implementer", "Auditor", "Advisor", "Strategist", "Leader" using framer-motion `AnimatePresence` with a typewriter/fade effect

Also fix `Landing.css` — the `landing-info h2` has `margin-top: -20px` causing overlap. Clean up spacing.

### 4. Update Contact Details Everywhere
- LinkedIn: `https://www.linkedin.com/in/santhosh-kapalavai` (with hyphen)
- Phone: `+91-8125414012`
- Email: `santhoshkapalavai@gmail.com`
- Update in: `SocialIcons.tsx`, `Navbar.tsx`, `Contact.tsx`

### 5. Enhance "What I Do" Section
Currently only 2 cards and looks empty. Add a 3rd card for "ADVISORY & LEADERSHIP" (vCISO, board advisory, thought leadership). Enhance visual styling:
- Add subtle gradient backgrounds to cards
- Add animated icon/illustration per card using CSS
- Add a floating 3D shield or lock icon using framer-motion 3D transforms
- Improve the corner bracket animations with cyan glow

### 6. Content Improvements
- **Contact.tsx**: Update phone to `+91-8125414012`, location to "India / Global", fix LinkedIn URL
- **WhatIDo.tsx**: Richer descriptions, add third service card
- **About.tsx**: Verify content is accurate per CV

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/Navbar.tsx` | Remove LinkedIn link from header |
| `src/components/SocialIcons.tsx` | Fix URLs, add phone icon |
| `src/components/styles/SocialIcons.css` | Fix hover color from black to cyan |
| `src/components/Landing.tsx` | Replace dual h2 with rotating word animation |
| `src/components/styles/Landing.css` | Fix margin/spacing on landing-info h2 |
| `src/components/WhatIDo.tsx` | Add 3rd card, enhance content |
| `src/components/styles/WhatIDo.css` | Add glow effects, gradient backgrounds |
| `src/components/Contact.tsx` | Fix phone, location, LinkedIn URL |

## Technical Approach

**Rotating words animation** (Landing.tsx):
- Array of roles: `["Implementer", "Auditor", "Advisor", "Strategist", "Leader"]`
- `useState` + `useEffect` interval cycling every 2.5s
- `AnimatePresence` with slide-up + fade transitions
- Single clean h2 element, no overlapping duplicates

**Social icons hover fix**:
- Change hover to `color: var(--accentColor)` with `filter: drop-shadow(0 0 8px var(--accentColor))`

**What I Do enhancement**:
- 3 cards instead of 2 (GRC, Privacy, Advisory)
- Add floating 3D decorative element using `motion.div` with `rotateX`/`rotateY` perspective transforms
- Cyan-tinted gradient borders on cards

