import { useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Achievements from "./Achievements";
import CertificationsSection from "./CertificationsSection";
import Contact from "./Contact";
import Cursor from "./Cursor";
import GlowingOrbs from "./GlowingOrbs";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const MainContainer = () => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <GlowingOrbs />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Achievements />
            <CertificationsSection />
            <Work />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
