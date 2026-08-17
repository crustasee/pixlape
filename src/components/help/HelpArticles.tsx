'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export interface HelpArticle {
  id: string;
  category: 'download' | 'license' | 'compatibility' | 'collaboration';
  categoryLabel: string;
  categoryIcon: string;
  badgeBg: string;
  badgeTextColor: string;
  title: string;
  subtitle: string;
  readTime: string;
  lastUpdated: string;
  summary: string;
  steps?: { step: string; title: string; desc: string }[];
  keyPoints?: string[];
  callout?: { type: 'tip' | 'important' | 'info'; title: string; text: string };
  faqs: { question: string; answer: string }[];
}

export const HELP_ARTICLES_DATA: HelpArticle[] = [
  {
    id: 'cara-download',
    category: 'download',
    categoryLabel: 'Panduan Download',
    categoryIcon: '▶',
    badgeBg: 'bg-green-300',
    badgeTextColor: 'text-black',
    title: 'Bagaimana Cara Download Asset & Material Digital',
    subtitle: 'Panduan langkah demi langkah mengunduh paket file (.ZIP, .CDR, .PSD, .SVG, CLI Tools) dari PIXLAPE Vault.',
    readTime: '3 min read',
    lastUpdated: '14 Agustus 2026',
    summary: 'Proses pengunduhan di PixlApe dirancang cepat, langsung tanpa paywall rumit, dan terverifikasi aman melalui protokol enkripsi otomatis.',
    steps: [
      {
        step: '01',
        title: 'Pilih & Jelajahi Katalog Asset',
        desc: 'Cari asset yang Anda butuhkan melalui fitur pencarian atau filter kategori (Icons, CorelDraw, Extensions, CLI, Font & Vectors).',
      },
      {
        step: '02',
        title: 'Buka Halaman Preview / Quick Modal',
        desc: 'Klik tombol "Quick View" atau judul asset untuk melihat rincian kelengkapan file, screenshot resolusi tinggi, versi ekstensi, dan tipe lisensi.',
      },
      {
        step: '03',
        title: 'Pilih Opsi Lisensi & Klik Download',
        desc: 'Pilih lisensi sesuai kebutuhan Anda (Free / Commercial Pro), kemudian klik tombol "Instant Download" untuk memulai unduhan archive file .ZIP.',
      },
      {
        step: '04',
        title: 'Ekstrak Archive & Verifikasi File',
        desc: 'Ekstrak file menggunakan WinRAR / 7-Zip / Finder. Pastikan memeriksa kelengkapan file README.md dan file utama projek.',
      },
    ],
    keyPoints: [
      'Tanpa batas kecepatan unduhan (Full High-Speed CDN Mirror)',
      'Semua paket file melewati pemeriksaan keamanan VirusTotal 100% Bebas Malware',
      'Tersedia unduhan langsung tanpa wajib mendaftar untuk asset bertipe Free Open Source',
    ],
    callout: {
      type: 'tip',
      title: '◯ Tips Pengunduhan Cepat',
      text: 'Jika unduhan Anda terhenti karena kendala koneksi internet, Anda dapat mengulang unduhan kapan saja melalui tautan direktori yang sama tanpa kehilangan token.',
    },
    faqs: [
      {
        question: 'Apakah saya perlu membuat akun untuk mendownload asset gratis?',
        answer: 'Tidak wajib. Asset berkategori Free License dapat diunduh secara langsung. Namun membuat akun memudahkan Anda menyimpan daftar favorit dan riwayat unduhan.',
      },
      {
        question: 'Bagaimana jika file .ZIP korup atau rusak saat diekstrak?',
        answer: 'Pastikan software pengekstrak Anda (WinRAR / 7-Zip) sudah versi terbaru. Jika masalah berlanjut, hapus cache browser dan lakukan unduh ulang file tersebut.',
      },
      {
        question: 'Di mana saya bisa melihat riwayat file yang telah saya download?',
        answer: 'Riwayat pengunduhan tersimpan otomatis di halaman Admin Dashboard / Account Settings pada tab "Download Vault History".',
      },
    ],
  },
  {
    id: 'kebijakan-lisensi',
    category: 'license',
    categoryLabel: 'Kebijakan Lisensi',
    categoryIcon: '▶',
    badgeBg: 'bg-green-300',
    badgeTextColor: 'text-black',
    title: 'Kebijakan Lisensi & Hak Penggunaan Asset',
    subtitle: 'Penjelasan lengkap mengenai batas penggunaan personal, komersial, lisensi MIT, serta aturan distribusi.',
    readTime: '4 min read',
    lastUpdated: '14 Agustus 2026',
    summary: 'Setiap asset di PixlApe dilindungi oleh ketetapan lisensi yang transparan untuk memastikan keamanan legalitas project Anda.',
    keyPoints: [
      'Personal & Commercial Project: Diizinkan untuk projek klien, desain produk digital, majalah, dan website komersial.',
      'Dilarang Memperjualbelikan Mentahan: Dilarang mengunggah ulang mentahan file (raw source code/vector) ke marketplace pesaing.',
      'Atribusi & Kredit: Atribusi kepada kreator PixlApe sangat diapresiasi namun tidak diwajibkan pada lisensi Pro Extended.',
    ],
    callout: {
      type: 'important',
      title: '⚠️ Batasan Penting Lisensi',
      text: 'Lisensi PixlApe memberi Anda hak pakai (Right-to-Use), bukan pengalihan hak cipta kepemilikan penuh. Anda dilarang mendaftarkan logo/asset PixlApe sebagai merek dagang (Trademark) eksklusif pribadi.',
    },
    faqs: [
      {
        question: 'Apakah saya boleh menggunakan asset ini untuk projek komersial klien?',
        answer: 'Ya, tentu! Semua lisensi bertanda Commercial & Pro diizinkan untuk digunakan pada projek klien tanpa biaya royalti tambahan (Royalty-Free).',
      },
      {
        question: 'Apakah saya boleh membagikan file mentahan kepada tim saya?',
        answer: 'Diizinkan dalam lingkup internal satu tim atau satu perusahaan. Pembagian secara publik ke forum terbuka dilarang keras.',
      },
      {
        question: 'Bagaimana jika lisensi projek menggunakan lisensi open-source MIT / Apache 2.0?',
        answer: 'Untuk source code CLI dan ekstensi berlisensi MIT, Anda bebas mengubah, menggabungkan, dan mendistribusikan ulang sesuai aturan lisensi MIT.',
      },
    ],
  },
  {
    id: 'kompatibilitas-platform',
    category: 'compatibility',
    categoryLabel: 'Kompatibilitas Platform',
    categoryIcon: '▶',
    badgeBg: 'bg-green-300',
    badgeTextColor: 'text-black',
    title: 'Kompatibilitas Ekstensi & Platform Software',
    subtitle: 'Panduan dukungan format file (.CDR, .PSD, .AI, .FIG, .SVG), ekstensi browser, CLI, dan Sistem Operasi.',
    readTime: '3 min read',
    lastUpdated: '14 Agustus 2026',
    summary: 'PixlApe memastikan setiap paket desain dan tool sistem kompatibel dengan standar software populer terkini.',
    steps: [
      {
        step: 'CDR',
        title: 'CorelDraw Suite',
        desc: 'Kompatibel mulai versi CorelDraw X7, 2019, 2021 hingga CorelDraw Graphics Suite 2026 (.CDR vector & color palette).',
      },
      {
        step: 'PSD/AI',
        title: 'Adobe Creative Cloud',
        desc: 'Dukungan layer terorganisir untuk Adobe Photoshop, Illustrator, dan InDesign versi CC 2020 ke atas.',
      },
      {
        step: 'FIG/SVG',
        title: 'Figma & Web Vector',
        desc: 'Format .SVG terpisah dan komponen .FIG siap pakai untuk UI/UX design di Figma dan Penpot.',
      },
      {
        step: 'CLI/EXT',
        title: 'Developer Shell & Extension',
        desc: 'Skrip CLI kompatibel dengan Node.js v18+, Terminal PowerShell/Bash, serta browser Chrome, Firefox & Edge.',
      },
    ],
    callout: {
      type: 'info',
      title: 'ℹ️ Dukungan Lintas Sistem Operasi',
      text: 'Semua asset grafik dan ekstensi web diuji berjalan lancar pada Windows 10/11, macOS Sonoma/Sequoia, serta varian Linux (Ubuntu/Debian).',
    },
    faqs: [
      {
        question: 'Bagaimana cara membuka file .CDR jika saya menggunakan versi CorelDraw lama (X4/X5)?',
        answer: 'Setiap paket CorelDraw di PixlApe menyertakan ekspor alternatif format .EPS dan .SVG yang dapat dibuka di semua versi CorelDraw tua.',
      },
      {
        question: 'Apakah alat CLI PixlApe membutuhkan akses Administrator / Root?',
        answer: 'Tidak. Alat CLI berjalan dalam ruang lingkup user lokal tanpa memerlukan elevasi hak akses Administrator.',
      },
    ],
  },
  {
    id: 'tata-cara-kerjasama',
    category: 'collaboration',
    categoryLabel: 'Kerja Sama & Project',
    categoryIcon: '▶',
    badgeBg: 'bg-green-300',
    badgeTextColor: 'text-black',
    title: 'Tata Cara Kerja Sama & Kolaborasi Project',
    subtitle: 'Prosedur pengajuan asset kreator, pembagian hasil (Revenue Share), sertifikasi developer, dan kemitraan studio.',
    readTime: '5 min read',
    lastUpdated: '14 Agustus 2026',
    summary: 'Kami membuka ruang kolaborasi seluas-luasnya bagi desainer, pengembang skrip, dan studio digital untuk berkembang bersama di PixlApe Vault.',
    steps: [
      {
        step: '01',
        title: 'Pengajuan Proposal / Portofolio',
        desc: 'Kirimkan tautan portofolio atau sampel asset berkualitas tinggi Anda melalui formulir pengajuan kreator atau email resmi kemitraan.',
      },
      {
        step: '02',
        title: 'Review Kurasi & Standar Keamanan',
        desc: 'Tim kurator PixlApe akan memeriksa standar visual, kelengkapan struktur file, dan keamanan skrip dalam waktu 1-3 hari kerja.',
      },
      {
        step: '03',
        title: 'Penerbitan Asset & Sistem Bagi Hasil',
        desc: 'Setelah disetujui, asset Anda akan ditayangkan di PixlApe Vault dengan skema bagi hasil transparan hingga 80% untuk kontributor.',
      },
      {
        step: '04',
        title: 'Dukungan Promosi & Komunitas',
        desc: 'Asset pilihan akan ditampilkan pada banner Marquee Ticker utama, fitur rekomendasi mingguan, dan buletin komunitas.',
      },
    ],
    keyPoints: [
      'Skema Pembagian Hasil Transparan (Revenue Share 80/20)',
      'Hak Cipta Tetap Milik Kreator / Pengembang',
      'Laporan Penjualan & Analytic Unduhan Real-Time melalui Creator Dashboard',
    ],
    callout: {
      type: 'tip',
      title: '▶ Siap Berkolaborasi Dengan PixlApe?',
      text: 'Hubungi tim kemitraan kami melalui email project@keratuli.site atau bergabung di channel #creator-collab pada Discord resmi PixlApe.',
    },
    faqs: [
      {
        question: 'Kriteria asset seperti apa yang diterima di PixlApe Vault?',
        answer: 'Asset dengan kualitas visual Neo-Brutalist yang estetis, terstruktur rapi, memiliki dokumentasi jelas, dan tidak melanggar hak cipta pihak ketiga.',
      },
      {
        question: 'Berapa lama proses pembayaran hasil komisi (Payout)?',
        answer: 'Penarikan komisi dapat dilakukan setiap bulan dengan batas minimum $20 (atau Rp 300.000) via transfer bank lokal, PayPal, atau e-wallet.',
      },
      {
        question: 'Apakah saya bisa membatalkan tayangan asset saya kapan saja?',
        answer: 'Bisa. Kreator memiliki kontrol penuh untuk menarik atau menonaktifkan asset dari katalog vault melalui portal manajemen.',
      },
    ],
  },
];

