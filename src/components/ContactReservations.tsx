'use client';
import { useState } from 'react';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { locations } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
export function ContactReservations() {
  const { language, t } = useLanguage();
  const [selectedId, setSelectedId] = useState(locations[0].id);
  const location = locations.find(item => item.id === selectedId) ?? locations[0];
  const reservationHref = location.reservationUrl ?? (location.phone ? `tel:${location.phone}` : location.mapUrl);
  const external = reservationHref?.startsWith('http');
  return <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="contact-shell">
    <div className="contact-intro"><div><p className="eyebrow">{t.visit}</p><h2 id="contact-title"><CalendarDays aria-hidden="true" size={34} strokeWidth={1.4} />{t.contactTitle}</h2><p>{t.bookingCopy}</p></div>
      <div className="contact-booking"><label htmlFor="location-select" className="field-label">{t.selectLocation}</label><div className="contact-booking-controls"><select id="location-select" value={selectedId} onChange={event => setSelectedId(event.target.value)}>{locations.map(item => <option value={item.id} key={item.id}>Big Bowl {item.name[language]}</option>)}</select><a className="contact-reserve-cta" href={reservationHref} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{t.bookTable}<ArrowUpRight size={20} /></a></div></div>
    </div>
    <div className="map-frame"><iframe key={location.id} src={location.mapEmbed} title={`${t.viewMap} · Big Bowl ${location.name[language]}`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
    <div className="map-footer"><span>Big Bowl · {location.name[language]}</span><a href={location.mapUrl} target="_blank" rel="noopener noreferrer">{t.viewMap}<ArrowUpRight size={16} /></a></div>
  </div></section>;
}
