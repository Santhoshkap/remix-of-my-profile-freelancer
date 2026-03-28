

# Comprehensive Fix: Layout, Scrolling, Contact Form, and Enhanced Animations

## Problems Identified

1. **About Me heading ("ABOUT ME") not visible** — gets hidden behind the navbar or overlapped by the fixed 3D character layer due to z-index stacking
2. **"My Toolkit" heading merges with the 3D canvas animation** — the h2 is `position: absolute` at `top: 120px` inside the canvas container, gets buried behind the spheres
3. **Real estate issues across sections** — the About section on desktop uses `height: var(--vh)` which can clip content; What I Do cards are cramped at certain breakpoints
4. **Contact form doesn't actually send emails** — currently just toggles a "sent" state with no backend; needs to send to santhoshkapalavai@gmail.com
5. **No interactive text hover effects** — user wants cursor-based word highlighting across sections
6. **Limited 3D feel** — user wants more depth and animation polish

## Plan

### 1. Fix About Section Heading Visibility & Layout
**File: `src/components/styles/About.css`**
- On desktop (`min-width: 1025px`), change `height: var(--vh)` to `min-height: var(--vh)` so content isn't clipped
- Increase `z-index` from 12 to 15 to ensure it sits above the character model layer
- Add top padding (e.g. `padding-top: 80px`) to prevent navbar overlap with the "About Me" heading

**File: `src/components/About.tsx`**
- Wrap the heading in a motion div with a glow entrance animation

### 2. Fix "My Toolkit" Heading Overlapping with 3D Spheres
**File: `src/index.css`** (`.techstack h2` styles)
- Add `z-index: 10` and `pointer-events: none` to the h2 so it layers above the canvas
- Add a text-shadow glow and a semi-transparent dark background behind the text for readability
- Add entrance animation to the heading

**File: `src/components/TechStack.tsx`**
- Wrap the h2 in a motion component with a scroll-triggered fade-in

### 3. Fix General Real Estate / Spacing Issues
**File: `src/components/styles/About.css`**
- Desktop: switch from fixed `height: var(--vh)` to `min-height: var(--vh)` with `auto` height so paragraphs don't overflow

**File: `src/components/styles/WhatIDo.css`**
- Ensure `.whatIDO` section has proper spacing from surrounding sections

**File: `src/components/styles/Career.css`**
- Add appropriate top margin/padding so the career section doesn't crowd the What I Do section

### 4. Make Contact Form Send Emails via mailto
**File: `src/components/Contact.tsx`**
- Since there's no backend, implement the form to open a `mailto:` link with the form data pre-filled (name in subject, message in body) targeting `santhoshkapalavai@gmail.com`
- Alternatively, use a free form service like Formspree or Web3Forms — but since no API keys are configured, `mailto:` is the most reliable zero-config approach
- The form will collect name, email, and message, then construct and open: `mailto:santhoshkapalavai@gmail.com?subject=Contact from {name} ({email})&body={message}`
- Show the "Message Sent!" confirmation after opening mailto

### 5. Add Interactive Text Hover Effects
**File: `src/components/AnimationUtils.tsx`**
- Create a new `GlowText` component that wraps text and highlights individual words on hover with a color shift to the accent color and a glow effect
- Create a `TextRevealOnHover` wrapper that changes word colors to `var(--accentColor)` with a text-shadow glow when the cursor moves over them

**File: `src/components/About.tsx`**
- Apply `GlowText` to the body paragraphs so hovering over words creates a highlight/glow trail effect

**File: `src/components/Career.tsx`**
- Apply hover glow to experience card highlight text

### 6. Add More 3D-Style Animations
**File: `src/components/CertificationsSection.tsx`**
- Add `perspective` and `rotateX/rotateY` tilt on hover for certification badges (3D card tilt)
- Add a subtle floating animation to skill category cards

**File: `src/components/Contact.tsx`**
- Add 3D tilt effect on the contact form card on hover using `useMotionValue` and `useTransform`

**File: `src/components/Career.tsx`**
- Add 3D perspective tilt to timeline cards on hover

**File: `src/components/AnimationUtils.tsx`**
- Create a reusable `Tilt3D` wrapper component using framer-motion's `useMotionValue` + mouse tracking for realistic 3D card rotation

### 7. Polish & Cross-Section Checks
- Ensure all section headings are visible and not overlapped
- Verify z-index stacking across navbar (9999), character model (11 fixed), about (15), whatIDo (9), career, certifications, work, techstack, contact
- Add `background-color: var(--backgroundColor)` to sections below the 3D character to ensure they mask the fixed character layer properly

## Technical Details

**Files modified:**
- `src/components/styles/About.css` — z-index, min-height, padding fixes
- `src/index.css` — techstack h2 z-index and readability
- `src/components/TechStack.tsx` — animated heading
- `src/components/Contact.tsx` — mailto integration + 3D tilt
- `src/components/AnimationUtils.tsx` — new GlowText + Tilt3D components
- `src/components/About.tsx` — apply GlowText to paragraphs
- `src/components/Career.tsx` — 3D tilt on cards
- `src/components/CertificationsSection.tsx` — 3D tilt on badges/cards
- `src/components/styles/WhatIDo.css` — spacing adjustments
- `src/components/styles/Career.css` — spacing adjustments

