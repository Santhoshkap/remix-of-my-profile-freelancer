import { ShieldCheck, Lock, Eye, Server } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem, MagneticHover, Tilt3D } from "./AnimationUtils";
import { motion } from "framer-motion";

const certifications = [
  "CISA", "CISM", "CRISC", "CDPSE", "CGEIT",
  "PMP", "ISO 27001 LA", "ISO 27701 LA", "ISO 22301 LA",
  "ISO 9001 LA", "ITIL V3", "COBIT 5", "CEH",
  "CCSK", "SOC 2 Practitioner", "Six Sigma Green Belt",
];

const skillCategories = [
  {
    title: "GRC & Risk Management",
    icon: ShieldCheck,
    skills: ["Enterprise Risk Management", "SOX Compliance", "Third-Party Risk", "Regulatory Compliance", "Internal Audit", "Control Frameworks"],
  },
  {
    title: "Cybersecurity Strategy",
    icon: Lock,
    skills: ["NIST CSF", "ISO 27001/27002", "SOC 2 Type II", "Security Architecture", "Incident Response", "Threat Assessment"],
  },
  {
    title: "Privacy & Data Protection",
    icon: Eye,
    skills: ["GDPR", "CCPA", "ISO 27701", "Data Privacy Impact Assessment", "Privacy by Design", "Cross-border Data Transfers"],
  },
  {
    title: "Audit & Assurance",
    icon: Server,
    skills: ["IT General Controls", "Application Controls", "SSAE 18/ISAE 3402", "Process Optimization", "GRC Platforms", "Automated Monitoring"],
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: "var(--backgroundColor)", zIndex: 12 }}>
      {/* Subtle radial background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(ellipse at 30% 50%, hsl(190 100% 50%), transparent 60%), radial-gradient(ellipse at 70% 50%, hsl(270 80% 60%), transparent 60%)",
      }} />

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-center mb-3 text-glow tracking-wide">
            Certifications & Skills
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-16 md:mb-24"
          />
        </SectionReveal>

        {/* Certification badges */}
        <StaggerContainer className="flex flex-wrap justify-center gap-3 md:gap-4 mb-20 md:mb-28 max-w-4xl mx-auto" stagger={0.04}>
          {certifications.map((cert) => (
            <StaggerItem key={cert}>
              <motion.div
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 25px hsl(190 100% 50% / 0.25), 0 0 50px hsl(190 100% 50% / 0.08)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="group glass rounded-lg px-4 py-2.5 border-glow transition-all duration-300 flex items-center gap-2.5 cursor-default"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary transition-colors" />
                <span className="text-xs md:text-sm font-body font-medium text-foreground/90 tracking-wide">{cert}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Skill categories */}
        <StaggerContainer className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto" stagger={0.12}>
          {skillCategories.map((cat) => (
            <StaggerItem key={cat.title}>
              <MagneticHover>
                <div className="glass rounded-2xl p-6 md:p-7 border-glow hover:box-glow transition-all duration-500 group h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <cat.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-display font-semibold text-primary tracking-wider uppercase">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05, borderColor: "hsl(190 100% 50% / 0.4)" }}
                        className="text-xs px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground hover:text-foreground/80 transition-all duration-300 font-body cursor-default tracking-wide"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </MagneticHover>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
