import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { siteUrl } from '@/lib/site';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
const body = localFont({ src: '../fonts/inter.woff2', variable: '--font-body', display: 'swap', weight: '100 1000' });
export const metadata: Metadata = {
  metadataBase: siteUrl,
  alternates: { canonical: '/' },
  title: 'Big Bowl · Lisboa',
  description: 'Big Bowl / 来一碗. Restaurantes de cozinha chinesa em Lisboa.',
  openGraph: { title: 'Big Bowl · Lisboa', description: 'Big Bowl / 来一碗. Restaurantes de cozinha chinesa em Lisboa.', type: 'website', locale: 'pt_PT', siteName: 'Big Bowl', url: '/', images: [{ url: '/images/social-preview.jpg', width: 1200, height: 630, alt: 'Big Bowl Roma · Lisboa' }] },
  twitter: { card: 'summary_large_image', title: 'Big Bowl · Lisboa', description: 'Sabores asiáticos para partilhar em Lisboa.', images: ['/images/social-preview.jpg'] },
  icons: { icon: '/images/favicon.png' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-PT"><body className={body.variable}><LanguageProvider>{children}</LanguageProvider></body></html>;
}
