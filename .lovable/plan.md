

## Plan: Restrict 3D Character to "What I Deliver" Section Only

### Problem
The 3D character currently appears in the hero/landing section and animates through About into the "What I Deliver" section via three GSAP scroll timelines (tl1, tl2, tl3). You want it to only appear in the "What I Deliver" section.

### Changes

**1. `src/components/utils/GsapScroll.ts` — Rewrite `setCharTimeline`**

Remove `tl1` (landing) and `tl2` (about) timelines entirely. Replace with a single timeline triggered by `.whatIDO`:

- Character starts hidden (opacity 0) and becomes visible when scrolling into the "What I Deliver" section
- Keep the desk/monitor animation, screen light flicker, and neck bone rotation — but trigger them all from the `.whatIDO` scroll trigger
- Character fades in at the start of the section, positioned to the left (x: -40%), already in the "at desk" pose
- Keep `tl3`'s exit animation (character moves up and out as you scroll past)
- On mobile (<=1024px), keep existing behavior (just show `.what-box-in`)

**2. `src/components/styles/Landing.css` — Hide character initially on desktop**

On desktop (min-width: 1025px), set `.character-model` to start with `opacity: 0` so it doesn't flash in the hero section. The GSAP timeline will animate it to visible when reaching the services section.

**3. `src/components/MainContainer.tsx` — No changes needed**

The character container is already positioned fixed on desktop, so it can appear at any scroll point. No structural changes required.

### What stays the same
- The 3D model loading, lighting, head-tracking, and intro animation logic in Scene.tsx
- The career timeline in `setAllTimeline()`
- Mobile layout behavior
- All other section animations

### Summary
| File | Change |
|------|--------|
| `src/components/utils/GsapScroll.ts` | Remove tl1 + tl2, rewrite to single whatIDO-triggered timeline |
| `src/components/styles/Landing.css` | Set initial `opacity: 0` on desktop `.character-model` |

