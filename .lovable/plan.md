

## Plan: Freelancer-Style Profile Updates

### Change 1: Replace Resume with Profile PDF

**What:** The "RESUME" button in the bottom-right corner currently links to a GitHub-hosted resume PDF. We'll replace it with the uploaded `Santhosh_Profile.pdf`.

**Steps:**
1. Copy `user-uploads://Santhosh_Profile.pdf` to `public/Santhosh_Profile.pdf` so it's served as a static asset
2. Update `SocialIcons.tsx` — change the href and onClick URL from the GitHub resume link to `/Santhosh_Profile.pdf`
3. Change the button label from "RESUME" to "PROFILE" to match the new document

### Change 2: Reword Experience Section for Freelancer Positioning

**What:** The first experience entry says "2023 – Present" and uses language like "Serving as vCISO" which implies current full-time employment. We need to reframe all entries as past/completed engagements.

**Steps in `Career.tsx`:**

1. **First entry (Dexian)** — Change period from `"2023 – Present"` to `"2023 – 2025"`. Rewrite highlights to past tense:
   - "Built and scaled global GRC & cybersecurity advisory services"
   - "Led programs across ISO 27001, SOC 2, SOX, HITRUST, HIPAA, GDPR, DPDP, and NIST frameworks"
   - "Served as vCISO for enterprise clients" (was "Serving")

2. **Second entry (Accenture)** — Already past tense, no changes needed.

3. **Third entry (SRK Aviacom)** — Already past tense, no changes needed.

4. **Fourth entry (Vision Group)** — Rewrite to past tense:
   - "Led quality maintenance engineering for aviation operations in Phnom Penh, Cambodia"
   - "Ensured regulatory compliance and airworthiness standards across fleet operations"

5. **Section title** — Keep "My Experience" as-is (works well for freelancer positioning — shows track record).

### Technical Details

- **Files modified:** `src/components/SocialIcons.tsx`, `src/components/Career.tsx`
- **Files added:** `public/Santhosh_Profile.pdf`
- **No design/layout changes** — only content and link updates

