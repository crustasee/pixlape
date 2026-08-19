import { AssetItem, CategoryType } from '@/types';

export const ASSET_DATABASE: Record<CategoryType, AssetItem[]> = {
  design_app: [
    { id: 4, name: "High-Res Device Mockups", desc: "Brutalist device frames and clay mockups for mobile & desktop apps.", size: "89.3 MB", os: ["windows", "macos"], rating: "4.7", downloads: "8.4k", tag: "PRO", icon: "/icon/stock/designs.svg", license: "Free for Commercial", version: "v1.8" },
    { id: 7, name: "Design System Templates", desc: "Complete documentation & design token layout template for web teams.", size: "31.0 MB", os: ["windows", "linux", "macos"], rating: "4.9", downloads: "7.1k", tag: "NEW", icon: "/icon/stock/design3.svg", license: "MIT License", version: "v1.2" },
    { id: 9, name: "CorelDraw 2026", desc: "CorelDraw 2026 is a vector graphics editor software developed by Corel.", size: "764 MB", os: ["all"], rating: "4.6", downloads: "19.0k", tag: "PRO", icon: "/uploads/Pixelmator Pro.ico", license: "Full Version", version: "v27.0.0.121", isPremium: true, price: "$29", bannerImage: "/uploads/corelBanner1.jpg", markdownFile: "/DescriptionData/CorelDraw2026.md", detailsMarkdown: "### 🎨 CorelDRAW Graphics Suite 2026 Overview\n\n**CorelDRAW Graphics Suite 2026** membawa pembaruan besar yang berfokus pada integrasi **Artificial Intelligence (AI)** generatif ke dalam alur kerja desain profesional, peningkatan performa yang signifikan, serta penyegaran antarmuka pengguna. Versi ini dirancang agar kreator dapat bekerja lebih cepat tanpa kehilangan kontrol penuh atas detail dan penyelesaian akhir karya mereka.\n\n#### 🚀 Fitur Utama & Pembaruan\n\n### 1. Fitur Artist Intelligence (Kecerdasan Buatan)\n- **AI Generate**: Docking panel baru yang memungkinkan pembuatan gambar berdasarkan perintah teks (*text-to-image*) langsung di dalam aplikasi CorelDRAW dan Corel PHOTO-PAINT. Anda dapat memilih model AI, rasio gambar, hingga menentukan palet warna dan gaya desain. *(Penggunaan fitur ini menggunakan sistem kredit AI).*\n- **Remix Image**: Memungkinkan Anda untuk memodifikasi aset gambar yang sudah ada menggunakan prompt teks tanpa mengubah gambar tersebut secara keseluruhan. Fitur ini berguna untuk mengubah suasana gambar, memoles sketsa kasar menjadi karya line-art yang bersih, atau mengadaptasi aset kampanye ke berbagai identitas merek.\n- **AI Background Removal**: Alat pemotong latar belakang ini dapat dioperasikan hanya dengan satu klik. AI akan mendeteksi subjek dan membuang latar belakang secara otomatis, serta diklaim sangat rapi dalam menangani detail rumit seperti helaian rambut, kain, maupun area transparan.\n- **Mask from Subject (Corel PHOTO-PAINT)**: Fitur seleksi cerdas yang dapat mengisolasi subjek utama dalam sebuah gambar secara otomatis untuk mempercepat proses pembuatan area masking.\n\n### 2. Peningkatan Performa dan Antarmuka Pengguna\n- **Kecepatan & Stabilitas**: Waktu yang dibutuhkan untuk membuka aplikasi (*app launch times*) diklaim mengalami peningkatan hingga 3x lebih cepat. Versi 2026 juga menghadirkan perbaikan pada kelancaran pengelolaan font, pengaturan halaman multi-format, serta stabilitas perangkat lunak secara keseluruhan.\n- **Modern UI**: Antarmuka pengguna (*user interface*) disegarkan agar terlihat lebih modern, memiliki navigasi yang lebih intuitif, ikon yang diperhalus, dan konsistensi visual yang lebih baik antara platform desktop dan web.\n\n### 3. Konten dan Keuntungan Eksklusif (Berlangganan)\n- Pengguna dengan lisensi berlangganan (*subscriber*) atau lisensi dengan status maintenance aktif mendapatkan akses ke lebih dari **200 templat proyek berbasis cloud baru**.\n- Terdapat penambahan **50 kuas (brush) berbasis piksel baru** yang eksklusif.\n- Pelanggan akan menerima **alokasi kredit AI bulanan** secara rutin untuk memastikan alur kerja generative AI tidak terhambat.\n\n### 4. Pembaruan CorelDRAW Web\n- Versi aplikasi browser mendapatkan desain ulang pada layar beranda, penanganan berkas yang ditingkatkan, serta pengalaman pembelajaran awal yang lebih terstruktur bagi pengguna baru.\n\n> ⚡ *Secara keseluruhan, fitur-fitur baru di CorelDRAW 2026 difokuskan pada otomatisasi tugas teknis yang berulang (seperti masking dan seleksi objek) serta mempermudah tahap eksplorasi awal, sehingga proses produksi hingga ekspor materi akhir menjadi jauh lebih efisien.*", requirements: { "Sistem Operasi": "Windows 11 atau Windows 10 64-bit", "Prosesor": "Intel Core i3/5/7/9 atau AMD Ryzen", "Memori (RAM)": "8 GB hingga 16 GB Recommended", "Ruang Hard Disk": "10 GB ruang kosong tersedia", "Kartu Grafis": "VRAM 3 GB mendukung OpenCL 1.2", "Resolusi Layar": "1920 x 1080 Full HD" } },

    { id: 38, name: "Notion Life & Work System", desc: "All-in-one Notion workspace template for task tracking & notes.", size: "2.1 MB", os: ["all"], rating: "4.9", downloads: "21.3k", tag: "TEMPLATE", icon: "/icon/stock/evernote.svg", license: "Free Template", version: "v5.0" },
    { id: 40, name: "Interactive Form Builders", desc: "HTML/CSS custom form layouts with validation feedback.", size: "9.0 MB", os: ["all"], rating: "4.7", downloads: "10.2k", tag: "NEW", icon: "/icon/stock/box1.svg", license: "MIT License", version: "v1.1" },
    { id: 41, name: "Adobe XD v.59.0.1", desc: "Adobe XD 2026 combines the power of Adobe Illustrator with XD’s powerful prototyping and sharing capabilities.", size: "3.0 MB", os: ["all"], rating: "4.9", downloads: "16.4k", tag: "DEV", icon: "/icon/doc.svg", license: "MIT License", version: "v2.0" }
  ],
  multimedia: [
    { id: 10, name: "8-Bit Sound Effects Library", desc: "500+ retro arcade jump, coin, laser, and explosion sound FX.", size: "34.0 MB", os: ["all"], rating: "4.9", downloads: "18.2k", tag: "POPULAR", icon: "/icon/stock/record.svg", license: "CC0 1.0 Universal", version: "v2.5" },
    { id: 11, name: "Lo-Fi Synthwave Music Loops", desc: "Royalty-free chill synthwave stems and background tracks.", size: "210 MB", os: ["all"], rating: "5.0", downloads: "25.4k", tag: "HOT", icon: "/icon/stock/spotify.svg", license: "Royalty Free Audio", version: "v1.0" },
    { id: 12, name: "Glitch Video Transitions", desc: "Dynamic drag-and-drop video transition overlays for Premiere & DaVinci.", size: "145 MB", os: ["windows", "macos"], rating: "4.7", downloads: "12.0k", tag: "PRO", icon: "/icon/stock/media_encoder.svg", license: "Personal & Commercial", version: "v3.1" },
    { id: 13, name: "Stock Motion Graphics", desc: "Looping brutalist background animations and particle effects.", size: "320 MB", os: ["windows", "macos"], rating: "4.8", downloads: "9.3k", tag: "HD", icon: "/icon/stock/youtube.svg", license: "CC BY 4.0", version: "v2.0" },
    { id: 14, name: "Cinematic LUTs Presets", desc: "50 color grading presets for dramatic mood & neo lighting.", size: "15.4 MB", os: ["all"], rating: "4.6", downloads: "14.1k", tag: "FREE", icon: "/icon/stock/multimedia.svg", license: "Free License", version: "v1.5" },
    { id: 15, name: "Podcast Audio Master Kit", desc: "Equalizer and compression presets for pristine voice recording.", size: "8.9 MB", os: ["windows", "macos"], rating: "4.9", downloads: "6.8k", tag: "NEW", icon: "/icon/stock/recorder.svg", license: "MIT License", version: "v1.1" },
    { id: 16, name: "VFX Retro Overlay Bundle", desc: "CRT screen lines, VHS glitch, and tape flicker video effects.", size: "180 MB", os: ["all"], rating: "4.8", downloads: "11.2k", tag: "POPULAR", icon: "/icon/stock/app3.svg", license: "Royalty Free", version: "v2.2" },
    { id: 17, name: "Foley Ambient Sound Pack", desc: "Real-world environmental noise loops for games & videos.", size: "95.0 MB", os: ["all"], rating: "4.7", downloads: "8.0k", tag: "FREE", icon: "/icon/multimedia.svg", license: "CC0 1.0 Universal", version: "v1.0" }
  ],
  apk_package: [
    { id: 18, name: "Brutalist Tab Launcher", desc: "Fast custom startpage browser extension with bookmark shortcuts.", size: "1.4 MB", os: ["all"], rating: "4.9", downloads: "31.2k", tag: "MUST HAVE", icon: "/icon/stock/browser.svg", license: "GPL v3", version: "v5.2" },
    { id: 19, name: "Dark Mode Force Utility", desc: "Smart high-contrast dark theme generator for any web page.", size: "0.8 MB", os: ["all"], rating: "4.8", downloads: "45.0k", tag: "POPULAR", icon: "/icon/stock/android.svg", license: "MIT License", version: "v3.0" },
    { id: 20, name: "Ad & Tracker Shield List", desc: "Custom uBlock Origin blocklists for cleaner, faster web browsing.", size: "0.2 MB", os: ["all"], rating: "5.0", downloads: "52.9k", tag: "SECURITY", icon: "/icon/stock/sield.svg", license: "AGPL v3", version: "v8.1" },
    { id: 21, name: "Developer DOM Inspector", desc: "Quick element grid overlay and pixel measure tool for Chrome & Firefox.", size: "2.1 MB", os: ["all"], rating: "4.7", downloads: "14.6k", tag: "DEV", icon: "/icon/devtools.svg", license: "MIT License", version: "v1.4" },
    { id: 22, name: "Userscript Automation Pack", desc: "Collection of 20+ Tampermonkey scripts to supercharge popular sites.", size: "0.5 MB", os: ["all"], rating: "4.8", downloads: "18.3k", tag: "FREE", icon: "/icon/stock/robotic.svg", license: "CC0 1.0 Universal", version: "v2.9" },
    { id: 23, name: "Web Speed Benchmarker", desc: "One-click page performance diagnostic and resource tracer.", size: "1.1 MB", os: ["all"], rating: "4.6", downloads: "9.2k", tag: "UTILITY", icon: "/icon/stock/cleaner.svg", license: "Apache 2.0", version: "v1.0" },
    { id: 24, name: "CSS Live Injector Tool", desc: "Persist custom styling tweak per website with live sync.", size: "1.7 MB", os: ["all"], rating: "4.9", downloads: "12.4k", tag: "NEW", icon: "/icon/stock/cplus.svg", license: "MIT License", version: "v2.0" },
    { id: 25, name: "Privacy Cookie Cleaner", desc: "Auto-clear tracking cookies and session storage on tab close.", size: "0.6 MB", os: ["all"], rating: "4.9", downloads: "27.1k", tag: "PRIVACY", icon: "/icon/stock/key.svg", license: "GPL v3", version: "v4.1" }
  ],
  tools_app: [
    { id: 26, name: "Fast Image Batch Converter", desc: "CLI & GUI tool to compress & convert PNG/JPG to WebP/AVIF instantly.", size: "14.8 MB", os: ["windows", "linux", "macos", "cli"], rating: "5.0", downloads: "38.4k", tag: "POPULAR", icon: "/icon/stock/gimp.svg", license: "MIT License", version: "v6.0" },
    { id: 27, name: "Dev Environment Setup Script", desc: "Automated bash & powershell script to bootstrap dev work environment.", size: "1.2 MB", os: ["windows", "linux", "macos", "cli"], rating: "4.9", downloads: "19.7k", tag: "CLI", icon: "/icon/stock/agent_cli.svg", license: "MIT License", version: "v3.3" },
    { id: 28, name: "System Cleanup & Junk Sweeper", desc: "Lightweight tool to clear temp cache, node_modules, and log files.", size: "6.4 MB", os: ["windows", "linux"], rating: "4.8", downloads: "29.1k", tag: "UTILITY", icon: "/icon/stock/cleaner.svg", license: "GPL v3", version: "v2.4" },
    { id: 29, name: "Git Repo Sync Manager", desc: "Bulk git repository status visualizer & branch pull orchestrator.", size: "18.2 MB", os: ["windows", "linux", "macos", "cli"], rating: "4.9", downloads: "11.0k", tag: "DEV", icon: "/icon/stock/visualstudio.svg", license: "Apache 2.0", version: "v1.7" },
    { id: 30, name: "Network Bandwidth Monitor", desc: "Minimalist desktop taskbar app for real-time upload/download speeds.", size: "5.1 MB", os: ["windows", "linux"], rating: "4.7", downloads: "15.3k", tag: "FREE", icon: "/icon/stock/notification.svg", license: "MIT License", version: "v2.0" },
    { id: 31, name: "JSON & Markdown Formatter", desc: "Offline lightning fast formatter with schema validator.", size: "8.3 MB", os: ["all", "cli"], rating: "4.9", downloads: "24.0k", tag: "OFFLINE", icon: "/icon/stock/type.svg", license: "MIT License", version: "v4.0" },
    { id: 32, name: "Local File Encryption Vault", desc: "AES-256 file encryption utility with master password protection.", size: "11.5 MB", os: ["windows", "linux", "macos", "cli"], rating: "5.0", downloads: "17.8k", tag: "SECURE", icon: "/icon/stock/key.svg", license: "BSD 3-Clause", version: "v3.1" },
    { id: 37, name: "PDF Splitter & Compressor", desc: "Offline tool to merge, shrink, and reorder PDF pages safely.", size: "16.2 MB", os: ["windows", "macos", "linux"], rating: "4.7", downloads: "28.9k", tag: "UTILITY", icon: "/icon/stock/adobe_reader.svg", license: "MIT License", version: "v2.3" }
  ],
  art_graphics: [
    { id: 1, name: "Neo-Brutalism Icon Pack", desc: "1,200+ vector stroke icons with thick black outlines and vibrant accents.", size: "24.5 MB", os: ["windows", "macos", "linux"], rating: "4.9", downloads: "14.2k", tag: "POPULAR", icon: "/icon/artgraphic.svg", license: "CC0 1.0 Universal", version: "v3.4" },
    { id: 2, name: "Beatone Brush Procreate", desc: "Beat Tones Halftone Brushes For Procreate makes it easy to build gradient halftone shading.", size: "48.1 MB", os: ["windows", "macos"], rating: "4.8", downloads: "9.8k", tag: "NEW", icon: "/icon/stock/paint.svg", license: "MIT License", version: "v2.1" },
    { id: 3, name: "Pixel Retro Fonts Vault", desc: "Collection of 45 true pixel & monospaced retro fonts for dev & design.", size: "12.0 MB", os: ["all"], rating: "5.0", downloads: "22.1k", tag: "FEATURED", icon: "/icon/stock/type.svg", license: "OFL (Open Font License)", version: "v4.0" },
    { id: 5, name: "Vibrant Color Swatch Kits", desc: "400+ curated HSL & HEX color palettes optimized for dark/light themes.", size: "3.2 MB", os: ["all"], rating: "4.9", downloads: "11.5k", tag: "FREE", icon: "/icon/stock/design3.svg", license: "MIT License", version: "v5.0" },
    { id: 6, name: "Vector Sticker Elements", desc: "Fun brutalist badge stickers, labels, arrows, and geometric shapes.", size: "18.7 MB", os: ["all"], rating: "4.8", downloads: "16.3k", tag: "TRENDING", icon: "/icon/stock/adobe_illustrator.svg", license: "CC0 1.0 Universal", version: "v2.0" },
    { id: 8, name: "Paper Texture Overlay Pack", desc: "Authentic grain, crumpled paper, and vintage grid background textures.", size: "112 MB", os: ["all"], rating: "4.6", downloads: "19.0k", tag: "POPULAR", icon: "/icon/stock/blender.svg", license: "Free Royalty Free", version: "v3.0" },
    { id: 33, name: "Color Picker & Eyedropper", desc: "Global screen color sampling tool with palette memory.", size: "4.0 MB", os: ["windows", "macos"], rating: "4.8", downloads: "21.6k", tag: "DESIGN", icon: "/icon/stock/paint.svg", license: "MIT License", version: "v2.2" },
    { id: 34, name: "Neo-Brutalist Resume Templates", desc: "Stand-out ATS friendly resume templates in HTML, PDF, and Word format.", size: "12.4 MB", os: ["all"], rating: "4.9", downloads: "42.0k", tag: "HOT", icon: "/icon/doc.svg", license: "Free for Personal & Commercial", version: "v3.0" },
    { id: 35, name: "Project Proposal & Pitch Deck", desc: "Bold pitch presentation deck slides designed to land client work.", size: "35.8 MB", os: ["all"], rating: "4.8", downloads: "18.5k", tag: "PRO", icon: "/icon/stock/appstore.svg", license: "Commercial License", version: "v2.0" },
    { id: 36, name: "Freelance Contract & Invoice Suite", desc: "Legally vetted contract templates, invoice generators, and scope sheets.", size: "5.6 MB", os: ["all"], rating: "5.0", downloads: "33.1k", tag: "LEGAL", icon: "/icon/finance.svg", license: "Open Legal Template", version: "v4.5" },
    { id: 39, name: "Spreadsheet Budget Tracker", desc: "Clean Excel & Google Sheet financial tracker with auto charts.", size: "4.5 MB", os: ["all"], rating: "4.8", downloads: "14.7k", tag: "FREE", icon: "/icon/money.svg", license: "Free CC0", version: "v2.0" }
  ]
};

