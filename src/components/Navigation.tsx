import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Greenspoon" className="h-8" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {isHomePage ? (
              <>
                <a href="#services" className="text-foreground/80 hover:text-primary transition-colors">
                  Services
                </a>
                <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
                  About
                </a>
                <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors">
                  Contact
                </a>
              </>
            ) : (
              <>
                <Link to="/#services" className="text-foreground/80 hover:text-primary transition-colors">
                  Services
                </Link>
                <Link to="/#about" className="text-foreground/80 hover:text-primary transition-colors">
                  About
                </Link>
                <Link to="/#contact" className="text-foreground/80 hover:text-primary transition-colors">
                  Contact
                </Link>
              </>
            )}
            <Link to="/tech-training">
              <Button variant="default" size="sm">
                Tech Training
              </Button>
            </Link>
          </div>

          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {isHomePage ? (
              <>
                <a href="#services" className="text-foreground/80 hover:text-primary transition-colors">
                  Services
                </a>
                <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
                  About
                </a>
                <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors">
                  Contact
                </a>
              </>
            ) : (
              <>
                <Link to="/#services" className="text-foreground/80 hover:text-primary transition-colors">
                  Services
                </Link>
                <Link to="/#about" className="text-foreground/80 hover:text-primary transition-colors">
                  About
                </Link>
                <Link to="/#contact" className="text-foreground/80 hover:text-primary transition-colors">
                  Contact
                </Link>
              </>
            )}
            <Link to="/tech-training">
              <Button variant="default" size="sm" className="w-full">
                Tech Training
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;