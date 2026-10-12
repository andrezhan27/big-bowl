'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { brand } from '@/lib/content';
import { legalLinks, loadRestaurantLegal, type RestaurantLegal } from '@/lib/restaurant-legal';
import { useLanguage } from './LanguageProvider';
const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/bigbowl.pt/' },
  { label: 'Facebook', href: 'https://www.facebook.com/p/BIG-BOWL-100090482812269/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@bigbowl_2023' },
];
export function Footer() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const [records, setRecords] = useState<RestaurantLegal[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    loadRestaurantLegal(controller.signal).then(setRecords).catch(error => {
      if (!controller.signal.aborted) console.warn('Restaurant legal links are unavailable.', error);
    });
    return () => controller.abort();
  }, []);
  const policies = [
    { field: 'privacy_policy_url' as const, label: language === 'pt' ? 'Política de privacidade' : 'Privacy policy' },
    { field: 'terms_and_conditions_url' as const, label: language === 'pt' ? 'Termos e condições' : 'Terms and conditions' },
  ];
  return <footer className="site-footer">
    <div className="content-width footer-main">
      <div><div className="footer-logo"><Image src={brand.logoLight} alt={`${brand.name} ${brand.chineseName}`} fill sizes="350px" /></div><p>{t.footerLine}</p></div>
      <div className="footer-links">
        <nav className="footer-sections" aria-label={language === 'pt' ? 'Secções' : 'Sections'}>{[{ id: 'restaurants', label: t.restaurants }, { id: 'menu', label: t.menu }, { id: 'reviews', label: t.reviews }].map(link => <a key={link.id} href={`${pathname === '/' ? '' : '/'}#${link.id}`}>{link.label}</a>)}</nav>
        <div className="footer-socials" aria-label={language === 'pt' ? 'Redes sociais' : 'Social media'}>{socialLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</div>
        <div className="footer-legal">
          <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer">Livro de Reclamações</a>
          {policies.flatMap(policy => {
            const links = legalLinks(records, policy.field);
            return links.map(link => <a key={`${policy.field}-${link.href}`} href={link.href} target="_blank" rel="noopener noreferrer">{policy.label}{links.length > 1 ? ` · ${link.branches.map(branch => branch.name[language]).join(', ')}` : ''}</a>);
          })}
        </div>
        <a href={pathname === '/' ? '#home' : '/#home'} className="back-to-top">{t.backTop}<ArrowUp size={17} /></a>
      </div>
    </div>
    <div className="content-width footer-bottom"><span>2026 Big Bowl. Designed by <a href="https://intelis.pt" target="_blank" rel="noopener noreferrer">Intelis</a>. All rights reserved</span></div>
  </footer>;
}
