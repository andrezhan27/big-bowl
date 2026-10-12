export type Language = 'pt' | 'en';
export type Localized = Record<Language, string>;
export type Location = {
  id: string;
  name: Localized;
  image: string;
  imagePosition: string;
  address?: string;
  mapUrl?: string;
  phone?: string;
  hours?: Localized;
  reservationUrl?: string;
};
export const brand = {
  name: 'Big Bowl',
  chineseName: '来一碗',
  logo: '/images/logo-nav.png',
  menuUrl: undefined as string | undefined,
};
// Names are taken from supplied image filenames. Add operational details only after verification.
export const locations: Location[] = [
  { id: 'roma', name: { pt: 'Roma', en: 'Roma' }, image: '/images/space-roma-outer.png', imagePosition: 'center' },
  { id: 'telheiras', name: { pt: 'Telheiras', en: 'Telheiras' }, image: '/images/space-telheiras.png', imagePosition: 'center' },
  { id: 'spacio', name: { pt: 'Spacio', en: 'Spacio' }, image: '/images/space-spacio.png', imagePosition: 'center' },
];
export const dishes = [
  { image: '/images/food-noodle.png', title: { pt: 'Noodles de vaca', en: 'Beef noodles' }, description: { pt: 'Caldo, vaca e ervas frescas', en: 'Broth, beef and fresh herbs' } },
  { image: '/images/food-noodle-2.png', title: { pt: 'Noodles com camarão', en: 'Prawn noodles' }, description: { pt: 'Camarão, legumes e lima', en: 'Prawns, vegetables and lime' } },
  { image: '/images/food-noodle-3.png', title: { pt: 'Noodles picantes', en: 'Spicy noodles' }, description: { pt: 'Vaca, ovo e caldo aromático', en: 'Beef, egg and aromatic broth' } },
  { image: '/images/food-noodle-4.png', title: { pt: 'Noodles de marisco', en: 'Seafood noodles' }, description: { pt: 'Camarão, verduras e sésamo', en: 'Prawns, greens and sesame' } },
  { image: '/images/food-dumpling.png', title: { pt: 'Dumplings', en: 'Dumplings' }, description: { pt: 'Pequenos pratos para partilhar', en: 'Small plates to share' } },
  { image: '/images/food-bao.png', title: { pt: 'Bao', en: 'Bao' }, description: { pt: 'Macio, quente e cheio de sabor', en: 'Soft, warm and full of flavour' } },
];
export const copy = {
  pt: {
    skip: 'Saltar para o conteúdo', home: 'Início', menu: 'Menu', restaurants: 'Restaurantes', contact: 'Contactos', reserve: 'Reservar',
    menuOpen: 'Abrir menu', menuClose: 'Fechar menu', language: 'Escolher idioma',
    heroEyebrow: 'Lisboa · cozinha chinesa', heroLine: 'Uma boa refeição começa com uma boa taça.', bookTable: 'Reservar mesa', viewMenu: 'Ver menu', explore: 'Descobrir',
    specialties: 'Especialidades', menuNote: 'Alguns sabores que nos definem.', pause: 'Pausar movimento', play: 'Retomar movimento', fullMenu: 'Explorar especialidades',
    ourRestaurants: 'Os nossos restaurantes', restaurantsIntro: 'Encontre a sua próxima mesa em Lisboa.', location: 'Local', directions: 'Como chegar',
    visit: 'Visite-nos', contactTitle: 'Contactos e reservas', contactIntro: 'Escolha o restaurante e venha ter connosco.', selectLocation: 'Escolher restaurante', address: 'Morada', phone: 'Telefone', hours: 'Horário',
    bookingTitle: 'À sua espera', bookingCopy: 'Escolha o espaço que lhe fica mais perto e venha sentar-se à mesa.', bookingDirect: 'Abrir reservas',
    city: 'Lisboa', footerLine: 'Uma taça de cada vez, em Lisboa.', backTop: 'Voltar ao início', rights: 'Todos os direitos reservados.', photoNote: 'Fotografias dos nossos espaços e pratos.',
  },
  en: {
    skip: 'Skip to content', home: 'Home', menu: 'Menu', restaurants: 'Restaurants', contact: 'Contact', reserve: 'Book',
    menuOpen: 'Open menu', menuClose: 'Close menu', language: 'Choose language',
    heroEyebrow: 'Lisbon · Chinese food', heroLine: 'A good meal begins with a good bowl.', bookTable: 'Book a table', viewMenu: 'View menu', explore: 'Explore',
    specialties: 'Our specialties', menuNote: 'A few flavours that define us.', pause: 'Pause movement', play: 'Resume movement', fullMenu: 'Explore specialties',
    ourRestaurants: 'Our restaurants', restaurantsIntro: 'Find your next table in Lisbon.', location: 'Location', directions: 'Get directions',
    visit: 'Visit us', contactTitle: 'Contact and reservations', contactIntro: 'Choose a restaurant and come by.', selectLocation: 'Choose a restaurant', address: 'Address', phone: 'Phone', hours: 'Hours',
    bookingTitle: 'See you soon', bookingCopy: 'Choose the space nearest to you and join us at the table.', bookingDirect: 'Open bookings',
    city: 'Lisbon', footerLine: 'One bowl at a time, in Lisbon.', backTop: 'Back to top', rights: 'All rights reserved.', photoNote: 'Photographs of our spaces and dishes.',
  }
} as const;
export type Copy = typeof copy.pt;
