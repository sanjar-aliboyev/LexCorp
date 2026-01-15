'use client';

import React, { useState } from 'react';
import { Linkedin, Mail, Award, GraduationCap, Facebook, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TEAM_DATA } from '../data/team';
import type { Language } from '../types';

export default function TeamPage() {
  const { t, lang } = useLanguage();
  const currentLang = (lang || 'UZ') as 'UZ' | 'RU' | 'EN';
  
  // Logic for "Load More" (currently shows all since we have < 9, but setup is ready)
  const [visibleCount, setVisibleCount] = useState(9);
  const visibleTeam = TEAM_DATA.slice(0, visibleCount);

  return (
    <main style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh', transition: 'background-color 0.3s' }}>

      {/* HERO SECTION */}
      <section className="team-hero">
        <div className="container">
          <h1 className="hero-title">{t.teamPage.title}</h1>
          <p className="hero-subtitle">
            {t.teamPage.subtitle}
          </p>
        </div>
      </section>

      {/* TEAM GRID */}
      <section className="team-grid-section">
        <div className="container">
          <div className="grid-layout">
            {visibleTeam.map((member) => (
              <div key={member.id} className="team-card">
                {/* Image Section - Taller Aspect Ratio */}
                <div className="card-image" style={{ backgroundImage: `url(${member.image})` }}>
                  <div className="overlay">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="icon-btn">
                        <Mail size={18} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="icon-btn">
                        <Linkedin size={18} />
                      </a>
                    )}
                    {member.facebook && (
                      <a href={member.facebook} target="_blank" rel="noreferrer" className="icon-btn">
                        <Facebook size={18} />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="card-content">
                  <div className="role-badge">{member.role[currentLang]}</div>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="specialization">{member.specialization[currentLang]}</p>
                  
                  <div className="divider"></div>
                  
                  <div className="meta-row">
                    <div className="meta-item">
                      <GraduationCap size={16} className="meta-icon" />
                      <span>{member.education[currentLang]}</span>
                    </div>
                    <div className="meta-item">
                      <Award size={16} className="meta-icon" />
                      <span>{member.experience} {t.teamPage.experienceSuffix}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button - Only visible if there are more members to show */}
          {TEAM_DATA.length > visibleCount && (
            <div className="load-more-container">
              <button onClick={() => setVisibleCount(prev => prev + 6)} className="load-more-btn">
                {currentLang === 'EN' ? 'Load More' : currentLang === 'RU' ? 'Загрузить еще' : "Yana ko'proq ko'rish"} <ChevronDown size={18} />
              </button>
            </div>
          )}

        </div>
      </section>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5%;
        }

        /* --- HERO --- */
        .team-hero {
          padding: 160px 0 60px;
          background-color: var(--bg-surface);
          text-align: center;
          border-bottom: 1px solid var(--border-color);
        }
        .hero-title {
          font-family: var(--font-merriweather);
          font-size: 3rem;
          color: var(--text-main);
          margin-bottom: 15px;
        }
        .hero-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* --- GRID --- */
        .team-grid-section {
          padding: 60px 0 100px;
        }
        .grid-layout {
          display: grid;
          /* Strict 3 columns on desktop */
          grid-template-columns: repeat(3, 1fr); 
          gap: 30px;
        }

        /* --- CARD --- */
        .team-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
        }
        .team-card:hover {
          transform: translateY(-5px);
          border-color: #C5A059;
        }

        /* PORTRAIT IMAGE */
        .card-image {
          width: 100%;
          /* This creates a portrait aspect ratio (approx 3:4) */
          aspect-ratio: 3 / 4; 
          background-size: cover;
          background-position: top center;
          position: relative;
          background-color: #e5e5e5;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 31, 63, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .team-card:hover .overlay {
          opacity: 1;
        }

        .icon-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: #fff;
          color: #001F3F;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .icon-btn:hover {
          background: #C5A059;
          color: #fff;
        }

        /* CONTENT */
        .card-content {
          padding: 20px;
          text-align: center;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .role-badge {
          display: inline-block;
          background: rgba(197, 160, 89, 0.15);
          color: #C5A059;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        .member-name {
          font-family: var(--font-merriweather);
          color: var(--text-main);
          font-size: 1.35rem; /* Slightly smaller */
          margin-bottom: 5px;
          line-height: 1.2;
        }
        
        .specialization {
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-style: italic;
          min-height: 40px;
          display: flex; align-items: center; justify-content: center;
        }

        .divider {
          height: 1px;
          background: var(--border-color);
          margin: 15px auto;
          width: 40px;
        }

        .meta-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
          width: 100%;
        }
        .meta-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.8rem;
          text-align: center;
          line-height: 1.3;
        }
        :global(.meta-icon) {
          color: #C5A059;
          flex-shrink: 0;
        }

        /* LOAD MORE BUTTON */
        .load-more-container {
          margin-top: 50px;
          text-align: center;
        }
        .load-more-btn {
          background: linear-gradient(135deg, #C5A059 0%, #A67C00 100%);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: opacity 0.3s, transform 0.2s;
          box-shadow: 0 4px 15px rgba(197, 160, 89, 0.3);
        }
        .load-more-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .grid-layout { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .grid-layout { grid-template-columns: 1fr; }
          .card-image { aspect-ratio: auto; height: 350px; }
        }
      `}</style>
    </main>
  );
}