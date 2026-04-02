import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobeBackground from "./GlobeBackground";
import "./styles/Landing.css";

const roles = ["Implementer", "Auditor", "Advisor", "Strategist", "Leader"];

const Landing = () => {
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
        {/* Cybersecurity background animation */}
        <div className="landing-cyber-bg">
          <div className="cyber-grid" />
          <div className="cyber-scanline" />
          <div className="cyber-particle" style={{ top: "15%", left: "10%", animationDelay: "0s" }} />
          <div className="cyber-particle" style={{ top: "35%", left: "80%", animationDelay: "1.2s" }} />
          <div className="cyber-particle" style={{ top: "60%", left: "25%", animationDelay: "2.4s" }} />
          <div className="cyber-particle" style={{ top: "75%", left: "65%", animationDelay: "0.8s" }} />
          <div className="cyber-particle" style={{ top: "20%", left: "50%", animationDelay: "3.1s" }} />
          <div className="cyber-particle" style={{ top: "85%", left: "40%", animationDelay: "1.8s" }} />

          <motion.div
            className="cyber-geo cyber-geo-cube"
            style={{ top: "12%", right: "12%" }}
            animate={{ rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 180] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="cyber-geo cyber-geo-octahedron"
            style={{ bottom: "20%", right: "8%" }}
            animate={{ rotateX: [0, -360], rotateY: [0, 360], y: [0, -15, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="cyber-geo cyber-geo-ring"
            style={{ top: "40%", left: "5%" }}
            animate={{ rotateY: [0, 360], rotateX: [65, 65], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="cyber-geo cyber-geo-pyramid"
            style={{ bottom: "30%", left: "15%" }}
            animate={{ rotateY: [0, 360], y: [0, -10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="cyber-holo-ring"
            style={{ top: "25%", right: "20%" }}
            animate={{ rotateX: [65, 65], rotateZ: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="cyber-hex-stream"
            style={{ top: "8%", right: "5%" }}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            0xF4A3 · 0x9B7E
          </motion.div>
          <motion.div
            className="cyber-hex-stream"
            style={{ bottom: "15%", left: "3%" }}
            animate={{ opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            SHA-256 VERIFIED
          </motion.div>

          <svg className="cyber-lines-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <motion.line
              x1="0" y1="200" x2="1000" y2="400"
              stroke="hsl(190, 100%, 50%)"
              strokeWidth="0.5"
              strokeOpacity="0.06"
              animate={{ strokeOpacity: [0.03, 0.08, 0.03] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.line
              x1="200" y1="0" x2="800" y2="1000"
              stroke="hsl(190, 100%, 50%)"
              strokeWidth="0.5"
              strokeOpacity="0.04"
              animate={{ strokeOpacity: [0.02, 0.06, 0.02] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.circle
              cx="500" cy="300"
              r="80"
              fill="none"
              stroke="hsl(190, 100%, 50%)"
              strokeWidth="0.5"
              strokeDasharray="4 6"
              animate={{ r: [80, 120, 80], strokeOpacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <div className="landing-container">
          <GlobeBackground />
          <div className="landing-intro">
            <motion.h2
              className="hover-invert-accent"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Hello! I'm
            </motion.h2>
            <motion.h1
              className="hover-invert"
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
              className="hover-invert"
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
                  className="landing-role hover-invert-accent"
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
      </div>
    </>
  );
};

export default Landing;
