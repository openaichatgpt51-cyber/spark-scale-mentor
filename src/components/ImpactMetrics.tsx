import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Globe, Award } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: 500,
    suffix: "+",
    label: "Projects Scaled",
    description: "Successful enterprise implementations",
    color: "primary"
  },
  {
    icon: Users,
    value: 1000,
    suffix: "+",
    label: "Specialists Trained",
    description: "Tech professionals upskilled",
    color: "accent"
  },
  {
    icon: Globe,
    value: 50,
    suffix: "+",
    label: "Global Clients",
    description: "Enterprises across industries",
    color: "primary"
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Retention Rate",
    description: "Client success stories",
    color: "accent"
  }
];

const CountUpNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold">
      {count}{suffix}
    </div>
  );
};

const ImpactMetrics = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            Proven Performance
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Delivering Measurable
            <span className="gradient-text"> Growth and ROI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our track record illustrates our commitment to excellence for clients worldwide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center hover-lift group"
            >
              <div className={`w-14 h-14 mx-auto rounded-xl bg-${metric.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <metric.icon className={`w-7 h-7 text-${metric.color}`} />
              </div>
              <div className={`text-${metric.color}`}>
                <CountUpNumber value={metric.value} suffix={metric.suffix} />
              </div>
              <h3 className="text-lg font-semibold mt-2">{metric.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{metric.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
