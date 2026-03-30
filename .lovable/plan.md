

## Fix: Profile Button Opening PDF Twice

**Problem:** Clicking the PROFILE button opens the PDF in a new tab (via `openExternalLink`) AND also navigates the current page to the PDF (because the fallback in `openExternalLink` sets `window.location.href`). In the Lovable preview iframe, `window.open` may be blocked, so the fallback triggers and replaces the current page.

**Fix in `src/components/SocialIcons.tsx` (line 98):**
Remove the `onClick` handler from the resume button. Keep just the native `<a href="/Santhosh_Profile.pdf" target="_blank">` behavior — this is sufficient to open the PDF in a new tab without the double-navigation issue.

**Change:**
- Line 98: Delete `onClick={(e) => handleExternalNavigation(e, "/Santhosh_Profile.pdf")}`

One file, one line removed. The native anchor with `target="_blank"` handles new-tab opening correctly.

