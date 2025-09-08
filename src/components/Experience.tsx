import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Calendar, ChevronDown, Building, Users, TrendingUp } from 'lucide-react';
import { experience } from '@/data/content';
import { useReducedMotion } from 'framer-motion';

export default function Experience() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0])); // First item expanded by default
  const shouldReduceMotion = useReducedMotion();

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : -50,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.2,
      boxShadow: "0 0 20px hsl(var(--primary) / 0.5)",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
  <section id="experience" className="py-10 relative overflow-hidden scroll-mt-[88px] md:scroll-mt-[96px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-36 h-36 bg-accent rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-primary rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Professional <span className="bg-hero-gradient bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Leading BI teams and delivering enterprise-scale analytics solutions that drive business decisions.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-60" />

              {/* Experience Items */}
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <motion.div
                    key={`${exp.company}-${index}`}
                    variants={itemVariants}
                    className="relative flex items-start gap-8"
                  >
                    {/* Timeline Node */}
                    <motion.div
                      variants={nodeVariants}
                      whileHover={shouldReduceMotion ? {} : "hover"}
                      className="relative flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer z-10"
                      onClick={() => toggleExpanded(index)}
                    >
                      <Building className="w-6 h-6 text-white" />
                      
                      {/* Pulse Ring */}
                      {!shouldReduceMotion && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-primary"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Experience Card */}
                    <motion.div
                      className="flex-1 bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300"
                      whileHover={shouldReduceMotion ? {} : { y: -2 }}
                    >
                      {/* Card Header - Always Visible */}
                      <div 
                        className="p-6 cursor-pointer"
                        onClick={() => toggleExpanded(index)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground mb-1">
                              {exp.role}
                            </h3>
                            <div className="flex items-center gap-4 text-muted-foreground mb-2">
                              <span className="font-medium text-primary">{exp.company}</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {exp.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {exp.duration}
                            </div>
                          </div>
                          
                          <motion.div
                            animate={{ 
                              rotate: expandedItems.has(index) ? 180 : 0 
                            }}
                            transition={{ duration: 0.3 }}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {expandedItems.has(index) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ 
                              duration: shouldReduceMotion ? 0.01 : 0.3,
                              ease: "easeInOut" 
                            }}
                            className="overflow-hidden border-t border-border"
                          >
                            <div className="p-6 space-y-4">
                              {/* Key Metrics */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                                  <div className="text-lg font-bold text-primary">8</div>
                                  <div className="text-xs text-muted-foreground">Team Members</div>
                                </div>
                                <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/10">
                                  <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
                                  <div className="text-lg font-bold text-accent">99.9%</div>
                                  <div className="text-xs text-muted-foreground">Availability</div>
                                </div>
                                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                                  <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                                  <div className="text-lg font-bold text-primary">60%</div>
                                  <div className="text-xs text-muted-foreground">Accuracy Boost</div>
                                </div>
                              </div>

                              {/* Achievements */}
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                  Key Achievements
                                </h4>
                                <ul className="space-y-3">
                                  {exp.achievements.map((achievement, achIndex) => (
                                    <motion.li
                                      key={achIndex}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ 
                                        delay: achIndex * 0.1,
                                        duration: shouldReduceMotion ? 0.01 : 0.3
                                      }}
                                      className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                                    >
                                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                                      {achievement}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}