export type Language = 'pt' | 'en';
export type Localized = Record<Language, string>;
export type Location = {
  id: string;
  name: Localized;
  image: string;
  imagePosition: string;
  address?: string;
  mapUrl?: string;
  mapEmbed: string;
  rating: number;
  phone?: string;
  hours?: Localized;
  reservationUrl?: string;
};
export const brand = {
  name: 'Big Bowl',
  chineseName: '来一碗',
  logo: '/images/logo-black-trim.png',
  logoLight: '/images/logo-white-trim.png',
  menuUrl: undefined as string | undefined,
};
// Names are taken from supplied image filenames. Add operational details only after verification.
export const locations: Location[] = [
  { id: 'roma', name: { pt: 'Roma', en: 'Roma' }, image: '/images/space-roma-outer.png', imagePosition: 'center', rating: 4.8, reservationUrl: '/reservation?branch=roma', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Big%20Bowl%20Roma%20Lisboa', mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.8537893687135!2d-9.141947524024284!3d38.744117271757204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933a0d6d204ff%3A0xf75fb43566e318d9!2sBig%20Bowl%20Roma!5e0!3m2!1sen!2spt!4v1791816551693!5m2!1sen!2spt' },
  { id: 'telheiras', name: { pt: 'Telheiras', en: 'Telheiras' }, image: '/images/space-telheiras.png', imagePosition: 'center', rating: 4.7, reservationUrl: '/reservation?branch=telheiras', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Big%20Bowl%20Telheiras%20Lisboa', mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.033372356156!2d-9.17737252402333!3d38.762938571753004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193300295a044d%3A0x7ad1f1a5e1d97de2!2sBig%20Bowl%20Telheiras!5e0!3m2!1sen!2spt!4v1791816560527!5m2!1sen!2spt' },
  { id: 'spacio', name: { pt: 'Spacio', en: 'Spacio' }, image: '/images/space-spacio.png', imagePosition: 'center', rating: 4.2, reservationUrl: '/reservation?branch=spacio', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Big%20Bowl%20Restaurant%20Spacio', mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.0489108852853!2d-9.11712832402337!3d38.762582171753294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933e04fa2b567%3A0xc79e7269de00a055!2sBig%20Bowl%20Restaurant%20Spacio!5e0!3m2!1sen!2spt!4v1791816532933!5m2!1sen!2spt' },
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
    heroEyebrow: 'Restaurante Chinês', heroLine: 'Uma boa refeição começa com uma boa taça.', bookTable: 'Reservar mesa', viewMenu: 'Ver menu', explore: 'Descobrir',
    specialties: 'Especialidades', menuNote: 'Alguns sabores que nos definem.', fullMenu: 'Explorar especialidades',
    reservationIntro: 'Escolha o restaurante onde quer sentar-se.', reservationGuidance: 'Consulte a localização e os contactos disponíveis na ficha do restaurante.', reservationMap: 'Abrir ficha do restaurante', rating: 'Avaliação', reviews: 'Avaliações', reviewsIntro: 'Palavras de quem se sentou à nossa mesa.', previousRestaurant: 'Restaurante anterior', nextRestaurant: 'Restaurante seguinte', viewMap: 'Ver no mapa',
    ourRestaurants: 'Os nossos restaurantes', restaurantsIntro: 'Encontre a sua próxima mesa em Lisboa.', location: 'Local', directions: 'Como chegar',
    visit: 'Visite-nos', contactTitle: 'Reservar mesa', contactIntro: 'Escolha o restaurante e venha ter connosco.', selectLocation: 'Escolher restaurante', address: 'Morada', phone: 'Telefone', hours: 'Horário',
    bookingTitle: 'À sua espera', bookingCopy: 'Escolha o espaço que lhe fica mais perto e venha sentar-se à mesa.', bookingDirect: 'Abrir reservas',
    city: 'Lisboa', footerLine: 'Uma taça de cada vez, em Lisboa.', backTop: 'Voltar ao início', rights: 'Todos os direitos reservados.', photoNote: 'Fotografias dos nossos espaços e pratos.',
  },
  en: {
    skip: 'Skip to content', home: 'Home', menu: 'Menu', restaurants: 'Restaurants', contact: 'Contact', reserve: 'Book',
    menuOpen: 'Open menu', menuClose: 'Close menu', language: 'Choose language',
    heroEyebrow: 'Chinese Restaurant', heroLine: 'A good meal begins with a good bowl.', bookTable: 'Book a table', viewMenu: 'View menu', explore: 'Explore',
    specialties: 'Our specialties', menuNote: 'A few flavours that define us.', fullMenu: 'Explore specialties',
    reservationIntro: 'Choose the restaurant where you would like to dine.', reservationGuidance: 'See the location and available contact details on the restaurant listing.', reservationMap: 'Open restaurant listing', rating: 'Rating', reviews: 'Reviews', reviewsIntro: 'From guests who joined us at the table.', previousRestaurant: 'Previous restaurant', nextRestaurant: 'Next restaurant', viewMap: 'View on map',
    ourRestaurants: 'Our restaurants', restaurantsIntro: 'Find your next table in Lisbon.', location: 'Location', directions: 'Get directions',
    visit: 'Visit us', contactTitle: 'Book a table', contactIntro: 'Choose a restaurant and come by.', selectLocation: 'Choose a restaurant', address: 'Address', phone: 'Phone', hours: 'Hours',
    bookingTitle: 'See you soon', bookingCopy: 'Choose the space nearest to you and join us at the table.', bookingDirect: 'Open bookings',
    city: 'Lisbon', footerLine: 'One bowl at a time, in Lisbon.', backTop: 'Back to top', rights: 'All rights reserved.', photoNote: 'Photographs of our spaces and dishes.',
  }
} as const;
export type Copy = typeof copy.pt;
export type Review = { id: string; locationId: Location['id']; author: string; stars: 5; quote: Localized };
// User-provided review excerpts and ratings. English quotations preserve the supplied wording.
export const reviews: Review[] = [
  { id: 'julio', locationId: 'roma', author: 'Júlio Silva', stars: 5, quote: {
    pt: 'Comi aqui duas vezes numa semana e a comida e o serviço foram ótimos. A melhor comida asiática que comi em muito tempo e a equipa é super simpática. O ambiente também é agradável e calmo.',
    en: 'Ate here twice in a week and the food and service were great. Best Asian food I had in a while and the staff is super friendly. Nice, calm vibes inside as well.' } },
  { id: 'joana', locationId: 'roma', author: 'Joana Lopes', stars: 5, quote: {
    pt: 'Os empregados foram super simpáticos e animados! A comida é incrível!',
    en: 'Servers were super friendly and lively! Food is amazing!' } },
  { id: 'david', locationId: 'telheiras', author: 'David Silva', stars: 5, quote: {
    pt: 'Um espaço pequeno e um pouco escondido, mas a comida compensa totalmente. Os preços são bons e a equipa é simpática! Boa seleção de pratos e entradas; também se pode pedir para entrega ou levar.',
    en: 'A small somewhat hidden place but the food completely makes up for it, the prices are good and the staff are kind! Good selection of food and starters, you can also order delivery/takeout.' } },
  { id: 'lorenzo', locationId: 'telheiras', author: 'LorenzoB', stars: 5, quote: {
    pt: 'Tivemos muita sorte em descobrir este lugar. Tudo o que comemos estava ótimo, desde as entradas aos pratos principais.',
    en: 'We have been super lucky to discover this place. Everything we ate was great, from the starters to the actual main dishes.' } },
  { id: 'daniel', locationId: 'spacio', author: 'Daniel Preston', stars: 5, quote: {
    pt: 'A comida era boa. A equipa ajudou-nos e tentou falar inglês connosco, a única língua que sabíamos. Vale a pena experimentar para quem gosta de comida asiática.',
    en: 'Food was good. And the staff was helpful trying to speak english with us as that was all we knew. Must try if into Asian food.' } },
  { id: 'kina', locationId: 'spacio', author: 'Kina Jin', stars: 5, quote: {
    pt: 'Comida chinesa autêntica e deliciosa! Provei o arroz de frango teriyaki e a sopa de noodles com vaca; ambos estavam excelentes. O proprietário é muito simpático e atencioso. Voltarei, recomendo!',
    en: 'Authentic and delicious Chinese food! I tried the chicken teriyaki rice and the beef noodle soup, both were excellent. The owner is very friendly and attentive. I will definitely return. I recommend it!' } },
];
