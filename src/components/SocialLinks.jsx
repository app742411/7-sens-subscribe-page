import React from 'react';
import { translations } from '../i18n/translations';

export default function SocialLinks({ lang }) {
  const t = translations[lang] || translations.fr;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer-navy">
      <div className="footer-content">
        {/* Brand Copyright */}
        <div style={{ fontSize: '0.88rem', color: '#94A3B8' }}>
          © {currentYear} <strong style={{ color: '#ffffff' }}>7SENS</strong>. {t.copyright}
        </div>

        {/* Swiss Made Badge */}
        <div className="swiss-flag-tag">
          <span className="swiss-flag-icon">＋</span>
          <span>{t.swissTagline}</span>
        </div>
      </div>
    </footer>
  );
}
