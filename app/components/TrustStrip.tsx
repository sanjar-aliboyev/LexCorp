'use client';

import React from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TrustStrip() {
  const { t } = useLanguage();

  return (
    <section className="section global-teaser">
      <div className="container">
        <div className="global-content">
          <div className="global-text">
            <h2 className="section-title text-left">{t.globalSection.title}</h2>
            <p className="global-desc">{t.globalSection.desc}</p>
            <Link href="/amaliyot" className="btn btn-primary">
              {t.globalSection.btnMap} <Globe size={18} />
            </Link>
          </div>
          <div className="global-visual">
             {/* Abstract Map SVG */}
             <svg viewBox="0 0 200 100" className="abstract-map">
               <path d="M20,50 Q50,10 80,50 T140,50 T200,50" fill="none" stroke="#C5A059" strokeWidth="2" opacity="0.5" />
               <circle cx="20" cy="50" r="3" fill="#C5A059" />
               <circle cx="80" cy="50" r="3" fill="#C5A059" />
               <circle cx="140" cy="50" r="3" fill="#C5A059" />
             </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container { max-width: 1200px; margin: 0 auto; padding: 0 5%; }
        .section { padding: 100px 0; }
        .global-teaser { background-color: var(--bg-surface); }
        .global-content { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 50px; 
          align-items: center; 
        }
        .section-title { 
          font-family: var(--font-merriweather); 
          font-size: 2.5rem; 
          color: var(--text-main); 
          margin-bottom: 15px; 
        }
        .text-left { text-align: left !important; }
        .global-desc { 
          color: var(--text-secondary); 
          font-size: 1.1rem; 
          line-height: 1.6; 
          margin-bottom: 30px; 
        }
        .global-visual { 
          height: 300px; 
          display: flex; align-items: center; justify-content: center; 
        }
        .abstract-map { width: 80%; height: 80%; }
        
        .btn { 
          display: inline-flex; align-items: center; gap: 10px; 
          padding: 14px 28px; border-radius: 4px; 
          font-weight: 600; text-decoration: none; transition: all 0.2s; 
        }
        .btn-primary { background: #001F3F; color: #fff; border: 1px solid #001F3F; }
        .btn-primary:hover { background: #003366; }

        @media (max-width: 768px) { 
          .global-content { grid-template-columns: 1fr; } 
          .text-left { text-align: center !important; } 
        }
      `}</style>
    </section>
  );
}