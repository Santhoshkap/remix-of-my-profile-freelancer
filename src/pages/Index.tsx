import Character from "@/components/Character";
import Globe from "@/components/Globe/Globe";

const Index = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <div
        id="hero-section"
        className="h-screen flex items-center justify-center px-6"
      >
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-8">
          {/* Left: Text */}
          <div className="flex flex-col gap-4 text-center lg:text-left z-10">
            <h1
              className="text-3xl md:text-5xl font-bold tracking-wider"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Santhosh Kapalavai
            </h1>
            <h2
              className="text-lg md:text-2xl font-light tracking-widest"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: "hsl(190, 100%, 50%)",
              }}
            >
              GRC &amp; Cybersecurity
            </h2>
            <p
              className="text-sm md:text-base max-w-md tracking-wide leading-relaxed"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: "hsl(190, 100%, 50%)",
                textShadow: "0 0 15px hsla(190, 100%, 50%, 0.3)",
              }}
            >
              Securing digital resilience through Governance, Risk &amp;
              Compliance
            </p>
          </div>

          {/* Right: Globe */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh]">
            <Globe />
          </div>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div
        id="services-section"
        className="min-h-screen flex items-center justify-center"
      >
        <Character />
      </div>
    </div>
  );
};

export default Index;
