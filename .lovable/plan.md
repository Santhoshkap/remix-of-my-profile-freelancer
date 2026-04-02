

## Plan: Realistic Cybersecurity-Themed 3D Earth Globe

### Concept
Replace the current wireframe sphere with a **realistic Earth globe** using NASA earth textures — a dark/night earth map with cyan-glowing city lights and country outlines, matching the cybersecurity theme.

### Approach
Use NASA's publicly hosted earth texture images (loaded via `THREE.TextureLoader`) on a sphere with custom shaders/materials to create a dark cyber-styled globe:

- **Night-side earth texture** — shows city lights glowing in cyan
- **Atmosphere glow** — cyan halo around the globe using a custom shader or a slightly larger transparent sphere
- **Slow auto-rotation** — continuous Y-axis spin
- Semi-transparent so hero text remains readable

### Textures (loaded from CDN — no local files needed)
- **Earth surface**: NASA Blue Marble night lights texture (free, public domain) — we'll tint it with the cyan cyber color
- **Bump map** (optional): for subtle surface relief
- Textures loaded from `https://unpkg.com/three-globe/example/img/` which hosts standard earth textures

### Changes

**1. `src/components/GlobeBackground.tsx`** — Complete rewrite
- Load earth night texture + optional bump map via `useLoader(TextureLoader, url)`
- Render a `SphereGeometry` with `MeshStandardMaterial` using the night earth map
- Add a second slightly larger sphere with a custom cyan atmosphere glow (additive blending, transparent)
- Keep the orbital rings from current design for the cyber feel
- Slow auto-rotation on Y axis
- Add `ambientLight` + `pointLight` for realistic lighting

**2. `src/components/styles/Landing.css`** — Minor adjustments
- Increase `.landing-globe` opacity from `0.35` to `0.5` for the realistic globe to be more visible
- Adjust sizing if needed for the realistic earth to look proportional

### Technical Details
- Uses existing `three` and `@react-three/fiber` (no new dependencies)
- `@react-three/drei`'s `useTexture` or Three's `TextureLoader` for loading textures
- Atmosphere effect: second sphere with `BackSide` rendering, cyan color, additive blending
- Earth tinted dark with cyan city lights for the cybersecurity aesthetic
- Canvas stays transparent with `alpha: true`
- `pointer-events: none` preserved so it doesn't interfere with text interaction

