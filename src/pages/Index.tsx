// Update this page (the content is just a fallback if you fail to update the page)

// IMPORTANT: Fully REPLACE this with your own code
import Character from "@/components/Character";
import Globe from "@/components/Globe";

const Index = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <div id="hero-section" className="h-screen flex items-center justify-center">
        <Globe />
      </div>

      {/* SERVICES SECTION */}
      <div id="services-section" className="min-h-screen flex items-center justify-center">
        <Character />
      </div>
    </div>
  );
};

export default Index;
