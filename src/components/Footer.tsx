'use client';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';
import { brand } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
export function Footer() {
  const { t } = useLanguage();
  return <footer className="site-footer"><div className="content-width footer-main"><div><div className="footer-logo"><Image src={brand.logo} alt={`${brand.name} ${brand.chineseName}`} fill sizes="180px" /></div><p>{t.footerLine}</p></div><a href="#home" className="back-to-top">{t.backTop}<ArrowUp size={17} /></a></div><div className="content-width footer-bottom"><span>© {new Date().getFullYear()} {brand.name}. {t.rights}</span><span>{t.photoNote}</span></div></footer>;
}
