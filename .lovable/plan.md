

## Plan: Fix 3D Character Size in Services Section

### Problem
After removing the landing/about timelines, the character appears at full `100vh` height on desktop, making it oversized and overlapping the service cards. The original design had the character scale down as it transitioned through sections — that scaling is now missing.

### Changes

**1. `src/components/styles/Landing.css` — Reduce character size on desktop**

In the `@media (min-width: 1025px)` block (line 240-247), change `.character-model` from `height: 100vh` to a smaller, contained size that fits alongside the service cards:

- Change `height: 100vh` → `height: 70vh`
- Add `max-height: 700px` to cap it on very tall screens
- Add `bottom: 5%` to position it properly within the section

**2. `src/components/utils/GsapScroll.ts` — Add scale-down in the timeline**

In the `tlServices` timeline, add a `scale` property to the `.character-model` fade-in so the character enters at a reasonable size:

- Change the fade-in `fromTo` (line 60-65) to include `scale: 0.85` as the final state
- This keeps the character proportional to the cards beside it

**3. `src/components/utils/GsapScroll.ts` — Adjust camera zoom**

After setting the desk pose (line 54-56), increase `camera.zoom` to ~1.4 and call `camera.updateProjectionMatrix()` to make the 3D model render smaller within its canvas.

### Summary
| File | Change |
|------|--------|
| `src/components/styles/Landing.css` | Reduce desktop `.character-model` height from 100vh to 70vh, add max-height |
| `src/components/utils/GsapScroll.ts` | Add camera zoom adjustment + scale in fade-in animation |

