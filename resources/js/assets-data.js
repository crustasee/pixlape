/**
 * PIXLAPE.COM — Centralized Asset Database
 */

const ASSET_DATABASE = {
  design: [
    { id: 1, name: "Neo-Brutalism Icon Pack", desc: "1,200+ vector stroke icons with thick black outlines and vibrant accents.", size: "24.5 MB", os: ["windows", "macos", "linux"], rating: "4.9", downloads: "14.2k", tag: "POPULAR", icon: "🎨", license: "CC0 1.0 Universal", version: "v3.4" },
    { id: 2, name: "Beatone Brush Procreate", desc: "Beat Tones Halftone Brushes For Procreate makes it easy to build gradient halftone shading.", size: "48.1 MB", os: ["windows", "macos"], rating: "4.8", downloads: "9.8k", tag: "NEW", icon: "💎", license: "MIT License", version: "v2.1" },
    { id: 3, name: "Pixel Retro Fonts Vault", desc: "Collection of 45 true pixel & monospaced retro fonts for dev & design.", size: "12.0 MB", os: ["all"], rating: "5.0", downloads: "22.1k", tag: "FEATURED", icon: "🔤", license: "OFL (Open Font License)", version: "v4.0" },
    { id: 4, name: "High-Res Device Mockups", desc: "Brutalist device frames and clay mockups for mobile & desktop apps.", size: "89.3 MB", os: ["windows", "macos"], rating: "4.7", downloads: "8.4k", tag: "PRO", icon: "📱", license: "Free for Commercial", version: "v1.8" },
    { id: 5, name: "Vibrant Color Swatch Kits", desc: "400+ curated HSL & HEX color palettes optimized for dark/light themes.", size: "3.2 MB", os: ["all"], rating: "4.9", downloads: "11.5k", tag: "FREE", icon: "🌈", license: "MIT License", version: "v5.0" },
    { id: 6, name: "Vector Sticker Elements", desc: "Fun brutalist badge stickers, labels, arrows, and geometric shapes.", size: "18.7 MB", os: ["all"], rating: "4.8", downloads: "16.3k", tag: "TRENDING", icon: "🏷️", license: "CC0 1.0 Universal", version: "v2.0" },
    { id: 7, name: "Design System Templates", desc: "Complete documentation & design token layout template for web teams.", size: "31.0 MB", os: ["windows", "linux", "macos"], rating: "4.9", downloads: "7.1k", tag: "NEW", icon: "📐", license: "MIT License", version: "v1.2" },
    { id: 8, name: "Paper Texture Overlay Pack", desc: "Authentic grain, crumpled paper, and vintage grid background textures.", size: "112 MB", os: ["all"], rating: "4.6", downloads: "19.0k", tag: "POPULAR", icon: "📜", license: "Free Royalty Free", version: "v3.0" },
    { id: 9, name: "CorelDraw 2026", desc: "CorelDraw 2026 is a vector graphics editor software developed by Corel.", size: "764 MB", os: ["all"], rating: "4.6", downloads: "19.0k", tag: "POPULAR", icon: "Assets/img/cdraw.png", license: "Full Version", version: "v27.0.0.121" }
  ],
  multimedia: [
    { id: 10, name: "8-Bit Sound Effects Library", desc: "500+ retro arcade jump, coin, laser, and explosion sound FX.", size: "34.0 MB", os: ["all"], rating: "4.9", downloads: "18.2k", tag: "POPULAR", icon: "🔊", license: "CC0 1.0 Universal", version: "v2.5" },
    { id: 11, name: "Lo-Fi Synthwave Music Loops", desc: "Royalty-free chill synthwave stems and background tracks.", size: "210 MB", os: ["all"], rating: "5.0", downloads: "25.4k", tag: "HOT", icon: "🎵", license: "Royalty Free Audio", version: "v1.0" },
    { id: 12, name: "Glitch Video Transitions", desc: "Dynamic drag-and-drop video transition overlays for Premiere & DaVinci.", size: "145 MB", os: ["windows", "macos"], rating: "4.7", downloads: "12.0k", tag: "PRO", icon: "🎬", license: "Personal & Commercial", version: "v3.1" },
    { id: 13, name: "Stock Motion Graphics", desc: "Looping brutalist background animations and particle effects.", size: "320 MB", os: ["windows", "macos"], rating: "4.8", downloads: "9.3k", tag: "HD", icon: "🎥", license: "CC BY 4.0", version: "v2.0" },
    { id: 14, name: "Cinematic LUTs Presets", desc: "50 color grading presets for dramatic mood & neo lighting.", size: "15.4 MB", os: ["all"], rating: "4.6", downloads: "14.1k", tag: "FREE", icon: "🎞️", license: "Free License", version: "v1.5" },
    { id: 15, name: "Podcast Audio Master Kit", desc: "Equalizer and compression presets for pristine voice recording.", size: "8.9 MB", os: ["windows", "macos"], rating: "4.9", downloads: "6.8k", tag: "NEW", icon: "🎙️", license: "MIT License", version: "v1.1" },
    { id: 16, name: "VFX Retro Overlay Bundle", desc: "CRT screen lines, VHS glitch, and tape flicker video effects.", size: "180 MB", os: ["all"], rating: "4.8", downloads: "11.2k", tag: "POPULAR", icon: "📺", license: "Royalty Free", version: "v2.2" },
    { id: 17, name: "Foley Ambient Sound Pack", desc: "Real-world environmental noise loops for games & videos.", size: "95.0 MB", os: ["all"], rating: "4.7", downloads: "8.0k", tag: "FREE", icon: "🍃", license: "CC0 1.0 Universal", version: "v1.0" }
  ],
  browser: [
    { id: 18, name: "Brutalist Tab Launcher", desc: "Fast custom startpage browser extension with bookmark shortcuts.", size: "1.4 MB", os: ["all"], rating: "4.9", downloads: "31.2k", tag: "MUST HAVE", icon: "🚀", license: "GPL v3", version: "v5.2" },
    { id: 19, name: "Dark Mode Force Utility", desc: "Smart high-contrast dark theme generator for any web page.", size: "0.8 MB", os: ["all"], rating: "4.8", downloads: "45.0k", tag: "POPULAR", icon: "🌙", license: "MIT License", version: "v3.0" },
    { id: 20, name: "Ad & Tracker Shield List", desc: "Custom uBlock Origin blocklists for cleaner, faster web browsing.", size: "0.2 MB", os: ["all"], rating: "5.0", downloads: "52.9k", tag: "SECURITY", icon: "🛡️", license: "AGPL v3", version: "v8.1" },
    { id: 21, name: "Developer DOM Inspector", desc: "Quick element grid overlay and pixel measure tool for Chrome & Firefox.", size: "2.1 MB", os: ["all"], rating: "4.7", downloads: "14.6k", tag: "DEV", icon: "🔍", license: "MIT License", version: "v1.4" },
    { id: 22, name: "Userscript Automation Pack", desc: "Collection of 20+ Tampermonkey scripts to supercharge popular sites.", size: "0.5 MB", os: ["all"], rating: "4.8", downloads: "18.3k", tag: "FREE", icon: "📜", license: "CC0 1.0 Universal", version: "v2.9" },
    { id: 23, name: "Web Speed Benchmarker", desc: "One-click page performance diagnostic and resource tracer.", size: "1.1 MB", os: ["all"], rating: "4.6", downloads: "9.2k", tag: "UTILITY", icon: "⚡", license: "Apache 2.0", version: "v1.0" },
    { id: 24, name: "CSS Live Injector Tool", desc: "Persist custom styling tweak per website with live sync.", size: "1.7 MB", os: ["all"], rating: "4.9", downloads: "12.4k", tag: "NEW", icon: "🎨", license: "MIT License", version: "v2.0" },
    { id: 25, name: "Privacy Cookie Cleaner", desc: "Auto-clear tracking cookies and session storage on tab close.", size: "0.6 MB", os: ["all"], rating: "4.9", downloads: "27.1k", tag: "PRIVACY", icon: "🔒", license: "GPL v3", version: "v4.1" }
  ],
  tools: [
    { id: 26, name: "Fast Image Batch Converter", desc: "CLI & GUI tool to compress & convert PNG/JPG to WebP/AVIF instantly.", size: "14.8 MB", os: ["windows", "linux", "macos", "cli"], rating: "5.0", downloads: "38.4k", tag: "POPULAR", icon: "⚡", license: "MIT License", version: "v6.0" },
    { id: 27, name: "Dev Environment Setup Script", desc: "Automated bash & powershell script to bootstrap dev work environment.", size: "1.2 MB", os: ["windows", "linux", "macos", "cli"], rating: "4.9", downloads: "19.7k", tag: "CLI", icon: "💻", license: "MIT License", version: "v3.3" },
    { id: 28, name: "System Cleanup & Junk Sweeper", desc: "Lightweight tool to clear temp cache, node_modules, and log files.", size: "6.4 MB", os: ["windows", "linux"], rating: "4.8", downloads: "29.1k", tag: "UTILITY", icon: "🧹", license: "GPL v3", version: "v2.4" },
    { id: 29, name: "Git Repo Sync Manager", desc: "Bulk git repository status visualizer & branch pull orchestrator.", size: "18.2 MB", os: ["windows", "linux", "macos", "cli"], rating: "4.9", downloads: "11.0k", tag: "DEV", icon: "🌿", license: "Apache 2.0", version: "v1.7" },
    { id: 30, name: "Network Bandwidth Monitor", desc: "Minimalist desktop taskbar app for real-time upload/download speeds.", size: "5.1 MB", os: ["windows", "linux"], rating: "4.7", downloads: "15.3k", tag: "FREE", icon: "📊", license: "MIT License", version: "v2.0" },
    { id: 31, name: "JSON & Markdown Formatter", desc: "Offline lightning fast formatter with schema validator.", size: "8.3 MB", os: ["all", "cli"], rating: "4.9", downloads: "24.0k", tag: "OFFLINE", icon: "📝", license: "MIT License", version: "v4.0" },
    { id: 32, name: "Local File Encryption Vault", desc: "AES-256 file encryption utility with master password protection.", size: "11.5 MB", os: ["windows", "linux", "macos", "cli"], rating: "5.0", downloads: "17.8k", tag: "SECURE", icon: "🔑", license: "BSD 3-Clause", version: "v3.1" },
    { id: 33, name: "Color Picker & Eyedropper", desc: "Global screen color sampling tool with palette memory.", size: "4.0 MB", os: ["windows", "macos"], rating: "4.8", downloads: "21.6k", tag: "DESIGN", icon: "💧", license: "MIT License", version: "v2.2" }
  ],
  document: [
    { id: 34, name: "Neo-Brutalist Resume Templates", desc: "Stand-out ATS friendly resume templates in HTML, PDF, and Word format.", size: "12.4 MB", os: ["all"], rating: "4.9", downloads: "42.0k", tag: "HOT", icon: "📄", license: "Free for Personal & Commercial", version: "v3.0" },
    { id: 35, name: "Project Proposal & Pitch Deck", desc: "Bold pitch presentation deck slides designed to land client work.", size: "35.8 MB", os: ["all"], rating: "4.8", downloads: "18.5k", tag: "PRO", icon: "📊", license: "Commercial License", version: "v2.0" },
    { id: 36, name: "Freelance Contract & Invoice Suite", desc: "Legally vetted contract templates, invoice generators, and scope sheets.", size: "5.6 MB", os: ["all"], rating: "5.0", downloads: "33.1k", tag: "LEGAL", icon: "⚖️", license: "Open Legal Template", version: "v4.5" },
    { id: 37, name: "PDF Splitter & Compressor", desc: "Offline tool to merge, shrink, and reorder PDF pages safely.", size: "16.2 MB", os: ["windows", "macos", "linux"], rating: "4.7", downloads: "28.9k", tag: "UTILITY", icon: "📑", license: "MIT License", version: "v2.3" },
    { id: 38, name: "Notion Life & Work System", desc: "All-in-one Notion workspace template for task tracking & notes.", size: "2.1 MB", os: ["all"], rating: "4.9", downloads: "21.3k", tag: "TEMPLATE", icon: "📓", license: "Free Template", version: "v5.0" },
    { id: 39, name: "Spreadsheet Budget Tracker", desc: "Clean Excel & Google Sheet financial tracker with auto charts.", size: "4.5 MB", os: ["all"], rating: "4.8", downloads: "14.7k", tag: "FREE", icon: "📈", license: "Free CC0", version: "v2.0" },
    { id: 40, name: "Interactive Form Builders", desc: "HTML/CSS custom form layouts with validation feedback.", size: "9.0 MB", os: ["all"], rating: "4.7", downloads: "10.2k", tag: "NEW", icon: "📋", license: "MIT License", version: "v1.1" },
    { id: 41, name: "Technical Spec Doc Kit", desc: "Markdown documentation templates for open source software projects.", size: "3.0 MB", os: ["all"], rating: "4.9", downloads: "16.4k", tag: "DEV", icon: "📚", license: "MIT License", version: "v2.0" }
  ]
};

