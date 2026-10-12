'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, MapPin, Star } from 'lucide-react';
import { locations } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
export function ReservationPage({ initialBranch }: { initialBranch: string }) {
  const { language, t } = useLanguage();
  const [selectedId, setSelectedId] = useState(initialBranch);
  const location = locations.find(item => item.id === selectedId) ?? locations[0];
  function select(id: string) { setSelectedId(id); window.history.replaceState(null, '', `/reservation?branch=${encodeURIComponent(id)}`); }
  return <section className="reservation-page"><div className="content-width"><div className="reservation-page-heading"><p className="eyebrow">Big Bowl · {t.city}</p><h1>{t.bookTable}</h1><p>{t.reservationIntro}</p></div>
    <div className="reservation-page-grid"><div className="reservation-page-image"><Image src={location.image} alt={`${t.location} Big Bowl ${location.name[language]}`} fill sizes="(max-width: 800px) 100vw, 45vw" style={{ objectPosition: location.imagePosition }} /></div><div className="reservation-page-details"><label htmlFor="reservation-location" className="field-label">{t.selectLocation}</label><select id="reservation-location" value={selectedId} onChange={event => select(event.target.value)}>{locations.map(item => <option key={item.id} value={item.id}>Big Bowl {item.name[language]}</option>)}</select><h2>Big Bowl {location.name[language]}</h2><div className="reservation-page-rating"><Star size={18} fill="currentColor" />{location.rating.toFixed(1)}</div><p>{t.reservationGuidance}</p><a href={location.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={18} />{t.reservationMap}<ArrowUpRight size={18} /></a></div></div>
    <div className="reservation-page-map"><iframe key={location.id} src={location.mapEmbed} title={`${t.viewMap} · Big Bowl ${location.name[language]}`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
  </div></section>;
}
