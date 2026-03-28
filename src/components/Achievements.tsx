import { Trophy, BookOpen, Globe, Users, Building2, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { SectionReveal } from "./AnimationUtils";

const achievements = [
  { icon: Trophy, title: "Top 10 Tech Leader – 2025", desc: "Recognized for leadership in cybersecurity & GRC" },
  { icon: BookOpen, title: "ISACA Published Author", desc: "Whitepaper on DPDP & privacy frameworks" },
  { icon: Trophy, title: "ISACA Competition Winner", desc: "Recognized for innovation in privacy & compliance" },
  { icon: Globe, title: "Global Speaker", desc: "Spoken at cybersecurity & GRC forums worldwide" },
  { icon: Building2, title: "50+ Enterprises Advised", desc: "Delivered GRC & security programs globally" },
  { icon: GraduationCap, title: "100+ Professionals Mentored", desc: "Guided teams in GRC, audit & compliance careers" },
];

const Achievements = () => {
  return (
    <section
      id="achievements"
      className="py-6 md:py-10 relative overflow-hidden"
      style={{ backgroundColor: "var(--backgroundColor)", zIndex: 12 }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-center mb-3 text-glow tracking-wide">
            Achievements & Recognition
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-10 md:mb-12"
          />
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <div className="glass rounded-xl p-6 text-center border border-primary/[0.06] hover:border-primary/20 hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.15)] transition-all duration-500 h-full flex flex-col items-center justify-center gap-3">
                <a.icon className="w-7 h-7 text-primary/80" />
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
