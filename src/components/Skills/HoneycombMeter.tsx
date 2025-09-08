import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

interface HoneycombMeterProps {
  skill: string;
  percentage: string;
  delay?: number;
}

export default function HoneycombMeter({ skill, percentage, delay = 0 }: HoneycombMeterProps) {
  const [showPercentage, setShowPercentage] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  // Mock percentage for display (since actual percentages are "PERCENT_TBD")
  const displayPercentage = percentage === "PERCENT_TBD" ? Math.floor(Math.random() * 30) + 70 : parseInt(percentage);
  
  // Generate hexagon cells (7x4 grid for honeycomb pattern)
  const generateHexCells = () => {
    const cells = [];
    const rows = 4;
    const cols = 7;
    const totalCells = rows * cols;
    const filledCells = Math.floor((displayPercentage / 100) * totalCells);
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        const isFilled = index < filledCells;
        const xOffset = row % 2 === 1 ? 15 : 0; // Offset alternate rows for honeycomb pattern
        
        cells.push({
          id: index,
          x: col * 30 + xOffset,
          y: row * 26,
          filled: isFilled,
          delay: shouldReduceMotion ? 0 : (index * 0.02)
        });
      }
    }
    
    return cells;
  };

  const hexCells = generateHexCells();

  const cellVariants = {
    hidden: { 
      opacity: 0.3, 
      scale: 0.8,
      fill: 'hsl(var(--muted))'
    },
    visible: (isFilled: boolean) => ({
      opacity: isFilled ? 1 : 0.3,
      scale: isFilled ? 1 : 0.8,
      fill: isFilled ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.4,
        ease: "easeOut" as const,
      },
    }),
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

      {/* Honeycomb Grid */}
      <div className="relative mb-4">
        <svg 
          width="210" 
          height="120" 
          viewBox="0 0 210 120" 
          className="overflow-visible"
        >
          {hexCells.map((cell) => (
            <motion.polygon
              key={cell.id}
              custom={cell.filled}
              variants={cellVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: delay + cell.delay }}
              className="stroke-border stroke-1"
              points={`
                ${cell.x + 10},${cell.y + 5} 
                ${cell.x + 20},${cell.y + 5} 
                ${cell.x + 25},${cell.y + 13} 
                ${cell.x + 20},${cell.y + 21} 
                ${cell.x + 10},${cell.y + 21} 
                ${cell.x + 5},${cell.y + 13}
              `}
            />
          ))}
        </svg>

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