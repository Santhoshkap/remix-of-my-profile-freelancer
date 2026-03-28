import { useEffect, useRef } from "react";
import { Briefcase } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionReveal, MagneticHover, Tilt3D } from "./AnimationUtils";
import "./styles/Career.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Senior Manager – GRC",
    company: "Dexian India Technologies Pvt. Ltd – Global",
    period: "2023 – Present",
    highlights: [
      "Built and scaled global GRC & cybersecurity advisory services",
      "Led programs across ISO 27001, SOC 2, SOX, HITRUST, HIPAA, GDPR, DPDP, and NIST frameworks",
      "Serving as vCISO for enterprise clients",
    ],
  },
  {
    title: "Risk & Compliance Lead",
    company: "Accenture · Chennai / Canada",
    period: "2018 – 2023",
    highlights: [
      "Directed cross-functional audit teams for 1st and 2nd party audits",
      "Enhanced audit frameworks with walkthroughs, evidence matrices, and continuous improvement metrics",
      "Supported SOX compliance attestations and ITGC validations",
    ],
  },
  {
    title: "Sr. Representative",
    company: "SRK Aviacom · Switzerland, Chennai & Dundigal",
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

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 40%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-border/30">
      <motion.div className="w-full bg-gradient-to-b from-primary via-primary/60 to-transparent" style={{ height }} />
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
    <section id="career" className="py-20 md:py-32 relative overflow-hidden" ref={containerRef} style={{ backgroundColor: "var(--backgroundColor)", zIndex: 12 }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-center mb-3 text-glow career-title tracking-wide">
            Experience
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-16 md:mb-24"
          />
        </SectionReveal>

        <div className="relative max-w-3xl mx-auto">
          <TimelineLine />
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row gap-4 md:gap-10 mb-12 md:mb-16 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                className="absolute left-[18px] md:left-1/2 w-3 h-3 rounded-full bg-primary box-glow -translate-x-1.5 mt-6 z-10"
              />

              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10 md:text-right"}`}>
                <Tilt3D intensity={10}>
                  <MagneticHover>
                    <div className="glass rounded-xl p-5 md:p-6 border-glow hover:box-glow transition-all duration-500 group">
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-xs text-primary font-body font-semibold tracking-widest uppercase">{exp.period}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-display font-semibold text-foreground mb-1 leading-snug">{exp.title}</h3>
                      <p className="text-sm text-primary/50 font-body mb-4">{exp.company}</p>
                      <ul className={`space-y-2.5 ${i % 2 === 0 ? "" : "md:text-left"}`}>
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="text-xs md:text-sm text-muted-foreground font-body flex gap-2 leading-relaxed">
                            <span className="text-primary/40 mt-0.5 flex-shrink-0">▹</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </MagneticHover>
                </Tilt3D>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
