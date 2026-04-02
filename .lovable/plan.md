

## Plan: Add Impact Liner to Hero Section + Verify Scrolling

### 1. Add a tagline/liner below the name in the hero section

**File: `src/components/Landing.tsx`**

Add a one-liner tagline between the name and the bottom info area — something like:

> "Securing Digital Resilience Through Governance, Risk & Compliance"

This will be added as a `motion.p` element inside `.landing-intro`, right after the `h1` (line 158), with a fade+blur entrance animation matching the existing style. It will use the accent color and a slightly smaller Orbitron font.

**File: `src/components/styles/Landing.css`**

Add styles for `.landing-liner`:
- Orbitron font, ~14px on mobile scaling up at breakpoints
- Accent color with subtle text-shadow glow
- Letter-spacing for the cyber aesthetic
- Responsive sizing at 768px, 1025px, and 1600px breakpoints

### 2. Verify scrolling works

**File: `src/components/Navbar.tsx`**

The nav links use `smoother.scrollTo()` on desktop (>1024px) but on mobile they fall through to native `#hash` navigation. Since the content is inside `#smooth-wrapper > #smooth-content`, native hash scrolling may not work on mobile.

**Fix:** Remove the `if (window.innerWidth > 1024)` check so `smoother.scrollTo()` is used on all screen sizes. Also add `e.preventDefault()` unconditionally to prevent the hash from interfering.

### Summary

| File | Change |
|------|--------|
| `src/components/Landing.tsx` | Add `motion.p` liner after the name |
| `src/components/styles/Landing.css` | Add `.landing-liner` styles + responsive |
| `src/components/Navbar.tsx` | Remove desktop-only guard on scroll navigation |

