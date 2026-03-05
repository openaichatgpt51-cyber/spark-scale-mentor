import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

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

const GrowthChart = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-3xl p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Strategic Growth Trajectory</h3>
              <p className="text-muted-foreground">Cumulative project delivery and talent development metrics</p>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Enterprise Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">Trained Specialists</span>
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

export default GrowthChart;
