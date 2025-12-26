'use client';

import React from 'react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`prolex-logo ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      
      {/* This SVG is drawn exactly based on your "Logo light.jpg" image:
        - Ionic Column Capital (Scrolls on sides)
        - Gavel inside the capital (using a mask for transparency)
        - Fluted Shaft (Vertical lines)
        - Angled/Slanted bottom cut
      */}
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 100 100" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
        className="logo-icon"
      >
        <defs>
          <mask id="gavel-cutout">
            <rect width="100%" height="100%" fill="white" />
            {/* The Gavel Shape (Black = Cutout/Transparent) */}
            <path d="M48 28 h12 v-6 h-12 z" fill="black" /> {/* Gavel Head */}
            <rect x="54" y="25" width="20" height="3" fill="black" /> {/* Gavel Handle */}
            <rect x="52" y="32" width="4" height="2" fill="black" /> {/* Gavel Base Block */}
          </mask>
        </defs>

        {/* The Column Shape (Masked) */}
        <g mask="url(#gavel-cutout)">
           {/* Top Capital: Rectangle with two circles/volutes */}
           <path d="M20 20 h60 v15 h-60 z" />
           <circle cx="25" cy="27" r="10" /> 
           <circle cx="75" cy="27" r="10" />
           {/* Clear out center of volutes for detail */}
           <circle cx="25" cy="27" r="4" fill="var(--bg-card, white)" />
           <circle cx="75" cy="27" r="4" fill="var(--bg-card, white)" />
           
           {/* Neck of Column */}
           <rect x="28" y="38" width="44" height="5" />

           {/* The Slanted Shaft (Vertical Lines ending diagonally) */}
           {/* We use a polygon to create the slanted bottom effect */}
           <path d="M30 46 h8 v40 L30 80 Z" />  {/* Left Stripe */}
           <path d="M41 46 h8 v34 L41 71 Z" />  {/* Middle-Left Stripe */}
           <path d="M52 46 h8 v28 L52 62 Z" />  {/* Middle-Right Stripe */}
           <path d="M63 46 h8 v22 L63 56 Z" />  {/* Right Stripe */}
        </g>
      </svg>

      {/* Text: ProLex */}
      <span style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1px', fontFamily: 'var(--font-merriweather)', lineHeight: 1 }}>
        <span className="text-pro">Pro</span>
        <span className="text-lex">Lex</span>
      </span>

      <style jsx>{`
        /* --- LOGO COLOR LOGIC --- */
        
        /* Light Mode: Navy Icon, Navy Pro, Bronze Lex */
        .prolex-logo { color: #001F3F; } 
        .text-pro { color: #001F3F; }    
        .text-lex { color: #C5A059; }    

        /* Dark Mode: Bronze Icon, White Pro, Bronze Lex */
        :global([data-theme="dark"]) .prolex-logo { color: #C5A059; } 
        :global([data-theme="dark"]) .text-pro { color: #FFFFFF; }    
        :global([data-theme="dark"]) .text-lex { color: #C5A059; }    
        
        /* Footer Override (Always Dark Theme style) */
        :global(.footer-logo-container) .prolex-logo { color: #C5A059 !important; }
        :global(.footer-logo-container) .text-pro { color: #FFFFFF !important; }
      `}</style>
    </div>
  );
}