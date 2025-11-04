import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GraduationCap } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const trainingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone is required").max(20, "Phone must be less than 20 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  interests: z.string().trim().min(1, "Please tell us about your training interests").max(500, "Message must be less than 500 characters"),
});

type TrainingFormData = z.infer<typeof trainingSchema>;

const TechTraining = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TrainingFormData>({
    resolver: zodResolver(trainingSchema),
  });

  const onSubmit = (data: TrainingFormData) => {
    console.log("Training sign-up:", data);
    toast({
      title: "Registration Received!",
      description: "We'll contact you soon to discuss your training needs.",
    });
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <GraduationCap className="text-primary" size={48} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tech Training
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Programs</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empower your team with cutting-edge technical skills. Our comprehensive training programs are designed to bridge the gap between traditional business practices and modern technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <h3 className="font-semibold text-lg mb-3">Web Development</h3>
              <p className="text-muted-foreground text-sm">Learn modern frameworks, responsive design, and full-stack development from industry experts.</p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <h3 className="font-semibold text-lg mb-3">Cybersecurity</h3>
              <p className="text-muted-foreground text-sm">Master security fundamentals, threat detection, and best practices to protect your organization.</p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <h3 className="font-semibold text-lg mb-3">AI & Automation</h3>
              <p className="text-muted-foreground text-sm">Understand AI tools, machine learning basics, and how to automate workflows for efficiency.</p>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto p-8 bg-card/50 backdrop-blur border-border">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up for Training</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="company">Company (Optional)</Label>
                <Input
                  id="company"
                  {...register("company")}
                  placeholder="Your Company"
                />
              </div>

              <div>
                <Label htmlFor="interests">Training Interests *</Label>
                <Textarea
                  id="interests"
                  {...register("interests")}
                  placeholder="Tell us which areas you're interested in and any specific needs..."
                  className={errors.interests ? "border-destructive" : ""}
                />
                {errors.interests && (
                  <p className="text-destructive text-sm mt-1">{errors.interests.message}</p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full">
                Submit Registration
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TechTraining;
