import { motion } from "framer-motion";
import { SectionReveal, ScrollRevealText } from "./AnimationUtils";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
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
        <ScrollRevealText
          className="para font-body"
          text="A globally respected GRC, Cybersecurity & Privacy strategist trusted by CISOs, CIOs, and boards across four continents. Known for turning regulatory complexity into strategic business advantage — building audit-ready organisations, resilient security postures, and lasting client trust across SaaS, BFSI, Healthcare, and Technology. Ranked among India's Top 10 Tech Leaders (2025) and an ISACA-published author read worldwide."
        />
      </div>
    </div>
  );
};

export default About;
