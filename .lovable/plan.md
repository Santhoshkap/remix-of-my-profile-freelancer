

## Plan: Remove Hero Section Animation Only

### What changes

**File: `src/components/utils/GsapScroll.ts`**

Gut the `setLandingTimeline` function — remove all the GSAP timeline code inside it so it becomes a no-op. The function signature stays so callers don't break, but it does nothing.

Specifically, lines 40-59 get replaced with just a `return;` statement. This removes:
- Character rotation on scroll (y: 0 → 0.7)
- Camera zoom (z: 22)
- Character model slide left and fade out
- Landing container fade/slide
- About-me slide-in

**No other files or functions touched.** `setAboutToWhatTimeline`, `setWhatIDoTimeline`, and `setAllTimeline` remain exactly as they are.

### Result

The hero section will be static (no scroll-driven animation). The "What I Deliver" section animations, about-section transition, and career timeline all continue working independently.

