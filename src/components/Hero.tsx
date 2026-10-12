'use client';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { brand } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
import { CTA } from './CTA';
import { MagneticButton } from './MagneticButton';
const slides = [
  { src: '/images/space-roma.png', alt: { pt: 'Interior do Big Bowl Roma com mesas de madeira', en: 'Big Bowl Roma dining room with wooden tables' } },
  { src: '/images/food-cta-2.png', alt: { pt: 'Pratos chineses servidos numa mesa do Big Bowl', en: 'Chinese dishes served at a Big Bowl table' } },
];
export function Hero() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const first = useTransform(scrollYProgress, [0, .78, 1], ['0%', '-100%', '-100%']);
  const second = useTransform(scrollYProgress, [0, .78, 1], ['100%', '0%', '0%']);
  return <section id="home" className="hero-scroll" ref={ref} aria-label={brand.name}>
    <div className="hero-sticky">
      {slides.map((slide, index) => <motion.div key={slide.src} className={`hero-slide hero-slide-${index + 1}`} style={reduce ? { display: index ? 'none' : 'block' } : { y: index ? second : first }}>
        <Image src={slide.src} alt={slide.alt[language]} fill sizes="100vw" priority={index === 0} className="hero-image" />
        <div className="hero-shade" />
      </motion.div>)}
      <div className="hero-content">
        <h1>{brand.name}</h1>
        <p className="hero-eyebrow">{t.heroEyebrow}</p>
        <div className="hero-actions"><MagneticButton href="/reservation?branch=roma">{t.bookTable}</MagneticButton><CTA href="#menu" variant="outline">{t.viewMenu}</CTA></div>
      </div>
      <a className="hero-scroll-cue" href="#restaurants">{t.explore}<span aria-hidden="true" /></a>
    </div>
  </section>;
}
