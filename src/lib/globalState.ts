'use client';

// Global state for pro and unlimited features
class GlobalState {
  private proActive = false;
  private unlimitedActive = false;
  private gallerySubscription = '';
  private extendedGallerySubscription = '';
  private proFeatures = new Set<string>();
  private unlimitedFeatures = new Set<string>();
  private listeners: (() => void)[] = [];

  addProFeature(featureName: string) {
    this.proFeatures.add(featureName);
    this.proActive = true;
    this.notifyListeners();
  }

  removeProFeature(featureName: string) {
    this.proFeatures.delete(featureName);
    // Only disable pro if no pro features are active and unlimited is not active
    if (this.proFeatures.size === 0 && !this.unlimitedActive && !this.gallerySubscription) {
      this.proActive = false;
    }
    this.notifyListeners();
  }

  addUnlimitedFeature(featureName: string) {
    this.unlimitedFeatures.add(featureName);
    this.unlimitedActive = true;
    this.proActive = true; // Unlimited includes pro
    this.notifyListeners();
  }

  removeUnlimitedFeature(featureName: string) {
    this.unlimitedFeatures.delete(featureName);
    // Only disable unlimited if no unlimited features are active and no gallery subscription
    if (this.unlimitedFeatures.size === 0 && !this.gallerySubscription) {
      this.unlimitedActive = false;
      // Check if pro should also be disabled
      if (this.proFeatures.size === 0) {
        this.proActive = false;
      }
    }
    this.notifyListeners();
  }

  setProActive(active: boolean) {
    this.proActive = active;
    // If manually disabling pro, clear all pro features
    if (!active) {
      this.proFeatures.clear();
    }
    this.notifyListeners();
  }

  setUnlimitedActive(active: boolean) {
    this.unlimitedActive = active;
    // When unlimited is enabled, also enable pro
    if (active) {
      this.proActive = true;
    } else {
      // If manually disabling unlimited, clear all unlimited features
      this.unlimitedFeatures.clear();
      // Check if pro should also be disabled
      if (this.proFeatures.size === 0 && !this.gallerySubscription) {
        this.proActive = false;
      }
    }
    this.notifyListeners();
  }

  setGallerySubscription(subscription: string) {
    this.gallerySubscription = subscription;
    // When pro or unlimited gallery subscription is selected, enable the appropriate tier
    if (subscription) {
      if (subscription === 'pro-12-months') {
        this.proActive = true;
        // Don't automatically enable unlimited for pro subscription
      } else if (subscription === 'unlimited-12-months') {
        this.unlimitedActive = true;
        this.proActive = true; // Unlimited includes pro
      }
    } else {
      // If removing gallery subscription, check if unlimited should be disabled
      if (this.unlimitedFeatures.size === 0) {
        this.unlimitedActive = false;
        // Check if pro should also be disabled
        if (this.proFeatures.size === 0) {
          this.proActive = false;
        }
      }
    }
    this.notifyListeners();
  }

  setExtendedGallerySubscription(subscription: string) {
    this.extendedGallerySubscription = subscription;
    this.notifyListeners();
  }

  isProActive() {
    return this.proActive;
  }

  isUnlimitedActive() {
    return this.unlimitedActive;
  }

  getGallerySubscription() {
    return this.gallerySubscription;
  }

  getExtendedGallerySubscription() {
    return this.extendedGallerySubscription;
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const globalState = new GlobalState();