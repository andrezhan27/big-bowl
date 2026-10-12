'use client';
import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { copy, type Language } from '@/lib/content';
type LanguageContextValue = { language: Language; setLanguage: (value: Language) => void; t: typeof copy.pt | typeof copy.en };
const LanguageContext = createContext<LanguageContextValue | null>(null);
const eventName = 'big-bowl-language-change';
function getSnapshot(): Language { try { return localStorage.getItem('big-bowl-language') === 'en' ? 'en' : 'pt'; } catch { return 'pt'; } }
function subscribe(listener: () => void) { window.addEventListener(eventName, listener); window.addEventListener('storage', listener); return () => { window.removeEventListener(eventName, listener); window.removeEventListener('storage', listener); }; }
function setStoredLanguage(value: Language) { localStorage.setItem('big-bowl-language', value); window.dispatchEvent(new Event(eventName)); }
export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, (): Language => 'pt');
  useEffect(() => { document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en'; delete document.documentElement.dataset.pendingLang; }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage: setStoredLanguage, t: copy[language] }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { const value = useContext(LanguageContext); if (!value) throw new Error('LanguageProvider missing'); return value; }
