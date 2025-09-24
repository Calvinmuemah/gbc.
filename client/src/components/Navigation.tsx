import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Sermons", href: "#sermons" },
    { name: "Events", href: "#events" },
    { name: "Ministries", href: "#ministries" },
    { name: "Give", href: "#give" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/95 backdrop-blur-sm shadow-soft transition-smooth">
      {/* Use full-width flex without centering container */}
      <div className="flex items-center justify-between h-16 px-4 md:px-16">
        {/* Logo on far left */}
        <h2 className="text-xl font-serif font-semibold text-primary">
          Glory Bible Church
        </h2>

        {/* Desktop Navigation on far right */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-content-gray hover:text-primary transition-smooth font-medium"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile menu button on far right */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden pb-4 animate-fade-in px-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-left py-2 text-content-gray hover:text-primary transition-smooth font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
