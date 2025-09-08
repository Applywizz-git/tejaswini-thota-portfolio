import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Loader } from 'lucide-react';
import { personalInfo, contact } from '@/data/content';
import { submitContactForm, ContactFormData } from '@/lib/email';
import { useReducedMotion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0.01 : 0.5 } },
  };

  return (
   <section id="contact" className="py-20 relative overflow-hidden scroll-mt-[88px] md:scroll-mt-[96px]">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {contact.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {contact.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-muted-foreground hover:text-primary">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Phone</div>
                  <a href={`tel:${personalInfo.phone}`} className="text-muted-foreground hover:text-primary">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Location</div>
                  <div className="text-muted-foreground">{personalInfo.location}</div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-4 bg-card border border-border rounded-lg focus:border-primary focus:outline-none transition-colors peer placeholder-transparent"
                      placeholder="Your Name"
                      required
                    />
                    <label className="absolute left-4 -top-2.5 bg-card px-2 text-sm text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">
                      Your Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 bg-card border border-border rounded-lg focus:border-primary focus:outline-none transition-colors peer placeholder-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                    <label className="absolute left-4 -top-2.5 bg-card px-2 text-sm text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full p-4 bg-card border border-border rounded-lg focus:border-primary focus:outline-none transition-colors peer placeholder-transparent resize-none"
                      placeholder="Your message..."
                      required
                    />
                    <label className="absolute left-4 -top-2.5 bg-card px-2 text-sm text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">
                      Your Message
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                    {error}
                  </div>
                )}

                {isSuccess && (
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-hero-gradient text-white font-semibold rounded-lg hover:shadow-glow-emerald disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {contact.cta}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
