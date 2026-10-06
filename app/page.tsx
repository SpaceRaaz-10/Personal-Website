'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import StaggeredText from './components/StaggeredText';
import StackedProjects, { Project } from './components/StackedProjects';
import FooterCTA from './components/FooterCTA';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

// Your uploaded transparent PNG
const PERSON_MASK_URL = '/person2.png'; 

// ⚠️ YELLOW COLOR SETTINGS ⚠️
// Premium yellow (change to '#FFFF00' for pure neon yellow)
const SOLID_TEXT_COLOR = '#FACC15'; 
const OUTLINE_TEXT_COLOR = '#FACC15'; 

const featuredProjects: Project[] = [
  { id: 1, title: 'Trekking Website', category: 'Website Design', year: '2024', description: 'A clean, user-friendly trekking platform focused on clear navigation, immersive visuals, and effortless trip discovery.', primaryImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1600&auto=format&fit=crop', secondaryImage: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Real Estate Dashboard', category: 'Backend Dashboard', year: '2024', description: 'A real estate admin dashboard built for effortless property management.', primaryImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop', secondaryImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Mountain Information', category: 'Website Design', year: '2024', description: 'A modern platform highlighting Nepal mountains with rich visuals.', primaryImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop', secondaryImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Juicy Smoothie', category: 'Website Design', year: '2023', description: 'A vibrant, appetite-driven website for a smoothie brand with bold type and product-first visuals.', primaryImage: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=1600&auto=format&fit=crop', secondaryImage: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop' },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });

  // Scroll animations
  const photoScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.2]);
  const photoOpacity = useTransform(scrollYProgress, [0.5, 0.85], [1, 0]);
  const leftTextX = useTransform(scrollYProgress, [0, 0.6], ['0%', '-40%']);
  const rightTextX = useTransform(scrollYProgress, [0, 0.6], ['0%', '40%']);
  const topBottomOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const typeOpacity = useTransform(scrollYProgress, [0.4, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: SF }}>
      <Navbar />

      {/* MAGAZINE HERO */}
      <section ref={heroRef} data-nav-theme="dark" className="relative h-[250vh] bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

          {/* Top metadata bar */}
          <motion.div
            style={{ opacity: topBottomOpacity, fontFamily: SF }}
            className="absolute top-24 left-6 right-6 md:left-12 md:right-12 z-30 flex justify-between items-center text-[11px] uppercase tracking-[0.3em] text-white/60"
          >
            <span className="border border-white/30 rounded-full px-4 py-1.5">RWYR25</span>
            <span className="hidden md:block">Portfolio · Vol. 01</span>
            <span>★ 2024 — 2025</span>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />

          {/* MAGAZINE TEXT EFFECT */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
            
            {/* LAYER 1: Solid Text (Behind) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.h1
                style={{ x: leftTextX, opacity: typeOpacity, fontFamily: SYNE, letterSpacing: '-0.05em', color: SOLID_TEXT_COLOR }}
                className="font-black leading-[0.85] text-[20vw] md:text-[15vw] self-start -ml-[2vw]"
              >
                RAJ
              </motion.h1>
              <motion.h1
                style={{ x: rightTextX, opacity: typeOpacity, fontFamily: SYNE, letterSpacing: '-0.05em', color: SOLID_TEXT_COLOR }}
                className="font-black leading-[0.85] text-[20vw] md:text-[15vw] self-end -mr-[2vw] -mt-[2vw]"
              >
                SIGDEL
              </motion.h1>
            </div>

            {/* LAYER 2: Person Cutout (Middle) */}
            <motion.div
              style={{ scale: photoScale, opacity: photoOpacity }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <img
                src={PERSON_MASK_URL}
                alt="Person"
                className="h-full w-auto object-contain pointer-events-none"
              />
            </motion.div>

            {/* LAYER 3: Masked Outline Text (Front) */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center z-20"
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
                style={{
                  x: leftTextX,
                  opacity: typeOpacity,
                  fontFamily: SYNE,
                  letterSpacing: '-0.05em',
                  WebkitTextStroke: '2px ' + OUTLINE_TEXT_COLOR,
                }}
                className="text-transparent font-black leading-[0.85] text-[20vw] md:text-[15vw] self-start -ml-[2vw]"
              >
                RAJ
              </motion.h1>
              <motion.h1
                style={{
                  x: rightTextX,
                  opacity: typeOpacity,
                  fontFamily: SYNE,
                  letterSpacing: '-0.05em',
                  WebkitTextStroke: '2px ' + OUTLINE_TEXT_COLOR,
                }}
                className="text-transparent font-black leading-[0.85] text-[20vw] md:text-[15vw] self-end -mr-[2vw] -mt-[2vw]"
              >
                SIGDEL
              </motion.h1>
            </div>

          </div>

          {/* BOTTOM METADATA */}
          <motion.div
            style={{ opacity: topBottomOpacity }}
            className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-30 flex justify-between items-end gap-6"
          >
            <div className="flex items-center gap-4">
              <svg width="80" height="32" viewBox="0 0 80 32" xmlns="http://www.w3.org/2000/svg">
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
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/50" style={{ fontFamily: SF }}>
                Limited<br />Edition
              </div>
            </div>

            <div className="hidden md:block text-center max-w-md text-[11px] uppercase tracking-[0.25em] text-white/40 leading-relaxed" style={{ fontFamily: SF }}>
              Striped of color, nothing is hidden.<br />
              Only form, attitude, and presence remain.
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/50" style={{ fontFamily: SF }}>
                Issue<br />01 · 25
              </div>
            </div>
          </motion.div>

          {/* SIDE PILLS */}
          <motion.div style={{ opacity: topBottomOpacity }} className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 hidden md:block">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 leading-loose" style={{ fontFamily: SF }}>
              UX/UI<br />Designer<br /><span className="text-white/30">· QA Mindset ·</span>
            </div>
          </motion.div>

          <motion.div style={{ opacity: topBottomOpacity }} className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden md:block">
            <Link href="/work" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white hover:text-white/60 transition-colors border-b border-white/30 hover:border-white pb-2" style={{ fontFamily: SF }}>
              View Work →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section data-nav-theme="light" className="px-8 md:px-24 pt-32 pb-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h2 className="text-6xl md:text-9xl font-extrabold text-black leading-[0.88]" style={{ fontFamily: SYNE, letterSpacing: '-0.03em' }}>
            <StaggeredText text="Selected" />
            <br />
            <StaggeredText text="Work." gradientWords={[0]} startIndex={1} />
          </h2>
          <Link href="/work" className="text-sm font-medium border-b-2 border-black pb-1 hover:opacity-50 transition-opacity" style={{ fontFamily: SF }}>
            View all projects →
          </Link>
        </div>
      </section>

      <StackedProjects projects={featuredProjects} />

      <FooterCTA line1="Let's build" line2="something." line2Gradient="something." subtitle="Currently open to freelance projects and full-time UX/UI opportunities worldwide." email="rajsigdel1000@gmail.com" emailLabel="Reach me on mail" ctaLabel="Get In Touch →" ctaHref="/contact" />
    </main>
  );
}