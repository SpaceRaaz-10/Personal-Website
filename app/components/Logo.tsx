'use client';

import Link from 'next/link';

const SYNE = "'Syne', sans-serif";

export default function Logo({
  className = '',
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 group ${className}`}
      aria-label="SPACERAJ — Home"
    >
      {/* Orbit mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-700 group-hover:rotate-[25deg]"
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

        <circle
          cx="16"
          cy="16"
          r="4.5"
          fill="currentColor"
        />

        <circle
          cx="27"
          cy="10.5"
          r="1.4"
          fill="currentColor"
        >
          <animate
            attributeName="r"
            values="1.4;2;1.4"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* SPACERAJ */}
      <span
        className="text-[15px] font-black tracking-[-0.04em] leading-none"
        style={{ fontFamily: SYNE }}
      >
        SPACERAJ
      </span>
    </Link>
  );
}