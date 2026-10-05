'use client';
import Link from 'next/link';
import Logo from './Logo';
import SpaceButton from './SpaceButton';

const SYNE = "'Syne', sans-serif";
const SF = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 md:p-8 mix-blend-difference text-white pointer-events-none">
        {/* Logo */}
        <div className="pointer-events-auto">
          <Logo size={34} />
        </div>

        {/* Nav links */}
        <div
          className="hidden md:flex gap-12 text-sm font-medium pointer-events-auto"
          style={{ fontFamily: SF }}
        >
          <Link href="/work" className="hover:opacity-60 transition-opacity">Work</Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
          <Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
        </div>

        {/* Spacer to balance the layout */}
        <div className="w-[100px] md:w-[120px] pointer-events-none" />
      </nav>

      {/* Button outside blend mode */}
      <div className="fixed top-0 right-0 p-6 md:p-8 z-[51] pointer-events-auto">
        <SpaceButton>Let's Talk</SpaceButton>
      </div>
    </>
  );
}