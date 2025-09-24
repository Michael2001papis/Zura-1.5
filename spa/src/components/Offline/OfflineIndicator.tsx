import React from 'react';
import { useOfflineDetection } from '../../hooks/usePWA';
import { FadeIn, SlideIn } from '../Animations/FadeIn';

export const OfflineIndicator: React.FC = () => {
  const { getOfflineDuration } = useOfflineDetection();

  // if (!isOffline) return null;

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours} שעות ו-${minutes % 60} דקות`;
    } else if (minutes > 0) {
      return `${minutes} דקות ו-${seconds % 60} שניות`;
    } else {
      return `${seconds} שניות`;
    }
  };

  const duration = getOfflineDuration();
  const durationText = duration ? formatDuration(duration) : '';

  return (
    <SlideIn direction="down" duration={300}>
      <div className="offline-indicator">
        <div className="offline-content">
          <div className="offline-icon">📡</div>
          <div className="offline-text">
            <div className="offline-title">אין חיבור לאינטרנט</div>
            <div className="offline-subtitle">
              {durationText && `מחובר לאינטרנט במשך ${durationText}`}
            </div>
          </div>
          <div className="offline-status">
            <div className="offline-dot"></div>
          </div>
        </div>
      </div>
    </SlideIn>
  );
};

// PWA Install Banner
interface PWAInstallBannerProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({
  onInstall,
  onDismiss
}) => {
  return (
    <FadeIn direction="up" duration={400}>
      <div className="pwa-install-banner">
        <div className="pwa-banner-content">
          <div className="pwa-banner-icon">📱</div>
          <div className="pwa-banner-text">
            <div className="pwa-banner-title">התקן את האפליקציה</div>
            <div className="pwa-banner-subtitle">
              קבל גישה מהירה ופונקציונליות מתקדמת
            </div>
          </div>
          <div className="pwa-banner-actions">
            <button
              className="btn btn--primary btn--sm"
              onClick={onInstall}
            >
              התקן
            </button>
            <button
              className="btn btn--ghost btn--sm"
              onClick={onDismiss}
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

// Update Available Banner
interface UpdateBannerProps {
  onUpdate: () => void;
  onDismiss: () => void;
}

export const UpdateBanner: React.FC<UpdateBannerProps> = ({
  onUpdate,
  onDismiss
}) => {
  return (
    <SlideIn direction="down" duration={300}>
      <div className="update-banner">
        <div className="update-content">
          <div className="update-icon">🔄</div>
          <div className="update-text">
            <div className="update-title">עדכון זמין</div>
            <div className="update-subtitle">
              גרסה חדשה של האפליקציה זמינה
            </div>
          </div>
          <div className="update-actions">
            <button
              className="btn btn--primary btn--sm"
              onClick={onUpdate}
            >
              עדכן
            </button>
            <button
              className="btn btn--ghost btn--sm"
              onClick={onDismiss}
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </SlideIn>
  );
};

// Network Status Component
export const NetworkStatus: React.FC = () => {
  const { isOffline } = useOfflineDetection();

  return (
    <div className="network-status">
      <div className={`status-indicator ${!isOffline ? 'online' : 'offline'}`}>
        <div className="status-dot"></div>
        <span className="status-text">
          {!isOffline ? 'מחובר' : 'מנותק'}
        </span>
      </div>
    </div>
  );
};
