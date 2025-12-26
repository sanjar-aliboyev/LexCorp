'use client';

import React, { useState } from 'react';
import { ArrowRight, Building2, FileText, Scale, Home, ShieldAlert, Gavel } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import { SERVICES_DATA } from '../data/services';


export default function ServicesSection() {
  const { t, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0); 

  // Fallback language if context is undefined
  const currentLang = (lang || 'UZ') as 'UZ' | 'RU' | 'EN';

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
        <div className="section-header">
          <h2 className="section-title">{t.servicesPage?.title || "Our Expertise"}</h2>
          <div className="header-line"></div>
        </div>

        <div className="services-grid">
          {SERVICES_DATA.map((service, index) => {
            const Icon = service.icon;
            // DIRECT DATA ACCESS - No external translation map
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

      <style jsx>{`
        .services-container {
          position: relative;
          min-height: 800px;
          overflow: hidden;
          background-color: #001F3F;
        }

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

        .section-header { margin-bottom: 50px; }
        .section-title {
          font-family: var(--font-merriweather);
          font-size: 3rem; color: #fff; margin-bottom: 20px;
        }
        .header-line { width: 80px; height: 4px; background: #C5A059; }

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
        }
      `}</style>
    </section>
  );
}