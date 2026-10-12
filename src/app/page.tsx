import { SkipLink } from '@/components/SkipLink';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { RestaurantsSection } from '@/components/RestaurantsSection';
import { ContactReservations } from '@/components/ContactReservations';
import { Footer } from '@/components/Footer';
export default function Home() {
  return <><SkipLink /><Navbar /><main id="main"><Hero /><MenuSection /><RestaurantsSection /><ContactReservations /></main><Footer /></>;
}
