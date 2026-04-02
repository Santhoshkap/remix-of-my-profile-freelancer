

## Plan: Add 3D Globe Animation to Hero Section

### Concept
Create a slowly rotating 3D wireframe/holographic Earth globe that sits behind the hero text as a background element. The globe will use the cyber theme colors (hsl 190 cyan) and be semi-transparent so text remains clearly readable on top.

### Layout

```text
┌──────────────────────────────────┐
│         HERO SECTION             │
│                                  │
│  "Hello I'm"    ┌──────────┐    │
│  SANTHOSH       │  3D GLOBE│    │
│  KAPALAVAI      │ (behind  │    │
│                 │  text)   │    │
│  GRC & Cyber    └──────────┘    │
│  [Implementer]                   │
└──────────────────────────────────┘
Desktop: Globe on right side, behind the info text
Mobile: Globe centered, behind all text, smaller
```

### Changes

**1. New component: `src/components/GlobeBackground.tsx`**
- Uses `@react-three/fiber` Canvas + `@react-three/drei` (Sphere geometry)
- Renders a wireframe sphere with cyan-colored edges matching the cyber theme
- Slow auto-rotation on Y axis
- Semi-transparent (opacity ~0.15-0.25) so text reads clearly over it
- Subtle glow effect using emissive material
- No user interaction needed — purely decorative

**2. `src/components/Landing.tsx`**
- Import and render `<GlobeBackground />` inside `.landing-container`
- Position it absolutely behind the text content using a wrapper div with `z-index: 0` and `pointer-events: none`

**3. `src/components/styles/Landing.css`**
- Add `.landing-globe` styles:
  - Absolute positioned, right-aligned on desktop, centered on mobile
  - ~500px width/height on desktop, ~300px on mobile
  - `z-index: 1` (behind text which is `z-index: 9`)
  - `opacity: 0.3` for subtle background effect
  - Responsive breakpoints matching existing layout

### Technical Details
- Uses existing `three`, `@react-three/fiber`, and `@react-three/drei` dependencies (already installed)
- Globe rendered as wireframe `SphereGeometry` with `MeshBasicMaterial` (no lighting needed)
- Optional: add dot-style points on sphere surface for a data-visualization look
- Canvas has `alpha: true` for transparent background
- `frameloop="always"` for continuous rotation

