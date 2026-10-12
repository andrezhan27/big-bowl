'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, Clock3, ArrowUpRight } from 'lucide-react';
import { locations } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
import { CTA } from './CTA';
export function ContactReservations() {
  const { language, t } = useLanguage();
  const [selectedId, setSelectedId] = useState(locations[0]?.id);
  const location = locations.find(item => item.id === selectedId) ?? locations[0];
  const reduce = useReducedMotion();
  const details = location ? [
    { icon: MapPin, label: t.address, content: location.address, href: location.mapUrl },
    { icon: Phone, label: t.phone, content: location.phone, href: location.phone ? `tel:${location.phone}` : undefined },
    { icon: Clock3, label: t.hours, content: location.hours?.[language], href: undefined },
  ].filter(item => item.content) : [];
  return <section id="contact" className="contact-section" aria-labelledby="contact-title"><motion.div className="content-width" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65, ease: 'easeOut' }}>
    <div className="section-heading contact-heading"><p className="eyebrow">{t.visit}</p><h2 id="contact-title">{t.contactTitle}</h2><p>{t.contactIntro}</p></div>
    <div className="contact-rule" />
    <div className="contact-grid"><div className="contact-info">
      <label htmlFor="location-select" className="field-label">{t.selectLocation}</label>
      <select id="location-select" value={selectedId} onChange={event => setSelectedId(event.target.value)}>{locations.map(item => <option value={item.id} key={item.id}>Big Bowl {item.name[language]}</option>)}</select>
      <div className="contact-location-name">Big Bowl <strong>{location?.name[language]}</strong></div>
      {details.map(({ icon: Icon, label, content, href }) => <div className="contact-detail" key={label}><Icon size={20} strokeWidth={1.7} /><div><span>{label}</span>{href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{content}<ArrowUpRight size={15} /></a> : <p>{content}</p>}</div></div>)}
    </div><div className="reservation-info"><p className="eyebrow">Big Bowl · {location?.name[language]}</p><h3>{t.bookingTitle}</h3><p>{t.bookingCopy}</p>
      {location?.reservationUrl && <><div className="booking-frame"><iframe src={location.reservationUrl} title={`${t.reserve} · Big Bowl ${location.name[language]}`} loading="lazy" /></div><CTA href={location.reservationUrl} target="_blank" variant="light">{t.bookingDirect}</CTA></>}
      {!location?.reservationUrl && !location?.phone && location && <div className="contact-photo"><Image src={location.image} alt={`${t.location} Big Bowl ${location.name[language]}`} fill sizes="(max-width: 600px) 100vw, 55vw" style={{ objectPosition: location.imagePosition }} /></div>}
      {!location?.reservationUrl && location?.phone && <CTA href={`tel:${location.phone}`} variant="light">{t.bookTable}</CTA>}
    </div></div><div className="contact-rule" />
  </motion.div></section>;
}
