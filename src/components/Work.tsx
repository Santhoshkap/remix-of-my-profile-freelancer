import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { SectionReveal } from "./AnimationUtils";

const projects = [
  {
    title: "GRC Programme Implementation",
    category: "Enterprise Governance & Risk Management",
    toolsLabel: "Frameworks & Standards",
    tools: "ISO 27001 · ISO 27701 · ISO 22301 · NIST CSF · SOC 2 · SOX · ITGC · CMMI · Enterprise Risk Management",
    delivery: "End-to-end GRC program design, control frameworks, risk registers, SoA, audit readiness, and scalable governance models",
    image: "/images/grc-dashboard.jpg",
  },
  {
    title: "SOC 2 & Compliance Automation",
    category: "Continuous Compliance & Audit Readiness",
    toolsLabel: "Tools & Automation",
    tools: "Drata · Sprinto · Thoropass · Hyperproof · Archer GRC · Evidence Management · Control Mapping",
    delivery: "Automated compliance programs, continuous monitoring, audit workflows, and scalable control automation for SaaS & cloud",
    highlight: "Automation & Innovation — Built and enabled automated GRC and compliance platforms — helping organizations scale continuous compliance, reduce manual effort, and accelerate audit readiness",
    image: "/images/soc2-compliance.jpg",
  },
  {
    title: "Privacy & Data Protection",
    category: "GDPR, DPDP Act & HIPAA Compliance",
    toolsLabel: "Privacy Frameworks & Practices",
    tools: "GDPR · DPDP Act · HIPAA · DPIA · RoPA · Data Mapping · Consent Governance · Cross-Border Transfers",
    delivery: "End-to-end privacy programs, data lifecycle governance, regulatory alignment, and privacy risk reduction",
    image: "/images/privacy-compliance.jpg",
  },
  {
    title: "vCISO Advisory Services",
    category: "Board-Level Cybersecurity Strategy",
    toolsLabel: "Strategy & Risk Leadership",
    tools: "Cyber Risk Roadmaps · ITGC · Board Reporting · Vendor Risk · Third-Party Risk · Enterprise Risk",
    delivery: "Strategic advisory, security roadmaps, executive reporting, and translating cyber risk into business decisions",
    image: "/images/vciso-advisory.jpg",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);

  const goToSlide = useCallback(
    (index: number, dir: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex, -1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex, 1);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container" style={{ width: "90%", maxWidth: "1280px", margin: "0 auto" }}>
        <SectionReveal>
          <h2 className="hover-invert">
            My <span className="hover-invert-accent">Work</span>
          </h2>
        </SectionReveal>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <motion.button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdArrowBack />
          </motion.button>
          <motion.button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdArrowForward />
          </motion.button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4 className="hover-invert">{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">{project.toolsLabel}</span>
                          <p>{project.tools}</p>
                        </div>
                        <div className="carousel-delivery">
                          <span className="delivery-label">What I Deliver</span>
                          <p>{project.delivery}</p>
                        </div>
                        {project.highlight && (
                          <div className="carousel-highlight">
                            <p>{project.highlight}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`}
                onClick={() => goToSlide(index, index > currentIndex ? 1 : -1)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
