import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const LOADING_DURATION = 2100; // 2.1 seconds - within 1.8-2.4s requirement

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  const letters = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow fade out animation
    }, LOADING_DURATION);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const letterVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 100 + (i * 20), // Varied positions
      x: (i % 2 === 0 ? 50 : -50) + (i * 10), // Alternating sides
      z: i * 10, // Depth variation
      rotateY: i % 2 === 0 ? 45 : -45,
      scale: 0.5,
      filter: 'blur(10px)',
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      z: 0,
      rotateY: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
        delay: i * 0.15, // Staggered entrance
        duration: 0.8,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1] as const,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Ambient Background Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
            variants={glowVariants}
            animate="animate"
          />
          
          {/* Loading Text */}
          <div className="relative flex items-center justify-center space-x-2 md:space-x-4">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="text-6xl md:text-8xl lg:text-9xl font-bold bg-hero-gradient bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 30px hsl(var(--glow-emerald))',
                  perspective: '1000px',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtle Progress Indicator */}
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-hero-gradient rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: LOADING_DURATION / 1000,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}