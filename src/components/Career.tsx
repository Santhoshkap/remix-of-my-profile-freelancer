import { useEffect, useRef } from "react";
import { Briefcase, Globe, Shield, Plane, Wrench } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionReveal, MagneticHover, Tilt3D } from "./AnimationUtils";
import "./styles/Career.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Senior Manager – GRC",
    company: "Dexian India Technologies Pvt. Ltd – Global",
    period: "2023 – Present",
    Icon: Shield,
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
    Icon: Globe,
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
    Icon: Plane,
    highlights: [
      "Interfaced with Air Force stakeholders to align aircraft maintenance to safety norms",
      "Led internal audits, client walkthroughs, and incident investigations",
    ],
  },
  {
    title: "Quality Engineer",
    company: "Vision Group of Aviation · Cambodia & Philippines",
    period: "2016 – 2017",
    Icon: Wrench,
    highlights: [
      "Quality maintenance engineering for aviation operations in Phnom Penh, Cambodia",
      "Ensuring regulatory compliance and airworthiness standards across fleet operations",
    ],
  },
];

/* 3D Holographic icon animation */
function HolographicIcon({ Icon, index }: { Icon: LucideIcon; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
      className="relative w-28 h-28 flex items-center justify-center"
    >
      {/* Outer orbiting ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/20"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d", rotateX: "65deg" }}
      />

      {/* Second orbiting ring offset */}
      <motion.div
        className="absolute inset-2 rounded-full border border-primary/15"
        animate={{ rotateZ: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d", rotateX: "65deg", rotateY: "30deg" }}
      />

      {/* Third ring - vertical orbit */}
      <motion.div
        className="absolute inset-4 rounded-full border border-primary/10"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d", rotateX: "20deg", rotateY: "65deg" }}
      />

      {/* Pulsing glow backdrop */}
      <motion.div
        className="absolute w-16 h-16 rounded-full"
        animate={{
          boxShadow: [
            "0 0 20px 4px hsl(var(--primary) / 0.1)",
            "0 0 40px 8px hsl(var(--primary) / 0.25)",
            "0 0 20px 4px hsl(var(--primary) / 0.1)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }}
      />

      {/* Hexagonal frame */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute w-24 h-24"
        animate={{ rotate: [0, 60] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <polygon
          points="50,2 93,25 93,75 50,98 7,75 7,25"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
          opacity="0.2"
        />
      </motion.svg>

      {/* Inner hexagonal frame counter-rotating */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute w-[4.5rem] h-[4.5rem]"
        animate={{ rotate: [60, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <polygon
          points="50,5 90,27 90,73 50,95 10,73 10,27"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="0.8"
          opacity="0.15"
        />
      </motion.svg>

      {/* Floating icon with 3D hover */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotateY: [0, 15, 0, -15, 0],
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 },
          rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative z-10"
      >
        <Icon className="w-8 h-8 text-primary/60 drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]" />
      </motion.div>

      {/* Orbiting dot 1 */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-primary/50"
        animate={{
          x: [0, 40, 0, -40, 0],
          y: [-40, 0, 40, 0, -40],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
      />

      {/* Orbiting dot 2 */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-primary/30"
        animate={{
          x: [30, 0, -30, 0, 30],
          y: [0, -30, 0, 30, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: index * 0.3 + 1 }}
      />
    </motion.div>
  );
}

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
    <section id="career" className="py-10 md:py-16 relative overflow-hidden" ref={containerRef} style={{ backgroundColor: "var(--backgroundColor)", zIndex: 12 }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-center mb-3 text-glow career-title tracking-wide">
            My <span style={{ color: "var(--accentColor)" }}>Experience</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-8 md:mb-12"
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

              {/* 3D Holographic icon in center of empty side */}
              <div className={`hidden md:flex md:w-1/2 items-center justify-center`}>
                <HolographicIcon Icon={exp.Icon} index={i} />
              </div>

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
