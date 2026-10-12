'use client';
import { useLanguage } from './LanguageProvider';
export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  return <div className="language-toggle" role="group" aria-label={t.language}>{(['pt','en'] as const).map(value => <button key={value} type="button" className={language === value ? 'selected' : ''} aria-pressed={language === value} onClick={() => setLanguage(value)}>{value.toUpperCase()}</button>)}</div>;
}
