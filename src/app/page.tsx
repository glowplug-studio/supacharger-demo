import SCFooter from '@/components/sc_demo/sc_footer';
import SCFooterSession from '@/components/sc_demo/sc_footer-session';
import { SCHeaderSession } from '@/components/sc_demo/sc_header-session';
import SCMarketngLanding from '@/components/sc_demo/sc_marketing-landing';
import SCUserDash from '@/components/sc_demo/sc_user-dash';
import { isLoggedIn } from '@/supacharger/libs/supabase/supabase-server-client';

import { SCMarketingMenu } from  "../components/sc_demo/sc_header-marketing";

export default async function RootPage() {

  const session = await isLoggedIn();

  return (
<>
      {session ? (<>
        <SCHeaderSession />
        <SCUserDash></SCUserDash>
        <SCFooterSession />
        </>
      ) : (
        <>
          <SCMarketingMenu />
          <SCMarketngLanding></SCMarketngLanding>
          <SCFooter />
        </>
      )}
</>

  );

}

