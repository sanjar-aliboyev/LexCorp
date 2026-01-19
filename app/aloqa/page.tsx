'use client';

import React, { useState } from 'react';
import { MapPin, Mail, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES_DATA } from '../data/services';

export default function ContactPage() {
  const { t, lang } = useLanguage(); 
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: '',
    message: '',
  });

  // 1. Updated Address Logic with your specific text
  const getAddress = () => {
    const activeLang = lang || 'UZ';

    if (activeLang === 'RU') {
      return (
        <>
          100170, город Ташкент,<br />
          Мирзо Улугбекский район,<br />
          улица Мустакиллик, 107-дом, 203.
        </>
      );
    } else if (activeLang === 'EN') {
      return (
        <>
          203 Office, 107-house, Mustakillik street,<br />
          Mirzo Ulugbek district, Tashkent city,<br />
          Uzbekistan. Post Code: 100170
        </>
      );
    } else {
      // Default / Uzbek
      return (
        <>
          100170, Toshkent shahar,<br />
          Mirzo Ulug'bek tumani,<br />
          Mustaqillik ko'chasi, 107-uy, 203.
        </>
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: '', // No email field on this form
          interest: formData.interest,
          message: formData.message,
          source: 'Aloqa Page',
        }),
      });

      if (!response.ok) throw new Error('Failed to send');

      setFormStatus('success');
      setFormData({ name: '', phone: '', interest: '', message: '' });
    } catch (error) {
      alert('An error occurred. Please try again.');
      setFormStatus('idle');
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh', transition: 'background-color 0.3s' }}>

      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="hero-title">{t.contactPage.title}</h1>
          <p className="hero-subtitle">{t.contactPage.subtitle}</p>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="contact-content">
        <div className="container">
          <div className="content-grid">
            
            {/* LEFT COLUMN: INFO */}
            <div className="info-column">
              <div className="info-card">
                <h3>{t.contactPage.infoTitle}</h3>
                
                {/* ADDRESS (Dynamic Language) */}
                <div className="info-item">
                  <div className="icon-box"><MapPin size={20} /></div>
                  <div>
                    <span className="label">{t.contactPage.addressLabel}</span>
                    <p>{getAddress()}</p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="info-item">
                  <div className="icon-box"><Mail size={20} /></div>
                  <div>
                    <span className="label">{t.contactPage.emailLabel}</span>
                    <a href="mailto:sanjar@aliboyev.com" className="link-hover">sanjar@aliboyev.com</a>
                  </div>
                </div>

                {/* MESSENGERS */}
                <div className="social-section">
                  <span className="label" style={{marginBottom: '15px', display: 'block'}}>Messenger Contact (Faster)</span>
                  
                  <div className="social-grid">
                    {/* Telegram */}
                    <a href="https://t.me/LexpertSA" target="_blank" rel="noopener noreferrer" className="social-link telegram">
                      <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                      <span>Telegram</span>
                    </a>

                    {/* WhatsApp */}
                    <a href="https://wa.me/message/JSVUNNWENLXUP1" target="_blank" rel="noopener noreferrer" className="social-link whatsapp">
                       <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.272-.57-.421M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.103 1.528 5.832L.459 23.539l5.882-1.543C7.948 22.844 9.923 23.447 12 23.447c6.627 0 12-5.373 12-12s-5.373-12-12-12"/>
                      </svg>
                      <span>WhatsApp</span>
                    </a>

                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/sanjaraliboev" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                       <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* MAP */}
              <div className="map-container">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.353347942111!2d69.29571331572534!3d41.32547000788737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef4cb34094059%3A0x6291689843604312!2sMustaqillik%20Avenue%20107%2C%20Tashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1689876543210!5m2!1sen!2s"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'grayscale(100%) invert(var(--map-invert))' }} 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
              </div>
            </div>

            {/* RIGHT COLUMN: FORM */}
            <div className="form-column">
              <div className="form-card">
                {formStatus === 'success' ? (
                  <div className="success-message">
                    <CheckCircle size={64} color="#16a34a" />
                    <h3>{t.contactPage.successTitle}</h3>
                    <p>{t.contactPage.successDesc}</p>
                    <button onClick={() => setFormStatus('idle')} className="btn-reset">{t.contactPage.btnReset}</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3>{t.contactPage.formTitle}</h3>
                    <p className="form-desc">{t.contactPage.formDesc}</p>
                    
                    <div className="form-group">
                      <label>{t.contactPage.labelName} *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="form-input"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.contactPage.labelPhone} *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="form-input"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.contactPage.labelService}</label>
                      <select
                        name="interest"
                        className="form-input"
                        value={formData.interest}
                        onChange={handleChange}
                      >
                        <option value="">...</option>
                        {SERVICES_DATA.map((service) => {
                          const currentLang = (lang || 'UZ') as 'UZ' | 'RU' | 'EN';
                          return (
                            <option key={service.id} value={service.titles['EN']}>
                              {service.titles[currentLang] || service.titles['EN']}
                            </option>
                          );
                        })}
                        <option value="Other">
                          {lang === 'RU' ? 'Другое' : lang === 'EN' ? 'Other' : 'Boshqa'}
                        </option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>{t.contactPage.labelMessage}</label>
                      <textarea
                        name="message"
                        rows={5}
                        className="form-input"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <button type="submit" className="submit-btn" disabled={formStatus === 'submitting'}>
                      {formStatus === 'submitting' ? '...' : (
                        <>{t.contactPage.btnSubmit} <Send size={18} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        /* VARIABLES */
        :global(:root) { --map-invert: 0%; }
        :global([data-theme="dark"]) { --map-invert: 90%; }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 5%; }

        /* HERO */
        .contact-hero {
          padding: 160px 0 60px;
          background-color: var(--bg-surface);
          text-align: center;
          border-bottom: 1px solid var(--border-color);
        }
        .hero-title {
          font-family: var(--font-merriweather);
          font-size: 3rem; color: var(--text-main); margin-bottom: 15px;
        }
        .hero-subtitle {
          font-size: 1.1rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto;
        }

        /* CONTENT GRID */
        .contact-content { padding: 60px 0 100px; }
        .content-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
        }

        /* INFO CARD */
        .info-column { display: flex; flex-direction: column; gap: 30px; }
        .info-card {
          background: var(--bg-card); padding: 30px; border-radius: 8px;
          border: 1px solid var(--border-color);
        }
        .info-card h3 { 
          font-family: var(--font-merriweather); color: var(--text-main); 
          margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid var(--border-color);
        }
        .info-item { display: flex; gap: 15px; margin-bottom: 25px; align-items: flex-start; }
        
        .icon-box {
          width: 40px; height: 40px; background: rgba(197, 160, 89, 0.1);
          color: #C5A059; border-radius: 50%; display: flex; 
          align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;
        }
        .label { 
          display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px;
          font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;
        }
        .info-item p, .link-hover { color: var(--text-main); font-weight: 500; font-size: 0.95rem; line-height: 1.5; }
        .link-hover:hover { color: #C5A059; text-decoration: underline; }

        /* SOCIAL / MESSENGERS */
        .social-section { margin-top: 10px; padding-top: 20px; border-top: 1px solid var(--border-color); }
        .social-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        
        .social-link {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 15px 10px; border-radius: 8px;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          text-decoration: none; transition: all 0.2s ease;
        }
        .social-link span {
          font-size: 0.8rem; margin-top: 8px; color: var(--text-main); font-weight: 500;
        }
        .social-icon { width: 28px; height: 28px; color: var(--text-main); transition: color 0.2s; }
        
        /* Icon Adaptability Logic */
        .social-link:hover { transform: translateY(-2px); border-color: currentColor; }
        
        /* Telegram Hover Color */
        .social-link.telegram:hover .social-icon { color: #229ED9; }
        .social-link.telegram:hover span { color: #229ED9; }
        
        /* WhatsApp Hover Color */
        .social-link.whatsapp:hover .social-icon { color: #25D366; }
        .social-link.whatsapp:hover span { color: #25D366; }

        /* LinkedIn Hover Color */
        .social-link.linkedin:hover .social-icon { color: #0077B5; }
        .social-link.linkedin:hover span { color: #0077B5; }

        /* MAP */
        .map-container {
          height: 300px; background: #eee; border-radius: 8px; overflow: hidden;
          border: 1px solid var(--border-color);
        }

        /* FORM */
        .form-card {
          background: var(--bg-card); padding: 40px; border-radius: 8px;
          border: 1px solid var(--border-color); height: 100%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .form-card h3 { font-family: var(--font-merriweather); font-size: 1.8rem; color: var(--text-main); margin-bottom: 10px; }
        .form-desc { color: var(--text-secondary); margin-bottom: 30px; }
        
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 0.9rem; color: var(--text-main); margin-bottom: 8px; font-weight: 600; }
        .form-input {
          width: 100%; padding: 12px 15px; background: var(--bg-surface);
          border: 1px solid var(--border-color); border-radius: 6px;
          color: var(--text-main); font-size: 1rem; outline: none; transition: border 0.2s;
        }
        .form-input:focus { border-color: #C5A059; }

        .submit-btn {
          width: 100%; padding: 14px; background: #001F3F; color: #fff;
          border: none; border-radius: 6px; font-size: 1rem; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.2s;
        }
        .submit-btn:hover { background: #C5A059; color: #001F3F; }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .success-message {
          text-align: center; padding: 40px 0; display: flex; flex-direction: column; align-items: center;
        }
        .success-message h3 { margin-top: 20px; color: var(--text-main); }
        .success-message p { color: var(--text-secondary); margin-bottom: 30px; }
        .btn-reset {
          background: transparent; color: #C5A059; border: 1px solid #C5A059;
          padding: 10px 20px; border-radius: 4px; cursor: pointer;
        }

        @media (max-width: 900px) {
          .content-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 2.2rem; }
        }
      `}</style>
    </main>
  );
}