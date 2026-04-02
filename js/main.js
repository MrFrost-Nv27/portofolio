/* ============================================================
   PORTFOLIO — main.js
   ============================================================ */
/* ============================================================
   PORTFOLIO — main.js  (Tailwind + i18n + Light/Dark Theme)
   ============================================================ */

/* ── TRANSLATIONS ──────────────────────────────────────────── */
const TRANSLATIONS = {
  id: {
    'nav.about':    'Tentang',
    'nav.skills':   'Keahlian',
    'nav.projects': 'Proyek',
    'nav.contact':  'Kontak',
    'hero.greeting':    '👋 Halo, saya',
    'hero.role.prefix': 'Saya seorang',
    'hero.desc': 'Passionate developer yang suka membangun pengalaman digital yang indah, fungsional, dan bermakna. Siap berkolaborasi untuk mewujudkan ide-ide kreatif menjadi kenyataan.',
    'hero.cta.projects': 'Lihat Proyek',
    'hero.cta.contact':  'Hubungi Saya',
    'hero.scroll': 'Scroll',
    'about.tag':      'Tentang Saya',
    'about.title':    'Mengenal Saya',
    'about.title.hl': 'Lebih Dalam',
    'about.badge':    'Full Stack Developer',
    'about.h3':       'Siapa Saya?',
    'about.p1': 'Halo! Saya Nova Adi Saputra, bisa dipanggil <strong>Nova</strong>. Saya adalah <strong>Full Stack Developer</strong> dan freelancer sejak tahun 2020 hingga sekarang. Saya mengerjakan berbagai proyek kecil, menengah, hingga institusi dengan pendekatan teknis yang terukur dan berorientasi hasil.',
    'about.p2': 'Saya fokus membangun solusi end-to-end dari frontend hingga backend, API, database, deployment, dan maintenance. Saya percaya solusi yang baik harus scalable, aman, dan memberi dampak nyata bagi pengguna.',
    'about.stat.years':    'Tahun<br/>Pengalaman',
    'about.stat.projects': 'Proyek<br/>Selesai',
    'about.stat.clients':  'Bahasa<br/>Pemrograman',
    'about.cv': 'Download CV',
    'skills.tag':      'Keahlian',
    'skills.title':    'Teknologi yang',
    'skills.title.hl': 'Saya Kuasai',
    'skills.frontend': 'Frontend',
    'skills.backend':  'Backend',
    'skills.ai':       'Artificial Intelligence',
    'skills.tools':    'Database & Tools',
    'projects.tag':      'Portofolio',
    'projects.title':    'Proyek',
    'projects.title.hl': 'Unggulan',
    'projects.note': 'Klik kartu proyek untuk melihat detail, screenshot (jika tersedia), serta tautan live dan repository.',
    'filter.all':    'Semua',
    'filter.web':    'Web App',
    'filter.mobile': 'Mobile',
    'filter.ai':     'AI',
    'contact.tag':      'Kontak',
    'contact.title':    'Mari',
    'contact.title.hl': 'Berkolaborasi',
    'contact.lead': 'Punya proyek menarik atau ingin ngobrol seputar teknologi? Jangan ragu untuk menghubungi saya!',
    'ci.email.label':    'Email',
    'ci.whatsapp.label': 'WhatsApp',
    'ci.location.label': 'Lokasi',
    'ci.location.value': 'Jl. Krendang Tengah No.29, Krendang, Kec. Tambora, Jakarta Barat 11260',
    'form.name':    'Nama Lengkap',
    'form.email':   'Alamat Email',
    'form.phone':   'Nomor WhatsApp / Telepon',
    'form.service': 'Jenis Layanan',
    'form.service.web':     'Web Development',
    'form.service.mobile':  'Mobile Development',
    'form.service.backend': 'Backend / API',
    'form.service.ai':      'AI / Machine Learning',
    'form.service.consult': 'Konsultasi Teknis',
    'form.service.other':   'Lainnya',
    'form.message': 'Pesan / Deskripsi Proyek',
    'form.send':    'Kirim Pesan',
    'form.sending': 'Mengirim\u2026',
    'form.sent':    'Pesan Terkirim!',
    'modal.live':   'Live / Demo',
    'modal.repo':   'Repository',
    'modal.noImage': 'Belum ada screenshot untuk proyek ini.',
    'footer.tagline': 'Full Stack Developer \u2014 Membangun solusi digital yang skalabel, handal, dan berdampak.',
    'footer.col.nav': 'Navigasi',
    'footer.col.contact': 'Kontak',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.terms': 'Syarat \u0026 Ketentuan',
    'footer.made': 'Dirancang &amp; Dikembangkan oleh <strong>Nova Adi Saputra</strong>',
    'footer.copy': '\u00a9 2026 Nova Adi Saputra. All rights reserved.',
  },
  en: {
    'nav.about':    'About',
    'nav.skills':   'Skills',
    'nav.projects': 'Projects',
    'nav.contact':  'Contact',
    'hero.greeting':    '\ud83d\udc4b Hello, I\'m',
    'hero.role.prefix': 'I\'m a',
    'hero.desc': 'A passionate developer who loves building beautiful, functional, and meaningful digital experiences. Ready to collaborate to bring creative ideas to life.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact':  'Contact Me',
    'hero.scroll': 'Scroll',
    'about.tag':      'About Me',
    'about.title':    'Getting to Know',
    'about.title.hl': 'Me Better',
    'about.badge':    'Full Stack Developer',
    'about.h3':       'Who Am I?',
    'about.p1': 'Hello! I am Nova Adi Saputra, and you can call me <strong>Nova</strong>. I am a <strong>Full Stack Developer</strong> and freelancer since 2020 until now. I handle small, medium, and institutional projects with a practical, outcome-driven engineering approach.',
    'about.p2': 'I focus on building end-to-end solutions across frontend, backend, APIs, databases, deployment, and maintenance. Good solutions should be scalable, secure, and deliver real impact.',
    'about.stat.years':    'Years of<br/>Experience',
    'about.stat.projects': 'Projects<br/>Completed',
    'about.stat.clients':  'Programming<br/>Languages',
    'about.cv': 'Download CV',
    'skills.tag':      'Skills',
    'skills.title':    'Technologies I',
    'skills.title.hl': 'Master',
    'skills.frontend': 'Frontend',
    'skills.backend':  'Backend',
    'skills.ai':       'Artificial Intelligence',
    'skills.tools':    'Database & Tools',
    'projects.tag':      'Portfolio',
    'projects.title':    'Featured',
    'projects.title.hl': 'Projects',
    'projects.note': 'Click any project card to view details, screenshots (if available), and optional live/repository links.',
    'filter.all':    'All',
    'filter.web':    'Web App',
    'filter.mobile': 'Mobile',
    'filter.ai':     'AI',
    'contact.tag':      'Contact',
    'contact.title':    'Let\'s',
    'contact.title.hl': 'Collaborate',
    'contact.lead': 'Have an interesting project or want to talk about tech? Don\'t hesitate to reach out!',
    'ci.email.label':    'Email',
    'ci.whatsapp.label': 'WhatsApp',
    'ci.location.label': 'Location',
    'ci.location.value': 'Jl. Krendang Tengah No.29, Krendang, Tambora, West Jakarta 11260, Indonesia',
    'form.name':    'Full Name',
    'form.email':   'Email Address',
    'form.phone':   'WhatsApp / Phone Number',
    'form.service': 'Type of Service',
    'form.service.web':     'Web Development',
    'form.service.mobile':  'Mobile Development',
    'form.service.backend': 'Backend / API',
    'form.service.ai':      'AI / Machine Learning',
    'form.service.consult': 'Technical Consultation',
    'form.service.other':   'Other',
    'form.message': 'Message / Project Description',
    'form.send':    'Send Message',
    'form.sending': 'Sending\u2026',
    'form.sent':    'Message Sent!',
    'modal.live':   'Live / Demo',
    'modal.repo':   'Repository',
    'modal.noImage': 'No screenshot available for this project yet.',
    'footer.tagline': 'Full Stack Developer \u2014 Building scalable, reliable, and impactful digital solutions.',
    'footer.col.nav': 'Navigation',
    'footer.col.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms \u0026 Conditions',
    'footer.made': 'Designed &amp; Developed by <strong>Nova Adi Saputra</strong>',
    'footer.copy': '\u00a9 2026 Nova Adi Saputra. All rights reserved.',
  },
};

