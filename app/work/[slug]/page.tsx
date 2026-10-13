'use client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import FooterCTA from '../../components/FooterCTA';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";
const GRADIENT = 'from-blue-600 via-purple-600 to-pink-500';
const EASE = [0.16, 1, 0.3, 1] as const;

// ============================================================
// 5 PROJECTS ONLY
// ============================================================
const projects = [
  {
    id: 1,
    slug: 'ott-platform-app',
    number: '01',
    title: 'OTT Platform App',
    gradientWord: 'App',
    category: 'Mobile App',
    year: '2024',
    client: 'Personal Project',
    role: 'Solo UX/UI Designer',
    duration: '6 Weeks',
    tools: ['Figma', 'Illustrator'],
    figmaUrl: 'https://www.figma.com/proto/ekhTRzdNNkpMKw6F8fhBs6/MOMO-App-Redesign?node-id=19-736',
    shortDescription: 'A modern OTT streaming app redesign focused on content discovery, personalization, and effortless browsing across devices.',
    heroImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2000&auto=format&fit=crop',
    overview: 'An OTT streaming platform redesign that prioritizes content discovery and personalization. Built to reduce decision fatigue while making browsing feel effortless across phone, tablet, and TV.',
    problem: 'Most OTT platforms overwhelm users with endless rows of content. Finding something to watch takes longer than watching it, and personalization feels generic.',
    solution: 'I restructured the entire experience around three pillars: a personalized home feed, a smart "Continue Watching" system, and a browsing flow that respects the user\'s time. Content is grouped by mood and moment rather than just genre.',
    features: [
      { title: 'Personalized Home Feed', description: 'A dynamic feed that learns from watch history and time of day.' },
      { title: 'Smart Continue Watching', description: 'Resumes exactly where you left off, across every device.' },
      { title: 'Mood-Based Browsing', description: 'Content grouped by mood and moment instead of just genre.' },
    ],
    outcome: [
      { label: 'Ship Time', value: '6 Weeks' },
      { label: 'Screens', value: '28+' },
      { label: 'Platforms', value: 'iOS, Android, TV' },
    ],
  },
  {
    id: 2,
    slug: 'real-estate-dashboard',
    number: '02',
    title: 'Real Estate Dashboard',
    gradientWord: 'Dashboard',
    category: 'Backend Dashboard',
    year: '2024',
    client: 'Personal Project',
    role: 'Solo UX/UI Designer',
    duration: '3 Weeks',
    tools: ['Figma', 'React'],
    figmaUrl: 'https://www.figma.com/proto/xWQfnMOJSh2FS4TWICAG5c/Real-State-Admin?node-id=1-2&starting-point-node-id=1%3A2',
    shortDescription: 'A real estate admin dashboard built for effortless property management.',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
    overview: 'A clean admin dashboard for property managers to track listings, tenants, and payments all in one place.',
    problem: 'Legacy tools were slow and hard to scan, leading to missed deadlines and data errors.',
    solution: 'I created a modular dashboard with quick filters, at-a-glance stats, and a unified property view.',
    features: [
      { title: 'Live Stats', description: 'Real-time occupancy and revenue metrics.' },
      { title: 'Bulk Actions', description: 'Manage multiple properties in one click.' },
      { title: 'Audit Trail', description: 'Every change logged and searchable.' },
    ],
    outcome: [
      { label: 'Ship Time', value: '3 Weeks' },
      { label: 'Screens', value: '18+' },
    ],
  },
  {
    id: 3,
    slug: 'mountain-information',
    number: '03',
    title: 'Mountain Information',
    gradientWord: 'Information',
    category: 'Website Design',
    year: '2024',
    client: 'Personal Project',
    role: 'Solo UX/UI Designer',
    duration: '2 Weeks',
    tools: ['Figma', 'Webflow'],
    figmaUrl: 'https://www.figma.com/proto/9OIa2uO1DQjcy5Fya6l2ck/Mountain-Website-UI?node-id=1-2&starting-point-node-id=1%3A2',
    shortDescription: 'A modern platform highlighting Nepal mountains with rich visuals.',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop',
    overview: 'An editorial-style website celebrating the mountains of Nepal with rich photography and structured data.',
    problem: 'Most information is scattered across blogs and forums with poor photography.',
    solution: 'A unified, image-first platform with clean typography and structured data.',
    features: [
      { title: 'Rich Visuals', description: 'Full-bleed photography on every page.' },
      { title: 'Structured Data', description: 'Elevation, location, and difficulty at a glance.' },
    ],
    outcome: [
      { label: 'Ship Time', value: '2 Weeks' },
      { label: 'Pages', value: '8' },
    ],
  },
  {
    id: 4,
    slug: 'gym-tracker-app',
    number: '04',
    title: 'Fitness Tracker App',
    gradientWord: 'App',
    category: 'Mobile App',
    year: '2023',
    client: 'Personal Project',
    role: 'Solo UX/UI Designer',
    duration: '5 Weeks',
    tools: ['Figma', 'Illustrator'],
    figmaUrl: 'https://www.figma.com/proto/yjojigF68gGpcYtQ6yCCZJ/Fitness-App?node-id=1-125&t=TQkLGCUaOOTyraIr-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1',
    shortDescription: 'A sleek fitness tracking application designed to keep users motivated.',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
    overview: 'A minimal mobile app for tracking workouts and progress without the usual clutter.',
    problem: 'Existing fitness apps overwhelm users with data.',
    solution: 'A focused tracker that shows only what matters today.',
    features: [
      { title: 'Workout Logging', description: 'Log sets, reps, and weight in seconds.' },
      { title: 'Progress Charts', description: 'Beautiful charts that show trends.' },
    ],
    outcome: [
      { label: 'Ship Time', value: '5 Weeks' },
      { label: 'Screens', value: '22' },
    ],
  },
  {
    id: 5,
    slug: 'trekking-website',
    number: '05',
    title: 'Trekking Website',
    gradientWord: 'Website',
    category: 'Website Design',
    year: '2024',
    client: 'Personal Project',
    role: 'Solo UX/UI Designer',
    duration: '4 Weeks',
    tools: ['Figma', 'Webflow'],
    figmaUrl: 'https://www.figma.com/proto/O6JfORZk4WsDdnUHydheIt/Blaze-Mountain-Project?node-id=1-2&starting-point-node-id=1%3A2',
    shortDescription: 'A clean, user-friendly trekking platform focused on clear navigation, immersive visuals, and effortless trip discovery.',
    heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2000&auto=format&fit=crop',
    overview: 'A modern trekking platform designed to make discovering and booking Himalayan adventures effortless.',
    problem: 'Existing trekking websites are cluttered with dense information, hard-to-read trail data, and clunky booking flows.',
    solution: 'I redesigned the experience around three pillars: immersive visuals, clear information hierarchy, and a frictionless discovery flow.',
    features: [
      { title: 'Interactive Trail Maps', description: 'Every trail plotted on an interactive map with elevation profiles.' },
      { title: 'Difficulty Filtering', description: 'Filter trails by difficulty, duration, altitude, and region.' },
      { title: 'Immersive Visuals', description: 'Full-bleed photography that pulls users into the experience.' },
    ],
    outcome: [
      { label: 'Ship Time', value: '4 Weeks' },
      { label: 'Pages Designed', value: '12+' },
      { label: 'Design System', value: 'Custom' },
    ],
  },
];

