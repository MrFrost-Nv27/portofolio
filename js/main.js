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
    description: 'Platform SaaS livechat real-time yang dapat diembed sebagai widget di website manapun dan sepenuhnya dapat dikustomisasi. Dibangun dengan React TypeScript + HeroUI sebagai frontend dan Laravel sebagai backend terpisah, mendukung multi-tenant, custom branding, serta manajemen percakapan terpusat.',
    description_en: 'Real-time SaaS livechat platform embeddable as a widget on any website with full customization support. Built with React TypeScript and HeroUI on the frontend and a separate Laravel backend, featuring multi-tenant support, custom branding, and centralized conversation management.',
    tag: ['React', 'TypeScript', 'HeroUI', 'Laravel', 'PostgreSQL', 'WebSocket'],
    url_demo: 'https://emildon.com/livechat',
    url_repo: 'https://github.com/MrFrost-Nv27/emildon-frontend',
    hero: 'assets/images/livechat/l1.png',
    images: ['assets/images/livechat/l1.png','assets/images/livechat/l2.png','assets/images/livechat/l3.png','assets/images/livechat/l4.png','assets/images/livechat/l5.png','assets/images/livechat/l6.png'],
  },
  {
    title: 'Pertamina - Dashboard Departemen Kesehatan',
    title_en: 'Pertamina - Health Department Dashboard',
    category: 'Web App',
    description: 'Dashboard manajemen kesehatan untuk salah satu cabang Pertamina (RU IV). Platform ini membantu divisi kesehatan dalam mengelola, memantau, dan mendistribusikan task secara terpusat — mencakup penugasan tenaga medis, tracking progress, dan pelaporan operasional berbasis data.',
    description_en: 'Health management dashboard for a Pertamina branch (RU IV). The platform assists the health division in centrally managing, monitoring, and distributing tasks — covering medical staff assignment, progress tracking, and data-driven operational reporting.',
    tag: ['PHP Native', 'MySQL', 'Tailwind CSS', 'JavaScript'],
    url_demo: 'https://healthruiv.shutenk-store.xyz/',
    url_repo: 'https://github.com/MrFrost-Nv27/healthruiv',
    hero: 'assets/images/healthruiv/h1.png',
    images: ['assets/images/healthruiv/h1.png','assets/images/healthruiv/h2.png','assets/images/healthruiv/h3.png','assets/images/healthruiv/h4.png'],
  },
  {
    title: 'Falcom FTTH App',
    title_en: 'Falcom FTTH App',
    category: 'Web App',
    description: 'Platform desain jaringan FTTH (Fiber to the Home) interaktif yang memungkinkan pengguna menggambar infrastruktur jaringan langsung di atas peta dengan skala dunia nyata. Dilengkapi fitur estimasi harga material otomatis dan export resume proyek. Dibangun dengan SolidJS + Material UI sebagai frontend, MapLibre GL untuk rendering peta, dan CodeIgniter sebagai backend.',
    description_en: 'Interactive FTTH (Fiber to the Home) network design platform that lets users draw network infrastructure directly on a real-world-scale map. Features automatic material cost estimation and project summary export. Built with SolidJS and Material UI on the frontend, MapLibre GL for map rendering, and CodeIgniter as the backend.',
    tag: ['SolidJS', 'Material UI', 'MapLibre GL', 'CodeIgniter', 'JavaScript'],
    url_demo: 'https://ftth.falcom-technology.com/',
    url_repo: 'https://github.com/MrFrost-Nv27/ftthapp',
    hero: 'assets/images/ftth/f1.png',
    images: ['assets/images/ftth/f1.png','assets/images/ftth/f2.png','assets/images/ftth/f3.png','assets/images/ftth/f4.png','assets/images/ftth/f5.png','assets/images/ftth/f6.png','assets/images/ftth/f7.png'],
  },
  {
    title: 'Passion Japan App',
    title_en: 'Passion Japan App',
    category: 'Web App',
    description: 'Platform Learning Management System (LMS) untuk Lembaga Duta Kerja Passion Japan. Mengelola data siswa, data perusahaan mitra, keuangan, modul pembelajaran, dan ujian secara terpusat. Fitur unggulan: translasi CV Indonesia ke Jepang secara otomatis menggunakan Gemini API dengan queue worker. Dibangun dengan monorepo Laravel + React, HeroUI sebagai komponen UI.',
    description_en: 'Learning Management System (LMS) platform for Passion Japan, a Japanese work placement agency. Centralizes student data, partner company records, finance, learning modules, and assessments. Highlights include automated Indonesian-to-Japanese CV translation powered by the Gemini API with a queue worker. Built as a Laravel + React monorepo with HeroUI components.',
    tag: ['Laravel', 'React', 'HeroUI', 'Gemini API', 'MySQL'],
    url_demo: 'https://passionjapan.co.id/',
    url_repo: 'https://gitlab.com/passionjapanid1/passionjapanid',
    hero: 'assets/images/passionjapan/pj1.png',
    images: ['assets/images/passionjapan/pj1.png','assets/images/passionjapan/pj2.png'],
  },
  {
    title: 'Pemesanan Travel Mobil',
    title_en: 'Car Travel Booking App',
    category: 'Mobile',
    description: 'Aplikasi mobile sistem pemesanan travel mobil lengkap — mencakup manajemen armada kendaraan, data supir, penjadwalan perjalanan, pemesanan tiket, dan pembayaran. Dibangun dengan Kotlin native Android dan Firebase sebagai backend real-time.',
    description_en: 'Full-featured mobile car travel booking system — covering vehicle fleet management, driver data, trip scheduling, ticket booking, and payment processing. Built with native Kotlin for Android and Firebase as the real-time backend.',
    tag: ['Kotlin', 'Android', 'Firebase'],
    url_demo: '',
    url_repo: 'https://github.com/MrFrost-Nv27/mobilkt',
    hero: '',
    images: [],
  },
  {
    title: 'Manajemen Sparepart Bengkel',
    title_en: 'Workshop Spare Parts Manager',
    category: 'Mobile',
    description: 'Aplikasi mobile manajemen sparepart bengkel untuk memudahkan pencatatan inventori barang masuk dan keluar, stok real-time, serta riwayat transaksi. Dibangun dengan Flutter (Dart) dan Firebase sebagai database.',
    description_en: 'Mobile spare parts management app for workshops, simplifying inventory tracking of incoming and outgoing parts, real-time stock levels, and transaction history. Built with Flutter (Dart) and Firebase.',
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
    description: 'Aplikasi prediksi prestasi akademik siswa menggunakan algoritma Backpropagation Neural Network. Membantu institusi pendidikan mengidentifikasi siswa berisiko secara dini berdasarkan data historis. Dibangun dengan Python, Flask sebagai web framework, dan JavaScript untuk antarmuka interaktif.',
    description_en: 'Student academic performance prediction app using a Backpropagation Neural Network algorithm. Helps educational institutions identify at-risk students early based on historical data. Built with Python, Flask as the web framework, and JavaScript for the interactive interface.',
    tag: ['Python', 'Flask', 'Backpropagation', 'JavaScript'],
    url_demo: '',
    url_repo: 'https://github.com/MrFrost-Nv27/backprosiswa',
    hero: '',
    images: [],
  },
  {
    title: 'Analisa Kredit Macet',
    title_en: 'Non-Performing Loan Analysis',
    category: 'AI',
    description: 'Aplikasi analisis dan prediksi kredit macet menggunakan algoritma Logistic Regression. Membantu lembaga keuangan menilai risiko kredit calon nasabah secara otomatis berdasarkan data historis pinjaman. Dibangun dengan Python, Quart (async web framework), dan JavaScript.',
    description_en: 'Non-performing loan analysis and prediction app using Logistic Regression. Helps financial institutions automatically assess credit risk for loan applicants based on historical lending data. Built with Python, Quart (async web framework), and JavaScript.',
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
    description: 'Aplikasi rekomendasi produk berbasis association rule mining menggunakan algoritma Apriori. Menganalisis pola pembelian untuk menghasilkan rekomendasi produk yang relevan dan meningkatkan cross-selling. Dibangun dengan Python, Flask sebagai web framework, dan JavaScript.',
    description_en: 'Product recommendation app based on association rule mining using the Apriori algorithm. Analyzes purchase patterns to generate relevant product recommendations and boost cross-selling. Built with Python, Flask as the web framework, and JavaScript.',
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

  window.initParticles = function () {
    particles = Array.from({ length: 70 }, () => new Dot());
  };

  function connectDots() {
    const c = getColors();
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${c.line},${c.lineA * (1 - d / 110)})`;
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
    requestAnimationFrame(loop);
  }

  resize();
  window.initParticles();
  loop();
  window.addEventListener('resize', () => { resize(); window.initParticles(); });
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
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalGallery = document.getElementById('modalGallery');
  const modalLiveLink = document.getElementById('modalLiveLink');
  const modalRepoLink = document.getElementById('modalRepoLink');
  const modalClose = document.getElementById('projectModalClose');

  function setLink(linkEl, value) {
    if (!linkEl) return;
    const url = (value || '').trim();
    if (!url) {
      linkEl.hidden = true;
      linkEl.removeAttribute('href');
      return;
    }
    linkEl.hidden = false;
    linkEl.href = url;
  }

  function renderGallery(images) {
    modalGallery.innerHTML = '';
    if (!images.length) {
      const noImage = document.createElement('div');
      noImage.className = 'modal-no-image';
      noImage.textContent = (TRANSLATIONS[currentLang] || TRANSLATIONS.id)['modal.noImage'];
      modalGallery.appendChild(noImage);
      return;
    }

    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Project screenshot';
      img.loading = 'lazy';
      modalGallery.appendChild(img);
    });
  }

  function openModal(card) {
    const title = card.querySelector('h3')?.textContent?.trim() || 'Project';
    const desc = card.querySelector('p')?.textContent?.trim() || '';
    const images = (card.dataset.images || '').split(',').map(s => s.trim()).filter(Boolean);

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
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
  }

  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  // Delegation — works for cards rendered at any time
  grid.addEventListener('click', e => {
    if (e.target.closest('a, button')) return;
    const card = e.target.closest('.proj-card');
    if (card) openModal(card);
  });

  grid.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.proj-card');
      if (card) { e.preventDefault(); openModal(card); }
    }
  });

  // Overlay link delegation
  grid.addEventListener('click', e => {
    const link = e.target.closest('.proj-overlay a[href="#"]');
    if (link) { e.preventDefault(); const card = link.closest('.proj-card'); if (card) openModal(card); }
  });

  modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  if (modalClose) modalClose.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();

/* ── CUSTOM CURSOR (desktop only) ──────────────────────────── */
(function () {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function raf() {
    rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(raf);
  })();
  document.querySelectorAll('a, button, .chip, .filter-btn, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('big');  ring.classList.add('big'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('big'); ring.classList.remove('big'); });
  });
  // Delegation for dynamically rendered cards
  const _cursorOver = e => {
    if (e.target.closest('.proj-card, .oval-btn')) { dot.classList.add('big'); ring.classList.add('big'); }
  };
  const _cursorOut = e => {
    if (e.target.closest('.proj-card, .oval-btn')) { dot.classList.remove('big'); ring.classList.remove('big'); }
  };
  document.addEventListener('mouseover', _cursorOver);
  document.addEventListener('mouseout',  _cursorOut);
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
