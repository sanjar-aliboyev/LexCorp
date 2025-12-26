'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronDown, Calendar, Mail, Scale, Phone, User, X, Send, FileText, AtSign, ArrowDown, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();
  const [openSection, setOpenSection] = useState<number | null>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSection = (sectionId: number) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-block');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  
    // Modal Form State (Book a Call)
    const [modalFormData, setModalFormData] = useState({
      name: '',
      phone: '',
      date: '',
    });
    const [modalFormStatus, setModalFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
    const handleModalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setModalFormData({ ...modalFormData, [e.target.name]: e.target.value });
    };
  
    const handleModalDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!val) {
        setModalFormData({ ...modalFormData, date: '' });
        return;
      }
      const dateObj = new Date(val);
      const day = dateObj.getDay(); // 0 = Sun, 6 = Sat
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
          setModalFormData({ name: '', phone: '', date: '' }); // Clear form
          setTimeout(() => {
            setModalFormStatus('idle');
            setIsModalOpen(false); // Close modal on success
          }, 3000);
        } else {
          console.error('Failed to book call:', res.statusText);
          setModalFormStatus('error');
        }
      } catch (error) {
        console.error('Error booking call:', error);
        setModalFormStatus('error');
      }
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setModalFormStatus('idle'); // Reset status on close
      setModalFormData({ name: '', phone: '', date: '' }); // Reset form data
    };
  
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({
      name: '', phone: '', email: '', category: '', message: ''
    });
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('loading');
    try {
      const res = await fetch('/api/send-email', { // <--- Pointing to new Email Route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Services Page', // Helpful label for your email subject
          interest: formData.category
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', category: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh', transition: 'background-color 0.3s' }}>
      <Header />

      {/* BLOCK 1: INTRO / HERO */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="page-title">{t.servicesPage.title}</h1>
            <p className="hero-description">{t.servicesPage.desc}</p>
            
            <div className="button-group">
              <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                {t.servicesPage.btnBookCall} <Calendar size={18} />
              </button>
              
              <button onClick={scrollToForm} className="btn btn-outline">
                {t.servicesPage.btnWriteUs} <ArrowDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 2: MAIN SERVICES ACCORDION */}
      <section className="services-section">
        <div className="container">
          <div className="accordion-wrapper">
            {t.servicesPage.services.map((service) => {
              const isOpen = openSection === service.id;
              return (
                <div key={service.id} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                  <button 
                    className="accordion-header" 
                    onClick={() => toggleSection(service.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="service-title">{service.title}</span>
                    <span className="icon-wrapper">
                      <ChevronDown size={24} className={`chevron ${isOpen ? 'rotate' : ''}`} />
                    </span>
                  </button>
                  
                  <div 
                    className="accordion-content"
                    style={{ maxHeight: isOpen ? '500px' : '0px' }}
                  >
                    <div className="content-inner">
                      <ul>
                        {service.items.map((item, index) => (
                          <li key={index}>
                            <Scale size={16} className="list-icon" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BLOCK 3: CONTACT FORM SECTION */}
      <section id="contact-block" className="contact-block-section">
        <div className="container">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>{t.servicesPage.formTitle}</h2>
              <p>{t.servicesPage.formDesc}</p>
            </div>

            <form className="detailed-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* Name */}
                <div className="input-group">
                  <label>{t.servicesPage.formLabelName}</label>
                  <div className="input-field-wrapper">
                    <User size={18} className="field-icon" />
                    <input type="text" placeholder={t.servicesPage.formPlaceholderName} required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="input-group">
                  <label>{t.servicesPage.formLabelPhone}</label>
                  <div className="input-field-wrapper">
                    <Phone size={18} className="field-icon" />
                    <input type="tel" placeholder={t.servicesPage.formPlaceholderPhone} required 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="input-group full-width">
                  <label>{t.servicesPage.formLabelEmail}</label>
                  <div className="input-field-wrapper">
                    <AtSign size={18} className="field-icon" />
                    <input type="email" placeholder={t.servicesPage.formPlaceholderEmail} required 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                {/* Topic Selection */}
                <div className="input-group full-width">
                  <label>{t.servicesPage.formLabelTopic}</label>
                  <div className="input-field-wrapper">
                    <FileText size={18} className="field-icon" />
                    <select required
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="" disabled>{t.servicesPage.formPlaceholderTopic}</option>
                      {t.servicesPage.topics.map((topic, i) => (
                        <option key={i} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Case Details */}
                <div className="input-group full-width">
                  <label>{t.servicesPage.formLabelDetails}</label>
                  <textarea 
                    placeholder={t.servicesPage.formPlaceholderDetails}
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div className="form-footer">
                <button type="submit" className="submit-main-btn" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : t.servicesPage.formBtnSubmit} <Send size={18} />
                </button>
              </div>
              {status === 'success' && <p style={{color: 'green', marginTop: '10px'}}>Request sent successfully!</p>}
              {status === 'error' && <p style={{color: 'red', marginTop: '10px'}}>There was an error sending your request. Please try again.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* MODAL POPUP (Book a Call) */}
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
                      <button onClick={handleCloseModal} className="submit-btn-modal">
                        OK
                      </button>
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
                        {modalFormStatus === 'submitting' ? '...' : (
                          <>{t.servicesPage.modalBtnConfirm} <Send size={18} /></>
                        )}
                      </button>
                      {modalFormStatus === 'error' && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>Error sending request. Please try again.</p>}
                    </form>
                  )}
                </div>
              </div>
            )}
      
            <Footer />
      
            <style jsx>{`
              /* --- LAYOUT UTILS --- */
              .container {
                max-width: 1000px;
                margin: 0 auto;
                padding: 0 5%;
              }
      
              /* --- HERO SECTION --- */
              .hero-section {
                padding: 160px 0 80px;
                background-color: var(--bg-surface);
                text-align: center;
                border-bottom: 1px solid var(--border-color);
                transition: background-color 0.3s;
              }
              .page-title {
                font-size: 3rem;
                font-family: var(--font-merriweather);
                color: var(--text-main);
                margin-bottom: 24px;
                font-weight: 700;
              }
              .hero-description {
                font-size: 1.15rem;
                color: var(--text-secondary);
                line-height: 1.6;
                max-width: 700px;
                margin: 0 auto 40px;
              }
              .button-group {
                display: flex;
                justify-content: center;
                gap: 20px;
              }
              .btn {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                padding: 14px 28px;
                border-radius: 4px;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.2s ease;
                border: none;
              }
              .btn-primary {
                background-color: #001F3F; /* Navy */
                color: #fff;
                border: 1px solid #001F3F;
              }
              .btn-primary:hover {
                background-color: #003366;
              }
              .btn-outline {
                background-color: transparent;
                color: var(--text-main);
                border: 1px solid var(--border-color);
              }
              .btn-outline:hover {
                border-color: #C5A059; /* Bronze */
                color: #C5A059;
              }
      
              /* --- SERVICES SECTION --- */
              .services-section {
                padding: 80px 0;
              }
              .accordion-wrapper {
                display: flex;
                flex-direction: column;
                gap: 16px;
              }
              .accordion-item {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                overflow: hidden;
                transition: border-color 0.3s ease;
              }
              .accordion-item.open {
                border-color: #C5A059;
              }
              .accordion-header {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 24px 30px;
                background: transparent;
                border: none;
                cursor: pointer;
                text-align: left;
              }
              .service-title {
                font-family: var(--font-merriweather);
                font-size: 1.35rem;
                color: var(--text-main);
                font-weight: 600;
              }
              .icon-wrapper {
                color: #C5A059;
                display: flex;
                align-items: center;
              }
              .chevron { transition: transform 0.3s ease; }
              .chevron.rotate { transform: rotate(180deg); }
              .accordion-content {
                overflow: hidden;
                transition: max-height 0.4s ease-out;
                background-color: var(--bg-surface);
              }
              .content-inner {
                padding: 0 30px 30px;
                border-top: 1px solid var(--border-color);
                padding-top: 20px;
              }
              ul {
                list-style: none; padding: 0; margin: 0;
                display: grid; grid-template-columns: 1fr 1fr;
                gap: 15px 40px;
              }
              li {
                display: flex; alignItems: flex-start; gap: 12px;
                color: var(--text-secondary); font-size: 1rem; line-height: 1.5;
              }
              :global(.list-icon) { color: #C5A059; flex-shrink: 0; margin-top: 4px; }
      
              /* --- BLOCK 3: CONTACT FORM SECTION --- */
              .contact-block-section {
                padding: 80px 0 120px;
                background-color: var(--bg-surface);
                border-top: 1px solid var(--border-color);
              }
              .form-wrapper {
                background: var(--bg-card);
                padding: 50px;
                border-radius: 12px;
                border: 1px solid #C5A059; /* Bronze border for emphasis */
                box-shadow: 0 10px 30px rgba(0,0,0,0.05);
              }
              .form-header { text-align: center; margin-bottom: 40px; }
              .form-header h2 {
                font-family: var(--font-merriweather);
                font-size: 2rem;
                color: var(--text-main);
                margin-bottom: 15px;
              }
              .form-header p { color: var(--text-secondary); max-width: 600px; margin: 0 auto; }
              
              .form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 25px;
              }
              .input-group { display: flex; flex-direction: column; gap: 8px; }
              .input-group.full-width { grid-column: 1 / -1; }
              
              .input-group label {
                font-size: 0.9rem;
                font-weight: 600;
                color: var(--text-main);
              }
              
              .input-field-wrapper {
                position: relative;
                display: flex; align-items: center;
              }
              :global(.field-icon) {
                position: absolute; left: 15px;
                color: #C5A059;
                pointer-events: none;
              }
              .detailed-form input, .detailed-form select {
                width: 100%;
                padding: 14px 15px 14px 45px;
                background: var(--bg-surface);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                color: var(--text-main);
                font-size: 1rem;
                outline: none;
                transition: border-color 0.2s;
              }
              .detailed-form textarea {
                width: 100%;
                padding: 15px;
                background: var(--bg-surface);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                color: var(--text-main);
                font-size: 1rem;
                outline: none;
                resize: vertical;
              }
              .detailed-form input:focus, 
              .detailed-form select:focus, 
              .detailed-form textarea:focus {
                border-color: #C5A059;
              }
              
              .form-footer {
                margin-top: 30px;
                display: flex;
                justify-content: flex-end;
              }
              .submit-main-btn {
                background: #001F3F;
                color: #fff;
                border: none;
                padding: 16px 32px;
                border-radius: 6px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                display: flex; align-items: center; gap: 10px;
                transition: background 0.2s;
              }
              .submit-main-btn:hover { background: #C5A059; color: #000; }
      
              /* --- MODAL STYLES (Book a Call) --- */
              .modal-overlay {
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0, 31, 63, 0.85);
                display: flex; align-items: center; justify-content: center;
                z-index: 2000;
                backdrop-filter: blur(3px);
                animation: fadeIn 0.2s ease;
              }
              .modal-card {
                background: #FFFFFF;
                width: 90%; max-width: 400px;
                border-radius: 12px; padding: 30px;
                position: relative;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: slideUp 0.3s ease;
              }
              .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
              .modal-header h3 { font-family: var(--font-merriweather); color: #001F3F; font-size: 1.5rem; margin: 0; }
              .close-btn { background: none; border: none; cursor: pointer; color: #666; }
              .modal-desc { color: #666; font-size: 0.9rem; margin-bottom: 25px; line-height: 1.4; }
              .modal-form { display: flex; flex-direction: column; gap: 15px; }
              
              .input-group-modal { position: relative; display: flex; align-items: center; }
              .input-icon { position: absolute; left: 15px; color: #666; pointer-events: none; }
              .modal-input {
                width: 100%; padding: 12px 15px 12px 45px;
                border: 1px solid #E0E0E0; border-radius: 6px; font-size: 1rem; outline: none;
              }
              .modal-input:focus { border-color: #C5A059; }
              .input-hint { font-size: 0.75rem; color: #999; margin-top: -10px; margin-bottom: 5px; }
              
              .submit-btn-modal {
                background: #C5A059; color: #001F3F; border: none;
                padding: 14px; border-radius: 6px; font-weight: 700;
                cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
              }
                      .submit-btn-modal:hover { background: #B08D4C; }
              
                      .success-view-modal {
                        text-align: center;
                        padding: 20px 0;
                      }
              
                      .success-view-modal h3 {
                        margin: 20px 0 10px;
                        color: #001F3F;
                      }
              
                      .success-view-modal p {
                        color: #666;
                        margin-bottom: 20px;
                      }
              
                      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }              @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      
              /* --- RESPONSIVE --- */
              @media (max-width: 768px) {
                .page-title { font-size: 2.2rem; }
                .button-group { flexDirection: column; }
                .btn { width: 100%; justify-content: center; }
                .accordion-header { padding: 20px; }
                ul { grid-template-columns: 1fr; }
                .form-grid { grid-template-columns: 1fr; }
                .form-wrapper { padding: 25px; }
              }      `}</style>
    </main>
  );
}