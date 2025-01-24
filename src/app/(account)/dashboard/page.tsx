import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/utils/helpers'

import {getTranslations} from 'next-intl/server';

export default async function Dashboard() {

  const t = await getTranslations('HomePage');

  
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return <p>Nothing to show</p>
  }

  console.log(data);

  return <>

<h1>{t('title')}</h1>
  
  <p>Hello {data.user.email}</p>

  </>
}