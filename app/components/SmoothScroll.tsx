'use client';
import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // ===== RESPECT REDUCED MOTION =====
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    // ===== DISABLE LENIS ON TOUCH DEVICES =====
    // Mobile browsers already have excellent native momentum scrolling.
    // Lenis fights with the OS and creates janky behavior + breaks sticky.
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.innerWidth < 768;
    if (isTouch || isMobile) return;

    // ===== DESKTOP LENIS =====
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 1.2,
      // Prevent Lenis from hijacking touch events if it ever gets enabled on mobile
      smoothWheel: true,
      syncTouch: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // ===== HANDLE WINDOW RESIZE =====
    // If user resizes from desktop → mobile, destroy Lenis
    const handleResize = () => {
      if (window.innerWidth < 768) {
        lenis.destroy();
        cancelAnimationFrame(rafId);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}