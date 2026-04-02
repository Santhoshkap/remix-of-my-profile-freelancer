

## Plan: Decouple Hero and "What I Deliver" Animations

### Problem

In `src/components/utils/GsapScroll.ts`, the `setCharTimeline()` function creates three GSAP timelines (`tl1`, `tl2`, `tl3`) in a single function. They share local variables (`screenLight`, `monitor`, `neckBone`, `character`) and mutate the same 3D objects. When you modify one timeline, it can break the shared state that another timeline depends on — causing the other animation to disappear or malfunction.

### Solution

Split `setCharTimeline` into three independent functions, each owning its own timeline and extracting only the 3D references it needs:

| New Function | Trigger Section | What It Animates |
|---|---|---|
| `setLandingTimeline` | `.landing-section` | Hero fade-out, character rotation, about-me slide-in (tl1) |
| `setAboutToWhatTimeline` | `.about-section` | Character zoom-out, monitor reveal, transition to "What I Deliver" (tl2) |
| `setWhatIDoTimeline` | `.whatIDO` | Character slide-up, section parallax (tl3) |

### Technical Changes

**1. `src/components/utils/GsapScroll.ts`**
- Extract shared setup (finding `screenLight`, `monitor`, `neckBone` from character) into a helper function `getCharacterParts()` that returns these references
- Split `setCharTimeline` into three exported functions, each creating only its own GSAP timeline
- Each function calls `getCharacterParts()` independently so they don't share mutable state
- Keep `setAllTimeline()` unchanged (it's already independent — career section only)

**2. `src/components/Character/utils/character.ts`**
- Update the import to call the three new functions instead of `setCharTimeline`

**3. `src/components/Character/utils/resizeUtils.ts`**
- Same update — call the three new functions on resize instead of `setCharTimeline`

### What This Enables

After this refactor, you can safely modify or remove any one section's animation (e.g., the hero entrance) without affecting the "What I Deliver" transition or vice versa. Each timeline is self-contained.

