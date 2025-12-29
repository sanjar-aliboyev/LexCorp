'use client';

import { useState, useEffect } from 'react';
import { X, Phone, ChevronRight, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Messenger Icons as SVG components
const TelegramIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" style={style} fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const WhatsAppIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" style={style} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const MessengerIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" style={style} fill="currentColor">
    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
  </svg>
);

// Contact information
const CONTACTS = {
  phone: '+99894 331 8811',
  whatsapp: 'https://wa.me/message/JSVUNNWENLXUP1',
  telegram: 'https://t.me/LexpertSA',
  messenger: 'https://m.me/lexpert',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://maps.app.goo.gl/7yPqJ2ExjbqBsNP39',
  mapUrl: 'https://maps.app.goo.gl/7yPqJ2ExjbqBsNP39',
};

const messengerIcons = [
  { Icon: TelegramIcon, name: 'Telegram' },
  { Icon: WhatsAppIcon, name: 'WhatsApp' },
  { Icon: MessengerIcon, name: 'Messenger' },
];

export default function FloatingMessenger() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useLanguage();

  // Rotate icons every 3 seconds
  useEffect(() => {
    if (isOpen) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIconIndex((prev) => (prev + 1) % messengerIcons.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Close modal on escape key and lock body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const CurrentIcon = messengerIcons[currentIconIndex].Icon;

  return (
    <>
      {/* Floating Button - Gold accent with navy background */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open messenger contact options"
        className="floating-messenger-btn"
      >
        <div
          className="floating-messenger-icon"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'scale(0.5) rotate(180deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <CurrentIcon style={{ width: '26px', height: '26px' }} />
        </div>
        <span className="floating-messenger-pulse" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="messenger-modal-overlay">
          {/* Backdrop */}
          <div
            className="messenger-modal-backdrop"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="messenger-modal-container">
            {/* Header with gold accent */}
            <div className="messenger-modal-header">
              <div>
                <h3 className="messenger-modal-title">{t.messenger.title}</h3>
                <p className="messenger-modal-subtitle">{t.messenger.subtitle}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                className="messenger-modal-close"
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            {/* Content */}
            <div className="messenger-modal-content">
              <div className="messenger-modal-layout">
                {/* QR Code Section */}
                <div className="messenger-qr-section">
                  <div className="messenger-qr-container">
                    <img
                      src={CONTACTS.qrCodeUrl}
                      alt={t.messenger.qrCaption}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="messenger-qr-label">
                    <MapPin style={{ width: '12px', height: '12px' }} />
                    <span>{t.messenger.qrCaption}</span>
                  </div>
                </div>

                {/* Messenger Buttons */}
                <div className="messenger-buttons">
                  {/* Max (Messenger) */}
                  <a
                    href={CONTACTS.messenger}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="messenger-btn messenger-btn-purple"
                  >
                    <MessengerIcon style={{ width: '22px', height: '22px' }} />
                    <span>Max (Messenger)</span>
                    <ChevronRight style={{ width: '18px', height: '18px', opacity: 0.7 }} />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={CONTACTS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="messenger-btn messenger-btn-green"
                  >
                    <WhatsAppIcon style={{ width: '22px', height: '22px' }} />
                    <span>WhatsApp</span>
                    <ChevronRight style={{ width: '18px', height: '18px', opacity: 0.7 }} />
                  </a>

                  {/* Telegram */}
                  <a
                    href={CONTACTS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="messenger-btn messenger-btn-blue"
                  >
                    <TelegramIcon style={{ width: '22px', height: '22px' }} />
                    <span>Telegram</span>
                    <ChevronRight style={{ width: '18px', height: '18px', opacity: 0.7 }} />
                  </a>
                </div>
              </div>

              {/* Phone Section */}
              <div className="messenger-phone-section">
                <span className="messenger-phone-label">{t.messenger.phoneLabel}</span>
                <a
                  href={`tel:${CONTACTS.phone.replace(/\s/g, '')}`}
                  className="messenger-phone-link"
                >
                  <Phone style={{ width: '16px', height: '16px' }} />
                  <span>{CONTACTS.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles using CSS variables for theme support */}
      <style jsx global>{`
        /* ===== FLOATING BUTTON ===== */
        .floating-messenger-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1100;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--primary-color);
          border: 3px solid var(--accent-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(197, 160, 89, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }

        .floating-messenger-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 28px rgba(197, 160, 89, 0.45);
          background: var(--accent-color);
        }

        .floating-messenger-icon {
          color: var(--accent-color);
          transition: all 0.3s ease, color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-messenger-btn:hover .floating-messenger-icon {
          color: var(--primary-color);
        }

        .floating-messenger-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid var(--accent-color);
          animation: messengerPulse 2s ease-out infinite;
          pointer-events: none;
        }

        @keyframes messengerPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        /* ===== MODAL OVERLAY ===== */
        .messenger-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: modalOverlayFadeIn 0.2s ease;
        }

        @keyframes modalOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .messenger-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }

        [data-theme="dark"] .messenger-modal-backdrop {
          background: rgba(0, 0, 0, 0.7);
        }

        /* ===== MODAL CONTAINER ===== */
        .messenger-modal-container {
          position: relative;
          width: 100%;
          max-width: 480px;
          background: var(--bg-card);
          border-radius: 16px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          overflow: hidden;
          animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* ===== MODAL HEADER ===== */
        .messenger-modal-header {
          padding: 20px 24px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 2px solid var(--accent-color);
          background: var(--bg-surface);
        }

        .messenger-modal-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--accent-color);
          margin: 0;
          line-height: 1.3;
        }

        .messenger-modal-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 4px 0 0 0;
        }

        .messenger-modal-close {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .messenger-modal-close:hover {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: var(--primary-color);
        }

        /* ===== MODAL CONTENT ===== */
        .messenger-modal-content {
          padding: 24px;
        }

        .messenger-modal-layout {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }

        @media (max-width: 480px) {
          .messenger-modal-layout {
            flex-direction: column;
            align-items: center;
          }
        }

        /* ===== QR CODE SECTION ===== */
        .messenger-qr-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .messenger-qr-container {
          width: 120px;
          height: 120px;
          background: #ffffff;
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--border-color);
        }

        .messenger-qr-label {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 10px;
          font-size: 11px;
          color: var(--text-secondary);
        }

        .messenger-qr-label svg {
          color: var(--accent-color);
        }

        /* ===== MESSENGER BUTTONS ===== */
        .messenger-buttons {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }

        .messenger-btn {
          display: flex;
          align-items: center;
          padding: 12px 14px;
          border-radius: 12px;
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .messenger-btn:hover {
          transform: translateX(4px);
        }

        .messenger-btn span {
          flex: 1;
          margin-left: 12px;
        }

        .messenger-btn-purple {
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        }
        .messenger-btn-purple:hover {
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
        }

        .messenger-btn-green {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        }
        .messenger-btn-green:hover {
          box-shadow: 0 4px 16px rgba(34, 197, 94, 0.4);
        }

        .messenger-btn-blue {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
        }
        .messenger-btn-blue:hover {
          box-shadow: 0 4px 16px rgba(14, 165, 233, 0.4);
        }

        /* ===== PHONE SECTION ===== */
        .messenger-phone-section {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .messenger-phone-label {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .messenger-phone-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          color: var(--text-main);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .messenger-phone-link svg {
          color: var(--accent-color);
        }

        .messenger-phone-link:hover {
          color: var(--accent-color);
        }
      `}</style>
    </>
  );
}
