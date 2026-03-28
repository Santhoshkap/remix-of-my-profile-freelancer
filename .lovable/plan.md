

# Fix Spacing, Headings, Work Carousel & Remove TechStack

## 1. Reduce Section Spacing Globally

Standardize all section padding to a tighter, consistent value (~40px mobile, ~60px desktop):

| Section | Current | New |
|---|---|---|
| About (.about-section) | `padding: 60px 0` | `padding: 40px 0` |
| WhatIDo (.wid-section) | `padding: 60px 0` | `padding: 40px 0` |
| Career | `py-20 md:py-32` | `py-10 md:py-16` |
| Achievements | `py-6 md:py-10` | `py-8 md:py-12` (fine, keep similar) |
| Certifications | `py-10 md:py-16` | `py-8 md:py-12` |
| Work (.work-section) | `padding: 80px 0` | `padding: 40px 0` |
| Contact | reduce bottom heading margin from `mb-16 md:mb-20` to `mb-8 md:mb-12` |

Also reduce inner heading margins (e.g. Career `mb-16 md:mb-24` → `mb-8 md:mb-12`).

## 2. Two-Color Headings for All Sections

Make every section heading use a two-tone style (white + cyan accent) like "My Work":

- **About Me** → "About **Me**" (accent on "Me")
- **What I Deliver** → already has accent on "Deliver" ✓
- **Experience** → "My **Experience**" (accent on "Experience")
- **Achievements & Recognition** → "Achievements & **Recognition**" (accent on "Recognition")
- **My Certifications** → "My **Certifications**" (accent on "Certifications")
- **My Work** → already two-tone ✓
- **Get In Touch** → "Get In **Touch**" (accent on "Touch")

The accent `<span>` uses `color: var(--accentColor)` (cyan) — same pattern as Work section.

## 3. Fix Work Carousel — 4 Projects, Fix Sizing

The carousel has 4 projects (GRC, SOC 2, Privacy, vCISO) with `min-width: 100%` slides. The dots correctly show 4. The issue is likely the carousel container width or content overflowing. Will:

- Remove the `section-container` width constraint on the work container so the carousel uses full available width
- Ensure each slide's content fits properly within the viewport without cutting off
- Verify all 4 dots correspond to 4 slides correctly

**Files:** `Work.css` — adjust `.work-section` and `.carousel-content` sizing, and `Work.tsx` if needed.

## 4. Remove TechStack Section Entirely

- **`MainContainer.tsx`**: Remove the lazy import of `TechStack`, remove the `<Suspense><TechStack /></Suspense>` block
- **`TechStack.tsx`**: Delete or leave unused (will remove import references)
- This removes the "My Toolkit" 3D bouncing spheres section completely

## Files Modified

1. **`src/components/styles/About.css`** — reduce padding
2. **`src/components/styles/WhatIDo.css`** — reduce padding
3. **`src/components/styles/Career.css`** — reduce padding
4. **`src/components/styles/Work.css`** — reduce padding, fix carousel sizing
5. **`src/components/styles/Contact.css`** — reduce spacing
6. **`src/components/About.tsx`** — two-color heading
7. **`src/components/Career.tsx`** — two-color heading + reduce spacing classes
8. **`src/components/Achievements.tsx`** — two-color heading + adjust spacing
9. **`src/components/CertificationsSection.tsx`** — two-color heading + adjust spacing
10. **`src/components/Contact.tsx`** — two-color heading + reduce margin
11. **`src/components/MainContainer.tsx`** — remove TechStack import and rendering

