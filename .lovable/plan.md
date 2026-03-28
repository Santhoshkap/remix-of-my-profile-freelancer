

# Premium Cursor Upgrade with Text Interaction Effects

## Overview
Transform the basic dot+ring cursor into a sophisticated cyberpunk cursor with particle trails, magnetic text interaction, and color-shift effects on text hover.

## Changes

### 1. Enhanced Cursor Component (`src/components/Cursor.tsx`)
- **Glowing dot core** with animated pulsing inner glow
- **Rotating dashed ring** that spins continuously (CSS animation)
- **Particle trail**: Canvas element that draws 6-8 trailing particles behind the cursor with fade-out, creating a comet-tail effect
- **Text detection**: On mouseover of any text element (`h1-h6, p, span, a, li`), the ring morphs into a larger blurred mix-blend-mode circle that inverts/highlights text beneath it
- **Magnetic pull**: When near clickable elements, the dot subtly accelerates toward them
- **Click burst**: On mousedown, briefly scale the ring up with a flash

### 2. Updated Cursor Styles (`src/components/styles/Cursor.css`)
- **Rotating ring**: `@keyframes cursor-spin` for continuous ring rotation with dashed border
- **Text hover state**: `.cursor-text-mode` — ring grows to ~60px, adds `mix-blend-difference` so text underneath shifts color automatically (white text becomes cyan against dark bg)
- **Click animation**: `.cursor-click` with a quick scale pulse
- **Trail canvas**: Full-screen fixed canvas behind cursor elements

### 3. Text Color Interaction
- Instead of manually changing text colors, use CSS `mix-blend-mode: difference` on the cursor ring when hovering text — this naturally creates a color inversion effect where text appears to change color as the cursor passes over it
- The ring becomes a filled semi-transparent circle in text mode, creating a spotlight/lens effect

## Files Modified
- `src/components/Cursor.tsx` — full rewrite with particle trail canvas + text detection
- `src/components/styles/Cursor.css` — new animations, blend modes, text-mode states

