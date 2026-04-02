

## Plan: Add DORA References Across Profile

DORA (Digital Operational Resilience Act) is an EU regulation for financial sector ICT risk management — fits naturally alongside GDPR in your profile. Here's where to weave it in:

### Changes

**1. `src/components/Career.tsx` — Dexian experience highlights**
- Update line 20 to include DORA in the frameworks list:
  `"Led programs across ISO 27001, SOC 2, SOX, HITRUST, HIPAA, GDPR, DORA, DPDP, and NIST frameworks"`

**2. `src/components/WhatIDo.tsx` — Two cards**
- **GRC card** (line 11): Add `"DORA"` to the tags array
- **Privacy & Compliance card** (line 18): Add `"DORA"` to the tags array

**3. `src/components/CertificationsSection.tsx` — Certifications grid**
- Add `"DORA"` to the certifications array (line 22)

**4. `src/components/About.tsx` — About paragraph**
- Update line 148 to mention DORA alongside other frameworks:
  `"From leading enterprise-wide ISO, SOC 2, HITRUST, DORA, and privacy programs..."`

**5 files touched, text-only changes — no layout or design impact.**

