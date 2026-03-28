import { motion } from "framer-motion";
import { ShieldCheck, Lock, FileSearch, Globe } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem, MagneticHover } from "./AnimationUtils";

const services = [
  {
    icon: ShieldCheck,
    title: "GRC & Cybersecurity",
    subtitle: "Enterprise Governance & Risk Strategy",
    description:
      "Designing and implementing enterprise-scale GRC programmes, cybersecurity strategies, and audit-ready frameworks that align risk management with board-level business outcomes.",
    tags: ["ISO 27001", "SOC 2 Type II", "HITRUST CSF", "NIST", "SOX & ITGC", "vCISO"],
  },
  {
    icon: Lock,
    title: "Privacy & Compliance",
    subtitle: "Data Protection & Regulatory Assurance",
    description:
      "End-to-end privacy programmes including GDPR, India DPDP Act, HIPAA — from data discovery and DPIAs to consent governance and cross-border data transfer assessments.",
    tags: ["GDPR", "DPDP Act", "HIPAA", "Drata", "Sprinto", "Thoropass", "Archer GRC"],
  },
  {
    icon: FileSearch,
    title: "Audit & Assurance",
    subtitle: "Comprehensive IT Audit Services",
    description:
      "Leading cross-functional audit engagements — IT general controls, application controls, SOX attestations, and continuous improvement through evidence-based frameworks.",
    tags: ["ITGC", "SOX", "SSAE 18", "ISAE 3402", "Evidence Management", "Control Testing"],
  },
  {
    icon: Globe,
    title: "vCISO Advisory",
    subtitle: "Board-Level Security Leadership",
    description:
      "Providing strategic cybersecurity leadership as Virtual CISO — building cyber risk roadmaps, board reporting dashboards, and enterprise risk programmes.",
    tags: ["Cyber Risk", "Board Reporting", "Security Roadmaps", "ERM", "Third-Party Risk"],
  },
];

const WhatIDo = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden" id="whatido">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-center mb-3 text-glow tracking-wide">
            What I Do
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-16 md:mb-24"
          />
        </SectionReveal>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 md:gap-8" stagger={0.15}>
          {services.map((service, i) => (
            <StaggerItem key={i}>
              <MagneticHover>
                <motion.div
                  className="glass rounded-2xl p-6 md:p-8 border-glow group h-full relative overflow-hidden"
                  whileHover={{
                    boxShadow: "0 0 40px hsl(190 100% 50% / 0.12), 0 0 80px hsl(190 100% 50% / 0.05)",
                    borderColor: "hsl(190 100% 50% / 0.3)",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Background glow on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 0%, hsl(190 100% 50% / 0.06), transparent 60%)",
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-all duration-500 relative z-10"
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <service.icon className="w-5 h-5 text-primary" />
                  </motion.div>

                  {/* Title & subtitle */}
                  <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-1 tracking-wide relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-xs text-primary/50 font-body mb-4 tracking-widest uppercase relative z-10">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 relative z-10">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {service.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05, borderColor: "hsl(190 100% 50% / 0.4)" }}
                        className="text-xs px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground/80 hover:text-primary/80 transition-all duration-300 font-body cursor-default tracking-wide"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Corner accent lines */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/20 rounded-tl-2xl group-hover:border-primary/40 transition-colors duration-500" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/20 rounded-br-2xl group-hover:border-primary/40 transition-colors duration-500" />
                </motion.div>
              </MagneticHover>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WhatIDo;