// ============================================================
// TOOL ICONS
// ============================================================
function ToolIcon({ name }: { name: string }) {
  switch (name) {
    case 'Figma':
      return (
        <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-7 md:h-7">
          <path d="M19 28.5C19 25.46 21.46 23 24.5 23H38V33.5C38 36.54 35.54 39 32.5 39H19V28.5Z" fill="#1ABCFE"/>
          <path d="M0 47C0 43.96 2.46 41.5 5.5 41.5H19V52.5C19 55.54 16.54 58 13.5 58H5.5C2.46 58 0 55.54 0 52.5V47Z" fill="#0ACF83"/>
          <path d="M0 28.5C0 25.46 2.46 23 5.5 23H19V33.5H5.5C2.46 33.5 0 31.04 0 28.5Z" fill="#FF7262"/>
          <path d="M0 10C0 6.96 2.46 4.5 5.5 4.5H19V15H5.5C2.46 15 0 12.54 0 10Z" fill="#F24E1E"/>
          <path d="M19 4.5H32.5C35.54 4.5 38 6.96 38 10C38 13.04 35.54 15.5 32.5 15.5H19V4.5Z" fill="#A259FF"/>
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-7 md:h-7">
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
        <svg viewBox="0 0 24 24" fill="#146EF5" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-7 md:h-7">
          <path d="M24 4.5l-7.5 15h-9L12 10.5l-4.5 9H0L7.5 4.5h9L12 13.5l4.5-9H24z"/>
        </svg>
      );
    case 'Illustrator':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-7 md:h-7">
          <rect x="1" y="1" width="22" height="22" rx="4" fill="#330000" stroke="#FF9A00" strokeWidth="1.5"/>
          <text x="12" y="16" fontSize="11" fontWeight="bold" fill="#FF9A00" textAnchor="middle" fontFamily="sans-serif">Ai</text>
        </svg>
      );
    default:
      return null;
  }
}

