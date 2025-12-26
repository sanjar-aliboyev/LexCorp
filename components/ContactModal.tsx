'use client';

import React, { useState } from 'react';
import { X, Send, Phone, User, MessageSquare } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function ContactModal() {
  const { isContactOpen, closeContact } = useModal();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  if (!isContactOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Header Popup (Bog\'lanish)' // Helpful label
        }),
      });

      if (res.ok) {
        alert("Xabar yuborildi! Tez orada aloqaga chiqamiz.");
        setFormData({ name: '', phone: '', message: '' });
        closeContact();
      } else {
        alert("Xatolik yuz berdi.");
      }
    } catch (error) {
      alert("Internet bilan aloqa yo'q.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeContact}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeContact}><X size={24} /></button>
        
        <div className="modal-header">
          <h2>Xabar Qoldirish</h2>
          <p>Ma'lumotlaringizni to'ldiring, biz sizga bepul maslahat beramiz.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User size={18} className="icon" />
            <input 
              type="text" 
              placeholder="Ismingiz" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="input-group">
            <Phone size={18} className="icon" />
            <input 
              type="tel" 
              placeholder="Telefon Raqamingiz" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="input-group">
            <MessageSquare size={18} className="icon top-icon" />
            <textarea 
              rows={4} 
              placeholder="Xabar Mazmuni"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Yuborilmoqda...' : 'Yuborish'} <Send size={18} />
          </button>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 31, 63, 0.6); backdrop-filter: blur(4px);
          display: flex; justify-content: center; align-items: center; z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        .modal-content {
          background: var(--bg-card); width: 90%; max-width: 500px;
          padding: 40px; border-radius: 12px; position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 1px solid var(--border-color);
          animation: slideUp 0.3s ease;
        }
        .close-btn {
          position: absolute; top: 15px; right: 15px; background: none; border: none;
          color: var(--text-secondary); cursor: pointer; transition: color 0.2s;
        }
        .close-btn:hover { color: #C5A059; }
        .modal-header { text-align: center; margin-bottom: 30px; }
        .modal-header h2 { font-family: var(--font-merriweather); color: var(--text-main); margin-bottom: 10px; }
        .modal-header p { color: var(--text-secondary); font-size: 0.95rem; }
        
        .input-group { position: relative; margin-bottom: 20px; }
        .icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #C5A059; pointer-events: none; }
        .icon.top-icon { top: 15px; transform: none; }
        
        input, textarea {
          width: 100%; padding: 12px 15px 12px 45px;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          border-radius: 8px; color: var(--text-main); font-size: 1rem;
          transition: border-color 0.3s;
        }
        input:focus, textarea:focus { outline: none; border-color: #C5A059; background: var(--bg-card); }
        
        .submit-btn {
          width: 100%; background: #001F3F; color: #fff; padding: 14px;
          border: none; border-radius: 8px; font-weight: 700; cursor: pointer;
          display: flex; justify-content: center; align-items: center; gap: 10px;
          transition: background 0.3s;
        }
        .submit-btn:hover { background: #003366; }
        .submit-btn:disabled { background: #ccc; cursor: not-allowed; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}