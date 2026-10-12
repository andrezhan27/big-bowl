import type { Metadata } from 'next';
import { locations } from '@/lib/content';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ReservationPage } from '@/components/ReservationPage';
import { SkipLink } from '@/components/SkipLink';
export const metadata: Metadata = { title: 'Reservar mesa · Big Bowl Lisboa', description: 'Escolha um restaurante Big Bowl em Lisboa.' };
export default async function Page({ searchParams }: { searchParams: Promise<{ branch?: string }> }) {
  const { branch } = await searchParams;
  const initialBranch = locations.find(location => location.id === branch)?.id ?? locations[0].id;
  return <><SkipLink /><Navbar /><main id="main"><ReservationPage initialBranch={initialBranch} /></main><Footer /></>;
}
