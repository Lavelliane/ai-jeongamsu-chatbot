import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const localeCookie = cookieStore.get('locale');

  const locale = localeCookie?.value || 'kr';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
