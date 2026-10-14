'use client';
import Link from 'next/link';
import Image from 'next/image';
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
  { to: 2, decimals: 0, suffix: '+', label: 'Years Experience' },
  { to: 9, decimals: 0, suffix: '+', label: 'Projects Done' },
  { to: 20, decimals: 0, suffix: '+', label: 'Happy Clients' },
];

const skills = [
  { category: 'UI/UX Design', tools: 'User Research, Wireframing, Prototyping, Micro-Animation, Interaction Design, HTML/CSS Integration' },
  { category: 'Responsive Design', tools: 'Mobile-first design, cross-platform compatibility, fluid layouts' },
  { category: 'Design Tools', tools: 'Figma, Adobe Photoshop, Illustrator, InDesign, Canva' },
  { category: 'Other Skills', tools: 'Design Systems, User Testing, Information Architecture, Usability Testing, High-Fidelity Mockups, Git' },
  { category: 'Frontend', tools: 'HTML, CSS, JavaScript, React' },
  { category: 'No-Code', tools: 'Webflow, Framer' },
];

const experience = [
  { year: '2024 - Present', role: 'UX/UI Designer (Fresher)', company: 'Personal Projects' },
  { year: '2024 - Present', role: 'QA Enthusiast', company: 'Self-taught · Manual Testing' },
  { year: '2023 - 2026', role: 'Graphic Designer & SEO Executive', company: 'Blaze Mountains Travels' },
  { year: '2023', role: 'Started UX/UI Journey', company: 'Self-learning' },
];

const education = [
  {
    year: '2024 - 2028',
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Asian School of Management and Technology, Nepal',
    status: 'Current',
  },
  {
    year: 'Completed 2023',
    degree: 'High School Diploma — Major: Computer Science',
    school: 'NCCS Secondary School, Nepal',
    status: 'Completed',
  },
];

const certifications = [
  {
    title: 'Graphic Design and Web Design',
    issuer: 'Animax Animation Academy, Lalitpur',
    year: '',
  },
];

export default function AboutPage() {
  return (
    <main data-nav-theme="light" className="min-h-screen bg-white text-black" style={{ fontFamily: SF }}>
      <Navbar />

      {/* HERO */}
      <section className="pt-32 md:pt-48 pb-16 px-5 md:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-black/40 uppercase mb-6" style={{ fontFamily: SF }}>About Me</p>
          <h1
            className="text-[clamp(2.25rem,9vw,7.5rem)] font-extrabold leading-[1.05] text-black break-words"
            style={{ fontFamily: SYNE, letterSpacing: '-0.03em' }}
          >
            <StaggeredText text="Designer and" gradientWords={[0]} />
            <br />
            <StaggeredText text="problem solver." gradientWords={[0]} startIndex={2} />
          </h1>
        </div>
      </section>

      {/* BIO */}
      <section className="px-5 md:px-24 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="relative">
            <img src="/whiteshirtimage.png" alt="Raj Sigdel — UX/UI Designer and QA enthusiast" className="rounded-3xl shadow-xl w-full" />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-black/5 px-5 py-3 rounded-full flex items-center gap-3 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-black" style={{ fontFamily: SF }}>Available for work</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
            <h2 className="text-2xl md:text-4xl font-bold leading-snug mb-8" style={{ fontFamily: SYNE, letterSpacing: '-0.02em' }}>
              UX/UI Designer and QA enthusiast based in Nepal.
            </h2>
            <div className="space-y-5 text-black/70 text-base md:text-lg font-light leading-relaxed" style={{ fontFamily: SF }}>
              <p>I am a UX/UI designer focused on clean, user-centered interfaces that perform well. Over the past <strong className="text-black font-semibold">2+ years</strong>, I have developed my craft through self-directed learning and hands-on projects, building a strong eye for both visual detail and product quality.</p>
              <p>My graphic design background gave me a solid visual foundation, and my interest in <strong className="text-black font-semibold">quality assurance</strong> shapes how I approach every screen. I test, iterate, and refine until the experience feels effortless.</p>
              <p>I have completed <strong className="text-black font-semibold">10+ personal projects</strong> across websites, dashboards, and mobile apps. My toolkit includes Figma and Webflow, along with a growing knowledge of front-end development and QA processes.</p>
              <p>I am currently open to opportunities where I can combine <strong className="text-black font-semibold">design thinking</strong> with a <strong className="text-black font-semibold">quality-first mindset</strong> to create products that look great and feel right to use.</p>
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

      {/* STATS */}
      <section className="px-5 md:px-24 py-24 border-t border-black/10 mt-16">
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

      {/* SKILLS */}
      <section className="px-5 md:px-24 py-24 bg-[#F5F5F7]">
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

      {/* EXPERIENCE */}
      <section className="px-5 md:px-24 py-32 bg-white">
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

      {/* EDUCATION */}
      <section className="px-5 md:px-24 py-32 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-16" style={{ fontFamily: SYNE, letterSpacing: '-0.02em' }}>
            <span className="gradient-text">Education.</span>
          </h2>
          <div className="space-y-2">
            {education.map((edu, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-black/10 items-center group hover:bg-white transition-colors px-4 -mx-4 rounded-lg">
                <div className="md:col-span-3 text-sm font-bold tracking-widest text-black/40 uppercase" style={{ fontFamily: SF }}>{edu.year}</div>
                <div className="md:col-span-6">
                  <div className="text-2xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-300" style={{ fontFamily: SYNE, letterSpacing: '-0.02em' }}>{edu.degree}</div>
                  <div className="text-black/60 font-light" style={{ fontFamily: SF }}>{edu.school}</div>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${edu.status === 'Current' ? 'bg-green-100 text-green-700' : 'bg-black/10 text-black/60'}`} style={{ fontFamily: SF }}>
                    {edu.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="px-5 md:px-24 py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-16" style={{ fontFamily: SYNE, letterSpacing: '-0.02em' }}>
            <span className="gradient-text">Certifications.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#F5F5F7] rounded-3xl p-8 md:p-10 border border-black/[0.06] flex gap-6 items-start"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: SYNE, letterSpacing: '-0.02em' }}>
                    {cert.title}
                  </h3>
                  <p className="text-black/60 font-light" style={{ fontFamily: SF }}>
                    {cert.issuer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA line1="Let's work" line2="together." line2Gradient="together." subtitle="Based in Nepal. Available for projects worldwide." email="rajsigdel1000@gmail.com" ctaLabel="Get In Touch →" ctaHref="/contact" />
    </main>
  );
}