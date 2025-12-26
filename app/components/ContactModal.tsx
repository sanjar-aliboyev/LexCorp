'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from './ModalContext';

export default function ContactModal() {
  const { t } = useLanguage();
  const { isOpen, closeModal } = useModal();
  const [isAnimating, setIsAnimating] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Handle animation for smooth entry
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  if (!isOpen && !isAnimating) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Contact Modal', // You can change this source as needed
        }),
      });

      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', message: '' }); // Clear form
      } else {
        console.error('Failed to send email:', res.statusText);
        alert('Failed to send message. Please try again.'); // User feedback
        setFormStatus('idle'); // Reset form status
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred. Please try again.'); // User feedback
      setFormStatus('idle'); // Reset form status
    }
  };

  const handleClose = () => {
    setFormStatus('idle'); // Reset form on close
    closeModal();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}>
      <div className={`modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        
        <button className="close-btn" onClick={handleClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2>{t.contactPage.formTitle}</h2>
          <p>{t.contactPage.formDesc}</p>
        </div>

        {formStatus === 'success' ? (
          <div className="success-view">
            <CheckCircle size={64} color="#16a34a" />
            <h3>{t.contactPage.successTitle}</h3>
            <p>{t.contactPage.successDesc}</p>
            <button onClick={handleClose} className="btn-primary full-width">
              OK
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <label>{t.contactPage.labelName}</label>
              <input
                type="text"
                name="name"
                required
                className="modal-input"
                placeholder="..."
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>{t.contactPage.labelPhone}</label>
              <input
                type="tel"
                name="phone"
                required
                className="modal-input"
                placeholder="+998..."
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>{t.contactPage.labelMessage}</label>
              <textarea
                name="message"
                rows={3}
                className="modal-input"
                placeholder="..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary full-width" disabled={formStatus === 'submitting'}>
              {formStatus === 'submitting' ? '...' : (
                <>{t.contactPage.btnSubmit} <Send size={16} /></>
              )}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .modal-overlay.open { opacity: 1; pointer-events: auto; }

        .modal-content {
          background: var(--bg-card);
          width: 90%; max-width: 450px;
          border-radius: 12px; padding: 40px;
          position: relative;
          border: 1px solid var(--border-color);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          transform: translateY(20px) scale(0.95);
          transition: all 0.3s ease;
          opacity: 0;
        }
        .modal-content.open { transform: translateY(0) scale(1); opacity: 1; }

        .close-btn {
          position: absolute; top: 15px; right: 15px;
          background: transparent; border: none;
          color: var(--text-secondary); cursor: pointer;
          transition: color 0.2s;
        }
        .close-btn:hover { color: #C5A059; }

        .modal-header { text-align: center; margin-bottom: 25px; }
        .modal-header h2 { font-family: var(--font-merriweather); color: var(--text-main); margin-bottom: 10px; }
        .modal-header p { color: var(--text-secondary); font-size: 0.9rem; }

        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 5px; font-weight: 600; }
        .modal-input {
          width: 100%; padding: 12px; border-radius: 6px;
          border: 1px solid var(--border-color); background: var(--bg-surface);
          color: var(--text-main); font-size: 1rem;
        }
        .modal-input:focus { outline: none; border-color: #C5A059; }

        .btn-primary {
          background: #001F3F; color: #fff; padding: 12px; border: none;
          border-radius: 6px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s;
        }
        .btn-primary:hover { background: #C5A059; color: #001F3F; }
        .full-width { width: 100%; margin-top: 10px; }

        .success-view { text-align: center; padding: 20px 0; }
        .success-view h3 { margin: 20px 0 10px; color: var(--text-main); }
        .success-view p { color: var(--text-secondary); margin-bottom: 20px; }
      `}</style>
    </div>
  );
}