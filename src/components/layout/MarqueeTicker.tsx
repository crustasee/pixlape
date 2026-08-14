import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    '💻 CUSTOM WINDOWS APPS & MOD APK BUILDS',
    '🐈 INDEPENDENT DEVELOPER — SINCE 2013',
    '❤️ CRAFTED WITH LOVE, ZERO COMPROMISE',
    '✨ DIGITAL ASSET VAULT — FREE & PRO DOWNLOADS',
    '🛡️ ALL FILES VIRUSTOTAL VERIFIED & CLEAN',
    '🔥 NEO-BRUTALIST DESIGN · BOLD BY DEFAULT',
  ];

  return (
    <div className="ticker-wrap" role="marquee" aria-label="Announcements">
      <div className="ticker">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="ticker__item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
