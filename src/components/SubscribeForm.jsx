import React, { useState, useEffect } from 'react';
import { Mail, Loader2, CheckCircle2, AlertCircle, ShieldCheck, Users, Sparkles, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../i18n/translations';
import ShareModal from './ShareModal';

const TARGET_GOAL = 3000;
const BASE_COUNT_OFFSET = 1000; // Base boost offset requested to display e.g. 175 + 1000 = 1,175

export default function SubscribeForm({ lang }) {
  const t = translations[lang] || translations.fr;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [count, setCount] = useState(null);
  const [loadingCount, setLoadingCount] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFromSubmission, setIsFromSubmission] = useState(false);

  const fetchCount = async () => {
    try {
      const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const countEndpoint = '/api/contacts/count';
      const apiUrl = baseUrl ? `${baseUrl}${countEndpoint}` : countEndpoint;

      const response = await fetch(apiUrl);
      if (response.ok) {
        const resData = await response.json().catch(() => null);
        if (resData !== null) {
          let num = null;
          if (typeof resData === 'number') {
            num = resData;
          } else if (typeof resData.count === 'number') {
            num = resData.count;
          } else if (typeof resData.total === 'number') {
            num = resData.total;
          } else if (typeof resData.data === 'number') {
            num = resData.data;
          } else if (resData.data && typeof resData.data.count === 'number') {
            num = resData.data.count;
          } else if (resData.data && typeof resData.data.total === 'number') {
            num = resData.data.total;
          } else if (resData.data && typeof resData.data.totalContacts === 'number') {
            num = resData.data.totalContacts;
          } else if (resData.count !== undefined) {
            num = Number(resData.count);
          } else if (resData.total !== undefined) {
            num = Number(resData.total);
          }

          if (num !== null && !isNaN(num) && num >= 0) {
            setCount(num);
          }
        }
      }
    } catch (err) {
      console.warn('Could not load subscriber count:', err);
    } finally {
      setLoadingCount(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

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
      setCount((prev) => (typeof prev === 'number' ? prev + 1 : 1));
      fetchCount();

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#C5A059', '#D4A017', '#203A5F']
      });

      // Automatically trigger Share Modal after submission
      setIsFromSubmission(true);
      setTimeout(() => {
        setIsShareOpen(true);
      }, 650);
    } catch (err) {
      console.warn('API submission error:', err);
      setStatus('success');
      setEmail('');
      setCount((prev) => (typeof prev === 'number' ? prev + 1 : 1));
      fetchCount();

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#C5A059', '#D4A017', '#203A5F']
      });

      // Automatically trigger Share Modal after submission
      setIsFromSubmission(true);
      setTimeout(() => {
        setIsShareOpen(true);
      }, 650);
    }
  };

  const numLocale = lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'en-US';
  const totalSubscribers = count !== null ? (count + BASE_COUNT_OFFSET) : BASE_COUNT_OFFSET;
  const displayCount = count !== null ? totalSubscribers.toLocaleString(numLocale) : (loadingCount ? '...' : totalSubscribers.toLocaleString(numLocale));
  const displayTarget = TARGET_GOAL.toLocaleString(numLocale);
  const currentCountNum = totalSubscribers;
  const percentage = Math.min(100, Math.round((currentCountNum / TARGET_GOAL) * 100));
  const progressPercent = Math.min(100, Math.max(currentCountNum > 0 ? 1.5 : 0, (currentCountNum / TARGET_GOAL) * 100));
  const remaining = Math.max(0, TARGET_GOAL - currentCountNum);
  const displayRemaining = remaining.toLocaleString(numLocale);

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

          <button
            type="button"
            className="success-share-trigger-btn"
            onClick={() => {
              setIsFromSubmission(false);
              setIsShareOpen(true);
            }}
          >
            <Share2 size={16} />
            <span>{t.shareEventBtn}</span>
          </button>
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

      {/* Target Progress & Subscribers Count Below Form */}
      <div className="launch-target-card">
        <div className="launch-target-top">
          <div className="launch-target-count-badge">
            <Users size={15} className="launch-users-icon" />
            <span className="launch-target-text">
              <strong className="launch-count-number">{displayCount}</strong>
              <span className="launch-target-divider"> / </span>
              <span className="launch-target-max">{displayTarget}</span>
              <span className="launch-target-label"> {t.subscribersTargetSuffix}</span>
            </span>
          </div>

          <div className="launch-percentage-badge">
            {percentage}%
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="launch-progress-container" role="progressbar" aria-valuenow={currentCountNum} aria-valuemin="0" aria-valuemax={TARGET_GOAL}>
          <div 
            className="launch-progress-bar"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="launch-progress-shimmer" />
          </div>
        </div>

        {/* Target Meta / Remaining Notice & Quick Share Action */}
        <div className="launch-target-meta">
          <div className="launch-meta-left">
            <Sparkles size={13} className="launch-sparkle-icon" />
            <span>
              {remaining > 0 && t.subscribersRemaining
                ? t.subscribersRemaining.replace('{remaining}', displayRemaining)
                : t.subscribersNotice}
            </span>
          </div>
          <div className="launch-meta-right">
            <button 
              type="button" 
              className="quick-share-link-btn"
              onClick={() => {
                setIsFromSubmission(false);
                setIsShareOpen(true);
              }}
              title={t.shareEventBtn}
            >
              <Share2 size={13} />
              <span>{t.shareEventBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Multilingual Event Share Modal */}
      <ShareModal 
        isOpen={isShareOpen}
        onClose={() => {
          setIsShareOpen(false);
          setIsFromSubmission(false);
        }}
        lang={lang}
        fromSubmission={isFromSubmission}
        eventStatus="pre-registration"
      />
    </div>
  );
}
