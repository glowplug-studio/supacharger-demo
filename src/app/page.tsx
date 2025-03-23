import SCFooter from '@/components/sc_demo/sc_footer';
import SCFooterAuthed from '@/components/sc_demo/sc_footer-session';
import { SCHeaderSession } from '@/components/sc_demo/sc_header-session';
import SCMarketngLanding from '@/components/sc_demo/sc_marketing-landing';
import SCUserDash from '@/components/sc_demo/sc_user-dash';
import { isLoggedIn } from '@/utils/supabase/server';

import { SCMarketingMenu } from  "../components/sc_demo/sc_header-marketing";

export default async function RootPage() {

  const session = await isLoggedIn();

  return (
<>
      {session ? (<>
        <SCHeaderSession />
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
</>

  );

}

