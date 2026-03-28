import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const TEXT_SELECTORS = "h1,h2,h3,h4,h5,h6,p,span,a,li,label,button";

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let isTextHover = false;
    let isClickableHover = false;
    let isHidden = false;
    let clicking = false;

    // Particle trail
    const particles: Particle[] = [];
    const MAX_PARTICLES = 8;
    let lastParticleTime = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;

      // Spawn trail particles
      const now = performance.now();
      if (now - lastParticleTime > 30) {
        particles.push({ x: mouse.x, y: mouse.y, alpha: 0.7, size: 3 });
        if (particles.length > MAX_PARTICLES) particles.shift();
        lastParticleTime = now;
      }
    };

    const onDown = () => {
      clicking = true;
      ring.classList.add("cursor-click");
      // Burst particles
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 20,
          y: mouse.y + (Math.random() - 0.5) * 20,
          alpha: 1,
          size: 2 + Math.random() * 3,
        });
      }
      setTimeout(() => {
        clicking = false;
        ring.classList.remove("cursor-click");
      }, 400);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);

    // Animation loop
    let raf: number;
    const loop = () => {
      // Ring follow with easing (magnetic pull for clickables)
      const ease = isClickableHover ? 0.2 : 0.1;
      ringPos.x += (mouse.x - ringPos.x) * ease;
      ringPos.y += (mouse.y - ringPos.y) * ease;

      // Apply ring transform — don't set transform when spinning via CSS animation
      if (!isTextHover) {
        ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      } else {
        ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      }

      // Draw particle trail
      ctx.clearRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= 0.015;
        p.size *= 0.97;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(190, 100%, 50%, ${p.alpha})`;
        ctx.shadowColor = `hsla(190, 100%, 50%, ${p.alpha * 0.5})`;
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Text/clickable detection
    const onOver = (e: Event) => {
      const el = e.target as HTMLElement;
      if (!el) return;

      if (el.closest("[data-cursor='disable']")) {
        isHidden = true;
        dot.classList.add("cursor-hidden");
        ring.classList.add("cursor-hidden");
        return;
      }

      if (el.closest("a, button, [data-cursor]")) {
        isClickableHover = true;
        ring.classList.add("cursor-hover");
      }

      if (el.matches(TEXT_SELECTORS) || el.closest(TEXT_SELECTORS)) {
        isTextHover = true;
        ring.classList.add("cursor-text-mode");
        ring.classList.remove("cursor-hover");
      }
    };

    const onOut = (e: Event) => {
      const el = e.target as HTMLElement;
      if (!el) return;
      isTextHover = false;
      isClickableHover = false;
      isHidden = false;
      dot.classList.remove("cursor-hidden");
      ring.classList.remove("cursor-hidden", "cursor-hover", "cursor-text-mode");
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas className="cursor-canvas" ref={canvasRef} />
      <div className="cursor-dot" ref={dotRef}>
        <div className="cursor-dot-inner" />
      </div>
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
};

export default Cursor;
