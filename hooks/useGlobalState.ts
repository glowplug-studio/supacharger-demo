'use client';

import { useEffect,useState } from 'react';

import { globalState } from '@/lib/globalState';

export function useGlobalState() {
  const [proActive, setProActive] = useState(globalState.isProActive());
  const [unlimitedActive, setUnlimitedActive] = useState(globalState.isUnlimitedActive());
  const [gallerySubscription, setGallerySubscription] = useState(globalState.getGallerySubscription());
  const [extendedGallerySubscription, setExtendedGallerySubscription] = useState(globalState.getExtendedGallerySubscription());

  useEffect(() => {
    const unsubscribe = globalState.subscribe(() => {
      setProActive(globalState.isProActive());
      setUnlimitedActive(globalState.isUnlimitedActive());
      setGallerySubscription(globalState.getGallerySubscription());
      setExtendedGallerySubscription(globalState.getExtendedGallerySubscription());
    });

    return unsubscribe;
  }, []);

  const setProActiveGlobal = (active: boolean) => {
    globalState.setProActive(active);
  };

  const setUnlimitedActiveGlobal = (active: boolean) => {
    globalState.setUnlimitedActive(active);
  };

  const setGallerySubscriptionGlobal = (subscription: string) => {
    globalState.setGallerySubscription(subscription);
  };

  const setExtendedGallerySubscriptionGlobal = (subscription: string) => {
    globalState.setExtendedGallerySubscription(subscription);
  };

  const addProFeature = (featureName: string) => {
    globalState.addProFeature(featureName);
  };

  const removeProFeature = (featureName: string) => {
    globalState.removeProFeature(featureName);
  };

  const addUnlimitedFeature = (featureName: string) => {
    globalState.addUnlimitedFeature(featureName);
  };

  const removeUnlimitedFeature = (featureName: string) => {
    globalState.removeUnlimitedFeature(featureName);
  };

  return {
    proActive,
    unlimitedActive,
    gallerySubscription,
    extendedGallerySubscription,
    setProActive: setProActiveGlobal,
    setUnlimitedActive: setUnlimitedActiveGlobal,
    setGallerySubscription: setGallerySubscriptionGlobal,
    setExtendedGallerySubscription: setExtendedGallerySubscriptionGlobal,
    addProFeature,
    removeProFeature,
    addUnlimitedFeature,
    removeUnlimitedFeature
  };
}