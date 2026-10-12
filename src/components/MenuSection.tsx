'use client';
import Image from 'next/image';
import { brand, dishes, type Language } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
import { CTA } from './CTA';
function DishCard({ dish, language }: { dish: typeof dishes[number]; language: Language }) {
  return <article className="dish-card"><Image src={dish.image} alt={dish.title[language]} fill sizes="(max-width: 640px) 288px, 368px" /><div className="dish-card-shade" /><div className="dish-copy"><h3>{dish.title[language]}</h3><p>{dish.description[language]}</p></div></article>;
}
function Row({ items, language, reverse }: { items: typeof dishes; language: Language; reverse?: boolean }) {
  return <div className="marquee-viewport"><div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
    <div className="marquee-set">{items.map(item => <DishCard key={item.image} dish={item} language={language} />)}</div>
    <div className="marquee-set" aria-hidden="true" inert>{items.map(item => <DishCard key={item.image} dish={item} language={language} />)}</div>
  </div></div>;
}
export function MenuSection() {
  const { language, t } = useLanguage();
  return <section id="menu" className="menu-section" aria-labelledby="menu-title">
    <div className="section-heading menu-heading"><p className="eyebrow">{t.specialties}</p><h2 id="menu-title">Menu</h2><p>{t.menuNote}</p></div>
    <div className="marquee-area"><Row items={dishes} language={language} /><Row items={[...dishes].reverse()} language={language} reverse /></div>
    <div className="menu-bottom"><CTA href={brand.menuUrl ?? '#menu'}>{t.fullMenu}</CTA></div>
  </section>;
}
