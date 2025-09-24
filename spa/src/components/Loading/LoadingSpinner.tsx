import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'loading-spinner--sm',
    md: 'loading-spinner--md',
    lg: 'loading-spinner--lg',
    xl: 'loading-spinner--xl'
  };

  const colorClasses = {
    primary: 'loading-spinner--primary',
    secondary: 'loading-spinner--secondary',
    accent: 'loading-spinner--accent',
    white: 'loading-spinner--white'
  };

  const containerClass = fullScreen ? 'loading-container--fullscreen' : 'loading-container';
  const spinnerClass = `loading-spinner ${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  return (
    <div className={containerClass}>
      <div className={spinnerClass}>
        <div className="spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );
};

// Skeleton loading component
export const SkeletonLoader: React.FC<{
  lines?: number;
  height?: string;
  className?: string;
}> = ({ lines = 3, height = '1rem', className = '' }) => {
  return (
    <div className={`skeleton-loader ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="skeleton-line"
          style={{ height }}
        />
      ))}
    </div>
  );
};

// Progress bar component
export const ProgressBar: React.FC<{
  progress: number;
  total?: number;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}> = ({
  progress,
  total = 100,
  showPercentage = true,
  color = 'primary',
  size = 'md',
  animated = true,
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, (progress / total) * 100));
  
  const colorClasses = {
    primary: 'progress-bar--primary',
    success: 'progress-bar--success',
    warning: 'progress-bar--warning',
    danger: 'progress-bar--danger'
  };

  const sizeClasses = {
    sm: 'progress-bar--sm',
    md: 'progress-bar--md',
    lg: 'progress-bar--lg'
  };

  return (
    <div className={`progress-bar ${colorClasses[color]} ${sizeClasses[size]} ${className}`}>
      <div className="progress-bar-container">
        <div
          className={`progress-bar-fill ${animated ? 'progress-bar--animated' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <span className="progress-bar-text">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};

// Pulse loading component
export const PulseLoader: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
}> = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizeClasses = {
    sm: 'pulse-loader--sm',
    md: 'pulse-loader--md',
    lg: 'pulse-loader--lg'
  };

  const colorClasses = {
    primary: 'pulse-loader--primary',
    secondary: 'pulse-loader--secondary',
    accent: 'pulse-loader--accent'
  };

  return (
    <div className={`pulse-loader ${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      <div className="pulse-dot"></div>
      <div className="pulse-dot"></div>
      <div className="pulse-dot"></div>
    </div>
  );
};

// Dots loading component
export const DotsLoader: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
}> = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizeClasses = {
    sm: 'dots-loader--sm',
    md: 'dots-loader--md',
    lg: 'dots-loader--lg'
  };

  const colorClasses = {
    primary: 'dots-loader--primary',
    secondary: 'dots-loader--secondary',
    accent: 'dots-loader--accent'
  };

  return (
    <div className={`dots-loader ${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      <div className="dots-dot"></div>
      <div className="dots-dot"></div>
      <div className="dots-dot"></div>
    </div>
  );
};
