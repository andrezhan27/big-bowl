import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
const body = localFont({ src: '../fonts/inter.woff2', variable: '--font-body', display: 'swap', weight: '100 1000' });
export const metadata: Metadata = {
  title: 'Big Bowl · Lisboa',
  description: 'Big Bowl / 来一碗. Restaurantes de cozinha chinesa em Lisboa.',
  openGraph: { title: 'Big Bowl · Lisboa', description: 'Big Bowl / 来一碗. Restaurantes de cozinha chinesa em Lisboa.', type: 'website' },
  icons: { icon: '/images/favicon.png' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-PT"><head><script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('big-bowl-language')==='en')document.documentElement.dataset.pendingLang='1'}catch(e){}" }} /></head><body className={body.variable}><LanguageProvider>{children}</LanguageProvider></body></html>;
}
