'use client';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { locations } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
export function RestaurantsSection() {
  const { language, t } = useLanguage();
  return <section id="restaurants" className="restaurants-section" aria-labelledby="restaurants-title"><div className="content-width">
    <div className="section-heading restaurants-heading"><p className="eyebrow">{t.location} · {t.city}</p><h2 id="restaurants-title">{t.ourRestaurants}</h2><p>{t.restaurantsIntro}</p></div>
    <div className="restaurants-grid">{locations.map(location => <article className="location-card" key={location.id}>
      <div className="location-image"><Image src={location.image} alt={`${t.location} Big Bowl ${location.name[language]}`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectPosition: location.imagePosition }} /></div>
      <div className="location-details"><div><span className="location-index"><MapPin size={14} /> Big Bowl · {t.city}</span><h3>{location.name[language]}</h3>{location.address && <p>{location.address}</p>}{location.hours && <p className="location-hours">{location.hours[language]}</p>}</div>
        <div className="location-actions">{location.mapUrl && <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">{t.directions}<ArrowUpRight size={16} /></a>}{(location.reservationUrl || location.phone) && <a href={location.reservationUrl ?? `tel:${location.phone}`}>{t.reserve}<ArrowUpRight size={16} /></a>}</div>
      </div>
    </article>)}</div>
  </div></section>;
}
