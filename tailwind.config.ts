import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Portfolio Premium Colors
        'deep-charcoal': "hsl(var(--deep-charcoal))",
        'ink': "hsl(var(--ink))",
        'neutral-800': "hsl(var(--neutral-800))",
        'neutral-600': "hsl(var(--neutral-600))",
        
        // Glass & Glow Effects
        'glass-bg': "hsl(var(--glass-bg))",
        'glass-border': "hsl(var(--glass-border))",
        'glow-emerald': "hsl(var(--glow-emerald))",
        'glow-amber': "hsl(var(--glow-amber))",
      },
      
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, hsl(var(--hero-gradient-start)), hsl(var(--hero-gradient-end)))',
        'accent-gradient': 'linear-gradient(135deg, hsl(var(--accent-gradient-start)), hsl(var(--accent-gradient-end)))',
        'glass': 'linear-gradient(135deg, hsl(var(--glass-bg)), hsl(var(--glass-border)))',
      },
      
      boxShadow: {
        'glow-emerald': '0 0 20px hsl(var(--glow-emerald)), 0 0 40px hsl(var(--glow-emerald))',
        'glow-amber': '0 0 20px hsl(var(--glow-amber)), 0 0 40px hsl(var(--glow-amber))',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'elevation': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      
      backdropBlur: {
        'glass': '16px',
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      keyframes: {
        // Preloader Animations
        "float-in": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(100px) translateX(50px) rotateY(45deg) scale(0.5)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) translateX(0) rotateY(0deg) scale(1)" 
          }
        },
        
        // Hero Animations
        "text-reveal": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(50px) rotateX(45deg)",
            filter: "blur(10px)"
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) rotateX(0deg)",
            filter: "blur(0px)"
          }
        },
        
        "profile-float": {
          "0%, 100%": { transform: "translateY(0px) rotateY(0deg)" },
          "50%": { transform: "translateY(-10px) rotateY(2deg)" }
        },
        
        // Skills Meter Animations
        "honeycomb-fill": {
          "0%": { opacity: "0.3", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        
        "shard-illuminate": {
          "0%": { 
            opacity: "0.2", 
            transform: "translateX(-100%) skewX(-15deg)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateX(0%) skewX(-15deg)" 
          }
        },
        
        "glyph-reveal": {
          "0%": { 
            clipPath: "inset(100% 0 0 0)",
            filter: "brightness(0.5)"
          },
          "100%": { 
            clipPath: "inset(0% 0 0 0)",
            filter: "brightness(1)"
          }
        },
        
        // Interactive Animations
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" }
        },
        
        "magnetic-pull": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" }
        },
        
        "tilt-3d": {
          "0%": { transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" },
          "100%": { transform: "perspective(1000px) rotateX(5deg) rotateY(5deg)" }
        },
        
        // Background Effects
        "float-gentle": {
          "0%, 100%": { transform: "translate(0px, 0px) rotate(0deg)" },
          "33%": { transform: "translate(30px, -30px) rotate(1deg)" },
          "66%": { transform: "translate(-20px, 20px) rotate(-1deg)" }
        }
      },
      
      animation: {
        // Preloader
        "float-in": "float-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        
        // Hero
        "text-reveal": "text-reveal 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "profile-float": "profile-float 4s ease-in-out infinite",
        
        // Skills Meters
        "honeycomb-fill": "honeycomb-fill 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "shard-illuminate": "shard-illuminate 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "glyph-reveal": "glyph-reveal 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        
        // Interactive
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        "accordion-up": "accordion-up 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        "magnetic-pull": "magnetic-pull 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        "tilt-3d": "tilt-3d 0.3s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        
        // Background
        "float-gentle": "float-gentle 20s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
