'use client';
import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { copy, type Language } from '@/lib/content';
type LanguageContextValue = { language: Language; setLanguage: (value: Language) => void; t: typeof copy.pt | typeof copy.en };
const LanguageContext = createContext<LanguageContextValue | null>(null);
const eventName = 'big-bowl-language-change';
let sessionLanguage: Language | undefined;
function getSnapshot(): Language {
  if (sessionLanguage) return sessionLanguage;
  try { return localStorage.getItem('big-bowl-language') === 'en' ? 'en' : 'pt'; } catch { return 'pt'; }
}
function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === 'big-bowl-language') { sessionLanguage = undefined; listener(); }
  };
  window.addEventListener(eventName, listener);
  window.addEventListener('storage', onStorage);
  return () => { window.removeEventListener(eventName, listener); window.removeEventListener('storage', onStorage); };
}
function setStoredLanguage(value: Language) {
  sessionLanguage = value;
  try { localStorage.setItem('big-bowl-language', value); } catch { /* Keep switching languages when storage is unavailable. */ }
  window.dispatchEvent(new Event(eventName));
}
export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, (): Language => 'pt');
  useEffect(() => { document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en'; }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage: setStoredLanguage, t: copy[language] }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { const value = useContext(LanguageContext); if (!value) throw new Error('LanguageProvider missing'); return value; }
