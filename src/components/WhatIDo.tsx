import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          {/* Card 1: GRC & Cybersecurity */}
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 0)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <div className="what-icon-wrapper">
                <motion.div
                  className="what-3d-icon"
                  animate={{ rotateY: [0, 15, 0, -15, 0], rotateX: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  🛡️
                </motion.div>
              </div>
              <h3>GRC & CYBERSECURITY</h3>
              <h4>Enterprise Governance & Risk Strategy</h4>
              <p>
                Designing enterprise-scale GRC programmes, cybersecurity strategies,
                and audit-ready frameworks that align risk management with board-level
                business outcomes. Led ISO 27001, SOC 2, HITRUST implementations
                across SaaS, healthcare, and fintech.
              </p>
              <h5>Frameworks & expertise</h5>
              <div className="what-content-flex">
                <div className="what-tags">ISO 27001</div>
                <div className="what-tags">SOC 2 Type II</div>
                <div className="what-tags">HITRUST CSF</div>
                <div className="what-tags">NIST</div>
                <div className="what-tags">SOX &amp; ITGC</div>
                <div className="what-tags">COSO</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          {/* Card 2: Privacy & Compliance */}
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 1)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <div className="what-icon-wrapper">
                <motion.div
                  className="what-3d-icon"
                  animate={{ rotateY: [0, -15, 0, 15, 0], rotateX: [0, -10, 0, 10, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  🔐
                </motion.div>
              </div>
              <h3>PRIVACY & COMPLIANCE</h3>
              <h4>Data Protection & Regulatory Assurance</h4>
              <p>
                End-to-end privacy programmes — from data discovery and DPIAs to
                consent governance and cross-border data transfer assessments.
                Expert in global regulations and compliance automation platforms.
              </p>
              <h5>Expertise & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">GDPR</div>
                <div className="what-tags">DPDP Act</div>
                <div className="what-tags">HIPAA</div>
                <div className="what-tags">Drata</div>
                <div className="what-tags">Sprinto</div>
                <div className="what-tags">Thoropass</div>
                <div className="what-tags">Archer GRC</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          {/* Card 3: Advisory & Leadership */}
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 2)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <div className="what-icon-wrapper">
                <motion.div
                  className="what-3d-icon"
                  animate={{ rotateY: [0, 20, 0, -20, 0], rotateX: [5, -5, 5] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  🎯
                </motion.div>
              </div>
              <h3>ADVISORY & LEADERSHIP</h3>
              <h4>vCISO · Board Advisory · Thought Leadership</h4>
              <p>
                Strategic advisory as a virtual CISO — building security roadmaps,
                managing vendor risk, and presenting to boards. Published author
                in ISACA Journal and recognized as a Top 10 Tech Leader.
              </p>
              <h5>Capabilities</h5>
              <div className="what-content-flex">
                <div className="what-tags">vCISO</div>
                <div className="what-tags">Board Reporting</div>
                <div className="what-tags">Vendor Risk</div>
                <div className="what-tags">Security Roadmaps</div>
                <div className="what-tags">Team Building</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
