import { locations } from './content';

export type RestaurantLegal = {
  id: string;
  privacy_policy_url: string | null;
  terms_and_conditions_url: string | null;
};

export async function loadRestaurantLegal(signal: AbortSignal): Promise<RestaurantLegal[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!baseUrl || !publishableKey) return [];

  const url = new URL('/rest/v1/restaurants', baseUrl);
  url.searchParams.set('select', 'id,privacy_policy_url,terms_and_conditions_url');
  url.searchParams.set('id', `in.(${locations.map(location => location.databaseId).join(',')})`);
  const response = await fetch(url, { headers: { apikey: publishableKey }, signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]) });
  if (!response.ok) throw new Error(`Unable to load restaurant legal links (${response.status})`);
  const records: unknown = await response.json();
  if (!Array.isArray(records)) throw new Error('Invalid restaurant legal response');
  return records.filter((record): record is RestaurantLegal =>
    record !== null && typeof record === 'object' && typeof record.id === 'string' &&
    (record.privacy_policy_url === null || typeof record.privacy_policy_url === 'string') &&
    (record.terms_and_conditions_url === null || typeof record.terms_and_conditions_url === 'string')
  );
}

export function legalLinks(records: RestaurantLegal[], field: 'privacy_policy_url' | 'terms_and_conditions_url') {
  const links = new Map<string, typeof locations>();
  for (const location of locations) {
    const href = records.find(record => record.id === location.databaseId)?.[field];
    if (!href) continue;
    try {
      if (!['https:', 'http:'].includes(new URL(href).protocol)) continue;
    } catch { continue; }
    links.set(href, [...(links.get(href) ?? []), location]);
  }
  return [...links].map(([href, branches]) => ({ href, branches }));
}
