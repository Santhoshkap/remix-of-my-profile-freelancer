

# 3D Physics Certifications Section

## Overview
Replace the current flat certification badges with the same 3D physics-based bouncing sphere animation used in TechStack. Each certification will be rendered as text on a sphere that floats, collides, and reacts to the mouse cursor — creating an interactive, visually stunning certifications display.

## Certifications List (24 items)
CISA, CISM, CCISO, CC, HITRUST CCSFP, GRCP, GRCA, CRCMP, CSOE, ISO 27001 Lead Auditor, ISO 42001 Lead Auditor, ISO 9001 Lead Auditor, IRCA Registered Lead Auditor, GDPR Expert, DPDP Implementation Specialist, PMP, Scrum Master, ITIL v4, Six Sigma Green Belt, CSCP, IPMP, IBM AI Engineering, CQI

## Approach

### 1. Rewrite `CertificationsSection.tsx`
- Remove the old flat badge grid for certifications
- Keep the skill categories cards below (GRC, Cybersecurity, Privacy, Audit)
- Add a 3D Canvas section similar to TechStack but with certification text on spheres

### 2. 3D Certification Spheres
- Generate textures dynamically using **CanvasTexture**: for each certification string, draw text onto a canvas (white/cyan text on a dark translucent background), then use it as both `map` and `emissiveMap` on a `MeshPhysicalMaterial`
- Create ~24 spheres (one per certification) with varied scales (0.6-1.0)
- Same physics setup: zero-gravity, impulse toward center, ball colliders, pointer interaction
- Spheres bounce off each other and react to mouse cursor — identical behavior to TechStack

### 3. Scroll-based Activation
- Use IntersectionObserver or scroll listener on the `#certifications` section to activate/deactivate physics (same pattern as TechStack uses with `isActive`)

### 4. Layout
- Section heading "Certifications & Skills" stays
- 3D Canvas takes up ~500px height below heading, above the skill category cards
- Canvas has transparent background so the section's radial gradient shows through
- On mobile (< 1024px), fall back to simple animated badges (no 3D) since the physics canvas is heavy

### 5. Texture Generation Utility
- A helper function `createTextTexture(text: string): THREE.CanvasTexture` that:
  - Creates a 256x256 canvas
  - Fills with semi-transparent dark background
  - Draws certification text centered in white/cyan
  - Returns as THREE.CanvasTexture

## Files Modified
- `src/components/CertificationsSection.tsx` — full rewrite with 3D canvas + fallback badges
- No new files needed; reuses same Three.js + Rapier physics stack already in the project

