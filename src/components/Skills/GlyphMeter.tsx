import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Database, Code, TrendingUp, Cloud, Server, Activity } from 'lucide-react';

interface GlyphMeterProps {
  skill: string;
  percentage: string;
  delay?: number;
}

// Map skills to appropriate icons
const skillIcons = {
  'Tableau': TrendingUp,
  'Power BI': TrendingUp,
  'SSRS': TrendingUp,
  'Advanced Excel': TrendingUp,
  'Python': Code,
  'SQL': Database,
  'PySpark': Code,
  'Shell/PowerShell': Code,
  'Snowflake': Database,
  'Oracle': Database,
  'SQL Server': Database,
  'MongoDB': Database,
  'ETL/DWH': Database,
  'Data Governance': Database,
  'AWS': Cloud,
  'Docker': Server,
  'Kubernetes': Server,
  'Jenkins': Server,
  'Terraform': Server,
  'ServiceNow': Activity,
  'Splunk': Activity,
  'Prometheus': Activity,
  'Grafana': Activity,
  'ELK Stack': Activity,
  'Agile-Scrum': Activity,
  'ITIL': Activity,
  'HP ALM': Activity,
  'LoadRunner': Activity,
};

export default function GlyphMeter({ skill, percentage, delay = 0 }: GlyphMeterProps) {
  const [showPercentage, setShowPercentage] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  // Mock percentage for display (since actual percentages are "PERCENT_TBD")
  const displayPercentage = percentage === "PERCENT_TBD" ? Math.floor(Math.random() * 30) + 70 : parseInt(percentage);
  
  // Get appropriate icon for skill
  const IconComponent = skillIcons[skill as keyof typeof skillIcons] || Code;

  const glyphVariants = {
    hidden: { 
      clipPath: "inset(100% 0 0 0)",
      filter: "brightness(0.5)",
      scale: 0.8,
    },
    visible: { 
      clipPath: "inset(0% 0 0 0)",
      filter: "brightness(1)",
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.3,
      },
    },
  };

  const progressVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: displayPercentage / 100,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 1,
        ease: "easeOut" as const,
        delay: delay + 0.2,
      },
    },
  };

  return (
    <div 
      className="flex flex-col items-center p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
      onMouseEnter={() => setShowPercentage(true)}
      onMouseLeave={() => setShowPercentage(false)}
      onFocus={() => setShowPercentage(true)}
      onBlur={() => setShowPercentage(false)}
      tabIndex={0}
      role="progressbar"
      aria-valuenow={displayPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${skill} skill level: ${displayPercentage}%`}
    >
      {/* Skill Name */}
      <h3 className="text-sm font-medium text-foreground mb-4 text-center">
        {skill}
      </h3>

      {/* Glyph Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative w-24 h-24 mb-4"
      >
        {/* Background Circle */}
        <div className="absolute inset-0 rounded-full bg-muted/30 border-2 border-muted" />
        
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="4"
            className="opacity-30"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="283" // 2 * π * 45
            initial={{ strokeDashoffset: 283 }}
            whileInView={{ strokeDashoffset: 283 - (283 * displayPercentage) / 100 }}
            viewport={{ once: true }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 1.2,
              delay: delay,
              ease: "easeOut",
            }}
            className="drop-shadow-sm"
          />
        </svg>

        {/* Skill Icon/Glyph */}
        <motion.div
          variants={glyphVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <IconComponent className="w-8 h-8 text-primary" />
            
            {/* Revealing Mask Effect */}
            <motion.div
              className="absolute inset-0 bg-card"
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.6,
                delay: delay + 0.4,
                ease: "easeOut",
              }}
              style={{ transformOrigin: 'bottom' }}
            />
          </div>
        </motion.div>

        {/* Percentage Overlay */}
        {showPercentage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1 border border-primary/30">
              <span className="text-sm font-bold text-primary">
                {displayPercentage}%
              </span>
            </div>
          </motion.div>
        )}

        {/* Glow Effect */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {/* Progress Bar Backup (for accessibility) */}
      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${displayPercentage}%` }}
          viewport={{ once: true }}
          transition={{ 
            duration: shouldReduceMotion ? 0.01 : 1, 
            delay: delay,
            ease: "easeOut" 
          }}
        />
      </div>
    </div>
  );
}