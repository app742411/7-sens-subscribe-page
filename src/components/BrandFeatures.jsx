import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function BrandFeatures({ lang }) {
  const t = translations[lang] || translations.fr;

  const features = [
    {
      icon: Sparkles,
      title: t.feature1Title,
      description: t.feature1Desc,
    },
    {
      icon: HeartHandshake,
      title: t.feature2Title,
      description: t.feature2Desc,
    },
    {
      icon: ShieldCheck,
      title: t.feature3Title,
      description: t.feature3Desc,
    },
  ];

  return (
    <section style={{ width: '100%', marginTop: '3.5rem' }}>
      <div style={{ textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--color-gold-dark)', marginBottom: '1.75rem' }}>
        {t.featuresHeader}
      </div>
      
      <div className="brand-features-grid">
        {features.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <div key={idx} className="brand-card">
              <div className="brand-card-icon">
                <IconComponent size={22} />
              </div>
              <h3 className="brand-card-h3">{feature.title}</h3>
              <p className="brand-card-p">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
