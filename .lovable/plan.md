

# Fix: Restore 3D Character Animation in "What I Do" Section

## Problem
When we added `.to(".character-model", { opacity: 0, duration: 0.6 }, 0.4)` to `tl1` to hide the character during the About section, the character never comes back. The `tl2` timeline (about→whatIDo transition) still moves the character and activates the monitor, but the model remains invisible because opacity is still 0.

## Solution

In `src/components/utils/GsapScroll.ts`, add a tween in the `tl2` timeline to fade the character model back in as the user scrolls past the About section into the "What I Do" section:

- Add `.to(".character-model", { opacity: 1, duration: 1, delay: 2 }, 0)` to `tl2` — this brings the character back with the monitor/screen light animations that already exist there.

This way:
- **Landing → About**: character fades out (existing fix, keeps headshot visible)
- **About → What I Do**: character fades back in with monitor glow
- **What I Do → Career**: character slides up and away (existing `tl3`)

**File**: `src/components/utils/GsapScroll.ts` — single line addition in `tl2` block (~line 75-110)

