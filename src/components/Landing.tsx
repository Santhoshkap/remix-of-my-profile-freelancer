import { PropsWithChildren, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Landing.css";

const roles = ["Implementer", "Auditor", "Advisor", "Strategist", "Leader"];

const Landing = ({ children }: PropsWithChildren) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Hello! I'm
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              SANTHOSH
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              >
                KAPALAVAI
              </motion.span>
            </motion.h1>
          </div>
          <div className="landing-info">
            <motion.h3
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              GRC & Cybersecurity
            </motion.h3>
            <div className="landing-role-container">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex]}
                  className="landing-role"
                  initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
