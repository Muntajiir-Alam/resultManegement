import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

const easeOut = (p) => 1 - Math.pow(2, -10 * p); // easeOutExpo-style curve

export default function AnimatedNumber({ value, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    let rafId;

    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / (duration * 1000));
      const eased = easeOut(t);
      const current = Math.round(value * eased).toLocaleString();
      if (ref.current) ref.current.textContent = current;
      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration]);

  return <span ref={ref}>0</span>;
}