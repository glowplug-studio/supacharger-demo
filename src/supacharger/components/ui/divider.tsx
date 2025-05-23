import { useTranslations } from 'next-intl';

export function UIDivider() {
    const tGlobal = useTranslations('Global');
  return (
    <div className='flex items-center gap-4'>
      <hr className='flex-1 border-gray-300' />
      <span className='text-gray-400'>{tGlobal('or')}</span>
      <hr className='flex-1 border-gray-300' />
    </div>
  );
}
