---
status: ACTIVE
type: SPECIFICATION
authority_scope: gameplay.ui_ux
canonical: true
owner: ui-team
last_reviewed: 2026-08-18
---

# UI/UX & Aksesibilitas — Lentera Pudar Master Reference
### Spesifikasi Minimal-HUD, Antarmuka Diegetik, Fitur Aksesibilitas Empatik, & Arsitektur Siap Lokalisasi

> **Dokumen Sumber Kebenaran UI/UX & Aksesibilitas (*UI/UX & Accessibility Reference*)**  
> Melengkapi [expert-psychology.md](../07-foundations/psychology.md), [style-guide.md](../04-art-3d/style-guide.md), [level-design-storytelling.md](level-design-storytelling.md), dan [qa-qc-framework.md](../06-pipeline-qc/qa-qc-framework.md). Menetapkan antarmuka pengguna yang meminimalkan beban kognitif (*cognitive load*) dan menjamin aksesibilitas inklusif untuk seluruh pemain.

---

## 1. Filosofi Inti: Aksesibilitas Sebagai Bentuk Empati Tematik
Game bertema duka dan kehilangan berbicara tentang pengalaman universal manusia. Aksesibilitas bukan sekadar kepatuhan teknis (*compliance checklist*), melainkan **perpanjangan rasa empati desain**:
- Menghilangkan hambatan sensorik, motorik, dan kognitif agar pesan emosional Kaelen dan Aina dapat dijangkau oleh semua kalangan pemain.

---

## 2. Struktur HUD In-Game (*Diegetic & Minimalist HUD*)
- **Prioritas Antarmuka Diegetik**: Seluruh informasi status diintegrasikan langsung ke dalam dunia game dan tubuh karakter:
  - *Curse Meter*: Ditampilkan lewat rambatan prisma es biru (`#4A6FA5`) dan denyut pendaran emissive pada lengan kiri Kaelen.
  - *Sisa Pengorbanan*: Panjang fisik Syal Emas Aina (`#F4B860`) di leher Kaelen.
  - *Kompas Navigasi*: Arah kibasan ujung syal Aina dan pencairan jejak es.
- **HUD Non-Diegetik Minimal & Kontekstual**:
  - Bar status kesehatan konvensional memudar otomatis saat di luar pertempuran (*auto-fade*).
  - *Contextual Interaction Prompts*: Muncul lembut dengan tombol glyph dinamis hanya saat mendekati objek interaktif (radius < 2.0m) dan memudar seketika setelah interaksi selesai.
- **Kepatuhan Palet The Triad**: Desain elemen grafis antarmuka wajib mengadopsi palet `#F4B860`, `#4A6FA5`, dan `#2A211C` tanpa menggunakan asset UI bawaan engine yang generik.

---

## 3. Arsitektur Menu & Navigasi
- **Main Menu**: Estetika bersih, melankolis-hangat ("less is more"), menampilkan siluet Kaelen di depan Altar Duka dengan partikel bara api hangat melayang.
- **Pause Menu Atmosferik**: Tidak memotong audio atau visual secara kasar; memberikan efek *Gaussian background blur* dengan musik ambient tetap terdengar sayup untuk menjaga kesinambungan emosi.
- **Dedicated Accessibility Tab**: Menu *Aksesibilitas* ditempatkan pada tingkat utama (bukan tersembunyi di submenu) untuk kemudahan navigasi.
- **Memory Gallery (Pengganti Level Select)**: Pemilihan bab disajikan dalam bentuk fragmen kristal memori masa lalu Kaelen & Aina yang dapat ditinjau ulang secara naratif.

---

## 4. Spesifikasi Fitur Aksesibilitas Komprehensif

### A. Aksesibilitas Visual
- **Mode Buta Warna Presisi**: Filter Protanopia, Deuteranopia, dan Tritanopia. Seluruh indikator penting didukung oleh **bentuk geometris/simbol unik**, bukan bergantung pada warna semata.
- **Skalabilitas Teks UI & Subtitle**: Opsi pembesaran teks (100% s.d. 150%) dengan *dynamic container wrapping* tanpa merusak layout.
- **Reduksi Efek Fotosensitif & Motion**: Toggle untuk mematikan *screen shake*, mengurangi kilatan cahaya (*flashing reduction*), dan menonaktifkan *camera handheld shake* di Sektor 2 (*Anger*).

### B. Aksesibilitas Auditori
- **Full Closed Captions**: Menyertakan teks deskripsi audio non-verbal dan vokal emosional (misal: `[napas tercekat]`, `[derit es tajam]`, `[keheningan berbobot]`).
- **Visual Attack Indicators**: Alternatif indikator visual di layar untuk menggantikan *Audio Spatial Tell* saat musuh menyerang dari luar sudut pandang kamera.
- **Independent Audio Sliders**: Pengaturan volume terpisah untuk Dialog, Efek Suara (SFX), Musik BGM, dan Bisikan Jiwa Beku (*Binaural Whispers*).

### C. Aksesibilitas Kontrol & Gameplay
- **Full Control Remapping**: Remapping tombol keyboard/mouse dan gamepad secara bebas, termasuk skema kontrol satu tangan (*single-handed controller scheme*).
- **Independent Difficulty Sliders**: Opsi memisahkan tingkat kesulitan kombat dari tingkat kesulitan navigasi/puzzle.
- **Timing Window Assist**: Opsi memperlebar jendela *Parry Window* (dari 12 frame menjadi 18 frame) untuk pemain dengan keterbatasan motorik refleks.

### D. Kenyamanan Konten (*Content Sensitivity*)
- **Non-Spoiler Content Advisory**: Peringatan ramah di awal permainan mengenai eksplorasi tema duka, trauma, dan kematian personal.
- **Protected Cutscene Pacing**: Menghindari tombol skip instan yang rawan tertekan tidak sengaja pada cutscene naratif inti (menggunakan *Hold to Skip* terencana).

---

## 5. Arsitektur Siap Lokalisasi (*Localization-Ready*)
- **Dynamic Text Containers**: Kotak dialog dan teks UI dirancang adaptif untuk menampung ekspansi panjang karakter teks hingga +40% (Bahasa Jerman/Prancis/dll).
- **Zero Baked Text**: Dilarang meletakkan teks penting langsung di dalam tekstur 3D (*baked diffuse map*); seluruh tulisan signage wajib berupa decal/mesh teks dinamis.