/* ── TYPING ROLES PER LANGUAGE ─────────────────────────────── */
const ROLES = {
  id: ['Full Stack Developer', 'Web Developer', 'Backend Engineer', 'Freelancer Sejak 2020', 'Pemecah Masalah'],
  en: ['Full Stack Developer', 'Web Developer', 'Backend Engineer', 'Freelancer Since 2020', 'Problem Solver'],
};

/* ── PROJECT DATA ──────────────────────────────────────────── */
// Edit data proyek di sini. Semua field optional kecuali title, category, description.
const PROJECTS = [
  {
    title: 'Livechat Widget App',
    title_en: 'Livechat Widget App',
    category: 'Web App',
    description: 'Platform SaaS livechat yang dapat diembed di website klien mana pun hanya dengan satu baris JavaScript snippet — aman, real-time, dan sepenuhnya dapat dikustomisasi sesuai branding. Dibangun fullstack dengan arsitektur berlapis: Laravel REST API, dedicated WebSocket server untuk komunikasi dua arah berlatensi rendah, PostgreSQL sebagai penyimpanan data utama, dan Redis untuk pub/sub messaging serta session caching. Tantangan utama yang berhasil dipecahkan: menjamin keamanan cross-domain embedding di domain klien yang berbeda-beda, sekaligus memastikan seluruh aliran pesan berjalan mulus dan instan di skala multi-tenant.',
    description_en: 'A SaaS livechat platform embeddable on any client website with a single JavaScript snippet — secure, real-time, and fully brandable. Built fullstack with a layered architecture: a Laravel REST API, a dedicated WebSocket server for low-latency bidirectional messaging, PostgreSQL as the primary data store, and Redis for pub/sub brokering and session caching. The core engineering challenge: ensuring safe cross-domain embedding across diverse client domains while keeping all message flows seamless and instant at multi-tenant scale.',
    tag: ['React', 'TypeScript', 'HeroUI', 'Laravel', 'WebSocket', 'PostgreSQL', 'Redis'],
    url_demo: 'https://emildon.com/livechat',
    url_repo: 'https://github.com/MrFrost-Nv27/emildon-frontend',
    hero: 'assets/images/livechat/l1.png',
    images: ['assets/images/livechat/l1.png','assets/images/livechat/l2.png','assets/images/livechat/l3.png','assets/images/livechat/l4.png','assets/images/livechat/l5.png','assets/images/livechat/l6.png'],
  },
  {
    title: 'Pertamina - Dashboard Departemen Kesehatan',
    title_en: 'Pertamina - Health Department Dashboard',
    category: 'Web App',
    description: 'Dashboard operasional kesehatan untuk cabang Pertamina RU IV — memberikan divisi medis kemampuan mencatat, memantau, dan mendistribusikan task kerja harian secara terpusat. Dibangun di atas PHP native dengan pola MVC custom buatan sendiri yang terinspirasi Laravel: terstruktur dan mudah di-maintain, namun tetap ringan tanpa overhead framework besar. Sistem dilengkapi notifikasi email otomatis pada event-event kritis, serta RBAC (Role-Based Access Control) dengan layer permission granular yang memastikan akses data terlindungi sesuai hierarki organisasi.',
    description_en: 'An operational health dashboard for Pertamina\'s RU IV branch — giving the medical division a centralized hub to log, monitor, and distribute daily work tasks. Built on PHP native with a custom self-made MVC pattern inspired by Laravel: structured and maintainable, yet lean without the overhead of a full framework. Features automated email notifications on critical events, and RBAC (Role-Based Access Control) with granular permission layers that enforce data access boundaries across the organizational hierarchy.',
    tag: ['PHP Native', 'Custom MVC', 'MySQL', 'Tailwind CSS', 'RBAC', 'Email Notification'],
    url_demo: 'https://healthruiv.shutenk-store.xyz/',
    url_repo: 'https://github.com/MrFrost-Nv27/healthruiv',
    hero: 'assets/images/healthruiv/h1.png',
    images: ['assets/images/healthruiv/h1.png','assets/images/healthruiv/h2.png','assets/images/healthruiv/h3.png','assets/images/healthruiv/h4.png'],
  },
  {
    title: 'Falcom FTTH App',
    title_en: 'Falcom FTTH App',
    category: 'Web App',
    description: 'Platform perancangan jaringan FTTH (Fiber to the Home) berbasis web yang memungkinkan teknisi dan perencana jaringan mendesain infrastruktur serat optik langsung di atas peta dunia nyata secara interaktif. Dibangun dengan arsitektur monorepo CodeIgniter 4 sebagai backend dan SolidJS + Vanilla JS sebagai frontend reaktif — codebase ringkas namun fitur komprehensif. Tantangan utama: merender dan menghubungkan puluhan komponen jaringan (ODP, OLT, splitter, kabel, dll.) dengan karakteristik berbeda di atas layer peta yang sama, memungkinkan koneksi kabel antar-node secara visual, serta menghitung nilai redaman sinyal secara otomatis di setiap jalur.',
    description_en: 'A web-based FTTH (Fiber to the Home) network design platform that lets engineers and planners design fiber-optic infrastructure interactively on a real-world map. Built as a CodeIgniter 4 monorepo with SolidJS + Vanilla JS powering a reactive, performant frontend — lean codebase with comprehensive capabilities. The central engineering challenge: rendering and connecting dozens of heterogeneous network components (ODP, OLT, splitters, cables, etc.) on a shared map layer, enabling visual cable connections between nodes, and automatically computing signal attenuation values across every path.',
    tag: ['SolidJS', 'Material UI', 'MapLibre GL', 'CodeIgniter 4', 'JavaScript'],
    url_demo: 'https://ftth.falcom-technology.com/',
    url_repo: 'https://github.com/MrFrost-Nv27/ftthapp',
    hero: 'assets/images/ftth/f1.png',
    images: ['assets/images/ftth/f1.png','assets/images/ftth/f2.png','assets/images/ftth/f3.png','assets/images/ftth/f4.png','assets/images/ftth/f5.png','assets/images/ftth/f6.png','assets/images/ftth/f7.png'],
  },
  {
    title: 'Passion Japan App',
    title_en: 'Passion Japan App',
    category: 'Web App',
    description: 'Platform LMS terintegrasi dan sistem manajemen administrasi untuk LPK Passion Japan — mengelola ekosistem persiapan tenaga kerja ke Jepang secara end-to-end: data peserta, perusahaan mitra, keuangan, modul pembelajaran, dan ujian, semuanya dalam satu sistem terpadu. Dibangun di atas monorepo Laravel 12 + React dengan HeroUI. Fitur paling kompleks: pipeline generate CV yang menerjemahkan profil peserta dari Bahasa Indonesia ke Bahasa Jepang secara otomatis menggunakan Gemini API, mengemas hasilnya menjadi file siap export (PDF), dan mendistribusikan job generasinya lewat queue batch worker sehingga proses berat tidak pernah memblokir request utama.',
    description_en: 'An integrated LMS and administration management platform for Passion Japan LPK — managing the full Japan-bound workforce preparation pipeline end-to-end: participant records, partner companies, finances, learning modules, and assessments, all unified in one system. Built as a Laravel 12 + React monorepo with HeroUI components. The most complex feature: a CV generation pipeline that automatically translates participant profiles from Indonesian to Japanese using the Gemini API, packages the output into exportable PDF files, and dispatches batch generation jobs through a queue worker — ensuring no heavy process ever blocks the main request thread.',
    tag: ['Laravel 12', 'React', 'HeroUI', 'Gemini API', 'Queue Worker', 'MySQL'],
    url_demo: 'https://passionjapan.co.id/',
    url_repo: 'https://gitlab.com/passionjapanid1/passionjapanid',
    hero: 'assets/images/passionjapan/pj1.png',
    images: ['assets/images/passionjapan/pj1.png','assets/images/passionjapan/pj2.png'],
  },
  {
    title: 'Pemesanan Travel Mobil',
    title_en: 'Car Travel Booking App',
    category: 'Mobile',
    description: 'Aplikasi mobile pemesanan travel mobil antar-kota yang menangani seluruh alur operasional dalam satu genggaman — mulai dari manajemen armada kendaraan dan data pengemudi, penjadwalan rute, hingga pemesanan tiket dan pembayaran oleh penumpang secara real-time. Dibangun dengan Kotlin native Android mengikuti pola arsitektur MVVM, dengan Firebase sebagai backend cloud untuk sinkronisasi data instan dan notifikasi push.',
    description_en: 'An intercity car travel booking mobile app that handles the entire operational flow in one place — from fleet and driver management to route scheduling, passenger ticket booking, and real-time payment processing. Built with native Android Kotlin following MVVM architecture, with Firebase as the cloud backend for instant data synchronization and push notifications.',
    tag: ['Kotlin', 'Android', 'Firebase', 'MVVM'],
    url_demo: '',
    url_repo: 'https://github.com/MrFrost-Nv27/mobilkt',
    hero: '',
    images: [],
  },
  {
    title: 'Manajemen Sparepart Bengkel',
    title_en: 'Workshop Spare Parts Manager',
    category: 'Mobile',
    description: 'Aplikasi mobile manajemen inventori sparepart untuk bengkel kendaraan — memudahkan pencatatan mutasi barang masuk dan keluar, monitoring level stok secara real-time, dan akses riwayat transaksi lengkap kapan saja. Dibangun dengan Flutter (Dart) untuk pengalaman yang konsisten di Android maupun iOS, dengan Firebase sebagai backend cloud yang responsif dan sinkron.',
    description_en: 'A mobile spare parts inventory management app for vehicle workshops — streamlining stock-in/out logging, real-time inventory level monitoring, and on-demand access to full transaction history. Built with Flutter (Dart) for a consistent cross-platform experience on Android and iOS, backed by a responsive and synchronized Firebase cloud backend.',
    tag: ['Flutter', 'Dart', 'Firebase'],
    url_demo: '',
    url_repo: 'https://github.com/MrFrost-Nv27/appsparepart',
    hero: '',
    images: [],
  },
  {
    title: 'Forecast Prestasi Siswa',
    title_en: 'Student Performance Forecast',
    category: 'AI',
    description: 'Aplikasi prediksi prestasi akademik berbasis machine learning menggunakan algoritma Backpropagation Neural Network — membantu institusi pendidikan mengidentifikasi lebih awal siswa yang berisiko mengalami penurunan performa, sehingga intervensi pengajar dapat dilakukan tepat sasaran dan tepat waktu. Model dilatih dari data historis nilai dan kehadiran. Dibangun dengan Python, Flask sebagai REST API, dan JavaScript untuk antarmuka visualisasi hasil yang intuitif.',
    description_en: 'A machine learning–powered academic performance prediction app using a Backpropagation Neural Network — helping educational institutions proactively identify students at risk of underperforming, enabling timely and targeted teacher intervention. The model is trained on historical grade and attendance data. Built with Python, Flask as the REST API, and JavaScript for an intuitive result visualization interface.',
    tag: ['Python', 'Flask', 'Neural Network', 'JavaScript'],
    url_demo: '',
    url_repo: 'https://github.com/MrFrost-Nv27/backprosiswa',
    hero: '',
    images: [],
  },
  {
    title: 'Analisa Kredit Macet',
    title_en: 'Non-Performing Loan Analysis',
    category: 'AI',
    description: 'Aplikasi prediksi risiko kredit macet berbasis machine learning menggunakan algoritma Logistic Regression — membantu lembaga keuangan mengevaluasi kelayakan kredit calon peminjam secara otomatis dari data historis pinjaman, mengurangi ketergantungan pada penilaian manual, dan meminimasi potensi kerugian akibat kredit bermasalah. Dibangun dengan Python dan Quart (async web framework) untuk penanganan request yang efisien dan responsif.',
    description_en: 'A machine learning–powered non-performing loan prediction app using Logistic Regression — helping financial institutions automatically evaluate loan applicant creditworthiness from historical lending data, reducing reliance on manual review and minimizing potential losses from bad debt. Built with Python and Quart (async web framework) for efficient and responsive request handling.',
    tag: ['Python', 'Quart', 'Logistic Regression', 'JavaScript'],
    url_demo: '',
    url_repo: 'https://github.com/MrFrost-Nv27/logisticregkredit',
    hero: '',
    images: [],
  },
  {
    title: 'Asosiasi Rekomendasi Produk',
    title_en: 'Product Recommendation Association',
    category: 'AI',
    description: 'Sistem rekomendasi produk berbasis association rule mining menggunakan algoritma Apriori — menganalisis pola pembelian historis untuk menemukan kombinasi produk yang sering dibeli bersama, lalu menghasilkan rekomendasi cross-selling yang relevan dan actionable. Membantu bisnis retail meningkatkan nilai transaksi rata-rata menggunakan insight berbasis data. Dibangun dengan Python, Flask, dan JavaScript.',
    description_en: 'A product recommendation engine based on association rule mining using the Apriori algorithm — analyzing historical purchase patterns to surface frequently co-purchased product combinations and generate relevant, actionable cross-selling recommendations. Helps retail businesses increase average transaction value through data-driven insights. Built with Python, Flask, and JavaScript.',
    tag: ['Python', 'Flask', 'Apriori', 'JavaScript'],
    url_demo: '',
    url_repo: 'https://github.com/MrFrost-Nv27/webapriori',
    hero: '',
    images: [],
  },
];

