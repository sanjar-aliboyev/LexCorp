'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Controller } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useLanguage } from '../context/LanguageContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

// --- DATA: HERO SUCCESS STORIES ---
// In a real app, move these strings to your translations.ts file.
const HERO_CASES = [
  {
    id: 0,
    category: "INTELLECTUAL PROPERTY",
    title: "Protecting Global Retail Giants",
    result: "Seized 50,000+ counterfeit goods & secured market exclusivity.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
    link: "/amaliyot"
  },
  {
    id: 1,
    category: "TAX LITIGATION",
    title: "$500k Industrial Tax Dispute",
    result: "Reversed an unlawful VAT penalty for a leading textile exporter.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600",
    link: "/amaliyot"
  },
  {
    id: 2,
    category: "M&A & INVESTMENT",
    title: "Restoring Investor Rights",
    result: "Recovered 40% equity share for a foreign investor in local court.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
    link: "/amaliyot"
  }
];

export default function PracticeSlider() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Handle manual navigation (Hover/Click on tabs)
  const handleTabHover = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <section className="hero-wrapper">
      
      {/* 1. THE VISUAL ENGINE (Swiper) */}
      <Swiper
        modules={[EffectFade, Autoplay, Controller]}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        speed={1200}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-swiper"
      >
        {HERO_CASES.map((story) => (
          <SwiperSlide key={story.id}>
            <div className="slide-bg" style={{ backgroundImage: `url(${story.image})` }}>
              {/* The Navy Veil Overlay */}
              <div className="overlay"></div>
            </div>
            
            {/* Layer 1: Content Anchor (Centered Text) */}
            <div className="slide-content container">
              <div className="text-wrapper">
                <span className="slide-category">{story.category}</span>
                <h2 className="slide-title">{story.title}</h2>
                <p className="slide-result">{story.result}</p>
                
                <Link href={story.link} className="slide-btn">
                  Read Case Study <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 2. THE CONTROL DASHBOARD (Bottom Tabs) */}
      <div className="hero-controls container">
        <div className="controls-grid">
          {HERO_CASES.map((story, index) => (
            <div 
              key={story.id}
              className={`control-tab ${activeIndex === index ? 'active' : ''}`}
              onMouseEnter={() => handleTabHover(index)}
              onClick={() => handleTabHover(index)} // For mobile support
            >
              <div className="progress-bar"></div>
              <div className="tab-info">
                <span className="tab-cat">{story.category}</span>
                <span className="tab-arrow"><ChevronRight size={16}/></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* --- LAYOUT --- */
        .hero-wrapper {
          position: relative;
          height: 85vh; /* Cinematic Height */
          min-height: 600px;
          background: #000;
          color: #fff;
        }

        /* --- SWIPER LAYERS --- */
        :global(.hero-swiper) {
          width: 100%;
          height: 100%;
        }
        
        .slide-bg {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        /* The Navy Veil: Critical for "ProLex" readability */
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
          z-index: 1;
        }

        /* --- TYPOGRAPHY & CONTENT --- */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5%;
          height: 100%;
          position: relative;
        }

        .slide-content {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          display: flex;
          align-items: center;
          z-index: 10;
          pointer-events: none; /* Let clicks pass through to background/controls */
        }

        .text-wrapper {
          max-width: 650px;
          pointer-events: auto; /* Re-enable clicks for the text/button */
          margin-top: -60px; /* Slight offset upwards */
        }

        .slide-category {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #C5A059; /* Gold */
          text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.2s;
        }

        .slide-title {
          font-family: var(--font-merriweather);
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.2;
          
          /* FORCE WHITE COLOR ALWAYS (Overrides Light Mode Navy) */
          color: #ffffff !important; 
          text-shadow: 0 2px 10px rgba(0,0,0,0.5); /* Adds readability on light images */
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.4s;
        }

        .slide-result { /* Assuming this is the 'slide-desc' referred to by user */
          font-size: 1.25rem;
          color: #e2e8f0 !important; /* Force white for description too */
          margin-bottom: 40px;
          line-height: 1.6;
          font-weight: 300;
          border-left: 2px solid #C5A059;
          padding-left: 20px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5); /* Added */
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.6s;
        }

        .slide-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.8s;
        }
        .slide-btn:hover {
          border-color: #C5A059;
          color: #C5A059;
          padding-left: 40px; /* Slight movement on hover */
        }

        /* --- CONTROLS DASHBOARD --- */
        .hero-controls {
          position: absolute;
          bottom: 40px;
          left: 0; right: 0;
          z-index: 20;
        }

        .controls-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .control-tab {
          cursor: pointer;
          padding-top: 20px;
          position: relative;
          transition: all 0.3s;
          opacity: 0.5;
        }

        .control-tab:hover, .control-tab.active {
          opacity: 1;
        }

        .progress-bar {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.2);
        }

        .control-tab.active .progress-bar::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          width: 0%;
          background: #C5A059;
          animation: progress 6s linear infinite; /* Matches autoplay delay */
        }

        .tab-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tab-cat {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tab-arrow {
          transform: translateX(-10px);
          opacity: 0;
          transition: all 0.3s;
          color: #C5A059;
        }

        .control-tab.active .tab-arrow {
          transform: translateX(0);
          opacity: 1;
        }

        /* --- ANIMATIONS --- */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 900px) {
          .hero-wrapper { height: auto; min-height: 100vh; padding-top: 80px; }
          .slide-title { font-size: 2.5rem; }
          .controls-grid { grid-template-columns: 1fr; gap: 10px; padding-bottom: 20px; }
          .control-tab { padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); }
          .progress-bar { display: none; } /* Simplify for mobile */
          .control-tab.active { border-top-color: #C5A059; }
        }
      `}</style>
    </section>
  );
}