package seed

import "portofolio/internal/models"

// ProfileData is ported verbatim from the legacy js/main.js TRANSLATIONS object
// and the mailto:/wa.me links baked into index.html.
var ProfileData = models.Profile{
	Name:                "Nova Adi Saputra",
	RoleID:              "Full Stack Developer",
	RoleEn:              "Full Stack Developer",
	BioP1ID:             "Halo! Saya Nova Adi Saputra, bisa dipanggil <strong>Nova</strong>. Saya adalah <strong>Full Stack Developer</strong> dan freelancer sejak tahun 2020 hingga sekarang. Saya mengerjakan berbagai proyek kecil, menengah, hingga institusi dengan pendekatan teknis yang terukur dan berorientasi hasil.",
	BioP2ID:             "Saya fokus membangun solusi end-to-end dari frontend hingga backend, API, database, deployment, dan maintenance. Saya percaya solusi yang baik harus scalable, aman, dan memberi dampak nyata bagi pengguna.",
	BioP1En:             "Hello! I am Nova Adi Saputra, and you can call me <strong>Nova</strong>. I am a <strong>Full Stack Developer</strong> and freelancer since 2020 until now. I handle small, medium, and institutional projects with a practical, outcome-driven engineering approach.",
	BioP2En:             "I focus on building end-to-end solutions across frontend, backend, APIs, databases, deployment, and maintenance. Good solutions should be scalable, secure, and deliver real impact.",
	Email:               "novaadisaputra.nasss@gmail.com",
	WhatsappNumber:      "6282241198283",
	Address:             "Jl. Krendang Tengah No.29, Krendang, Kec. Tambora, Jakarta Barat 11260",
	ExperienceSinceYear: 2020,
	ProjectsCompleted:   50,
	LanguagesCount:      5,
	GithubURL:           "https://github.com/MrFrost-Nv27",
	GitlabURL:           "https://gitlab.com/MrFrost-Nv27",
	LinkedinURL:         "https://www.linkedin.com/in/nova-adi-saputra-7348a730a",
	InstagramURL:        "https://www.instagram.com/nvdsptr/",
	// PhotoPath / CVPath are filled in by the seed command after copying the source assets.
}

type SkillCategorySeed struct {
	NameID string
	NameEn string
	Chips  []string
}

