import { Button } from "@/components/ui/button";
import { Menu, Settings } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.svg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user, isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Greenatech" className="h-12 md:h-14" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {isHomePage ? (
              <a href="#services" className="text-foreground/80 hover:text-primary transition-colors">
                Enterprise Solutions
              </a>
            ) : (
              <Link to="/#services" className="text-foreground/80 hover:text-primary transition-colors">
                Enterprise Solutions
              </Link>
            )}
            <Link to="/tech-training" className="text-foreground/80 hover:text-primary transition-colors">
              Tech Training
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors">
              Contact
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
                <Settings size={16} />
                Admin
              </Link>
            )}
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
              <a href="#services" className="text-foreground/80 hover:text-primary transition-colors">
                Enterprise Solutions
              </a>
            ) : (
              <Link to="/#services" className="text-foreground/80 hover:text-primary transition-colors">
                Enterprise Solutions
              </Link>
            )}
            <Link to="/tech-training" className="text-foreground/80 hover:text-primary transition-colors">
              Tech Training
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors">
              Contact
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
                <Settings size={16} />
                Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
