'use client';
import { useRef, useState, useEffect, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, useMotionValue, animate } from 'framer-motion';
import Navbar from '../components/Navbar';
import FooterCTA from '../components/FooterCTA';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

// ============================================================
// PROJECTS — synced with /work/[slug]/page.tsx
// ============================================================
const projects = [
  {
    id: 1,
    slug: 'ott-platform-app',
    title: 'OTT Platform App',
    category: 'Mobile App',
    tools: ['Figma', 'Illustrator'],
    year: '2024',
    description: 'A modern OTT streaming app redesign focused on content discovery, personalization, and effortless browsing across devices.',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 2,
    slug: 'real-estate-dashboard',
    title: 'Real Estate Dashboard',
    category: 'Backend Dashboard',
    tools: ['Figma', 'React'],
    year: '2024',
    description: 'A real estate admin dashboard built for effortless property management, data visualization, and seamless user workflow.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 3,
    slug: 'mountain-information',
    title: 'Mountain Information',
    category: 'Website Design',
    tools: ['Figma', 'Webflow'],
    year: '2024',
    description: 'A modern platform highlighting Nepal mountains with rich visuals, interactive maps, and comprehensive trail information.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 4,
    slug: 'gym-tracker-app',
    title: 'Fitness Tracker App',
    category: 'Mobile App',
    tools: ['Figma', 'Illustrator'],
    year: '2023',
    description: 'A sleek fitness tracking application designed to keep users motivated with intuitive progress charts and workout logging.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 5,
    slug: 'trekking-website',
    title: 'Trekking Website',
    category: 'Website Design',
    tools: ['Figma', 'Webflow'],
    year: '2024',
    description: 'A clean, user-friendly trekking platform focused on clear navigation, immersive visuals, and effortless trip discovery.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1600&auto=format&fit=crop',
  },
];

// ============================================================
// TOOL ICONS
// ============================================================
const ToolIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'Figma':
      return (
        <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
          <path d="M19 28.5C19 25.46 21.46 23 24.5 23H38V33.5C38 36.54 35.54 39 32.5 39H19V28.5Z" fill="#1ABCFE"/>
          <path d="M0 47C0 43.96 2.46 41.5 5.5 41.5H19V52.5C19 55.54 16.54 58 13.5 58H5.5C2.46 58 0 55.54 0 52.5V47Z" fill="#0ACF83"/>
          <path d="M0 28.5C0 25.46 2.46 23 5.5 23H19V33.5H5.5C2.46 33.5 0 31.04 0 28.5Z" fill="#FF7262"/>
          <path d="M0 10C0 6.96 2.46 4.5 5.5 4.5H19V15H5.5C2.46 15 0 12.54 0 10Z" fill="#F24E1E"/>
          <path d="M19 4.5H32.5C35.54 4.5 38 6.96 38 10C38 13.04 35.54 15.5 32.5 15.5H19V4.5Z" fill="#A259FF"/>
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
          <circle cx="0" cy="0" r="2" fill="#61DAFB"></circle>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="10" ry="4.5"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
          </g>
        </svg>
      );
    case 'Webflow':
      return (
        <svg viewBox="0 0 24 24" fill="#146EF5" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
          <path d="M24 4.5l-7.5 15h-9L12 10.5l-4.5 9H0L7.5 4.5h9L12 13.5l4.5-9H24z"/>
        </svg>
      );
    case 'Illustrator':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
          <rect x="1" y="1" width="22" height="22" rx="4" fill="#330000" stroke="#FF9A00" strokeWidth="1.5"/>
          <text x="12" y="16" fontSize="11" fontWeight="bold" fill="#FF9A00" textAnchor="middle" fontFamily="sans-serif">Ai</text>
        </svg>
      );
    default:
      return null;
  }
};

