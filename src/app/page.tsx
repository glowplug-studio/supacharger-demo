import Image from 'next/image';
import Link from 'next/link';
import ExampleDash from '@/supacharger/components/exampleDash';
import ExampleHero from '@/supacharger/components/exampleHero';
import { useTranslations } from 'next-intl';

export default function RootPage() {

  return (
    <div className='flex flex-col gap-8 lg:gap-32'>
      <HeroSection />
    </div>
  );
}

function HeroSection() {

  const t = useTranslations('AuthedFeed')

  return (
    <section className='relative overflow-hidden lg:overflow-visible bg-gray-800'>

      <ExampleDash></ExampleDash>

      <ExampleHero></ExampleHero>

    </section>
  );
}