'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

// --- CUSTOM HOOK: Count Up Animation ---
function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutExpo) for smooth "landing"
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
}

// Helper to format numbers back to strings
const formatValue = (num: number, original: string) => {
  if (original.includes('$')) return `$${num}M+`;
  if (original.includes('%')) return `${num}%`;
  if (original.includes('+')) return `${num}+`;
  return num.toString();
};

export default function StatsStrip() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Stats Data
  const stats = [
    { id: 1, target: 100, original: "100+", label: t.statsSection.stat1Label },
    { id: 2, target: 1000, original: "1000+", label: t.statsSection.stat2Label },
    { id: 3, target: 70,  original: "70+", label: t.statsSection.stat3Label },
    { id: 4, target: 3, original: "3+", label: t.statsSection.stat4Label },
  ];

  // Trigger animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Run only once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="stats-strip">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatItem 
              key={stat.id} 
              target={stat.target} 
              original={stat.original} 
              label={stat.label} 
              start={isVisible} 
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .stats-strip {
          background-color: #001F3F; /* ProLex Navy */
          padding: 60px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5%;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          align-items: center;
          text-align: center;
        }
        
        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 20px;
          }
        }
      `}</style>
    </section>
  );
}

// --- Sub-Component for individual Stat ---
function StatItem({ target, original, label, start }: { target: number, original: string, label: string, start: boolean }) {
  const count = useCountUp(target, 2500, start);

  return (
    <div className="stat-item">
      <span className="stat-value">{formatValue(count, original)}</span>
      <span className="stat-label">{label}</span>

      <style jsx>{`
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
          position: relative;
        }

        .stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: -15px;
          top: 10%;
          height: 80%;
          width: 1px;
          background: rgba(255, 255, 255, 0.15);
        }

        .stat-value {
          font-family: var(--font-merriweather);
          font-size: 2.8rem;
          font-weight: 700;
          color: #C5A059;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        .stat-label {
          font-family: var(--font-inter);
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .stat-item:not(:last-child)::after { display: none; }
          .stat-value { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
}