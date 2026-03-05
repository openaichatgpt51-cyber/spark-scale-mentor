import { motion } from "framer-motion";
import { Cloud, Brain, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import cloudImage from "@/assets/cloud-computing.png";
import aiImage from "@/assets/ai-innovation.png";
import securityImage from "@/assets/cybersecurity.png";
import transformImage from "@/assets/digital-transformation.png";

const services = [
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Build, deploy, and scale on architecture optimized for 99.99% uptime, security, and seamless migration.",
    image: cloudImage,
    stats: "40% average cost reduction",
    color: "from-cyan-500 to-blue-600"
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Deploy custom models and predictive analytics that automate complex operations and unlock new value.",
    image: aiImage,
    stats: "3x faster business insights",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Implement proactive, end-to-end security with robust threat detection and zero-trust architecture.",
    image: securityImage,
    stats: "99.9% threat prevention",
    color: "from-primary to-accent"
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description: "Modernize legacy systems and integrate intelligent workflows to outpace market changes.",
    image: transformImage,
    stats: "60% operational efficiency boost",
    color: "from-orange-500 to-red-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Services = () => {
  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            End-to-End Expertise
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Enterprise Solutions Built for
            <span className="gradient-text"> Scale</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From resilient cloud infrastructure to pioneering AI innovation, we accelerate your digital transformation journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-3xl hover-lift"
            >
              <div className="absolute inset-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="service-card-overlay" />
              </div>

              <div className="relative z-10 p-8 md:p-10 h-full min-h-[400px] flex flex-col justify-end">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mb-6 glow-subtle transition-all duration-300 group-hover:scale-110`}>
                  <service.icon className="w-full h-full text-foreground" />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-4 w-fit">
                  {service.stats}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>

                <Button variant="ghost" className="w-fit group/btn p-0 hover:bg-transparent">
                  <span className="text-primary">Learn More</span>
                  <ArrowRight className="ml-2 w-4 h-4 text-primary transition-transform group-hover/btn:translate-x-2" />
                </Button>
              </div>

              <div className="absolute inset-0 rounded-3xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
