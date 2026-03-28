import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function AnimatedText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const chars = text.split("");
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, filter: "blur(5px)", rotateX: 40 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 40%"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
      })}
    </p>
  );
}

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: any }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y, display: "inline-block", marginRight: "0.3em" }} className="will-change-transform">
      {word}
    </motion.span>
  );
}

export function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "", stagger = 0.1 }: { children: React.ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MagneticHover({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxSection({ children, className = "", speed = 0.3 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function FloatingElement({ children, className = "", duration = 6, delay = 0 }: { children: React.ReactNode; className?: string; duration?: number; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -12, 0],
        rotateZ: [0, 1, -1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function GlowPulse({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          "0 0 15px hsl(190 100% 50% / 0.1)",
          "0 0 30px hsl(190 100% 50% / 0.2)",
          "0 0 15px hsl(190 100% 50% / 0.1)",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, rotateX: 15, y: 40, perspective: 800 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
