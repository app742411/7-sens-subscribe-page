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
        colors: ['#C5A059', '#D4A017', '#0B1B36']
      });
    } catch (err) {
      console.warn('API submission error:', err);
      setStatus('success');
      setEmail('');

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#C5A059', '#D4A017', '#0B1B36']
      });
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '560px', margin: '1.75rem 0' }}>
      {status === 'success' ? (
        <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '4px', border: '1px solid #C5A059', boxShadow: '0 8px 25px rgba(11, 27, 54, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#0B1B36', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.2rem' }}>
            <CheckCircle2 size={20} color="#C5A059" />
            <span>{t.successTitle}</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#4A5568' }}>
            {t.successSubtitle}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', width: '100%', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Mail size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              style={{
                width: '100%',
                background: '#ffffff',
                border: '1px solid #CBD5E1',
                padding: '0.9rem 1rem 0.9rem 2.8rem',
                fontSize: '0.92rem',
                color: '#0B1B36',
                borderRadius: '0',
                outline: 'none',
                transition: '0.2s',
                fontFamily: 'inherit'
              }}
              disabled={status === 'loading'}
            />
          </div>

          <button
            type="submit"
            style={{
              background: '#0B1B36',
              color: '#ffffff',
              border: 'none',
              padding: '0.9rem 1.6rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              borderRadius: '0',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap'
            }}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#E11D48', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          <AlertCircle size={15} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Premium Priority & Confidentiality Notice Line (Non-clickable static badge) */}
      <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#C5A059', fontSize: '0.82rem', fontWeight: 600 }}>
        <ShieldCheck size={16} color="#C5A059" />
        <span>{t.subscribersNotice}</span>
      </div>
    </div>
  );
}
