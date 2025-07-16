'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PhonePreviewContent from './PhonePreviewContent';
import TVContainer from './tv/TVContainer';
import TVExpandButton from './tv/TVExpandButton';
import TVPreviewModal from '@/components/ui/tv-preview-modal';
import TVContainerLarge from './tv/TVContainerLarge';

export default function PreviewTabs() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpandClick = () => {
    setIsModalOpen(true);
  };

  const handleTryItOut = () => {
    router.push('/create-event/try-it-out');
  };
  return (
    <>
      <div className="sticky top-8 h-full" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="upload" className="text-sm">Upload Page Preview</TabsTrigger>
              <TabsTrigger value="gallery" className="text-sm">Gallery Page Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-0">
              <div className="flex justify-center">
                <div className="w-64 h-[500px] bg-black rounded-[2rem] p-2 shadow-xl">
                  <div className="w-full h-full bg-gray-100 rounded-[1.5rem] overflow-hidden">
                    <PhonePreviewContent />
                  </div>
                </div>
              </div>
              
              {/* Try it out button */}
              <div className="flex justify-center mt-4">
                <Button
                  variant="link"
                  onClick={handleTryItOut}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium p-0"
                >
                  <span>Try it out</span>
                  <span>→</span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="gallery" className="mt-0 space-y-4">
              <div className="flex justify-center w-full">
                <TVContainer />
              </div>
              
              <TVExpandButton onClick={handleExpandClick} />
              
              {/* Try it out button */}
              <div className="flex justify-center">
                <Button
                  variant="link"
                  onClick={handleTryItOut}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium p-0"
                >
                  <span>Try it out</span>
                  <span>→</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
      </div>
      
      {/* TV Preview Modal */}
      <TVPreviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TVContainerLarge />
      </TVPreviewModal>
    </>
  );
}