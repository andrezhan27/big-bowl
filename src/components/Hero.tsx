'use client';
import { getImageProps } from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { brand } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
import { CTA } from './CTA';
const slides = [
  { src: '/images/space-roma.webp', mobileSrc: '/images/hero-mobile-1.webp', alt: { pt: 'Interior do Big Bowl Roma com mesas de madeira', en: 'Big Bowl Roma dining room with wooden tables' } },
  { src: '/images/food-cta-2.webp', mobileSrc: '/images/hero-mobile-2.webp', alt: { pt: 'Pratos chineses servidos numa mesa do Big Bowl', en: 'Chinese dishes served at a Big Bowl table' } },
];
export function Hero() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Smooth touch-scroll updates together so the slides remain flush throughout the transition.
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: .3, restDelta: .001 });
  const first = useTransform(progress, [0, .78, 1], ['0%', '-100%', '-100%']);
  const second = useTransform(progress, [0, .78, 1], ['100%', '0%', '0%']);
  return <section id="home" className="hero-scroll" ref={ref} aria-label={brand.name}>
    <div className="hero-sticky">
      {slides.map((slide, index) => {
        const shared = { alt: slide.alt[language], fill: true, sizes: '100vw', className: 'hero-image', loading: 'eager' as const, fetchPriority: index === 0 ? 'high' as const : 'auto' as const };
        const { props: desktop } = getImageProps({ ...shared, src: slide.src });
        const { props: mobile } = getImageProps({ ...shared, src: slide.mobileSrc });
        return <motion.div key={slide.src} className={`hero-slide hero-slide-${index + 1}`} style={reduce ? { display: index ? 'none' : 'block' } : { y: index ? second : first }} transformTemplate={(_, transform) => `${transform} translateZ(0)`}>
          <picture>
            <source media="(max-width: 800px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
            {/* getImageProps retains Next's responsive image optimization for the picture fallback. */}
            <img {...desktop} alt={slide.alt[language]} />
          </picture>
          <div className="hero-shade" />
        </motion.div>;
      })}
      <div className="hero-content">
        <h1>{brand.name}</h1>
        <p className="hero-eyebrow">{t.heroEyebrow}</p>
        <div className="hero-actions"><CTA href="/reservation?branch=bigbowlroma">{t.bookTable}</CTA><CTA href="#menu" variant="outline">{t.viewMenu}</CTA></div>
      </div>
      <a className="hero-scroll-cue" href="#restaurants">{t.explore}<span aria-hidden="true" /></a>
    </div>
  </section>;
}
