import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FlagGB = () => (
  <svg width="18" height="13" viewBox="0 0 60 30" style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle', boxShadow: '0 0 1px rgba(0,0,0,0.3)', flexShrink: 0 }}>
    <clipPath id="gb-s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
    <clipPath id="gb-t"><path d="M30,15 h30 v15 z M30,15 h-30 v-15 z M30,15 h-30 v15 z M30,15 h30 v-15 z"/></clipPath>
    <g clipPath="url(#gb-s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

const FlagFR = () => (
  <svg width="18" height="13" viewBox="0 0 3 2" style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle', boxShadow: '0 0 1px rgba(0,0,0,0.3)', flexShrink: 0 }}>
    <rect width="1" height="2" x="0" fill="#002654"/>
    <rect width="1" height="2" x="1" fill="#ffffff"/>
    <rect width="1" height="2" x="2" fill="#CE1126"/>
  </svg>
);

const FlagDE = () => (
  <svg width="18" height="13" viewBox="0 0 5 3" style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle', boxShadow: '0 0 1px rgba(0,0,0,0.3)', flexShrink: 0 }}>
    <rect width="5" height="1" y="0" fill="#000000"/>
    <rect width="5" height="1" y="1" fill="#DD0000"/>
    <rect width="5" height="1" y="2" fill="#FFCC00"/>
  </svg>
);

export default function LanguageSwitcher({ currentLang, onLangChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'EN', Flag: FlagGB },
    { code: 'fr', label: 'FR', Flag: FlagFR },
    { code: 'de', label: 'DE', Flag: FlagDE },
  ];

  const currentOption = languages.find(l => l.code === currentLang) || languages[0];
  const CurrentFlag = currentOption.Flag;

  return (
    <div className="header-lang-switcher">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lang-pill-btn"
        aria-label="Select Language"
      >
        <CurrentFlag />
        <span style={{ fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>{currentOption.label}</span>
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          {languages.map((langItem) => {
            const ItemFlag = langItem.Flag;
            return (
              <button
                key={langItem.code}
                onClick={() => {
                  onLangChange(langItem.code);
                  setIsOpen(false);
                }}
                className={`dropdown-item ${currentLang === langItem.code ? 'active' : ''}`}
              >
                <ItemFlag />
                <span>{langItem.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


