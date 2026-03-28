

# Certifications Section — Visual & Animation Upgrades

## Problems to Fix
1. **Text too large** — label text overflows the sphere; needs smaller font sized to fit inside the ball
2. **Transparent glass spheres look bad** — replace with a rich, solid dark-blue/purple metallic material with cyan glow
3. **Needs more animation polish** — add pulse glow, subtle idle rotation, and scale-bounce when settling into grid

## Changes (single file: `CertificationsSection.tsx`)

### 1. Smaller Text Rendered Directly on Sphere Surface
- Remove the billboard label plane entirely — instead bake the text directly onto the sphere's texture
- Reduce font sizes: max 38px for short names, 24px for longer ones (like "ISO 27001")
- Draw text centered on a 512x512 canvas with a subtle circular dark vignette background so text sits naturally on the sphere surface
- Use this canvas as both `map` and `emissiveMap` so text glows

### 2. New Sphere Material — Dark Metallic with Cyan Accent
Replace the transparent glass material with:
- Base color: deep navy/dark purple (`hsl(230, 50%, 15%)`)
- Metalness: 0.7, roughness: 0.3 — gives a sleek metallic look
- Emissive: cyan (`#00e5ff`) at low intensity (0.15) for ambient glow
- Clearcoat: 1.0 for reflective sheen
- No transmission/transparency — solid, premium feel

### 3. Enhanced Animations
- **Idle floating**: When not hovered, each sphere gets a subtle sin-wave vertical bob + slow Y-axis rotation (unique phase per sphere index) so they feel alive
- **Grid settle bounce**: When transitioning to grid, apply a slight overshoot spring (scale pulses from 1.0 → 1.15 → 1.0) using the physics impulse timing
- **Emissive pulse on hover**: When `isHovered`, ramp up the emissive intensity on each sphere's material from 0.15 → 0.5 with a smooth lerp, creating a "power up" glow effect across all spheres
- **Staggered grid arrival**: Add a per-sphere delay (index * 30ms equivalent via weaker spring force for higher indices) so spheres don't all snap to grid simultaneously — they cascade into place

### 4. Technical Details
- Each sphere gets its own `MeshPhysicalMaterial` instance (not shared) since we need per-sphere textures and dynamic emissive intensity
- The idle bob uses `useFrame` with `Math.sin(clock.elapsedTime + index)` for phase offset
- Label plane mesh and `labelGeometry` removed entirely
- Sphere geometry stays at 32 segments for quality

