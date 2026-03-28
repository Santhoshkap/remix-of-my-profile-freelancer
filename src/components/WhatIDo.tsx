import { motion } from "framer-motion";
import "./styles/WhatIDo.css";

const cards = [
  {
    icon: "🛡️",
    title: "GRC & Cybersecurity Strategy",
    subtitle: "Enterprise Risk, Governance & Security Transformation",
    description: "Designing and scaling enterprise-grade GRC and cybersecurity programs aligned with business growth.",
    tags: ["ISO 27001", "ISO 27701", "ISO 22301", "NIST CSF", "SOC 2", "SOX", "ITGC", "CMMI", "Risk Management", "Control Frameworks"],
  },
  {
    icon: "🔐",
    title: "Privacy & Compliance",
    subtitle: "Data Protection & Regulatory Excellence",
    description: "Building end-to-end privacy and compliance programs that strengthen trust and regulatory readiness.",
    tags: ["GDPR", "DPDP Act", "HIPAA", "DPIA", "RoPA", "Data Mapping", "Cross-Border Transfers", "Privacy Engineering", "Compliance Automation"],
  },
  {
    icon: "🎯",
    title: "Advisory & vCISO Leadership",
    subtitle: "Board-Level Strategy & Business Enablement",
    description: "Acting as a strategic partner to leadership teams — translating risk into business decisions and growth.",
    tags: ["vCISO", "Board Reporting", "Risk Strategy", "Vendor Risk", "Third-Party Risk", "Security Roadmaps", "Pre-Sales", "Client Advisory"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const WhatIDo = () => {
  return (
    <section className="wid-section whatIDO">
      <div className="wid-inner">
        {/* Left — Title */}
        <div className="wid-left">
          <motion.span
            className="wid-label"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            Services
          </motion.span>
          <motion.h2
            className="wid-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What I<br />
            <span className="wid-heading-accent">Deliver</span>
          </motion.h2>
        </div>

        {/* Right — Cards */}
        <motion.div
          className="wid-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="wid-card"
              variants={cardVariants}
              whileHover={{
                y: -4,
                boxShadow: "0 0 30px hsla(190,100%,50%,0.08), 0 8px 32px rgba(0,0,0,0.3)",
              }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="wid-card-header">
                <div>
                  <h3 className="wid-card-title">{card.title}</h3>
                  <p className="wid-card-subtitle">{card.subtitle}</p>
                </div>
                <span className="wid-card-icon">{card.icon}</span>
              </div>

              <p className="wid-card-desc">{card.description}</p>

              <div className="wid-tags">
                {card.tags.map((tag) => (
                  <span key={tag} className="wid-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIDo;
