import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import ThemeToggle from './ThemeToggle';

const navigation = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [headerH, setHeaderH] = useState(80);
  const scrollDirection = useScrollDirection();
  const headerRef = useRef<HTMLElement>(null);

  // measure header height (offset)
  useEffect(() => {
    const measure = () => setHeaderH(Math.round(headerRef.current?.getBoundingClientRect().height ?? 80));
    measure();
    const ro = new ResizeObserver(measure);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // lock body when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // active section tracking
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const sections = navigation.map((i) => i.href.slice(1));
      const topThreshold = headerH + 20;
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= topThreshold && r.bottom >= topThreshold;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [headerH]);

  // smooth scroll with header offset
  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 8);
      window.scrollTo({ top: y, behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    }
    setIsOpen(false);
  };

  // handle hash on load / change
  useEffect(() => {
    const jump = () => {
      if (location.hash) {
        const id = location.hash.slice(1);
        setTimeout(() => smoothScrollTo(id), 0);
      }
    };
    jump();
    const onHash = (e: HashChangeEvent) => {
      e.preventDefault();
      jump();
    };
    window.addEventListener('hashchange', onHash as any);
    return () => window.removeEventListener('hashchange', onHash as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerH]);

  const headerVariants = {
    visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
    hidden: { y: -100, opacity: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  };

  const menuVariants = {
    closed: { opacity: 0, x: '100%', transition: { duration: 0.3, ease: 'easeOut' as const } },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' as const, staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };
  const itemVariants = { closed: { opacity: 0, x: 16 }, open: { opacity: 1, x: 0 } };

  return (
    <>
      <motion.header
        ref={headerRef}
        variants={headerVariants}
        animate={scrollDirection === 'down' && scrollY > 100 ? 'hidden' : 'visible'}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrollY > 10
            ? 'bg-background/80 backdrop-blur-glass border-b border-border/50 shadow-elevation'
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* logo */}
            <motion.div className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button onClick={() => smoothScrollTo('hero')} className="focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-1">
                TT
              </button>
            </motion.div>

            {/* desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => smoothScrollTo(item.href.slice(1))}
                  className={`relative px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg ${
                    activeSection === item.href.slice(1) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" layoutId="activeIndicator" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                  )}
                </motion.button>
              ))}
              <ThemeToggle />
            </div>

            {/* mobile button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsOpen((v) => !v)}
                className="p-2 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* PORTAL: backdrop + drawer live at document.body so they always blur correctly */}
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop: always covers viewport, strong blur */}
                <motion.div
                  className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-lg supports-[backdrop-filter:blur(0)]:bg-black/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                />

                {/* Drawer: starts below header height */}
                <motion.aside
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="fixed right-0 z-[999] h-[calc(100vh)] w-80 bg-card border-l border-border shadow-2xl md:hidden overflow-y-auto"
                  style={{ top: headerH }}
                >
                  <div className="p-6">
                    <motion.div variants={{ open: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }} className="space-y-4">
                      {navigation.map((item) => (
                        <motion.button
                          key={item.name}
                          variants={itemVariants}
                          onClick={() => smoothScrollTo(item.href.slice(1))}
                          className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            activeSection === item.href.slice(1)
                              ? 'text-primary bg-primary/10'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
