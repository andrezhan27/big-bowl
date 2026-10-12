'use client';
import { useLanguage } from './LanguageProvider';
export function SkipLink() { const { t } = useLanguage(); return <a href="#main" className="skip-link">{t.skip}</a>; }
