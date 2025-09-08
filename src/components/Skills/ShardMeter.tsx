import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

interface ShardMeterProps {
  skill: string;
  percentage: string;
  delay?: number;
}

export default function ShardMeter({ skill, percentage, delay = 0 }: ShardMeterProps) {
  const [showPercentage, setShowPercentage] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  // Mock percentage for display (since actual percentages are "PERCENT_TBD")
  const displayPercentage = percentage === "PERCENT_TBD" ? Math.floor(Math.random() * 30) + 70 : parseInt(percentage);
  
  // Generate angled shards
  const generateShards = () => {
    const shards = [];
    const shardCount = 10;
    const filledShards = Math.floor((displayPercentage / 100) * shardCount);
    
    for (let i = 0; i < shardCount; i++) {
      shards.push({
        id: i,
        filled: i < filledShards,
        delay: shouldReduceMotion ? 0 : (i * 0.1)
      });
    }
    
    return shards;
  };

  const shards = generateShards();

  const shardVariants = {
    hidden: { 
      opacity: 0.2, 
      x: -100,
      skewX: -15,
    },
    visible: (isFilled: boolean) => ({
      opacity: isFilled ? 1 : 0.2,
      x: 0,
      skewX: -15,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  const glowVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
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

      {/* Shard Container */}
      <div className="relative w-48 h-16 mb-4 overflow-hidden rounded-lg bg-muted/30">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/50 to-transparent opacity-50" />
        
        {/* Shards */}
        <div className="absolute inset-0 flex items-center">
          {shards.map((shard) => (
            <motion.div
              key={shard.id}
              custom={shard.filled}
              variants={shardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: delay + shard.delay }}
              className={`h-12 flex-1 mx-0.5 relative overflow-hidden ${
                shard.filled ? 'bg-primary' : 'bg-muted'
              }`}
              style={{
                clipPath: 'polygon(0 0, 80% 0, 100% 100%, 20% 100%)', // Angled shard shape
              }}
            >
              {/* Glow Effect for Filled Shards */}
              {shard.filled && !shouldReduceMotion && (
                <motion.div
                  variants={glowVariants}
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{
                    clipPath: 'polygon(0 0, 80% 0, 100% 100%, 20% 100%)',
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Illumination Wave Effect */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            initial={{ x: '-100%' }}
            whileInView={{ x: '100%' }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.5, 
              delay: delay + 0.5,
              ease: "easeInOut" 
            }}
            style={{
              clipPath: 'polygon(0 0, 80% 0, 100% 100%, 20% 100%)',
            }}
          />
        )}

        {/* Percentage Overlay */}
        {showPercentage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1 border border-primary/30">
              <span className="text-lg font-bold text-primary">
                {displayPercentage}%
              </span>
            </div>
          </motion.div>
        )}
      </div>

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