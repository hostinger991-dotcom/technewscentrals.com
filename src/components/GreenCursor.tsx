import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const GreenCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number | null>(null);
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Spawn trail particles occasionally
      if (Math.random() > 0.45) {
        particleIdRef.current += 1;
        const newParticle: Particle = {
          id: particleIdRef.current,
          x: e.clientX + (Math.random() * 8 - 4),
          y: e.clientY + (Math.random() * 8 - 4),
          size: Math.random() * 4 + 2,
          opacity: 0.9,
        };
        setParticles((prev) => [...prev.slice(-14), newParticle]);
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, select, [role="button"], article, .tech-hover-card, .cursor-pointer');
        setIsHovered(!!interactive);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      const rippleId = Date.now();
      setRipples((prev) => [...prev.slice(-4), { id: rippleId, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 700);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Smooth lerp for trailing ring
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animateTrail = () => {
      setTrailPos((prev) => ({
        x: lerp(prev.x, pos.x, 0.22),
        y: lerp(prev.y, pos.y, 0.22),
      }));
      requestRef.current = requestAnimationFrame(animateTrail);
    };

    requestRef.current = requestAnimationFrame(animateTrail);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [pos]);

  // Particle decay loop
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.1, size: Math.max(0, p.size - 0.3) }))
          .filter((p) => p.opacity > 0.05)
      );
    }, 40);
    return () => clearInterval(interval);
  }, [particles]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Click Ripples in Green */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full border border-[#00ff88] animate-ping"
          style={{
            left: ripple.x - 24,
            top: ripple.y - 24,
            width: 48,
            height: 48,
            backgroundColor: 'rgba(0, 255, 136, 0.25)',
            boxShadow: '0 0 20px #00ff88',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Trailing Green Sparkle Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            backgroundColor: '#00ff88',
            opacity: p.opacity,
            boxShadow: '0 0 6px #00ff88',
            transition: 'opacity 0.2s ease',
          }}
        />
      ))}

      {/* Outer Smooth Trailing Green Ring */}
      <div
        className="fixed rounded-full pointer-events-none transition-transform duration-150 ease-out flex items-center justify-center"
        style={{
          left: trailPos.x,
          top: trailPos.y,
          width: isHovered ? 44 : 28,
          height: isHovered ? 44 : 28,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.75 : 1})`,
          border: '1.5px solid #00ff88',
          backgroundColor: isHovered ? 'rgba(0, 255, 136, 0.12)' : 'rgba(0, 255, 136, 0.04)',
          boxShadow: isHovered
            ? '0 0 20px rgba(0, 255, 136, 0.6), inset 0 0 10px rgba(0, 255, 136, 0.3)'
            : '0 0 10px rgba(0, 255, 136, 0.35)',
        }}
      >
        {isHovered && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
        )}
      </div>

      {/* Inner Precision Green Dot */}
      <div
        className="fixed rounded-full pointer-events-none"
        style={{
          left: pos.x,
          top: pos.y,
          width: 8,
          height: 8,
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#00ff88',
          boxShadow: '0 0 12px #00ff88, 0 0 4px #ffffff',
        }}
      />
    </div>
  );
};
