import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Globe, Award } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const metrics = [
  {
    icon: TrendingUp,
    value: 500,
    suffix: "+",
    label: "Projects Delivered",
    description: "Successful enterprise implementations",
    color: "primary"
  },
  {
    icon: Users,
    value: 1000,
    suffix: "+",
    label: "Students Trained",
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
    label: "Satisfaction Rate",
    description: "Client success stories",
    color: "accent"
  }
];

// Sample data for the growth chart
const growthData = [
  { month: 'Jan', projects: 40, students: 80 },
  { month: 'Feb', projects: 55, students: 120 },
  { month: 'Mar', projects: 75, students: 180 },
  { month: 'Apr', projects: 85, students: 250 },
  { month: 'May', projects: 110, students: 340 },
  { month: 'Jun', projects: 140, students: 420 },
  { month: 'Jul', projects: 175, students: 520 },
  { month: 'Aug', projects: 210, students: 650 },
  { month: 'Sep', projects: 260, students: 780 },
  { month: 'Oct', projects: 320, students: 880 },
  { month: 'Nov', projects: 400, students: 950 },
  { month: 'Dec', projects: 500, students: 1000 }
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
      {/* Animated Background */}
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
            Real Impact
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Driving Measurable
            <span className="gradient-text"> Growth</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our track record speaks for itself — delivering consistent results for enterprises worldwide.
          </p>
        </motion.div>

        {/* Metrics Grid */}
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

        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-3xl p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Annual Growth Trajectory</h3>
              <p className="text-muted-foreground">Projects delivered and students trained this year</p>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">Students</span>
              </div>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(80, 100%, 46%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(80, 100%, 46%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="studentsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(220, 20%, 15%)',
                    border: '1px solid hsl(220, 15%, 25%)',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                  labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
                />
                <Area
                  type="monotone"
                  dataKey="projects"
                  stroke="hsl(80, 100%, 46%)"
                  strokeWidth={3}
                  fill="url(#projectsGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="hsl(160, 70%, 45%)"
                  strokeWidth={3}
                  fill="url(#studentsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMetrics;