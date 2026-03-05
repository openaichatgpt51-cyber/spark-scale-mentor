import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import teamImage from "@/assets/team-collaboration.jpg";

const About = () => {
  const values = [
    "AI-Driven Innovation",
    "Enterprise-Grade Scalability",
    "Elite Tech Training",
    "Proven Global Impact"
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-3xl opacity-40" />
          <div className="relative overflow-hidden rounded-3xl">
            <img 
              src={teamImage} 
              alt="Our team collaborating in modern office" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 rounded-2xl max-w-md"
              >
                <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                <p className="text-muted-foreground">A global team of innovators, engineers, and visionaries dedicated to building future-proof technology and cultivating the next generation of talent.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
              Our Story
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Engineering Tomorrow's Technology,
              <span className="gradient-text"> Today</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a dynamic tech partner on a dual mission: to revolutionize how enterprises leverage technology for scalable growth, and to nurture the world-class tech talent that will lead that innovation.
            </p>
            
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <CheckCircle className="text-primary" size={18} />
                  </div>
                  <span className="text-foreground text-lg">{value}</span>
                </motion.div>
              ))}
            </div>
            
            <Button size="lg" variant="outline" className="group mt-4 hover:bg-primary/10 hover:border-primary/50">
              Meet the Leadership
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-3xl opacity-60" />
            
            <div className="relative glass-card rounded-3xl p-10 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "500+", label: "Projects Scaled", color: "primary" },
                  { value: "1000+", label: "Specialists Trained", color: "accent" },
                  { value: "98%", label: "Client Retention", color: "primary" },
                  { value: "50+", label: "Enterprise Clients", color: "accent" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center p-6 bg-background/50 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors group"
                  >
                    <div className={`text-4xl md:text-5xl font-bold text-${stat.color} mb-2 group-hover:scale-110 transition-transform`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-xs font-bold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">Join 1000+</span> professionals who trust us
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
