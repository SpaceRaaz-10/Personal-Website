'use client';
import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ===== RESPONSIVE SETUP =====
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isTablet = window.matchMedia('(max-width: 1024px)').matches;
    const sizeScale = isMobile ? 0.55 : isTablet ? 0.8 : 1.0;
    const starCount = isMobile ? 130 : isTablet ? 200 : 280;
    const TEX = isMobile ? 120 : 180;
    const DPR_CAP = isMobile ? 1.5 : 2;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    let isInitialized = false;

    // ===== NOISE =====
    const makeNoise = (seed: number) => {
      let s = seed >>> 0;
      const rand = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
      const p = new Uint8Array(256);
      for (let i = 0; i < 256; i++) p[i] = i;
      for (let i = 255; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        const tmp = p[i]; p[i] = p[j]; p[j] = tmp;
      }
      const perm = new Uint8Array(512);
      for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
      const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
      return (x: number, y: number) => {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const xf = x - Math.floor(x);
        const yf = y - Math.floor(y);
        const u = fade(xf);
        const v = fade(yf);
        const aa = perm[perm[X] + Y] / 255;
        const ab = perm[perm[X] + Y + 1] / 255;
        const ba = perm[perm[X + 1] + Y] / 255;
        const bb = perm[perm[X + 1] + Y + 1] / 255;
        const x1 = aa * (1 - u) + ba * u;
        const x2 = ab * (1 - u) + bb * u;
        return x1 * (1 - v) + x2 * v;
      };
    };
    const fbm = (noise: (x: number, y: number) => number, x: number, y: number, octaves = 5) => {
      let value = 0, amp = 0.5, freq = 1, total = 0;
      for (let i = 0; i < octaves; i++) {
        value += noise(x * freq, y * freq) * amp;
        total += amp;
        amp *= 0.5;
        freq *= 2;
      }
      return value / total;
    };
    const hexToRgb = (hex: string): [number, number, number] => {
      const h = hex.replace('#', '');
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    };
    const mix = (a: number, b: number, t: number) => a * (1 - t) + b * t;

    // ===== TEXTURE BAKE =====
    const bakeTexture = (planet: any) => {
      const off = document.createElement('canvas');
      off.width = TEX;
      off.height = TEX;
      const octx = off.getContext('2d');
      if (!octx) return off;
      const noise = makeNoise(planet.seed * 92821);
      const noise2 = makeNoise(planet.seed * 45103);
      const img = octx.createImageData(TEX, TEX);
      const d = img.data;
      const [hiR, hiG, hiB] = hexToRgb(planet.palette.hi);
      const [midR, midG, midB] = hexToRgb(planet.palette.mid);
      const [loR, loG, loB] = hexToRgb(planet.palette.lo);
      const [acR, acG, acB] = hexToRgb(planet.palette.accent);
      const [aaR, aaG, aaB] = hexToRgb(planet.palette.accentAlt);

      for (let y = 0; y < TEX; y++) {
        for (let x = 0; x < TEX; x++) {
          const u = x / TEX;
          const v = y / TEX;
          let r = 0, g = 0, b = 0;

          if (planet.type === 'gas') {
            const turbulence = (fbm(noise, u * 3, v * 10, 5) - 0.5) * 1.6;
            const bandCoord = v * 9 + turbulence;
            const bandVal = Math.sin(bandCoord * Math.PI * 2) * 0.5 + 0.5;
            r = mix(acR, aaR, bandVal);
            g = mix(acG, aaG, bandVal);
            b = mix(acB, aaB, bandVal);
            r = mix(r, midR, 0.25); g = mix(g, midG, 0.25); b = mix(b, midB, 0.25);
            const fine = (fbm(noise2, u * 30, v * 30, 3) - 0.5) * 40;
            r += fine; g += fine; b += fine;
          } else if (planet.type === 'rocky') {
            const n = fbm(noise, u * 5, v * 5, 6);
            const n2 = fbm(noise2, u * 14, v * 14, 4);
            r = mix(loR, midR, n); g = mix(loG, midG, n); b = mix(loB, midB, n);
            if (n2 > 0.62) {
              const t = (n2 - 0.62) / 0.38;
              r = mix(r, hiR, t * 0.7); g = mix(g, hiG, t * 0.7); b = mix(b, hiB, t * 0.7);
            }
            if (n2 < 0.32) {
              const t = (0.32 - n2) / 0.32;
              r = mix(r, loR, t * 0.5); g = mix(g, loG, t * 0.5); b = mix(b, loB, t * 0.5);
            }
          } else if (planet.type === 'earth') {
            const warpX = fbm(noise2, u * 3, v * 3, 3) * 0.15;
            const warpY = fbm(noise, u * 3, v * 3, 3) * 0.15;
            const landNoise = fbm(noise, (u + warpX) * 3, (v + warpY) * 3, 6);
            const detail = fbm(noise2, u * 12, v * 12, 4);
            const seaLevel = 0.54;
            const lat = Math.abs(v - 0.5) * 2;
            if (landNoise > seaLevel) {
              const elevation = (landNoise - seaLevel) / (1 - seaLevel);
              let lr: number, lg: number, lb: number;
              if (elevation < 0.4) { lr = 34 + detail * 30; lg = 110 + detail * 50; lb = 55 + detail * 20; }
              else if (elevation < 0.7) { lr = mix(70, 120, detail); lg = mix(95, 90, detail); lb = mix(45, 45, detail); }
              else { lr = mix(120, 200, detail); lg = mix(100, 190, detail); lb = mix(80, 180, detail); }
              const desertBand = Math.exp(-Math.pow((lat - 0.32) * 4, 2));
              const desertAmount = desertBand * (detail * 0.7);
              if (desertAmount > 0.35) {
                const t = Math.min(1, (desertAmount - 0.35) / 0.4);
                lr = mix(lr, 210, t * 0.75); lg = mix(lg, 175, t * 0.75); lb = mix(lb, 110, t * 0.75);
              }
              const iceCapEdge = 0.82 + detail * 0.05;
              if (lat > iceCapEdge) {
                const t = Math.min(1, (lat - iceCapEdge) / (1 - iceCapEdge));
                lr = mix(lr, 245, t); lg = mix(lg, 248, t); lb = mix(lb, 255, t);
              }
              r = lr; g = lg; b = lb;
            } else {
              const depth = (seaLevel - landNoise) / seaLevel;
              if (depth < 0.15) { r = mix(70, 30, depth / 0.15); g = mix(160, 120, depth / 0.15); b = mix(190, 170, depth / 0.15); }
              else if (depth < 0.5) { const t = (depth - 0.15) / 0.35; r = mix(30, 10, t); g = mix(120, 50, t); b = mix(170, 110, t); }
              else { const t = (depth - 0.5) / 0.5; r = mix(10, 3, t); g = mix(50, 15, t); b = mix(110, 55, t); }
            }
            const oceanIceEdge = 0.88 + detail * 0.03;
            if (lat > oceanIceEdge) {
              const t = Math.min(1, (lat - oceanIceEdge) / (1 - oceanIceEdge));
              r = mix(r, 245, t); g = mix(g, 250, t); b = mix(b, 255, t);
            }
          } else if (planet.type === 'ice') {
            const n = fbm(noise, u * 6, v * 6, 5);
            const n2 = fbm(noise2, u * 18, v * 18, 3);
            r = mix(loR, hiR, n); g = mix(loG, hiG, n); b = mix(loB, hiB, n);
            if (n2 > 0.7) {
              const t = (n2 - 0.7) / 0.3;
              r = mix(r, acR, t * 0.6); g = mix(g, acG, t * 0.6); b = mix(b, acB, t * 0.6);
            }
          }

          const i = (y * TEX + x) * 4;
          d[i] = Math.max(0, Math.min(255, r));
          d[i + 1] = Math.max(0, Math.min(255, g));
          d[i + 2] = Math.max(0, Math.min(255, b));
          d[i + 3] = 255;
        }
      }
      octx.putImageData(img, 0, 0);
      return off;
    };

    // ===== PLANETS =====
    type Planet = {
      x: number; y: number; vx: number; vy: number;
      radius: number; mass: number;
      type: 'rocky' | 'gas' | 'ice' | 'earth';
      palette: { hi: string; mid: string; lo: string; accent: string; accentAlt: string };
      hasRing?: boolean; ringColor?: string;
      spinning: number; spinSpeed: number; seed: number;
      texture: HTMLCanvasElement | null;
      baseRadius: number;
    };

    const baseSizes = [46, 64, 60, 46, 34];

    const planets: Planet[] = [
      { x: w * 0.22, y: h * 0.35, vx: 0.15, vy: -0.1, radius: baseSizes[0] * sizeScale, mass: baseSizes[0] * sizeScale, baseRadius: baseSizes[0],
        type: 'rocky', palette: { hi: '#ffcaa0', mid: '#c95a1e', lo: '#3a1206', accent: '#8a2a0a', accentAlt: '#ffd6b0' },
        spinning: 0, spinSpeed: 0.0006, seed: 1, texture: null },
      { x: w * 0.72, y: h * 0.3, vx: -0.2, vy: 0.15, radius: baseSizes[1] * sizeScale, mass: baseSizes[1] * sizeScale, baseRadius: baseSizes[1],
        type: 'gas', palette: { hi: '#fff1c9', mid: '#c69c6d', lo: '#3a2614', accent: '#a8734a', accentAlt: '#f5d9a8' },
        spinning: 0, spinSpeed: -0.0004, seed: 2, texture: null },
      { x: w * 0.82, y: h * 0.72, vx: 0.1, vy: 0.08, radius: baseSizes[2] * sizeScale, mass: baseSizes[2] * sizeScale, baseRadius: baseSizes[2],
        type: 'gas', palette: { hi: '#fff3c4', mid: '#d4a72c', lo: '#3a2708', accent: '#c49020', accentAlt: '#fce8a0' },
        hasRing: true, ringColor: 'rgba(253, 230, 138, 0.9)',
        spinning: 0, spinSpeed: 0.0003, seed: 3, texture: null },
      { x: w * 0.28, y: h * 0.75, vx: -0.12, vy: 0.05, radius: baseSizes[3] * sizeScale, mass: baseSizes[3] * sizeScale, baseRadius: baseSizes[3],
        type: 'earth', palette: { hi: '#dbeafe', mid: '#0a3d8f', lo: '#031238', accent: '#2d7a3e', accentAlt: '#8b6f3d' },
        spinning: 0, spinSpeed: 0.0008, seed: 4, texture: null },
      { x: w * 0.5, y: h * 0.55, vx: 0.05, vy: -0.12, radius: baseSizes[4] * sizeScale, mass: baseSizes[4] * sizeScale, baseRadius: baseSizes[4],
        type: 'ice', palette: { hi: '#ffffff', mid: '#a5f3fc', lo: '#0b2a35', accent: '#67e8f9', accentAlt: '#e0f7ff' },
        spinning: 0, spinSpeed: 0.001, seed: 5, texture: null },
    ];

    for (const p of planets) p.texture = bakeTexture(p);

    // ===== STARS =====
    type Star = { x: number; y: number; z: number; phase: number; baseAlpha: number; twinkleSpeed: number; hue: 'white' | 'blue' | 'warm' };
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const r = Math.random();
      stars.push({
        x: Math.random() * w, y: Math.random() * h,
        z: 0.1 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        baseAlpha: 0.7 + Math.random() * 0.3,
        twinkleSpeed: 0.005 + Math.random() * 0.02,
        hue: r < 0.65 ? 'white' : r < 0.88 ? 'blue' : 'warm',
      });
    }

    // ===== DRAG =====
    let dragging: Planet | null = null;
    let dragOffsetX = 0, dragOffsetY = 0;
    let lastDragX = 0, lastDragY = 0, lastDragTime = 0;
    let dragVX = 0, dragVY = 0;

    const getPos = (e: MouseEvent | Touch) => {
      const rect = canvas.getBoundingClientRect();
      return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top };
    };
    const hit = (x: number, y: number): Planet | null => {
      for (let i = planets.length - 1; i >= 0; i--) {
        if (Math.hypot(planets[i].x - x, planets[i].y - y) <= planets[i].radius + 6) return planets[i];
      }
      return null;
    };

    const onDown = (e: MouseEvent) => {
      const { x, y } = getPos(e);
      const p = hit(x, y);
      if (p) {
        dragging = p;
        dragOffsetX = x - p.x; dragOffsetY = y - p.y;
        lastDragX = x; lastDragY = y; lastDragTime = performance.now();
        dragVX = 0; dragVY = 0;
        canvas.style.cursor = 'grabbing';
        if (hintRef.current) hintRef.current.style.opacity = '0';
      }
    };
    const onMove = (e: MouseEvent) => {
      const { x, y } = getPos(e);
      if (dragging) {
        const now = performance.now();
        const dt = Math.max(1, now - lastDragTime);
        dragVX = ((x - lastDragX) / dt) * 16;
        dragVY = ((y - lastDragY) / dt) * 16;
        dragging.x = x - dragOffsetX;
        dragging.y = y - dragOffsetY;
        lastDragX = x; lastDragY = y; lastDragTime = now;
      } else {
        canvas.style.cursor = hit(x, y) ? 'grab' : 'default';
      }
    };
    const onUp = () => {
      if (dragging) { dragging.vx = dragVX; dragging.vy = dragVY; dragging = null; canvas.style.cursor = 'default'; }
    };

    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = t.clientX - rect.left, y = t.clientY - rect.top;
        const p = hit(x, y);
        if (p) {
          dragging = p;
          dragOffsetX = x - p.x; dragOffsetY = y - p.y;
          lastDragX = x; lastDragY = y; lastDragTime = performance.now();
          dragVX = 0; dragVY = 0;
          e.preventDefault();
          if (hintRef.current) hintRef.current.style.opacity = '0';
        }
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (dragging && e.touches.length > 0) {
        e.preventDefault();
        const t = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = t.clientX - rect.left, y = t.clientY - rect.top;
        const now = performance.now();
        const dt = Math.max(1, now - lastDragTime);
        dragVX = ((x - lastDragX) / dt) * 16;
        dragVY = ((y - lastDragY) / dt) * 16;
        dragging.x = x - dragOffsetX;
        dragging.y = y - dragOffsetY;
        lastDragX = x; lastDragY = y; lastDragTime = now;
      }
    };
    const onTouchEnd = () => {
      if (dragging) { dragging.vx = dragVX; dragging.vy = dragVY; dragging = null; }
    };
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    // ===== DRAW PLANET =====
    const drawPlanet = (p: Planet) => {
      const { x, y, radius: r, palette } = p;
      if (!p.texture) return;
      const atmo = ctx.createRadialGradient(x, y, r * 0.95, x, y, r * 1.4);
      atmo.addColorStop(0, palette.hi + '38');
      atmo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = atmo;
      ctx.beginPath();
      ctx.arc(x, y, r * 1.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.clip();
      const texSize = r * 2;
      const offset = ((p.spinning * texSize * 2) % texSize + texSize) % texSize;
      ctx.drawImage(p.texture, x - r - offset, y - r, texSize, texSize);
      ctx.drawImage(p.texture, x - r - offset + texSize, y - r, texSize, texSize);

      const lightGrad = ctx.createRadialGradient(x - r * 0.55, y - r * 0.6, r * 0.15, x, y, r * 1.35);
      lightGrad.addColorStop(0, 'rgba(255,255,240,0.15)');
      lightGrad.addColorStop(0.4, 'rgba(0,0,0,0)');
      lightGrad.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = lightGrad;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
      ctx.restore();

      ctx.beginPath();
      ctx.arc(x, y, r - 0.7, Math.PI * 0.75, Math.PI * 1.5);
      ctx.strokeStyle = palette.hi;
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;

      if (p.hasRing && p.ringColor) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-0.32);
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.85, r * 0.42, 0, Math.PI, Math.PI * 2);
        ctx.strokeStyle = p.ringColor;
        ctx.lineWidth = 4.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.85, r * 0.42, 0, 0, Math.PI);
        ctx.strokeStyle = p.ringColor;
        ctx.lineWidth = 4.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.65, r * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      if (dragging === p) {
        ctx.beginPath();
        ctx.arc(x, y, r + 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    // ===== PHYSICS =====
    const FRICTION = 0.997, BOUNCE = 0.75, MIN_SPEED = 0.02;
    const updatePhysics = (dt: number) => {
      const dtf = Math.min(dt / 16.67, 3);
      for (const p of planets) {
        if (p === dragging) continue;
        p.x += p.vx * dtf;
        p.y += p.vy * dtf;
        p.vx *= Math.pow(FRICTION, dtf);
        p.vy *= Math.pow(FRICTION, dtf);
        if (p.x - p.radius < 0) { p.x = p.radius; p.vx = Math.abs(p.vx) * BOUNCE; }
        else if (p.x + p.radius > w) { p.x = w - p.radius; p.vx = -Math.abs(p.vx) * BOUNCE; }
        if (p.y - p.radius < 0) { p.y = p.radius; p.vy = Math.abs(p.vy) * BOUNCE; }
        else if (p.y + p.radius > h) { p.y = h - p.radius; p.vy = -Math.abs(p.vy) * BOUNCE; }
        if (Math.abs(p.vx) < MIN_SPEED && Math.abs(p.vy) < MIN_SPEED) {
          p.vx += (Math.random() - 0.5) * 0.03;
          p.vy += (Math.random() - 0.5) * 0.03;
        }
      }
      for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
          const a = planets[i], b = planets[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minDist = a.radius + b.radius;
          if (dist < minDist && dist > 0) {
            const nx = dx / dist, ny = dy / dist;
            const overlap = minDist - dist;
            const totalMass = a.mass + b.mass;
            if (a !== dragging) { a.x -= nx * (b.mass / totalMass) * overlap; a.y -= ny * (b.mass / totalMass) * overlap; }
            if (b !== dragging) { b.x += nx * (a.mass / totalMass) * overlap; b.y += ny * (a.mass / totalMass) * overlap; }
            const rvx = b.vx - a.vx, rvy = b.vy - a.vy;
            const vn = rvx * nx + rvy * ny;
            if (vn > 0) continue;
            const e = 0.85;
            const imp = (-(1 + e) * vn) / (1 / a.mass + 1 / b.mass);
            if (a !== dragging) { a.vx -= (imp * nx) / a.mass; a.vy -= (imp * ny) / a.mass; }
            if (b !== dragging) { b.vx += (imp * nx) / b.mass; b.vy += (imp * ny) / b.mass; }
          }
        }
      }
    };

    // ===== RESIZE =====
    // Scale planet positions & radii proportionally so they stay in view
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const oldW = w;
      const oldH = h;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (!isInitialized || oldW <= 0 || oldH <= 0) return;

      const sx = w / oldW;
      const sy = h / oldH;
      const s = Math.min(sx, sy);

      // Only rescale if the change is meaningful (avoids jitter from mobile URL bar)
      const isSignificant = Math.abs(sx - 1) > 0.05 || Math.abs(sy - 1) > 0.05;

      if (isSignificant) {
        // Rescale positions
        for (const p of planets) {
          p.x *= sx;
          p.y *= sy;
        }
        // Rescale radii using sizeScale as the base
        for (const p of planets) {
          p.radius = p.baseRadius * sizeScale * s;
          p.mass = p.radius;
          p.x = Math.max(p.radius, Math.min(w - p.radius, p.x));
          p.y = Math.max(p.radius, Math.min(h - p.radius, p.y));
        }
        for (const star of stars) {
          star.x *= sx;
          star.y *= sy;
        }
      } else {
        // Just clamp planets to stay in view
        for (const p of planets) {
          p.x = Math.max(p.radius, Math.min(w - p.radius, p.x));
          p.y = Math.max(p.radius, Math.min(h - p.radius, p.y));
        }
      }
    };

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
      }, 150);
    };

    resize();
    isInitialized = true;

    // ===== RENDER =====
    let raf: number;
    let lastTime = performance.now();
    const render = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      const dtf = Math.min(dt / 16.67, 3);
      updatePhysics(dt);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      for (const star of stars) {
        star.phase += star.twinkleSpeed;
        star.x += 0.35 * star.z * dtf;
        star.y += 0.16 * star.z * dtf;
        if (star.x > w + 6) star.x = -6;
        if (star.y > h + 6) star.y = -6;

        const twinkle = 0.5 + Math.sin(star.phase) * 0.5;
        const alpha = star.baseAlpha * (0.45 + twinkle * 0.55);
        const size = 0.5 + star.z * 1.6;
        let color = '255, 255, 255';
        if (star.hue === 'blue') color = '180, 220, 255';
        if (star.hue === 'warm') color = '255, 225, 180';

        if (star.z > 0.5) {
          const glowR = size * (4 + star.z * 4);
          const g2 = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowR);
          g2.addColorStop(0, `rgba(${color}, ${alpha * 0.5})`);
          g2.addColorStop(1, `rgba(${color}, 0)`);
          ctx.fillStyle = g2;
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowR, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      }

      for (const p of planets) {
        p.spinning += p.spinSpeed * dt * 0.06;
        drawPlanet(p);
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(raf);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black pointer-events-auto">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none pointer-events-auto" />
      <div
        ref={hintRef}
        className="absolute top-20 md:top-6 left-1/2 -translate-x-1/2 text-white/60 text-[10px] md:text-xs font-medium tracking-widest uppercase pointer-events-none transition-opacity duration-700 z-10 px-4 text-center whitespace-nowrap"
      >
        Drag the planets · Throw them anywhere
      </div>
    </div>
  );
}