const _CAT_STYLE = {
  web:    { icon: 'fa-globe',      color: '#6c63ff' },
  mobile: { icon: 'fa-mobile-alt', color: '#ff6b6b' },
  ai:     { icon: 'fa-brain',      color: '#a29bfe' },
};
const _PROJ_COLORS = ['#6c63ff', '#00d4ff', '#ff6b6b', '#ffd93d', '#a29bfe', '#55efc4', '#fd79a8', '#e17055', '#00cec9', '#74b9ff'];

function _catKey(cat) {
  if (/web/i.test(cat))    return 'web';
  if (/mobile/i.test(cat)) return 'mobile';
  if (/ai/i.test(cat))     return 'ai';
  return 'web';
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const isEn = currentLang === 'en';
  PROJECTS.forEach((proj, idx) => {
    const key     = _catKey(proj.category);
    const style   = _CAT_STYLE[key];
    const color   = _PROJ_COLORS[idx % _PROJ_COLORS.length];
    const title   = (isEn && proj.title_en)       || proj.title;
    const desc    = (isEn && proj.description_en) || proj.description;
    const heroHtml = proj.hero
      ? `<img src="${proj.hero}" alt="${title}" loading="lazy" class="proj-hero-img" />`
      : `<div class="proj-thumb" style="--c:${color}"><i class="fas ${style.icon}"></i></div>`;
    const techHtml = (proj.tag || []).map(t => `<span class="tech">${t}</span>`).join('');
    const demoBtn = proj.url_demo
      ? `<a href="${proj.url_demo}" class="oval-btn" title="Demo" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i></a>`
      : '';
    const repoBtn = proj.url_repo
      ? `<a href="${proj.url_repo}" class="oval-btn" title="Repo" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>`
      : '';
    const el = document.createElement('article');
    el.className       = 'proj-card reveal clickable';
    el.dataset.cat     = key;
    el.dataset.live    = proj.url_demo  || '';
    el.dataset.repo    = proj.url_repo  || '';
    el.dataset.images  = (proj.images   || []).join(',');
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', 'Open project details');
    el.innerHTML = `
      <div class="proj-img">
        ${heroHtml}
        <div class="proj-overlay">
          ${demoBtn}${repoBtn}
        </div>
      </div>
      <div class="proj-body">
        <div class="proj-meta"><span class="proj-tag">${proj.category}</span></div>
        <h3>${title}</h3>
        <p>${desc}</p>
        ${techHtml ? `<div class="tech-row">${techHtml}</div>` : ''}
      </div>`;
    grid.appendChild(el);
    if (typeof _revealIO !== 'undefined') _revealIO.observe(el);
  });
}

/* ── STATE ─────────────────────────────────────────────────── */
let currentLang  = localStorage.getItem('lang')  || 'id';
let currentTheme = localStorage.getItem('theme') || 'light';

/* ── i18n ──────────────────────────────────────────────────── */
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'id');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.id;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  // innerHTML updates — safe because values come from our own translations object
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  const flag = document.getElementById('langFlag');
  if (flag) {
    flag.src = lang === 'en' ? 'https://flagcdn.com/w20/gb.png' : 'https://flagcdn.com/w20/id.png';
    flag.alt = lang === 'en' ? 'United Kingdom flag' : 'Indonesia flag';
  }
  const label = document.getElementById('langLabel');
  if (label) label.textContent = lang.toUpperCase();
  restartTyping();
  renderProjects();
}

