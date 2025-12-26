'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Linkedin, Mail, Award, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TeamPage() {
  const { t } = useLanguage();

  return (
    <main style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh', transition: 'background-color 0.3s' }}>
      <Header />

      {/* HEADER SECTION */}
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
            {t.teamPage.teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="card-image" style={{ backgroundImage: `url(${member.image})` }}>
                  <div className="overlay">
                    <a href={`mailto:${member.email}`} className="icon-btn">
                      <Mail size={20} />
                    </a>
                    <a href="#" className="icon-btn">
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
                
                <div className="card-content">
                  <div className="role-badge">{member.role}</div>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="specialization">{member.specialization}</p>
                  
                  <div className="divider"></div>
                  
                  <div className="meta-row">
                    <div className="meta-item">
                      <GraduationCap size={16} className="meta-icon" />
                      <span>{member.education}</span>
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
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5%;
        }

        /* --- HERO --- */
        .team-hero {
          padding: 180px 0 80px;
          background-color: var(--bg-surface);
          text-align: center;
          border-bottom: 1px solid var(--border-color);
        }
        .hero-title {
          font-family: var(--font-merriweather);
          font-size: 3.5rem;
          color: var(--text-main);
          margin-bottom: 20px;
        }
        .hero-subtitle {
          color: var(--text-secondary);
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* --- GRID --- */
        .team-grid-section {
          padding: 80px 0 120px;
        }
        .grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 40px;
        }

        /* --- CARD --- */
        .team-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        .team-card:hover {
          transform: translateY(-10px);
          border-color: #C5A059;
        }

        .card-image {
          height: 350px;
          background-size: cover;
          background-position: top center;
          position: relative;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 31, 63, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .team-card:hover .overlay {
          opacity: 1;
        }

        .icon-btn {
          width: 45px; height: 45px;
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

        .card-content {
          padding: 25px;
          text-align: center;
        }
        
        .role-badge {
          display: inline-block;
          background: rgba(197, 160, 89, 0.15);
          color: #C5A059;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        .member-name {
          font-family: var(--font-merriweather);
          color: var(--text-main);
          font-size: 1.5rem;
          margin-bottom: 5px;
        }
        
        .specialization {
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-style: italic;
        }

        .divider {
          height: 1px;
          background: var(--border-color);
          margin: 20px auto;
          width: 60px;
        }

        .meta-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        :global(.meta-icon) {
          color: #C5A059;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .grid-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}