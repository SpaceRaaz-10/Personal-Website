'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import Manifesto from './components/Manifesto';
import FooterCTA from './components/FooterCTA';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

const PERSON_MASK_URL = '/person2.png'; 
const SOLID_TEXT_COLOR = '#FACC15'; 
const OUTLINE_TEXT_COLOR = '#FACC15'; 

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });

  const photoScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.2]);
  const photoOpacity = useTransform(scrollYProgress, [0.5, 0.85], [1, 0]);
  const leftTextX = useTransform(scrollYProgress, [0, 0.6], ['0%', '-40%']);
  const rightTextX = useTransform(scrollYProgress, [0, 0.6], ['0%', '40%']);
  const topBottomOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const typeOpacity = useTransform(scrollYProgress, [0.4, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: SF }}>
      <Navbar />

      {/* HERO */}
      <section ref={heroRef} data-nav-theme="dark" className="relative h-[200vh] md:h-[250vh] bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

          <motion.div
            style={{ opacity: topBottomOpacity, fontFamily: SF }}
            className="absolute top-20 md:top-24 left-5 right-5 md:left-12 md:right-12 z-30 flex justify-between items-center text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.3em] text-white/60"
          >
            <span className="border border-white/30 rounded-full px-3 py-1 md:px-4 md:py-1.5">RWYR25</span>
            <span className="hidden md:block">Portfolio · Vol. 01</span>
            <span>★ 2024 — 2025</span>
          </motion.div>

          <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            
            <div className="absolute inset-0 flex flex-col items-center justify-center px-2 md:px-4">
              <motion.h1
                style={{ x: leftTextX, opacity: typeOpacity, fontFamily: SYNE, letterSpacing: '-0.05em', color: SOLID_TEXT_COLOR }}
                className="font-black leading-[0.85] text-[24vw] md:text-[15vw] self-start -ml-[1vw] md:-ml-[2vw]"
              >
                RAJ
              </motion.h1>
              <motion.h1
                style={{ x: rightTextX, opacity: typeOpacity, fontFamily: SYNE, letterSpacing: '-0.05em', color: SOLID_TEXT_COLOR }}
                className="font-black leading-[0.85] text-[24vw] md:text-[15vw] self-end -mr-[1vw] md:-mr-[2vw] -mt-[1vw] md:-mt-[2vw]"
              >
                SIGDEL
              </motion.h1>
            </div>

            <motion.div
              style={{ scale: photoScale, opacity: photoOpacity }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <img
                src={PERSON_MASK_URL}
                alt="Raj Sigdel"
                className="h-[75%] md:h-full w-auto object-contain pointer-events-none"
              />
            </motion.div>

            <div 
              className="absolute inset-0 flex flex-col items-center justify-center z-20 px-2 md:px-4"
              style={{
                WebkitMaskImage: `url(${PERSON_MASK_URL})`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url(${PERSON_MASK_URL})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            >
              <motion.h1
                style={{ x: leftTextX, opacity: typeOpacity, fontFamily: SYNE, letterSpacing: '-0.05em', WebkitTextStroke: '1.5px ' + OUTLINE_TEXT_COLOR }}
                className="text-transparent font-black leading-[0.85] text-[24vw] md:text-[15vw] self-start -ml-[1vw] md:-ml-[2vw]"
              >
                RAJ
              </motion.h1>
              <motion.h1
                style={{ x: rightTextX, opacity: typeOpacity, fontFamily: SYNE, letterSpacing: '-0.05em', WebkitTextStroke: '1.5px ' + OUTLINE_TEXT_COLOR }}
                className="text-transparent font-black leading-[0.85] text-[24vw] md:text-[15vw] self-end -mr-[1vw] md:-mr-[2vw] -mt-[1vw] md:-mt-[2vw]"
              >
                SIGDEL
              </motion.h1>
            </div>
          </div>

          <motion.div
            style={{ opacity: topBottomOpacity }}
            className="absolute bottom-5 md:bottom-8 left-5 right-5 md:left-12 md:right-12 z-30 flex justify-between items-end gap-3 md:gap-6"
          >
            <div className="flex items-center gap-2 md:gap-4">
              <svg width="50" height="20" viewBox="0 0 80 32" className="md:w-20 md:h-8" xmlns="http://www.w3.org/2000/svg">
                <g fill="#ffffff">
                  <rect x="0" y="0" width="2" height="32" />
                  <rect x="4" y="0" width="1" height="32" />
                  <rect x="7" y="0" width="3" height="32" />
                  <rect x="12" y="0" width="1" height="32" />
                  <rect x="15" y="0" width="2" height="32" />
                  <rect x="19" y="0" width="4" height="32" />
                  <rect x="25" y="0" width="1" height="32" />
                  <rect x="28" y="0" width="2" height="32" />
                  <rect x="32" y="0" width="3" height="32" />
                  <rect x="37" y="0" width="1" height="32" />
                  <rect x="40" y="0" width="2" height="32" />
                  <rect x="44" y="0" width="1" height="32" />
                  <rect x="47" y="0" width="3" height="32" />
                  <rect x="52" y="0" width="2" height="32" />
                  <rect x="56" y="0" width="1" height="32" />
                  <rect x="59" y="0" width="4" height="32" />
                  <rect x="65" y="0" width="1" height="32" />
                  <rect x="68" y="0" width="2" height="32" />
                  <rect x="72" y="0" width="3" height="32" />
                  <rect x="77" y="0" width="1" height="32" />
                </g>
              </svg>
              <div className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.3em] text-white/50 leading-tight" style={{ fontFamily: SF }}>
                Limited<br />Edition
              </div>
            </div>

            <div className="hidden md:block text-center max-w-md text-[11px] uppercase tracking-[0.25em] text-white/40 leading-relaxed" style={{ fontFamily: SF }}>
              Striped of color, nothing is hidden.<br />
              Only form, attitude, and presence remain.
            </div>

            <div className="text-right">
              <div className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.3em] text-white/50 leading-tight" style={{ fontFamily: SF }}>
                Issue<br />01 · 25
              </div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: topBottomOpacity }} className="absolute left-12 top-1/2 -translate-y-1/2 z-30 hidden md:block">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 leading-loose" style={{ fontFamily: SF }}>
              UX/UI<br />Designer<br /><span className="text-white/30">· QA Mindset ·</span>
            </div>
          </motion.div>

          <motion.div style={{ opacity: topBottomOpacity }} className="absolute right-12 top-1/2 -translate-y-1/2 z-30 hidden md:block">
            <Link href="/work" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white hover:text-white/60 transition-colors border-b border-white/30 hover:border-white pb-2" style={{ fontFamily: SF }}>
              View Work →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO */}
      <Manifesto />

      <FooterCTA 
        line1="Let's build" 
        line2="something." 
        line2Gradient="something." 
        subtitle="Currently open to freelance projects and full-time UX/UI opportunities worldwide." 
        email="rajsigdel1000@gmail.com" 
        emailLabel="Reach me on mail" 
        ctaLabel="Get In Touch →" 
        ctaHref="/contact" 
      />
    </main>
  );
}