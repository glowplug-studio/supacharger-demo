
import {getTranslations} from 'next-intl/server';

export default async function Billing() {

  const t = await getTranslations('Billing');

  return <>
    <h1>{t('title')}</h1>
  </>
}