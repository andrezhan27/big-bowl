import { SkipLink } from '@/components/SkipLink';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { RestaurantsSection } from '@/components/RestaurantsSection';
import { ContactReservations } from '@/components/ContactReservations';
import { Footer } from '@/components/Footer';
export default function Home() {
  return <><SkipLink /><Navbar /><main id="main"><Hero /><RestaurantsSection /><MenuSection /><ReviewsSection /><ContactReservations /></main><Footer /></>;
}
