'use client';

import React, { useState } from 'react';
import { Calendar, Phone, User, X, Send, ArrowRight, CheckCircle, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES_DETAILED, ServiceCategory, ServiceItem } from '../data/servicesDetailed';

export default function ServicesPage() {
  const { t, lang } = useLanguage();
  const currentLang = (lang || 'UZ') as 'UZ' | 'RU' | 'EN';

  const [activeService, setActiveService] = useState<ServiceCategory | null>(null);
  const [hoveredItem, setHoveredItem] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Contact form state
  const [contactFormData, setContactFormData] = useState({ name: '', phone: '', message: '' });
  const [contactFormStatus, setContactFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormStatus('submitting');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactFormData,
          source: 'Services Page Contact Form',
          subject: `Service Inquiry from ${contactFormData.name}`,
        }),
      });

      if (res.ok) {
        setContactFormStatus('success');
        setContactFormData({ name: '', phone: '', message: '' });
        setTimeout(() => setContactFormStatus('idle'), 5000);
      } else {
        setContactFormStatus('error');
      }
    } catch {
      setContactFormStatus('error');
    }
  };

  // Modal Form State
  const [modalFormData, setModalFormData] = useState({
    name: '',
    phone: '',
    date: '',
  });
  const [modalFormStatus, setModalFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalFormData({ ...modalFormData, [e.target.name]: e.target.value });
  };

  const handleModalDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      setModalFormData({ ...modalFormData, date: '' });
      return;
    }
    const dateObj = new Date(val);
    const day = dateObj.getDay();
    const hour = dateObj.getHours();

    if (day === 0 || day === 6) {
      alert(t.servicesPage.modalAlertWeekend);
      e.target.value = '';
      return;
    }
    if (hour < 9 || hour >= 18) {
      alert(t.servicesPage.modalAlertHours);
      e.target.value = '';
      return;
    }
    setModalFormData({ ...modalFormData, date: val });
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalFormStatus('submitting');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...modalFormData,
          source: 'Book a Call Modal (Services Page)',
          subject: `Call Booking Request from ${modalFormData.name}`,
        }),
      });

      if (res.ok) {
        setModalFormStatus('success');
        setModalFormData({ name: '', phone: '', date: '' });
        setTimeout(() => {
          setModalFormStatus('idle');
          setIsModalOpen(false);
        }, 3000);
      } else {
        setModalFormStatus('error');
      }
    } catch {
      setModalFormStatus('error');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalFormStatus('idle');
    setModalFormData({ name: '', phone: '', date: '' });
  };

  const handleServiceClick = (service: ServiceCategory) => {
    if (activeService?.id === service.id) {
      setActiveService(null);
    } else {
      setActiveService(service);
    }
    setHoveredItem(null);
  };

  const handleBackToGrid = () => {
    setActiveService(null);
    setHoveredItem(null);
  };

  return (
    <main className="services-main">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <h1 className="page-title">{t.servicesPage.title}</h1>
          <p className="hero-description">{t.servicesPage.desc}</p>
          <div className="button-group">
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              {t.servicesPage.btnBookCall} <Calendar size={18} />
            </button>
            <button onClick={scrollToForm} className="btn-outline">
              {t.servicesPage.btnWriteUs} <ArrowDown size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES INTERACTIVE SECTION */}
      <section className="services-section">
        <div className="services-container">

          {/* LEFT SIDE: Service Cards */}
          <div className={`services-grid ${activeService ? 'collapsed' : ''}`}>
            {SERVICES_DETAILED.map((service) => {
              const Icon = service.icon;
              const isActive = activeService?.id === service.id;

              return (
                <div
                  key={service.id}
                  className={`service-card ${isActive ? 'active' : ''} ${activeService && !isActive ? 'hidden' : ''}`}
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="card-icon">
                    <Icon size={40} />
                  </div>
                  <h3 className="card-title">{service.title[currentLang]}</h3>
                  <p className="card-subtitle">{service.subtitle[currentLang]}</p>
                  <div className="card-arrow">
                    <ArrowRight size={20} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE: Subsections Panel */}
          <div className={`subsections-panel ${activeService ? 'visible' : ''}`}>
            {activeService && (
              <>
                <div className="panel-header">
                  <button className="back-btn" onClick={handleBackToGrid}>
                    <ArrowRight size={20} className="back-icon" />
                    {currentLang === 'RU' ? 'Назад' : currentLang === 'EN' ? 'Back' : 'Orqaga'}
                  </button>
                  <h2 className="panel-title">{activeService.title[currentLang]}</h2>
                </div>

                <div className="subsections-list">
                  {activeService.items.map((item, index) => (
                    <div
                      key={index}
                      className={`subsection-item ${hoveredItem === item ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="subsection-header">
                        <span className="subsection-number">{String(index + 1).padStart(2, '0')}</span>
                        <span className="subsection-name">{item.name[currentLang]}</span>
                      </div>

                      {/* Tooltip with details */}
                      <div className={`subsection-tooltip ${hoveredItem === item ? 'show' : ''}`}>
                        <div className="tooltip-title">
                          {currentLang === 'RU' ? 'Включает:' : currentLang === 'EN' ? 'Includes:' : 'Tarkibi:'}
                        </div>
                        <ul className="tooltip-list">
                          {item.details[currentLang].map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="panel-cta">
                  <button onClick={() => setIsModalOpen(true)} className="btn-cta">
                    {currentLang === 'RU' ? 'Воспользуйтесь услугой' : currentLang === 'EN' ? 'Order Service' : 'Xizmatdan Foydalanish'}
                    <Send size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* MODAL POPUP */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{t.servicesPage.modalTitle}</h3>
              <button onClick={handleCloseModal} className="close-btn">
                <X size={24} />
              </button>
            </div>
            <p className="modal-desc">{t.servicesPage.modalDesc}</p>

            {modalFormStatus === 'success' ? (
              <div className="success-view-modal">
                <CheckCircle size={64} color="#16a34a" />
                <h3>{t.contactPage.successTitle}</h3>
                <p>{t.contactPage.successDesc}</p>
                <button onClick={handleCloseModal} className="submit-btn-modal">OK</button>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleModalSubmit}>
                <div className="input-group-modal">
                  <User size={20} className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder={t.servicesPage.modalPlaceholderName}
                    required
                    className="modal-input"
                    value={modalFormData.name}
                    onChange={handleModalChange}
                  />
                </div>
                <div className="input-group-modal">
                  <Phone size={20} className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t.servicesPage.modalPlaceholderPhone}
                    required
                    className="modal-input"
                    value={modalFormData.phone}
                    onChange={handleModalChange}
                  />
                </div>
                <div className="input-group-modal">
                  <Calendar size={20} className="input-icon" />
                  <input
                    type="datetime-local"
                    name="date"
                    className="modal-input"
                    value={modalFormData.date}
                    onChange={handleModalDateChange}
                  />
                </div>
                <span className="input-hint">{t.servicesPage.modalDateHint}</span>
                <button type="submit" className="submit-btn-modal" disabled={modalFormStatus === 'submitting'}>
                  {modalFormStatus === 'submitting' ? t.servicesPage.sending : (
                    <>{t.servicesPage.modalBtnConfirm} <Send size={18} /></>
                  )}
                </button>
                {modalFormStatus === 'error' && (
                  <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                    Error sending request. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      {/* CONTACT FORM SECTION */}
      <section id="contact-form-section" className="contact-form-section">
        <div className="form-container">
          <h2 className="form-title">
            {currentLang === 'RU' ? 'Воспользуйтесь услугой' : currentLang === 'EN' ? 'Order Service' : 'Xizmatdan Foydalanish'}
          </h2>
          <p className="form-desc">
            {currentLang === 'RU'
              ? 'Оставьте заявку и наши специалисты свяжутся с вами'
              : currentLang === 'EN'
                ? 'Leave a request and our specialists will contact you'
                : 'So\'rov qoldiring va mutaxassislarimiz siz bilan bog\'lanadi'}
          </p>

          <div className="form-wrapper">
            {contactFormStatus === 'success' ? (
              <div className="success-message">
                <CheckCircle size={64} color="#16a34a" />
                <h3>{t.contactPage.successTitle}</h3>
                <p>{t.contactPage.successDesc}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContactFormSubmit}>
                <div className="form-grid">
                  <div className="form-field">
                    <label>{t.blogPage.labelName}</label>
                    <input
                      type="text"
                      required
                      value={contactFormData.name}
                      onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-field">
                    <label>{t.blogPage.labelPhone}</label>
                    <input
                      type="tel"
                      required
                      value={contactFormData.phone}
                      onChange={(e) => setContactFormData({...contactFormData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>{t.blogPage.labelMsg}</label>
                  <textarea
                    rows={4}
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="form-submit-btn" disabled={contactFormStatus === 'submitting'}>
                  {contactFormStatus === 'submitting' ? t.servicesPage.sending : t.blogPage.btnSubmit} <Send size={18} />
                </button>
                {contactFormStatus === 'error' && (
                  <p className="error-text">
                    {currentLang === 'RU' ? 'Ошибка. Попробуйте еще раз.' : currentLang === 'EN' ? 'Error. Please try again.' : 'Xatolik. Qayta urinib ko\'ring.'}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-main {
          background-color: var(--bg-body);
          min-height: 100vh;
          transition: background-color 0.3s;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5%;
        }

        /* HERO */
        .hero-section {
          padding: 160px 0 60px;
          background-color: var(--bg-surface);
          text-align: center;
          border-bottom: 1px solid var(--border-color);
        }

        .page-title {
          font-size: 3rem;
          font-family: var(--font-merriweather);
          color: var(--text-main);
          margin-bottom: 20px;
        }

        .hero-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto 30px;
          line-height: 1.6;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: #001F3F;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #C5A059;
          color: #001F3F;
        }

        .button-group {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: transparent;
          color: var(--text-main);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-outline:hover {
          border-color: #C5A059;
          color: #C5A059;
        }

        /* SERVICES SECTION */
        .services-section {
          padding: 80px 5%;
          min-height: 700px;
        }

        .services-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          gap: 40px;
          position: relative;
        }

        /* GRID OF CARDS */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .services-grid.collapsed {
          width: 280px;
          grid-template-columns: 1fr;
          flex-shrink: 0;
        }

        /* SERVICE CARD */
        .service-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 30px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 200px;
        }

        .service-card:hover {
          border-color: #C5A059;
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(197, 160, 89, 0.15);
        }

        .service-card.active {
          border-color: #C5A059;
          background: linear-gradient(135deg, var(--bg-card) 0%, rgba(197, 160, 89, 0.1) 100%);
        }

        .service-card.hidden {
          opacity: 0;
          pointer-events: none;
          position: absolute;
          transform: scale(0.8);
        }

        .services-grid.collapsed .service-card {
          min-height: auto;
          padding: 20px;
        }

        .services-grid.collapsed .service-card.hidden {
          display: none;
        }

        .card-icon {
          color: #C5A059;
          margin-bottom: 20px;
          transition: transform 0.3s;
        }

        .service-card:hover .card-icon {
          transform: scale(1.1);
        }

        .services-grid.collapsed .card-icon {
          margin-bottom: 12px;
        }

        .card-title {
          font-family: var(--font-merriweather);
          font-size: 1.25rem;
          color: var(--text-main);
          margin-bottom: 10px;
          font-weight: 600;
        }

        .services-grid.collapsed .card-title {
          font-size: 1rem;
          margin-bottom: 5px;
        }

        .card-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
          flex-grow: 1;
        }

        .services-grid.collapsed .card-subtitle {
          display: none;
        }

        .card-arrow {
          position: absolute;
          bottom: 20px;
          right: 20px;
          color: #C5A059;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s;
        }

        .service-card:hover .card-arrow,
        .service-card.active .card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .services-grid.collapsed .card-arrow {
          display: none;
        }

        /* SUBSECTIONS PANEL */
        .subsections-panel {
          flex: 1;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0;
          opacity: 0;
          transform: translateX(30px);
          pointer-events: none;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .subsections-panel.visible {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
        }

        .panel-header {
          padding: 25px 30px;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-surface);
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #C5A059;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 15px;
          padding: 0;
        }

        .back-btn:hover {
          text-decoration: underline;
        }

        .back-icon {
          transform: rotate(180deg);
        }

        .panel-title {
          font-family: var(--font-merriweather);
          font-size: 1.5rem;
          color: var(--text-main);
          margin: 0;
        }

        .subsections-list {
          padding: 20px 30px;
          flex: 1;
          overflow-y: auto;
        }

        .subsection-item {
          padding: 18px 20px;
          border-radius: 8px;
          margin-bottom: 10px;
          background: var(--bg-surface);
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }

        .subsection-item:hover,
        .subsection-item.hovered {
          border-color: #C5A059;
          background: rgba(197, 160, 89, 0.08);
        }

        .subsection-header {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .subsection-number {
          font-size: 0.85rem;
          font-weight: 700;
          color: #C5A059;
          min-width: 30px;
        }

        .subsection-name {
          font-size: 1rem;
          color: var(--text-main);
          font-weight: 500;
        }

        /* TOOLTIP */
        .subsection-tooltip {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.3s ease;
          margin-top: 0;
        }

        .subsection-tooltip.show {
          max-height: 300px;
          opacity: 1;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px dashed var(--border-color);
        }

        .tooltip-title {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
          margin-bottom: 10px;
        }

        .tooltip-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tooltip-list li {
          font-size: 0.9rem;
          color: var(--text-main);
          padding: 6px 0 6px 20px;
          position: relative;
        }

        .tooltip-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #C5A059;
        }

        .panel-cta {
          padding: 20px 30px;
          border-top: 1px solid var(--border-color);
          background: var(--bg-surface);
        }

        .btn-cta {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px;
          background: #C5A059;
          color: #001F3F;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cta:hover {
          background: #001F3F;
          color: #fff;
        }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 31, 63, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(3px);
          animation: fadeIn 0.2s ease;
        }

        .modal-card {
          background: var(--bg-card);
          width: 90%;
          max-width: 400px;
          border-radius: 12px;
          padding: 30px;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .modal-header h3 {
          font-family: var(--font-merriweather);
          color: var(--text-main);
          font-size: 1.5rem;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
        }

        .modal-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 25px;
          line-height: 1.4;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .input-group-modal {
          position: relative;
          display: flex;
          align-items: center;
        }

        :global(.input-icon) {
          position: absolute;
          left: 15px;
          color: var(--text-secondary);
          pointer-events: none;
        }

        .modal-input {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 1rem;
          outline: none;
          background: var(--bg-surface);
          color: var(--text-main);
        }

        .modal-input:focus {
          border-color: #C5A059;
        }

        .input-hint {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: -10px;
          margin-bottom: 5px;
        }

        .submit-btn-modal {
          background: #C5A059;
          color: #001F3F;
          border: none;
          padding: 14px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-btn-modal:hover {
          background: #B08D4C;
        }

        .success-view-modal {
          text-align: center;
          padding: 20px 0;
        }

        .success-view-modal h3 {
          margin: 20px 0 10px;
          color: var(--text-main);
        }

        .success-view-modal p {
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .services-grid.collapsed {
            width: 220px;
          }
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }

          .services-container {
            flex-direction: column;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .services-grid.collapsed {
            width: 100%;
            display: flex;
            overflow-x: auto;
            gap: 10px;
            padding-bottom: 10px;
          }

          .services-grid.collapsed .service-card {
            min-width: 150px;
            flex-shrink: 0;
          }

          .services-grid.collapsed .service-card.hidden {
            display: flex;
            opacity: 0.5;
            position: relative;
            transform: none;
            pointer-events: auto;
          }

          .subsections-panel {
            position: relative;
            transform: none;
          }

          .subsections-panel.visible {
            margin-top: 20px;
          }

          .subsections-list {
            padding: 15px;
          }

          .panel-header {
            padding: 20px;
          }

          .panel-cta {
            padding: 15px;
          }

          .button-group {
            flex-direction: column;
          }

          .btn-primary, .btn-outline {
            width: 100%;
            justify-content: center;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        /* CONTACT FORM SECTION */
        .contact-form-section {
          padding: 80px 5%;
          background-color: var(--bg-surface);
          border-top: 1px solid var(--border-color);
        }

        .form-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .form-title {
          font-family: var(--font-merriweather);
          font-size: 2rem;
          color: var(--text-main);
          margin-bottom: 10px;
        }

        .form-desc {
          color: var(--text-secondary);
          margin-bottom: 30px;
        }

        .form-wrapper {
          padding: 4px;
          border-radius: 16px;
          background: linear-gradient(60deg, #001F3F, #C5A059);
          box-shadow: 0 15px 40px rgba(0, 31, 63, 0.15);
        }

        .contact-form {
          background: var(--bg-card);
          border-radius: 12px;
          padding: 40px;
          text-align: left;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-field label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 8px;
        }

        .form-field input,
        .form-field textarea {
          width: 100%;
          padding: 12px 15px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          color: var(--text-main);
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-field input:focus,
        .form-field textarea:focus {
          border-color: #C5A059;
        }

        .form-field textarea {
          resize: vertical;
        }

        .form-submit-btn {
          width: 100%;
          margin-top: 20px;
          padding: 15px;
          background: #001F3F;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s;
        }

        .form-submit-btn:hover {
          background: #C5A059;
          color: #001F3F;
        }

        .form-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-message {
          background: var(--bg-card);
          border-radius: 12px;
          padding: 60px 40px;
          text-align: center;
        }

        .success-message h3 {
          margin-top: 20px;
          color: var(--text-main);
          font-family: var(--font-merriweather);
        }

        .success-message p {
          color: var(--text-secondary);
        }

        .error-text {
          color: #dc2626;
          text-align: center;
          margin-top: 15px;
        }
      `}</style>
    </main>
  );
}
