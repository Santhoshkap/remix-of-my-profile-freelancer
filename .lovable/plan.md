

## Plan: Add 3D Globe Hero Background

Replace the cyber-bg animation in the landing section with a 3D rotating globe built with @react-three/fiber.

### Changes

**1. Create `src/components/GlobeHero.tsx`** (new file)
- Copy the uploaded file as-is — 3D globe with Earth texture, city markers, fly-lines, orbital rings, stars, and atmospheric GLSL shaders

**2. Replace `src/components/Landing.tsx`**
- Copy the uploaded file as-is — removes the old `landing-cyber-bg` div and its children, adds lazy-loaded `<GlobeHero />` inside a `.landing-globe-bg` container, plus a `.landing-text-veil` gradient overlay
- Hero text content stays identical

**3. Append globe CSS to `src/components/styles/Landing.css`**
- Keep all existing rules (lines 1–293: layout, text, character model, responsive breakpoints)
- Remove the old cyber-bg rules (lines 295–459: `.landing-cyber-bg`, `.cyber-grid`, `.cyber-scanline`, `.cyber-particle`, `.cyber-geo-*`, `.cyber-holo-ring`, `.cyber-hex-stream`, `.cyber-lines-svg`, and their mobile media query)
- Append the new globe CSS: `.landing-globe-bg`, `.landing-text-veil`, mobile overlay, and `.landing-cyber-bg { display: none }` fallback

### No other files are touched — About, Career, WhatIDo, etc. remain unchanged.

