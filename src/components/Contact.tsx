import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import partnershipImage from "@/assets/partnership.jpg";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  organization: z.string().trim().max(100, "Organization must be less than 100 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form:", data);
    toast({
      title: "Inquiry Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    reset();
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={partnershipImage} 
          alt="Partnership and collaboration" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Engineer Your Next
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to accelerate your digital transformation or empower your team? We are ready to listen.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 text-center bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="text-primary" size={24} />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Strategic Partnerships</h3>
              <p className="text-muted-foreground text-sm">hello@greenatechglobal.com</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 text-center bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Phone className="text-accent" size={24} />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Enterprise Support</h3>
              <p className="text-muted-foreground text-sm">+254 700 000 000</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 text-center bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <MapPin className="text-primary" size={24} />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Global HQ</h3>
              <p className="text-muted-foreground text-sm">Lagos, Nigeria</p>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto p-8 bg-card/50 backdrop-blur border-border">
          <h3 className="text-2xl font-bold mb-6 text-center">Send Us a Project Inquiry</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="contact-name">Name *</Label>
              <Input
                id="contact-name"
                {...register("name")}
                placeholder="Your name"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="contact-email">Corporate Email *</Label>
              <Input
                id="contact-email"
                type="email"
                {...register("email")}
                placeholder="you@company.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="contact-organization">Organization</Label>
              <Input
                id="contact-organization"
                {...register("organization")}
                placeholder="Your organization"
              />
            </div>

            <div>
              <Label htmlFor="contact-message">Message *</Label>
              <Textarea
                id="contact-message"
                {...register("message")}
                placeholder="Tell us about your project..."
                className={errors.message ? "border-destructive" : ""}
              />
              {errors.message && (
                <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full">
              Submit Inquiry
            </Button>
          </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
