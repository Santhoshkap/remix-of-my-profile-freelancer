import { motion } from "framer-motion";

export default function GlowingOrbs() {
  return (
    <>
      {/* Top-left cyan orb */}
      <motion.div
        className="fixed top-0 left-0 z-[1] pointer-events-none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, hsl(190 100% 50% / 0.12), transparent 70%)",
          filter: "blur(50px)",
          transform: "translate(-40%, -40%)",
        }}
      />
      {/* Right-side cyan orb (matching left) */}
      <motion.div
        className="fixed top-1/2 right-0 z-[1] pointer-events-none"
        animate={{ y: ["-50%", "-45%", "-55%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, hsl(190 100% 50% / 0.10), transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(50%, -50%)",
        }}
      />
      {/* Bottom-left cyan orb */}
      <motion.div
        className="fixed bottom-0 left-1/3 z-[1] pointer-events-none"
        animate={{ x: ["-10%", "10%", "-10%"], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 250,
          height: 250,
          background: "radial-gradient(circle, hsl(190 100% 50% / 0.06), transparent 70%)",
          filter: "blur(50px)",
          transform: "translate(-50%, 40%)",
        }}
      />
    </>
  );
}
