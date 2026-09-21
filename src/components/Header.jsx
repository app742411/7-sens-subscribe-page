import React from 'react';
import { Share2 } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { translations } from '../i18n/translations';

export default function Header({ currentLang, onLangChange, onOpenShare }) {
  const t = translations[currentLang] || translations.fr;

  return (
    <header className="site-header-dev">
      {/* 7Sens Brand Logo */}
      <div className="logo-container">
        <img 
          src="/7sens.webp" 
          alt="7Sens" 
          style={{ height: '54px', width: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Right Side Actions: Share & Language Switcher */}
      <div className="header-actions">
        {onOpenShare && (
          <button 
            type="button" 
            className="header-share-btn"
            onClick={onOpenShare}
            title={t.shareEventBtn}
          >
            <Share2 size={14} className="header-share-icon" />
            <span className="header-share-text">{t.shareEventBtn}</span>
          </button>
        )}
        <LanguageSwitcher currentLang={currentLang} onLangChange={onLangChange} />
      </div>
    </header>
  );
}