export const HelpArticles: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedArticleId, setExpandedArticleId] = useState<string>('cara-download');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'helpful' | 'unhelpful'>>({});

  const filteredArticles = useMemo(() => {
    return HELP_ARTICLES_DATA.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.faqs.some(
          (f) =>
            f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = [
    { key: 'all', label: `SEMUA PANDUAN (${HELP_ARTICLES_DATA.length})`, icon: '▣' },
    { key: 'download', label: 'CARA DOWNLOAD', icon: '▣' },
    { key: 'license', label: 'LISENSI & ATURAN', icon: '▣' },
    { key: 'compatibility', label: 'KOMPATIBILITAS', icon: '▣' },
    { key: 'collaboration', label: 'Project Kolaborasi', icon: '▣' },
  ];

  const handleCopyArticleLink = (id: string) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/help#${id}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleFeedback = (id: string, type: 'helpful' | 'unhelpful') => {
    setFeedbackState((prev) => ({ ...prev, [id]: type }));
  };

  return (
    <div className="w-full space-y-3 font-mono text-text">
      {/* ── ++++++++++++++++++++++++ HEADER BANNER ++++++++++++++++++++++++++++++++++++++── */}
      <div className="bg-yellow-green border border-border-color p-6 md:p-8 rounded-lg shadow-hard-sm space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-border-color/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-yellow-100 text-darkteal font-mono text-xs font-black uppercase rounded-lg border border-border-color shadow-[2px_2px_0_var(--border-color)]">
              HELP ARTICLES CENTER
            </span>
          </div>
          <span className="text-xs font-black text-yellow-green bg-evergreen px-3 py-1 rounded-md border border-border-color">
            TERVERIFIKASI & DIPERBARUI
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-head font-black uppercase text-darkteal tracking-tight">
            HELP CENTER & FAQ
          </h2>
        </div>

        {/* Filter Search Input */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata kunci (misal: download, lisensi komersial, CorelDraw, bagi hasil)..."
              className="w-full bg-yellow-100 border border-border-color rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono font-bold text-darkteal placeholder-darkteal focus:outline-none focus:border-yellow-green shadow-hard-sm"
            />
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2.5 bg-cayenne text-darkteal text-xs font-black uppercase border-2 border-border-color rounded-xl cursor-pointer hover:bg-red-600 transition-all shrink-0"
            >
              CLEAR SEARCH
            </button>
          )}
        </div>
      </div>

      {/* =============================================CATEGORY FILTER TABS ===============================================================================================================*/}
      <div className="flex flex-wrap items-center gap-5 bg-yellow-50 border border-border-color p-3 rounded-lg shadow-hard-sm">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2.5 rounded-lg border font-mono text-sm font-black uppercase transition-all cursor-pointer flex items-center gap-5 ${
                isActive
                  ? 'bg-yellow-green text-black border-border-color shadow-[2px_2px_0_var(--border-color)] scale-105'
                  : 'bg-white/10 text-darkteal border-border-color hover:bg-yellow-green hover:text-black'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── ARTICLES CONTENT LIST ── */}
      <div className="space-y-6">
        {filteredArticles.length === 0 ? (
          <div className="bg-darkteal border border-border-color p-8 rounded-lg shadow-hard-sm text-center space-y-3 font-mono">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-black text-yellow-green uppercase">Artikel Tidak Ditemukan</h3>
            <p className="text-xs text-darkteal max-w-md mx-auto">
              Tidak ada panduan yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;. Coba gunakan kata kunci lain atau bersihkan filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-yellow-green text-darkteal text-xs font-black uppercase border-2 border-border-color rounded-xl cursor-pointer hover:bg-neo-yellow"
            >
              RESET FILTER
            </button>
          </div>
        ) : (
          filteredArticles.map((article) => {
            const isExpanded = expandedArticleId === article.id;
            return (
              <div
                key={article.id}
                id={article.id}
                className="bg-yellow-100 border border-border-color rounded-lg shadow-hard-sm overflow-hidden transition-all duration-200 mb-3"
              >
                {/*========================================== ARTICLE ITEM HEADER=====================================================================================================================*/}
                <div
                  onClick={() => setExpandedArticleId(isExpanded ? '' : article.id)}
                  className="p-5 md:p-6 bg-yellow-200 border-b-2 border-border-color cursor-pointer select-none hover:bg-yellow-green/10 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="flex items-start md:items-center gap-4 flex-1 min-w-0">
                    <span className="w-15 h-15 rounded-lg bg-white text-darkteal border-1 border-border-color flex items-center justify-center text-2xl shrink-0">
                      {article.categoryIcon}
                    </span>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-sm font-black uppercase px-2.5 py-0.5 border border-border-color rounded-md shadow-[1px_1px_0_var(--border-color)] ${article.badgeBg} ${article.badgeTextColor}`}
                        >
                          {article.categoryLabel}
                        </span>
                        <span className="text-sm font-bold text-evergreen">
                          ⏱️ {article.readTime}
                        </span>
                        <span className="text-sm font-bold text-evergreen ml-auto md:ml-0">
                          📅 {article.lastUpdated}
                        </span>
                      </div>
                      <h3 className="font-head font-black text-xl md:text-3xl uppercase text-evergreen tracking-tight truncate">
                        {article.title}
                      </h3>
                      <p className="text-sm font-mono font-bold text-black line-clamp-1">
                        {article.subtitle}
                      </p>
                    </div>
                  </div>

                  {/*======================================= Toggle Chevron & Share Button ===========================================*/}
                  <div
                    className="flex items-center gap-2 shrink-0 self-end md:self-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedArticleId(isExpanded ? '' : article.id)}
                      className={`w-12 h-12 rounded-lg bg-yellow-green border-2 border-border-color flex items-center justify-center font-black text-black hover:bg-yellow-green transition-all ${
                        isExpanded ? 'rotate-90 bg-cayenne' : ''
                      }`}
                    >
                      ▼
                    </button>
                  </div>
                </div>

                {/* ── ==================================ARTICLE EXPANDED BODY DETAILS================================================= ── */}
                {isExpanded && (
                  <div className="p-6 md:p-8 space-y-6 bg-white/60 font-mono text-evergreen animate-fadeIn">
                    {/* Overview Summary */}
                    <div className="p-4 bg-white border-1 border-border-color rounded-lg space-y-2">
                      <span className="font-head text-sm font-black uppercase text-cayenne block tracking-wider">
                        ◯ RINGKASAN UTAMA
                      </span>
                      <p className="font-mono text-lg font-body font-medium text-evergreen leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    {/*========================================= Step-by-Step Tutorial Guide (if exists) =================================*/}
                    {article.steps && article.steps.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-head font-black text-lg uppercase text-black flex items-center gap-2 border-b-2 border-border-color/20 pb-2">
                          <span>▶</span> STEP-BY-STEP GUIDE
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {article.steps.map((st) => (
                            <div
                              key={st.step}
                              className="p-4 bg-white border-1 border-border-color rounded-lg space-y-2 flex flex-col justify-between"
                            >
                              <div className="space-y-1">
                                <span className="px-2.5 py-0.5 bg-white text-cayenne text-xs font-black rounded border border-border-color inline-block">
                                  Step {st.step}
                                </span>
                                <h5 className="font-head font-black text-md uppercase text-black pt-1">
                                  {st.title}
                                </h5>
                                <p className="font-mono text-sm font-body font-medium text-black leading-relaxed">
                                  {st.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/*========================================== Key Takeaways & Rules Bullet Points (if exists) =======================*/}
                    {article.keyPoints && article.keyPoints.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-head font-black text-lg uppercase text-evergreen flex items-center gap-2 border-b-2 border-border-color/20 pb-2">
                          <span>▶</span> Poin Ketentuan & Ketetapan Penting
                        </h4>
                        <ul className="font-mono space-y-2 text-sm font-bold text-black list-disc pl-5">
                          {article.keyPoints.map((pt, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* =====================================Callout Notice Box (if exists)=========================== */}
                    {article.callout && (
                      <div
                        className={`p-4 rounded-lg border-1 border-border-color shadow-hard-sm space-y-1.5 ${
                          article.callout.type === 'important'
                            ? 'bg-red-100 text-black border-red-500'
                            : article.callout.type === 'tip'
                            ? 'bg-yellow-green/30 text-black'
                            : 'bg-darkteal text-white'
                        }`}
                      >
                        <div className="font-head font-black text-lg uppercase flex items-center gap-2">
                          {article.callout.title}
                        </div>
                        <p className="font-mono text-md text-black leading-relaxed">
                          {article.callout.text}
                        </p>
                      </div>
                    )}


                    {/* ===============================Feedback Helpful Section==================================== */}
                    <div className="pt-4 border-t-2 border-border-color/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                      <span className="font-bold text-evergreen/80">
                        Apakah artikel ini membantu Anda ?
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleFeedback(article.id, 'helpful')}
                          className={`px-3 py-1.5 rounded-lg border-1 font-black uppercase transition-all cursor-pointer ${
                            feedbackState[article.id] === 'helpful'
                              ? 'bg-yellow-green text-black border-border-color shadow-hard-sm'
                              : 'bg-white text-black border-border-color hover:bg-yellow-green'
                          }`}
                        >
                          Helpful
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFeedback(article.id, 'unhelpful')}
                          className={`px-3 py-1.5 rounded-lg border-1 font-black uppercase transition-all cursor-pointer ${
                            feedbackState[article.id] === 'unhelpful'
                              ? 'bg-cayenne text-white border-border-color shadow-hard-sm'
                              : 'bg-white text-black border-border-color hover:bg-cayenne hover:text-white'
                          }`}
                        >
                          Unhelpful
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── -----------------------FOOTER CALLOUT BOX------------------------------------------- ── */}
      <div className="bg-yellow-green text-black border border-border-color p-6 md:p-8 rounded-lg shadow-hard-sm flex flex-col md:flex-row items-center justify-between gap-6 font-mono">
        <div className="space-y-1 text-center md:text-left">
          <span className="px-3 py-1 bg-black text-yellow-green text-xs font-black uppercase rounded-md border border-border-color">
            Custom & Commission Project 
          </span>
          <h3 className="text-xl md:text-2xl font-head font-black uppercase tracking-tight mt-1">
            START A PROJECT COLLABORATION ?
          </h3>
          <p className="text-sm font-bold text-black/80 max-w-xl">
           dengan pengalaman lebih dari 5th Desain grafis, illustrasi dan Frontend development, silahkan hubungi kami untuk project Collaboration.
          </p>
        </div>
        <Link
          href="/about"
          className="px-6 py-3 bg-green-400 text-white text-sm font-mono font-black uppercase border-2 border-border-color rounded-xl shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shrink-0"
        >
          Start Inquiry →
        </Link>
      </div>
    </div>
  );
};

export default HelpArticles;
