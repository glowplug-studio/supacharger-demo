'use client';

import { useState, useEffect } from 'react';
import PhonePreviewBackground from './PhonePreviewBackground';
import PhonePreviewEventCard from './PhonePreviewEventCard';
import PhonePreviewDescriptionCard from './PhonePreviewDescriptionCard';

interface EventData {
  eventName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  submissionOpenDate: string;
  submissionOpenTime: string;
  submissionCloseDate: string;
  submissionCloseTime: string;
  location: string;
  description: string;
  hostsName: string;
  hostsAvatar: File | null;
}

interface PageStyleData {
  backgroundColor: string;
  backgroundImage: File | null;
  primaryColor: string;
  textColor: string;
  designStyle: string;
  backgroundImageUrl: string;
  backgroundBlur: number;
}

export default function PhonePreviewContent() {
  const [eventData, setEventData] = useState<EventData>({
    eventName: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    submissionOpenDate: '',
    submissionOpenTime: '',
    submissionCloseDate: '',
    submissionCloseTime: '',
    location: '',
    description: '',
    hostsName: '',
    hostsAvatar: null
  });

  const [pageStyleData, setPageStyleData] = useState<PageStyleData>({
    backgroundColor: '#ffffff',
    backgroundImage: null,
    primaryColor: '#A9A9A9',
    textColor: '#1F2937',
    designStyle: 'rounded-friendly',
    backgroundImageUrl: '',
    backgroundBlur: 0
  });

  const [hostAvatarUrl, setHostAvatarUrl] = useState<string>('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');

  // Listen for avatar click events
  useEffect(() => {
    // Also listen for custom events for same-tab updates
    const handleCustomUpdate = (event: CustomEvent) => {
      const newEventData = event.detail;
      setEventData(prevData => ({
        ...prevData,
        ...newEventData
      }));
      
      // Handle avatar file updates
      if (newEventData.hostsAvatar && newEventData.hostsAvatar instanceof File) {
        const url = URL.createObjectURL(newEventData.hostsAvatar);
        setHostAvatarUrl(url);
      } else if (!newEventData.hostsAvatar) {
        setHostAvatarUrl('');
      }
    };

    const handlePageStyleUpdate = (event: CustomEvent) => {
      const newPageStyleData = event.detail;
      setPageStyleData(prevData => ({
        ...prevData,
        ...newPageStyleData
      }));
      
      // Handle background image updates
      if (newPageStyleData.backgroundImageUrl !== undefined) {
        setBackgroundImageUrl(newPageStyleData.backgroundImageUrl);
      }
    };

    const handleAvatarClickEvent = () => {
      // Dispatch event to trigger file picker
      window.dispatchEvent(new CustomEvent('triggerAvatarUpload'));
    };

    window.addEventListener('eventDataUpdate', handleCustomUpdate as EventListener);
    window.addEventListener('pageStyleUpdate', handlePageStyleUpdate as EventListener);
    window.addEventListener('avatarPreviewClick', handleAvatarClickEvent as EventListener);

    return () => {
      window.removeEventListener('eventDataUpdate', handleCustomUpdate as EventListener);
      window.removeEventListener('pageStyleUpdate', handlePageStyleUpdate as EventListener);
      window.removeEventListener('avatarPreviewClick', handleAvatarClickEvent as EventListener);
    };
  }, []);

  const handleAvatarClick = () => {
    // Dispatch custom event that the form component will listen for
    window.dispatchEvent(new CustomEvent('triggerAvatarUpload'));
  };

  return (
    <PhonePreviewBackground
      backgroundColor={pageStyleData.backgroundColor}
      backgroundImageUrl={pageStyleData.backgroundImageUrl || backgroundImageUrl}
      backgroundBlur={pageStyleData.backgroundBlur}
    >
      <PhonePreviewEventCard
        eventName={eventData.eventName}
        startDate={eventData.startDate}
        startTime={eventData.startTime}
        endDate={eventData.endDate}
        endTime={eventData.endTime}
        location={eventData.location}
        primaryColor={pageStyleData.primaryColor}
        textColor={pageStyleData.textColor}
        designStyle={pageStyleData.designStyle}
        submissionOpenDate={eventData.submissionOpenDate}
        submissionOpenTime={eventData.submissionOpenTime}
        submissionCloseDate={eventData.submissionCloseDate}
        submissionCloseTime={eventData.submissionCloseTime}
      />
      
      <PhonePreviewDescriptionCard
        description={eventData.description}
        hostsName={eventData.hostsName}
        hostAvatarUrl={hostAvatarUrl}
        designStyle={pageStyleData.designStyle}
        onAvatarClick={handleAvatarClick}
      />
    </PhonePreviewBackground>
  );
}