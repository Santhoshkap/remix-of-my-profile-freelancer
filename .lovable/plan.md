

# Plan: Headshots, Resume Fix, About Me Redesign

## 1. Add Headshot Photos

Copy both uploaded images to `src/assets/` and use them in the About section. Display one as a profile photo with a glowing cyan border and subtle hover animation (scale + glow pulse). The second image can be used as an alternate or in a different section.

**Files**: Copy images, edit `About.tsx`, `About.css`

## 2. Fix Resume Download

The resume button links to `/Santhosh_Kapalavai.pdf` but the uploaded file needs to be copied to `public/Santhosh_Kapalavai.pdf` (replacing the current one). Copy `user-uploads://Santhosh_Kapalavai_CV-3.pdf` to `public/Santhosh_Kapalavai.pdf`.

**Files**: Copy PDF to `public/Santhosh_Kapalavai.pdf`

## 3. Redesign About Me Section

Restructure `About.tsx` into a two-column layout:
- **Left column**: Profile headshot with glowing border, animated scan line effect, and corner brackets (cyber HUD style)
- **Right column**: Enhanced content based on the reference text provided, broken into digestible paragraphs with scroll-reveal animations

Content will include:
- Opening hook about being a GRC/Cybersecurity/Privacy leader with a decade of global experience
- Geographic reach (India, US, Middle East, Southeast Asia)
- Specialization in ISO, SOC 2, HITRUST, vCISO work
- Unique value prop: technical + executive + commercial blend
- Aviation-to-cybersecurity origin story (brief)
- Closing: "clarity, credibility, and a competitive edge"

Animations:
- Profile image: floating animation with subtle `rotateY` tilt on scroll
- Glowing accent line divider between paragraphs
- Each paragraph fades in via `ScrollRevealText` or staggered reveal
- Cyan accent highlights on key phrases

**CSS changes**: Update `About.css` for two-column grid layout, image container with glow border, responsive stacking on mobile.

**Files**: `About.tsx`, `About.css`

## Files to Modify

| File | Change |
|------|--------|
| `public/Santhosh_Kapalavai.pdf` | Replace with new CV |
| `src/assets/headshot1.jpeg` | Copy headshot (side profile) |
| `src/assets/headshot2.jpeg` | Copy headshot (arms crossed) |
| `src/components/About.tsx` | Two-column layout with photo + enhanced content |
| `src/components/styles/About.css` | Grid layout, image glow effects, responsive |

