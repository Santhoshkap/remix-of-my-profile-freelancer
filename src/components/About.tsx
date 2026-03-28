import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { SectionReveal, ScrollRevealText, StaggerContainer, StaggerItem, GlowText } from "./AnimationUtils";
import headshot from "../assets/headshot2.jpg";
import "./styles/About.css";

const About = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // 3D tilt on hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 20 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 20 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

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
          <motion.div
            ref={cardRef}
            className="headshot-container"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: tiltX,
              rotateY: tiltY,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Glowing edge effect */}
            <motion.div
              className="headshot-glow-edge"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            {/* Floating particles */}
            <div className="headshot-particles">
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="headshot-particle"
                  animate={{
                    y: [0, -40 - i * 10, 0],
                    x: [0, (i % 2 === 0 ? 15 : -15), 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                  style={{ left: `${15 + i * 13}%`, bottom: "10%" }}
                />
              ))}
            </div>
            <motion.span className="hud-corner hud-tl" initial={{ opacity: 0, x: -10, y: -10 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }} />
            <motion.span className="hud-corner hud-tr" initial={{ opacity: 0, x: 10, y: -10 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.7 }} />
            <motion.span className="hud-corner hud-bl" initial={{ opacity: 0, x: -10, y: 10 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.8 }} />
            <motion.span className="hud-corner hud-br" initial={{ opacity: 0, x: 10, y: 10 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.9 }} />
            <div className="scan-line" />
            {/* Holographic overlay */}
            <motion.div
              className="headshot-holographic"
              animate={{ opacity: isHovered ? 0.15 : 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.img
              src={headshot}
              alt="Santhosh Kapalavai"
              className="headshot-img"
              initial={{ opacity: 0, filter: "brightness(1.5) saturate(0)" }}
              whileInView={{ opacity: 1, filter: "brightness(1) saturate(1)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ transform: "translateZ(20px)" }}
            />
          </motion.div>
        </motion.div>

        {/* Right: Content */}
        <div className="about-content-col">
          <SectionReveal>
            <motion.h3
              className="title font-display hover-invert-accent"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              About <span className="hover-invert" style={{ color: "#ffffff" }}>Me</span>
            </motion.h3>
          </SectionReveal>

          <StaggerContainer className="about-paragraphs" stagger={0.15}>
            <StaggerItem>
              <p className="about-lead font-body">
                A <span className="accent-text hover-invert-accent">GRC, Cybersecurity & Privacy leader</span> with
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
                <span className="accent-text hover-invert-accent">trust, revenue, and competitive positioning</span>.
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
                <span className="accent-text hover-invert-accent">deep technical expertise, executive communication,
                and commercial understanding</span>. <GlowText text="I don't just implement controls — I help organisations win deals, build customer confidence, and scale with confidence in regulated environments." />
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="about-origin font-body">
                <GlowText text="My journey from aviation engineering to cybersecurity has shaped a mindset grounded in precision, discipline, and risk awareness — qualities I bring into every engagement." />
              </p>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </div>
    </div>
  );
};

export default About;
