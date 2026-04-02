

## Plan: Remove 3D Character Intro Animation

### What changes

**File: `src/components/Character/utils/animationUtils.ts`**

The `startIntro()` function (lines 35-46) plays the "introAnimation" clip on the character model when the page loads. This is what makes the character do its entrance pose.

**Change:** Make `startIntro()` a no-op — remove the clip lookup, reset, and play call, and the blink animation timeout. The function signature stays so callers don't break.

Specifically:
- Lines 35-46: Replace the body of `startIntro()` with just `return;`
- Also remove the initial `introAction.play()` on line 15 which pre-starts the intro clip immediately on load (lines 9-14 find and play it before `startIntro` is even called)

**No other files touched.** The typing animation, hover eyebrow animation, and blink will remain. The scroll-based animations in `GsapScroll.ts` are unaffected.

### Result

The character will appear in its default T-pose/idle state immediately without any entrance animation sequence.

