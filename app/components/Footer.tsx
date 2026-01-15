'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Linkedin, Facebook, Instagram, Phone, Mail, MapPin, Send, Check } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, lang } = useLanguage();
  const currentLang = (lang || 'UZ') as 'UZ' | 'RU' | 'EN';

  // --- SUBSCRIPTION LOGIC ---
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert(currentLang === 'EN' ? "Please agree to the privacy policy." : "Iltimos, shaxsiy ma'lumotlarni qayta ishlashga rozilik bildiring.");
      return;
    }
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  // Local translations for the form to avoid editing translation files
  const subContent = {
    title: { EN: "Subscribe to news", RU: "Подпишитесь на новости", UZ: "Yangiliklarga obuna" },
    placeholder: { EN: "Your email", RU: "Ваш email", UZ: "Sizning email" },
    btn: { EN: "SUBSCRIBE", RU: "ПОДПИСАТЬСЯ", UZ: "OBUNA BO'LISH" },
    agree: { EN: "I agree to the processing of personal data.", RU: "Я согласен на обработку данных.", UZ: "Shaxsiy ma'lumotlarni qayta ishlashga roziman." }
  };

  return (
    <footer style={{ backgroundColor: '#001328', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 5% 40px' }}>
        
        <div className="footer-grid">
          {/* Column 1: Brand & Logo */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
              <div className="footer-logo-container">
                <Logo className="footer-logo" />
              </div>
            </Link>
            <p style={{ color: '#8892b0', lineHeight: '1.6', fontSize: '0.9rem', maxWidth: '300px' }}>
              {t.footer.desc}
            </p>
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
              <a href="#" className="social-icon"><Linkedin size={20} /></a>
              <a href="#" className="social-icon"><Facebook size={20} /></a>
              <a href="#" className="social-icon"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 style={headingStyle}>{t.footer.company}</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/" style={linkStyle}>{t.header.home}</Link></li>
              <li><Link href="/services" style={linkStyle}>{t.header.services}</Link></li>
              <li><Link href="/amaliyot" style={linkStyle}>{t.header.practice}</Link></li>
              <li><Link href="/team" style={linkStyle}>{t.header.team}</Link></li>
              <li><Link href="/blog" style={linkStyle}>{t.header.blog}</Link></li>
              <li><Link href="/aloqa" style={linkStyle}>{t.header.contact}</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 style={headingStyle}>{t.footer.contact}</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li style={contactItemStyle}><Phone size={18} color="#C5A059"/> +998 94 331 88 11</li>
              <li style={contactItemStyle}><Mail size={18} color="#C5A059"/> sanjar@aliboyev.com</li>
              <li style={contactItemStyle}><MapPin size={18} color="#C5A059"/> 203 Office, 107-house, Mustakillik street, Mirzo Ulugbek district, Tashkent, 100170</li>
            </ul>
          </div>

          {/* Column 4: Subscribe (NEW) */}
          <div>
            <h4 style={headingStyle}>{subContent.title[currentLang]}</h4>
            
            {status === 'success' ? (
              <div style={{ color: '#48bb78', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <Check size={20} />
                <span>Success!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="input-group">
                  <input 
                    type="email" 
                    placeholder={subContent.placeholder[currentLang]} 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="sub-input"
                  />
                  <button type="submit" disabled={status === 'loading'} className="sub-btn">
                    {status === 'loading' ? '...' : <Send size={16} />}
                  </button>
                </div>
                
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.8rem', color: '#8892b0' }}>
                  <input 
                    type="checkbox" 
                    checked={agreed} 
                    onChange={(e) => setAgreed(e.target.checked)} 
                    style={{ marginTop: '3px', accentColor: '#C5A059' }}
                  />
                  <span>{subContent.agree[currentLang]}</span>
                </label>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', fontSize: '0.85rem', color: '#8892b0' }}>
          <div>© {new Date().getFullYear()} LexCorp Law Firm. {t.footer.rights}</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="#" style={{ color: '#8892b0', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="#" style={{ color: '#8892b0', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 40px; }
        .social-icon { color: #8892b0; transition: color 0.2s; }
        .social-icon:hover { color: #C5A059; }

        /* Subscribe Styles */
        .input-group {
          display: flex;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
        }
        .sub-input {
          flex-grow: 1;
          background: transparent;
          border: none;
          padding: 12px 15px;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
          width: 100%;
        }
        .sub-input::placeholder { color: #5c677d; }
        .sub-btn {
          background: #C5A059;
          border: none;
          color: #001328;
          padding: 0 15px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .sub-btn:hover { background: #dcb363; }
        .sub-btn:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>
      
      <style jsx global>{`
        .footer-logo-container .lexcorp-logo { color: #C5A059 !important; }
        .footer-logo-container .text-lex { color: #C5A059 !important; }
        .footer-logo-container .text-corp { color: #FFFFFF !important; }
      `}</style>
    </footer>
  );
}

// Reusable styles to keep code clean
const headingStyle = { 
  color: '#C5A059', 
  marginBottom: '20px', 
  fontFamily: 'var(--font-merriweather)',
  fontSize: '1.1rem'
};

const linkStyle = { 
  color: '#cbd5e1', 
  textDecoration: 'none', 
  fontSize: '0.95rem', 
  transition: 'color 0.2s' 
};

const contactItemStyle = { 
  display: 'flex', 
  gap: '10px', 
  alignItems: 'center', 
  color: '#cbd5e1', 
  fontSize: '0.95rem' 
};