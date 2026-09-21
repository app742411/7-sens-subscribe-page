import React from 'react';
import { translations } from '../i18n/translations';

// Custom Luxury Gold-Stroke SVG Icons matching the design exactly
const LockIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" fill="#C5A059" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const DiamondIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12l4 6-10 12L2 9z" />
    <path d="M2 9h20" />
    <path d="M10 3l-2 6 4 12 4-12-2-6" />
  </svg>
);

const LotusSpamIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c4.97 0 9-4.03 9-9 0-4-4.5-9-9-9s-9 5-9 9c0 4.97 4.03 9 9 9z" />
    <path d="M12 4c2.5 3.5 4 6.5 4 9a4 4 0 0 1-8 0c0-2.5 1.5-5.5 4-9z" />
    <path d="M7 14c-1.5-.5-3-2-3-4 2 0 4 1.5 4.5 3" />
    <path d="M17 14c1.5-.5 3-2 3-4-2 0-4 1.5-4.5 3" />
  </svg>
);

export default function TrustBadges({ lang }) {
  const t = translations[lang] || translations.fr;

  const badges = [
    {
      icon: <LockIcon />,
      title: t.trust1Title,
      subtitle: t.trust1Subtitle
    },
    {
      icon: <ShieldCheckIcon />,
      title: t.trust2Title,
      subtitle: t.trust2Subtitle
    },
    {
      icon: <DiamondIcon />,
      title: t.trust3Title,
      subtitle: t.trust3Subtitle
    },
    {
      icon: <LotusSpamIcon />,
      title: t.trust4Title,
      subtitle: t.trust4Subtitle
    }
  ];

  return (
    <div className="trust-badges-container">
      {badges.map((badge, idx) => (
        <div key={idx} className="trust-badge-item">
          <div className="trust-badge-icon-box">
            {badge.icon}
          </div>
          <div className="trust-badge-text">
            <h4 className="trust-badge-title">{badge.title}</h4>
            <p className="trust-badge-subtitle">{badge.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
