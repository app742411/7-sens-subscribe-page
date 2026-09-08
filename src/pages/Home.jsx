import React, { useState } from 'react';
import Header from '../components/Header';
import SubscribeForm from '../components/SubscribeForm';
import LegalModal from '../components/LegalModal';
import { translations } from '../i18n/translations';

export default function Home() {
  const [lang, setLang] = useState('fr');
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | 'contact' | null
  const t = translations[lang] || translations.fr;

  return (
    <div className="app-container-dev">
      {/* Background artwork layer on right side */}
      <div className="bg-canvas-luxury">
        <div className="hero-art-bg" />
      </div>

      {/* Top Header Navigation Bar */}
      <Header currentLang={lang} onLangChange={setLang} />

      {/* Main Content Area */}
      <main className="hero-content-left">
        {/* Main Headline */}
        <h1 className="hero-h1-dev">
          {t.heroTitlePrefix}
          <span className="gold-italic">{t.heroTitleItalic}</span>
          {t.heroTitleSuffix}
        </h1>

        <p className="hero-p2">
          {t.heroNotice}
        </p>

        {/* Integrated Email Form */}
        <SubscribeForm lang={lang} />
      </main>

      {/* Footer */}
      <footer className="hero-footer-dev">
        <span>© 2026 7Sens. All rights reserved.</span>
        <span className="footer-sep">|</span>
        <span className="footer-concept">
          <span style={{ color: '#C5A059', marginRight: '6px', fontSize: '0.75rem' }}>♦</span>
          {lang === 'fr' ? 'Concept créé avec' : 'Concept made with'}
          <span style={{ color: '#E11D48', margin: '0 4px', fontSize: '0.85rem' }}>♥</span>
          {lang === 'fr' ? 'en Suisse' : 'in Switzerland'}
        </span>
        <span className="footer-sep">|</span>
        <div className="footer-links">
          <button 
            type="button" 
            className="footer-link-btn"
            onClick={() => setActiveModal('privacy')}
          >
            {lang === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
          </button>
          <span className="footer-sep">|</span>
          <button 
            type="button" 
            className="footer-link-btn"
            onClick={() => setActiveModal('terms')}
          >
            {lang === 'fr' ? "Conditions d'Utilisation" : 'Terms of Service'}
          </button>
          <span className="footer-sep">|</span>
          <button 
            type="button" 
            className="footer-link-btn"
            onClick={() => setActiveModal('contact')}
          >
            Contact
          </button>
        </div>
      </footer>

      {/* Legal & Privacy Policy Modal */}
      <LegalModal 
        type={activeModal} 
        onClose={() => setActiveModal(null)} 
        lang={lang} 
      />
    </div>
  );
}

