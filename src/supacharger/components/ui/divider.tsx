import { useTranslations } from 'next-intl';

interface UIDividerProps {
  text?: string;
}

export function UIDivider({ text }: UIDividerProps) {
  const tGlobal = useTranslations('Global');
  const displayText = text || tGlobal('or');

  return (
    <div className='flex items-center gap-4'>
      <hr className='flex-1 border-gray-300' />
      <span className='text-gray-400 text-sm'>{displayText}</span>
      <hr className='flex-1 border-gray-300' />
    </div>
  );
}
