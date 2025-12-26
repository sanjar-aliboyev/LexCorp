'use client';

import React from 'react';
import Link from 'next/link';
import { Linkedin, Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext'; // 1. Import Hook

export default function Footer() {
  const { t } = useLanguage(); // 2. Get Translations

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
            <h4 style={{ color: '#C5A059', marginBottom: '20px', fontFamily: 'var(--font-merriweather)' }}>{t.footer.company}</h4>
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
            <h4 style={{ color: '#C5A059', marginBottom: '20px', fontFamily: 'var(--font-merriweather)' }}>{t.footer.contact}</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li style={contactItemStyle}><Phone size={18} color="#C5A059"/> +998 90 123 45 67</li>
              <li style={contactItemStyle}><Mail size={18} color="#C5A059"/> info@prolex.uz</li>
              <li style={contactItemStyle}><MapPin size={18} color="#C5A059"/> Tashkent City, Nest One, 100000</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', fontSize: '0.85rem', color: '#8892b0' }}>
          <div>© {new Date().getFullYear()} ProLex Law Firm. {t.footer.rights}</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="#" style={{ color: '#8892b0', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="#" style={{ color: '#8892b0', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 50px; }
        .social-icon { color: #8892b0; transition: color 0.2s; }
        .social-icon:hover { color: #C5A059; }
      `}</style>
      
      <style jsx global>{`
        .footer-logo-container .prolex-logo { color: #C5A059 !important; }
        .footer-logo-container .text-pro { color: #FFFFFF !important; }
        .footer-logo-container .text-lex { color: #C5A059 !important; }
      `}</style>
    </footer>
  );
}

const linkStyle = { color: '#cbd5e1', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' };
const contactItemStyle = { display: 'flex', gap: '10px', alignItems: 'center', color: '#cbd5e1', fontSize: '0.95rem' };