import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const About = () => {
  const values = [
    "AI-driven innovation at every step",
    "Enterprise-grade scalability",
    "Expert tech training programs",
    "Proven track record of success"
  ];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Transforming Ideas Into 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Scalable Reality</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We're a tech startup on a mission to revolutionize how enterprises leverage technology. Our AI-first approach ensures your organization stays ahead of the curve while we nurture the next generation of tech talent.
            </p>
            <div className="space-y-3">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={24} />
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </div>
            <Button size="lg" variant="outline" className="mt-6">
              Learn More About Us
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
            <div className="relative bg-card/50 backdrop-blur border border-border rounded-3xl p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-background/50 rounded-2xl">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="text-center p-6 bg-background/50 rounded-2xl">
                  <div className="text-4xl font-bold text-accent mb-2">1000+</div>
                  <div className="text-sm text-muted-foreground">Students Trained</div>
                </div>
                <div className="text-center p-6 bg-background/50 rounded-2xl">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center p-6 bg-background/50 rounded-2xl">
                  <div className="text-4xl font-bold text-accent mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Enterprise Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;