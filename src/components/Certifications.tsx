import { motion } from "framer-motion";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";
import { certifications } from "@/data/content";
import { Award } from "lucide-react";

const Certifications = () => {
  const reducedMotion = useReducedMotionPref();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: reducedMotion ? 0 : 20,
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
      id="certifications"
      className="relative py-10 bg-gradient-to-br from-background via-background to-muted/20 scroll-mt-[88px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.primary/0.1),transparent_60%)]" />
      
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent"
            >
              Certifications
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Professional certifications demonstrating expertise in data analytics and business intelligence
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: reducedMotion ? 1 : 1.02,
                  rotateY: reducedMotion ? 0 : 5,
                }}
                className="group relative bg-card/80 backdrop-blur-sm border border-border/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ 
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {cert.issuer}
                    </p>
                    {cert.year && (
                      <p className="text-xs text-muted-foreground/80">
                        {cert.year}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;