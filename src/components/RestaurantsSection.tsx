'use client';
import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Star } from 'lucide-react';
import { locations, type Location } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
// Keep complete neighboring sets visible on both sides during a loop reset.
const slides = Array.from({ length: 5 }, () => locations).flat();
const startIndex = locations.length * 2;
const gap = 24;
export function RestaurantsSection() {
  const { language, t } = useLanguage();
  const viewportRef = useRef<HTMLDivElement>(null);
  const locked = useRef(false);
  const queued = useRef<number[]>([]);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [index, setIndex] = useState(startIndex);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [moving, setMoving] = useState(false);
  const activeIndex = index % locations.length;
  const cardWidth = Math.min(500, Math.max(260, viewportWidth - 76));
  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    const observer = new ResizeObserver(entries => setViewportWidth(entries[0].contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    if (transitionEnabled) return;
    // Commit the invisible rebase with all slide transitions disabled before
    // enabling motion again, so the browser never interpolates backwards.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        setTransitionEnabled(true);
        locked.current = false;
        setMoving(false);
      });
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, [transitionEnabled]);
  const advance = useCallback((direction: number) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIndex(current => startIndex + (current + direction + locations.length) % locations.length);
      return;
    }
    if (locked.current) { queued.current.push(direction); return; }
    locked.current = true;
    setMoving(true);
    setTransitionEnabled(true);
    setIndex(current => current + direction);
  }, []);
  useEffect(() => {
    if (!moving && queued.current.length) advance(queued.current.shift()!);
  }, [moving, advance]);
  function select(target: number) {
    if (target === activeIndex) return;
    const direct = target - activeIndex;
    advance(Math.abs(direct) === 2 ? -Math.sign(direct) : direct);
  }
  function settle() {
    if (index < startIndex || index >= startIndex + locations.length) {
      setTransitionEnabled(false);
      setIndex(startIndex + activeIndex);
    } else { locked.current = false; setMoving(false); }
  }
  return <section id="restaurants" className="restaurants-section" aria-labelledby="restaurants-title">
    <div className="section-heading restaurants-heading content-width"><p className="eyebrow">Big Bowl · {t.city}</p><h2 id="restaurants-title">{t.ourRestaurants}</h2><p>{t.restaurantsIntro}</p></div>
    <div className="restaurant-tabs" role="group" aria-label={t.ourRestaurants}>
      {locations.map((location, locationIndex) => <button type="button" aria-pressed={activeIndex === locationIndex} className={activeIndex === locationIndex ? 'selected' : ''} key={location.id} onClick={() => select(locationIndex)}>{location.name[language]}</button>)}
    </div>
    <div className="restaurant-carousel" ref={viewportRef} aria-busy={moving} style={{ '--restaurant-card-width': `${cardWidth}px` } as CSSProperties}>
      <div className={`restaurant-track ${transitionEnabled ? '' : 'is-resetting'}`} style={{ width: 'max-content', transform: `translate3d(${viewportWidth / 2 - cardWidth / 2 - index * (cardWidth + gap)}px,0,0)`, transition: transitionEnabled ? 'transform 520ms cubic-bezier(.25,.78,.28,1)' : 'none', opacity: viewportWidth ? 1 : 0 }} onTransitionEnd={event => { if (event.target === event.currentTarget && event.propertyName === 'transform') settle(); }}>
        {slides.map((location, slideIndex) => <div className={`restaurant-slide ${slideIndex === index ? 'current' : ''}`} key={`${location.id}-${slideIndex}`} style={{ width: cardWidth }} aria-hidden={slideIndex !== index} inert={slideIndex !== index}>
          <RestaurantCard location={location} language={language} t={t} />
        </div>)}
      </div>
      <div className="restaurant-controls">
      <button type="button" className="restaurant-arrow restaurant-prev" aria-label={t.previousRestaurant} onClick={() => advance(-1)}><ArrowLeft size={21} /></button>
      <button type="button" className="restaurant-arrow restaurant-next" aria-label={t.nextRestaurant} onClick={() => advance(1)}><ArrowRight size={21} /></button>
      </div>
    </div>
    <noscript><style>{`#restaurants .restaurant-carousel, #restaurants .restaurant-tabs { display: none; }`}</style><div className="restaurant-static-grid content-width">{locations.map(location => <RestaurantCard key={location.id} location={location} language={language} t={t} />)}</div></noscript>
    <p className="sr-only" aria-live="polite">Big Bowl {locations[activeIndex].name[language]}</p>
  </section>;
}
function RestaurantCard({ location, language, t }: { location: Location; language: 'pt' | 'en'; t: typeof import('@/lib/content').copy.pt | typeof import('@/lib/content').copy.en }) {
  return <article className="restaurant-card"><div className="restaurant-card-image"><Image src={location.image} alt={`${t.location} Big Bowl ${location.name[language]}`} fill sizes="(max-width: 700px) 85vw, 500px" style={{ objectPosition: location.imagePosition }} /></div>
    <div className="restaurant-card-body"><div className="restaurant-card-top"><div><h3>{location.name[language]}</h3></div><div className="restaurant-rating"><Star size={15} fill="currentColor" />{location.rating.toFixed(1)}</div></div>
      {location.address && <p className="restaurant-address"><MapPin size={15} />{location.address}</p>}
      {location.hours && <p className="restaurant-hours">{location.hours[language]}</p>}
      <div className="restaurant-card-actions"><a href={location.mapUrl} target="_blank" rel="noopener noreferrer">{t.viewMap}<ArrowUpRight size={17} /></a><a href={location.reservationUrl} className="restaurant-reserve">{t.bookTable}<ArrowUpRight size={17} /></a></div>
    </div>
  </article>;
}
