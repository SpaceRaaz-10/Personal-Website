'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import SpaceButton from './SpaceButton';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-5 md:p-8 mix-blend-difference text-white pointer-events-none">
        {/* Logo — auto-scales on mobile */}
        <div className="pointer-events-auto">
          <Logo />
        </div>

        {/* Desktop Nav links */}
        <div
          className="hidden md:flex gap-12 text-sm font-medium pointer-events-auto"
          style={{ fontFamily: SF }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop spacer to balance the layout */}
        <div className="hidden md:block w-[120px] pointer-events-none" />

        {/* Mobile spacer — leaves room for the hamburger + Let's Talk button */}
        <div className="md:hidden w-[110px] pointer-events-none" />
      </nav>

      {/* Desktop "Let's Talk" button */}
      <div className="hidden md:block fixed top-0 right-0 p-6 md:p-8 z-[51] pointer-events-auto">
        <SpaceButton>Let's Talk</SpaceButton>
      </div>

      {/* Mobile top-right actions: Let's Talk (compact) + Hamburger */}
      <div className="md:hidden fixed top-0 right-0 p-5 z-[51] pointer-events-auto flex items-center gap-3">
        {/* Compact Let's Talk — hidden when menu is open */}
        <AnimatePresence>
          {!menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-black border border-white px-4 py-2 rounded-full text-[11px] font-medium tracking-wide"
                style={{ fontFamily: SF }}
              >
                Let's Talk
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="relative w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-95 transition-transform duration-200"
        >
          <span className="relative w-5 h-4 flex flex-col justify-between">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-full h-[2px] bg-black origin-center rounded-full"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-full h-[2px] bg-black rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-full h-[2px] bg-black origin-center rounded-full"
            />
          </span>
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-[100] bg-black text-white"
          >
            {/* Top bar within menu (logo + close) */}
            <div className="flex justify-between items-center p-5">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-95 transition-transform duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu links */}
            <div className="flex flex-col justify-center items-start px-6 pt-12 h-[calc(100%-80px)]">
              <nav className="flex flex-col w-full">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-6 text-5xl font-extrabold tracking-tight text-white hover:text-white/60 transition-colors"
                      style={{ fontFamily: SYNE }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom info inside menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-auto mb-8 w-full"
              >
                <div className="flex flex-col gap-2">
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase text-white/40"
                    style={{ fontFamily: SF }}
                  >
                    Get in touch
                  </span>
                  <a
                    href="mailto:rajsigdel1000@gmail.com"
                    className="text-base text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: SF }}
                  >
                    rajsigdel1000@gmail.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}