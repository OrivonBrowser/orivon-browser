import React from 'react';
import './TrustBadge.css';

interface TrustBadgeProps {
  level: 'verified' | 'known' | 'unknown' | 'risky';
  score?: number;
  showLabel?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ level, score, showLabel = true }) => {
  const getIcon = (l: string) => {
    switch (l) {
      case 'verified':
        return '✓';
      case 'known':
        return '○';
      case 'unknown':
        return '?';
      case 'risky':
        return '⚠';
      default:
        return '?';
    }
  };

  return (
    <div className={`trust-badge trust-${level}`}>
      <span className="trust-icon">{getIcon(level)}</span>
      {showLabel && (
        <>
          <span className="trust-label">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
          {score !== undefined && <span className="trust-score">{score}/100</span>}
        </>
      )}
    </div>
  );
};

export default TrustBadge;
