'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import SpaceButton from '../components/SpaceButton';
import Navbar from '../components/Navbar';
import StaggeredText from '../components/StaggeredText';
import CountUp from '../components/CountUp';
import FooterCTA from '../components/FooterCTA';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

const stats = [
  { to: 1.5, decimals: 1, suffix: '+', label: 'Years Experience' },
  { to: 10, decimals: 0, suffix: '+', label: 'Projects Done' },
  { to: 30, decimals: 0, suffix: '+', label: 'Happy Clients' },
];

const skills = [
  { category: 'Design', tools: 'Figma, Adobe XD, Photoshop, Illustrator' },
  { category: 'No-Code', tools: 'Webflow, Framer' },
  { category: 'Development', tools: 'HTML, CSS, Basic React' },
  { category: 'UX', tools: 'Research, Wireframing, Prototyping' },
];

const experience = [
  { year: '2024 - Present', role: 'UX/UI Designer (Freelance)', company: 'Independent Projects' },
  { year: '2024 - Present', role: 'QA Enthusiast', company: 'Self-taught · Manual Testing' },
  { year: '2023 - 2024', role: 'Graphic Designer', company: 'Blaze Mountains Travels' },
  { year: '2023', role: 'Started UX/UI Journey', company: 'Self-learning' },
];

export default function AboutPage() {
  return (
    <main data-nav-theme="light" className="min-h-screen bg-white text-black" style={{ fontFamily: SF }}>
                  <Navbar />

      <section className="pt-48 pb-16 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-black/40 uppercase mb-6" style={{ fontFamily: SF }}>About Me</p>
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-extrabold leading-[1.05] text-black" style={{ fontFamily: SYNE, letterSpacing: '-0.03em' }}>
            <StaggeredText text="Designer and" gradientWords={[0]} />
            <br />
            <StaggeredText text="problem solver." gradientWords={[0]} startIndex={2} />
          </h1>
        </div>
      </section>

      <section className="px-8 md:px-24 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="relative">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop" alt="Raj Sigdel" className="w-full h-[60vh] object-cover grayscale contrast-125 rounded-3xl shadow-2xl" />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-black/5 px-5 py-3 rounded-full flex items-center gap-3 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-black" style={{ fontFamily: SF }}>Available for work</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
            <h2 className="text-2xl md:text-4xl font-bold leading-snug mb-8" style={{ fontFamily: SYNE, letterSpacing: '-0.02em' }}>
              UX/UI Designer and QA enthusiast based in Nepal.
            </h2>
            <div className="space-y-5 text-black/70 text-lg font-light leading-relaxed" style={{ fontFamily: SF }}>
              <p>I design clean, user-centered interfaces and I care deeply about how they perform. Over the past <strong className="text-black font-semibold">1.5+ years</strong>, I have built my craft through self-learning and hands-on projects, developing a sharp eye for both visual detail and product quality.</p>
              <p>My background in graphic design gave me the visual foundation, while my interest in <strong className="text-black font-semibold">quality assurance</strong> shaped how I approach every screen: testing, iterating, and refining until the experience feels effortless.</p>
              <p>I have completed <strong className="text-black font-semibold">10+ personal projects</strong> across websites, dashboards, and mobile apps. My toolkit includes Figma, Webflow, and a growing understanding of front-end development and QA processes.</p>
              <p>I am currently open to opportunities where I can combine <strong className="text-black font-semibold">design thinking</strong> with a <strong className="text-black font-semibold">quality-first mindset</strong> to build experiences that not only look great, but feel right to use.</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="/resume.pdf" download className="inline-block bg-black text-white border border-black hover:bg-white hover:text-black transition-colors duration-300 px-7 py-4 rounded-full font-medium text-sm shadow-xl">
                <span style={{ fontFamily: SF }}>Download Resume ↓</span>
              </a>
              <Link href="/contact" className="inline-block bg-white text-black border border-black hover:bg-black hover:text-white transition-colors duration-300 px-7 py-4 rounded-full font-medium text-sm shadow-md">
                <span style={{ fontFamily: SF }}>Get In Touch</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-8 md:px-24 py-24 border-t border-black/10 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <div className="text-7xl md:text-8xl font-extrabold tracking-tighter text-black leading-none mb-3" style={{ fontFamily: SYNE, letterSpacing: '-0.03em' }}>
                <CountUp to={stat.to} decimals={stat.decimals} suffix={stat.suffix} duration={2 + i * 0.2} />
              </div>
              <p className="text-sm font-bold tracking-widest text-black/40 uppercase" style={{ fontFamily: SF }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-8 md:px-24 py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-16" style={{ fontFamily: SYNE, letterSpacing: '-0.02em' }}>
            Tools &amp; <span className="gradient-text">Skills.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {skills.map((skill, i) => (
              <motion.div key={skill.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} className="border-b border-black/10 pb-6 flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-6">
                <h3 className="text-2xl font-bold" style={{ fontFamily: SYNE, letterSpacing: '-0.02em' }}>{skill.category}</h3>
                <p className="text-black/60 font-light md:text-right md:max-w-xs" style={{ fontFamily: SF }}>{skill.tools}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 md:px-24 py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-16" style={{ fontFamily: SYNE, letterSpacing: '-0.02em' }}>
            <span className="gradient-text">Experience.</span>
          </h2>
          <div className="space-y-2">
            {experience.map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-black/10 items-center group hover:bg-black/5 transition-colors px-4 -mx-4 rounded-lg">
                <div className="md:col-span-3 text-sm font-bold tracking-widest text-black/40 uppercase" style={{ fontFamily: SF }}>{exp.year}</div>
                <div className="md:col-span-5 text-2xl font-bold group-hover:translate-x-2 transition-transform duration-300" style={{ fontFamily: SYNE, letterSpacing: '-0.02em' }}>{exp.role}</div>
                <div className="md:col-span-4 text-black/60 font-light" style={{ fontFamily: SF }}>{exp.company}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA line1="Let's work" line2="together." line2Gradient="together." subtitle="Based in Nepal. Available for projects worldwide." email="rajsigdel1000@gmail.com" ctaLabel="Get In Touch →" ctaHref="/contact" />
    </main>
  );
}