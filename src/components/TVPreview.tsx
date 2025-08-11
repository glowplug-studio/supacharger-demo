'use client';

import { useEffect,useState } from 'react';

import TVPreviewModal from '@/components/ui/tv-preview-modal';

import TVContainer from './tv/TVContainer';
import TVContainerLarge from './tv/TVContainerLarge';
import TVExpandButton from './tv/TVExpandButton';

export default function TVPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    window.addEventListener('openTVModal', handleOpenModal);

    return () => {
      window.removeEventListener('openTVModal', handleOpenModal);
    };
  }, []);

  const handleExpandClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="lg:col-span-1 space-y-4">
      <div className="sticky top-8 h-full" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
        <div className="flex justify-center w-full h-full">
          <TVContainer />
        </div>
      </div>

      {/* TV Preview Modal */}
      <TVPreviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TVContainerLarge />
      </TVPreviewModal>
    </div>
  );
}