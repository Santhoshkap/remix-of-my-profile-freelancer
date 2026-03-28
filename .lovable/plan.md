

# Loading Screen — Ultimate First Impression Overhaul

## What's Changing

### 1. Background: Animated Network Topology
Replace the basic floating particles with a **connected-node network animation** (canvas-based). Nodes drift slowly across the screen and draw faint lines between nearby nodes — creating a "digital network map" effect. Much more impressive than simple dots.

- 30-40 nodes with varying sizes (2-4px) and opacity
- Lines drawn between nodes within proximity, opacity fading with distance
- Nodes drift at random velocities, wrap around edges
- Subtle cyan glow on nodes, faint lines in hsl(190, 100%, 50%, 0.1)
- Canvas sits behind all content at z-index 1

### 2. Add a Second Outer Ring
- Add a second ring around the logo (slightly larger, solid thin border, rotating in the opposite direction) for a more layered, premium look

### 3. Rewrite Status Lines for GRC + Cybersecurity
Replace the current overly-hacker status lines with ones that reflect both GRC and cybersecurity expertise:
- `"INITIALIZING COMPLIANCE ENGINE..."`
- `"LOADING RISK FRAMEWORKS..."`
- `"VERIFYING ISO 27001 CONTROLS..."`
- `"SCANNING THREAT LANDSCAPE..."`
- `"VALIDATING GOVERNANCE POLICIES..."`
- `"ESTABLISHING SECURE CHANNEL..."`
- `"MAPPING REGULATORY REQUIREMENTS..."`
- `"ACTIVATING GRC DASHBOARD..."`

### 4. Update Subtitle & Bottom Text
- Subtitle: `"GRC & CYBERSECURITY OPERATIONS"` (was just "CYBERSECURITY OPERATIONS")
- Bottom left: `"GOVERNANCE · RISK · COMPLIANCE"` (was "GRC & CYBERSECURITY")
- Bottom right stays: `"SANTHOSH KAPALAVAI"`

### 5. Add Certification Ticker
A slowly scrolling horizontal line of certification badges near the bottom — `CISA · CISM · CCISO · ISO 27001 LA · HITRUST · PMP · GDPR` — in very subtle text that scrolls continuously left. Creates a professional impression.

### 6. Enhanced Grid — Perspective Transform
Add a CSS `perspective` + `rotateX` to the grid overlay to make it look like a 3D floor grid receding into the distance, rather than a flat grid.

### 7. Pulsing Concentric Circles
Add 3 concentric circles behind the logo that pulse outward and fade — like a radar/sonar ping effect. Pure CSS animations.

## Files Modified
- `src/components/Loading.tsx` — canvas network animation, updated status lines, certification ticker, extra ring, radar circles
- `src/components/styles/Loading.css` — perspective grid, radar pulse keyframes, ticker animation, dual ring styles

## Technical Notes
- Network animation uses a `<canvas>` element with `requestAnimationFrame` for smooth 60fps rendering, cleaned up on unmount
- Certification ticker uses CSS `@keyframes tickerScroll` with `translateX` for infinite horizontal scroll
- All new animations are pure CSS except the canvas network — no new dependencies

