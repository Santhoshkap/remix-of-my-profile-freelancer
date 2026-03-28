import { useEffect, useRef } from "react";
import { Briefcase, Trophy } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionReveal, StaggerContainer, StaggerItem, MagneticHover } from "./AnimationUtils";
import "./styles/Career.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Senior Manager – GRC",
    company: "Dexian Pvt. Ltd",
    period: "2023 – Present",
    highlights: [
      "Built and scaled global GRC & cybersecurity advisory services",
      "Led programs across ISO 27001, SOC 2, SOX, HITRUST, HIPAA, GDPR, DPDP, and NIST frameworks",
      "Serving as vCISO for enterprise clients",
    ],
  },
  {
    title: "Risk & Compliance Lead",
    company: "Accenture · Chennai/Canada",
    period: "2018 – 2023",
    highlights: [
      "Directed cross-functional audit teams for 1st and 2nd party audits",
      "Enhanced audit frameworks with walkthroughs, evidence matrices, and continuous improvement metrics",
      "Supported SOX compliance attestations and ITGC validations",
    ],
  },
  {
    title: "Sr. Representative",
    company: "SRK Aviacom (Indian Air Force)",
    period: "2017 – 2018",
    highlights: [
      "Interfaced with Air Force stakeholders to align aircraft maintenance to safety norms",
      "Led internal audits, client walkthroughs, and incident investigations",
    ],
  },
  {
    title: "Quality Engineer",
    company: "Vision Group of Aviation",
    period: "2016 – 2017",
    highlights: [
      "Quality maintenance engineering for aviation operations in Phnom Penh, Cambodia",
      "Ensuring regulatory compliance and airworthiness standards across fleet operations",
    ],
  },
];

const achievements = [
  { icon: Trophy, title: "Top 10 Tech Leader 2025", desc: "Recognized for innovative contributions in cybersecurity and GRC" },
  { icon: Trophy, title: "ISACA Published Author", desc: "Authored whitepaper on emerging cybersecurity risk frameworks" },
  { icon: Trophy, title: "Competition Winner", desc: "ISACA global cybersecurity thought leadership competition" },
];

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 40%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/10">
      <motion.div className="w-full bg-primary/40" style={{ height }} />
    </div>
  );
}

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".career-title", {
        scrollTrigger: { trigger: ".career-title", start: "top 80%" },
        y: 60, opacity: 0, duration: 1, ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="career" className="py-28 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8">
        <SectionReveal>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-glow career-title">
            Experience & Achievements
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-20"
          />
        </SectionReveal>

        <div className="relative max-w-3xl mx-auto mb-24">
          <TimelineLine />
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-14 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary box-glow -translate-x-1.5 mt-6 z-10"
              />
              <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right"}`}>
                <MagneticHover>
                  <div className="glass rounded-xl p-6 border-glow hover:box-glow transition-all duration-500 group">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs text-primary font-body font-semibold tracking-wider">{exp.period}</span>
                    </div>
                    <h3 className="text-base font-display font-semibold text-foreground mb-1">{exp.title}</h3>
                    <p className="text-sm text-primary/60 font-body mb-4">{exp.company}</p>
                    <ul className={`space-y-2 ${i % 2 === 0 ? "" : "md:text-left"}`}>
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="text-xs text-muted-foreground font-body flex gap-2">
                          <span className="text-primary/40 mt-0.5 flex-shrink-0">▹</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MagneticHover>
              </div>
            </motion.div>
          ))}
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" stagger={0.15}>
          {achievements.map((a, i) => (
            <StaggerItem key={i}>
              <MagneticHover>
                <div className="glass rounded-xl p-6 text-center border-glow hover:box-glow transition-all duration-500 group">
                  <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }} transition={{ duration: 0.5 }}>
                    <a.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  </motion.div>
                  <h3 className="text-sm font-display font-semibold text-foreground mb-2">{a.title}</h3>
                  <p className="text-xs text-muted-foreground font-body">{a.desc}</p>
                </div>
              </MagneticHover>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Career;
