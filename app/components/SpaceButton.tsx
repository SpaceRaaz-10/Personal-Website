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

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const STAR_COUNT = 55;
    const stars: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.2 + Math.random() * 0.8,
      });
    }

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

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <motion.button
      onMouseEnter={() => (hoveredRef.current = true)}
      onMouseLeave={() => (hoveredRef.current = false)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden rounded-full border border-white/20 shadow-lg cursor-pointer px-6 py-2 ${className || ''}`}
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
      <span className="relative z-10 block text-white font-medium text-sm">{children}</span>
    </motion.button>
  );
}