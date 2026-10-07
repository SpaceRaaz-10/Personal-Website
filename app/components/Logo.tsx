'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SYNE = "'Syne', sans-serif";

export default function Logo({
  className = '',
  size,
}: {
  className?: string;
  size?: number;
}) {
  const [autoSize, setAutoSize] = useState(size ?? 34);

  useEffect(() => {
    // If size prop was provided, don't auto-scale
    if (size !== undefined) return;

    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 480) setAutoSize(24);
      else if (w < 768) setAutoSize(28);
      else setAutoSize(34);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [size]);

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 group shrink-0 ${className}`}
      aria-label="SPACERAJ — Home"
    >
      <svg
        width={autoSize}
        height={autoSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-700 group-hover:rotate-[25deg] shrink-0"
      >
        <ellipse
          cx="16"
          cy="16"
          rx="13"
          ry="4.2"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          transform="rotate(-30 16 16)"
          opacity="0.9"
        />
        <circle cx="16" cy="16" r="4.5" fill="currentColor" />
        <circle cx="27" cy="10.5" r="1.4" fill="currentColor">
          <animate
            attributeName="r"
            values="1.4;2;1.4"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      <span
        className="text-[13px] sm:text-[14px] md:text-[15px] font-black tracking-[-0.04em] leading-none"
        style={{ fontFamily: SYNE }}
      >
        SPACERAJ
      </span>
    </Link>
  );
}