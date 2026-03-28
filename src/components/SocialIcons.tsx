import { FaLinkedinIn } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect, type MouseEvent as ReactMouseEvent } from "react";
import HoverLinks from "./HoverLinks";
import { openExternalLink } from "../lib/openExternalLink";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  const handleExternalNavigation = (e: MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    openExternalLink(url);
  };

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://www.linkedin.com/in/santhosh-kapalavai/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleExternalNavigation(e, "https://www.linkedin.com/in/santhosh-kapalavai/")}
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="mailto:santhoshkapalavai@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <MdEmail />
          </a>
        </span>
        <span>
          <a
            href="tel:+918125414012"
            rel="noreferrer"
          >
            <FiPhone />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Santhosh_Kapalavai_CV-4.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => handleExternalNavigation(e, `${window.location.origin}/Santhosh_Kapalavai_CV-4.pdf`)}
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
