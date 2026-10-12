'use client';
import { useRef } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';
import { CTA } from './CTA';
export function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18 }), springY = useSpring(y, { stiffness: 240, damping: 18 });
  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return;
    const box = ref.current?.getBoundingClientRect(); if (!box) return;
    x.set(((event.clientX - box.left) / box.width - .5) * 10);
    y.set(((event.clientY - box.top) / box.height - .5) * 10);
  }
  return <motion.div ref={ref} style={{ x: springX, y: springY }} onPointerMove={move} onPointerLeave={() => {x.set(0);y.set(0);}}><CTA href={href}>{children}</CTA></motion.div>;
}
