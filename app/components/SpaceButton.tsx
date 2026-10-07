'use client';
import { useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function SpaceButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ===== MOBILE-AWARE SETUP =====
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const DPR_CAP = isMobile ? 1.5 : 2;
    const STAR_COUNT = isMobile ? 30 : 55;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;

    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    setupCanvas();

    // ===== STARS =====
    let stars: { x: number; y: number; z: number }[] = [];
    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: 0.2 + Math.random() * 0.8,
        });
      }
    };
    initStars();

    // ===== RENDER LOOP =====
    let raf: number;
    const render = () => {
      ctx.fillStyle = 'rgba(10, 6, 32, 0.45)';
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        if (hoveredRef.current) {
          s.x += 4 * s.z + 2;
          s.y -= 0.3 + Math.random() * 0.4;
          if (s.x > w + 30 || s.y < -30) {
            s.x = -10;
            s.y = Math.random() * h;
          }
        } else {
          s.x -= 0.5 * s.z;
          if (s.x < -5) {
            s.x = w + 5;
            s.y = Math.random() * h;
          }
        }
        const size = s.z * 1.4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.z})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };

    ctx.fillStyle = '#0a0620';
    ctx.fillRect(0, 0, w, h);
    render();

    // ===== RESIZE HANDLER =====
    // Regenerates stars when button size changes (fixes stars floating off-screen)
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const ro = new ResizeObserver(() => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newW = canvas.offsetWidth;
        const newH = canvas.offsetHeight;
        if (newW === w && newH === h) return;
        w = newW;
        h = newH;
        setupCanvas();
        initStars(); // respawn stars within new bounds
      }, 100);
    });
    ro.observe(canvas);

    // ===== VISIBILITY: pause rendering when tab is hidden =====
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(raf);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      ro.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <motion.button
      // Desktop hover only — mobile uses tap instead
      onMouseEnter={() => (hoveredRef.current = true)}
      onMouseLeave={() => (hoveredRef.current = false)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden rounded-full border border-white/20 shadow-lg cursor-pointer px-5 py-2.5 md:px-6 md:py-2 text-xs md:text-sm ${className || ''}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ display: 'block' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 30%, rgba(124,58,237,0.4) 0%, transparent 55%), radial-gradient(ellipse at 75% 75%, rgba(59,130,246,0.3) 0%, transparent 55%)',
        }}
      />
      <span className="relative z-10 block text-white font-medium">{children}</span>
    </motion.button>
  );
}