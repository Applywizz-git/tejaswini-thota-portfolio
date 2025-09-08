import { motion } from 'framer-motion';
import { Heart, Linkedin, Mail} from 'lucide-react';
import { personalInfo } from '@/data/content';

export default function Footer() {
  const socialLinks = [
    { icon: Linkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
{ 
    icon: Mail, 
    href: `mailto:${personalInfo.email}`,  // replace with your email field or hardcode it
    label: 'Email', 
    disabled: personalInfo.email === 'TBD' 
  },
  ];

  return (
    <footer className="py-12 border-t border-border bg-card/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Built with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-destructive fill-current" />
            </motion.div>
            <span>using React, Tailwind & Framer Motion</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.disabled ? undefined : social.href}
                target={social.disabled ? undefined : "_blank"}
                rel={social.disabled ? undefined : "noopener noreferrer"}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  social.disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-primary/10 hover:text-primary hover:scale-110'
                }`}
                whileHover={social.disabled ? {} : { y: -2 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2024 {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}