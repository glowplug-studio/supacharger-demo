import Link from 'next/link';
import SiteLogoSVG from '../assets/images/SiteLogoSVG.svg';
import { SC_SITE_DESCRIPTION, SC_SITE_TITLE } from "@/supacharger/supacharger-config";

interface LogoProps {
  showSiteTitle?: boolean | null;
  darkMode?: boolean | null;
}

export default function SiteLogo({ showSiteTitle, darkMode }: LogoProps) {
  const site_title = SC_SITE_TITLE;

  return (
    //@TODO handle session state - of theres a sesson then switch this href value based on the src/supacharger/supacharger-config.ts SC_NO_SESSION_HOME_PATH and SC_SESSION_HOME_PATH
    <Link href='/' className='flex w-fit items-center gap-2'>
      <SiteLogoSVG></SiteLogoSVG>
      {
        showSiteTitle ? (
          <span
          className={`${darkMode ? 'text-white' : 'text-gray-700'} text-xl font-semibold`}
        >
          {site_title}
        </span>
      ) : null 
      }
    </Link>
  );
}
