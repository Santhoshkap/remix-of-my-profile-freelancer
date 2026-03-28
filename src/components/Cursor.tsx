import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
    };

    document.addEventListener("mousemove", onMove);

    let raf: number;
    const loop = () => {
      const ease = 0.12;
      ringPos.x += (mouse.x - ringPos.x) * ease;
      ringPos.y += (mouse.y - ringPos.y) * ease;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) scale(${hovering ? 1.8 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onOver = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      if (el.dataset.cursor === "disable") {
        dot.classList.add("cursor-hidden");
        ring.classList.add("cursor-hidden");
      } else {
        hovering = true;
        ring.classList.add("cursor-hover");
      }
    };
    const onOut = () => {
      hovering = false;
      dot.classList.remove("cursor-hidden");
      ring.classList.remove("cursor-hidden", "cursor-hover");
    };

    const bindCursorTargets = () => {
      document.querySelectorAll("[data-cursor]").forEach((el) => {
        el.addEventListener("mouseover", onOver);
        el.addEventListener("mouseout", onOut);
      });
    };

    bindCursorTargets();
    const observer = new MutationObserver(bindCursorTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
};

export default Cursor;
