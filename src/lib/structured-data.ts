import { locations } from './content';
import { siteUrl } from './site';

const details: Record<string, { street: string; postcode: string; hours: string[] }> = {
  roma: { street: 'Av. de Roma', postcode: '1000-262', hours: ['Mo-Su 12:00-23:00'] },
  telheiras: { street: 'R. Prof. Carlos Teixeira 7A', postcode: '1600-608', hours: ['Mo,Tu,Th,Fr 12:00-15:30', 'Mo,Tu,Th,Fr 18:30-23:00', 'Sa,Su 12:00-23:00'] },
  spacio: { street: 'R. Cidade de Bolama', postcode: '1800-079', hours: ['Mo-Su 11:00-23:00'] },
};
export const restaurantStructuredData = {
  '@context': 'https://schema.org',
  '@graph': locations.map(location => ({
    '@type': 'Restaurant',
    '@id': new URL(`/#${location.id}`, siteUrl).href,
    name: `Big Bowl ${location.name.pt}`,
    url: new URL(location.reservationUrl, siteUrl).href,
    image: new URL(location.image, siteUrl).href,
    servesCuisine: 'Chinese',
    hasMap: location.mapUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: details[location.id].street,
      addressLocality: 'Lisboa',
      postalCode: details[location.id].postcode,
      addressCountry: 'PT',
    },
    openingHours: details[location.id].hours,
  })),
};
