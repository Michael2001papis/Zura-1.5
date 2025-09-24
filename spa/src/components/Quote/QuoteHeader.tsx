import React from 'react';
import type { BaseComponentProps } from '../../types/index.js';

interface QuoteHeaderProps extends BaseComponentProps {
  title: string;
  subtitle: string;
  badges: Array<{ text: string; icon: string }>;
}

export const QuoteHeader: React.FC<QuoteHeaderProps> = ({
  title,
  subtitle,
  badges,
  className = ''
}) => {
  return (
    <div className={`quote-header ${className}`}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className="quote-badges">
        {badges.map((badge, index) => (
          <span key={index} className="badge">
            {badge.icon} {badge.text}
          </span>
        ))}
      </div>
    </div>
  );
};