export function getAssetById(id: number | string): AssetItem {
  const targetId = typeof id === 'string' ? parseInt(id, 10) : id;
  const categories = Object.keys(ASSET_DATABASE) as CategoryType[];
  for (const cat of categories) {
    const item = ASSET_DATABASE[cat].find((i) => i.id === targetId);
    if (item) return { ...item, category: cat };
  }
  return { ...ASSET_DATABASE.design_app[0], category: 'design_app' };
}

export function getAssetsByCategory(category: CategoryType): AssetItem[] {
  return ASSET_DATABASE[category] || ASSET_DATABASE.design_app;
}

export function getAllAssets(): AssetItem[] {
  const all: AssetItem[] = [];
  (Object.keys(ASSET_DATABASE) as CategoryType[]).forEach((cat) => {
    ASSET_DATABASE[cat].forEach((item) => {
      all.push({ ...item, category: cat });
    });
  });
  return all;
}

export const ASSETS_DATA: AssetItem[] = getAllAssets();


export function isImageIcon(icon: string): boolean {
  if (!icon || typeof icon !== 'string') return false;
  const str = icon.trim().replace(/\\/g, '/');
  if (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:image/')) return true;
  if (/\.(png|jpe?g|gif|webp|svg|ico|bmp)(\?.*)?$/i.test(str)) return true;
  if (str.includes('/') || str.startsWith('public')) return true;
  return false;
}

export function getIconSrc(icon: string): string {
  if (!icon) return '';
  let src = icon.trim().replace(/\\/g, '/');
  if (src.startsWith('/public/')) {
    src = src.substring(7);
  } else if (src.startsWith('public/')) {
    src = src.substring(6);
  }
  if (!src.startsWith('/') && !src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
    src = '/' + src;
  }
  return src;
}
