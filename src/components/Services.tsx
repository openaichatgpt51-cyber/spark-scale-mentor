import { Card } from "@/components/ui/card";
import { Bot, GraduationCap, Rocket, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Bot className="w-12 h-12 text-primary" />,
      title: "AI-First Development",
      description: "We build enterprise applications with AI at the core, helping your organization leverage cutting-edge technology for maximum impact."
    },
    {
      icon: <Rocket className="w-12 h-12 text-primary" />,
      title: "Scale & Growth",
      description: "Our solutions are designed to scale with your business, ensuring seamless growth and reaching new markets effortlessly."
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-accent" />,
      title: "Tech Training",
      description: "Empowering young talent with comprehensive tech training programs, preparing them for successful careers in technology."
    },
    {
      icon: <Zap className="w-12 h-12 text-accent" />,
      title: "Rapid Innovation",
      description: "Fast-track your digital transformation with our agile development approach and innovative solutions."
    }
  ];

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What We <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Offer</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions for modern enterprises and aspiring tech professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="p-8 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;