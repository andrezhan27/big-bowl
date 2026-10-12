'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { brand } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
import { LanguageToggle } from './LanguageToggle';
export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const prefix = pathname === '/' ? '' : '/';
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(pathname === '/' ? 'home' : '');
  const navRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const links = [
    { id: 'home', label: t.home }, { id: 'restaurants', label: t.restaurants },
    { id: 'menu', label: t.menu }, { id: 'reviews', label: t.reviews },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-25% 0px -50% 0px', threshold: [0, .2, .5] });
    document.querySelectorAll('#home,#restaurants,#menu,#reviews').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } };
    const onDown = (event: PointerEvent) => { if (!navRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('keydown', onKey); document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [open]);
  function closeMenu() { setOpen(false); }
  const item = (link: typeof links[number]) => <a key={link.id} href={`${prefix}#${link.id}`} className={`nav-link ${active === link.id ? 'active' : ''}`} aria-current={active === link.id ? 'location' : undefined} onClick={closeMenu}>{link.label}</a>;
  return <nav className="floating-nav" ref={navRef} aria-label={t.menu}>
    <div className="nav-bar">
      <div className="nav-side nav-left">{[links[0], links[1]].map(item)}</div>
      <a href={`${prefix}#home`} className="nav-brand" aria-label={`${brand.name} — ${t.home}`} onClick={closeMenu}><Image src={brand.logo} alt={`${brand.name} ${brand.chineseName}`} fill sizes="120px" priority /></a>
      <div className="nav-side nav-right">{[links[2], links[3]].map(item)}</div>
      <div className="nav-actions"><LanguageToggle /><a href="/reservation?branch=bigbowlroma" className="nav-reserve" onClick={closeMenu}>{t.reserve}</a></div>
      <div className="mobile-lang"><LanguageToggle /></div>
      <button ref={menuButton} className="mobile-menu-button" type="button" aria-expanded={open} aria-controls="mobile-nav-panel" aria-label={open ? t.menuClose : t.menuOpen} onClick={() => setOpen(value => !value)}>{open ? <X size={23} /> : <MenuIcon size={23} />}</button>
    </div>
    <div id="mobile-nav-panel" className={`mobile-nav-panel ${open ? 'is-open' : ''}`} inert={!open}>
      {links.map(item)}<a className="mobile-book" href="/reservation?branch=bigbowlroma" onClick={closeMenu}>{t.reserve}</a>
    </div>
  </nav>;
}
