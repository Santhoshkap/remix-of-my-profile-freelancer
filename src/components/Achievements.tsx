import { Trophy, BookOpen, Globe, Users, Building2, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { SectionReveal } from "./AnimationUtils";
import type { LucideIcon } from "lucide-react";

const achievements = [
  { icon: Trophy, title: "Top 10 Tech Leader – 2025", desc: "Recognized for leadership in cybersecurity & GRC" },
  { icon: BookOpen, title: "ISACA Published Author", desc: "Whitepaper on DPDP & privacy frameworks" },
  { icon: Trophy, title: "ISACA Competition Winner", desc: "Recognized for innovation in privacy & compliance" },
  { icon: Globe, title: "Global Speaker", desc: "Spoken at cybersecurity & GRC forums worldwide" },
  { icon: Building2, title: "50+ Enterprises Advised", desc: "Delivered GRC & security programs globally" },
  { icon: GraduationCap, title: "100+ Professionals Mentored", desc: "Guided teams in GRC, audit & compliance careers" },
];

function HoloIcon({ Icon, index }: { Icon: LucideIcon; index: number }) {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center mx-auto mb-2">
      {/* Orbiting ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/15"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 10 + index * 2, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d", rotateX: "65deg" }}
      />

      {/* Counter-rotating hex frame */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute w-14 h-14"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <polygon
          points="50,5 90,27 90,73 50,95 10,73 10,27"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="0.8"
          opacity="0.12"
        />
      </motion.svg>

      {/* Pulsing glow */}
      <motion.div
        className="absolute w-10 h-10 rounded-full"
        animate={{
          boxShadow: [
            "0 0 12px 2px hsl(var(--primary) / 0.08)",
            "0 0 24px 6px hsl(var(--primary) / 0.2)",
            "0 0 12px 2px hsl(var(--primary) / 0.08)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
      />

      {/* Orbiting dot */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-primary/40"
        animate={{
          x: [0, 24, 0, -24, 0],
          y: [-24, 0, 24, 0, -24],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: index * 0.4 }}
      />

      {/* Icon with float + 3D rotate */}
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotateY: [0, 12, 0, -12, 0],
        }}
        transition={{
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
          rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative z-10"
      >
        <Icon className="w-7 h-7 text-primary/80 drop-shadow-[0_0_6px_hsl(var(--primary)/0.35)]" />
      </motion.div>
    </div>
  );
}

const Achievements = () => {
  return (
    <section
      id="achievements"
      className="py-8 md:py-12 relative overflow-hidden"
      style={{ backgroundColor: "var(--backgroundColor)", zIndex: 12 }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-center mb-3 text-glow tracking-wide">
            Achievements & <span style={{ color: "var(--accentColor)" }}>Recognition</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-6 md:mb-8"
          />
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <div className="glass rounded-xl p-6 text-center border border-primary/[0.06] hover:border-primary/20 hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.15)] transition-all duration-500 h-full flex flex-col items-center justify-center gap-2">
                <HoloIcon Icon={a.icon} index={i} />
                <h3 className="text-sm font-display font-semibold text-foreground leading-snug">{a.title}</h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
