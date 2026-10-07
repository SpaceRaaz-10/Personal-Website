'use client';
import { memo, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";
const GRADIENT = 'from-blue-600 via-purple-600 to-pink-500';
const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';

const principles = [
  {
    id: '01',
    label: 'Restraint',
    title: ['I remove', 'until', 'it hurts.'],
    gradientWord: 'hurts.',
    body: 'Good design is what remains after everything unnecessary has been taken away. Every element must defend its existence.',
  },
  {
    id: '02',
    label: 'Motion',
    title: ['Nothing', 'moves', 'without reason.'],
    gradientWord: 'reason.',
    body: 'Animation is not decoration. It is the invisible hand that guides attention, reveals hierarchy, and makes interfaces feel alive.',
  },
  {
    id: '03',
    label: 'Clarity',
    title: ['Clarity', 'over', 'cleverness.'],
    gradientWord: 'cleverness.',
    body: 'The best interfaces disappear. Users should never stop to admire the design. They should simply flow through it, effortlessly.',
  },
  {
    id: '04',
    label: 'Craft',
    title: ['Built', 'pixel', 'by pixel.'],
    gradientWord: 'pixel.',
    body: 'Details compound. A single misaligned edge is invisible, but a hundred of them destroy trust. Craft is a discipline, not a trait.',
  },
] as const;

type PrincipleType = (typeof principles)[number];
const TOTAL = principles.length;

// Fires once when the element enters the viewport. No scroll listeners.
function useOnceInView<T extends HTMLElement>(margin = '0px 0px -10% 0px') {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return [ref, shown] as const;
}

// ==================== STATIC STRIP ====================
function WordStrip() {
  return (
    <div aria-hidden className="border-y border-black/10 py-4 md:py-6">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-24 flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-9">
        {principles.map((p, i) => (
          <span key={p.id} className="flex items-center gap-5 md:gap-9">
            <span
              className="text-[clamp(1.5rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-black/15"
              style={{ fontFamily: SYNE }}
            >
              {p.label}
            </span>
            {i < TOTAL - 1 && <span className="text-lg md:text-2xl text-yellow-400">✦</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

// ==================== SIDEBAR (desktop) ====================
// Only changes when `active` changes (4 times total). CSS handles the transitions.
const Sidebar = memo(function Sidebar({ active }: { active: number }) {
  return (
    <div className="sticky top-0 h-screen flex flex-col justify-center pr-12 xl:pr-16">
      {/* Giant numbers */}
      <div className="relative h-[10rem] xl:h-[15rem]" aria-hidden>
        {principles.map((p, i) => (
          <span
            key={p.id}
            style={{ fontFamily: SYNE }}
            className={`absolute inset-0 text-[10rem] xl:text-[15rem] font-black leading-none text-black transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
              active === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {p.id}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative h-28 xl:h-40 w-[2px] mt-8 ml-2 bg-black/10 overflow-hidden">
        <div
          className={`absolute inset-0 origin-top bg-gradient-to-b ${GRADIENT} transition-transform duration-500 ease-out motion-reduce:transition-none`}
          style={{ transform: `scaleY(${(active + 1) / TOTAL})` }}
        />
      </div>

      {/* Labels */}
      <div className="mt-8 ml-2 relative h-20">
        {principles.map((p, i) => (
          <div
            key={p.id}
            className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${
              active === i ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p
              className="text-[10px] tracking-[0.35em] uppercase text-black/40 mb-2 font-medium"
              style={{ fontFamily: SF }}
            >
              Principle {p.id} / 0{TOTAL}
            </p>
            <p className="text-2xl xl:text-3xl font-bold text-black" style={{ fontFamily: SYNE }}>
              {p.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

// ==================== SINGLE PRINCIPLE ====================
const Principle = memo(function Principle({
  principle,
  index,
  onActive,
}: {
  principle: PrincipleType;
  index: number;
  onActive: (i: number) => void;
}) {
  const [ref, shown] = useOnceInView<HTMLDivElement>();

  // Marks this principle active when it crosses the middle of the screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActive(index);
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, onActive, ref]);

  const rule = `block origin-left h-[2px] bg-gradient-to-r ${GRADIENT} transition-transform duration-700 ${EASE} motion-reduce:transition-none motion-reduce:scale-x-100 ${
    shown ? 'scale-x-100' : 'scale-x-0'
  }`;

  return (
    <div
      ref={ref}
      className="min-h-[70svh] lg:min-h-[90vh] flex items-center py-12 md:py-20 lg:py-24"
    >
      <div className="relative w-full max-w-4xl">
        {/* Mobile + tablet label row */}
        <div className="lg:hidden flex items-center gap-4 mb-6 md:mb-8">
          <span
            className="text-3xl md:text-4xl font-black text-black/20 leading-none"
            style={{ fontFamily: SYNE }}
          >
            {principle.id}
          </span>
          <span className={`${rule} w-10 md:w-14`} />
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-black/50 font-medium"
            style={{ fontFamily: SF }}
          >
            {principle.label}
          </span>
        </div>

        {/* Desktop label row */}
        <div className="hidden lg:flex items-center gap-4 mb-10 xl:mb-12">
          <span
            className="text-[10px] xl:text-xs tracking-[0.35em] uppercase text-black/40 font-medium"
            style={{ fontFamily: SF }}
          >
            {principle.label}
          </span>
          <span className={`${rule} w-16 xl:w-28`} />
        </div>

        <h3
          className="text-[clamp(2rem,9.5vw,3.25rem)] sm:text-[clamp(2.75rem,8vw,4.25rem)] lg:text-[clamp(3rem,4.6vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight text-black mb-6 md:mb-10 lg:mb-12 break-words"
          style={{ fontFamily: SYNE }}
        >
          {principle.title.map((text, i) => (
            <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.02em]">
              <span
                style={{ transitionDelay: `${i * 70}ms` }}
                className={`inline-block transition-transform duration-700 ${EASE} motion-reduce:transition-none motion-reduce:translate-y-0 ${
                  shown ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                {text === principle.gradientWord ? (
                  <span className={`bg-gradient-to-r ${GRADIENT} bg-clip-text text-transparent`}>
                    {text}
                  </span>
                ) : (
                  text
                )}
              </span>
            </span>
          ))}
        </h3>

        <p
          style={{ fontFamily: SF, transitionDelay: '300ms' }}
          className={`text-base md:text-lg xl:text-xl text-black/60 font-light leading-relaxed max-w-xl pl-5 md:pl-6 border-l-2 border-black/10 transition-[opacity,transform] duration-700 ${EASE} motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
            shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {principle.body}
        </p>
      </div>
    </div>
  );
});

// ==================== MAIN ====================
export default function Manifesto() {
  const [active, setActive] = useState(0);
  const [headRef, headShown] = useOnceInView<HTMLDivElement>();
  const [sigRef, sigShown] = useOnceInView<HTMLDivElement>();

  return (
    <section data-nav-theme="light" className="relative bg-white text-black">
      {/* Static background: dot grid + two soft glows. Nothing animates here. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse at 85% 6%, rgba(250,204,21,0.10) 0%, transparent 45%)',
            'radial-gradient(ellipse at 8% 92%, rgba(99,102,241,0.08) 0%, transparent 45%)',
            'radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '100% 100%, 100% 100%, 24px 24px',
        }}
      />

      {/* ==================== HEADER ==================== */}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-12 lg:px-24 pt-20 md:pt-28 lg:pt-32 pb-10 md:pb-14 lg:pb-16">
        <div
          ref={headRef}
          className={`transition-[opacity,transform] duration-700 ${EASE} motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
            headShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className={`w-10 md:w-16 h-[2px] bg-gradient-to-r ${GRADIENT}`} />
            <span
              className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-black/60 font-medium"
              style={{ fontFamily: SF }}
            >
              Manifesto
            </span>
          </div>
          <h2
            className="text-[clamp(2rem,8vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-black max-w-4xl"
            style={{ fontFamily: SYNE }}
          >
            Four principles.
            <br />
            <span className="text-black/30">One obsession.</span>
          </h2>
        </div>
      </div>

      <WordStrip />

      {/* ==================== SCROLL GRID ==================== */}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12">
        <div className="hidden lg:block lg:col-span-5 relative">
          <Sidebar active={active} />
        </div>

        <div className="lg:col-span-7 min-w-0">
          {principles.map((p, i) => (
            <Principle key={p.id} principle={p} index={i} onActive={setActive} />
          ))}
        </div>
      </div>

      {/* ==================== SIGNATURE ==================== */}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-12 lg:px-24 py-16 md:py-28 lg:py-32">
        <div
          ref={sigRef}
          className={`pt-10 md:pt-16 border-t border-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 transition-[opacity,transform] duration-700 ${EASE} motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
            sigShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center gap-5">
            {/* Static gradient ring avatar */}
            <div
              className="p-[3px] rounded-full shrink-0"
              style={{
                background:
                  'conic-gradient(from 0deg, #2563eb, #9333ea, #ec4899, #facc15, #2563eb)',
              }}
            >
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full ring-[3px] ring-white bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-black font-bold text-sm md:text-base"
                style={{ fontFamily: SYNE }}
              >
                RS
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-black" style={{ fontFamily: SYNE }}>
                Raj Sigdel
              </p>
              <p
                className="text-[10px] tracking-[0.25em] uppercase text-black/50 mt-1"
                style={{ fontFamily: SF }}
              >
                UX/UI Designer · Kathmandu, Nepal
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="group/sig inline-flex items-center gap-3 rounded-full border border-black/15 px-5 py-3 md:px-7 md:py-4 text-[10px] md:text-xs tracking-[0.3em] uppercase text-black/70 hover:text-white hover:bg-black hover:border-black transition-colors duration-300 font-medium"
            style={{ fontFamily: SF }}
          >
            Start a conversation
            <span className="w-6 md:w-10 h-[1px] bg-current opacity-50 group-hover/sig:w-12 md:group-hover/sig:w-16 group-hover/sig:opacity-100 transition-all duration-500" />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-500 group-hover/sig:translate-x-1"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}