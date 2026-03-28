import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
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
            <motion.div
              className="landing-role-words"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.3 }}
            >
              <span className="landing-role-main">STRATEGY</span>
              <span className="landing-role-divider">&</span>
              <span className="landing-role-main">ADVISORY</span>
            </motion.div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
