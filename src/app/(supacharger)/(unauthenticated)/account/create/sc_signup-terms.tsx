import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function SignupTerms() {
  const tAuthTerms = useTranslations('AuthTerms');
  const tGlobal = useTranslations('Global');

  // Get the translated site title string once
  const siteTitleText = tGlobal('siteTitle');

  return (
    <div className='mb-4 mt-6 text-xs'>
      {tAuthTerms.rich('signUpTermsAgreement', {
        siteTitle: () => <span className=''>{siteTitleText}</span>,
        termsLink: (children) => (
          <Link href='/legal#terms-of-use' target='_blank' className='sclink underline'>
            {children}
          </Link>
        ),
        privacyLink: (children) => (
          <Link href='/legal#privacy-policy' target='_blank' className='sclink underline'>
            {children}
          </Link>
        ),
      })}
    </div>
  );
}