// ============================================================
// PAGE
// ============================================================
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  const titleWords = project.title.split(' ');
  const lastWord = titleWords.pop();
  const firstPart = titleWords.join(' ');

  return (
    <main data-nav-theme="light" className="min-h-screen bg-white text-black" style={{ fontFamily: SF }}>
      <Navbar />

      {/* HERO */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-24 px-5 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/work" className="group inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.3em] uppercase text-black/50 hover:text-black transition-colors mb-10 md:mb-16" style={{ fontFamily: SF }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:-translate-x-1">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Work
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
            <div className="order-2 lg:order-1 space-y-6 md:space-y-8 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex items-center gap-4 md:gap-6"
              >
                <span className="text-4xl md:text-5xl font-light text-black/20" style={{ fontFamily: SF }}>
                  {project.number}
                </span>
                <div className="flex items-center gap-3 md:gap-4 text-black/40 text-[10px] md:text-xs tracking-[0.25em] uppercase" style={{ fontFamily: SF }}>
                  <span>{project.year}</span>
                  <span className="w-1 h-1 rounded-full bg-black/20" />
                  <span>{project.category}</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-black break-words"
                style={{ fontFamily: SYNE }}
              >
                {firstPart && <span>{firstPart} </span>}
                <span className={`bg-gradient-to-r ${GRADIENT} bg-clip-text text-transparent`}>
                  {lastWord}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                className="text-base md:text-lg text-black/60 font-light leading-relaxed max-w-lg"
              >
                {project.shortDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
                className="pt-2"
              >
                <span className="text-[10px] md:text-xs text-black/40 uppercase tracking-[0.25em] block mb-3 md:mb-4" style={{ fontFamily: SF }}>
                  Tools Used
                </span>
                <div className="flex gap-3 md:gap-4">
                  {project.tools.map((tool) => (
                    <div key={tool} className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white shadow-sm border border-black/5 flex items-center justify-center">
                      <ToolIcon name={tool} />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* VIEW FIGMA BUTTON */}
              {project.figmaUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                  className="pt-2"
                >
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-black text-white px-6 py-3.5 md:px-7 md:py-4 rounded-full text-sm font-medium hover:bg-black/85 transition-all duration-300"
                    style={{ fontFamily: SF }}
                  >
                    <svg viewBox="0 0 38 57" fill="none" className="w-4 h-4 md:w-5 md:h-5">
                      <path d="M19 28.5C19 25.46 21.46 23 24.5 23H38V33.5C38 36.54 35.54 39 32.5 39H19V28.5Z" fill="#1ABCFE"/>
                      <path d="M0 47C0 43.96 2.46 41.5 5.5 41.5H19V52.5C19 55.54 16.54 58 13.5 58H5.5C2.46 58 0 55.54 0 52.5V47Z" fill="#0ACF83"/>
                      <path d="M0 28.5C0 25.46 2.46 23 5.5 23H19V33.5H5.5C2.46 33.5 0 31.04 0 28.5Z" fill="#FF7262"/>
                      <path d="M0 10C0 6.96 2.46 4.5 5.5 4.5H19V15H5.5C2.46 15 0 12.54 0 10Z" fill="#F24E1E"/>
                      <path d="M19 4.5H32.5C35.54 4.5 38 6.96 38 10C38 13.04 35.54 15.5 32.5 15.5H19V4.5Z" fill="#A259FF"/>
                    </svg>
                    View Figma
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-1">
                      <path d="M7 17L17 7M7 7h10v10"/>
                    </svg>
                  </a>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
              className="order-1 lg:order-2 relative aspect-[4/5] w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] bg-[#F5F5F7]"
            >
              <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="px-5 md:px-12 lg:px-24 py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <h2 className="lg:col-span-4 text-[clamp(2rem,4vw,3rem)] font-extrabold text-black" style={{ fontFamily: SYNE }}>
            Overview
          </h2>
          <div className="lg:col-span-8 space-y-10">
            <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed max-w-2xl">
              {project.overview}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-black/10">
              {[
                { label: 'Role', value: project.role },
                { label: 'Client', value: project.client },
                { label: 'Duration', value: project.duration },
                { label: 'Year', value: project.year },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-black/40 mb-2" style={{ fontFamily: SF }}>
                    {item.label}
                  </p>
                  <p className="text-sm md:text-base font-medium text-black">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="px-5 md:px-12 lg:px-24 py-16 md:py-24 bg-[#F5F5F7]">
        <div className="max-w-[1400px] mx-auto space-y-16 md:space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-black/40 block mb-4" style={{ fontFamily: SF }}>
                The Challenge
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-black" style={{ fontFamily: SYNE }}>
                Problem
              </h2>
            </div>
            <p className="lg:col-span-8 text-lg md:text-xl text-black/70 font-light leading-relaxed max-w-2xl">
              {project.problem}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-black/40 block mb-4" style={{ fontFamily: SF }}>
                The Approach
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-black" style={{ fontFamily: SYNE }}>
                Solution
              </h2>
            </div>
            <p className="lg:col-span-8 text-lg md:text-xl text-black/70 font-light leading-relaxed max-w-2xl">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* LIVE FIGMA EMBED */}
      {project.figmaUrl && (
        <section className="px-5 md:px-12 lg:px-24 py-16 md:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto space-y-8 md:space-y-12">
            <div className="max-w-2xl">
              <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-black/40 block mb-4" style={{ fontFamily: SF }}>
                Design File
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-black" style={{ fontFamily: SYNE }}>
                Live Figma
              </h2>
            </div>

            <div className="relative w-full aspect-[16/10] rounded-[1.25rem] md:rounded-[2rem] overflow-hidden border border-black/10 bg-[#F5F5F7]">
              <iframe
                src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(project.figmaUrl)}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <p className="text-xs md:text-sm text-black/50" style={{ fontFamily: SF }}>
              ↳ Interactive preview. Click inside to pan, zoom, and explore.
            </p>
          </div>
        </section>
      )}

      {/* FEATURES */}
      {project.features.length > 0 && (
        <section className="px-5 md:px-12 lg:px-24 py-16 md:py-24 bg-[#F5F5F7]">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-black mb-10 md:mb-14" style={{ fontFamily: SYNE }}>
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {project.features.map((feature, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-black/[0.06]">
                  <span className="text-xs tracking-widest text-black/30 block mb-4">0{i + 1}</span>
                  <h3 className="text-lg md:text-xl font-bold text-black mb-3" style={{ fontFamily: SYNE }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-black/55 font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OUTCOME */}
      {project.outcome.length > 0 && (
        <section className="px-5 md:px-12 lg:px-24 py-16 md:py-24 bg-black text-white">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-white mb-10 md:mb-14" style={{ fontFamily: SYNE }}>
              Outcome
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {project.outcome.map((item, i) => (
                <div key={i} className="border-t border-white/15 pt-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3" style={{ fontFamily: SF }}>
                    {item.label}
                  </p>
                  <p className="text-3xl md:text-5xl font-extrabold text-white" style={{ fontFamily: SYNE }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      <section className="px-5 md:px-12 lg:px-24 py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {prev && (
            <Link href={`/work/${prev.slug}`} className="group relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[16/10] bg-[#F5F5F7]">
              <img src={prev.heroImage} alt={prev.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2" style={{ fontFamily: SF }}>
                  ← Previous
                </span>
                <h3 className="text-xl md:text-3xl font-extrabold" style={{ fontFamily: SYNE }}>
                  {prev.title}
                </h3>
              </div>
            </Link>
          )}
          {next && (
            <Link href={`/work/${next.slug}`} className="group relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[16/10] bg-[#F5F5F7]">
              <img src={next.heroImage} alt={next.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white items-end text-right">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2" style={{ fontFamily: SF }}>
                  Next →
                </span>
                <h3 className="text-xl md:text-3xl font-extrabold" style={{ fontFamily: SYNE }}>
                  {next.title}
                </h3>
              </div>
            </Link>
          )}
        </div>
      </section>

      <FooterCTA
        line1="Like what"
        line2="you see?"
        line2Gradient="see?"
        subtitle="Every project starts with a conversation. Let's talk about yours."
        email="rajsigdel1000@gmail.com"
        ctaLabel="Start a project →"
        ctaHref="/contact"
      />
    </main>
  );
}