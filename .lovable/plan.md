

# Fix Certification Sphere Readability & Colors

## Problems
1. **Text not readable**: The texture is 512×512 but text is small, spheres rotate freely so text faces away, and emissive intensity is too low — certifications are barely visible
2. **Colors are dull**: Dark translucent spheres with low-contrast cyan text blend into the dark background

## Solution

### 1. Improve `createTextTexture` for maximum readability
- **Larger, bolder text**: Increase base font sizes (short names like "CISA" → 80px, medium → 60px, long → 44px)
- **High-contrast colors**: Use bright white text with a colored glow/shadow behind it instead of just cyan
- **Colorful sphere backgrounds**: Assign each certification a category-based color (e.g., security certs = electric blue, audit = purple, management = teal, AI/tech = green) — fill the sphere with a rich semi-transparent gradient instead of near-black
- **Add a glowing text stroke**: `ctx.strokeText` with a bright outline so text pops even at angles
- **Border ring**: Thicker, brighter ring matching the category color

### 2. Better material settings
- Increase `emissiveIntensity` from 0.35 → 0.8 so text glows visibly
- Reduce `metalness` from 0.5 → 0.2 and `roughness` from 1 → 0.3 for a shinier, more vibrant look
- Add higher `clearcoat` (0.5) for glossy reflection

### 3. Slow down sphere rotation
- Increase `angularDamping` from 0.15 → 0.9 so spheres don't spin wildly — text stays readable longer
- This keeps the bouncing/collision physics but prevents rapid spinning

### 4. Color palette for sphere categories
```text
Security (CISA, CISM, CCISO, CC, HITRUST): #0066ff (electric blue)
GRC (GRCP, GRCA, CRCMP, CSOE):            #8b5cf6 (purple)
ISO/Audit (ISO *, IRCA):                   #06b6d4 (cyan)
Privacy (GDPR, DPDP):                      #10b981 (emerald)
Management (PMP, Scrum, ITIL, Six Sigma):  #f59e0b (amber)
Tech (IBM AI, CSCP, IPMP, CQI):            #ec4899 (pink)
```

Each sphere gets a gradient fill of its category color, making the collection visually diverse and impressive.

## Files Modified
- `src/components/CertificationsSection.tsx` — updated `createTextTexture`, material settings, angular damping, and color mapping