// SkillCategoriesData is transcribed from the hardcoded markup in index.html:264-325.
var SkillCategoriesData = []SkillCategorySeed{
	{
		NameID: "Frontend",
		NameEn: "Frontend",
		Chips:  []string{"HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue.js", "Tailwind CSS", "Bootstrap"},
	},
	{
		NameID: "Backend",
		NameEn: "Backend",
		Chips:  []string{"PHP", "Laravel", "Node.js", "Express.js", "C# / .NET", "Go", "Python", "REST API", "GraphQL"},
	},
	{
		NameID: "Artificial Intelligence",
		NameEn: "Artificial Intelligence",
		Chips:  []string{"Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "OpenCV", "LLM Integration"},
	},
	{
		NameID: "Database & Tools",
		NameEn: "Database & Tools",
		Chips:  []string{"MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase", "Git", "Docker", "Linux"},
	},
}

type ProjectSeed struct {
	TitleID       string
	TitleEn       string
	Category      string
	DescriptionID string
	DescriptionEn string
	Tags          []string
	URLDemo       string
	URLRepo       string
	Hero          string // source path relative to repo root, empty if none
	Images        []string
}

// ProjectsData is ported verbatim from the PROJECTS array in js/main.js.
var ProjectsData = []ProjectSeed{
	{
		TitleID:       "Livechat Widget App",
		TitleEn:       "Livechat Widget App",
		Category:      "Web App",
		DescriptionID: "Platform SaaS livechat yang dapat diembed di website klien mana pun hanya dengan satu baris JavaScript snippet — aman, real-time, dan sepenuhnya dapat dikustomisasi sesuai branding. Dibangun fullstack dengan arsitektur berlapis: Laravel REST API, dedicated WebSocket server untuk komunikasi dua arah berlatensi rendah, PostgreSQL sebagai penyimpanan data utama, dan Redis untuk pub/sub messaging serta session caching. Tantangan utama yang berhasil dipecahkan: menjamin keamanan cross-domain embedding di domain klien yang berbeda-beda, sekaligus memastikan seluruh aliran pesan berjalan mulus dan instan di skala multi-tenant.",
		DescriptionEn: "A SaaS livechat platform embeddable on any client website with a single JavaScript snippet — secure, real-time, and fully brandable. Built fullstack with a layered architecture: a Laravel REST API, a dedicated WebSocket server for low-latency bidirectional messaging, PostgreSQL as the primary data store, and Redis for pub/sub brokering and session caching. The core engineering challenge: ensuring safe cross-domain embedding across diverse client domains while keeping all message flows seamless and instant at multi-tenant scale.",
		Tags:          []string{"React", "TypeScript", "HeroUI", "Laravel", "WebSocket", "PostgreSQL", "Redis"},
		URLDemo:       "https://emildon.com/livechat",
		URLRepo:       "https://github.com/MrFrost-Nv27/emildon-frontend",
		Hero:          "assets/images/livechat/l1.png",
		Images: []string{
			"assets/images/livechat/l1.png", "assets/images/livechat/l2.png", "assets/images/livechat/l3.png",
			"assets/images/livechat/l4.png", "assets/images/livechat/l5.png", "assets/images/livechat/l6.png",
		},
	},
	{
		TitleID:       "Pertamina - Dashboard Departemen Kesehatan",
		TitleEn:       "Pertamina - Health Department Dashboard",
		Category:      "Web App",
		DescriptionID: "Dashboard operasional kesehatan untuk cabang Pertamina RU IV — memberikan divisi medis kemampuan mencatat, memantau, dan mendistribusikan task kerja harian secara terpusat. Dibangun di atas PHP native dengan pola MVC custom buatan sendiri yang terinspirasi Laravel: terstruktur dan mudah di-maintain, namun tetap ringan tanpa overhead framework besar. Sistem dilengkapi notifikasi email otomatis pada event-event kritis, serta RBAC (Role-Based Access Control) dengan layer permission granular yang memastikan akses data terlindungi sesuai hierarki organisasi.",
		DescriptionEn: "An operational health dashboard for Pertamina's RU IV branch — giving the medical division a centralized hub to log, monitor, and distribute daily work tasks. Built on PHP native with a custom self-made MVC pattern inspired by Laravel: structured and maintainable, yet lean without the overhead of a full framework. Features automated email notifications on critical events, and RBAC (Role-Based Access Control) with granular permission layers that enforce data access boundaries across the organizational hierarchy.",
		Tags:          []string{"PHP Native", "Custom MVC", "MySQL", "Tailwind CSS", "RBAC", "Email Notification"},
		URLDemo:       "https://healthruiv.shutenk-store.xyz/",
		URLRepo:       "https://github.com/MrFrost-Nv27/healthruiv",
		Hero:          "assets/images/healthruiv/h1.png",
		Images: []string{
			"assets/images/healthruiv/h1.png", "assets/images/healthruiv/h2.png",
			"assets/images/healthruiv/h3.png", "assets/images/healthruiv/h4.png",
		},
	},
	{
		TitleID:       "Falcom FTTH App",
		TitleEn:       "Falcom FTTH App",
		Category:      "Web App",
		DescriptionID: "Platform perancangan jaringan FTTH (Fiber to the Home) berbasis web yang memungkinkan teknisi dan perencana jaringan mendesain infrastruktur serat optik langsung di atas peta dunia nyata secara interaktif. Dibangun dengan arsitektur monorepo CodeIgniter 4 sebagai backend dan SolidJS + Vanilla JS sebagai frontend reaktif — codebase ringkas namun fitur komprehensif. Tantangan utama: merender dan menghubungkan puluhan komponen jaringan (ODP, OLT, splitter, kabel, dll.) dengan karakteristik berbeda di atas layer peta yang sama, memungkinkan koneksi kabel antar-node secara visual, serta menghitung nilai redaman sinyal secara otomatis di setiap jalur.",
		DescriptionEn: "A web-based FTTH (Fiber to the Home) network design platform that lets engineers and planners design fiber-optic infrastructure interactively on a real-world map. Built as a CodeIgniter 4 monorepo with SolidJS + Vanilla JS powering a reactive, performant frontend — lean codebase with comprehensive capabilities. The central engineering challenge: rendering and connecting dozens of heterogeneous network components (ODP, OLT, splitters, cables, etc.) on a shared map layer, enabling visual cable connections between nodes, and automatically computing signal attenuation values across every path.",
		Tags:          []string{"SolidJS", "Material UI", "MapLibre GL", "CodeIgniter 4", "JavaScript"},
		URLDemo:       "https://ftth.falcom-technology.com/",
		URLRepo:       "https://github.com/MrFrost-Nv27/ftthapp",
		Hero:          "assets/images/ftth/f1.png",
		Images: []string{
			"assets/images/ftth/f1.png", "assets/images/ftth/f2.png", "assets/images/ftth/f3.png",
			"assets/images/ftth/f4.png", "assets/images/ftth/f5.png", "assets/images/ftth/f6.png", "assets/images/ftth/f7.png",
		},
	},
	{
		TitleID:       "Passion Japan App",
		TitleEn:       "Passion Japan App",
		Category:      "Web App",
		DescriptionID: "Platform LMS terintegrasi dan sistem manajemen administrasi untuk LPK Passion Japan — mengelola ekosistem persiapan tenaga kerja ke Jepang secara end-to-end: data peserta, perusahaan mitra, keuangan, modul pembelajaran, dan ujian, semuanya dalam satu sistem terpadu. Dibangun di atas monorepo Laravel 12 + React dengan HeroUI. Fitur paling kompleks: pipeline generate CV yang menerjemahkan profil peserta dari Bahasa Indonesia ke Bahasa Jepang secara otomatis menggunakan Gemini API, mengemas hasilnya menjadi file siap export (PDF), dan mendistribusikan job generasinya lewat queue batch worker sehingga proses berat tidak pernah memblokir request utama.",
		DescriptionEn: "An integrated LMS and administration management platform for Passion Japan LPK — managing the full Japan-bound workforce preparation pipeline end-to-end: participant records, partner companies, finances, learning modules, and assessments, all unified in one system. Built as a Laravel 12 + React monorepo with HeroUI components. The most complex feature: a CV generation pipeline that automatically translates participant profiles from Indonesian to Japanese using the Gemini API, packages the output into exportable PDF files, and dispatches batch generation jobs through a queue worker — ensuring no heavy process ever blocks the main request thread.",
		Tags:          []string{"Laravel 12", "React", "HeroUI", "Gemini API", "Queue Worker", "MySQL"},
		URLDemo:       "https://passionjapan.co.id/",
		URLRepo:       "https://gitlab.com/passionjapanid1/passionjapanid",
		Hero:          "assets/images/passionjapan/pj1.png",
		Images:        []string{"assets/images/passionjapan/pj1.png", "assets/images/passionjapan/pj2.png"},
	},
	{
		TitleID:       "Pemesanan Travel Mobil",
		TitleEn:       "Car Travel Booking App",
		Category:      "Mobile",
		DescriptionID: "Aplikasi mobile pemesanan travel mobil antar-kota yang menangani seluruh alur operasional dalam satu genggaman — mulai dari manajemen armada kendaraan dan data pengemudi, penjadwalan rute, hingga pemesanan tiket dan pembayaran oleh penumpang secara real-time. Dibangun dengan Kotlin native Android mengikuti pola arsitektur MVVM, dengan Firebase sebagai backend cloud untuk sinkronisasi data instan dan notifikasi push.",
		DescriptionEn: "An intercity car travel booking mobile app that handles the entire operational flow in one place — from fleet and driver management to route scheduling, passenger ticket booking, and real-time payment processing. Built with native Android Kotlin following MVVM architecture, with Firebase as the cloud backend for instant data synchronization and push notifications.",
		Tags:          []string{"Kotlin", "Android", "Firebase", "MVVM"},
		URLRepo:       "https://github.com/MrFrost-Nv27/mobilkt",
	},
	{
		TitleID:       "Manajemen Sparepart Bengkel",
		TitleEn:       "Workshop Spare Parts Manager",
		Category:      "Mobile",
		DescriptionID: "Aplikasi mobile manajemen inventori sparepart untuk bengkel kendaraan — memudahkan pencatatan mutasi barang masuk dan keluar, monitoring level stok secara real-time, dan akses riwayat transaksi lengkap kapan saja. Dibangun dengan Flutter (Dart) untuk pengalaman yang konsisten di Android maupun iOS, dengan Firebase sebagai backend cloud yang responsif dan sinkron.",
		DescriptionEn: "A mobile spare parts inventory management app for vehicle workshops — streamlining stock-in/out logging, real-time inventory level monitoring, and on-demand access to full transaction history. Built with Flutter (Dart) for a consistent cross-platform experience on Android and iOS, backed by a responsive and synchronized Firebase cloud backend.",
		Tags:          []string{"Flutter", "Dart", "Firebase"},
		URLRepo:       "https://github.com/MrFrost-Nv27/appsparepart",
	},
	{
		TitleID:       "Forecast Prestasi Siswa",
		TitleEn:       "Student Performance Forecast",
		Category:      "AI",
		DescriptionID: "Aplikasi prediksi prestasi akademik berbasis machine learning menggunakan algoritma Backpropagation Neural Network — membantu institusi pendidikan mengidentifikasi lebih awal siswa yang berisiko mengalami penurunan performa, sehingga intervensi pengajar dapat dilakukan tepat sasaran dan tepat waktu. Model dilatih dari data historis nilai dan kehadiran. Dibangun dengan Python, Flask sebagai REST API, dan JavaScript untuk antarmuka visualisasi hasil yang intuitif.",
		DescriptionEn: "A machine learning–powered academic performance prediction app using a Backpropagation Neural Network — helping educational institutions proactively identify students at risk of underperforming, enabling timely and targeted teacher intervention. The model is trained on historical grade and attendance data. Built with Python, Flask as the REST API, and JavaScript for an intuitive result visualization interface.",
		Tags:          []string{"Python", "Flask", "Neural Network", "JavaScript"},
		URLRepo:       "https://github.com/MrFrost-Nv27/backprosiswa",
	},
	{
		TitleID:       "Analisa Kredit Macet",
		TitleEn:       "Non-Performing Loan Analysis",
		Category:      "AI",
		DescriptionID: "Aplikasi prediksi risiko kredit macet berbasis machine learning menggunakan algoritma Logistic Regression — membantu lembaga keuangan mengevaluasi kelayakan kredit calon peminjam secara otomatis dari data historis pinjaman, mengurangi ketergantungan pada penilaian manual, dan meminimasi potensi kerugian akibat kredit bermasalah. Dibangun dengan Python dan Quart (async web framework) untuk penanganan request yang efisien dan responsif.",
		DescriptionEn: "A machine learning–powered non-performing loan prediction app using Logistic Regression — helping financial institutions automatically evaluate loan applicant creditworthiness from historical lending data, reducing reliance on manual review and minimizing potential losses from bad debt. Built with Python and Quart (async web framework) for efficient and responsive request handling.",
		Tags:          []string{"Python", "Quart", "Logistic Regression", "JavaScript"},
		URLRepo:       "https://github.com/MrFrost-Nv27/logisticregkredit",
	},
	{
		TitleID:       "Asosiasi Rekomendasi Produk",
		TitleEn:       "Product Recommendation Association",
		Category:      "AI",
		DescriptionID: "Sistem rekomendasi produk berbasis association rule mining menggunakan algoritma Apriori — menganalisis pola pembelian historis untuk menemukan kombinasi produk yang sering dibeli bersama, lalu menghasilkan rekomendasi cross-selling yang relevan dan actionable. Membantu bisnis retail meningkatkan nilai transaksi rata-rata menggunakan insight berbasis data. Dibangun dengan Python, Flask, dan JavaScript.",
		DescriptionEn: "A product recommendation engine based on association rule mining using the Apriori algorithm — analyzing historical purchase patterns to surface frequently co-purchased product combinations and generate relevant, actionable cross-selling recommendations. Helps retail businesses increase average transaction value through data-driven insights. Built with Python, Flask, and JavaScript.",
		Tags:          []string{"Python", "Flask", "Apriori", "JavaScript"},
		URLRepo:       "https://github.com/MrFrost-Nv27/webapriori",
	},
}
