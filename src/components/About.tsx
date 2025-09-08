import { motion } from 'framer-motion';
import { Code, Database, TrendingUp, Award } from 'lucide-react';
import { personalInfo } from '@/data/content';
import { useReducedMotion } from 'framer-motion';

const keyHighlights = [
  {
    icon: TrendingUp,
    title: "Business Intelligence",
    description: "4+ years delivering BI/reporting solutions across finance, media, and tech industries"
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Expert in ETL pipelines, data models, and executive KPI dashboards"
  },
  {
    icon: Code,
    title: "Technical Stack",
    description: "Proficient in Tableau, Power BI, SQL, Python, and AWS cloud technologies"
  },
  {
    icon: Award,
    title: "Impact Driven",
    description: "Improved reporting accuracy by 60%+ and system availability to 99.9%"
  }
];

const typewriterKeywords = [
  "Data Analytics",
  "Business Intelligence", 
  "ETL Pipelines",
  "Executive Dashboards",
  "SQL Optimization",
  "Cloud Solutions"
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 50,
      scale: shouldReduceMotion ? 1 : 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const keywordVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { 
      opacity: 1, 
      width: "auto",
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="about" className="py-10 relative overflow-hidden scroll-mt-[88px] md:scroll-mt-[96px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-accent rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="bg-hero-gradient bg-clip-text text-transparent">Me</span>
            </h2>
            
            {/* Animated Keywords */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {typewriterKeywords.map((keyword, index) => (
                <motion.span
                  key={keyword}
                  variants={keywordVariants}
                  transition={{ delay: index * 0.2 }}
                  className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20 overflow-hidden whitespace-nowrap"
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <motion.div variants={cardVariants} className="space-y-6">
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p>
                  {personalInfo.about}
                </p>
              </div>

              {/* Quick Stats */}
              <motion.div 
                variants={cardVariants}
                className="grid grid-cols-2 gap-6 pt-6"
              >
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">4+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                  <div className="text-sm text-muted-foreground">System Uptime</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">60%+</div>
                  <div className="text-sm text-muted-foreground">Accuracy Improvement</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">70%</div>
                  <div className="text-sm text-muted-foreground">Workload Reduction</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Key Highlights Cards */}
            <motion.div variants={cardVariants} className="space-y-6">
              {keyHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  variants={cardVariants}
                  whileHover={shouldReduceMotion ? {} : { 
                    scale: 1.02, 
                    y: -5,
                    boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.3)"
                  }}
                  className="p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                      <highlight.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">
                        {highlight.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}