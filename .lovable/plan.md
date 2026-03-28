

# Update Work Carousel Content

## What Changes

Update `src/components/Work.tsx` to:

1. **Add new fields** to the project data: `toolsLabel` (custom label per card), `delivery` (What I Deliver text), and optional `highlight` (the Automation & Innovation differentiator line).

2. **Updated project content:**

| # | Title | Category | Tools Label | Tools | Delivery | Highlight |
|---|-------|----------|-------------|-------|----------|-----------|
| 01 | GRC Programme Implementation | Enterprise Governance & Risk Management | Frameworks & Standards | ISO 27001 · ISO 27701 · ISO 22301 · NIST CSF · SOC 2 · SOX · ITGC · CMMI · Enterprise Risk Management | End-to-end GRC program design, control frameworks, risk registers, SoA, audit readiness, and scalable governance models | — |
| 02 | SOC 2 & Compliance Automation | Continuous Compliance & Audit Readiness | Tools & Automation | Drata · Sprinto · Thoropass · Hyperproof · Archer GRC · Evidence Management · Control Mapping | Automated compliance programs, continuous monitoring, audit workflows, and scalable control automation for SaaS & cloud | **Automation & Innovation** — Built and enabled automated GRC and compliance platforms — helping organizations scale continuous compliance, reduce manual effort, and accelerate audit readiness |
| 03 | Privacy & Data Protection | GDPR, DPDP Act & HIPAA Compliance | Privacy Frameworks & Practices | GDPR · DPDP Act · HIPAA · DPIA · RoPA · Data Mapping · Consent Governance · Cross-Border Transfers | End-to-end privacy programs, data lifecycle governance, regulatory alignment, and privacy risk reduction | — |
| 04 | vCISO Advisory Services | Board-Level Cybersecurity Strategy | Strategy & Risk Leadership | Cyber Risk Roadmaps · ITGC · Board Reporting · Vendor Risk · Third-Party Risk · Enterprise Risk | Strategic advisory, security roadmaps, executive reporting, and translating cyber risk into business decisions | — |

3. **Render updates** in the carousel slide template:
   - Change the static "Frameworks & Tools" label to use `project.toolsLabel`
   - Add a new "What I Deliver" block below tools with the same styling pattern
   - Add the highlight line (styled with a subtle cyan accent/border-left) below the delivery text on card 02

4. **CSS additions** in `Work.css`:
   - `.carousel-delivery` — styled like `.carousel-tools` with label + description
   - `.carousel-highlight` — small italic line with left cyan border, subtle glow

## Files Modified
- `src/components/Work.tsx` — data + template
- `src/components/styles/Work.css` — new styles for delivery & highlight blocks

