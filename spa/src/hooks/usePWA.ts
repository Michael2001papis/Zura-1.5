import { useState, useEffect, useCallback } from 'react';

interface PWAState {
  isInstalled: boolean;
  isInstallable: boolean;
  isOnline: boolean;
  isOffline: boolean;
  updateAvailable: boolean;
  installPrompt: Event | null;
  swRegistration: ServiceWorkerRegistration | null;
}

interface PWAInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePWA(): PWAState & {
  install: () => Promise<void>;
  update: () => void;
  checkForUpdates: () => void;
} {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<PWAInstallPromptEvent | null>(null);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  // Check if app is installed
  useEffect(() => {
    const checkInstalled = () => {
      // Check if running in standalone mode
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      // Check if running in fullscreen mode
      const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
      // Check if running in minimal-ui mode
      const isMinimalUI = window.matchMedia('(display-mode: minimal-ui)').matches;
      
      setIsInstalled(isStandalone || isFullscreen || isMinimalUI);
    };

    checkInstalled();
    
    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkInstalled);
    
    return () => {
      mediaQuery.removeEventListener('change', checkInstalled);
    };
  }, []);

  // Handle install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as PWAInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsOffline(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
          setSwRegistration(registration);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  // Install app
  const install = useCallback(async () => {
    if (!installPrompt) {
      throw new Error('Install prompt not available');
    }

    try {
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setIsInstalled(true);
        setIsInstallable(false);
        setInstallPrompt(null);
      } else {
        console.log('User dismissed the install prompt');
      }
    } catch (error) {
      console.error('Error during installation:', error);
      throw error;
    }
  }, [installPrompt]);

  // Update app
  const update = useCallback(() => {
    if (swRegistration && swRegistration.waiting) {
      // Tell the waiting service worker to skip waiting and become active
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Reload the page to use the new service worker
      window.location.reload();
    }
  }, [swRegistration]);

  // Check for updates
  const checkForUpdates = useCallback(() => {
    if (swRegistration) {
      swRegistration.update();
    }
  }, [swRegistration]);

  return {
    isInstalled,
    isInstallable,
    isOnline,
    isOffline,
    updateAvailable,
    installPrompt,
    swRegistration,
    install,
    update,
    checkForUpdates
  };
}

// Offline detection hook
export function useOfflineDetection() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineSince, setOfflineSince] = useState<Date | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setOfflineSince(null);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setOfflineSince(new Date());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getOfflineDuration = useCallback(() => {
    if (!isOffline || !offlineSince) return null;
    return Date.now() - offlineSince.getTime();
  }, [isOffline, offlineSince]);

  return {
    isOffline,
    offlineSince,
    getOfflineDuration
  };
}

// Background sync hook
export function useBackgroundSync() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      setIsSupported(true);
    }
  }, []);

  const registerBackgroundSync = useCallback(async (_tag: string) => {
    if (!isSupported) {
      throw new Error('Background sync not supported');
    }

    // const registration = await navigator.serviceWorker.ready;
    // return registration.sync.register(tag);
    return Promise.resolve();
  }, [isSupported]);

  return {
    isSupported,
    registerBackgroundSync
  };
}

// Push notifications hook
export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      throw new Error('Push notifications not supported');
    }

    const permission = await Notification.requestPermission();
    setPermission(permission);
    return permission;
  }, [isSupported]);

  const subscribe = useCallback(async () => {
    if (!isSupported || permission !== 'granted') {
      throw new Error('Push notifications not supported or permission not granted');
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
    });

    setSubscription(subscription);
    return subscription;
  }, [isSupported, permission]);

  const unsubscribe = useCallback(async () => {
    if (subscription) {
      await subscription.unsubscribe();
      setSubscription(null);
    }
  }, [subscription]);

  return {
    isSupported,
    permission,
    subscription,
    requestPermission,
    subscribe,
    unsubscribe
  };
}
