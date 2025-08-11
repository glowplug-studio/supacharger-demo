'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, name: 'Event Basics', path: '/create-event/event-basics' },
  { id: 2, name: 'Page Style', path: '/create-event/page-style' },
  { id: 3, name: 'Slideshow', path: '/create-event/slideshow-settings' },
  { id: 4, name: 'Marketing, Tools & Security', path: '/create-event/marketing' },
  { id: 5, name: 'Review and Pay', path: '/create-event/review' },
  { id: 6, name: 'Try it out!', path: '/create-event/try-it-out' }
];

export default function ProgressBar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const getCurrentStep = () => {
    const step = steps.find(s => s.path === pathname);
    return step ? step.id : 1;
  };

  const currentStep = getCurrentStep();
  const isOnTryItOutPage = pathname === '/create-event/try-it-out';

  const handleStepClick = (step: typeof steps[0]) => {
    // Disable all navigation when on try-it-out page
    if (isOnTryItOutPage) {
      return;
    }
    
    // Allow navigation to any previous step or current step (except from try-it-out)
    if (step.id <= currentStep) {
      router.push(step.path);
    }
  };
  
  return (
    <div className="bg-[#FFE51F] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl font-bold mb-6">Create a New Event</h1>
        
        {/* Progress Steps */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 pb-2">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex items-center flex-shrink-0 w-full md:w-auto ${
              !isOnTryItOutPage && step.id <= currentStep 
                ? 'cursor-pointer hover:opacity-80' 
                : 'cursor-not-allowed'
            }`}>
              <div 
                className="flex items-center space-x-3"
                onClick={() => handleStepClick(step)}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                  ${currentStep > step.id 
                    ? isOnTryItOutPage 
                      ? 'bg-gray-400 text-gray-600' 
                      : 'bg-black text-white'
                    : currentStep === step.id 
                      ? 'bg-white text-black' 
                      : 'bg-yellow-200 text-gray-600'
                  }
                  ${!isOnTryItOutPage && step.id <= currentStep ? 'hover:scale-105' : ''}
                `}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <div className={`
                  text-sm font-medium flex-1 transition-colors
                  ${currentStep === step.id 
                    ? 'text-black' 
                    : step.id < currentStep 
                      ? isOnTryItOutPage 
                        ? 'text-gray-500' 
                        : 'text-gray-800 hover:text-black' 
                      : 'text-gray-700'
                  }
                `}>
                  {step.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}