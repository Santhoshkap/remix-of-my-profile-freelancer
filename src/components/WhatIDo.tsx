import { motion } from "framer-motion";
import { Tilt3D } from "./AnimationUtils";
import "./styles/WhatIDo.css";

const cards = [
  {
    icon: "🛡️",
    title: "GRC & Cybersecurity Strategy",
    subtitle: "Enterprise Risk, Governance & Security Transformation",
    description: "Designing and scaling enterprise-grade GRC and cybersecurity programs aligned with business growth.",
    tags: ["ISO 27001", "ISO 27701", "ISO 22301", "NIST CSF", "SOC 2", "SOX", "ITGC", "CMMI", "HIPAA", "HITRUST", "ISO 42001", "ISO 31000", "Risk Management", "Control Frameworks"],
  },
  {
    icon: "🔐",
    title: "Privacy & Compliance",
    subtitle: "Data Protection & Regulatory Excellence",
    description: "Building end-to-end privacy and compliance programs that strengthen trust and regulatory readiness.",
    tags: ["GDPR", "DPDP Act", "HIPAA", "DPIA", "RoPA", "PDPL", "CCPA", "Data Mapping", "Cross-Border Transfers", "Privacy Engineering", "Compliance Automation"],
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
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* Animated floating shield for each card */
function CardShield({ index }: { index: number }) {
  return (
    <div className="wid-card-shield">
      <motion.div
        className="wid-shield-ring"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 15 + index * 3, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="wid-shield-ring-inner"
        animate={{ rotateZ: -360 }}
        transition={{ duration: 20 + index * 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="wid-shield-pulse"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
      />
    </div>
  );
}

const WhatIDo = () => {
  return (
    <section className="wid-section whatIDO">
      {/* Floating cyber particles background */}
      <div className="wid-particles">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="wid-particle"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 15, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
            style={{
              top: `${15 + i * 14}%`,
              left: `${5 + (i * 17) % 90}%`,
            }}
          />
        ))}
      </div>

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
            className="wid-heading hover-invert"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What I<br />
            <span className="wid-heading-accent hover-invert-accent">Deliver</span>
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
            <Tilt3D key={i} intensity={6}>
              <motion.div
                className="wid-card"
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 0 40px hsla(190,100%,50%,0.1), 0 12px 40px rgba(0,0,0,0.35)",
                  borderColor: "hsla(190,100%,50%,0.15)",
                }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <CardShield index={i} />
                <div className="wid-card-header">
                  <div>
                    <h3 className="wid-card-title hover-invert">{card.title}</h3>
                    <p className="wid-card-subtitle">{card.subtitle}</p>
                  </div>
                  <motion.span
                    className="wid-card-icon"
                    animate={{
                      y: [0, -4, 0],
                      rotateY: [0, 15, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {card.icon}
                  </motion.span>
                </div>

                <p className="wid-card-desc">{card.description}</p>

                <div className="wid-tags">
                  {card.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="wid-tag"
                      whileHover={{
                        scale: 1.08,
                        backgroundColor: "hsla(190,100%,50%,0.12)",
                        borderColor: "hsla(190,100%,50%,0.3)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Tilt3D>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIDo;
