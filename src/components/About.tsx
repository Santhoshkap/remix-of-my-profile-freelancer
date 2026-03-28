import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionReveal, ScrollRevealText, StaggerContainer, StaggerItem, GlowText } from "./AnimationUtils";
import headshot from "../assets/headshot1.jpeg";
import "./styles/About.css";

const About = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div className="about-section" id="about" style={{ backgroundColor: "var(--backgroundColor)" }}>
      <div className="about-grid">
        {/* Left: Headshot */}
        <motion.div
          ref={imageRef}
          className="about-image-col"
          initial={{ opacity: 0, scale: 0.9, x: -40 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateY, y }}
        >
          <div className="headshot-container">
            <motion.span className="hud-corner hud-tl" initial={{ opacity: 0, x: -10, y: -10 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }} />
            <motion.span className="hud-corner hud-tr" initial={{ opacity: 0, x: 10, y: -10 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.7 }} />
            <motion.span className="hud-corner hud-bl" initial={{ opacity: 0, x: -10, y: 10 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.8 }} />
            <motion.span className="hud-corner hud-br" initial={{ opacity: 0, x: 10, y: 10 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.9 }} />
            <div className="scan-line" />
            <motion.img
              src={headshot}
              alt="Santhosh Kapalavai"
              className="headshot-img"
              initial={{ opacity: 0, filter: "brightness(1.5) saturate(0)" }}
              whileInView={{ opacity: 1, filter: "brightness(1) saturate(1)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Right: Content */}
        <div className="about-content-col">
          <SectionReveal>
            <motion.h3
              className="title font-display"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              About Me
            </motion.h3>
          </SectionReveal>

          <StaggerContainer className="about-paragraphs" stagger={0.15}>
            <StaggerItem>
              <p className="about-lead font-body">
                A <span className="accent-text">GRC, Cybersecurity & Privacy leader</span> with
                over a decade of global experience helping organisations turn regulatory complexity
                into strategic business advantage.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="glow-divider" />
            </StaggerItem>

            <StaggerItem>
              <p className="about-body font-body">
                <GlowText text="Across India, the US, Middle East, and Southeast Asia, I've partnered with CISOs, CIOs, founders, and boards to build audit-ready, resilient, and scalable security programs. My work sits at the intersection of compliance, cybersecurity, and business growth — where risk is not just managed, but transformed into" />{" "}
                <span className="accent-text">trust, revenue, and competitive positioning</span>.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="about-body font-body">
                <GlowText text="From leading enterprise-wide ISO, SOC 2, HITRUST, and privacy programs to serving as a vCISO for high-growth SaaS and regulated organisations, I specialise in designing frameworks that are not only compliant — but practical, efficient, and aligned to real business outcomes." />
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="about-body font-body">
                <GlowText text="What sets me apart is a rare blend of" />{" "}
                <span className="accent-text">deep technical expertise, executive communication,
                and commercial understanding</span>. <GlowText text="I don't just implement controls — I help organisations win deals, build customer confidence, and scale with confidence in regulated environments." />
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="about-origin font-body">
                <GlowText text="My journey from aviation engineering to cybersecurity has shaped a mindset grounded in precision, discipline, and risk awareness — qualities I bring into every engagement." />
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="about-closing font-body">
                <GlowText text="Today, I work with organisations that want more than compliance — they want" />{" "}
                <span className="accent-text">clarity, credibility, and a competitive edge</span>{" "}
                in security.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
};

export default About;
