import { motion } from "framer-motion";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";
import { education } from "@/data/content";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const Education = () => {
  const reducedMotion = useReducedMotionPref();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: reducedMotion ? 0 : 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: reducedMotion ? 0.3 : 0.6,
      },
    },
  };

  return (
    <section 
      id="education"
      className="relative py-10 bg-gradient-to-br from-muted/20 via-background to-background scroll-mt-[88px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.accent/0.1),transparent_60%)]" />
      
      <div className="container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={containerVariants}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent"
            >
              Education
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Academic foundation building expertise in computer science and engineering
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="group relative bg-card/80 backdrop-blur-sm border border-border/40 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    <GraduationCap className="h-8 w-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {education.degree}
                    </h3>
                    <p className="text-lg font-semibold text-primary mt-1">
                      {education.school}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{education.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{education.years}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/40">
                  <p className="text-muted-foreground leading-relaxed">
                    {education.brief}
                  </p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-secondary rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;