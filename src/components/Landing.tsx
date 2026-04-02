/**
 * Landing.tsx — updated hero section with 3D globe
 *
 * Drop in as: src/components/Landing.tsx
 * The globe replaces the old cyber-bg animation.
 * All text, role-cycling, and children logic stays identical.
 */

import { PropsWithChildren, useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Landing.css";

// Lazy-load the heavy Globe so it never blocks the loading screen
const GlobeHero = lazy(() => import("./GlobeHero"));

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

        {/* ── 3D Globe (fills the section as background) ── */}
        <div className="landing-globe-bg" aria-hidden="true">
          <Suspense fallback={null}>
            <GlobeHero />
          </Suspense>
        </div>

        {/* ── Left-side gradient so text stays readable ── */}
        <div className="landing-text-veil" aria-hidden="true" />

        {/* ── Hero text (unchanged from original) ── */}
        <div className="landing-container">
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

        {/* ── 3D Character model (passed in by MainContainer) ── */}
        {children}
      </div>
    </>
  );
};

export default Landing;
