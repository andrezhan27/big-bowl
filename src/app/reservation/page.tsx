import type { Metadata } from 'next';
import { locations } from '@/lib/content';
import { Navbar } from '@/components/Navbar';
import { ReservationPage } from '@/components/ReservationPage';
import { SkipLink } from '@/components/SkipLink';
export const metadata: Metadata = { title: 'Reservar mesa · Big Bowl Lisboa', description: 'Escolha um restaurante Big Bowl em Lisboa e reserve a sua mesa.', alternates: { canonical: '/reservation' }, openGraph: { title: 'Reservar mesa · Big Bowl Lisboa', description: 'Escolha um restaurante Big Bowl em Lisboa e reserve a sua mesa.', url: '/reservation', images: ['/images/social-preview.jpg'] } };
export default async function Page({ searchParams }: { searchParams: Promise<{ branch?: string | string[] }> }) {
  const { branch } = await searchParams;
  const initialBranch = locations.find(location => (location.databaseId === branch || location.id === branch))?.databaseId ?? locations[0].databaseId;
  return <><SkipLink /><Navbar /><main id="main"><ReservationPage initialBranch={initialBranch} /></main></>;
}
