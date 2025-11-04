import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <img src={logo} alt="Greenspoon" className="h-8" />
          
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2024 Greenspoon. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;