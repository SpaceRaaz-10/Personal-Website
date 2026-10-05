'use client';
import Link from 'next/link';
import AnimatedBackground from './AnimatedBackground';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

export default function FooterCTA({
  line1 = 'Based in Nepal.',
  line1Gradient = '',
  line2 = 'Available worldwide.',
  line2Gradient = 'worldwide.',
  subtitle = "Working with clients across every time zone. Let's create something extraordinary together.",
  email = 'rajsigdel1000@gmail.com',
  emailLabel = 'Reach me on mail',
  ctaLabel,
  ctaHref,
}: {
  line1?: string;
  line1Gradient?: string;
  line2?: string;
  line2Gradient?: string;
  subtitle?: string;
  email?: string;
  emailLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const renderLine = (text: string, gradientWord: string) => {
    if (!gradientWord) return <span>{text}</span>;
    const idx = text.toLowerCase().indexOf(gradientWord.toLowerCase());
    if (idx === -1) return <span>{text}</span>;
    const before = text.slice(0, idx);
    const mid = text.slice(idx, idx + gradientWord.length);
    const after = text.slice(idx + gradientWord.length);
    return (
      <>
        {before}
        <span className="gradient-text">{mid}</span>
        {after}
      </>
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-black min-h-[80vh]">
      {/* Space background — planets + stars (draggable) */}
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Dark overlay — pointer-events-none so canvas gets drags */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-[6]" />

      {/* Content — pointer-events-none so canvas underneath is draggable */}
      <div className="relative z-10 flex items-center justify-center h-full min-h-[80vh] px-8 md:px-24 py-32 pointer-events-none">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-8 leading-[0.95]"
            style={{ fontFamily: SYNE, letterSpacing: '-0.03em' }}
          >
            <span className="block">{renderLine(line1, line1Gradient)}</span>
            <span className="block">{renderLine(line2, line2Gradient)}</span>
          </h2>

          <p
            className="text-white/60 text-base md:text-lg font-light max-w-2xl mx-auto mb-12"
            style={{ fontFamily: SF }}
          >
            {subtitle}
          </p>

          {/* Buttons */}
          <div className="inline-flex flex-wrap gap-4 justify-center pointer-events-auto">
            {ctaLabel && ctaHref ? (
              <Link
                href={ctaHref}
                className="bg-white text-black border-2 border-white hover:bg-transparent hover:text-white transition-colors duration-300 px-8 py-4 rounded-full font-medium text-base shadow-xl inline-block"
                style={{ fontFamily: SF }}
              >
                {ctaLabel}
              </Link>
            ) : null}
            <a
              href={`mailto:${email}`}
              className="bg-white text-black border-2 border-white hover:bg-transparent hover:text-white transition-colors duration-300 px-8 py-4 rounded-full font-medium text-base shadow-xl inline-flex items-center gap-2"
              style={{ fontFamily: SF }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              {emailLabel}
            </a>
          </div>

          {/* Small email hint below buttons */}
          <p
            className="mt-6 text-white/40 text-xs tracking-wide"
            style={{ fontFamily: SF }}
          >
            {email}
          </p>
        </div>
      </div>
    </section>
  );
}