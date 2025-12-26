'use client';

import React from 'react';
import { Linkedin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function SocialLinks() {
  // Update these links with your actual profile URLs
  const socialLinks = [
    { name: 'LinkedIn', icon: <Linkedin size={14} />, href: 'https://linkedin.com' },
    { name: 'Telegram', icon: <TelegramIcon />, href: 'https://t.me/username' }, // Custom Icon below
    { name: 'WhatsApp', icon: <WhatsAppIcon />, href: 'https://wa.me/998901234567' }, // Custom Icon below
    { name: 'Facebook', icon: <Facebook size={14} />, href: 'https://facebook.com' },
    { name: 'Instagram', icon: <Instagram size={14} />, href: 'https://instagram.com' },
    { name: 'X', icon: <Twitter size={14} />, href: 'https://x.com' }, // Twitter Icon used for X
    { name: 'YouTube', icon: <Youtube size={14} />, href: 'https://youtube.com' },
    { name: 'TikTok', icon: <TikTokIcon />, href: 'https://tiktok.com' }, // Custom Icon below
  ];

  return (
    <div className="social-row">
      {socialLinks.map((item) => (
        <a 
          key={item.name} 
          href={item.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-btn"
          aria-label={item.name}
        >
          {item.icon}
        </a>
      ))}

      <style jsx>{`
        .social-row {
          display: flex;
          align-items: center;
          gap: 10px; /* Space between icons */
          padding: 0 15px;
          border-left: 1px solid rgba(255,255,255,0.2); /* Divider lines */
          border-right: 1px solid rgba(255,255,255,0.2);
          margin: 0 15px; /* Space from time/email */
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.2s ease;
        }

        .social-btn:hover {
          color: #C5A059; /* Gold color on hover */
          transform: translateY(-2px);
        }

        /* Hide on Mobile if crowded */
        @media (max-width: 1024px) {
          .social-row { display: none; }
        }
      `}</style>
    </div>
  );
}

// --- CUSTOM SVG ICONS (For brands missing in Lucide) ---

function TelegramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.509 1.793.997 3.592 1.48 5.388.16.36.506.494.864.498l-.002.018s.281.028.555-.038a2.1 2.1 0 0 0 .933-.517c.345-.324 1.28-1.244 1.811-1.764l3.999 2.952.032.018s.442.311 1.09.355c.324.022.75-.04 1.116-.308.37-.27.613-.702.728-1.196.349-1.494 1.273-5.487 2.091-8.984.802-3.43 1.572-6.764.752-7.552a1.05 1.05 0 0 0-.794-.373zm-13.625 5.94c.367-.134 3.65-1.41 7.037-2.705l.383-.147c.256-.098.513-.196.766-.291.68-.255 1.365-.515 2.046-.777l-5.696 5.488-.344 3.755L9.63 8.84l-2.057-.468z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}