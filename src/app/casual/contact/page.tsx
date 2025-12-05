'use client';

import { motion } from 'framer-motion';
import { Mail, MessageCircle, Instagram, Send } from 'lucide-react';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const contactMethods = [
  {
    icon: MessageCircle,
    name: 'WhatsApp',
    value: 'Chat with me',
    href: 'https://wa.me/917200672127',
    color: 'hover:bg-green-50',
  },
  {
    icon: Instagram,
    name: 'Instagram',
    value: '@ryzenate',
    href: 'https://instagram.com/ryzenate',
    color: 'hover:bg-pink-50',
  },
  {
    icon: Mail,
    name: 'Email',
    value: 'hello@ryzen.studio',
    href: 'mailto:hello@ryzen.studio',
    color: 'hover:bg-blue-50',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="casual-theme">
      {/* Hero */}
      <section className="casual-section">
        <div className="casual-container">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[var(--cream-200)] flex items-center justify-center mx-auto">
                <Mail className="text-[var(--text-700)]" size={28} />
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="casual-heading-1 font-serif">
              Get in Touch
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="casual-paragraph">
              Whether you want to say hello, share thoughts, or just have a conversation—
              I&apos;d love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="casual-section-sm bg-[var(--paper)]">
        <div className="casual-container">
          <motion.div 
            className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className={`casual-card text-center transition-colors ${method.color}`}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--cream-200)] flex items-center justify-center mx-auto mb-3">
                  <method.icon className="text-[var(--text-700)]" size={24} />
                </div>
                <h3 className="font-serif font-bold text-[var(--text-900)] mb-1">
                  {method.name}
                </h3>
                <p className="casual-muted text-sm">
                  {method.value}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="casual-section">
        <div className="casual-container">
          <motion.div 
            className="max-w-xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="casual-heading-2 font-serif text-center mb-8">
              Send a Message
            </motion.h2>

            {submitted ? (
              <motion.div 
                variants={fadeInUp}
                className="casual-card text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Send className="text-green-600" size={28} />
                </div>
                <h3 className="font-serif font-bold text-xl text-[var(--text-900)] mb-2">
                  Message Sent!
                </h3>
                <p className="casual-muted">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                variants={fadeInUp}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--text-700)] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[var(--line-strong)] bg-[var(--paper)] text-[var(--text-900)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--text-700)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[var(--line-strong)] bg-[var(--paper)] text-[var(--text-900)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-700)] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--line-strong)] bg-[var(--paper)] text-[var(--text-900)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all resize-none"
                    placeholder="What's on your mind?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full casual-btn justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