/* ── THEME ─────────────────────────────────────────────────── */
function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  if (typeof window.initParticles === 'function') window.initParticles();
}

/* ── PARTICLE CANVAS ───────────────────────────────────────── */
(function () {
  const cvs = document.getElementById('particleCanvas');
  if (!cvs) return;
  const ctx = cvs.getContext('2d');

  function getColors() {
    const dark = document.documentElement.classList.contains('dark');
    return dark
      ? { cols: ['124,111,255', '0,212,255'], aMin: 0.07, aMax: 0.45, line: '124,111,255', lineA: 0.12 }
      : { cols: ['100,80,220', '0,130,180'],  aMin: 0.06, aMax: 0.28, line: '100,80,220',  lineA: 0.08 };
  }

  function resize() { cvs.width = window.innerWidth; cvs.height = window.innerHeight; }

  class Dot {
    constructor() { this.spawn(); }
    spawn() {
      this.x  = Math.random() * cvs.width;
      this.y  = Math.random() * cvs.height;
      this.r  = Math.random() * 1.6 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      const c  = getColors();
      this.col = c.cols[Math.floor(Math.random() * c.cols.length)];
      this.a   = c.aMin + Math.random() * (c.aMax - c.aMin);
    }
    tick() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > cvs.width)  this.vx *= -1;
      if (this.y < 0 || this.y > cvs.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.col},${this.a})`;
      ctx.fill();
    }
  }

  let particles = [];
  let rafId = null;

  window.initParticles = function () {
    /* 50 dots (was 70): reduces O(n²) line checks from 4,900 → 1,225/frame */
    particles = Array.from({ length: 50 }, () => new Dot());
  };

  function connectDots() {
    const c = getColors();
    const DIST = 100; /* reduced from 110 */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${c.line},${c.lineA * (1 - d / DIST)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    connectDots();
    particles.forEach(p => { p.tick(); p.draw(); });
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    resize();
    window.initParticles();
    loop();
  }

  /* Start after page load so it never competes with FCP/LCP rendering */
  if (document.readyState === 'complete') {
    (window.requestIdleCallback || setTimeout)(start, 200);
  } else {
    window.addEventListener('load', function () {
      (window.requestIdleCallback || setTimeout)(start, 200);
    }, { once: true });
  }

  window.addEventListener('resize', () => {
    resize();
    window.initParticles();
  });
})();

/* ── TYPING EFFECT ─────────────────────────────────────────── */
let typingTimer = null;

function restartTyping() {
  clearTimeout(typingTimer);
  const el = document.getElementById('typingText');
  if (el) el.textContent = '';
  startTyping();
}

function startTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;
  const roles = ROLES[currentLang] || ROLES.id;
  let ri = 0, ci = 0, deleting = false;
  function tick() {
    const word = roles[ri];
    el.textContent = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
    deleting ? ci-- : ci++;
    let delay = deleting ? 55 : 95;
    if (!deleting && ci === word.length) { delay = 2200; deleting = true; }
    else if (deleting && ci === 0)       { deleting = false; ri = (ri + 1) % roles.length; delay = 420; }
    typingTimer = setTimeout(tick, delay);
  }
  tick();
}
startTyping();

/* ── NAVBAR ────────────────────────────────────────────────── */
(function () {
  const nav   = document.getElementById('navbar');
  const ham   = document.getElementById('hamburger');
  const list  = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 70);
    let cur = '';
    document.querySelectorAll('section[id]').forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 110) cur = sec.id;
    });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
  }, { passive: true });

  ham.addEventListener('click', () => { ham.classList.toggle('open'); list.classList.toggle('open'); });
  list.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open'); list.classList.remove('open');
  }));
})();

/* ── THEME TOGGLE ──────────────────────────────────────────── */
(function () {
  const btn  = document.getElementById('themeToggle');
  if (!btn) return;
  applyTheme(currentTheme);
  btn.addEventListener('click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));
})();

/* ── LANGUAGE TOGGLE ───────────────────────────────────────── */
(function () {
  const btn   = document.getElementById('langToggle');
  const label = document.getElementById('langLabel');
  if (!btn) return;
  if (label) label.textContent = currentLang.toUpperCase();
  applyLang(currentLang);  // apply saved language on load
  btn.addEventListener('click', () => applyLang(currentLang === 'en' ? 'id' : 'en'));
})();

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
var _revealIO;
(function () {
  _revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => _revealIO.observe(el));
})();

/* ── COUNTER ANIMATION ─────────────────────────────────────── */
(function () {
  // Compute years-since dynamically for any stat with data-since
  document.querySelectorAll('.stat-num[data-since]').forEach(el => {
    const since = parseInt(el.dataset.since, 10);
    el.dataset.target = String(new Date().getFullYear() - since);
  });

  const statsEl = document.querySelector('.stats-row');
  if (!statsEl) return;
  let done = false;
  const io = new IntersectionObserver(entries => {
    if (done || !entries[0].isIntersecting) return;
    done = true;
    statsEl.querySelectorAll('.stat-num').forEach(num => {
      const target = parseInt(num.dataset.target, 10);
      let cur = 0;
      const step = target / (1800 / 16);
      const id = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(id); }
        num.textContent = Math.floor(cur);
      }, 16);
    });
  }, { threshold: 0.6 });
  io.observe(statsEl);
})();

/* ── PROJECT FILTER ────────────────────────────────────────── */
(function () {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.proj-card').forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        if (match) {
          card.classList.remove('hidden');
          void card.offsetWidth;
          card.classList.add('pop-in');
          card.addEventListener('animationend', () => card.classList.remove('pop-in'), { once: true });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ── PROJECT DETAIL MODAL ─────────────────────────────────── */
(function () {
  const modal       = document.getElementById('projectModal');
  if (!modal) return;

  const modalTitle    = document.getElementById('modalTitle');
  const modalDesc     = document.getElementById('modalDesc');
  const modalGallery  = document.getElementById('modalGallery');
  const modalLiveLink = document.getElementById('modalLiveLink');
  const modalRepoLink = document.getElementById('modalRepoLink');
  const modalClose    = document.getElementById('projectModalClose');

  // ── Carousel state ────────────────────────────────────────
  let _imgs = [], _idx = 0;

  function setLink(linkEl, value) {
    if (!linkEl) return;
    const url = (value || '').trim();
    if (!url) { linkEl.hidden = true; linkEl.removeAttribute('href'); return; }
    linkEl.hidden = false;
    linkEl.href = url;
  }

  function setActiveSlide(idx, animate) {
    if (!_imgs.length) return;
    _idx = ((idx % _imgs.length) + _imgs.length) % _imgs.length;
    const mainImg = modalGallery.querySelector('.mc-main-img');
    const counter = modalGallery.querySelector('.mc-counter');
    const thumbs  = modalGallery.querySelectorAll('.mc-thumb');
    if (mainImg) {
      if (animate) {
        mainImg.style.opacity = '0';
        setTimeout(() => { mainImg.src = _imgs[_idx]; mainImg.style.opacity = '1'; }, 180);
      } else {
        mainImg.src = _imgs[_idx];
      }
    }
    if (counter) counter.textContent = (_idx + 1) + ' / ' + _imgs.length;
    thumbs.forEach(function (t, i) { t.classList.toggle('active', i === _idx); });
    // Scroll active thumb into view
    if (thumbs[_idx]) thumbs[_idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }

  function renderGallery(images) {
    modalGallery.innerHTML = '';
    _imgs = images;
    _idx  = 0;

    if (!images.length) {
      const noImg = document.createElement('div');
      noImg.className = 'modal-no-image';
      noImg.innerHTML = '<i class="fas fa-image"></i>' + ((TRANSLATIONS[currentLang] || TRANSLATIONS.id)['modal.noImage'] || 'No screenshots available.');
      modalGallery.appendChild(noImg);
      return;
    }

    const carousel = document.createElement('div');
    carousel.className = 'modal-carousel';

    // ── Stage ────────────────────────────────────────────────
    const stage = document.createElement('div');
    stage.className = 'mc-stage';

    const mainImg = document.createElement('img');
    mainImg.className = 'mc-main-img';
    mainImg.src = images[0];
    mainImg.alt = 'Project screenshot';
    mainImg.style.transition = 'opacity 0.18s ease';
    mainImg.addEventListener('click', function () { openLightbox(_idx); });

    const expandBtn = document.createElement('button');
    expandBtn.className = 'mc-expand-btn';
    expandBtn.setAttribute('aria-label', 'View fullscreen');
    expandBtn.innerHTML = '<i class="fas fa-expand-alt"></i>';
    expandBtn.addEventListener('click', function () { openLightbox(_idx); });

    stage.appendChild(mainImg);
    stage.appendChild(expandBtn);

    if (images.length > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'mc-arrow mc-prev';
      prevBtn.setAttribute('aria-label', 'Previous image');
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prevBtn.addEventListener('click', function () { setActiveSlide(_idx - 1, true); });

      const nextBtn = document.createElement('button');
      nextBtn.className = 'mc-arrow mc-next';
      nextBtn.setAttribute('aria-label', 'Next image');
      nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextBtn.addEventListener('click', function () { setActiveSlide(_idx + 1, true); });

      const counter = document.createElement('div');
      counter.className = 'mc-counter';
      counter.textContent = '1 / ' + images.length;

      stage.appendChild(prevBtn);
      stage.appendChild(nextBtn);
      stage.appendChild(counter);
    }

    carousel.appendChild(stage);

    // ── Thumbnails ───────────────────────────────────────────
    if (images.length > 1) {
      const thumbWrap = document.createElement('div');
      thumbWrap.className = 'mc-thumbs';

      images.forEach(function (src, i) {
        const thumb = document.createElement('div');
        thumb.className = 'mc-thumb' + (i === 0 ? ' active' : '');
        const tImg = document.createElement('img');
        tImg.src = src;
        tImg.alt = 'Screenshot ' + (i + 1);
        tImg.loading = 'lazy';
        thumb.appendChild(tImg);
        thumb.addEventListener('click', function () { setActiveSlide(i, true); });
        thumbWrap.appendChild(thumb);
      });

      carousel.appendChild(thumbWrap);
    }

    modalGallery.appendChild(carousel);
  }

  // ── Lightbox ──────────────────────────────────────────────
  var lb = null, lbImgWrap = null, lbImg = null, lbCounter = null;
  var lbZoomLevel = null, lbZoomIn = null, lbZoomOut = null, lbZoomReset = null;

  // Zoom / pan state
  var _scale = 1, _tx = 0, _ty = 0;
  var _SCALE_MIN = 1, _SCALE_MAX = 5, _SCALE_STEP = 0.5;

  function lbApplyTransform(animated) {
    if (!lbImg) return;
    lbImg.style.transition = animated
      ? 'transform 0.22s ease, opacity 0.18s ease'
      : 'transform 0s, opacity 0.18s ease';
    lbImg.style.transform = 'translate(' + _tx + 'px,' + _ty + 'px) scale(' + _scale + ')';
    if (lbZoomLevel) lbZoomLevel.textContent = Math.round(_scale * 100) + '%';
    if (lbZoomIn)    lbZoomIn.disabled  = _scale >= _SCALE_MAX;
    if (lbZoomOut)   lbZoomOut.disabled = _scale <= _SCALE_MIN;
    var zoomed = _scale > 1;
    if (lbImgWrap) {
      lbImgWrap.classList.toggle('zoomed', zoomed);
    }
  }

  function lbResetZoom(animated) {
    _scale = 1; _tx = 0; _ty = 0;
    lbApplyTransform(animated !== false);
  }

  function lbClampPan() {
    // Clamp pan so image never drifts too far out of view
    if (!lbImg) return;
    var rect = lbImg.getBoundingClientRect();
    var vw = window.innerWidth, vh = window.innerHeight;
    var maxX = Math.max(0, (rect.width  - vw)  / 2 + vw  * 0.1);
    var maxY = Math.max(0, (rect.height - vh) / 2 + vh * 0.1);
    _tx = Math.min(maxX, Math.max(-maxX, _tx));
    _ty = Math.min(maxY, Math.max(-maxY, _ty));
  }

  function buildLightbox() {
    if (lb) return;
    lb = document.createElement('div');
    lb.className = 'lb-overlay';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');

    // Close button
    var closeBtn = document.createElement('button');
    closeBtn.className = 'lb-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    closeBtn.addEventListener('click', closeLightbox);

    // Prev / Next arrows
    var prevBtn = document.createElement('button');
    prevBtn.className = 'lb-arrow lb-prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.addEventListener('click', function () { lbResetZoom(false); setActiveSlide(_idx - 1, true); lbSync(); });

    var nextBtn = document.createElement('button');
    nextBtn.className = 'lb-arrow lb-next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.addEventListener('click', function () { lbResetZoom(false); setActiveSlide(_idx + 1, true); lbSync(); });

    // Image wrapper (handles pan)
    lbImgWrap = document.createElement('div');
    lbImgWrap.className = 'lb-img-wrap';

    lbImg = document.createElement('img');
    lbImg.className = 'lb-img';
    lbImg.alt = 'Project screenshot';
    lbImgWrap.appendChild(lbImg);

    // Bottom bar
    var bar = document.createElement('div');
    bar.className = 'lb-bar';

    lbCounter = document.createElement('span');
    lbCounter.className = 'lb-counter';

    var sep1 = document.createElement('span');
    sep1.className = 'lb-sep';

    lbZoomOut = document.createElement('button');
    lbZoomOut.className = 'lb-zoom-btn';
    lbZoomOut.innerHTML = '<i class="fas fa-minus"></i>';
    lbZoomOut.setAttribute('aria-label', 'Zoom out');
    lbZoomOut.addEventListener('click', function () {
      _scale = Math.max(_SCALE_MIN, parseFloat((_scale - _SCALE_STEP).toFixed(2)));
      if (_scale === 1) { _tx = 0; _ty = 0; }
      lbClampPan();
      lbApplyTransform(true);
    });

    lbZoomLevel = document.createElement('span');
    lbZoomLevel.className = 'lb-zoom-level';
    lbZoomLevel.textContent = '100%';

    lbZoomIn = document.createElement('button');
    lbZoomIn.className = 'lb-zoom-btn';
    lbZoomIn.innerHTML = '<i class="fas fa-plus"></i>';
    lbZoomIn.setAttribute('aria-label', 'Zoom in');
    lbZoomIn.addEventListener('click', function () {
      _scale = Math.min(_SCALE_MAX, parseFloat((_scale + _SCALE_STEP).toFixed(2)));
      lbClampPan();
      lbApplyTransform(true);
    });

    lbZoomReset = document.createElement('button');
    lbZoomReset.className = 'lb-zoom-btn';
    lbZoomReset.innerHTML = '<i class="fas fa-compress-alt"></i>';
    lbZoomReset.setAttribute('aria-label', 'Reset zoom');
    lbZoomReset.addEventListener('click', function () { lbResetZoom(true); });

    var sep2 = document.createElement('span');
    sep2.className = 'lb-sep';

    bar.appendChild(lbCounter);
    bar.appendChild(sep1);
    bar.appendChild(lbZoomOut);
    bar.appendChild(lbZoomLevel);
    bar.appendChild(lbZoomIn);
    bar.appendChild(sep2);
    bar.appendChild(lbZoomReset);

    lb.appendChild(closeBtn);
    lb.appendChild(prevBtn);
    lb.appendChild(lbImgWrap);
    lb.appendChild(nextBtn);
    lb.appendChild(bar);

    // ── Click on backdrop (not on image or bar) ─────────────
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target === lbImgWrap) {
        if (_scale > 1) { lbResetZoom(true); } else { closeLightbox(); }
      }
    });

    // ── Double-click to zoom in / reset ─────────────────────
    lbImgWrap.addEventListener('dblclick', function (e) {
      e.stopPropagation();
      if (_scale > 1) { lbResetZoom(true); } else {
        _scale = 2.5;
        lbApplyTransform(true);
      }
    });

    // ── Mouse wheel zoom ─────────────────────────────────────
    lb.addEventListener('wheel', function (e) {
      e.preventDefault();
      var delta = e.deltaY > 0 ? -_SCALE_STEP : _SCALE_STEP;
      _scale = Math.min(_SCALE_MAX, Math.max(_SCALE_MIN, parseFloat((_scale + delta).toFixed(2))));
      if (_scale === 1) { _tx = 0; _ty = 0; }
      lbClampPan();
      lbApplyTransform(true);
    }, { passive: false });

    // ── Mouse drag to pan ────────────────────────────────────
    var _drag = false, _dragX = 0, _dragY = 0;
    lbImgWrap.addEventListener('mousedown', function (e) {
      if (_scale <= 1) return;
      _drag = true;
      _dragX = e.clientX - _tx;
      _dragY = e.clientY - _ty;
      lbImgWrap.classList.add('grabbing');
      e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) {
      if (!_drag) return;
      _tx = e.clientX - _dragX;
      _ty = e.clientY - _dragY;
      lbClampPan();
      lbApplyTransform(false);
    });
    document.addEventListener('mouseup', function () {
      if (!_drag) return;
      _drag = false;
      if (lbImgWrap) lbImgWrap.classList.remove('grabbing');
    });

    // ── Pinch-to-zoom (touch) ────────────────────────────────
    var _pinchDist0 = 0, _pinchScale0 = 1;
    var _touchStartX = 0, _touchStartY = 0, _panTx0 = 0, _panTy0 = 0;
    lb.addEventListener('touchstart', function (e) {
      if (e.touches.length === 2) {
        _pinchDist0 = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        _pinchScale0 = _scale;
      } else if (e.touches.length === 1 && _scale > 1) {
        _touchStartX = e.touches[0].clientX;
        _touchStartY = e.touches[0].clientY;
        _panTx0 = _tx; _panTy0 = _ty;
      }
    }, { passive: true });
    lb.addEventListener('touchmove', function (e) {
      if (e.touches.length === 2) {
        e.preventDefault();
        var dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        _scale = Math.min(_SCALE_MAX, Math.max(_SCALE_MIN, parseFloat((_pinchScale0 * dist / _pinchDist0).toFixed(2))));
        if (_scale === 1) { _tx = 0; _ty = 0; }
        lbClampPan();
        lbApplyTransform(false);
      } else if (e.touches.length === 1 && _scale > 1) {
        e.preventDefault();
        _tx = _panTx0 + (e.touches[0].clientX - _touchStartX);
        _ty = _panTy0 + (e.touches[0].clientY - _touchStartY);
        lbClampPan();
        lbApplyTransform(false);
      }
    }, { passive: false });
    lb.addEventListener('touchend', function (e) {
      if (e.touches.length === 0 && e.changedTouches.length === 1 && _scale === 1) {
        // single tap on backdrop → close
        if (e.target === lb || e.target === lbImgWrap) closeLightbox();
      }
    }, { passive: true });

    document.body.appendChild(lb);
  }

  function lbSync() {
    if (!lbImg) return;
    lbImg.style.opacity = '0';
    setTimeout(function () {
      lbImg.src = _imgs[_idx];
      lbImg.style.opacity = '1';
      if (lbCounter) lbCounter.textContent = (_idx + 1) + ' / ' + _imgs.length;
    }, 180);
  }

  function openLightbox(idx) {
    if (!_imgs.length) return;
    buildLightbox();
    _idx = ((idx % _imgs.length) + _imgs.length) % _imgs.length;
    lbResetZoom(false);
    lbImg.src = _imgs[_idx];
    lbImg.style.opacity = '1';
    if (lbCounter) lbCounter.textContent = (_idx + 1) + ' / ' + _imgs.length;
    var prevEl = lb.querySelector('.lb-prev');
    var nextEl = lb.querySelector('.lb-next');
    var showNav = _imgs.length > 1;
    if (prevEl) prevEl.style.display = showNav ? '' : 'none';
    if (nextEl) nextEl.style.display = showNav ? '' : 'none';
    if (lbCounter) lbCounter.style.display = showNav ? '' : 'none';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('open');
    lbResetZoom(false);
  }

  function openModal(card) {
    const title  = card.querySelector('h3')?.textContent?.trim() || 'Project';
    const desc   = card.querySelector('p')?.textContent?.trim()  || '';
    const images = (card.dataset.images || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);

    modalTitle.textContent = title;
    modalDesc.textContent  = desc;
    renderGallery(images);
    setLink(modalLiveLink, card.dataset.live);
    setLink(modalRepoLink, card.dataset.repo);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    closeLightbox();
  }

  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  // Delegation — works for cards rendered at any time
  grid.addEventListener('click', function (e) {
    if (e.target.closest('a, button')) return;
    const card = e.target.closest('.proj-card');
    if (card) openModal(card);
  });

  grid.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.proj-card');
      if (card) { e.preventDefault(); openModal(card); }
    }
  });

  grid.addEventListener('click', function (e) {
    const link = e.target.closest('.proj-overlay a[href="#"]');
    if (link) { e.preventDefault(); const card = link.closest('.proj-card'); if (card) openModal(card); }
  });

  modal.querySelectorAll('[data-close-modal]').forEach(function (el) { el.addEventListener('click', closeModal); });
  if (modalClose) modalClose.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    var lbOpen = lb && lb.classList.contains('open');
    if (lbOpen) {
      if (e.key === 'Escape') { closeLightbox(); return; }
      if (e.key === 'ArrowLeft')  { lbResetZoom(false); setActiveSlide(_idx - 1, true); lbSync(); return; }
      if (e.key === 'ArrowRight') { lbResetZoom(false); setActiveSlide(_idx + 1, true); lbSync(); return; }
      if (e.key === '+' || e.key === '=') {
        _scale = Math.min(_SCALE_MAX, parseFloat((_scale + _SCALE_STEP).toFixed(2)));
        lbClampPan(); lbApplyTransform(true); return;
      }
      if (e.key === '-') {
        _scale = Math.max(_SCALE_MIN, parseFloat((_scale - _SCALE_STEP).toFixed(2)));
        if (_scale === 1) { _tx = 0; _ty = 0; }
        lbClampPan(); lbApplyTransform(true); return;
      }
      if (e.key === '0') { lbResetZoom(true); return; }
    }
    if (modal.classList.contains('open') && !lbOpen) {
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key === 'ArrowLeft')  setActiveSlide(_idx - 1, true);
      if (e.key === 'ArrowRight') setActiveSlide(_idx + 1, true);
    }
  });
})();

/* ── CUSTOM CURSOR (desktop only) ──────────────────────────── */
(function () {
  var dot  = document.getElementById('cursor');
  var ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    // Dot snaps instantly
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Ring follows with smooth lerp
  (function raf() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(raf);
  })();

  // Hover state via delegation
  var _hoverSels = 'a, button, [role="button"], .chip, .filter-btn, .skill-card, .proj-card, .oval-btn, .mc-thumb, .mc-arrow, .lb-zoom-btn, .lb-arrow, .lb-close, .social-pill, .lang-btn, .hamburger';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(_hoverSels)) {
      dot.classList.add('hover');
      ring.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(_hoverSels)) {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    }
  });

  // Press state
  document.addEventListener('mousedown', function () {
    dot.classList.add('pressed');
    ring.classList.add('pressed');
  });
  document.addEventListener('mouseup', function () {
    dot.classList.remove('pressed');
    ring.classList.remove('pressed');
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    dot.style.opacity  = '';
    ring.style.opacity = '';
  });
})();

/* ── CONTACT FORM ──────────────────────────────────────────── */
(function () {
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('submitBtn');
  if (!form || !btn) return;

  // Translate select options on language change
  function applyServiceOptions() {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;
    form.querySelectorAll('select option[data-i18n-opt]').forEach(opt => {
      const key = opt.dataset.i18nOpt;
      if (t[key]) opt.textContent = t[key];
    });
  }
  applyServiceOptions();
  document.getElementById('langToggle')?.addEventListener('click', applyServiceOptions);

  ['fname', 'fservice', 'fmsg'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', function () {
      if (this.value.trim()) this.closest('.field-group')?.classList.remove('invalid');
    });
    document.getElementById(id)?.addEventListener('change', function () {
      if (this.value.trim()) this.closest('.field-group')?.classList.remove('invalid');
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = (document.getElementById('fname').value    || '').trim();
    const service = (document.getElementById('fservice').value || '').trim();
    const msg     = (document.getElementById('fmsg').value     || '').trim();
    if (!name || !service || !msg) {
      [['fname', name], ['fservice', service], ['fmsg', msg]].forEach(([id, val]) => {
        if (!val) document.getElementById(id)?.closest('.field-group')?.classList.add('invalid');
      });
      return;
    }
    const text = currentLang === 'en'
      ? `Halo Nova,\n\nSaya tertarik untuk berkolaborasi. Berikut detail saya:\n\n*📋 Informasi Pengirim*\n• Name     : ${name}\n\n*🔧 Type of Service*\n${service}\n\n*💬 Message*\n${msg}\n\n_Sent via contact form — frostdev.my.id_`
      : `Halo Nova,\n\nSaya tertarik untuk berkolaborasi. Berikut detail saya:\n\n*📋 Informasi Pengirim*\n• Nama     : ${name}\n\n*🔧 Jenis Layanan*\n${service}\n\n*💬 Pesan*\n${msg}\n\n_Dikirim melalui formulir kontak — frostdev.my.id_`;
    const waUrl = `https://wa.me/6282241198283?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    form.reset();
    form.querySelectorAll('.field-group').forEach(fg => fg.classList.remove('invalid'));
  });
})();

