import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import heroImage from "@/assets/hero-bg.png";
import officeImage from "@/assets/office-workspace.png";
import eventImage from "@/assets/tech-event.png";

const slides = [
  {
    type: "video" as const,
    background: heroImage,
    badge: "AI-First Enterprise Solutions",
    title: "Building the Future of",
    highlight: "Enterprise Technology",
    subtitle: "We help organizations scale with AI-powered enterprise applications and empower the next generation through cutting-edge tech training.",
  },
  {
    type: "image" as const,
    background: officeImage,
    badge: "Our Workspace",
    title: "Innovation Happens",
    highlight: "Here Every Day",
    subtitle: "Our modern office spaces are designed to foster creativity, collaboration, and breakthrough solutions for enterprise challenges.",
  },
  {
    type: "image" as const,
    background: eventImage,
    badge: "Community Events",
    title: "Leading the Tech",
    highlight: "Community Forward",
    subtitle: "We host and participate in industry events, sharing knowledge and building connections that drive innovation across sectors.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${slide.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>
      
      {/* Video-like animated overlay for first slide */}
      {slide.type === "video" && (
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(45deg, hsl(var(--primary)/0.3) 25%, transparent 25%, transparent 75%, hsl(var(--primary)/0.3) 75%)',
            backgroundSize: '60px 60px',
          }}
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background z-0" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-30 z-0" />
      
      {/* Floating Glow Effects */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl z-0"
      />
      
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium shimmer"
            >
              <Sparkles size={16} className="animate-pulse" />
              <span>{slide.badge}</span>
            </motion.div>
          </AnimatePresence>
          
          {/* Main Heading */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight"
            >
              {slide.title}
              <span className="block mt-2 gradient-text">{slide.highlight}</span>
            </motion.h1>
          </AnimatePresence>
          
          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              {slide.subtitle}
            </motion.p>
          </AnimatePresence>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            <Button size="lg" className="group text-lg px-8 py-6 glow-primary hover:scale-105 transition-all duration-300">
              Start Your Journey
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
              <Play className="mr-2" size={18} />
              Watch Demo
            </Button>
          </motion.div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 pt-8">
            <button
              onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
              className="p-2 rounded-full bg-background/20 border border-border/30 hover:bg-primary/20 hover:border-primary/50 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} className="text-foreground" />
            </button>
            
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentSlide(index); setIsAutoPlaying(false); }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
              className="p-2 rounded-full bg-background/20 border border-border/30 hover:bg-primary/20 hover:border-primary/50 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight size={24} className="text-foreground" />
            </button>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 flex flex-wrap justify-center items-center gap-8 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm">Trusted by 50+ Enterprises</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm">99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm">SOC 2 Compliant</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
