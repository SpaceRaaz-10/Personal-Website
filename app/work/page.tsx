'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SpaceButton from '../components/SpaceButton';
import Navbar from '../components/Navbar';
import StaggeredText from '../components/StaggeredText';
import FooterCTA from '../components/FooterCTA';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

const projects = [
  { id: 1, title: 'Trekking Website', category: 'Website Design', tools: 'Figma, Webflow', year: '2024', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, title: 'Real Estate Dashboard', category: 'Backend Dashboard', tools: 'Figma, React', year: '2024', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, title: 'Mountain Information', category: 'Website Design', tools: 'Figma, Webflow', year: '2024', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, title: 'Juicy Smoothie', category: 'Website Design', tools: 'Figma, Illustrator', year: '2023', image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=1200&auto=format&fit=crop' },
  { id: 5, title: 'Gym Tracker App', category: 'Mobile App', tools: 'Figma', year: '2023', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, title: 'Stripe Redesign', category: 'Business Website', tools: 'Figma, Webflow', year: '2023', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop' },
];

export default function WorkPage() {
  return (
    <main data-nav-theme="light" className="min-h-screen bg-white text-black" style={{ fontFamily: SF }}>
                  <Navbar />

      <section className="pt-48 pb-24 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-extrabold leading-[0.9] text-black" style={{ fontFamily: SYNE, letterSpacing: '-0.03em' }}>
            <StaggeredText text="Selected" />
            <br />
            <StaggeredText text="Work." gradientWords={[0]} startIndex={1} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-8 text-xl md:text-2xl font-light text-black/60 max-w-2xl" style={{ fontFamily: SF }}>
            A curated collection of projects showcasing design thinking, creativity, and attention to detail.
          </motion.p>
        </div>
      </section>

      <section className="px-8 md:px-24 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }} className="group cursor-pointer">
              <Link href={`/work/${project.id}`}>
                <div className="relative overflow-hidden rounded-3xl bg-[#F5F5F7] aspect-[4/3] mb-6 shadow-sm">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.05] transition-all duration-[900ms] ease-out" />
                  <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">{project.year}</div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-black/40 uppercase mb-2" style={{ fontFamily: SF }}>{project.category}</p>
                    <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-tight" style={{ fontFamily: SYNE }}>{project.title}</h3>
                  </div>
                  <div className="text-black/40 group-hover:text-black group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500 text-2xl mt-4">↗</div>
                </div>
                <p className="mt-3 text-sm font-light text-black/40" style={{ fontFamily: SF }}>{project.tools}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <FooterCTA line1="Like what" line2="you see?" line2Gradient="see?" subtitle="Every project starts with a conversation. Let's talk about yours." email="rajsigdel1000@gmail.com" ctaLabel="Let's work together →" ctaHref="/contact" />
    </main>
  );
}