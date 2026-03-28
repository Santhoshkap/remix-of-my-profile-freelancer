import { ShieldCheck } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem, MagneticHover } from "./AnimationUtils";
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
    skills: ["Enterprise Risk Management", "SOX Compliance", "Third-Party Risk", "Regulatory Compliance", "Internal Audit", "Control Frameworks"],
  },
  {
    title: "Cybersecurity Strategy",
    skills: ["NIST CSF", "ISO 27001/27002", "SOC 2 Type II", "Security Architecture", "Incident Response", "Threat Assessment"],
  },
  {
    title: "Privacy & Data Protection",
    skills: ["GDPR", "CCPA", "ISO 27701", "Data Privacy Impact Assessment", "Privacy by Design", "Cross-border Data Transfers"],
  },
  {
    title: "Audit & Assurance",
    skills: ["IT General Controls", "Application Controls", "SSAE 18/ISAE 3402", "Process Optimization", "GRC Platforms", "Automated Monitoring"],
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 30% 50%, hsl(190 100% 50%), transparent 50%), radial-gradient(circle at 70% 50%, hsl(270 80% 60%), transparent 50%)",
      }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionReveal>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-glow">
            Certifications & Skills
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-20"
          />
        </SectionReveal>

        <StaggerContainer className="flex flex-wrap justify-center gap-3 mb-24 max-w-4xl mx-auto" stagger={0.05}>
          {certifications.map((cert) => (
            <StaggerItem key={cert}>
              <motion.div
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px hsl(190 100% 50% / 0.3), 0 0 40px hsl(190 100% 50% / 0.1)",
                }}
                className="group glass rounded-lg px-4 py-2.5 border-glow transition-all duration-300 flex items-center gap-2 cursor-default"
              >
                <ShieldCheck className="w-4 h-4 text-primary group-hover:text-cyber-glow transition-colors" />
                <span className="text-sm font-body font-medium text-foreground">{cert}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto" stagger={0.15}>
          {skillCategories.map((cat) => (
            <StaggerItem key={cat.title}>
              <MagneticHover>
                <div className="glass rounded-xl p-6 border-glow hover:box-glow transition-all duration-500 group h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-6 bg-primary rounded-full" />
                    <h3 className="text-sm font-display font-semibold text-primary">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05, color: "hsl(190 100% 50%)" }}
                        className="text-xs px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground hover:border-primary/30 transition-colors font-body cursor-default"
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
