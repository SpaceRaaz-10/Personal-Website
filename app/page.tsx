'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import StaggeredText from './components/StaggeredText';
import StackedProjects, { Project } from './components/StackedProjects';
import FooterCTA from './components/FooterCTA';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

const featuredProjects: Project[] = [
  { id: 1, title: 'Trekking Website', category: 'Website Design', year: '2024', description: 'A clean, user-friendly trekking platform focused on clear navigation, immersive visuals, and effortless trip discovery.', primaryImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1600&auto=format&fit=crop', secondaryImage: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Real Estate Dashboard', category: 'Backend Dashboard', year: '2024', description: 'A real estate admin dashboard built for effortless property management.', primaryImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop', secondaryImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Mountain Information', category: 'Website Design', year: '2024', description: 'A modern platform highlighting Nepal mountains with rich visuals.', primaryImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop', secondaryImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Juicy Smoothie', category: 'Website Design', year: '2023', description: 'A vibrant, appetite-driven website for a smoothie brand with bold type and product-first visuals.', primaryImage: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=1600&auto=format&fit=crop', secondaryImage: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop' },
];

const stageItems = [
  { img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop', label: 'Trekking Website', sub: 'Website Design' },
  { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', label: 'Real Estate', sub: 'Dashboard' },
  { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop', label: 'Mountain Info', sub: 'Website' },
  { img: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=800&auto=format&fit=crop', label: 'Juicy Smoothie', sub: 'Branding' },
  { img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop', label: 'Gym Tracker', sub: 'Mobile App' },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });

  // Carousel rotates on scroll
  const carouselRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  // Person scales up and fades late
  const personScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.25]);
  const personOpacity = useTransform(scrollYProgress, [0.55, 0.9], [1, 0]);
  // Center text fades early
  const centerTextOpacity = useTransform(scrollYProgress, [0.25, 0.5], [1, 0]);
  // Chrome (logo, playback bar) fades first
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  // Whole stage fades late
  const stageOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0.15]);

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: SF }}>
      <Navbar />

      {/* ============================================================
          CONCEPT A — THE GOLD STAGE
      ============================================================ */}
      <section ref={heroRef} data-nav-theme="light" className="relative h-[250vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Gold gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 40%, #f5c042 0%, #e8a317 40%, #9c650a 100%)',
            }}
          />

          {/* Chrome layer (logo, bottom info, playback bar) — fades first */}
          <motion.div style={{ opacity: chromeOpacity }} className="absolute inset-0 z-40 pointer-events-none">

            {/* SPACERAJ logo top-center */}
            <div className="absolute top-24 left-0 right-0 flex justify-center items-center gap-3">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.95)" />
                <path
                  d="M7 9.5c3.5-1 7-.7 10 1M7.5 13c3-.9 6-.5 8.5.9M8 16c2.2-.7 4.5-.3 6.5.8"
                  stroke="#c47f0a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-white font-semibold text-xl tracking-tight" style={{ fontFamily: SF }}>
                SPACERAJ
              </span>
            </div>

            {/* Bottom-left copyright */}
            <div className="absolute bottom-8 left-6 md:left-12 hidden md:block">
              <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] leading-loose" style={{ fontFamily: SF }}>
                © 2024 — Archive<br />by Raj Sigdel
              </p>
            </div>

            {/* Bottom-right CTA */}
            <div className="absolute bottom-8 right-6 md:right-12 hidden md:block pointer-events-auto">
              <Link
                href="/work"
                className="text-white/85 hover:text-white text-[10px] uppercase tracking-[0.3em] border-b border-white/40 hover:border-white pb-1 transition-colors"
                style={{ fontFamily: SF }}
              >
                View Work →
              </Link>
            </div>

            {/* Playback bar */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[88%] max-w-2xl hidden md:block">
              <div className="flex items-center gap-4 bg-black/35 backdrop-blur-xl border border-white/20 rounded-full px-5 py-3 shadow-2xl">
                <div className="flex items-center gap-3 text-white/85">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 12L20 6v12L11 12zM4 6h3v12H4z" />
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 12L4 6v12l9-6zM17 6h3v12h-3z" />
                  </svg>
                </div>
                <div className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full w-[38%] bg-white rounded-full" />
                </div>
                <span className="text-white/70 text-[11px] tabular-nums" style={{ fontFamily: SF }}>
                  2:14 / 5:00
                </span>
              </div>
            </div>
          </motion.div>

          {/* 3D CAROUSEL — rotates on scroll */}
          <motion.div
            style={{ opacity: stageOpacity }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div
              className="relative w-full h-full"
              style={{ perspective: '1600px' }}
            >
              <motion.div
                style={{
                  rotateY: carouselRotate,
                  transformStyle: 'preserve-3d',
                  position: 'absolute',
                  inset: 0,
                }}
              >
                {stageItems.map((item, i) => {
                  const angle = (i / stageItems.length) * 360;
                  const rad = (angle * Math.PI) / 180;
                  const R = 420;
                  const x = Math.sin(rad) * R;
                  const z = Math.cos(rad) * R;
                  const cardRotateY = -angle;

                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/25"
                      style={{
                        width: 220,
                        height: 300,
                        transform: `translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${cardRotateY}deg)`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 to-transparent">
                        <p className="text-white text-sm font-semibold" style={{ fontFamily: SF }}>
                          {item.label}
                        </p>
                        <p className="text-white/60 text-xs" style={{ fontFamily: SF }}>
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* CENTER PERSON — in front of the carousel */}
          <motion.div
            style={{ scale: personScale, opacity: personOpacity }}
            className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20 pointer-events-none"
          >
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
              alt="Raj Sigdel"
              className="h-[75vh] w-auto object-cover grayscale contrast-125 rounded-t-3xl"
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 100%)',
              }}
            />
          </motion.div>

          {/* CENTER TEXT overlay */}
          <motion.div
            style={{ opacity: centerTextOpacity }}
            className="absolute left-0 right-0 top-[28%] z-30 text-center pointer-events-none px-8"
          >
            <p className="text-white/75 text-[10px] uppercase tracking-[0.45em] mb-4" style={{ fontFamily: SF }}>
              Now Playing
            </p>
            <h1
              className="text-white font-black text-5xl md:text-7xl tracking-tight leading-[0.95]"
              style={{ fontFamily: SYNE, letterSpacing: '-0.03em', textShadow: '0 4px 40px rgba(0,0,0,0.35)' }}
            >
              Raj Sigdel
            </h1>
            <p className="text-white/70 text-sm md:text-base mt-3 font-light tracking-wide" style={{ fontFamily: SF }}>
              UX/UI Designer · QA Mindset
            </p>
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