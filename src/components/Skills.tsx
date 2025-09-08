import { motion } from 'framer-motion';
import { skills } from '@/data/content';
import HoneycombMeter from './Skills/HoneycombMeter';
import ShardMeter from './Skills/ShardMeter';
import GlyphMeter from './Skills/GlyphMeter';
import { useReducedMotion } from 'framer-motion';

// Rotate through the three meter types for visual variety
const getMeterComponent = (index: number) => {
  const components = [HoneycombMeter, ShardMeter, GlyphMeter];
  return components[index % 3];
};

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="skills" className="py-10 relative overflow-hidden scroll-mt-[88px] md:scroll-mt-[96px]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-accent rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-primary rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div variants={categoryVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Technical <span className="bg-hero-gradient bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive expertise across the full data analytics and business intelligence stack, 
              from cloud infrastructure to executive reporting.
            </p>
          </motion.div>

          {/* Skills Categories */}
          <div className="space-y-16">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <motion.div 
                key={category}
                variants={categoryVariants}
                className="space-y-8"
              >
                {/* Category Title */}
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    {category}
                  </h3>
                  <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {skillList.map((skill, skillIndex) => {
                    const globalIndex = categoryIndex * 10 + skillIndex; // Ensure unique cycling
                    const MeterComponent = getMeterComponent(globalIndex);
                    
                    return (
                      <MeterComponent
                        key={`${category}-${skill.name}`}
                        skill={skill.name}
                        percentage={skill.percentage}
                        delay={skillIndex * 0.1}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills Summary */}
          <motion.div 
            variants={categoryVariants}
            className="mt-16 text-center"
          >
            <div className="max-w-4xl mx-auto p-8 rounded-lg bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/10">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Full-Stack BI Expertise
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                From data ingestion and ETL pipeline development to executive dashboard creation and cloud infrastructure management, 
                I bring end-to-end expertise in modern business intelligence and data analytics. My experience spans traditional 
                enterprise tools like Tableau and Oracle to cutting-edge cloud platforms and DevOps practices.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}