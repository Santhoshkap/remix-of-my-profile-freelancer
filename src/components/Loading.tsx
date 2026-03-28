import { useEffect, useState, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [phase, setPhase] = useState<"loading" | "ready" | "exit">("loading");
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (percent >= 100 && !hasTriggered.current) {
      hasTriggered.current = true;
      setTimeout(() => setPhase("ready"), 300);
    }
  }, [percent]);

  useEffect(() => {
    if (phase === "ready") {
      const timer = setTimeout(() => {
        setPhase("exit");
        import("./utils/initialFX").then((module) => {
          setTimeout(() => {
            module.initialFX?.();
            setIsLoading(false);
          }, 600);
        });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, setIsLoading]);

  return (
    <div className={`loader ${phase === "exit" ? "loader-exit" : ""}`}>
      {/* Scan line */}
      <div className="loader-scanline" />

      {/* Corner brackets */}
      <div className="loader-corner loader-corner-tl" />
      <div className="loader-corner loader-corner-tr" />
      <div className="loader-corner loader-corner-bl" />
      <div className="loader-corner loader-corner-br" />

      {/* Center content */}
      <div className="loader-center">
        <div className="loader-logo">SK</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${Math.min(percent, 100)}%` }} />
        </div>
        <div className="loader-percent">
          <span className="loader-percent-num">{Math.min(percent, 100)}</span>
          <span className="loader-percent-sign">%</span>
        </div>
        <div className={`loader-status ${phase === "ready" ? "loader-status-ready" : ""}`}>
          {phase === "ready" ? "ACCESS GRANTED" : "INITIALIZING SYSTEM"}
        </div>
      </div>

      {/* Bottom info */}
      <div className="loader-bottom">
        <span>GRC & CYBERSECURITY</span>
        <span>SANTHOSH KAPALAVAI</span>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;

  let interval = setInterval(() => {
    if (percent <= 60) {
      percent += Math.round(Math.random() * 8) + 2;
      setLoading(Math.min(percent, 100));
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent += Math.round(Math.random() * 3) + 1;
        setLoading(Math.min(percent, 100));
        if (percent > 91) clearInterval(interval);
      }, 400);
    }
  }, 80);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent += 3;
          setLoading(Math.min(percent, 100));
        } else {
          resolve(100);
          clearInterval(interval);
        }
      }, 10);
    });
  }

  return { loaded, percent, clear };
};
