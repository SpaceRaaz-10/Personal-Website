'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SpaceButton from '../components/SpaceButton';
import Navbar from '../components/Navbar';
import StaggeredText from '../components/StaggeredText';
import FooterCTA from '../components/FooterCTA';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

const socials = [
  {
    label: 'Email',
    href: 'mailto:rajsigdel1000@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/raj-sigdel/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v13H.22V8zm7.5 0h4.37v1.78h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V21h-4.56v-5.79c0-1.38-.03-3.16-1.93-3.16-1.93 0-2.23 1.51-2.23 3.06V21H7.72V8z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/SpaceRaaz-10',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 .3a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0012 .3z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/raj_sigdell',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.9 2H22l-7.02 8.02L23 22h-6.7l-4.6-6.04L6.2 22H3l7.5-8.6L2 2h6.85l4.16 5.5L18.9 2zm-1.18 18h1.72L7.35 3.9H5.5l12.22 16.1z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/raj_sigdelll/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/raj.sigdelll',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <main data-nav-theme="light" className="min-h-screen bg-white text-black" style={{ fontFamily: SF }}>
                  <Navbar />

      <section className="pt-48 pb-16 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-black/40 uppercase mb-6" style={{ fontFamily: SF }}>Contact</p>
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-extrabold leading-[0.85] text-black" style={{ fontFamily: SYNE, letterSpacing: '-0.03em' }}>
            <StaggeredText text="Let's talk" />
            <br />
            <StaggeredText text="ideas." gradientWords={[0]} startIndex={2} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-8 text-xl md:text-2xl font-light text-black/60 max-w-2xl" style={{ fontFamily: SF }}>
            Have a project in mind? Want to collaborate? Fill out the form or reach me directly.
          </motion.p>
        </div>
      </section>

      <section className="px-8 md:px-24 py-16 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs font-bold tracking-widest text-black/40 uppercase mb-3" style={{ fontFamily: SF }}>Your Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-3 text-2xl font-light text-black placeholder-black/20 transition-colors duration-300" style={{ fontFamily: SF }} />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest text-black/40 uppercase mb-3" style={{ fontFamily: SF }}>Your Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-3 text-2xl font-light text-black placeholder-black/20 transition-colors duration-300" style={{ fontFamily: SF }} />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest text-black/40 uppercase mb-3" style={{ fontFamily: SF }}>Project Details</label>
                <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell me about your project..." rows={5} className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-3 text-2xl font-light text-black placeholder-black/20 transition-colors duration-300 resize-none" style={{ fontFamily: SF }} />
              </div>
              <div className="pt-4">
                <button type="submit" disabled={status !== 'idle'} className="bg-black text-white border border-black hover:bg-white hover:text-black transition-colors duration-300 px-10 py-5 rounded-full font-medium text-base cursor-pointer shadow-xl disabled:opacity-60 disabled:cursor-wait" style={{ fontFamily: SF }}>
                  {status === 'idle' && 'Send Message →'}
                  {status === 'sending' && 'Sending...'}
                  {status === 'sent' && '✓ Message Sent'}
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="md:col-span-2 space-y-12">
            <div className="bg-[#F5F5F7] rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-black" style={{ fontFamily: SF }}>Available for work</span>
              </div>
              <p className="text-black/60 font-light leading-relaxed" style={{ fontFamily: SF }}>Currently taking on new freelance projects and open to full-time opportunities in UX/UI design.</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-8" style={{ fontFamily: SYNE }}>Or reach me directly.</h3>
                            <div className="flex flex-wrap gap-4">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="w-14 h-14 rounded-2xl border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-300 shadow-sm"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterCTA line1="Based in Nepal." line2="Available worldwide." line2Gradient="worldwide." subtitle="Working with clients across every time zone. Let's create something extraordinary together." email="rajsigdel1000@gmail.com" />
    </main>
  );
}