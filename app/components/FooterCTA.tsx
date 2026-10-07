'use client';
import Link from 'next/link';
import AnimatedBackground from './AnimatedBackground';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

// --- SOCIAL ICONS ---
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.57 0-.28-.01-1.02-.02-2-3.34.7-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.09-.73.08-.71.08-.71 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.29-5.47-1.3-5.47-5.79 0-1.28.47-2.32 1.23-3.14-.12-.29-.53-1.48.12-3.09 0 0 1-.31 3.3 1.21a11.5 11.5 0 016 0c2.29-1.52 3.3-1.21 3.3-1.21.65 1.61.24 2.8.12 3.09.77.82 1.23 1.86 1.23 3.14 0 4.5-2.8 5.5-5.48 5.78.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .32.21.69.82.57A11.9 11.9 0 0024 12.29C24 5.78 18.63.5 12 .5z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// ⚠️ YOUR WHATSAPP NUMBER (country code + number, no + or spaces)
// Nepal: 9828159781 → 9779828159781
const whatsappNumber = '9779828159781';
const whatsappMessage = "Hi Raj! I'd like to discuss a project with you.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const socials = [
  { label: 'Github', href: 'https://github.com/SpaceRaaz-10', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/your-profile', Icon: LinkedinIcon },
  { label: 'Twitter', href: 'https://twitter.com/your-handle', Icon: TwitterIcon },
  { label: 'WhatsApp', href: whatsappUrl, Icon: WhatsappIcon },
];

export default function FooterCTA({
  line1 = 'Based in Nepal.',
  line1Gradient = '',
  line2 = 'Available worldwide.',
  line2Gradient = 'worldwide.',
  subtitle = "Working with clients across every time zone. Let's create something extraordinary together.",
  email = 'rajsigdel1000@gmail.com',
  ctaLabel,
  ctaHref,
}: {
  line1?: string;
  line1Gradient?: string;
  line2?: string;
  line2Gradient?: string;
  subtitle?: string;
  email?: string;
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
    <section className="relative w-full bg-black overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="absolute inset-0 bg-black/40 pointer-events-none z-[6]" />

      <div className="relative z-10 flex items-center justify-center w-full px-5 md:px-24 py-20 md:py-28 pointer-events-none">
        
        <div className="max-w-4xl mx-auto text-center w-full">
          
          <h2
            className="text-[clamp(2rem,5.5vw,4.5rem)] font-extrabold tracking-tighter text-white mb-5 md:mb-6 leading-[0.95]"
            style={{ fontFamily: SYNE, letterSpacing: '-0.03em' }}
          >
            <span className="block">{renderLine(line1, line1Gradient)}</span>
            <span className="block">{renderLine(line2, line2Gradient)}</span>
          </h2>

          <p
            className="text-white/60 text-sm md:text-base font-light max-w-xl mx-auto mb-8 md:mb-10"
            style={{ fontFamily: SF }}
          >
            {subtitle}
          </p>

          {/* Primary CTA (only if provided) */}
          {ctaLabel && ctaHref ? (
            <div className="inline-flex flex-wrap gap-3 md:gap-4 justify-center pointer-events-auto">
              <Link
                href={ctaHref}
                className="bg-white text-black border-2 border-white hover:bg-transparent hover:text-white transition-colors duration-300 px-6 py-3 md:px-7 md:py-3.5 rounded-full font-medium text-sm md:text-base shadow-xl inline-block"
                style={{ fontFamily: SF }}
              >
                {ctaLabel}
              </Link>
            </div>
          ) : null}

          {/* ============================================================
              SOCIAL MEDIA ROW
          ============================================================ */}
          <div className="mt-10 md:mt-14 flex flex-col items-center gap-5 pointer-events-auto">
            
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/20" />
              <span 
                className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40 font-medium"
                style={{ fontFamily: SF }}
              >
                Find me on
              </span>
              <span className="w-8 h-[1px] bg-white/20" />
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group/social w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-white hover:border-white transition-all duration-300 hover:scale-110"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <p
              className="text-white/40 text-[10px] md:text-xs tracking-wide mt-2"
              style={{ fontFamily: SF }}
            >
              {email}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}