/* ── LEGAL MODALS (Privacy Policy & Terms) ─────────────────── */
(function () {

  /* ── Content ─────────────────────────────────────────────── */
  var LEGAL = {
    privacy: {
      id: {
        title: 'Kebijakan Privasi',
        updated: 'Terakhir diperbarui: 2 April 2026',
        effective: 'Berlaku sejak: 1 Januari 2024',
        intro: 'Kebijakan Privasi ini menjelaskan bagaimana Nova Adi Saputra ("saya", "kami") mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan saat mengunjungi portfolio ini di <strong>frostdev.my.id</strong>.',
        sections: [
          {
            title: 'Informasi yang Dikumpulkan',
            items: [
              'Data analitik anonim melalui Google Analytics (Google Tag Manager ID: G-VN0QKEYW7Y) — seperti halaman yang dikunjungi, durasi kunjungan, dan perangkat yang digunakan.',
              'Informasi yang Anda kirim melalui formulir kontak: nama, jenis layanan yang diminati, dan pesan. Data ini dikirim langsung ke WhatsApp saya dan tidak disimpan di server portfolio.',
              'Cookie dari layanan pihak ketiga (Google Analytics, Iubenda Cookie Consent) untuk analitik dan kepatuhan hukum.'
            ]
          },
          {
            title: 'Penggunaan Informasi',
            items: [
              'Memahami cara pengunjung berinteraksi dengan portfolio untuk meningkatkan kualitas konten.',
              'Merespons pertanyaan atau permintaan kolaborasi yang Anda kirimkan.',
              'Memastikan kepatuhan terhadap regulasi privasi yang berlaku (GDPR, UU PDP Indonesia).'
            ]
          },
          {
            title: 'Cookie & Pelacakan',
            body: 'Website ini menggunakan cookie teknis dan analitik. Anda dapat mengelola preferensi cookie melalui banner consent yang muncul saat pertama kali mengunjungi situs. Cookie analytics digunakan secara anonim dan tidak mengidentifikasi Anda secara personal.',
            items: []
          },
          {
            title: 'Layanan Pihak Ketiga',
            items: [
              '<strong>Google Analytics</strong> — analitik kunjungan anonim. Kebijakan Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>',
              '<strong>Iubenda</strong> — manajemen cookie consent sesuai regulasi GDPR.',
              '<strong>WhatsApp</strong> — pengiriman pesan dari formulir kontak sesuai kebijakan Meta.',
              '<strong>Google Fonts & Cloudflare CDN</strong> — untuk aset tipografi dan performa situs.'
            ]
          },
          {
            title: 'Keamanan Data',
            body: 'Saya menerapkan langkah-langkah keamanan yang wajar untuk melindungi informasi Anda. Namun, tidak ada metode transmisi internet atau penyimpanan elektronik yang 100% aman.',
            items: []
          },
          {
            title: 'Hak Anda',
            items: [
              'Mengakses, memperbarui, atau meminta penghapusan informasi pribadi Anda.',
              'Menolak pemrosesan data analitik dengan menonaktifkan cookie analytics.',
              'Mengajukan pertanyaan atau keluhan terkait privasi melalui email di bawah ini.'
            ]
          },
          {
            title: 'Kontak',
            body: 'Untuk pertanyaan terkait kebijakan privasi ini, hubungi: <a href="mailto:novaadisaputra.nasss@gmail.com">novaadisaputra.nasss@gmail.com</a>',
            items: []
          }
        ]
      },
      en: {
        title: 'Privacy Policy',
        updated: 'Last updated: April 2, 2026',
        effective: 'Effective from: January 1, 2024',
        intro: 'This Privacy Policy explains how Nova Adi Saputra ("I", "we") collects, uses, and protects the information you provide when visiting this portfolio at <strong>frostdev.my.id</strong>.',
        sections: [
          {
            title: 'Information We Collect',
            items: [
              'Anonymous analytics data via Google Analytics (Google Tag Manager ID: G-VN0QKEYW7Y) — such as pages visited, visit duration, and device information.',
              'Information you submit through the contact form: your name, type of service requested, and message. This data is sent directly to my WhatsApp and is not stored on the portfolio server.',
              'Cookies from third-party services (Google Analytics, Iubenda Cookie Consent) for analytics and legal compliance purposes.'
            ]
          },
          {
            title: 'How We Use Information',
            items: [
              'Understanding how visitors interact with the portfolio to improve content quality.',
              'Responding to inquiries or collaboration requests you submit.',
              'Ensuring compliance with applicable privacy regulations (GDPR, Indonesian PDP Law).'
            ]
          },
          {
            title: 'Cookies & Tracking',
            body: 'This website uses technical and analytics cookies. You can manage your cookie preferences via the consent banner that appears on your first visit. Analytics cookies are used anonymously and do not personally identify you.',
            items: []
          },
          {
            title: 'Third-Party Services',
            items: [
              '<strong>Google Analytics</strong> — anonymous visit analytics. Google\'s policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>',
              '<strong>Iubenda</strong> — cookie consent management in compliance with GDPR.',
              '<strong>WhatsApp</strong> — contact form message delivery per Meta\'s policies.',
              '<strong>Google Fonts & Cloudflare CDN</strong> — for typography assets and site performance.'
            ]
          },
          {
            title: 'Data Security',
            body: 'I apply reasonable security measures to protect your information. However, no method of internet transmission or electronic storage is 100% secure.',
            items: []
          },
          {
            title: 'Your Rights',
            items: [
              'Access, update, or request deletion of your personal information.',
              'Opt out of analytics data processing by disabling analytics cookies.',
              'Submit questions or complaints regarding privacy via the email below.'
            ]
          },
          {
            title: 'Contact',
            body: 'For questions regarding this privacy policy, contact: <a href="mailto:novaadisaputra.nasss@gmail.com">novaadisaputra.nasss@gmail.com</a>',
            items: []
          }
        ]
      }
    },
    terms: {
      id: {
        title: 'Syarat & Ketentuan',
        updated: 'Terakhir diperbarui: 2 April 2026',
        effective: 'Berlaku sejak: 1 Januari 2024',
        intro: 'Syarat dan Ketentuan ini mengatur penggunaan Anda terhadap website portfolio Nova Adi Saputra di <strong>frostdev.my.id</strong>. Dengan mengakses situs ini, Anda dianggap menyetujui ketentuan berikut.',
        sections: [
          {
            title: 'Konten Website',
            body: 'Seluruh konten di website ini — termasuk teks, kode, desain, gambar, dan proyek yang ditampilkan — adalah milik eksklusif Nova Adi Saputra kecuali dinyatakan lain.',
            items: [
              'Proyek yang ditampilkan merupakan hasil kerja nyata dan dipublikasikan seijin klien atau merupakan proyek pribadi.',
              'Logo, nama brand, dan identitas visual klien yang muncul dalam screenshot proyek adalah milik masing-masing klien.',
              'Anda tidak diperkenankan menyalin, mendistribusikan, atau menggunakan konten ini tanpa izin tertulis.'
            ]
          },
          {
            title: 'Penggunaan yang Diizinkan',
            items: [
              'Menjelajahi portfolio untuk keperluan evaluasi profesional atau rekrutmen.',
              'Mengunduh CV yang tersedia untuk keperluan review atau lamaran pekerjaan.',
              'Menghubungi saya melalui formulir kontak atau saluran resmi untuk kolaborasi.'
            ]
          },
          {
            title: 'Formulir Kontak & Komunikasi',
            body: 'Pesan yang dikirim melalui formulir kontak diteruskan langsung ke WhatsApp saya. Dengan mengirim formulir, Anda menyetujui:',
            items: [
              'Informasi yang Anda berikan akurat dan tidak menyesatkan.',
              'Anda tidak akan mengirim pesan spam, menyinggung, atau bersifat berbahaya.',
              'Saya berhak tidak merespons pesan yang tidak relevan atau tidak profesional.'
            ]
          },
          {
            title: 'Layanan Freelance',
            body: 'Website ini berfungsi sebagai sarana presentasi portofolio dan penghubung awal untuk proyek freelance. Ketentuan spesifik untuk setiap proyek diatur dalam perjanjian terpisah antara klien dan saya, mencakup:',
            items: [
              'Scope of work, timeline, dan deliverables yang disepakati bersama.',
              'Struktur pembayaran, metode, dan jadwal yang tertera dalam invoice atau kontrak.',
              'Hak kekayaan intelektual atas hasil kerja yang diserahkan setelah pembayaran lunas.',
              'Ketentuan revisi, maintenance, dan dukungan pasca-pengiriman.'
            ]
          },
          {
            title: 'Penafian (Disclaimer)',
            items: [
              'Website ini disediakan "apa adanya" tanpa jaminan ketersediaan atau bebas dari kesalahan.',
              'Saya tidak bertanggung jawab atas kerusakan atau kerugian yang timbul dari penggunaan informasi di website ini.',
              'Tautan ke situs eksternal (demo proyek, repo) disediakan untuk kemudahan; saya tidak bertanggung jawab atas konten pihak ketiga.',
              'Isi portfolio bersifat dinamis dan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.'
            ]
          },
          {
            title: 'Hukum yang Berlaku',
            body: 'Ketentuan ini diatur oleh hukum yang berlaku di Indonesia. Segala sengketa yang timbul akan diselesaikan secara musyawarah mufakat terlebih dahulu.',
            items: []
          },
          {
            title: 'Perubahan Ketentuan',
            body: 'Saya berhak memperbarui Syarat & Ketentuan ini sewaktu-waktu. Versi terbaru selalu dapat diakses di halaman ini dengan tanggal pembaruan yang tercantum.',
            items: []
          },
          {
            title: 'Kontak',
            body: 'Pertanyaan mengenai Syarat & Ketentuan ini dapat dikirim ke: <a href="mailto:novaadisaputra.nasss@gmail.com">novaadisaputra.nasss@gmail.com</a>',
            items: []
          }
        ]
      },
      en: {
        title: 'Terms & Conditions',
        updated: 'Last updated: April 2, 2026',
        effective: 'Effective from: January 1, 2024',
        intro: 'These Terms and Conditions govern your use of Nova Adi Saputra\'s portfolio website at <strong>frostdev.my.id</strong>. By accessing this site, you are deemed to agree to the following terms.',
        sections: [
          {
            title: 'Website Content',
            body: 'All content on this website — including text, code, design, images, and featured projects — is the exclusive property of Nova Adi Saputra unless otherwise stated.',
            items: [
              'Featured projects are real work results, published with client consent or are personal projects.',
              'Client logos, brand names, and visual identities appearing in project screenshots belong to their respective clients.',
              'You may not copy, distribute, or use this content without written permission.'
            ]
          },
          {
            title: 'Permitted Use',
            items: [
              'Browsing the portfolio for professional evaluation or recruitment purposes.',
              'Downloading the available CV for review or job application purposes.',
              'Contacting me via the contact form or official channels for collaboration.'
            ]
          },
          {
            title: 'Contact Form & Communications',
            body: 'Messages sent through the contact form are forwarded directly to my WhatsApp. By submitting the form, you agree that:',
            items: [
              'The information you provide is accurate and not misleading.',
              'You will not send spam, offensive, or harmful messages.',
              'I reserve the right not to respond to irrelevant or unprofessional messages.'
            ]
          },
          {
            title: 'Freelance Services',
            body: 'This website serves as a portfolio presentation and initial point of contact for freelance projects. Specific terms for each project are governed by a separate agreement between the client and myself, covering:',
            items: [
              'Mutually agreed scope of work, timeline, and deliverables.',
              'Payment structure, methods, and schedule as outlined in the invoice or contract.',
              'Intellectual property rights over deliverables, transferred upon full payment.',
              'Revision, maintenance, and post-delivery support terms.'
            ]
          },
          {
            title: 'Disclaimer',
            items: [
              'This website is provided "as is" without warranty of availability or freedom from errors.',
              'I am not liable for any damage or loss arising from the use of information on this website.',
              'Links to external sites (project demos, repositories) are provided for convenience; I am not responsible for third-party content.',
              'Portfolio content is dynamic and may change at any time without prior notice.'
            ]
          },
          {
            title: 'Governing Law',
            body: 'These terms are governed by applicable laws in Indonesia. Any disputes arising will first be resolved through deliberation and consensus.',
            items: []
          },
          {
            title: 'Changes to Terms',
            body: 'I reserve the right to update these Terms & Conditions at any time. The latest version is always accessible on this page with the update date noted.',
            items: []
          },
          {
            title: 'Contact',
            body: 'Questions regarding these Terms & Conditions may be sent to: <a href="mailto:novaadisaputra.nasss@gmail.com">novaadisaputra.nasss@gmail.com</a>',
            items: []
          }
        ]
      }
    }
  };

  /* ── Render ──────────────────────────────────────────────── */
  function buildLegalContent(type) {
    var lang = (typeof currentLang !== 'undefined' ? currentLang : 'id');
    var data = LEGAL[type][lang] || LEGAL[type].id;
    var html = '<div class="legal-header">';
    html += '<h2>' + data.title + '</h2>';
    html += '<div class="legal-meta">';
    html += '<span><i class="fas fa-calendar-alt"></i> ' + data.updated + '</span>';
    html += '<span><i class="fas fa-check-circle"></i> ' + data.effective + '</span>';
    html += '</div></div>';
    html += '<div class="legal-highlight"><strong>Ringkasan:</strong> ' + data.intro + '</div>';
    data.sections.forEach(function (sec, i) {
      html += '<h3><span class="legal-num">' + (i + 1) + '</span>' + sec.title + '</h3>';
      if (sec.body) html += '<p>' + sec.body + '</p>';
      if (sec.items && sec.items.length) {
        html += '<ul>';
        sec.items.forEach(function (item) { html += '<li>' + item + '</li>'; });
        html += '</ul>';
      }
    });
    return html;
  }

  /* ── Modal open/close ────────────────────────────────────── */
  function openLegal(type) {
    var modalId = type === 'privacy' ? 'privacyModal' : 'termsModal';
    var bodyId  = type === 'privacy' ? 'privacyBody'  : 'termsBody';
    var modal   = document.getElementById(modalId);
    var body    = document.getElementById(bodyId);
    if (!modal || !body) return;
    body.innerHTML = buildLegalContent(type);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLegal(modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ── Event binding ───────────────────────────────────────── */
  var btnPrivacy = document.getElementById('openPrivacy');
  var btnTerms   = document.getElementById('openTerms');
  if (btnPrivacy) btnPrivacy.addEventListener('click', function () { openLegal('privacy'); });
  if (btnTerms)   btnTerms.addEventListener('click',   function () { openLegal('terms');   });

  document.querySelectorAll('.legal-modal').forEach(function (modal) {
    modal.querySelectorAll('[data-close-legal]').forEach(function (el) {
      el.addEventListener('click', function () { closeLegal(modal); });
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.legal-modal.open').forEach(function (m) { closeLegal(m); });
  });

  /* re-render content when language is toggled */
  var langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var privacyOpen = document.getElementById('privacyModal');
      var termsOpen   = document.getElementById('termsModal');
      if (privacyOpen && privacyOpen.classList.contains('open')) {
        document.getElementById('privacyBody').innerHTML = buildLegalContent('privacy');
      }
      if (termsOpen && termsOpen.classList.contains('open')) {
        document.getElementById('termsBody').innerHTML = buildLegalContent('terms');
      }
    });
  }
})();

/* ── CV DOWNLOAD WITH TIMESTAMP ────────────────────────────── */
(function () {
  function makeCvHandler(btn) {
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var now = new Date();
      var pad = function (n) { return String(n).padStart(2, '0'); };
      var ts = now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) +
               '_' + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
      var filename = 'CV_Nova Adi Saputra_' + ts + '.pdf';
      var a = document.createElement('a');
      a.href = btn.href;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
  makeCvHandler(document.getElementById('cvDownload'));
  makeCvHandler(document.getElementById('cvDownloadFooter'));
})();

/* ── SMOOTH SCROLL ─────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── CHIP BOUNCE ───────────────────────────────────────────── */
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('mouseenter', function () { this.style.transition = 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)'; });
  chip.addEventListener('mouseleave', function () { this.style.transition = 'all 0.3s ease'; });
});
