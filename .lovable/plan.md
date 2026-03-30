

## Plan: Add Air Works Analyst Experience

Add a fifth experience entry to the Career timeline in `src/components/Career.tsx`.

### New Entry

| Field | Value |
|-------|-------|
| Title | Analyst |
| Company | Air Works · India |
| Period | 2015 – 2016 |
| Icon | `Wrench` (reuse — aviation/maintenance context) |
| Highlights | Two bullet points aligned with aviation quality/compliance theme from other entries |

**Highlights:**
- "Conducted compliance audits and quality inspections for aircraft maintenance operations"
- "Supported airworthiness documentation and regulatory reporting processes"

### Technical Detail

- **File:** `src/components/Career.tsx` — append one object to the `experiences` array after the Vision Group entry
- No new imports needed — `Wrench` icon is already imported

