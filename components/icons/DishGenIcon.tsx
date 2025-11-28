
import React from 'react';

const DishGenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <pattern id="screenGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#4DD0E1" strokeWidth="0.5" opacity="0.15"/>
      </pattern>

      <linearGradient id="metalStem" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#78909C"/>
        <stop offset="50%" stopColor="#CFD8DC"/>
        <stop offset="100%" stopColor="#78909C"/>
      </linearGradient>

      <radialGradient id="deepScreen" cx="50%" cy="0%" r="100%">
        <stop offset="0%" stopColor="#1A4D5C"/>
        <stop offset="100%" stopColor="#09202A"/>
      </radialGradient>

      <linearGradient id="ceramicHead" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF"/>
        <stop offset="80%" stopColor="#CFD8DC"/>
        <stop offset="100%" stopColor="#B0BEC5"/>
      </linearGradient>
      
      <radialGradient id="bodySphere" cx="40%" cy="30%" r="90%">
        <stop offset="0%" stopColor="#F5F7F8"/>
        <stop offset="50%" stopColor="#CFD8DC"/>
        <stop offset="100%" stopColor="#90A4AE"/>
      </radialGradient>

      <filter id="hyperGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="deepShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="12"/>
        <feOffset dx="0" dy="15"/>
        <feComponentTransfer><feFuncA type="linear" slope="0.6"/></feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <radialGradient id="bounceLight" cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#00BCD4" stopOpacity="0"/>
      </radialGradient>

      <radialGradient id="bodyShine" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
      </radialGradient>
    </defs>

    <g>
      <circle cx="256" cy="320" r="115" fill="url(#bodySphere)"/>

      <circle cx="256" cy="320" r="115" fill="url(#bounceLight)"/>

      <path d="M186 400 Q 256 430 326 400 Q 326 420 256 425 Q 186 420 186 400" fill="white" opacity="0.9"/>
    </g>

    <g filter="url(#deepShadow)">
      
      <g>
          <rect x="249" y="85" width="14" height="50" fill="url(#metalStem)"/>
          <rect x="247" y="130" width="18" height="5" rx="2" fill="#607D8B"/>
          <circle cx="256" cy="70" r="16" fill="url(#ceramicHead)"/>
          <circle cx="256" cy="70" r="16" fill="url(#bodyShine)" opacity="0.6"/>
          <circle cx="248" cy="64" r="5" fill="white" opacity="0.9"/>
      </g>
      
      <g>
          <path d="M135 210 C 100 210, 100 290, 135 290 L 160 280 L 160 220 Z" fill="url(#ceramicHead)"/>
          <path d="M377 210 C 412 210, 412 290, 377 290 L 352 280 L 352 220 Z" fill="url(#ceramicHead)"/>
      </g>

      <rect x="136" y="130" width="240" height="185" rx="75" fill="url(#ceramicHead)"/>
      
      <path d="M166 132 H 346 Q 370 132 370 156" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
      
      <path d="M160 145 Q 190 140 220 145 Q 220 160 160 165" fill="white" opacity="0.6" filter="url(#hyperGlow)"/>

      <g transform="translate(176, 175)">
        <rect x="0" y="0" width="160" height="105" rx="35" fill="#546E7A"/>
        
        <rect x="3" y="3" width="154" height="99" rx="32" fill="url(#deepScreen)"/>
        
        <rect x="3" y="3" width="154" height="99" rx="32" fill="url(#screenGrid)"/>
        
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="80%" stopColor="black" stopOpacity="0"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.6"/>
        </radialGradient>
        <rect x="3" y="3" width="154" height="99" rx="32" fill="url(#vignette)"/>

        <g filter="url(#hyperGlow)">
          <circle cx="40" cy="45" r="14" fill="#006064" opacity="0.8"/>
          <circle cx="40" cy="45" r="10" fill="#84FFFF"/>
          <circle cx="42" cy="43" r="3" fill="white"/>
          
          <circle cx="114" cy="45" r="14" fill="#006064" opacity="0.8"/>
          <circle cx="114" cy="45" r="10" fill="#84FFFF"/>
          <circle cx="116" cy="43" r="3" fill="white"/>

          <path d="M 54 75 Q 77 90 100 75" fill="none" stroke="#84FFFF" strokeWidth="6" strokeLinecap="round"/>
        </g>

        <path d="M 10 10 L 100 10 L 60 100 L -20 100 Z" fill="white" opacity="0.08"/>
        <path d="M 120 10 L 140 10 L 100 100 L 80 100 Z" fill="white" opacity="0.08"/>
      </g>
    </g>
  </svg>
);

export default DishGenIcon;
