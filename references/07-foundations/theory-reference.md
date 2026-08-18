---
status: ACTIVE
type: REFERENCE
canonical: false
owner: technical-director
last_reviewed: 2026-08-18
---

# Referensi Teori Pendukung — Lentera Pudar (Master Theory Bible)
### Kerangka Teori Desain, Psikologi, Technical Art & Produksi untuk AI Agent (Blender 5.2 LTS + Unreal Engine 5)

Dokumen ini berisi kerangka teori komprehensif yang menjadi fondasi dan "bahasa bersama" (*The Why*) untuk proyek **Lentera Pudar: The First Spark**. Dokumen ini melengkapi Master GDD, Moodboard Referensi, dan Dokumen Visi Kreatif.

---

## DAFTAR ISI
1. [BAB 1: Teori Desain Game (Game Design Theory)](#1-teori-desain-game-game-design-theory)
2. [BAB 2: Teori Level Design](#2-teori-level-design)
3. [BAB 3: Teori Naratif (Narrative Design Theory)](#3-teori-naratif-narrative-design-theory)
4. [BAB 4: Teori Desain Combat](#4-teori-desain-combat)
5. [BAB 5: Teori Kamera & Sinematografi](#5-teori-kamera--sinematografi)
6. [BAB 6: Teori Warna & Pencahayaan](#6-teori-warna--pencahayaan)
7. [BAB 7: Teori Audio](#7-teori-audio)
8. [BAB 8: Teori UI/UX](#8-teori-uiux)
9. [BAB 9: Teori Animasi](#9-teori-animasi)
10. [BAB 10: Teori Rigging & Simulasi Kain](#10-teori-rigging--simulasi-kain)
11. [BAB 11: Teori Shader & Material (Technical Art)](#11-teori-shader--material-technical-art)
12. [BAB 12: Teori Balancing & Progresi Sistem](#12-teori-balancing--progresi-sistem)
13. [BAB 13: Teori Fisika Tingkat Lanjut (Terapan Real-Time Engine)](#13-teori-fisika-tingkat-lanjut-terapan-untuk-real-time-engine)
14. [BAB 14: Teori Matematika Tingkat Lanjut (Terapan)](#14-teori-matematika-tingkat-lanjut-terapan)
15. [BAB 15: Teori Psikologi Pemain (Player Psychology)](#15-teori-psikologi-pemain-player-psychology)
16. [BAB 16: Teori Tambahan yang Layak Dipertimbangkan](#16-teori-tambahan-yang-layak-dipertimbangkan)
17. [BAB 17: Teori Produksi & Pipeline Teknis](#17-teori-produksi--pipeline-teknis-sering-terlupakan-tapi-krusial)
18. [BAB 18: Teori Tambahan Lain (Penutup Cakupan Produksi)](#18-teori-tambahan-lain-penutup-cakupan-produksi)
19. [BAB 19: Cara Penggunaan Dokumen Ini untuk AI Agent](#19-cara-memberikan-dokumen-ini-ke-ai-agent)

---

## 1. Teori Desain Game (Game Design Theory)

### A. MDA Framework (Mechanics – Dynamics – Aesthetics)
Kerangka dasar: **Mechanics** (aturan & sistem mentah — Curse Meter, combo attack) menghasilkan **Dynamics** (perilaku pemain saat bermain — kapan pemain memilih menyerang vs menghindar) yang menghasilkan **Aesthetics** (pengalaman emosional akhir — rasa melankolis, tekanan, lega). Agent perlu memahami bahwa tiap rancangan mekanik harus ditelusuri balik ke Aesthetic yang diinginkan (dalam kasus ini: melankolis-hangat), bukan dirancang demi kompleksitas semata.

### B. Core Loop & Feedback Loop
Setiap game punya loop inti yang berulang (eksplorasi → pertarungan → hadiah/progres naratif → eksplorasi lagi). Untuk Lentera Pudar: **Jelajah dungeon → hadapi jiwa beku/musuh → nyalakan Altar Duka → syal memendek (biaya) → dapat kemampuan baru (hadiah) → lanjut sektor.** Agent perlu menjaga *tight feedback loop* ini — tiap aksi pemain harus punya konsekuensi yang terasa dalam waktu singkat, bukan tertunda terlalu lama.

### C. Flow Theory (Csikszentmihalyi)
Pemain tetap terlibat saat tantangan seimbang dengan skill mereka — tidak terlalu mudah (bosan) atau terlalu sulit (frustrasi/cemas). Kurva kesulitan tiap sektor (Denial → Acceptance) sebaiknya naik bertahap, dengan boss sebagai puncak lokal, lalu sedikit penurunan tensi di awal sektor berikutnya sebagai jeda napas sebelum naik lagi.

### D. Reward Schedule & Player Motivation
Ada reward *intrinsik* (kepuasan menuntaskan mekanik parry sulit) dan *ekstrinsik* (kemampuan baru sekuensial). Untuk game bertema grief seperti ini, reward condong ke intrinsik/naratif (potongan memori, dialog, perubahan visual dunia) dibanding sekadar loot — supaya tetap konsisten dengan nuansa "poetic dark fantasy", bukan grinding RPG biasa.

### E. Batasan Eksplisit: Larangan Mekanik RPG Konvensional
Untuk menjaga integritas emosional semesta Lentera Pudar, sistem progresi secara tegas MELARANG:
1. **Free-Form Skill Tree**: Kemampuan baru murni terbuka sekuensial via Model GRIS di 5 Altar Duka.
2. **Stat Leveling Numerik (STR, DEX, INT, Level 1..99)**: Kaelen mengandalkan pembacaan telegraf kinetik dan penguasaan timing pemain, bukan akumulasi angka statistik.
3. **Loot Drop Acak & Grinding Koin**: Tidak ada mata uang emas, grinding monster berulang, atau gacha item.

---

## 2. Teori Level Design

### A. Teaching Through Geometry (Level as Tutorial)
Bentuk lorong, penempatan cahaya, dan reruntuhan bisa "mengajari" pemain tanpa teks. Contoh: lorong sempit dengan satu sumber cahaya di ujung secara naluriah mengarahkan pemain maju — ini prinsip dari level design modern (dipopulerkan lewat analisis level Half-Life/Uncharted).

### B. Critical Path vs Optional Path
Setiap sektor idealnya punya *critical path* (rute wajib ke boss) dan *optional path* (area tersembunyi via mekanik eyepatch/perception, sesuai arah desain referensi Hellblade). Saat membangun layout, tim perlu membedakan geometri yang wajib dilalui dari geometri opsional agar arah perjalanan tetap terbaca.

### C. Sightlines & Landmarking
Pemain menavigasi dungeon besar lewat *landmark* visual yang terlihat dari jauh (menara, cahaya syal, struktur unik). Setiap sektor sebaiknya punya satu landmark dominan yang terlihat dari banyak titik, supaya pemain tidak tersesat tanpa perlu minimap besar — selaras dengan arah desain minimal-HUD yang didokumentasikan untuk *Lentera Pudar*.

### D. Pacing melalui Ritme Ruang (Combat Arena vs Breather Room)
Selingi ruang pertempuran intens dengan "breather room" — area tenang untuk npc dialog, checkpoint, atau sekadar jeda visual. Ini penting khusus untuk game bertema berat (grief/trauma) supaya pemain tidak lelah secara emosional terus-menerus.

---

## 3. Teori Naratif (Narrative Design Theory)

### A. Environmental Storytelling
Cerita disampaikan lewat detail lingkungan (pose patung beku, susunan barang di reruntuhan, coretan dinding) tanpa dialog eksplisit — cocok untuk *The Silent Crypts* dan *Hall of Mirrors*. Agent bisa diberi instruksi eksplisit: "tiap prop di sektor ini harus menyiratkan potongan cerita penghuni sebelumnya."

### B. Show, Don't Tell
Terapkan terutama pada momen pengorbanan syal Aina — biarkan visual (syal memendek, cahaya meredup, ekspresi wajah Kaelen) berbicara tanpa banyak dialog penjelas, sesuai arah desain kamera dekat yang didokumentasikan dalam creative vision dan GDD.

### C. Kübler-Ross Model (5 Stages of Grief) sebagai Struktur Naratif
Model ini menjadi fondasi desain struktur lima sektor. Prinsip pentingnya: tiap tahap grief bukan linear murni di kehidupan nyata (orang bisa bolak-balik antar tahap) — pertimbangkan momen kecil "relapse" tematik di sektor akhir (mis. elemen Denial muncul sekilas di sektor Acceptance) supaya terasa psikologis, bukan sekadar checklist lima level.

### D. Character Arc Theory (Internal vs External Goal)
Kaelen punya *external goal* (menerangi dungeon, mencapai puncak) dan *internal goal* (menerima rasa sakitnya sendiri). Ketegangan dramatis muncul saat dua goal ini bertentangan — misalnya pemain "ingin" menyelamatkan lebih banyak jiwa beku (external), tapi tiap penyelamatan mempercepat habisnya syal Aina (cost personal/internal).

---

## 4. Teori Desain Combat

### A. Telegraphing & Readability
Musuh harus punya *tell* visual jelas sebelum menyerang (wind-up animation, perubahan warna, particle effect) supaya pemain punya waktu bereaksi. Penting terutama untuk kristal es besar/boss agar terasa adil meski sulit.

### B. Hitstop & Juice
"Hitstop" (jeda singkat sepersekian detik saat pukulan kena) dan efek visual/audio pendukung ("juice" — screen shake kecil, particle pecah, sound impact) membuat combat terasa berat dan memuaskan meski sistem di baliknya sederhana. Relevan untuk *Bare Hand Punch Combo* dan *Cursed Ice Strike* Kaelen.

### C. Poise/Stagger System
Selain HP, musuh (dan mungkin Kaelen) bisa punya meter "keseimbangan" — kena serangan cukup banyak → stagger → window damage besar terbuka. Ini menambah kedalaman taktis tanpa perlu combo mashing kompleks, cocok dengan filosofi "berat di timing" ala Hellblade.

### D. Risk-Reward Loop pada Curse Meter Surge
Prinsip dari sistem "berisiko-hadiah" umum di action game (mis. Devil Trigger DMC, Berserk mode): kekuatan besar sementara dengan risiko besar (mendekati "beku total"). Agent perlu tahu bahwa *Curse Meter Surge* bukan cuma damage buff biasa — harus terasa sebagai keputusan taktis yang menegangkan, bukan tombol "menang otomatis".

---

## 5. Teori Kamera & Sinematografi

### A. Third-Person Camera Rules
Kamera idealnya sedikit offset dari pusat karakter (rule of thirds), dengan *look-ahead* di arah gerak, dan collision-avoidance otomatis di ruang sempit dungeon supaya tidak clipping ke dinding.

### B. Kamera sebagai Alat Naratif (Hellblade II style)
Untuk momen emosional kunci (Altar Duka, boss intro, kematian jiwa beku), kamera bergerak dari third-person standar menjadi *close-up* dinamis pada wajah Kaelen — teknik ini datang dari bahasa sinematik film, dipakai untuk memaksa pemain fokus ke emosi, bukan aksi.

### C. Framing & Rule of Space
Saat Kaelen menghadapi boss, beri "ruang visual" di depan boss lebih besar dari di belakang Kaelen — teknik framing klasik yang membuat ancaman terasa dominan secara bawah sadar.

---

## 6. Teori Warna & Pencahayaan

### A. Color Temperature sebagai Bahasa Emosi
2700K (hangat, nyaman, manusiawi) vs 6500K (dingin, mati rasa, asing) — prinsip psikologi warna ini telah ditetapkan pada spesifikasi visual. Pastikan penerapan berikutnya konsisten: elemen yang berhubungan dengan Aina/harapan condong ke warna hangat, sedangkan elemen yang berhubungan dengan kutukan condong ke warna dingin, tanpa pengecualian yang membingungkan pemain.

### B. Contrast Ratio sebagai Alat Fokus Perhatian
Area gelap pekat dengan satu titik cahaya terang (syal Aina) secara otomatis menarik mata pemain ke titik itu — teknik "chiaroscuro" dari seni lukis klasik, diadaptasi ke real-time lighting (relevan untuk perancangan pencahayaan chiaroscuro real-time).

### C. Desaturasi Progresif sebagai Indikator State
Alih-alih UI meter murni, saturasi warna dunia dapat dirancang berkurang seiring Curse Meter naik sehingga dunia terasa makin "mati rasa" secara visual, konsisten dengan tema anhedonia yang didokumentasikan dalam GDD.

---

## 7. Teori Audio

### A. Diegetic vs Non-Diegetic Sound
Diegetic = suara yang "ada" di dunia game (langkah kaki, gema es retak, bisikan jiwa beku). Non-diegetic = musik latar/scoring yang hanya didengar pemain. Hellblade dikenal mengaburkan batas ini (bisikan terasa seperti datang dari dalam kepala Senua) — teknik ini bisa dipakai untuk bisikan jiwa-jiwa beku di Lentera Pudar.

### B. Binaural Audio
Teknik rekam/mixing yang membuat suara terasa datang dari arah/jarak spesifik saat memakai headphone — dipakai Hellblade untuk bisikan yang "mengelilingi" pemain. Perlu asset audio look ahead untuk arah suara sesuai posisi 3D sumbernya di level.

### C. Adaptive/Dynamic Music System
Musik dirancang berubah lapisan (menambah/mengurangi instrumen) berdasarkan state gameplay (eksplorasi tenang → mendekati musuh → combat penuh) tanpa cut kasar antar track. Konsep yang didokumentasikan dalam GDD ini disebut *vertical layering* (layer ditambah/dikurangi), berbeda dari *horizontal re-sequencing* (pindah antar segmen musik berbeda).

---

## 8. Teori UI/UX

### A. Diegetic & Minimal HUD
UI yang menyatu ke dunia game (radius cahaya syal sebagai indikator kesehatan/state, alih-alih bar HP terpisah) mengurangi gangguan imersi. Prinsip yang telah ditetapkan dalam desain UI ini perlu diterapkan konsisten di semua sistem UI, bukan hanya sebagian.

### B. Affordance
Desain visual objek harus "menyiratkan" fungsinya — pegangan pintu terlihat bisa dipegang, kristal es interaktif terlihat berbeda dari kristal es dekoratif (lewat glow/emissive) supaya pemain tidak bingung mana yang bisa berinteraksi.

### C. Feedback Loop Instan
Setiap input pemain (serangan, dash, buka eyepatch) perlu respons visual/audio dalam <100ms supaya terasa responsif — prinsip dasar UX yang berlaku juga untuk action game, bukan cuma aplikasi.

---

## 9. Teori Animasi & Kinesiologi Gerak Manusia

### A. 12 Prinsip Animasi Disney (Terapan 3D Real-Time)
- **Anticipation**: Gerakan persiapan sebelum aksi utama (Kaelen merendahkan panggul sebelum dash) — kunci readability combat.
- **Follow Through & Overlapping Action**: Syal Aina dan jubah Kaelen tidak berhenti bersamaan dengan tubuh (simulasi inersia kain).
- **Squash & Stretch**: Versi halus semi-realistis pada kompresi otot dan impact tumbukan cakar es.
- **Secondary Action**: Kibaran rambut perak dan percikan bara syal Aina memperkaya aksi utama.

### B. Rantai Kinetik Kombat (*Kinetic Chain & Momentum Transfer*)
Tenaga pukulan Kaelen mengalir dari tanah: `Ground Reaction Force kaki belakang ➔ Rotasi Panggul ➔ Torsi Tulang Belakang ➔ Scapula Protraction ➔ Ekstensi Siku ➔ Wrist Lock pada Impact Frame`. Memahami rantai kinetik ini menjelaskan mengapa *Heavy Cursed Strike* butuh startup 12–18 frame (waktu transfer momentum penuh) agar pukulan terasa berbobot (*weighty*).

### C. Kinesiologi 8-Fase Lokomosi (*Human Gait Cycle*)
Siklus jalan/lari karakter dirancang berdasarkan 8 fase biomekanik umum: *Initial Contact (Heel Strike) ➔ Loading Response ➔ Midstance ➔ Terminal Stance ➔ Pre-Swing (Toe-off) ➔ Initial Swing ➔ Midswing ➔ Terminal Swing*.
- **Pelvic Tilt**: Panggul miring dinamis naik-turun mengikuti kaki tumpu vs melayang.
- **Counter-Rotation**: Torsi silang bahu berputar berlawanan panggul untuk keseimbangan alami.
- **Flight Phase**: Karakteristik lokomosi di mana lari/dash memiliki fase melayang (kedua kaki tidak menyentuh tanah).

### D. IK (Inverse Kinematics) & Blend Trees
Pendekatan Two-Bone IK dan Control Rig merupakan kandidat teknik untuk adaptasi telapak kaki pada lantai dungeon miring, dipadu *Blend Trees* berbasis kecepatan untuk transisi lokomosi halus tanpa snap.

---

## 9. Teori Deformasi Mesh & Corrective Rigging (Karakter 3D)

### A. Volume Preservation pada Artikulasi Ekstrem
Saat siku atau lutut ditekuk tajam, mesh tanpa *Corrective Shape Keys / Dual Quaternion Skinning* akan mengalami *candy-wrapper artifact* (penyusutan volume parah).
- **Siku (Elbow fleksi 140°)**: Corrective morph dirancang untuk mempertahankan volume lipatan dalam siku dan merepresentasikan muscle bulging pada otot bisep.
- **Bahu (Shoulder abduksi 90°–180°)**: Segmentasi *Clavicle-Scapula-Humerus* terpisah agar bahu terangkat alami saat memukul.

### B. Batas Rotasi Sendi Anatomis Baku
Batasan rotasi anatomis pada sistem rig dan IK: Siku (0°–145° anti-hyperextension), Lutut (0°–140° fleksi belakang), Tulang Belakang ($\pm 35^\circ–45^\circ$ per segmen), Leher ($\pm 80^\circ$ yaw).

### C. Simulasi Sekunder Dinamis vs Hand-Keyed Rigging (Syal Aina)
- **Mode Gameplay**: Untuk gameplay runtime, solusi real-time cloth simulation atau secondary-motion spring solver dapat digunakan sebagai kandidat implementasi (evaluasi runtime konkret pada H1).
- **Mode Sinematik**: Animasi hand-keyframed atau control rig merupakan kandidat pendekatan untuk memberikan kontrol ekspresi puitis pada rancangan cutscene emosional (Altar Duka & Boss Death).
- **Transisi Halus**: Wajib menggunakan *Blend Weight Transition Curve (0.0 ➔ 1.0)* bertahap minimal 0.5 detik, bukan toggle instan 0/1 untuk menghindari letupan inersia kain.

---

## 10. Teori Shading PBR Tingkat Lanjut & Material Parameters

### A. Non-Standard PBR Shading Models (Stylized-Realistic)
Pada pipeline PBR, material umumnya memanfaatkan kombinasi *Base Color* (flat tanpa baked lighting), *Roughness*, *Metallic* (biner 0 atau 1), dan *Tangent Space Normal Map* dengan Cage ray-casting. Arahan visual game adalah *Stylized-Realistic non-outline* (bukan cel-shading bergaris hitam).

### B. Dual-Lobe Specular Roughness (Kristal Es Kutukan)
Rancangan visual kristal es cakar Kaelen menargetkan kombinasi dua lapisan specular: lapisan dasar (*Roughness 0.35–0.50*) untuk pantulan tubuh es internal dan lapisan luar tipis (*Roughness 0.05–0.10*) untuk highlight tajam basah. *Refraction Index (IOR 1.31)* menjadi target desain untuk pembiasan cahaya realistis khas es murni.

### C. Real-Time Dynamic Parameter Control (Curse Meter Linking)
Material Parameter Collection (MPC) atau dynamic material instance merupakan kandidat pendekatan untuk menghubungkan parameter gameplay seperti Curse Meter ke emissive material secara dinamis, sehingga perubahan intensitas transisi visual terlihat halus.

### D. Niagara Particle System sebagai Bahasa Visual
Partikel di game ini bukan sekadar pemanis efek visual (*VFX eyecandy*), melainkan media komunikasi diegetik:
- *Percikan Bara Api Syal Aina (`#F4B860` 2700K)*: Menandakan kehangatan, perlindungan, dan memandu jalur eksplorasi.
- *Uap Beku Cakar Es (`#4A6FA5` & `#7EE8FA` 6500K)*: Menandakan bahaya, ancaman akumulasi kutukan, dan waktu telegraf serangan musuh.

### E. Render Target Masking untuk Dynamic Environmental Restoration
Sebagai contoh referensi sistem *Deadzone Regrowth* Kena: pendekatan runtime mask atau Render Target merupakan kandidat teknik untuk mentransisikan es retak menjadi batu hangat secara dinamis saat restorasi lingkungan Altar Duka dipicu. Micro-AO tekstur dibatasi agar tidak bertabrakan dengan kalkulasi pencahayaan global real-time.

---

## 11. Teori Shader & Material (Technical Art)
*(Lihat bab 10 untuk detail pipeline teknis spesifik PBR dan material)*

---

## 12. Teori Balancing & Progresi Sistem

### A. Difficulty Curve
Kurva kesulitan idealnya naik bertahap dengan puncak lokal di tiap boss, bukan naik linear terus — beri variasi supaya tidak monoton (lihat Flow Theory di bagian 1).

### B. Power Budget per Sektor
Tiap kemampuan baru yang didapat Kaelen per sektor perlu "dianggarkan" supaya tidak membuat sektor sebelumnya terasa percuma — prinsip umum RPG progression design.

### C. Cost-Benefit Sistem Naratif (Syal Aina)
Karena syal Aina memendek permanen sebagai *cost* naratif, penting menjaga rasio: tiap pemendekan harus memberi *benefit* yang terasa sepadan (kemampuan baru, progres cerita penting) — kalau tidak, pemain akan merasa dihukum tanpa alasan jelas, bukan merasakan bobot pengorbanan yang diinginkan.

---

## 13. Teori Fisika Tingkat Lanjut (Terapan Real-Time Engine — Lihat [expert-physics.md](physics.md))

### A. Rigid Body & Sequential Impulse Solver
Pada simulasi rigid body, persamaan Newton-Euler ($F=ma$, $\tau=I\alpha$) diselesaikan secara iteratif ($4–10\text{ iterasi/frame}$) oleh *Sequential Impulse Solver*. Rancangan karakteristik pecahan es menargetkan restitusi rendah ($e=0.1–0.3$) dan aproksimasi *Coulomb Friction Cone* agar pecahan terasa berat dan menyerap momentum tumbukan.

### B. Soft Body & XPBD Cloth Dynamics (Extended Position-Based Dynamics)
Pada simulasi kain berbasis **XPBD** (Extended Position-Based Dynamics), solver memanipulasi langsung posisi partikel dengan parameter *Compliance* ($\alpha$), menjamin kestabilan simulasi pada nilai kekakuan tinggi tanpa ledakan numerik. Bending stiffness ($0.4–0.6$) dipisahkan dari stretching stiffness, dipadu *BVH spatial hashing* untuk kalkulasi self-collision.

### C. Fracture Mechanics & Voronoi Lattice-Biased
Perancangan pecahan es dihitung dari konsentrasi tegangan ($K_t$) menggunakan kandidat teknik **Pre-Fractured Voronoi**. Distribusi titik seed memanfaatkan **Lattice-Biased Distribution** (mengikuti kisi kristal es) agar bongkahan es tampak prismatik dan runcing secara alami, bukan serpihan batu acak.

### D. Fluid Dynamics Disederhanakan untuk Efek Uap & Lelehan
Efek uap dingin dan embun beku dapat dirancang menggunakan pendekatan *Grid-Based Eulerian*, *SPH*, atau particle-based approximation (Niagara merupakan kandidat implementasi runtime); pemilihan arsitektur konkret belum diaudit. Dipadu *Flipbook Textures* pre-rendered dan *Shallow Water Equations (SWE)* untuk riak genangan air es di lantai dungeon.

### E. Light Transport, Cook-Torrance BRDF & Lumen
Transportasi cahaya dirumuskan oleh *Rendering Equation*. Pipeline rendering real-time menerapkan **Cook-Torrance BRDF** dengan distribusi **GGX / Trowbridge-Reitz** (Roughness es $0.15–0.30$ menghasilkan highlight specular tajam berkilau). Solusi pencahayaan global Lumen mengaproksimasi GI real-time melalui kombinasi *SDF Tracing*, *Screen-Space Tracing*, dan *Surface Cache*.

### F. Inverse Kinematics Solvers (FABRIK vs CCD)
Untuk Two-Bone Foot IK, algoritma **FABRIK** (Forward And Backward Reaching IK) bekerja di ruang posisi dua arah (Backward-Forward Pass) untuk konvergensi lebih cepat dan bebas artefak sendi pada kontur lantai dungeon miring.

---

## 14. Teori Matematika Tingkat Lanjut (Terapan — Lihat [expert-mathematics.md](mathematics.md))

### A. Vektor & Quaternion (SLERP vs NLERP)
Rotasi 3D merepresentasikan orientasi melalui quaternion 4D ($q = w + xi + yj + zk$) bebas *Gimbal Lock*. Wajib menggunakan **SLERP** (Spherical Linear Interpolation) untuk transisi kamera sinematik berkecepatan sudut konstan, dan **NLERP** untuk blending animasi mikro frekuensi tinggi (Idle ke Walk).

### B. Interpolasi, Easing & Cubic Bezier sebagai Bahasa Emosi
Transisi kamera dan UI dirancang untuk memanfaatkan kurva **Cubic Bezier ($P(t)$)** emosional: kurva *overshoot & settle* untuk Sektor 2 (*Anger*) yang agresif, dan kurva *flat lalu deselerasi curam* untuk Sektor 4 (*Depression*) yang berat dan lambat.

### C. Spline Geometri, Arc-Length Reparameterization & C2 Continuity
Jalur kamera sinematik ditargetkan memanfaatkan *Catmull-Rom Spline*, sedangkan rancangan lorong organik *Hall of Mirrors* menargetkan *Composite Bezier Spline* dengan kontinuitas kelengkungan **C2 Continuity** (turunan kedua kontinu) dan **Arc-Length Reparameterization** agar kecepatan objek sepanjang kurva stabil tanpa percepatan anomali.

### D. Signed Distance Fields (SDF) Matematis
SDF $f(p)$ dengan sifat 1-Lipschitz memungkinkan *Sphere Tracing* efisien untuk Lumen GI, collision proxy murah untuk puing es, dan kalkulasi soft shadow volumetrik analitik.

### E. Noise Functions & Fractal Brownian Motion (fBm)
Tekstur permukaan es dan rancangan efek partikel dapat memanfaatkan kombinasi Perlin, Simplex, dan Worley (Cellular) Noise yang ditumpuk secara multi-skala melalui **Fractal Brownian Motion (fBm)** (rasio frekuensi oktaf $2:1$). Niagara merupakan kandidat sistem partikel runtime; pemilihan konkret diaudit pada H1.

### F. Formalisasi Finite State Machine & Hierarchical AI
Logika kontroler karakter dapat direpresentasikan melalui 5-tuple FSM sebagai kandidat desain; arsitektur AI musuh dan Boss menempatkan **Behavior Tree & Hierarchical State Machine (HSM)** sebagai kandidat struktur representasi untuk mencegah ledakan kombinatorial transisi state.

---

## 15. Teori Psikologi Pemain (Player Psychology — Lihat [expert-psychology.md](psychology.md))

### A. Self-Determination Theory (SDT) & Diagnostik Desain
Motivasi intrinsik pemain dievaluasi lewat 3 pilar: **Autonomy** (kebebasan eksplorasi rute rahasia Eyepatch), **Competence** (penguasaan parry 12-frame dan pola musuh), dan **Relatedness** (ikatan emosional Kaelen-Aina). Menolak sistem leaderboard kompetitif untuk mencegah fenomena *Motivation Crowding-Out*.

### B. Operant Conditioning & Sistem Reward Etis
Menerapkan *Fixed Ratio Scheduling* (tiap Altar Duka dinyalakan = 1 fragmen memori Aina) dan **menolak sistem reward acak (Anti-Gacha/Loot Mandate)** agar setiap pengorbanan syal terasa sebagai keputusan sadar yang dapat direnungkan.

### C. Prospect Theory & Loss Aversion 2.5x
Kerugian psikologis dirasakan **2.0 hingga 2.5 kali lebih berat** dibanding keuntungan bernilai setara ($V(\text{Loss}) \approx 2.25 \times V(\text{Gain})$). Pemendekan permanen Syal Aina dirancang agar terlihat jelas sebelum aktivasi altar dan ditargetkan untuk memperkuat bobot keputusan naratif yang mendalam.

### D. Cognitive Load & Minimal Diegetic HUD
Menghilangkan UI konvensional demi menekan *Extraneous Load*, membebaskan kapasitas mental (*Germane Load*) dan *Emotional Bandwidth* pemain untuk meresapi duka cerita tanpa kelelahan kognitif.

### E. Presence, Embodiment & Kerentanan Bug
Spatial presence (kamera dekat, audio 3D binaural), Sensorimotor embodiment (kontrol instan tanpa input delay), dan Social presence (mikro-ekspresi Aina). Bug kecil pada input/hitbox wajib diprioritaskan saat QC karena dapat merusak kondisi *Presence* secara instan.

### F. Dinamika Duka Non-Linear (Kübler-Ross Echoes)
5 Tahap Berduka (Denial s.d. Acceptance) dipahami sebagai model non-linear; memperbolehkan gema visual/audio dari tahap sebelumnya muncul samar di sektor berikutnya untuk pengalaman duka yang realistis.

### G. Tension-Release Cycle & Emotional Bandwidth Pacing
Menyisipkan *Breather Rooms* dan jeda kontemplatif di antara beat emosional berat untuk mencegah desensitisasi dan kejenuhan emosional (*emotional burnout*).

---

## 16. Teori Tambahan yang Layak Dipertimbangkan

### A. Ludonarrative Consonance/Dissonance
Kesesuaian antara mekanik yang dimainkan dan cerita yang disampaikan. Bobot hantaman pukulan (*hitstop*, inersia, dinginnya es) harus selaras dengan kepedihan cerita tragedi Kaelen & Aina.

### B. Semiotika Visual (Visual Semiotics)
Konsistensi makna simbol visual di seluruh dunia (pola kristal es, pose patung beku, ukiran Altar Duka) agar pemain dapat membaca sejarah lingkungan tanpa teks.

### C. Accessibility Design Theory
Opsi mode buta warna (*colorblind filter* untuk kontras 2700K vs 6500K), pengurangan *screen shake*, dan subtitle terstruktur untuk bisikan audio binaural.

### D. Procedural Content Generation (PCG) Theory
Prinsip dasar seperti *constraint-based generation* dan *wave function collapse* jika diterapkan untuk variasi reruntuhan semi-prosedural.

### E. AI Behavior Tree Theory (untuk Musuh)
Struktur *selector*, *sequence*, dan *condition* untuk variasi perilaku musuh jiwa beku (pasif, menangis, mendadak menyerang saat didekati).

### F. Playtesting & Iterative Design Theory
Metodologi *"fail fast, iterate often"* — membangun versi kasar (*grey-box*) tiap sektor di Blender/UE5 untuk memvalidasi pacing sebelum menambahkan aset visual detail.

---

## 17. Teori Produksi & Pipeline Teknis

### A. Performance Budgeting & Optimization Theory
Anggaran performa PC: pembagian LOD (*Level of Detail*), culling objek di luar kamera, dan optimasi transparent material agar terkunci pada **Solid 60 / 120 FPS**.

### B. World Partition & Level Streaming
Rancangan level streaming menargetkan pemuatan dan pembongkaran lima Sektor Dungeon secara dinamis berdasarkan posisi pemain tanpa layar loading yang mengganggu.

### C. Asset Naming Convention & Folder Structure
Standar penamaan baku (*Pipeline Hygiene*):
- `SK_` : Skeletal Mesh (contoh: `SK_Kaelen_Body`)
- `SM_` : Static Mesh (contoh: `SM_Crypt_Pillar_01`)
- `M_` / `MI_` : Material / Material Instance (contoh: `M_Cursed_Crystal`, `MI_Aina_Scarf`)
- `FX_` : Niagara FX (contoh: `FX_Warmth_Embers`, `FX_Hit_Sparks`)
- `A_` / `ABP_` : Animation Sequence / Animation Blueprint (contoh: `A_Kaelen_Punch_01`, `ABP_Kaelen`)

### D. Version Control untuk Aset 3D (Git LFS)
Pengelolaan file biner besar (`.blend`, `.fbx`, `.uasset`, `.wav`) merupakan kandidat yang cocok untuk Git LFS; kebijakan final pelacakan repositori akan ditetapkan saat konfigurasi source-control proyek.

### E. Save System & Checkpoint Design Theory
Rancangan save system menargetkan penyimpanan progres permanen di Altar Duka untuk mengunci konsekuensi pengorbanan Syal Aina tanpa rollback sepele.

### F. Input & Control Scheme Theory (termasuk Haptics)
Rancangan haptic feedback menargetkan pola getaran untuk denyut Syal Aina, tangkisan parry yang berhasil, dan hantaman cakar es; implementasi serta kalibrasi runtime belum dilakukan.

---

## 18. Teori Tambahan Lain (Penutup Cakupan Produksi)

### A. Narrative Pacing — Three-Act Structure
- **Act 1 (Setup)**: Sektor 1 (Denial) & Sektor 2 (Anger) — Pengenalan semesta, kutukan, dan kepedihan awal.
- **Act 2 (Confrontation)**: Sektor 3 (Bargaining) & Sektor 4 (Depression) — Titik balik emosional terdalam dan penyusutan cahaya terendah.
- **Act 3 (Resolution)**: Sektor 5 (Acceptance) — Rekonsiliasi batin Kaelen-Aina dan terbukanya fajar menuju *Overworld*.

### B. World-Building Consistency / Canon Bible
Daftar aturan mutlak semesta yang tidak boleh dilanggar (Hukum Tiga Warna, sifat Kutukan Pudar, janji Aina).

### C. Sound Mixing & Mastering Theory
Target *loudness* standar:
- **-20 LUFS**: Musik latar eksplorasi (layer dasar).
- **-16 LUFS**: Musik combat (layer penuh) — target standar media interaktif.
- **-18 LUFS**: Dialog & bisikan jiwa beku, dengan *ducking* otomatis musik -6dB saat aktif (Attack: 150ms, Release: 400ms).
- **-28 s.d. -24 LUFS**: Ambience derit es & angin — sangat halus di bawah narasi.
- **Peak -3 dB** untuk SFX combat — mencegah digital clipping.

### D. Typography & Subtitle Readability
Ukuran font dengan kontras tinggi terhadap latar belakang batu gelap, dilengkapi drop-shadow dan kecepatan baca standar.

### E. Localization-Readiness
Penyediaan buffer ruang UI (*text expansion*) untuk multibahasa (Bahasa Indonesia & English).

### F. Playtesting Metrics & Telemetry
Pencatatan data titik kematian pemain, durasi per sektor, dan keberhasilan parry untuk kalibrasi kurva kesulitan.

### G. Living Document Methodology
Seluruh dokumen referensi dipelihara secara mutakhir, sinkron, dan terdokumentasi versi revisinya.

---

## 19. Cara Penggunaan Dokumen Ini untuk AI Agent

- **Konteks Dasar**: Dokumen ini menjadi pedoman *The Why* di setiap sesi kerja pemodelan Blender 5.2 LTS dan pemrograman Unreal Engine 5.
- **Instruksi Granular**: Sub-agent dapat merujuk langsung bab spesifik (misal: "Gunakan prinsip 4.B Hitstop" atau "Terapkan prinsip 11.B Subsurface Scattering").
- **Standar Baku**: Dokumen ini adalah prinsip/kerangka berpikir fundamental yang mendampingi Master GDD dan Dokumen Visi Kreatif Lentera Pudar.
