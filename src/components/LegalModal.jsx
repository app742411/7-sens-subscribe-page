import React from 'react';
import { X, ShieldCheck, FileText, Mail } from 'lucide-react';

export default function LegalModal({ type, onClose, lang = 'fr' }) {
  if (!type) return null;

  const isPrivacy = type === 'privacy';
  const isTerms = type === 'terms';
  const isContact = type === 'contact';

  return (
    <div className="legal-modal-backdrop" onClick={onClose}>
      <div className="legal-modal-card" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="legal-modal-close-btn" aria-label="Close modal">
          <X size={20} />
        </button>

        {isPrivacy && (
          <div className="legal-modal-body">
            <div className="legal-modal-header">
              <ShieldCheck size={26} color="#C5A059" />
              <h2>{lang === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}</h2>
            </div>
            
            <div className="legal-content-scroll">
              <p className="legal-intro">
                {lang === 'fr'
                  ? "Chez 7Sens, nous accordons une importance capitale à la protection de vos données personnelles et à votre confidentialité."
                  : "At 7Sens, protecting your personal data and privacy is our highest priority."}
              </p>

              <h3>1. {lang === 'fr' ? 'Collecte des Données' : 'Data Collection'}</h3>
              <p>
                {lang === 'fr'
                  ? "Nous collectons uniquement votre adresse e-mail lorsque vous vous inscrivez à notre liste prioritaire de lancement."
                  : "We only collect your email address when you voluntarily subscribe to our priority launch list."}
              </p>

              <h3>2. {lang === 'fr' ? 'Utilisation des Données & Marketing' : 'Data Usage & Marketing'}</h3>
              <p>
                {lang === 'fr'
                  ? "Votre e-mail est utilisé exclusivement pour vous notifier en avant-première lors de l'ouverture officielle de 7Sens, vous transmettre vos invitations prioritaires et vous informer de nos actualités exclusives."
                  : "Your email is strictly used to notify you first upon the official opening of 7Sens, deliver your priority launch invitations, and send exclusive marketing announcements."}
              </p>

              <h3>3. {lang === 'fr' ? 'Confidentialité & Sécurité' : 'Confidentiality & Security'}</h3>
              <p>
                {lang === 'fr'
                  ? "Vos données sont stockées de manière sécurisée et ne seront JAMAIS vendues, louées ou partagées avec des tiers."
                  : "Your personal data is encrypted and securely stored. We NEVER sell, rent, or share your data with third parties."}
              </p>

              <h3>4. {lang === 'fr' ? 'Vos Droits & Désinscription' : 'Your Rights & Unsubscribe'}</h3>
              <p>
                {lang === 'fr'
                  ? "Vous pouvez à tout moment demander l'accès, la modification ou la suppression de vos données en nous écrivant à s7.sens@gmail.com."
                  : "You can unsubscribe or request complete deletion of your data at any time by contacting us at s7.sens@gmail.com."}
              </p>
            </div>
          </div>
        )}

        {isTerms && (
          <div className="legal-modal-body">
            <div className="legal-modal-header">
              <FileText size={26} color="#C5A059" />
              <h2>{lang === 'fr' ? "Conditions d'Utilisation" : 'Terms of Service'}</h2>
            </div>
            
            <div className="legal-content-scroll">
              <p className="legal-intro">
                {lang === 'fr'
                  ? "Bienvenue sur 7Sens. En accédant à notre plateforme, vous acceptez les conditions ci-dessous."
                  : "Welcome to 7Sens. By accessing our website, you agree to the following terms."}
              </p>

              <h3>1. {lang === 'fr' ? 'Accès Prioritaire au Lancement' : 'Priority Launch Access'}</h3>
              <p>
                {lang === 'fr'
                  ? "L'inscription sur notre liste d'attente vous donne accès aux notifications prioritaires lors de l'ouverture officielle de la plateforme."
                  : "Subscribing to our waitlist grants you priority notification privileges for our official launch."}
              </p>

              <h3>2. {lang === 'fr' ? 'Propriété Intellectuelle' : 'Intellectual Property'}</h3>
              <p>
                {lang === 'fr'
                  ? "Tous les contenus, logos et éléments visuels de 7Sens sont la propriété exclusive de 7Sens et sont protégés par les lois sur la propriété intellectuelle."
                  : "All logos, designs, and content on 7Sens are protected by applicable trademark and copyright laws."}
              </p>

              <h3>3. {lang === 'fr' ? 'Éligibilité' : 'Eligibility'}</h3>
              <p>
                {lang === 'fr'
                  ? "Les services et événements 7Sens sont strictement réservés aux personnes majeures (18 ans et plus)."
                  : "7Sens services and events are strictly intended for adults aged 18 and older."}
              </p>
            </div>
          </div>
        )}

        {isContact && (
          <div className="legal-modal-body">
            <div className="legal-modal-header">
              <Mail size={26} color="#C5A059" />
              <h2>Contact</h2>
            </div>
            
            <div className="legal-content-scroll">
              <p className="legal-intro">
                {lang === 'fr'
                  ? "Une question concernant 7Sens ou notre lancement ? Notre équipe est à votre disposition."
                  : "Have questions about 7Sens or our upcoming launch? We are here to assist."}
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <Mail size={18} color="#C5A059" />
                  <div>
                    <strong>Email:</strong>
                    <a href="mailto:s7.sens@gmail.com" style={{ color: '#203A5F', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                      s7.sens@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
