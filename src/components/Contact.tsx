import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Linkedin, MapPin, Send } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem, MagneticHover } from "./AnimationUtils";
import { motion } from "framer-motion";
import "./styles/Contact.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { icon: Mail, label: "santhoshkapalavai@gmail.com", href: "mailto:santhoshkapalavai@gmail.com" },
  { icon: Phone, label: "+1 (XXX) XXX-XXXX", href: "#" },
  { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/santhoshkapalavai" },
  { icon: MapPin, label: "United States", href: "#" },
];

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
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
    <section id="contact" className="py-28 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8">
        <SectionReveal>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-glow contact-title">
            Get In Touch
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-20"
          />
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <SectionReveal>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Interested in discussing cybersecurity strategy, GRC transformation,
              or speaking opportunities? Let's connect.
            </p>
            <StaggerContainer className="space-y-4" stagger={0.1}>
              {contactLinks.map((item) => (
                <StaggerItem key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <MagneticHover>
                      <div className="w-10 h-10 rounded-lg glass border-glow flex items-center justify-center group-hover:box-glow transition-all duration-500">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                    </MagneticHover>
                    <span className="text-sm font-body">{item.label}</span>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </SectionReveal>

          <SectionReveal>
            <motion.form
              onSubmit={handleSubmit}
              className="glass rounded-xl p-6 border-glow space-y-4"
              whileHover={{ boxShadow: "0 0 30px hsl(190 100% 50% / 0.1)" }}
              transition={{ duration: 0.5 }}
            >
              {["Your Name", "Your Email"].map((placeholder, i) => (
                <motion.div key={placeholder} whileFocus={{ scale: 1.01 }}>
                  <input
                    type={i === 1 ? "email" : "text"}
                    placeholder={placeholder}
                    required
                    className="w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_hsl(190_100%_50%/0.1)] transition-all font-body"
                  />
                </motion.div>
              ))}
              <textarea
                placeholder="Your Message"
                rows={4}
                required
                className="w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_hsl(190_100%_50%/0.1)] transition-all resize-none font-body"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all box-glow flex items-center justify-center gap-2 font-display"
              >
                {sent ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                    Message Sent! ✓
                  </motion.span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
          </SectionReveal>
        </div>

        <div className="mt-20 pt-8 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground/50 font-body">
            © {new Date().getFullYear()} Santhosh Kapalavai. Securing the digital frontier.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
