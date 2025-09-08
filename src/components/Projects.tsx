import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Eye, EyeOff } from 'lucide-react';
import { projects } from '@/data/content';
import { useReducedMotion } from 'framer-motion';

export default function Projects() {
  const [showPlaceholders, setShowPlaceholders] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const shouldReduceMotion = useReducedMotion();



  const visibleProjects = showPlaceholders ? projects : projects.filter(p => !p.hidden);

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
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -8,
      rotateX: 5,
      rotateY: 5,
      scale: 1.02,
      boxShadow: "0 20px 40px -12px hsl(var(--primary) / 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="projects" className="py-1 relative overflow-hidden scroll-mt-[88px] md:scroll-mt-[96px]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/4 w-44 h-44 bg-primary rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-accent rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Featured <span className="bg-hero-gradient bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Showcase of BI solutions, data pipelines, and analytics dashboards that drive business value.
            </p>

       </motion.div>

          {/* Projects Grid */}
          {visibleProjects.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${index}`}
                  variants={cardVariants}
                  whileHover={shouldReduceMotion ? {} : "hover"}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 relative"
                  style={{ perspective: '1000px' }}
                >
                  <motion.div variants={hoverVariants} className="relative">
                    {/* Project Image Placeholder */}
                    {/* Project Preview (image only) */}
                    <div className="aspect-video border-b border-border overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>


                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {project.shortDesc}
                      </p>

                      {/* Tech Stack */}
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded border border-primary/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Impact Metric */}
                      {project.impactMetric && (
                        <div className="mb-4 p-3 bg-accent/5 rounded-lg border border-accent/10">
                          <div className="text-sm text-accent font-medium">Impact</div>
                          <div className="text-sm text-muted-foreground">{project.impactMetric}</div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {project.linkDemo && (
                          <motion.a
                            href={project.linkDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Demo
                          </motion.a>
                        )}
                        
                        {project.linkCode && (
                          <motion.a
                            href={project.linkCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* 3D Hover Glare Effect */}
                    {!shouldReduceMotion && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={cardVariants} className="text-center py-16">
              <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <ExternalLink className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Projects Coming Soon
              </h3>
              <p className="text-muted-foreground mb-4">
                Detailed project showcases are being prepared. Click "Show Placeholders" to see the planned structure.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}