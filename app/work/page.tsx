'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, useMotionValue, animate } from 'framer-motion';
import Navbar from '../components/Navbar';
import StaggeredText from '../components/StaggeredText';
import FooterCTA from '../components/FooterCTA';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

// --- PROJECT DATA ---
const projects = [
  { 
    id: 1, 
    title: 'Trekking Website', 
    category: 'Website Design', 
    tools: ['Figma', 'Webflow'], 
    year: '2024', 
    description: 'A clean, user-friendly trekking platform focused on clear navigation, immersive visuals, and effortless trip discovery.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1600&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    title: 'Real Estate Dashboard', 
    category: 'Backend Dashboard', 
    tools: ['Figma', 'React'], 
    year: '2024', 
    description: 'A real estate admin dashboard built for effortless property management, data visualization, and seamless user workflow.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    title: 'Mountain Information', 
    category: 'Website Design', 
    tools: ['Figma', 'Webflow'], 
    year: '2024', 
    description: 'A modern platform highlighting Nepal mountains with rich visuals, interactive maps, and comprehensive trail information.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop' 
  },
  { 
    id: 4, 
    title: 'Juicy Smoothie', 
    category: 'Website Design', 
    tools: ['Figma', 'Illustrator'], 
    year: '2023', 
    description: 'A vibrant, appetite-driven website for a smoothie brand with bold type, product-first visuals, and engaging scroll animations.',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=1600&auto=format&fit=crop' 
  },
  { 
    id: 5, 
    title: 'Gym Tracker App', 
    category: 'Mobile App', 
    tools: ['Figma', 'Illustrator'], 
    year: '2023', 
    description: 'A sleek fitness tracking application designed to keep users motivated with intuitive progress charts and workout logging.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop' 
  },
  { 
    id: 6, 
    title: 'Stripe Redesign', 
    category: 'Business Website', 
    tools: ['Figma', 'Webflow'], 
    year: '2023', 
    description: 'A conceptual redesign of Stripe focusing on simplifying complex financial data into a beautiful, digestible interface.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1600&auto=format&fit=crop' 
  },
];

// --- REAL BRAND SVG TOOL ICONS ---
const ToolIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'Figma':
      return (
        <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M19 28.5C19 25.46 21.46 23 24.5 23H38V33.5C38 36.54 35.54 39 32.5 39H19V28.5Z" fill="#1ABCFE"/>
          <path d="M0 47C0 43.96 2.46 41.5 5.5 41.5H19V52.5C19 55.54 16.54 58 13.5 58H5.5C2.46 58 0 55.54 0 52.5V47Z" fill="#0ACF83"/>
          <path d="M0 28.5C0 25.46 2.46 23 5.5 23H19V33.5H5.5C2.46 33.5 0 31.04 0 28.5Z" fill="#FF7262"/>
          <path d="M0 10C0 6.96 2.46 4.5 5.5 4.5H19V15H5.5C2.46 15 0 12.54 0 10Z" fill="#F24E1E"/>
          <path d="M19 4.5H32.5C35.54 4.5 38 6.96 38 10C38 13.04 35.54 15.5 32.5 15.5H19V4.5Z" fill="#A259FF"/>
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
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
        <svg viewBox="0 0 24 24" fill="#146EF5" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M24 4.5l-7.5 15h-9L12 10.5l-4.5 9H0L7.5 4.5h9L12 13.5l4.5-9H24z"/>
        </svg>
      );
    case 'Illustrator':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <rect x="1" y="1" width="22" height="22" rx="4" fill="#330000" stroke="#FF9A00" strokeWidth="1.5"/>
          <text x="12" y="16" fontSize="11" fontWeight="bold" fill="#FF9A00" textAnchor="middle" fontFamily="sans-serif">Ai</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      );
  }
};

