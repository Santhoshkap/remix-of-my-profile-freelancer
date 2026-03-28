import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Linkedin, MapPin, Send, CheckCircle } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem, MagneticHover, Tilt3D } from "./AnimationUtils";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Contact.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { openExternalLink } from "../lib/openExternalLink";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { icon: Mail, label: "santhoshkapalavai@gmail.com", href: "mailto:santhoshkapalavai@gmail.com" },
  { icon: Phone, label: "+91-8125414012", href: "tel:+918125414012" },
  { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/santhosh-kapalavai/" },
  { icon: MapPin, label: "India / Global", href: "#" },
];

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xpqoqvgv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 3000);
      }
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        scrollTrigger: { trigger: ".contact-title", start: "top 80%" },
        y: 60, opacity: 0, duration: 1, ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="py-10 md:py-16 relative overflow-hidden" ref={containerRef} style={{ backgroundColor: "var(--backgroundColor)", zIndex: 12 }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-center mb-3 text-glow contact-title tracking-wide hover-invert">
            Get In <span className="hover-invert-accent" style={{ color: "var(--accentColor)" }}>Touch</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-8 md:mb-12"
          />
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 max-w-4xl mx-auto">
          <SectionReveal>
            <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed mb-8">
              Interested in discussing cybersecurity strategy, GRC transformation,
              or speaking opportunities? Let's connect.
            </p>
            <StaggerContainer className="space-y-5" stagger={0.1}>
              {contactLinks.map((item) => {
                const isExternal = item.href.startsWith("http");

                return (
                  <StaggerItem key={item.label}>
                    <a
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={isExternal ? (e) => {
                        e.preventDefault();
                        openExternalLink(item.href);
                      } : undefined}
                      className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                    >
                    <MagneticHover>
                      <div className="w-11 h-11 rounded-lg glass border-glow flex items-center justify-center group-hover:box-glow transition-all duration-500">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                    </MagneticHover>
                    <span className="text-sm font-body tracking-wide hover-invert">{item.label}</span>
                  </a>
                </StaggerItem>
                );
              })}
            </StaggerContainer>
          </SectionReveal>

          <SectionReveal>
            <Tilt3D intensity={8}>
              <motion.form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-6 md:p-8 border-glow space-y-5"
                whileHover={{ boxShadow: "0 0 40px hsl(190 100% 50% / 0.08)" }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(190_100%_50%/0.08)] transition-all font-body tracking-wide"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(190_100%_50%/0.08)] transition-all font-body tracking-wide"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(190_100%_50%/0.08)] transition-all resize-none font-body tracking-wide"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(190 100% 50% / 0.25)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all box-glow flex items-center justify-center gap-2 font-display tracking-wider disabled:opacity-60"
                >
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.span
                        key="sent"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Message Sent!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.form>
            </Tilt3D>
          </SectionReveal>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 pt-8 border-t border-border/20 text-center"
        >
          <p className="text-xs text-muted-foreground/40 font-body tracking-widest uppercase">
            © {new Date().getFullYear()} Santhosh Kapalavai · Securing the digital frontier
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
