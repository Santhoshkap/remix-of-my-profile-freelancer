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
    tools: "ISO 27001, SOC 2, NIST, CMMI, Risk Registers, SoA, Control Catalogs",
    image: "/images/grc-dashboard.jpg",
  },
  {
    title: "SOC 2 & Compliance Automation",
    category: "Continuous Compliance & Audit Readiness",
    tools: "Drata, Sprinto, Thoropass, Evidence Management, Control Mapping",
    image: "/images/soc2-compliance.jpg",
  },
  {
    title: "Privacy & Data Protection",
    category: "GDPR, DPDP Act & HIPAA Compliance",
    tools: "Data Flow Mapping, DPIAs, RoPA, Consent Governance, Cross-Border Transfers",
    image: "/images/privacy-compliance.jpg",
  },
  {
    title: "vCISO Advisory Services",
    category: "Board-Level Cybersecurity Strategy",
    tools: "Cyber Risk Roadmaps, ITGC, Board Reporting, Enterprise Risk Management",
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
      <div className="work-container section-container">
        <SectionReveal>
          <h2>
            My <span>Work</span>
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
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Frameworks & Tools</span>
                          <p>{project.tools}</p>
                        </div>
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