// --- INDIVIDUAL SLIDE COMPONENT ---
const ProjectSlide = ({ project, index }: { project: any, index: number }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');
  
  // Helper to split title and add gradient to the last word
  const renderTitle = (title: string) => {
    const words = title.split(' ');
    const lastWord = words.pop(); 
    const firstPart = words.join(' '); 
    
    return (
      <h2 
        // ⚠️ FIXED: Using clamp() for responsive font sizing to prevent word breaks
        className="text-[clamp(2.5rem,4vw,4.5rem)] font-extrabold text-black leading-[1.05] tracking-tight" 
        style={{ fontFamily: SYNE }}
      >
        {firstPart && <span>{firstPart} </span>}
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          {lastWord}
        </span>
      </h2>
    );
  };
  
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 lg:px-24 py-24 select-none">
      {/* 
        ⚠️ FIXED: Changed grid to 1.1fr for text and 0.9fr for image.
        This gives long words like "Information" enough room to breathe.
      */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center h-full max-h-[75vh]">
        
        {/* LEFT: TEXT CONTENT */}
        <div className="order-2 lg:order-1 flex flex-col justify-center h-full space-y-8 min-w-0 pr-4">
          
          {/* Project Number & Meta */}
          <div className="flex items-center gap-6">
            <span className="text-4xl font-light text-black/20" style={{ fontFamily: SF }}>
              {formattedIndex}
            </span>
            <div className="flex items-center gap-4 text-black/40 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: SF }}>
              <span>{project.year}</span>
              <span className="w-1 h-1 rounded-full bg-black/20"></span>
              <span>{project.category}</span>
            </div>
          </div>
          
          {/* Title with Gradient on Last Word */}
          {renderTitle(project.title)}
          
          {/* Description */}
          <p className="text-base md:text-lg text-black/60 font-light max-w-md leading-relaxed" style={{ fontFamily: SF }}>
            {project.description}
          </p>
          
          {/* Tools with Official SVGs */}
          <div className="pt-4">
            <span className="text-xs text-black/40 uppercase tracking-[0.2em] block mb-4" style={{ fontFamily: SF }}>Tools Used</span>
            <div className="flex gap-4">
              {project.tools.map((tool: string) => (
                <div key={tool} className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-black/5 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-300">
                  <ToolIcon name={tool} />
                </div>
              ))}
            </div>
          </div>

          {/* Apple-style CTA Button */}
          <div className="pt-6">
            <Link 
              href={`/work/${project.id}`} 
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-black/80 hover:gap-3 transition-all duration-300" 
              style={{ fontFamily: SF }}
            >
              View Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
        
        {/* RIGHT: IMAGE (Fixed height to prevent layout shifts) */}
        <div className="order-1 lg:order-2 relative h-full w-full rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] group bg-gray-100">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function WorkPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // 1. Track the vertical scroll of the slider section
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // 2. State to hold the currently active project index
  const [activeIndex, setActiveIndex] = useState(0);
  
  // 3. Motion value for the horizontal track position
  const x = useMotionValue(0);

  // 4. Listen to scroll changes and determine which project index is active
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalSlides = projects.length;
    const index = Math.round(latest * (totalSlides - 1));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // 5. When the active index changes, animate the x position smoothly using a spring
  useEffect(() => {
    animate(x, -activeIndex * window.innerWidth, {
      type: "spring",
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });
  }, [activeIndex, x]);

  // Handle window resize to keep the slider perfectly aligned
  useEffect(() => {
    const handleResize = () => {
      animate(x, -activeIndex * window.innerWidth, { type: "spring", stiffness: 100, damping: 30 });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, x]);

  const totalScrollHeight = projects.length * 120;

  return (
    <main data-nav-theme="light" className="min-h-screen bg-[#F5F5F7] text-black" style={{ fontFamily: SF }}>
      <Navbar />

      {/* HEADER SECTION */}
      <section className="pt-48 pb-16 px-8 md:px-24 bg-[#F5F5F7] relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-extrabold leading-[0.9] text-black" style={{ fontFamily: SYNE, letterSpacing: '-0.03em' }}>
            <StaggeredText text="Selected" />
            <br />
            <StaggeredText text="Work." gradientWords={[0]} startIndex={1} />
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
            className="mt-8 text-xl md:text-2xl font-light text-black/60 max-w-2xl" 
            style={{ fontFamily: SF }}
          >
            A curated collection of projects showcasing design thinking, creativity, and attention to detail. Scroll down to slide through.
          </motion.p>
        </div>
      </section>

      {/* HORIZONTAL SLIDER SECTION */}
      <section ref={targetRef} style={{ height: `${totalScrollHeight}vh` }} className="relative bg-[#F5F5F7]">
        
        {/* Sticky container that stays in view while scrolling */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          
          {/* The Moving Track */}
          <motion.div 
            style={{ x, willChange: 'transform' }} 
            className="flex h-full w-max"
          >
            {projects.map((project, i) => (
              <ProjectSlide key={project.id} project={project} index={i} />
            ))}
          </motion.div>

          {/* Progress Bar & Instructions (Bottom) */}
          <div className="absolute bottom-12 left-0 right-0 px-8 md:px-24 z-50 pointer-events-none">
            <div className="max-w-7xl mx-auto w-full">
              <div className="w-full h-[2px] bg-black/10 relative mb-4">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-black origin-left"
                  animate={{ scaleX: (activeIndex + 1) / projects.length }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
              <div className="flex justify-between text-xs tracking-[0.2em] text-black/40 uppercase" style={{ fontFamily: SF }}>
                <span>Scroll to explore</span>
                <span>{activeIndex + 1} / {projects.length}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
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