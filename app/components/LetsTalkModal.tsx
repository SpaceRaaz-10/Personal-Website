'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const WHATSAPP_NUMBER = '9779828159781';
const WHATSAPP_MSG = "Hi Raj! I'd like to discuss a project with you.";
const EMAIL = 'rajsigdel1000@gmail.com';

const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;

const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(
    navigator.userAgent
  );
};

const contacts = [
  {
    label: 'Email',
    href: isMobileDevice() ? `mailto:${EMAIL}` : GMAIL_COMPOSE_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/raj-sigdel/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: SMOOTH_EASE } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: SMOOTH_EASE } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, delay: 0.15, ease: SMOOTH_EASE },
  },
  exit: {
    opacity: 0, y: -20, filter: 'blur(4px)',
    transition: { duration: 0.35, ease: SMOOTH_EASE },
  },
};

const iconVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.85, delay: 0.35 + i * 0.09, ease: SMOOTH_EASE },
  }),
  exit: (i: number) => ({
    opacity: 0, y: -20, scale: 0.85,
    transition: { duration: 0.3, delay: i * 0.05, ease: SMOOTH_EASE },
  }),
};

const closeButtonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.5, ease: SMOOTH_EASE } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.25, ease: SMOOTH_EASE } },
};

export default function LetsTalkModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center px-6 cursor-pointer"
          style={{
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          {/* Close button */}
          <motion.button
            type="button"
            variants={closeButtonVariants}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="absolute w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 active:scale-95 transition-all duration-300 cursor-pointer"
            style={{
              top: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)',
              right: '1.5rem',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Content */}
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center cursor-default">
            
            {/* ✅ Title — "Let's" in white, "Talk." in gradient */}
            <motion.h2
              variants={titleVariants}
              className="text-white text-[clamp(2.5rem,10vw,5.5rem)] font-extrabold text-center leading-none tracking-tight mb-12 md:mb-20"
              style={{ fontFamily: SYNE, willChange: 'transform, opacity, filter' }}
            >
              Let&apos;s{' '}
              <span className="gradient-text">
                Talk.
              </span>
            </motion.h2>

            {/* Icon row */}
            <div className="flex items-center justify-center gap-5 sm:gap-6 md:gap-10">
              {contacts.map((contact, i) => (
                <motion.a
                  key={contact.label}
                  custom={i}
                  variants={iconVariants}
                  href={contact.href}
                  target={contact.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={contact.label}
                  whileHover={{ scale: 1.1, y: -6 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-white text-black transition-colors duration-300 hover:bg-white/90"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {contact.icon}
                </motion.a>
              ))}
            </div>

            {/* Mobile hint */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: SMOOTH_EASE }}
              className="mt-16 md:hidden text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium"
              style={{ fontFamily: SF }}
            >
              Tap anywhere to close
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}