'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, Share2, Send, Linkedin, Facebook, Twitter, Link as LinkIcon, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PortableText } from '@portabletext/react';

interface BlogPostClientProps {
  post: any;
}

// Translations for the static UI elements
const UI_TEXT = {
  UZ: { 
    formTitle: "Savolingiz bormi?", 
    formDesc: "Maqola bo'yicha yoki xizmatlarimiz yuzasidan savollaringiz bo'lsa, yozib qoldiring.", 
    name: "Ismingiz", phone: "Telefon", msg: "Xabar", btn: "Yuborish",
    share: "Ushbu maqolani ulashing:", copy: "Nusxa olish", back: "Ortga"
  },
  RU: { 
    formTitle: "У вас есть вопросы?", 
    formDesc: "Оставьте сообщение, если у вас есть вопросы по статье или нашим услугам.", 
    name: "Имя", phone: "Телефон", msg: "Сообщение", btn: "Отправить",
    share: "Поделиться статьей:", copy: "Скопировать", back: "Назад"
  },
  EN: { 
    formTitle: "Have Questions?", 
    formDesc: "Leave a message if you have questions about the article or our services.", 
    name: "Name", phone: "Phone", msg: "Message", btn: "Submit",
    share: "Share this article:", copy: "Copy Link", back: "Back"
  }
};

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const router = useRouter();
  const { lang } = useLanguage();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  // 1. Language Selection Logic
  const content = post?.content?.[lang] || post?.content?.['UZ'];
  const ui = UI_TEXT[lang] || UI_TEXT['UZ'];

  // 2. Error State
  if (!post || !content) {
    return (
      <div style={{ flex: 1, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-body)', color: 'var(--text-main)' }}>
        <h1 style={{ fontFamily: 'var(--font-merriweather)', fontSize: '2rem', marginBottom: '20px' }}>Maqola topilmadi</h1>
        <button onClick={() => router.back()} style={{ cursor: 'pointer', padding: '12px 24px', background: '#001F3F', color: '#fff', border: 'none', borderRadius: '6px' }}>{ui.back}</button>
      </div>
    );
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: '',
          message: formData.message,
          source: `Blog: ${content?.title || 'Unknown'}`,
        }),
      });

      if (!response.ok) throw new Error('Failed to send');

      setFormStatus('success');
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      alert(lang === 'UZ' ? "Xatolik yuz berdi. Qaytadan urinib ko'ring." : "An error occurred. Please try again.");
      setFormStatus('idle');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Share Handlers
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(content.title)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert(lang === 'UZ' ? "Link nusxalandi!" : "Link copied!");
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      
      {/* --- BLOCK 1: ARTICLE HERO --- */}
      <div style={{
        height: '60vh', minHeight: '400px',
        backgroundImage: `url(${post.image})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,31,63,0.95), rgba(0,31,63,0.4))' }}></div>

        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '60px' }}>
          <button onClick={() => router.back()} className="back-btn"><ArrowLeft size={18} /> {ui.back}</button>
          
          {content.category && <span className="badge">{content.category}</span>}
          
          <h1 className="article-title">{content.title}</h1>

          <div className="meta-row">
            {post.author && <span><User size={16}/> {post.author.name}</span>}
            <span className="divider">•</span>
            <span><Calendar size={16}/> {new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* --- ARTICLE BODY --- */}
      <article className="container content-wrapper">
        <div className="rich-text">
          {content.body ? <PortableText value={content.body} /> : <p>No content available.</p>}
        </div>

        <div className="share-section">
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{ui.share}</span>
          <div className="share-buttons">
            <button onClick={shareToLinkedIn} className="share-btn linkedin" aria-label="Share on LinkedIn">
              <Linkedin size={18} />
            </button>
            <button onClick={shareToFacebook} className="share-btn facebook" aria-label="Share on Facebook">
              <Facebook size={18} />
            </button>
            <button onClick={shareToX} className="share-btn x" aria-label="Share on X">
              <Twitter size={18} />
            </button>
            <button onClick={copyLink} className="share-btn copy" aria-label="Copy Link">
              <LinkIcon size={18} />
            </button>
          </div>
        </div>
      </article>

      {/* --- BLOCK 2: CONTACT FORM --- */}
      <section style={{ backgroundColor: 'var(--bg-surface)', padding: '80px 5%', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-merriweather)', fontSize: '2rem', marginBottom: '10px', color: 'var(--text-main)' }}>
            {ui.formTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
            {ui.formDesc}
          </p>

          {formStatus === 'success' ? (
            <div style={{ background: 'var(--bg-card)', padding: '60px 40px', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <CheckCircle size={64} color="#16a34a" />
              <h3 style={{ marginTop: '20px', color: 'var(--text-main)' }}>
                {lang === 'UZ' ? "Xabar yuborildi!" : lang === 'RU' ? "Сообщение отправлено!" : "Message Sent!"}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                {lang === 'UZ' ? "Tez orada siz bilan bog'lanamiz." : lang === 'RU' ? "Мы свяжемся с вами в ближайшее время." : "We'll get back to you soon."}
              </p>
              <button onClick={() => setFormStatus('idle')} style={{ background: 'transparent', color: '#C5A059', border: '1px solid #C5A059', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
                {lang === 'UZ' ? "Yana yuborish" : lang === 'RU' ? "Отправить ещё" : "Send Another"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)' }}>
              <div className="form-grid">
                <div style={{ textAlign: 'left' }}>
                  <label className="form-label">{ui.name}</label>
                  <input type="text" name="name" required className="form-input" value={formData.name} onChange={handleChange} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <label className="form-label">{ui.phone}</label>
                  <input type="tel" name="phone" required className="form-input" value={formData.phone} onChange={handleChange} />
                </div>
              </div>
              <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                <label className="form-label">{ui.msg}</label>
                <textarea name="message" rows={4} className="form-input" value={formData.message} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? '...' : <>{ui.btn} <Send size={18} /></>}
              </button>
            </form>
          )}
        </div>
      </section>

      <style jsx>{`
        .container { max-width: 800px; margin: 0 auto; padding: 0 5%; }

        /* HERO & UI */
        .back-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 8px 16px; border-radius: 30px; cursor: pointer; display: flex; align-items: center; gap: 8px; margin-bottom: 20px; width: fit-content; backdrop-filter: blur(4px); transition: all 0.2s; }
        .back-btn:hover { background: #C5A059; color: #001F3F; border-color: #C5A059; }
        .badge { background: #C5A059; color: #001F3F; padding: 6px 12px; border-radius: 4px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; width: fit-content; margin-bottom: 20px; }
        .article-title { font-family: var(--font-merriweather); font-size: 2.8rem; color: #fff; margin-bottom: 25px; line-height: 1.2; }
        .meta-row { display: flex; gap: 15px; color: rgba(255,255,255,0.8); font-size: 0.95rem; align-items: center; }
        .divider { color: #C5A059; }
        
        .content-wrapper { padding-top: 80px; padding-bottom: 80px; }

        /* RICH TEXT STYLES */
        .rich-text { color: var(--text-main); font-size: 1.15rem; line-height: 1.8; font-family: var(--font-inter); }
        .rich-text :global(h2), .rich-text :global(h3) { font-family: var(--font-merriweather); font-size: 1.8rem; margin-top: 50px; margin-bottom: 20px; color: var(--text-main); }
        .rich-text :global(p) { margin-bottom: 25px; color: var(--text-secondary); }
        .rich-text :global(ul) { margin-bottom: 30px; padding-left: 20px; }
        .rich-text :global(li) { margin-bottom: 10px; color: var(--text-secondary); list-style-type: disc; }
        .rich-text :global(strong) { color: #C5A059; font-weight: 700; }
        .rich-text :global(blockquote) { border-left: 4px solid #C5A059; padding-left: 20px; font-style: italic; color: var(--text-main); margin: 30px 0; background: var(--bg-surface); padding: 20px; border-radius: 0 8px 8px 0; }
        .rich-text :global(a) { color: #C5A059; text-decoration: underline; }

        /* SHARE & FORM */
        .share-section { margin-top: 60px; padding-top: 30px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
        .share-buttons { display: flex; gap: 10px; }
        
        .share-btn { 
          width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--border-color); 
          display: flex; align-items: center; justify-content: center; cursor: pointer; 
          background: transparent; color: var(--text-secondary); transition: all 0.2s;
        }
        .share-btn:hover { transform: translateY(-3px); }
        
        .share-btn.linkedin:hover { background: #0077b5; color: #fff; border-color: #0077b5; }
        .share-btn.facebook:hover { background: #1877f2; color: #fff; border-color: #1877f2; }
        .share-btn.x:hover { background: #000; color: #fff; border-color: #000; }
        .share-btn.copy:hover { background: #C5A059; color: #001F3F; border-color: #C5A059; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .form-label { display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-secondary); font-weight: 600; }
        .form-input { width: 100%; padding: 12px; background: var(--bg-body); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-main); font-size: 1rem; }
        .submit-btn { background: #001F3F; color: #fff; padding: 15px 30px; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; margin: 0 auto; font-size: 1rem; transition: background 0.3s; }
        .submit-btn:hover { background: #003366; }

        @media (max-width: 768px) {
          .article-title { font-size: 2rem; }
          .container { padding: 0 6%; }
          .form-grid { grid-template-columns: 1fr; }
          .share-section { justify-content: center; flex-direction: column; }
        }
      `}</style>
    </main>
  );
}