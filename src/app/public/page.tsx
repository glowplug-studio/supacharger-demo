import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function Public() {

  return <>
  <h1>This is a public facing page</h1>
  <p>This has been allowed in src/utils/supabase/middleware.ts</p>
  </>
}