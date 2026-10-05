'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect: image moves slower than the scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
    >
      <Link href={`/work/${project.id}`}>
        {/* Image Container */}
        <div className="overflow-hidden rounded-3xl bg-[#F5F5F7] aspect-[4/3] mb-6 relative shadow-sm">
          <motion.img
            style={{ y }}
            src={project.image}
            alt={project.title}
            className="w-full h-[120%] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out absolute top-0 left-0"
          />
          
          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          
          {/* Floating Glass "View Project" Button */}
          <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md text-black px-6 py-3 rounded-full font-bold text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl border border-white/50">
            View Project →
          </div>
        </div>

        {/* Text Info */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold tracking-widest text-black/40 uppercase mb-2">
              {project.category}
            </p>
            <h3 
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-tight"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {project.title}
            </h3>
          </div>
          <p className="text-black/40 font-light mt-2 text-sm">{project.year}</p>
        </div>
      </Link>
    </motion.div>
  );
}