// ============================================================
// FULL-SCREEN SLIDE
// ============================================================
const ProjectSlide = memo(function ProjectSlide({ project, index, total }: { project: any; index: number; total: number }) {
  const number = String(index + 1).padStart(2, '0');
  const totalStr = String(total).padStart(2, '0');

  const words = project.title.split(' ');
  const lastWord = words.pop();
  const firstPart = words.join(' ');

  return (
    <div className="relative w-screen h-svh flex-shrink-0 overflow-hidden">
      {/* Background image */}
      <img
        src={project.image}
        alt={project.title}
        draggable={false}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient scrim — balanced for centered text */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 md:from-black/75 md:via-black/40 md:to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Top-left info */}
      <div className="absolute top-24 md:top-28 left-5 md:left-12 lg:left-24 flex items-center gap-3 md:gap-5 z-10">
        <span className="text-white/70 text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: SF }}>
          {number} / {totalStr}
        </span>
        <span className="w-6 md:w-10 h-[1px] bg-white/30" />
        <span className="text-white/70 text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: SF }}>
          {project.category}
        </span>
      </div>

      {/* Top-right year */}
      <div className="absolute top-24 md:top-28 right-5 md:right-12 lg:right-24 z-10">
        <span className="text-white/70 text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: SF }}>
          {project.year}
        </span>
      </div>

      {/* FULLY CENTERED CONTENT */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-5 md:px-12">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2rem',
          }}
          className="w-full max-w-3xl"
        >
          
          {/* Title */}
          <h2
            className="text-white text-[clamp(2rem,5.5vw,4.75rem)] font-extrabold leading-[1.05] tracking-tight"
            style={{ fontFamily: SYNE, textAlign: 'center' }}
          >
            {firstPart && <span>{firstPart} </span>}
            <span className="inline-block whitespace-nowrap bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {lastWord}
            </span>
          </h2>

          {/* Description */}
          <p
            className="text-white/80 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl"
            style={{ fontFamily: SF, textAlign: 'center' }}
          >
            {project.description}
          </p>

          {/* Tools */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 block mb-3 md:mb-4 font-medium" style={{ fontFamily: SF }}>
              Tools Used
            </span>
            <div className="flex gap-3 justify-center">
              {project.tools.map((tool: string) => (
                <div
                  key={tool}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white/95 shadow-lg flex items-center justify-center"
                >
                  <ToolIcon name={tool} />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ paddingTop: '0.5rem' }}>
            <Link
              href={`/work/${project.slug}`}
              className="group/cta inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 md:px-9 md:py-4 rounded-full text-sm md:text-base font-medium hover:bg-white/90 transition-colors duration-300"
              style={{ fontFamily: SF }}
            >
              View Project
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-500 group-hover/cta:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom-left hint */}
      <div className="absolute bottom-8 md:bottom-12 left-5 md:left-12 lg:left-24 z-10 flex items-center gap-3">
        <span className="text-white/50 text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: SF }}>
          Scroll to explore
        </span>
      </div>
    </div>
  );
});

// ============================================================
// MAIN PAGE
// ============================================================
export default function WorkPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);

  // Snap to each project as user scrolls
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.round(latest * (projects.length - 1));
    if (index !== activeIndex) setActiveIndex(index);
  });

  // Smooth spring animation to slide to active project
  useEffect(() => {
    animate(x, -activeIndex * window.innerWidth, {
      type: 'spring',
      stiffness: 120,
      damping: 26,
      restDelta: 0.5,
    });
  }, [activeIndex, x]);

  // Recalculate on resize (instant, no spring)
  useEffect(() => {
    const handleResize = () => {
      x.set(-activeIndex * window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, x]);

  const totalScrollHeight = projects.length * 120;

  return (
    <main
      data-nav-theme="dark"
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: SF, overflowX: 'clip' }}
    >
      <Navbar />

      {/* ============================================================
          HORIZONTAL SLIDER — FULL SCREEN SLIDES
      ============================================================ */}
      <section
        ref={targetRef}
        style={{ height: `${totalScrollHeight}vh` }}
        className="relative bg-black"
      >
        <div className="sticky top-0 h-svh w-full overflow-hidden">
          
          {/* The Moving Track */}
          <motion.div
            style={{ x, willChange: 'transform' }}
            className="flex h-full w-max"
          >
            {projects.map((project, i) => (
              <ProjectSlide
                key={project.id}
                project={project}
                index={i}
                total={projects.length}
              />
            ))}
          </motion.div>

          {/* ============================================================
              PROGRESS BAR — Bottom
          ============================================================ */}
          <div className="absolute bottom-8 md:bottom-12 right-5 md:right-12 lg:right-24 z-20 pointer-events-none">
            <div className="flex items-center gap-4 md:gap-6">
              {/* Number */}
              <span
                className="text-white text-base md:text-lg font-extrabold tabular-nums"
                style={{ fontFamily: SYNE }}
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </span>

              {/* Progress bar */}
              <div className="w-24 md:w-40 h-[2px] bg-white/20 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full w-full bg-white origin-left"
                  animate={{ scaleX: (activeIndex + 1) / projects.length }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                />
              </div>

              {/* Total */}
              <span
                className="text-white/40 text-xs md:text-sm tracking-widest tabular-nums"
                style={{ fontFamily: SF }}
              >
                {String(projects.length).padStart(2, '0')}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <FooterCTA
        line1="Like what"
        line2="you see?"
        line2Gradient="see?"
        subtitle="Every project starts with a conversation. Let's talk about yours."
        email="rajsigdel1000@gmail.com"
        ctaLabel="Let's work together →"
        ctaHref="/contact"
      />
    </main>
  );
}