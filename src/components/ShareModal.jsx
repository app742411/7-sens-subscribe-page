import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Mail, 
  Sparkles, 
  Smartphone
} from 'lucide-react';
import { translations } from '../i18n/translations';

// High-fidelity branded SVGs for popular networks
const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.4.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const MessengerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.077.298 2.222.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.888-3.259-6.559 6.963z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function ShareModal({ 
  isOpen, 
  onClose, 
  lang = 'fr',
  fromSubmission = false
}) {
  const t = translations[lang] || translations.fr;
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Determine share URL. When testing on localhost, use the production/live domain so Facebook, LinkedIn, etc. work properly.
  const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.hostname.includes('192.168.')
  );
  
  const publicShareUrl = isLocalhost 
    ? 'https://dev.7-sens.com' 
    : (typeof window !== 'undefined' ? window.location.href.split('#')[0].split('?')[0] : 'https://dev.7-sens.com');

  const displayUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0].split('?')[0] : 'https://dev.7-sens.com';

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const fallbackCopyText = (text, callback) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      if (callback) callback();
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  };

  // Handle URL Copy
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(displayUrl);
      setCopiedLink(true);
      showToast(t.shareCopied || 'Lien copié !');
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      fallbackCopyText(displayUrl, () => {
        setCopiedLink(true);
        showToast(t.shareCopied || 'Lien copié !');
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  // 1. WhatsApp Sharing
  const handleShareWhatsApp = () => {
    const message = `${t.shareWhatsappText}${publicShareUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // 2. Email Sharing
  const handleShareEmail = () => {
    const subject = encodeURIComponent(t.shareEmailSubject);
    const body = encodeURIComponent(`${t.shareEmailBody}\n${publicShareUrl}`);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    
    // Use hidden anchor tag to trigger mail client reliably
    const anchor = document.createElement('a');
    anchor.href = mailtoUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  // 3. Facebook Sharing
  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicShareUrl)}`;
    window.open(fbUrl, '_blank', 'width=620,height=580,toolbar=no,location=no,status=no,menubar=no');
  };

  // 4. Instagram Sharing
  const handleShareInstagram = async () => {
    // Copy invite text + link to clipboard
    const inviteText = `${t.shareWhatsappText}${publicShareUrl}`;
    try {
      await navigator.clipboard.writeText(inviteText);
    } catch {
      fallbackCopyText(inviteText);
    }
    showToast(t.shareInstagramNote || 'Lien copié ! Ouvrez Instagram pour le coller.');
    // Open Instagram immediately (user gesture context)
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  // 5. Messenger Sharing
  const handleShareMessenger = () => {
    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `fb-messenger://share?link=${encodeURIComponent(publicShareUrl)}`;
    } else {
      const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(publicShareUrl)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(publicShareUrl)}`;
      const popup = window.open(messengerUrl, '_blank', 'width=620,height=580');
      // If popup blocked or app_id unauthenticated, fallback to Facebook sharer
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicShareUrl)}`, '_blank');
      }
    }
  };

  // 6. LinkedIn Sharing
  const handleShareLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicShareUrl)}`;
    window.open(linkedinUrl, '_blank', 'width=620,height=580,toolbar=no,location=no,status=no,menubar=no');
  };

  // 7. Native Mobile Share
  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: t.shareEventDetailsTitle || '7Sens',
          text: t.shareWhatsappText,
          url: publicShareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div 
        className="share-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        {/* Close button */}
        <button 
          type="button" 
          className="share-modal-close-btn" 
          onClick={onClose}
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {/* Optional Submission Success Banner */}
        {fromSubmission && (
          <div className="share-submission-banner">
            <Sparkles size={16} className="share-banner-sparkle" />
            <span>{t.shareSuccessBanner}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="share-modal-header">
          <div className="share-modal-badge">
            <span className="share-badge-dot">♦</span>
            <span>{t.shareModalBadge}</span>
          </div>
          <h2 id="share-modal-title" className="share-modal-h2">
            {t.shareModalTitle}
          </h2>
        </div>

        {/* Sharing Channels Grid */}
        <div className="share-channels-section">
          <span className="share-section-label">{t.shareChannelsLabel}</span>

          <div className="share-channels-grid">
            {/* WhatsApp */}
            <button 
              type="button" 
              className="share-channel-btn share-btn-whatsapp"
              onClick={handleShareWhatsApp}
              title="WhatsApp"
            >
              <div className="share-btn-icon-wrapper whatsapp-bg">
                <WhatsAppIcon />
              </div>
              <span className="share-btn-label">WhatsApp</span>
            </button>

            {/* Email */}
            <button 
              type="button" 
              className="share-channel-btn share-btn-email"
              onClick={handleShareEmail}
              title="E-mail"
            >
              <div className="share-btn-icon-wrapper email-bg">
                <Mail size={20} />
              </div>
              <span className="share-btn-label">E-mail</span>
            </button>

            {/* Facebook */}
            <button 
              type="button" 
              className="share-channel-btn share-btn-facebook"
              onClick={handleShareFacebook}
              title="Facebook"
            >
              <div className="share-btn-icon-wrapper facebook-bg">
                <FacebookIcon />
              </div>
              <span className="share-btn-label">Facebook</span>
            </button>

            {/* Instagram */}
            <button 
              type="button" 
              className="share-channel-btn share-btn-instagram"
              onClick={handleShareInstagram}
              title="Instagram"
            >
              <div className="share-btn-icon-wrapper instagram-bg">
                <InstagramIcon />
              </div>
              <span className="share-btn-label">Instagram</span>
            </button>

            {/* Messenger */}
            <button 
              type="button" 
              className="share-channel-btn share-btn-messenger"
              onClick={handleShareMessenger}
              title="Messenger"
            >
              <div className="share-btn-icon-wrapper messenger-bg">
                <MessengerIcon />
              </div>
              <span className="share-btn-label">Messenger</span>
            </button>

            {/* LinkedIn */}
            <button 
              type="button" 
              className="share-channel-btn share-btn-linkedin"
              onClick={handleShareLinkedIn}
              title="LinkedIn"
            >
              <div className="share-btn-icon-wrapper linkedin-bg">
                <LinkedInIcon />
              </div>
              <span className="share-btn-label">LinkedIn</span>
            </button>

            {/* Phone Native Share Menu */}
            <button 
              type="button" 
              className="share-channel-btn share-btn-native"
              onClick={handleNativeShare}
              title={t.shareNative}
            >
              <div className="share-btn-icon-wrapper native-bg">
                <Smartphone size={20} />
              </div>
              <span className="share-btn-label">{t.shareNative}</span>
            </button>

            {/* Copy Direct Link */}
            <button 
              type="button" 
              className={`share-channel-btn share-btn-copy ${copiedLink ? 'is-copied' : ''}`}
              onClick={handleCopyLink}
              title={t.shareCopyLink}
            >
              <div className="share-btn-icon-wrapper copy-bg">
                {copiedLink ? <Check size={20} /> : <Copy size={20} />}
              </div>
              <span className="share-btn-label">{copiedLink ? t.shareCopied : t.shareCopyLink}</span>
            </button>
          </div>
        </div>

        {/* Direct Link Box & Quick Copy */}
        <div className="share-link-box-container">
          <label className="share-link-box-label">{t.shareDirectUrlLabel}</label>
          <div className="share-link-input-group">
            <input 
              type="text" 
              readOnly 
              value={displayUrl} 
              className="share-link-input"
              onClick={(e) => e.target.select()}
            />
            <button 
              type="button" 
              className="share-link-copy-btn"
              onClick={handleCopyLink}
            >
              {copiedLink ? (
                <>
                  <Check size={14} color="#10B981" />
                  <span>{t.shareCopied}</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>{t.shareCopyLink}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="share-toast-notification">
            <Check size={16} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
