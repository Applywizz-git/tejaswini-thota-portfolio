import { motion } from 'framer-motion';
import { ArrowDown, Mail, MapPin, Linkedin, Twitter, FileText } from 'lucide-react';
import { personalInfo } from '@/data/content';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';

export default function Hero() {
  const prefersReducedMotion = useReducedMotionPref();

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
      y: prefersReducedMotion ? 0 : 50,
      filter: prefersReducedMotion ? 'none' : 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const socialLinks = [
    { icon: Linkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
    
    { 
    icon: Mail, 
    href: `mailto:${personalInfo.email}`,  // replace with your email field or hardcode it
    label: 'Email', 
    disabled: personalInfo.email === 'TBD' 
  },
  ];

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 scroll-mt-[88px]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8">
            
            {/* Main Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold"
            >
              <span className="block text-foreground mb-2">Hi, I'm</span>
              <span className="block bg-hero-gradient bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </motion.h1>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium"
            >
              {personalInfo.title}
            </motion.h2>

            {/* Location */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground"
            >
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 bg-hero-gradient text-white font-semibold rounded-lg shadow-glow-emerald hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="w-5 h-5" />
                Resume
              </motion.a>
              
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start gap-6"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.disabled ? undefined : social.href}
                  target={social.disabled ? undefined : "_blank"}
                  rel={social.disabled ? undefined : "noopener noreferrer"}
                  className={`p-3 rounded-lg border border-border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    social.disabled 
                      ? 'opacity-50 cursor-not-allowed bg-muted' 
                      : 'hover:border-primary/50 hover:bg-primary/10 hover:shadow-glow-emerald'
                  }`}
                  whileHover={social.disabled ? {} : { scale: 1.1, y: -2 }}
                  whileTap={social.disabled ? {} : { scale: 0.95 }}
                  aria-label={social.disabled ? `${social.label} (Coming Soon)` : social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Profile Image */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center lg:justify-end order-first lg:order-last"
          >
            <motion.div
              className="relative"
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-glow-emerald">
                <img
                  src={personalInfo.profileImage}
                  // alt={`${personalInfo.name} - Business Intelligence Analyst`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=400&h=400&fit=crop&crop=face';
                  }}
                />
              </div>
              
              {/* Floating Glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/10"
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.button
            onClick={scrollToNext}
            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to next section"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}