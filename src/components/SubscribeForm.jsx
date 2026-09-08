import React, { useState } from 'react';
import { Mail, Loader2, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../i18n/translations';

export default function SubscribeForm({ lang }) {
  const t = translations[lang] || translations.fr;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (emailStr) => {
    return String(emailStr)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setStatus('error');
      setErrorMsg(t.errorInvalidEmail);
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const endpoint = import.meta.env.VITE_API_URL || '/api/contacts/add-contact';
      const apiUrl = baseUrl 
        ? `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}` 
        : endpoint;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn('API error response:', errorData);
      }

      setStatus('success');
      setEmail('');

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#C5A059', '#D4A017', '#203A5F']
      });
    } catch (err) {
      console.warn('API submission error:', err);
      setStatus('success');
      setEmail('');

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#C5A059', '#D4A017', '#203A5F']
      });
    }
  };

  return (
    <div className="subscribe-wrapper">
      {status === 'success' ? (
        <div className="success-box-card">
          <div className="success-box-title">
            <CheckCircle2 size={20} color="#C5A059" style={{ flexShrink: 0 }} />
            <span>{t.successTitle}</span>
          </div>
          <p className="success-box-subtitle">
            {t.successSubtitle}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="subscribe-form-dev">
          <div className="input-field-container">
            <Mail size={17} className="input-mail-icon" />
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              className="subscribe-input-dev"
              disabled={status === 'loading'}
            />
          </div>

          <button
            type="submit"
            className="subscribe-btn-dev"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>{t.submittingText}</span>
              </>
            ) : (
              <>
                <span>➔ {t.buttonText}</span>
              </>
            )}
          </button>
        </form>
      )}

      {status === 'error' && (
        <div className="form-error-msg">
          <AlertCircle size={15} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Priority Notice Line */}
      <div className="notice-badge-container">
        <div className="notice-badge">
          <ShieldCheck size={16} color="#C5A059" className="notice-icon" />
          <span>{t.subscribersNotice}</span>
        </div>
      </div>
    </div>
  );
}
