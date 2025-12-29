'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, Building2, FileText, Scale, Home, ShieldAlert, Gavel, 
  ClipboardList, Download, X, CheckCircle 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import { SERVICES_DATA } from '../data/services';

export default function ServicesSection() {
  const { t, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0); 
  
  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: ''
  });

  // Fallback language if context is undefined
  const currentLang = (lang || 'UZ') as 'UZ' | 'RU' | 'EN';

  // --- FORM HANDLER ---
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          serviceType: formData.serviceType,
          source: 'Services Section Homepage Modal', // A helpful label
          subject: `Service Order Request from ${formData.name}`,
        }),
      });

      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', serviceType: '' }); // Clear form
        setTimeout(() => {
          setFormStatus('idle');
          setIsModalOpen(false);
        }, 2500);
      } else {
        console.error('Failed to send service order:', res.statusText);
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error sending service order:', error);
      setFormStatus('error');
    }
  };

  return (
    <section className="services-container">
      
      {/* 1. BACKGROUND LAYER */}
      {SERVICES_DATA.map((service, index) => (
        <div 
          key={service.id}
          className={`bg-layer ${activeIndex === index ? 'active' : ''}`}
          style={{ backgroundImage: `url(${service.image})` }}
        />
      ))}

      {/* 2. OVERLAY */}
      <div className="overlay" />

      {/* 3. CONTENT GRID */}
      <div className="content-wrapper">
        
        {/* --- HEADER ROW WITH BUTTONS --- */}
        <div className="section-header-row">
          <div className="header-left">
            <h2 className="section-title">{t.servicesPage?.title || "Our Expertise"}</h2>
            <div className="header-line"></div>
          </div>

          <div className="header-actions">
            {/* BUTTON 1: ORDER SERVICE */}
            <button onClick={() => setIsModalOpen(true)} className="action-btn primary">
              <ClipboardList size={18} />
              <span>
                {currentLang === 'EN' ? 'Order Service' : 
                 currentLang === 'RU' ? 'Заказать услугу' : 
                 'Xizmat buyurtma qilish'}
              </span>
            </button>

            {/* BUTTON 2: DOWNLOAD PPT */}
            <a href="/presentation.pdf" download className="action-btn outline">
              <Download size={18} />
              <span>
                {currentLang === 'EN' ? 'Download PPT' : 
                 currentLang === 'RU' ? 'Скачать презентацию' : 
                 'Prezentatsiyani yuklash'}
              </span>
            </a>
          </div>
        </div>

        <div className="services-grid">
          {SERVICES_DATA.map((service, index) => {
            const Icon = service.icon;
            const title = service.titles[currentLang] || service.titles['EN'];
            const subList = service.subServices[currentLang] || service.subServices['EN'];

            return (
              <div 
                key={service.id}
                className={`service-card ${activeIndex === index ? 'active-card' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="card-top">
                  <div className="icon-wrapper"><Icon size={32} /></div>
                  <h3 className="card-title">{title}</h3>
                </div>

                <div className="card-reveal">
                  <div className="divider"></div>
                  <ul className="sub-service-list">
                    {subList.map((sub, i) => (
                      <li key={i} className="sub-item">
                        <ArrowRight size={14} className="arrow-icon" /> {sub}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/services" className="learn-more-btn">
                    {t.practicePage?.readMore || "Learn More"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- POPUP MODAL --- */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </button>

            {formStatus === 'success' ? (
              <div className="success-view">
                <CheckCircle size={60} color="#16a34a" />
                <h3>Successfully Sent!</h3>
                <p>We will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit}>
                <h3 className="modal-title">
                  {currentLang === 'EN' ? 'Order Legal Service' : 
                   currentLang === 'RU' ? 'Заказать юридическую услугу' : 
                   'Yuridik xizmatga buyurtma'}
                </h3>
                
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="John Doe" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+998 90 123 45 67" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                  />
                </div>

                <div className="form-group">
                  <label>Service Type</label>
                  <select 
                    required 
                    value={formData.serviceType} 
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  >
                    <option value="" disabled>Select a service...</option>
                    {SERVICES_DATA.map(s => (
                      <option key={s.id} value={s.titles['EN']}> {/* Use EN title as value */}
                        {s.titles[currentLang] || s.titles['EN']}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="submit-btn" disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .services-container {
          position: relative;
          min-height: 800px;
          overflow: hidden;
          background-color: #001F3F;
        }

        /* --- HEADER LAYOUT --- */
        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 50px;
          flex-wrap: wrap;
          gap: 30px;
        }
        .header-left { flex-grow: 1; }
        .section-title {
          font-family: var(--font-merriweather);
          font-size: 3rem; color: #fff; margin-bottom: 15px;
        }
        .header-line { width: 80px; height: 4px; background: #C5A059; }

        /* --- BUTTONS --- */
        .header-actions {
          display: flex;
          gap: 15px;
        }
        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 0.95rem;
        }
        .action-btn.primary {
          background-color: #C5A059;
          color: #001F3F;
          border: 1px solid #C5A059;
        }
        .action-btn.primary:hover {
          background-color: #fff;
          border-color: #fff;
        }
        .action-btn.outline {
          background-color: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.3);
        }
        .action-btn.outline:hover {
          border-color: #C5A059;
          color: #C5A059;
        }

        /* --- MODAL STYLES --- */
        .modal-backdrop {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(5px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .modal-content {
          background: var(--bg-card);
          padding: 40px;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
          position: relative;
          border: 1px solid var(--border-color);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .close-btn {
          position: absolute; top: 15px; right: 15px;
          background: transparent; border: none; color: var(--text-secondary);
          cursor: pointer;
        }
        .modal-title {
          font-family: var(--font-merriweather);
          font-size: 1.5rem; color: var(--text-main); margin-bottom: 25px;
          text-align: center;
        }
        .form-group { margin-bottom: 20px; }
        .form-group label {
          display: block; margin-bottom: 8px; color: var(--text-secondary); font-size: 0.9rem;
        }
        .form-group input, .form-group select {
          width: 100%; padding: 12px; border-radius: 6px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-main);
          outline: none;
        }
        .form-group input:focus { border-color: #C5A059; }
        .submit-btn {
          width: 100%; padding: 14px; background: #001F3F; color: #fff;
          border: none; border-radius: 6px; font-weight: 600; cursor: pointer;
          transition: background 0.2s;
        }
        .submit-btn:hover { background: #C5A059; color: #001F3F; }
        
        .success-view { text-align: center; padding: 20px 0; }
        .success-view h3 { margin-top: 15px; color: var(--text-main); }

        /* --- BACKGROUND TRANSITIONS --- */
        .bg-layer {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-size: cover; background-position: center;
          opacity: 0;
          transition: opacity 0.6s ease-in-out;
          z-index: 1;
        }
        .bg-layer.active { opacity: 1; }

        .overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to right, rgba(0, 31, 63, 0.95) 0%, rgba(0, 31, 63, 0.8) 40%, rgba(0, 31, 63, 0.4) 100%);
          z-index: 2;
        }

        /* --- CONTENT LAYOUT --- */
        .content-wrapper {
          position: relative; z-index: 3;
          max-width: 1300px; margin: 0 auto;
          padding: 100px 5%;
          height: 100%;
          display: flex; flex-direction: column; justify-content: center;
        }

        /* --- GRID --- */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          border-top: 1px solid rgba(255,255,255,0.15);
          border-left: 1px solid rgba(255,255,255,0.15);
        }

        @media (min-width: 768px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .services-grid { grid-template-columns: repeat(3, 1fr); } }

        /* --- CARD STYLES --- */
        .service-card {
          position: relative;
          padding: 40px;
          border-right: 1px solid rgba(255,255,255,0.15);
          border-bottom: 1px solid rgba(255,255,255,0.15);
          transition: all 0.3s ease;
          cursor: pointer;
          min-height: 280px;
          display: flex; flex-direction: column;
          background: rgba(0, 31, 63, 0.2);
          backdrop-filter: blur(2px);
        }

        .service-card:hover, .service-card.active-card {
          background: rgba(255, 255, 255, 0.05);
        }

        /* Default State */
        .card-top {
          display: flex; align-items: center; gap: 20px;
          transition: transform 0.4s ease;
        }
        .icon-wrapper { color: #C5A059; transition: color 0.3s; }
        .card-title {
          color: #fff; font-size: 1.5rem; font-weight: 700;
          font-family: var(--font-merriweather);
        }

        /* Hover Reveal State */
        .card-reveal {
          max-height: 0; opacity: 0; overflow: hidden;
          transition: max-height 0.5s ease, opacity 0.5s ease;
        }

        /* ACTIVE / HOVER LOGIC */
        .service-card.active-card .card-top {
          transform: translateY(-10px);
        }
        .service-card.active-card .card-reveal {
          max-height: 300px;
          opacity: 1;
          margin-top: 20px;
        }
        .service-card.active-card .icon-wrapper { color: #fff; }
        .service-card.active-card .card-title { color: #C5A059; }

        .divider {
          width: 40px; height: 2px; background: #C5A059; margin-bottom: 20px;
        }

        .sub-service-list {
          list-style: none; padding: 0; margin-bottom: 25px;
        }
        .sub-item {
          color: #e2e8f0; font-size: 0.95rem; margin-bottom: 8px;
          display: flex; align-items: center; gap: 10px;
        }
        .arrow-icon { color: #C5A059; }

        .learn-more-btn {
          color: #fff; font-size: 0.9rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1px;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s;
        }
        .learn-more-btn:hover { border-bottom-color: #C5A059; color: #C5A059; }

        /* Responsive */
        @media (max-width: 768px) {
          .section-title { font-size: 2rem; }
          .services-grid { border-right: 1px solid rgba(255,255,255,0.15); }
          .service-card.active-card .card-reveal { max-height: 500px; }
          
          /* Updated Header Actions for Mobile */
          .section-header-row { flex-direction: column; align-items: flex-start; }
          .header-actions { width: 100%; flex-direction: column; }
          .action-btn { justify-content: center; }
        }
      `}</style>
    </section>
  );
}