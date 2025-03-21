import Link from 'next/link';
import SiteLogoSVG from '../assets/images/SiteLogoSVG.svg';
import { siteDescription, siteTitle } from "@/supacharger/supacharger-config";

interface LogoProps {
  showSiteTitle?: boolean | null;
  darkMode?: boolean | null;
}

export default function SiteLogo({ showSiteTitle, darkMode }: LogoProps) {
  const site_title = siteTitle;

  return (
    //@TODO handle session state - of theres a sesson then switch this href value based on the src/supacharger/supacharger-config.ts unauthedHomePath and authedHomePath
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
