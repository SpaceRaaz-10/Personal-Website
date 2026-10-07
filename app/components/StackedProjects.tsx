'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  primaryImage: string;
  secondaryImage: string;
}

// --- SINGLE COMPACT CARD ---
const CompactCard = ({ project, index }: { project: Project; index: number }) => {
  const isFeature = index % 3 === 0; // Every 3rd card is wider
  const chapter = String(index + 1).padStart(2, '0');

  // Split title
  const words = project.title.split(' ');
  const lastWord = words.pop();
  const firstPart = words.join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={isFeature ? 'md:col-span-2' : 'md:col-span-1'}
    >
      <Link href={`/work/${project.id}`} className="block group">
        
        {/* ============ CARD ============ */}
        <div className="relative w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-black shadow-[0_15px_50px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-700 group-hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.3)]">
          
          {/* Image container — compact height */}
          <div className={`relative w-full overflow-hidden ${isFeature ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/5] md:aspect-[3/4]'}`}>
            <img
              src={project.primaryImage}
              alt={project.title}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06]"
            />
            
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/0" />
            
            {/* Top row — Chapter + Year */}
            <div className="absolute top-4 left-4 right-4 md:top-5 md:left-5 md:right-5 flex items-center justify-between z-10">
              <span 
                className="text-[10px] tracking-[0.25em] uppercase text-white/70 font-medium"
                style={{ fontFamily: SF }}
              >
                {chapter}
              </span>
              <span 
                className="text-[10px] tracking-[0.25em] uppercase text-white/70 font-medium"
                style={{ fontFamily: SF }}
              >
                {project.year}
              </span>
            </div>

            {/* Bottom content — Title + Category */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-10 space-y-2 md:space-y-3">
              
              {/* Category */}
              <div className="flex items-center gap-2">
                <span className="w-4 h-[1px] bg-white/50" />
                <span 
                  className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/70 font-medium"
                  style={{ fontFamily: SF }}
                >
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h3 
                className={`font-extrabold text-white leading-[0.95] tracking-tight ${isFeature ? 'text-2xl md:text-4xl lg:text-5xl' : 'text-xl md:text-2xl lg:text-3xl'}`}
                style={{ fontFamily: SYNE }}
              >
                {firstPart && <span>{firstPart} </span>}
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  {lastWord}
                </span>
              </h3>

              {/* Hover-reveal CTA */}
              <div className="pt-2 md:pt-3 overflow-hidden">
                <div className="flex items-center gap-2 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span 
                    className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white font-medium"
                    style={{ fontFamily: SF }}
                  >
                    View Project
                  </span>
                  <svg 
                    width="12" height="12" viewBox="0 0 24 24" 
                    fill="none" stroke="white" strokeWidth="2.5" 
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Corner accent — subtle hover reveal */}
            <div className="absolute top-4 right-4 md:top-5 md:right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 z-20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// --- MAIN EXPORT ---
export default function StackedProjects({ projects }: { projects: Project[] }) {
  return (
    <section
      data-nav-theme="light"
      className="bg-[#F5F5F7] px-5 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section intro row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="flex items-baseline justify-between mb-10 md:mb-16 border-b border-black/10 pb-6"
        >
          <div className="flex items-baseline gap-3 md:gap-5">
            <span 
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-black/40"
              style={{ fontFamily: SF }}
            >
              — Featured
            </span>
            <span 
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-black/40"
              style={{ fontFamily: SF }}
            >
              {String(projects.length).padStart(2, '0')} Projects
            </span>
          </div>
          <span 
            className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-black/40 hidden md:block"
            style={{ fontFamily: SF }}
          >
            2023 — 2024
          </span>
        </motion.div>

        {/* Compact grid — 2 columns, feature cards span both */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <CompactCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mt-14 md:mt-20"
        >
          <Link
            href="/work"
            className="group/all inline-flex items-center gap-3 bg-black text-white px-7 py-4 md:px-9 md:py-5 rounded-full text-xs md:text-sm font-medium tracking-wide hover:bg-black/85 transition-all duration-300"
            style={{ fontFamily: SF }}
          >
            View All Projects
            <svg 
              width="14" height="14" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="2.5" 
              strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover/all:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}