'use client';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { brand } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
import { CTA } from './CTA';
import { MagneticButton } from './MagneticButton';
const slides = [
  { src: '/images/space-roma-outer.png', alt: { pt: 'Fachada do restaurante Big Bowl em Roma, Lisboa', en: 'Big Bowl Roma restaurant exterior in Lisbon' }, position: 'center center', mobile: '54% center' },
  { src: '/images/space-roma.png', alt: { pt: 'Sala do restaurante Big Bowl com mesas de madeira', en: 'Big Bowl dining room with wooden tables' }, position: 'center center', mobile: '55% center' },
  { src: '/images/food-cta-2.png', alt: { pt: 'Pratos chineses servidos numa mesa do Big Bowl', en: 'Chinese dishes served at a Big Bowl table' }, position: 'center center', mobile: '58% center' },
];
export function Hero() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const first = useTransform(scrollYProgress, [0,.43,.5], ['0%','-100%','-100%']);
  const second = useTransform(scrollYProgress, [0,.43,.5,.88,1], ['100%','0%','0%','-100%','-100%']);
  const third = useTransform(scrollYProgress, [0,.5,.88,1], ['100%','100%','0%','0%']);
  const transforms = [first,second,third];
  return <section id="home" className="hero-scroll" ref={ref} aria-label={brand.name}>
    <div className="hero-sticky">
      {slides.map((slide,index) => <motion.div key={slide.src} className={`hero-slide hero-slide-${index+1}`} style={reduce ? { display: index ? 'none' : 'block' } : { y: transforms[index] }}>
        <Image src={slide.src} alt={slide.alt[language]} fill sizes="100vw" priority={index === 0} className="hero-image" style={{ objectPosition: slide.position }} data-mobile-position={slide.mobile} />
        <div className="hero-shade" />
      </motion.div>)}
      <div className="hero-content">
        <p className="hero-eyebrow">{t.heroEyebrow}</p>
        <h1>{brand.name}<span className="hero-chinese">{brand.chineseName}</span></h1>
        <p className="hero-descriptor">{t.heroLine}</p>
        <div className="hero-actions"><MagneticButton href="#contact">{t.bookTable}</MagneticButton><CTA href="#menu" variant="outline">{t.viewMenu}</CTA></div>
      </div>
      <a className="hero-scroll-cue" href="#menu">{t.explore}<span aria-hidden="true" /></a>
    </div>
  </section>;
}
