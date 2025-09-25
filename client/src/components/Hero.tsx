import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";
import heroImage from "@/assets/church-hero.jpg";


const Hero = () => {
  const scrollToSermons = () => {
    const section = document.getElementById("sermons");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFooter = () => {
    const section = document.getElementById("footer");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto container-padding">
        <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in text-white">
          Welcome to Glory Bible Church
        </h1>
        <p className="hero-text text-xl md:text-2xl mb-8 font-light opacity-90 animate-fade-in text-white">
          Where faith meets fellowship, and every heart finds a home
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg" 
            onClick={scrollToFooter}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg shadow-medium transition-bounce hover:scale-105"
          >
            <Users className="mr-2 h-5 w-5" />
            Join Us Sunday
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={scrollToSermons}
            className="border-green-500 text-green-500 hover:bg-green-50 px-8 py-4 text-lg backdrop-blur-sm transition-bounce hover:scale-105"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Online
          </Button>
        </div>

        <div className="mt-12 text-center animate-fade-in">
          <p className="hero-text text-sm md:text-base text-white opacity-75">
            Sunday Services: 11:00 AM & 1:00 PM • Kamadep, Kakamega
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
