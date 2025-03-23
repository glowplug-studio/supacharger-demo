import SCFooter from '@/components/sc_demo/sc_footer';
import SCFooterAuthed from '@/components/sc_demo/sc_footer-authed';
import SCMarketngLanding from '@/components/sc_demo/sc_marketing-landing';
import SCUserDash from '@/components/sc_demo/sc_user-dash';
import { isLoggedIn } from '@/utils/supabase/server';

import { SCMarketingMenu } from  "../components/sc_demo/sc_marketing-header";

export default async function RootPage() {

  const session = await isLoggedIn();

  return (

    <section className='relative overflow-hidden lg:overflow-visible bg-gray-800'>

      {session ? (<>
        <SCUserDash></SCUserDash>
        <SCFooterAuthed />
        </>
      ) : (
        <>
          <SCMarketingMenu />
          <SCMarketngLanding></SCMarketngLanding>
          <SCFooter />
        </>
      )}

  </section>
  );

}

