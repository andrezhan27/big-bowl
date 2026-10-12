'use client';
import { useState } from 'react';
import { locations } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
export function ReservationPage({ initialBranch }: { initialBranch: string }) {
  const { language, t } = useLanguage();
  const [selectedId, setSelectedId] = useState(initialBranch);
  const restaurantInfo = locations.find(item => item.databaseId === selectedId) ?? locations[0];
  function select(id: string) {
    setSelectedId(id);
    window.history.replaceState(null, '', `/reservation?branch=${encodeURIComponent(id)}`);
  }
  return <section className="reservation-page" aria-labelledby="reservation-title">
    <h1 id="reservation-title" className="sr-only">{t.bookTable}</h1>
    <div className="reservation-branch-picker"><label htmlFor="reservation-location" className="field-label">{t.selectLocation}</label><select id="reservation-location" value={restaurantInfo.databaseId} onChange={event => select(event.target.value)}>{locations.map(item => <option key={item.id} value={item.databaseId}>Big Bowl {item.name[language]}</option>)}</select></div>
    <div className="reservation-widget"><iframe key={restaurantInfo.id} className="block h-full w-full border-0" loading="eager" src={restaurantInfo.reservationWidgetUrl} title="Big Bowl Reservation Form" /></div>
  </section>;
}
