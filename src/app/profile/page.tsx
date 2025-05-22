import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import { createClient } from '@/supacharger/libs/supabase/supabase-server-client'

export default async function Dashboard() {

  const t = await getTranslations('HomePage');
  
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return <p>Nothing to show</p>
  }

  return <>

<div>
      <div>
        <Image
          alt=""
          src="https://images.unsplash.com/photo-1688236043901-603c0e16f3ae"
          className="h-32 w-full object-cover lg:h-48"
          width={500}
          height={200}
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Image
              alt=""
              src="https://images.unsplash.com/photo-1463453091185-61582044d556"
              className="size-24 rounded-full ring-4 ring-white sm:size-32"
              width={128}
              height={128}
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold">{data.user.email}</h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-700">{data.user.email}</h1>
        </div>
      </div>
    </div>
  </>
}
