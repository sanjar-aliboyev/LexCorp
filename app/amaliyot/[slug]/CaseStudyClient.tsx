'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, Share2, Send, Linkedin, Facebook, Twitter, Link as LinkIcon, CheckCircle2, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../constants/translations'; // Import your translations
import { PortableText } from '@portabletext/react';

interface CaseStudyClientProps {
  data: any;
}

// Helper for static text specific to this page
const UI = {
  UZ: { 
    back: "Ortga", share: "Ushishish:", copy: "Nusxa olish", 
    result: "Natija", formTitle: "Xuddi shunday muammoingiz bormi?", 
    formDesc: "Biz bilan bog'laning, yechim topishda yordam beramiz."
  },
  RU: { 
    back: "Назад", share: "Поделиться:", copy: "Скопировать", 
    result: "Результат", formTitle: "У вас похожая проблема?", 
    formDesc: "Свяжитесь с нами, мы поможем найти решение."
  },
  EN: { 
    back: "Back", share: "Share:", copy: "Copy Link", 
    result: "Outcome", formTitle: "Facing a similar challenge?", 
    formDesc: "Contact us, and we will help you find a solution."
  }
};

export default function CaseStudyClient({ data }: CaseStudyClientProps) {
  const router = useRouter();
  const { lang } = useLanguage();
  
  // Select Content Language
  const content = data.content?.[lang] || data.content?.['UZ'] || {};
  const uiText = UI[lang] || UI['UZ'];

  // Form States (Matches your AmaliyotPage)
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Share Handlers
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const copyLink = () => { navigator.clipboard.writeText(shareUrl); alert("Link copied!"); };

  // Handle Form Submission (Identical logic to your AmaliyotPage)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormMessage('');
    setIsSuccess(false);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          source: `Success Case: ${content.title}`, // Tracking source
          interest: 'Case Study Inquiry'
        }),
      });

      if (response.ok) {
        setFormMessage(translations[lang].practicePage.formSuccess || "Success!");
        setIsSuccess(true);
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setFormMessage(translations[lang].practicePage.formError || "Error occurred.");
        setIsSuccess(false);
      }
    } catch (error) {
      setFormMessage("Error occurred.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      
      {/* --- 1. HERO SECTION (Immersive Background) --- */}
      <div style={{
        height: '60vh', minHeight: '500px',
        backgroundImage: `url(${data.image})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        position: 'relative'
      }}>
        {/* Gradient Overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-body) 0%, rgba(0,31,63,0.85) 50%, rgba(0,31,63,0.9) 100%)' }}></div>

        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px' }}>
          
          <button onClick={() => router.back()} className="back-btn">
            <ArrowLeft size={18} /> {uiText.back}
          </button>

          {/* Badges */}
          <div className="badge-row">
            <span className="badge">{data.category}</span>
            {data.statValue && (
              <span className="stat-badge">
                <TrendingUp size={16} /> {data.statValue}
              </span>
            )}
          </div>

          <h1 className="case-title">{content.title || "Success Case"}</h1>


        </div>
      </div>

      {/* --- 2. CONTENT & RESULTS --- */}
      <div className="container content-grid">
        
        {/* Left: Rich Text Content */}
        <div className="main-col">
          <div className="rich-text">
            {content.body ? <PortableText value={content.body} /> : <p>Batafsil ma'lumot mavjud emas.</p>}
          </div>
          
          {/* Share Buttons */}
          <div className="share-section">
            <span style={{color: 'var(--text-main)', fontWeight: 600}}>{uiText.share}</span>
            <div className="share-buttons">
              <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`)} className="share-btn"><Linkedin size={18}/></button>
              <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)} className="share-btn"><Facebook size={18}/></button>
              <button onClick={copyLink} className="share-btn"><LinkIcon size={18}/></button>
            </div>
          </div>
        </div>

        {/* Right: Sticky Result Box */}
        <aside className="sidebar">
          <div className="result-card">
            <div className="icon-box"><CheckCircle2 size={32} /></div>
            <h4>{uiText.result}</h4>
            <div className="stat-big">{data.statValue}</div>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
              {content.description}
            </p>
          </div>
        </aside>

      </div>

      {/* --- 3. CONTACT FORM (Matches AmaliyotPage) --- */}
      <section style={{ backgroundColor: 'var(--bg-surface)', padding: '100px 5%', marginTop: '80px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-merriweather)', fontSize: '2.2rem', marginBottom: '15px', color: 'var(--text-main)' }}>
            {uiText.formTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem' }}>
            {uiText.formDesc}
          </p>

          <div style={{ background: 'var(--bg-card)', padding: '50px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)' }}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="name">{translations[lang].blogPage.labelName}</label>
                  <input 
                    type="text" id="name" value={formData.name} required
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{translations[lang].blogPage.labelPhone}</label>
                  <input 
                    type="tel" id="phone" value={formData.phone} required
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">{translations[lang].blogPage.labelMsg}</label>
                <textarea 
                  id="message" rows={4} value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              {/* Status Messages */}
              {formMessage && (
                <div className={`status-message ${isSuccess ? 'success' : 'error'}`}>
                  {isSuccess ? <CheckCircle size={20} /> : <XCircle size={20} />}
                  <span>{formMessage}</span>
                </div>
              )}

              <button type="submit" className="submit-btn full-width" disabled={loading}>
                {loading ? <Loader2 className="spin" size={20} /> : translations[lang].blogPage.btnSubmit}
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .container { max-width: 1100px; margin: 0 auto; padding: 0 5%; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        /* HERO */
        .back-btn { background: rgba(255,255,255,0.1); color: #fff; padding: 10px 20px; border: 1px solid rgba(255,255,255,0.2); border-radius: 30px; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 30px; width: fit-content; transition: 0.3s; cursor: pointer; }
        .back-btn:hover { background: #C5A059; border-color: #C5A059; color: #001F3F; }

        .badge-row { display: flex; gap: 15px; margin-bottom: 25px; flex-wrap: wrap; }
        .badge { background: #C5A059; color: #001F3F; padding: 6px 14px; border-radius: 4px; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; }
        .stat-badge { background: rgba(0,0,0,0.6); border: 1px solid #C5A059; color: #C5A059; padding: 6px 14px; border-radius: 4px; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; }

        .case-title { font-family: var(--font-merriweather); font-size: 3.5rem; color: #fff; margin-bottom: 20px; line-height: 1.1; text-shadow: 0 4px 20px rgba(0,0,0,0.5); }
        .case-desc { color: #e2e8f0; font-size: 1.3rem; max-width: 700px; line-height: 1.6; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }

        /* CONTENT GRID */
        .content-grid { display: grid; grid-template-columns: 1fr 350px; gap: 60px; margin-top: -80px; position: relative; z-index: 10; }
        .main-col { background: var(--bg-card); padding: 50px; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: var(--shadow); }

        /* RICH TEXT */
        .rich-text { color: var(--text-main); font-size: 1.1rem; line-height: 1.8; font-family: var(--font-inter); margin-bottom: 40px; }
        .rich-text :global(h2) { font-family: var(--font-merriweather); font-size: 1.8rem; margin: 40px 0 20px; color: var(--text-main); }
        .rich-text :global(p) { margin-bottom: 20px; color: var(--text-secondary); }
        .rich-text :global(ul) { margin-bottom: 20px; padding-left: 20px; }
        .rich-text :global(li) { margin-bottom: 10px; color: var(--text-secondary); list-style-type: disc; }

        /* SIDEBAR RESULT CARD */
        .sidebar { position: sticky; top: 100px; height: fit-content; }
        .result-card { background: #001F3F; color: #fff; padding: 40px; border-radius: 12px; border-top: 6px solid #C5A059; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .icon-box { color: #C5A059; margin-bottom: 20px; }
        .stat-big { font-size: 2.5rem; font-weight: 800; color: #C5A059; margin: 10px 0 15px; font-family: var(--font-merriweather); }
        
        /* SHARE */
        .share-section { padding-top: 30px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; }
        .share-buttons { display: flex; gap: 10px; }
        .share-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-secondary); cursor: pointer; transition: 0.2s; background: transparent; }
        .share-btn:hover { border-color: #C5A059; color: #C5A059; }

        /* FORM STYLES */
        .form-group-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { margin-bottom: 20px; text-align: left; }
        .contact-form label { display: block; margin-bottom: 8px; font-weight: 600; color: var(--text-secondary); font-size: 0.9rem; }
        .contact-form input, .contact-form textarea { width: 100%; padding: 14px; background: var(--bg-body); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-main); font-size: 1rem; transition: border-color 0.2s; }
        .contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: #C5A059; }
        
        .submit-btn { background: #001F3F; color: #fff; padding: 16px 40px; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; font-size: 1.1rem; transition: background 0.3s; margin-top: 10px; }
        .submit-btn:hover { background: #003366; }
        .submit-btn:disabled { background: #ccc; cursor: not-allowed; }

        .status-message { padding: 15px; border-radius: 6px; display: flex; align-items: center; gap: 10px; font-weight: 500; margin-bottom: 20px; }
        .status-message.success { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
        .status-message.error { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        @media (max-width: 900px) {
          .content-grid { grid-template-columns: 1fr; margin-top: 0; }
          .case-title { font-size: 2.5rem; }
          .sidebar { position: relative; top: 0; margin-bottom: 40px; order: -1; }
          .result-card { margin-top: -50px; }
          .form-group-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}