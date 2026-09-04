import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ currentLang, onLangChange }) {
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

      {/* Right Side Language Switcher */}
      <div className="header-actions">
        <LanguageSwitcher currentLang={currentLang} onLangChange={onLangChange} />
      </div>
    </header>
  );
}