// Helper lookup functions
function getAssetById(id) {
  const targetId = parseInt(id, 10);
  for (const cat of Object.keys(ASSET_DATABASE)) {
    const item = ASSET_DATABASE[cat].find(i => i.id === targetId);
    if (item) return { ...item, category: cat };
  }
  // Fallback default
  return { ...ASSET_DATABASE.design[0], category: 'design' };
}

function getAssetsByCategory(category) {
  return ASSET_DATABASE[category] || ASSET_DATABASE.design;
}

// Icon Helper Functions (Supports Emoji, Local PNG/Directory Path, and URLs)
function isImageIcon(icon) {
  if (!icon || typeof icon !== 'string') return false;
  const str = icon.trim();
  if (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:image/')) return true;
  if (/\.(png|jpe?g|gif|webp|svg|ico|bmp)(\?.*)?$/i.test(str)) return true;
  if (str.includes('/') || str.includes('\\')) return true;
  return false;
}

function getIconSrc(icon, isSubfolder = false) {
  if (!icon) return '';
  let src = icon.trim().replace(/\\/g, '/');
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src.startsWith('/')) {
    return src;
  }
  if (isSubfolder) {
    if (src.startsWith('./')) {
      src = '../' + src.slice(2);
    } else if (!src.startsWith('../')) {
      src = '../' + src;
    }
  } else {
    if (src.startsWith('./')) {
      src = src.slice(2);
    }
  }
  return src;
}

function renderIconHTML(icon, alt = '', extraClass = '', isSubfolder = false) {
  if (isImageIcon(icon)) {
    const src = getIconSrc(icon, isSubfolder);
    const safeAlt = alt ? alt.replace(/"/g, '&quot;') : 'icon';
    return `<img src="${src}" alt="${safeAlt}" class="asset-icon-img ${extraClass}" onerror="this.onerror=null; if(this.parentNode) this.parentNode.textContent='📦';" />`;
  }
  return icon || '🎨';
}

function getAssetPreviewUrl(item, isSubfolder = false) {
  if (!item) return isSubfolder ? 'preview.html' : 'page/preview.html';
  const isPremium = item.tag === 'PRO' || item.tag === 'HOT' || item.id === 9 || (item.license && (item.license.includes('Commercial') || item.license.includes('Full Version')));
  const pageName = isPremium ? 'premium_asset_preview.html' : 'preview.html';
  return isSubfolder ? `${pageName}?id=${item.id}` : `page/${pageName}?id=${item.id}`;
}


