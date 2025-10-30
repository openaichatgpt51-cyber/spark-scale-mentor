import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Build Something 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Amazing Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your business or start your tech journey? Get in touch with us today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 text-center bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="text-primary" size={24} />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Email Us</h3>
            <p className="text-muted-foreground text-sm">hello@technova.com</p>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <Phone className="text-accent" size={24} />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Call Us</h3>
            <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="text-primary" size={24} />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Visit Us</h3>
            <p className="text-muted-foreground text-sm">San Francisco, CA</p>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button size="lg">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;