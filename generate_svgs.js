const fs = require('fs').promises;
const path = require('path');

const imgDir = path.join(__dirname, 'public/images/products');

const svgs = {
  'mouse.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="mouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#60a5fa" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#1e293b" flood-opacity="0.15" />
        </filter>
      </defs>
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <ellipse cx="100" cy="115" rx="45" ry="60" fill="url(#mouseGrad)" filter="url(#shadow)"/>
      <path d="M100 55 C110 55, 140 75, 140 115 C140 145, 120 175, 100 175 C80 175, 60 145, 60 115 C60 75, 90 55, 100 55 Z" fill="none" stroke="#2563eb" stroke-width="2"/>
      <path d="M100 55 V110" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/>
      <path d="M62 110 H138" stroke="#f8fafc" stroke-dasharray="4 4" stroke-opacity="0.5"/>
      <rect x="94" y="70" width="12" height="24" rx="6" fill="#f8fafc" filter="url(#shadow)"/>
      <circle cx="100" cy="82" r="3" fill="#3b82f6"/>
      <path d="M80 160 C90 168, 110 168, 120 160" stroke="url(#accentGrad)" stroke-width="4" stroke-linecap="round" fill="none"/>
    </svg>
  `,
  'keyboard.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="kbdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#2563eb" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0px 8px 12px rgba(15,23,42,0.15))">
        <rect x="25" y="60" width="150" height="80" rx="10" fill="url(#kbdGrad)" stroke="#334155" stroke-width="2"/>
        <rect x="30" y="65" width="140" height="70" rx="6" fill="none" stroke="#2563eb" stroke-width="1" opacity="0.6" filter="url(#glow)"/>
        <!-- Keyboard keys -->
        <rect x="35" y="72" width="12" height="10" rx="2" fill="url(#keyGrad)"/>
        <rect x="51" y="72" width="12" height="10" rx="2" fill="#334155"/>
        <rect x="67" y="72" width="12" height="10" rx="2" fill="#334155"/>
        <rect x="83" y="72" width="12" height="10" rx="2" fill="#334155"/>
        <rect x="99" y="72" width="12" height="10" rx="2" fill="#334155"/>
        <rect x="115" y="72" width="12" height="10" rx="2" fill="#334155"/>
        <rect x="131" y="72" width="12" height="10" rx="2" fill="#334155"/>
        <rect x="147" y="72" width="18" height="10" rx="2" fill="url(#keyGrad)"/>

        <rect x="35" y="86" width="16" height="10" rx="2" fill="#334155"/>
        <rect x="55" y="86" width="12" height="10" rx="2" fill="#475569"/>
        <rect x="71" y="86" width="12" height="10" rx="2" fill="#475569"/>
        <rect x="87" y="86" width="12" height="10" rx="2" fill="#475569"/>
        <rect x="103" y="86" width="12" height="10" rx="2" fill="#475569"/>
        <rect x="119" y="86" width="12" height="10" rx="2" fill="#475569"/>
        <rect x="135" y="86" width="12" height="10" rx="2" fill="#475569"/>
        <rect x="151" y="86" width="14" height="10" rx="2" fill="#334155"/>

        <rect x="35" y="100" width="18" height="10" rx="2" fill="#334155"/>
        <rect x="57" y="100" width="12" height="10" rx="2" fill="#475569"/>
        <rect x="73" y="100" width="12" height="10" rx="2" fill="#475569"/>
        <rect x="89" y="100" width="12" height="10" rx="2" fill="#475569"/>
        <rect x="105" y="100" width="12" height="10" rx="2" fill="#475569"/>
        <rect x="121" y="100" width="12" height="10" rx="2" fill="#475569"/>
        <rect x="137" y="100" width="28" height="10" rx="2" fill="url(#keyGrad)"/>

        <rect x="35" y="114" width="14" height="10" rx="2" fill="url(#keyGrad)"/>
        <rect x="53" y="114" width="12" height="10" rx="2" fill="#334155"/>
        <rect x="69" y="114" width="62" height="10" rx="2" fill="url(#keyGrad)"/>
        <rect x="135" y="114" width="12" height="10" rx="2" fill="#334155"/>
        <rect x="151" y="114" width="14" height="10" rx="2" fill="url(#keyGrad)"/>
      </g>
    </svg>
  `,
  'speaker.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="spkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 8px 12px rgba(37,99,235,0.2))">
        <!-- Main body -->
        <rect x="65" y="40" width="70" height="120" rx="35" fill="url(#spkGrad)"/>
        <!-- Speaker mesh pattern -->
        <rect x="70" y="55" width="60" height="90" rx="30" fill="#1e293b" opacity="0.85"/>
        <!-- Decorative sound waves -->
        <path d="M45 80 C35 90, 35 110, 45 120" stroke="#3b82f6" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M35 70 C20 85, 20 115, 35 130" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
        <path d="M155 80 C165 90, 165 110, 155 120" stroke="#3b82f6" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M165 70 C180 85, 180 115, 165 130" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
        <!-- Controls -->
        <circle cx="100" cy="50" r="3" fill="#f8fafc"/>
        <circle cx="90" cy="50" r="2" fill="#94a3b8"/>
        <circle cx="110" cy="50" r="2" fill="#94a3b8"/>
        <path d="M92 145 H108" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
      </g>
    </svg>
  `,
  'hub.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 8px 12px rgba(15,23,42,0.1))">
        <!-- USB cable -->
        <path d="M100 130 V175 C100 180, 80 180, 80 160" stroke="#475569" stroke-width="6" stroke-linecap="round" fill="none"/>
        <rect x="73" y="145" width="14" height="20" rx="2" fill="#1e293b"/>
        <!-- Hub body -->
        <rect x="60" y="45" width="80" height="95" rx="8" fill="#1e293b"/>
        <rect x="65" y="50" width="70" height="85" rx="6" fill="#334155"/>
        <!-- Indicator light -->
        <circle cx="100" cy="60" r="3" fill="#3b82f6"/>
        <!-- USB Ports -->
        <rect x="75" y="75" width="20" height="8" rx="1" fill="#0f172a"/>
        <rect x="75" y="92" width="20" height="8" rx="1" fill="#0f172a"/>
        <rect x="75" y="109" width="20" height="8" rx="1" fill="#0f172a"/>
        <!-- USB Core accents -->
        <rect x="77" y="78" width="16" height="2" fill="#2563eb"/>
        <rect x="77" y="95" width="16" height="2" fill="#2563eb"/>
        <rect x="77" y="112" width="16" height="2" fill="#2563eb"/>
        <!-- HDMI label and port on side -->
        <rect x="110" y="85" width="15" height="15" rx="2" fill="#0f172a"/>
        <text x="117" y="120" font-family="sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle" font-weight="bold">4K</text>
      </g>
    </svg>
  `,
  'stand.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 10px 15px rgba(71,85,105,0.15))">
        <!-- Isometric stand design -->
        <path d="M40 130 L100 80 L160 130" stroke="#475569" stroke-width="12" stroke-linejoin="round" stroke-linecap="round" fill="none"/>
        <path d="M40 130 L100 80 L160 130" stroke="#94a3b8" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" fill="none"/>
        <!-- Riser pillars -->
        <path d="M100 80 V50" stroke="#64748b" stroke-width="10" stroke-linecap="round"/>
        <path d="M60 113 L60 83" stroke="#64748b" stroke-width="10" stroke-linecap="round"/>
        <path d="M140 113 L140 83" stroke="#64748b" stroke-width="10" stroke-linecap="round"/>
        <!-- Supporting platforms -->
        <polygon points="40,55 160,55 140,83 60,83" fill="#1e293b"/>
        <polygon points="43,58 157,58 138,80 62,80" fill="#3b82f6" opacity="0.9"/>
        <!-- Soft anti-slip rubber pads -->
        <rect x="50" y="58" width="20" height="4" fill="#0f172a"/>
        <rect x="130" y="58" width="20" height="4" fill="#0f172a"/>
      </g>
    </svg>
  `,
  'watch.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 8px 16px rgba(15,23,42,0.12))">
        <!-- Straps -->
        <rect x="75" y="20" width="50" height="160" rx="10" fill="#334155"/>
        <rect x="80" y="20" width="40" height="160" fill="#1e293b" opacity="0.3"/>
        <!-- Dial Frame -->
        <rect x="55" y="50" width="90" height="100" rx="28" fill="#475569" stroke="#64748b" stroke-width="2"/>
        <!-- Screen -->
        <rect x="60" y="55" width="80" height="90" rx="23" fill="url(#screenGrad)"/>
        <!-- Dial Crown Button -->
        <rect x="144" y="85" width="4" height="30" rx="2" fill="#334155"/>
        <!-- Dynamic UI Interface -->
        <circle cx="100" cy="100" r="30" fill="none" stroke="#334155" stroke-width="4"/>
        <circle cx="100" cy="100" r="30" fill="none" stroke="url(#ringGrad)" stroke-width="4" stroke-dasharray="140 180"/>
        <!-- Heartrate indicator -->
        <path d="M92 105 L96 95 L100 108 L104 92 L108 103 L112 100" fill="none" stroke="#ec4899" stroke-width="2" stroke-linecap="round"/>
        <text x="100" y="128" font-family="sans-serif" font-size="10" fill="#f8fafc" text-anchor="middle" font-weight="bold">10:45</text>
        <circle cx="100" cy="68" r="3" fill="#10b981"/>
      </g>
    </svg>
  `,
  'headphones.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="hdpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 10px 16px rgba(37,99,235,0.18))">
        <!-- Headband -->
        <path d="M50 110 A60 60 0 0 1 150 110" fill="none" stroke="#1e293b" stroke-width="10" stroke-linecap="round"/>
        <path d="M50 110 A60 60 0 0 1 150 110" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
        <!-- Metal adjusters -->
        <rect x="42" y="100" width="6" height="20" rx="2" fill="#94a3b8"/>
        <rect x="152" y="100" width="6" height="20" rx="2" fill="#94a3b8"/>
        <!-- Ear Cups -->
        <rect x="30" y="105" width="22" height="45" rx="11" fill="url(#hdpGrad)"/>
        <rect x="148" y="105" width="22" height="45" rx="11" fill="url(#hdpGrad)"/>
        <!-- Soft cushions -->
        <rect x="48" y="110" width="8" height="35" rx="4" fill="#1e293b"/>
        <rect x="144" y="110" width="8" height="35" rx="4" fill="#1e293b"/>
        <!-- Sound waves -->
        <path d="M20 115 A25 25 0 0 0 20 140" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
        <path d="M180 115 A25 25 0 0 1 180 140" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
      </g>
    </svg>
  `,
  'powerbank.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 8px 12px rgba(15,23,42,0.1))">
        <!-- Powerbank casing -->
        <rect x="65" y="40" width="70" height="120" rx="12" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="70" y="45" width="60" height="110" rx="8" fill="#334155"/>
        <!-- LED Battery levels -->
        <circle cx="85" cy="60" r="3" fill="#10b981"/>
        <circle cx="95" cy="60" r="3" fill="#10b981"/>
        <circle cx="105" cy="60" r="3" fill="#10b981"/>
        <circle cx="115" cy="60" r="3" fill="#d1d5db"/>
        <!-- USB port illustrations -->
        <rect x="78" y="130" width="16" height="8" rx="1" fill="#0f172a"/>
        <rect x="106" y="130" width="16" height="8" rx="1" fill="#0f172a"/>
        <!-- Brand logo mark -->
        <polygon points="100,85 106,97 94,97" fill="#2563eb"/>
        <polygon points="100,105 94,93 106,93" fill="#2563eb"/>
      </g>
    </svg>
  `,
  'mousepad.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="50%" stop-color="#8b5cf6" />
          <stop offset="100%" stop-color="#ec4899" />
        </linearGradient>
        <filter id="padGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 6px 12px rgba(15,23,42,0.12))">
        <!-- The Desk Pad -->
        <rect x="25" y="55" width="150" height="90" rx="10" fill="#1e293b"/>
        <!-- Stitched borders -->
        <rect x="28" y="58" width="144" height="84" rx="8" fill="none" stroke="url(#neonGlow)" stroke-width="2" filter="url(#padGlow)"/>
        <!-- Pattern mesh lines -->
        <path d="M40 90 L80 130" stroke="#334155" stroke-width="1" stroke-linecap="round"/>
        <path d="M50 80 L100 130" stroke="#334155" stroke-width="1" stroke-linecap="round"/>
        <path d="M60 70 L120 130" stroke="#334155" stroke-width="1" stroke-linecap="round"/>
        <!-- Tech grid accents -->
        <circle cx="150" cy="75" r="2" fill="#3b82f6"/>
        <circle cx="158" cy="75" r="2" fill="#ec4899"/>
      </g>
    </svg>
  `,
  'webcam.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 8px 12px rgba(15,23,42,0.12))">
        <!-- Stand Base clip -->
        <path d="M70 135 H130 L120 160 H80 Z" fill="#475569"/>
        <path d="M85 110 V140" stroke="#334155" stroke-width="8"/>
        <!-- Ball hinge -->
        <circle cx="100" cy="110" r="10" fill="#94a3b8"/>
        <!-- Webcam Head -->
        <rect x="55" y="60" width="90" height="45" rx="22" fill="#1e293b"/>
        <!-- Lens rim -->
        <circle cx="100" cy="82" r="24" fill="#334155" stroke="#475569" stroke-width="1"/>
        <circle cx="100" cy="82" r="18" fill="url(#lensGrad)"/>
        <circle cx="100" cy="82" r="10" fill="#020617"/>
        <!-- Reflection -->
        <ellipse cx="96" cy="78" rx="4" ry="2" fill="#60a5fa" transform="rotate(-30 96 78)"/>
        <!-- Blue status LED -->
        <circle cx="128" cy="82" r="3" fill="#3b82f6"/>
      </g>
    </svg>
  `,
  'ssd.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 8px 12px rgba(15,23,42,0.12))">
        <!-- M.2 Board -->
        <rect x="40" y="70" width="120" height="60" rx="4" fill="#065f46"/>
        <!-- Interface pins -->
        <rect x="36" y="85" width="4" height="30" fill="#d97706"/>
        <line x1="38" y1="85" x2="38" y2="115" stroke="#000000" stroke-width="1" stroke-dasharray="2 2"/>
        <!-- Controller chip -->
        <rect x="55" y="80" width="22" height="40" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="66" y="104" font-family="sans-serif" font-size="6" fill="#f8fafc" text-anchor="middle">ARM</text>
        <!-- NAND Flash Memory chips -->
        <rect x="85" y="80" width="24" height="40" rx="1" fill="#1e293b"/>
        <rect x="115" y="80" width="24" height="40" rx="1" fill="#1e293b"/>
        <!-- Mounting hole -->
        <circle cx="150" cy="100" r="4" fill="#f8fafc" stroke="#d97706" stroke-width="2"/>
      </g>
    </svg>
  `,
  'monitor.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="screenDisplay" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1b4b" />
          <stop offset="50%" stop-color="#311042" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
        <linearGradient id="vectorLandscape" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ec4899" stop-opacity="0.8"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 10px 16px rgba(15,23,42,0.15))">
        <!-- Stand Base -->
        <polygon points="75,170 125,170 115,140 85,140" fill="#475569"/>
        <rect x="94" y="125" width="12" height="25" fill="#64748b"/>
        <!-- Monitor Frame -->
        <rect x="20" y="40" width="160" height="95" rx="6" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <!-- Screen Glass -->
        <rect x="24" y="44" width="152" height="87" rx="3" fill="url(#screenDisplay)"/>
        <!-- Beautiful vector landscape art inside -->
        <path d="M24 110 L50 90 L85 120 L130 80 L176 131 V131 Z" fill="url(#vectorLandscape)"/>
        <circle cx="140" cy="65" r="10" fill="#fef08a" opacity="0.9"/>
      </g>
    </svg>
  `,
  'harddrive.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 8px 12px rgba(15,23,42,0.12))">
        <!-- Hard Drive shell -->
        <rect x="60" y="40" width="80" height="120" rx="10" fill="#1e293b"/>
        <rect x="65" y="45" width="70" height="110" rx="6" fill="#334155"/>
        <!-- Grooves/Grip lines -->
        <rect x="70" y="55" width="60" height="60" rx="4" fill="#1e293b" opacity="0.5"/>
        <line x1="75" y1="65" x2="125" y2="65" stroke="#475569" stroke-width="2"/>
        <line x1="75" y1="75" x2="125" y2="75" stroke="#475569" stroke-width="2"/>
        <line x1="75" y1="85" x2="125" y2="85" stroke="#475569" stroke-width="2"/>
        <line x1="75" y1="95" x2="125" y2="95" stroke="#475569" stroke-width="2"/>
        <!-- Power blue line indicator -->
        <rect x="75" y="130" width="50" height="3" rx="1.5" fill="#3b82f6"/>
        <circle cx="100" cy="142" r="3" fill="#60a5fa"/>
      </g>
    </svg>
  `,
  'earbuds.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="caseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 10px 15px rgba(37,99,235,0.18))">
        <!-- Open case -->
        <rect x="60" y="50" width="80" height="100" rx="25" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <!-- Open Lid background -->
        <path d="M60 75 C60 50, 140 50, 140 75 Z" fill="#334155"/>
        <!-- Inner docking slots -->
        <ellipse cx="82" cy="95" rx="14" ry="24" fill="#0f172a"/>
        <ellipse cx="118" cy="95" rx="14" ry="24" fill="#0f172a"/>
        <!-- Glowing LED status -->
        <circle cx="100" cy="132" r="3" fill="#10b981"/>
        <!-- Earbud Left -->
        <g transform="translate(0, 5)">
          <circle cx="82" cy="85" r="10" fill="url(#caseGrad)"/>
          <path d="M82 85 C82 95, 87 105, 87 110" stroke="url(#caseGrad)" stroke-width="6" stroke-linecap="round"/>
          <circle cx="82" cy="85" r="4" fill="#f8fafc"/>
        </g>
        <!-- Earbud Right -->
        <g transform="translate(0, 5)">
          <circle cx="118" cy="85" r="10" fill="url(#caseGrad)"/>
          <path d="M118 85 C118 95, 113 105, 113 110" stroke="url(#caseGrad)" stroke-width="6" stroke-linecap="round"/>
          <circle cx="118" cy="85" r="4" fill="#f8fafc"/>
        </g>
      </g>
    </svg>
  `,
  'chair.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" rx="24" fill="#f8fafc"/>
      <g filter="drop-shadow(0 8px 12px rgba(15,23,42,0.12))">
        <!-- Chair backing outline -->
        <path d="M70 45 C70 35, 130 35, 130 45 V105 C130 115, 70 115, 70 105 Z" fill="#1e293b"/>
        <!-- Lumbar mesh support -->
        <path d="M75 50 C75 42, 125 42, 125 50 V100 C125 108, 75 108, 75 100 Z" fill="#334155"/>
        <line x1="100" y1="42" x2="100" y2="108" stroke="#1e293b" stroke-width="4"/>
        <path d="M75 80 Q100 95 125 80" fill="none" stroke="#2563eb" stroke-width="3"/>
        <!-- Headrest -->
        <rect x="85" y="24" width="30" height="15" rx="5" fill="#1e293b"/>
        <rect x="97" y="37" width="6" height="10" fill="#475569"/>
        <!-- Armrests -->
        <path d="M58 85 H68 V105 H58 Z" fill="#475569"/>
        <path d="M132 85 H142 V105 H132 Z" fill="#475569"/>
        <path d="M68 95 Q60 95 60 110" stroke="#475569" stroke-width="4" fill="none"/>
        <path d="M132 95 Q140 95 140 110" stroke="#475569" stroke-width="4" fill="none"/>
        <!-- Seat Cushion -->
        <rect x="64" y="108" width="72" height="12" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <!-- Hydraulic Shaft -->
        <rect x="96" y="120" width="8" height="25" fill="#475569"/>
        <!-- Wheel Base Star -->
        <path d="M96 145 L70 160 M104 145 L130 160 M100 145 V165 M96 145 L65 142 M104 145 L135 142" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
        <!-- Caster wheels -->
        <circle cx="68" cy="162" r="5" fill="#475569"/>
        <circle cx="132" cy="162" r="5" fill="#475569"/>
        <circle cx="100" cy="168" r="5" fill="#475569"/>
      </g>
    </svg>
  `
};

async function main() {
  await fs.mkdir(imgDir, { recursive: true });
  for (const [filename, content] of Object.entries(svgs)) {
    const filePath = path.join(imgDir, filename);
    await fs.writeFile(filePath, content.trim(), 'utf8');
  }
  console.log('Successfully generated all 15 SVG product illustrations!');
}

main().catch(err => {
  console.error('Error generating SVGs:', err);
  process.exit(1);
});
