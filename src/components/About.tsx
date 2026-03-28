import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionReveal, ScrollRevealText, StaggerContainer, StaggerItem } from "./AnimationUtils";
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
    <div className="about-section" id="about">
      <div className="about-grid">
        {/* Left: Headshot */}
        <motion.div
          ref={imageRef}
          className="about-image-col"
          style={{ rotateY, y }}
        >
          <div className="headshot-container">
            {/* Corner brackets */}
            <span className="hud-corner hud-tl" />
            <span className="hud-corner hud-tr" />
            <span className="hud-corner hud-bl" />
            <span className="hud-corner hud-br" />
            {/* Scan line */}
            <div className="scan-line" />
            <img src={headshot} alt="Santhosh Kapalavai" className="headshot-img" />
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
                Across India, the US, Middle East, and Southeast Asia, I've partnered with CISOs,
                CIOs, founders, and boards to build audit-ready, resilient, and scalable security
                programs. My work sits at the intersection of compliance, cybersecurity, and
                business growth — where risk is not just managed, but transformed into{" "}
                <span className="accent-text">trust, revenue, and competitive positioning</span>.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="about-body font-body">
                From leading enterprise-wide ISO, SOC 2, HITRUST, and privacy programs to serving
                as a vCISO for high-growth SaaS and regulated organisations, I specialise in
                designing frameworks that are not only compliant — but practical, efficient, and
                aligned to real business outcomes.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="about-body font-body">
                What sets me apart is a rare blend of{" "}
                <span className="accent-text">deep technical expertise, executive communication,
                and commercial understanding</span>. I don't just implement controls — I help
                organisations win deals, build customer confidence, and scale with confidence in
                regulated environments.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="about-origin font-body">
                My journey from aviation engineering to cybersecurity has shaped a mindset grounded
                in precision, discipline, and risk awareness — qualities I bring into every engagement.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="about-closing font-body">
                Today, I work with organisations that want more than compliance — they want{" "}
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
