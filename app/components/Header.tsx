'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Clock, Mail, Sun, Moon, ChevronDown, 
  Building2, Scale, ShieldCheck, Globe 
} from 'lucide-react';
import { useModal } from './ModalContext';
import { useLanguage } from '../context/LanguageContext'; // Import Language Hook
import { SERVICES_DATA } from '../data/services';
import Logo from './Logo';
import SocialLinks from '../../components/SocialLinks';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  
  // 1. Get Language State from Context
  const { lang, setLang, t } = useLanguage();
  
  const modalContext = useModal();
  const openModal = modalContext ? modalContext.openModal : () => console.log("Modal not connected");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    document.body.setAttribute('data-theme', theme);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  
  const currentLang = (lang || 'UZ') as 'UZ' | 'RU' | 'EN';
  const megaMenuColumns = [
    SERVICES_DATA.slice(0, 2),
    SERVICES_DATA.slice(2, 4),
    SERVICES_DATA.slice(4, 6)
  ];

  return (
    <header 
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
        backgroundColor: isScrolled ? 'var(--bg-card)' : 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? 'var(--shadow)' : 'none'
      }}
      onMouseLeave={() => setIsMegaMenuOpen(false)}
    >
      {/* 1. TOP UTILITY BAR */}
      <div style={{ backgroundColor: '#001F3F', color: '#fff', fontSize: '0.8rem', padding: '8px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} /> Dushanba – Juma, 09:00–18:00
            </span>
            <SocialLinks />
            <span className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} /> sanjar@aliboyev.com
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* 2. Language Switcher connected to Context */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={14} style={{ opacity: 0.7 }} />
              <div style={{ display: 'flex', gap: '5px', fontWeight: 600 }}>
                <button onClick={() => setLang('UZ')} style={{ background: 'none', border: 'none', color: '#fff', opacity: lang === 'UZ' ? 1 : 0.5, cursor: 'pointer', padding: 0 }}>UZ</button>
                <span style={{ opacity: 0.3 }}>|</span>
                <button onClick={() => setLang('RU')} style={{ background: 'none', border: 'none', color: '#fff', opacity: lang === 'RU' ? 1 : 0.5, cursor: 'pointer', padding: 0 }}>RU</button>
                <span style={{ opacity: 0.3 }}>|</span>
                <button onClick={() => setLang('EN')} style={{ background: 'none', border: 'none', color: '#fff', opacity: lang === 'EN' ? 1 : 0.5, cursor: 'pointer', padding: 0 }}>EN</button>
              </div>
            </div>
            
            <div style={{ width: '1px', height: '12px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
            
            <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '0.8rem' }}>
               {theme === 'light' ? <Moon size={14}/> : <Sun size={14}/>} 
               <span className="hide-on-mobile">Rejim</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <div style={{ padding: '15px 5%', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo />
        </Link>

        {/* DESKTOP NAV - Uses Translations {t.header.xyz} */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '30px', alignItems: 'center', height: '100%' }}>
          <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }} onMouseEnter={() => setIsMegaMenuOpen(true)}>
            <Link href="/services" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 0' }}>
              {t.header.services} <ChevronDown size={14} />
            </Link>
          </div>
          <Link href="/amaliyot" className="nav-link">{t.header.practice}</Link>
          <Link href="/team" className="nav-link">{t.header.team}</Link>
          <Link href="/blog" className="nav-link">{t.header.blog}</Link>
          <Link href="/aloqa" className="nav-link">{t.header.contact}</Link>
          <button onClick={openModal} style={{ backgroundColor: '#001F3F', color: '#fff', padding: '10px 24px', borderRadius: '4px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
            {t.header.cta}
          </button>
        </nav>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MEGA MENU (Dynamic) */}
      <div className={`mega-menu ${isMegaMenuOpen ? 'open' : ''}`} onMouseEnter={() => setIsMegaMenuOpen(true)} onMouseLeave={() => setIsMegaMenuOpen(false)}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          {megaMenuColumns.map((column, colIndex) => (
            <div className="mega-col" key={colIndex}>
              {column.map(service => {
                const Icon = service.icon;
                const title = service.titles[currentLang] || service.titles['EN'];
                const subList = service.subServices[currentLang] || service.subServices['EN'];
                return (
                  <div key={service.id} style={{ marginBottom: '30px' }}>
                    <h4 className="col-title"><Icon size={18} color="#C5A059" /> {title}</h4>
                    <ul>
                      {subList.map((item, i) => (
                        <li key={i}><Link href="/services">{item}</Link></li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE MENU - Uses Translations */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>{t.header.home}</Link>
          <div style={{ borderTop: '1px solid #eee', paddingTop: '10px' }}>
            <h4 style={{ color: '#C5A059', marginBottom: '10px' }}>{t.header.services}</h4>
            {SERVICES_DATA.map(service => {
              const title = service.titles[currentLang] || service.titles['EN'];
              return (
                <Link key={service.id} href="/services" style={{ display: 'block', marginBottom: '10px', paddingLeft: '10px' }} onClick={() => setMobileMenuOpen(false)}>{title}</Link>
              )
            })}
          </div>
          <Link href="/amaliyot" onClick={() => setMobileMenuOpen(false)}>{t.header.practice}</Link>
          <Link href="/team" onClick={() => setMobileMenuOpen(false)}>{t.header.team}</Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>{t.header.blog}</Link>
          <Link href="/aloqa" onClick={() => setMobileMenuOpen(false)}>{t.header.contact}</Link>
          <button onClick={() => { setMobileMenuOpen(false); openModal(); }} style={{ backgroundColor: '#001F3F', color: '#fff', padding: '12px', borderRadius: '4px', border: 'none', fontWeight: 600, cursor: 'pointer', width: '100%' }}>
            {t.header.cta}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .nav-link { font-size: 0.95rem; font-weight: 500; color: var(--text-main); transition: color 0.2s; }
        .nav-link:hover { color: var(--primary-color); }
        .mobile-toggle { display: none; background: none; border: none; color: var(--text-main); cursor: pointer; }
        
        .mega-menu {
          position: absolute; top: 100%; left: 0; width: 100%; background-color: var(--bg-card);
          border-top: 1px solid var(--border-color); border-bottom: 4px solid #C5A059;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1); opacity: 0; visibility: hidden;
          transform: translateY(-10px); transition: all 0.3s ease; padding: 40px 0; z-index: 999;
        }
        .mega-menu.open { opacity: 1; visibility: visible; transform: translateY(0); }
        
        .mobile-menu {
          position: fixed; top: 115px; left: 0; width: 100%; height: calc(100vh - 115px);
          background: var(--bg-card); transform: translateX(100%); transition: transform 0.3s ease;
          z-index: 998; border-top: 1px solid var(--border-color);
        }
        .mobile-menu.open { transform: translateX(0); }

        .col-title { font-size: 1rem; font-weight: 700; color: var(--primary-color); margin-bottom: 20px; display: flex; alignItems: center; gap: 10px; text-transform: uppercase; }
        .mega-col ul { list-style: none; padding: 0; }
        .mega-col li { margin-bottom: 12px; }
        .mega-col a { font-size: 0.95rem; color: var(--text-secondary); transition: transform 0.2s; display: inline-block; }
        .mega-col a:hover { color: var(--primary-color); transform: translateX(5px); }

        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}