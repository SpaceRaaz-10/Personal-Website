'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

export type Project = {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  primaryImage: string;
  secondaryImage: string;
};

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - index - 1) * 0.05;
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  const words = project.title.split(' ');
  const firstWords = words.slice(0, -1).join(' ');
  const lastWord = words[words.length - 1];

  return (
    <div
      className="h-screen w-full sticky top-0 flex items-center justify-center px-4 md:px-12"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full max-w-7xl h-[78vh] rounded-[2rem] overflow-hidden shadow-2xl bg-black origin-top"
      >
        <img
          src={project.primaryImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

        <div className="hidden md:block absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 w-40 lg:w-56 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 z-10">
          <img
            src={project.secondaryImage}
            alt={`${project.title} detail`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-6 md:top-8 left-6 md:left-8 flex items-center gap-3 z-10">
          <div
            className="backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full"
            style={{
              fontFamily: SF,
              backgroundColor: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <div
            className="backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full"
            style={{
              fontFamily: SF,
              backgroundColor: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            {project.year}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14 z-10">
          <p
            className="text-[11px] md:text-xs font-bold tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: SF, color: 'rgba(255,255,255,0.55)' }}
          >
            {project.category}
          </p>

          <h3
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter text-white leading-[0.95] mb-5 max-w-[90%] md:max-w-[65%]"
            style={{ fontFamily: SYNE, letterSpacing: '-0.03em' }}
          >
            {firstWords && <span>{firstWords} </span>}
            <span className="gradient-text-on-dark">{lastWord}</span>
          </h3>

          <p
            className="text-sm md:text-base lg:text-lg max-w-lg mb-7 font-light leading-relaxed"
            style={{ fontFamily: SF, color: 'rgba(255,255,255,0.65)' }}
          >
            {project.description}
          </p>

          {/* Bulletproof button — inline styles so nothing can strip them */}
          <Link
            href={`/work/${project.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:opacity-90"
            style={{
              fontFamily: SF,
              backgroundColor: '#ffffff',
              color: '#000000',
              border: '2px solid #ffffff',
            }}
          >
            View Case Study →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function StackedProjects({ projects }: { projects: Project[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container} className="relative">
      {projects.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}