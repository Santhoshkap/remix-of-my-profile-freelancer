import { motion } from "framer-motion";

export default function GlowingOrbs() {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[1] pointer-events-none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          width: 350,
          height: 350,
          background: "radial-gradient(circle, hsl(190 100% 50% / 0.15), transparent 70%)",
          filter: "blur(40px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <motion.div
        className="fixed top-1/2 right-0 z-[1] pointer-events-none"
        animate={{ y: ["-50%", "-45%", "-55%", "-50%"], rotate: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, hsl(270 80% 60% / 0.1), transparent 70%)",
          filter: "blur(50px)",
          transform: "translate(60%, -50%)",
        }}
      />
      <motion.div
        className="fixed bottom-0 left-1/4 z-[1] pointer-events-none"
        animate={{ x: ["-20%", "20%", "-20%"], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 250,
          height: 250,
          background: "radial-gradient(circle, hsl(210 100% 60% / 0.08), transparent 70%)",
          filter: "blur(40px)",
          transform: "translate(-50%, 50%)",
        }}
      />
    </>
  );
}
