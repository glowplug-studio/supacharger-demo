import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en'; // Fallback to 'en'

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
