---
status: ACTIVE
type: SPECIFICATION
authority_scope: art.visual_constants
canonical: true
owner: art-director
last_reviewed: 2026-08-18
---

# Style Guide Numerik & Visual — Lentera Pudar: 3D Action RPG Master Visual Standard

> **Dokumen Sumber Kebenaran Parameter Numerik & Visual (*Visual & Numerical Source of Truth*)**  
> Menetapkan angka pasti, parameter material PBR, pencahayaan Lumen, simulasi kain, timing animasi, anggaran poligon, dan audio untuk eksekusi presisi tanpa tebakan acak di **Blender 5.2 LTS** dan **Unreal Engine 5**.

---

## DAFTAR ISI
1. [BAB 1: Palet Warna Resmi & Suhu Kelvin](#1-palet-warna-resmi-hex--suhu-kelvin)
2. [BAB 2: Parameter Material PBR & Subsurface Scattering (SSS)](#2-parameter-material-pbr--subsurface-scattering-sss)
3. [BAB 3: Parameter Emissive Real-Time (Material Parameter Collection)](#3-parameter-emissive-real-time-material-parameter-collection)
4. [BAB 4: Parameter Simulasi Kain (Chaos Cloth & Spring Bones)](#4-parameter-simulasi-kain-chaos-cloth--spring-bones)
5. [BAB 5: Parameter Pencahayaan Lumen & Chiaroscuro](#5-parameter-pencahayaan-lumen--chiaroscuro)
6. [BAB 6: Budget Poligon (Poly Count) & Hierarki LOD](#6-budget-poligon-poly-count--hierarki-lod)
7. [BAB 7: Parameter Kamera 3D & Easing Curves](#7-parameter-kamera-3d--easing-curves)
8. [BAB 8: Parameter Timing Kombat & Kinematika](#8-parameter-timing-kombat--kinematika)
9. [BAB 9: Parameter Sistem Curse Meter](#9-parameter-sistem-curse-meter)
10. [BAB 10: Parameter Audio & Dynamic Ducking](#10-parameter-audio--dynamic-ducking)
11. [BAB 11: Anatomi Kaelen & Rigging Biomekanik](#11-anatomi-kaelen--rigging-biomekanik)

---

## 1. Palet Warna Resmi (Hex + Suhu Kelvin)

### A. Warna Inti (The Triad of Lentera Pudar)
| Elemen | Kode Hex | Suhu Kelvin | Peruntukan & Catatan |
|---|---|---|---|
| **Syal Jiwa Aina (Base)** | `#F4B860` | 2700K | Warna inti cahaya hangat, kain syal emas. |
| **Kristal Es Kutukan (Dasar)** | `#4A6FA5` | 6500K | Warna dasar es non-emissive pada lengan Kaelen dan dungeon. |
| **Kristal Es Kutukan (Highlight/Emissive)** | `#7EE8FA` | 6500K | Rim light & emissive accent, intensitas terhubung ke *Curse Meter*. |
| **Jubah Kelana Kaelen** | `#2A211C` | — | Base color kain jubah usang gelap, non-emissive. |
| **Eyepatch Kaelen** | `#141013` | — | Kulit hitam tersamak non-reflektif pada mata kanan. |

### B. Warna Turunan Resmi (Standardisasi Sekunder)
| Elemen | Kode Hex | Suhu Kelvin | Peruntukan & Catatan |
|---|---|---|---|
| **Kulit Kaelen (Base Skin)** | `#D8B79A` | — | Undertone hangat alami untuk mencegah *uncanny valley* (Teori 15.F). |
| **Rambut Perak Kaelen** | `#C9CDD1` | — | Rona kebiruan netral halus, bukan putih murni agar tidak *blown-out*. |
| **Perban Pelindung Tangan Kanan** | `#FAF2EC` / `#D0C4BA` | — | Kain perban spiral pelindung kepalan tangan. |
| **Reruntuhan Batu Dungeon (Base)** | `#5C5A55` | — | Abu-abu batu hangat netral sebagai kanvas kontras cahaya. |
| **Reruntuhan Batu (Area Beku/Lembab)** | `#4A5A63` | — | Semburat biru dingin di area yang terpapar kutukan. |
| **Partikel Bisikan Jiwa Beku** | `#8FA9C4` | 7000K | Pendaran partikel bisikan arwah, sedikit lebih dingin dari kristal utama. |
| **Sepatu Boot Kaelen** | `#5C3218` | — | Kulit coklat tua tebal petualang. |
| **Teks UI & Subtitle** | `#F2E9DC` | — | Putih-gading hangat, kontras tinggi di atas latar gelap. |
| **Latar Kotak Subtitle (HUD Box)** | `#0D0D0F` @ 65% | — | Opacity 65% untuk keterbacaan optimal tanpa menghalangi visual. |

### C. Aturan Kontras & Desaturasi Sektor
- **Rasio Kontras Keterbacaan**: Minimal **4.5:1** antara sumber hangat (Aina/UI) dan latar gelap dungeon (standar WCAG AA).
- **Kurva Desaturasi Global Post-Process**:
  - Sektor 1 (*The Silent Crypts*): **100%** saturasi warna (`LUT_Sector01_Denial`).
  - Sektor 2 (*The Blazing Frost*): **85%** saturasi (`LUT_Sector02_Anger`).
  - Sektor 3 (*The Hall of Mirrors*): **70%** saturasi (`LUT_Sector03_Bargaining`).
  - Sektor 4 (*The Abyss of Stillness*): **40–50%** saturasi (puncak kepasrahan & mati rasa visual via `LUT_Sector04_Depression`).
  - Sektor 5 (*The Dawning Altar*): Rebound bertahap ke **100%** saat fajar terbit (`LUT_Sector05_Acceptance`).

### D. Implementasi Color Grading & Post-Process LUT
Perubahan saturasi dan atmosfer emosional antar sektor dirancang untuk diterapkan melalui **Look-Up Table (LUT) 3D** pada post-process Unreal Engine 5, alih-alih mengubah nilai albedo material satu per satu (lihat [environment-modular-techniques.md](environment-modular-techniques.md)).

---

## 2. Parameter Material PBR, Subsurface Scattering (SSS) & Artstyle Stylized-Realistic

> **Prinsip Dasar Artstyle**: *Stylized-Realistic PBR murni tanpa garis outline hitam (Zero Black Outline/Cel-Shading)*. Pemisahan bentuk dibangun melalui kontras pencahayaan Kelvin (2700K vs 6500K) dan micro-surface texturing yang tajam (kain tenun lusuh, batu berpori, lumpur).

| Material | Base Color | Roughness | Metallic | SSS Radius / Scattering Color |
|---|---|---|---|---|
| **Kristal Es Kaelen (`M_Cursed_Crystal`)** | `#4A6FA5` | 0.15–0.30 | 0.0 | Radius: 0.5–1.2 cm, Scatter Color: `#7EE8FA` |
| **Es Dekoratif Dungeon** | `#4A6FA5` | 0.25–0.40 | 0.0 | Roughness lebih tinggi agar tidak mencuri fokus hero |
| **Kain Jubah Kaelen (`M_Tunic`)** | `#2A211C` | 0.55–0.70 | 0.0 | — (Kain kasar tebal dengan micro-weathering) |
| **Kain Syal Aina (`M_Aina_Scarf`)** | `#F4B860` | 0.35–0.50 | 0.0 | Subsurface Cloth Shading aktif |
| **Kulit Kaelen (`M_Skin_Hero`)** | `#D8B79A` | 0.40–0.60 | 0.0 | SSS Profile Human Skin (Mencegah *uncanny valley*) |
| **Kulit Eyepatch (`M_Leather_Dark`)** | `#141013` | 0.60–0.75 | 0.0 | Kulit doff tersamak |
| **Batu Reruntuhan (`M_Stone_Ruins`)** | `#5C5A55` | 0.70–0.85 | 0.0 | Tekstur batu kuno berpori |
| **Logam Zirah Boss (Lord Alden dkk)** | Variatif | 0.25–0.45 | 0.7–0.9 | Baja berkarat/es menempel |
| **Sepatu Boot (`M_Leather_Brown`)** | `#5C3218` | 0.35 | 0.10 | Kulit sol tebal |

---

## 3. Parameter Emissive Real-Time & Render Target Thawing System

### A. Parameter Emissive & Rambatan Kristal Es (Material Parameter Collection)
Shader kristal es (`M_Cursed_Crystal` / `M_Kaelen_Master`) dirancang untuk dikendalikan secara real-time melalui 3 parameter yang saling terhubung:
- **`CurseMeter` (Gameplay Attribute)**: Nilai logika gameplay berbobot $0\text{ s.d. } 100\text{ poin}$ ($0\%\text{ s.d. } 100\%$).
- **`Curse_Spread` (MPC Scalar Parameter)**: Skala normalisasi $0.0\text{ s.d. } 1.0$ ($\text{Curse\_Spread} = \text{CurseMeter} / 100.0$) yang mengontrol vertex gradient rambatan es pada mesh Kaelen.
- **`Emissive_Intensity` (Material Scalar Multiplier)**: Kekuatan pancaran cahaya pendaran kristal es ($0.5\text{ s.d. } 12.0$) pada sistem pencahayaan Lumen GI.

| Rentang Curse Meter (Gameplay) | Parameter `Curse_Spread` (MPC) | Intensitas Emissive (Multiplier) | Status Karakter & Karakteristik Visual |
|---|---|---|---|
| **0–25%** | **0.00–0.25** | **0.5–1.0** | *Tenang / Aman*: Pendaran `#7EE8FA` redup stabil pada cakar es tangan kiri. |
| **26–60%** | **0.26–0.60** | **1.5–3.0** | *Waspada*: Pendaran `#7EE8FA` sedang mulai merambat dari pergelangan ke siku. |
| **61–90%** | **0.61–0.90** | **4.0–6.0** | *Bahaya*: Es merambat ke bahu dan dada, berdenyut pelan (**Pulse: 0.8–1.2 Hz**). |
| **91–100% (Surge)** | **0.91–1.00** | **8.0–12.0** | *Kritis / Ledakan Es*: Es menutupi leher dan pipi, berdenyut cepat (**Pulse: 2.0–3.0 Hz**). |

### B. Render Target Mask Dynamic Thawing (Pencairan Es Altar Duka)
- **Mekanisme**: Saat Altar Duka diaktifkan, alur interaksi dirancang memproyeksikan mask pemuaian radius melingkar ke *Render Target* / runtime mask lantai arena (arsitektur implementasi akan diaudit pada H1).
- **Transisi Shader**: Lapisan es retak (`#4A6FA5`, Roughness 0.22) bertransisi mulus menjadi batu kuno hangat (`#5C5A55`, Roughness 0.75) dengan partikel `FX_Warmth_Embers` menyebar organik.

---

## 4. Parameter Simulasi Kain & Dual-Mode Animation (Syal Aina & Jubah)

### A. Dual-Mode Animation Pipeline & Blend Weight Transition
1. **Mode Gameplay Runtime (Locomotion & Combat 60 FPS)**: Dirancang untuk menerapkan solusi simulasi inersia kain real-time (seperti solver kain/spring chain) untuk efisiensi performa dan respons dinamis (evaluasi runtime pada H1).
2. **Mode Sinematik Naratif (Altar Duka & Boss Intro)**: Dirancang untuk menerapkan **Hand-Keyframed Control Rig** pada rantai 5-bone syal untuk kontrol emosi puitis sutradara (syal memeluk leher, meredup, atau melambai terarah).
3. **Protokol Handoff Transisi Halus (*Cloth Physical Blend Weight Curve*)**:
   - Transisi antara Hand-Keyframed Control Rig dan Chaos Cloth Solver **DILARANG MENGGUNAKAN TOGGLE BINER (0/1 instan)**.
   - Wajib menerapkan **Blend Weight Transition Curve (0.0 ➔ 1.0) selama 0.5 detik (15 frame @30fps / 30 frame @60fps)** via parameter `ClothPhysicalBlendWeight`. Saat cutscene berakhir, Control Rig memegang 100% kendali pada frame awal, lalu secara mulus menyerahkan bobot inersia ke Chaos Cloth Solver untuk mencegah visual snapping, artefak melompat, atau penetrasi mesh ke dada Kaelen.
4. **Proteksi Oklusi Kamera (*Camera Occlusion Avoidance*)**:
   - Desain implementasi wajib melengkapi spring arm kamera *Over-The-Shoulder* dengan *Invisible Collision Volume* tipis yang menolak kibasan ujung kain syal agar tidak menempel atau menghalangi pandangan kamera saat Kaelen berputar cepat atau melakukan *Evade Dash*.
5. **Modular Scarf Swapping & Physics Pre-Roll Warm-Up**:
   - Empat variasi panjang syal (`SK_Scarf_Stage1` 180cm, `SK_Scarf_Stage2` 120cm, `SK_Scarf_Stage3` 70cm, `SK_Scarf_Stage4` 10cm) wajib berbagi **satu hierarki skeleton rig 5-bone yang sama** (`scarf_01` s.d. `scarf_05`).
   - Pertukaran asset mesh ditargetkan menggunakan mekanisme yang setara dengan `SetSkeletalMeshAsset` dan wajib dieksekusi **persis pada frame blackout transisi cutscene Altar Duka**; API konkret akan dikonfirmasi pada audit arsitektur Unreal.
   - Sistem wajib menjalankan **5-frame Pre-Roll Physics Warm-Up** secara tersembunyi (*off-screen*) sebelum kamera memudar kembali (*fade-in*), sehingga saat layar terang kembali, kain sudah berada dalam kondisi kestabilan inersia alami tanpa artefak drop atau jiggle di frame awal.

### B. Parameter Solver Chaos Cloth
| Parameter Fisika | Syal Aina (`M_Aina_Scarf`) | Jubah Kaelen (`M_Tunic`) |
|---|---|---|
| **Stiffness (Kekakuan)** | 0.4–0.6 (Lentur & meliuk ringan) | 0.6–0.8 (Tebal & berbobot inersia) |
| **Damping (Peredam)** | 0.3–0.5 | 0.5–0.7 |
| **Solver Iterations** | 8–12 iterasi | 6–10 iterasi |
| **Wind Response Multiplier** | 1.2x (Sangat reaktif karena "hidup") | 0.8x (Pasif mengikuti gravitasi) |
| **Pinning Points** | Melingkar penuh di leher (Neck ring fixed) | Bahu kiri & kanan (2 titik tetap) |

> **Protokol Uji Wajib**: Wajib disimulasikan pada kecepatan gerak $0\text{ cm/s}$ (Idle), $150\text{ cm/s}$ (Jog), $400\text{ cm/s}$ (Sprint), dan saat *Evade Dash* tanpa mengalami clipping parah menembus mesh tubuh.

---

## 5. Parameter Pencahayaan Lumen, Radius Syal & Chiaroscuro

### A. Dinamika Radius Cahaya Syal Aina per Sektor (2700K Warm Light)
| Sektor & Tahap Pengorbanan | Panjang Fisik Syal | Intensitas Lumen | Radius Atenuasi (*PointLight*) | Karakteristik Persepsi |
|---|---|---|---|---|
| **Prologue (Pra-Altar)** | 180 cm (Utuh) | 1200 lm | **800 cm (8.0 m)** | Terang benderang, panduan aman & hangat. |
| **Sektor 1 (Denial)** | 120 cm (Sedang) | 1000 lm | **600 cm (6.0 m)** | Luas pandang stabil, reruntuhan makam terlihat jelas. |
| **Sektor 2 (Anger)** | 70 cm (Pendek) | 800 lm | **450 cm (4.5 m)** | Sudut bayangan mulai merapat di peleburan es. |
| **Sektor 3 (Bargaining)** | 30 cm (Koyak) | 600 lm | **320 cm (3.2 m)** | Cahaya intim, refleksi cermin es menjadi krusial. |
| **Sektor 4 (Depression)** | 10 cm (Serat Bara) | 350 lm | **200 cm (2.0 m)** | Sangat sempit & claustrophobic di danau es raksasa. |
| **Sektor 5 (Acceptance)** | Bersatu Abadi | Dinamis Fajar | **Penuh / Global GI** | Pencerahan fajar menyinari gerbang Benua Luar. |

### B. Sumber Cahaya Sekunder & Rasio Kontras Cahaya (Chiaroscuro)
| Sumber Cahaya | Suhu Kelvin | Intensitas (Lumen) | Radius / Attenuation |
|---|---|---|---|
| **Kristal Es Kaelen (Rim Light)** | 6500K | 200–600 lm (Proporsional Curse) | Radius 1.0–2.0m |
| **Ambient Dungeon (Fill Light)** | 6000–6500K | 50–150 lm (Sangat redup) | Menyebar luas (*soft ambient fill*) |
| **Altar Duka & Arena Bos** | Variatif | 400–1000 lm | Disesuaikan dengan skala ruang arena |

- **Sektor 1–3**: Rasio Key Light (Syal) terhadap Ambient Dungeon minimal **8:1**.
- **Sektor 4 (Depression)**: Rasio naik menjadi **12:1 atau lebih** untuk mempertegas isolasi emosional di tengah kegelapan hampa.

---

## 6. Budget Poligon (Poly Count) & Texel Density
 
| Kategori Aset 3D | Target Tris (LOD0) | Jumlah Level LOD | Karakteristik Pipeline |
|---|---|---|---|
| **Hero Character (Kaelen)** | 40,000–60,000 tris | LOD0 s.d. LOD3 (4 level) | Deformable Skeletal Mesh |
| **Aina (Wujud Visual Terpisah)** | 20,000–35,000 tris | LOD0 s.d. LOD2 (3 level) | Cloth Simulation Enabled |
| **Boss Sektor (Lord Alden dkk)** | 50,000–80,000 tris | LOD0 s.d. LOD3 (4 level) | Custom Armature & Cloth |
| **Musuh Umum (Jiwa Beku)** | 8,000–15,000 tris | LOD0 s.d. LOD2 (3 level) | Instanced Skeletal Mesh |
| **Prop Besar (Reruntuhan, Altar)** | 15,000–30,000 tris | Nanite-Enabled | Nanite Auto-LOD |
| **Prop Kecil (Puing, Kristal Es)** | 500–3,000 tris | LOD0 s.d. LOD1 | Static Mesh Instancing |

### Standar Texel Density
- **Hero & Boss Karakter**: **$512\text{ px/m}$** (resolusi tinggi tajam untuk framing close-up kamera naratif).
- **Environment Props & Modular Kit**: **$256\text{ px/m}$** (optimalisasi efisiensi memori tekstur VRAM).
- **Teknik Produksi**: Mengadopsi *Trim Sheets & Texture Atlasing* untuk prop reruntuhan dungeon guna menekan draw call (lihat [additional-techniques.md](environment-modular-techniques.md)).

---

## 7. Parameter Kamera 3D & Easing Curves

| Mode Kamera | Field of View (FOV) | Jarak Kamera ke Hero | Framing Offset |
|---|---|---|---|
| **Eksplorasi Default** | 75°–85° | 3.8–4.5 Meter | Sedikit di atas pundak kanan |
| **Duel Lock-On / Boss Fight** | 70° | 2.6–3.0 Meter | Over-the-shoulder rapat ala Hellblade |
| **Close-Up Naratif (Altar Duka)** | 35°–50° | 1.2–1.8 Meter | Fokus ekspresi wajah Kaelen |
| **Boss Intro Cinematic** | 40°–60° | Dinamis | Rule of Space (Boss tampak dominan) |

### Transisi Kamera & Collision Buffer
- **Kurva Transisi**: `Ease-in-Out Cubic` dengan durasi blend **0.4 s.d. 0.8 detik**.
- **Collision Avoidance Buffer**: Jarak minimum kamera ke dinding batu **15–25 cm** sebelum kamera otomatis maju.

---

## 8. Parameter Timing Kombat & Kinematika

> *Catatan: Angka di bawah menggunakan basis 30fps (dikalikan 2x pada 60fps runtime).*

| Aksi Kombat | Startup (Anticipation) | Active Window | Recovery |
|---|---|---|---|
| **Light Punch Combo (Per Hit)** | 3–5 frame ($0.10–0.16\text{s}$) | 4–6 frame ($0.13–0.20\text{s}$) | 6–10 frame ($0.20–0.33\text{s}$) |
| **Heavy Cursed Strike** | 12–18 frame ($0.40–0.60\text{s}$) | 6–8 frame ($0.20–0.26\text{s}$) | 15–20 frame ($0.50–0.66\text{s}$) |
| **Evade Dash** | 2–4 frame (Sangat responsif) | 8–10 frame (**i-frames aktif**) | 4–6 frame ($0.13–0.20\text{s}$) |
| **Parry Stance Window** | — | **4–6 frame (8–12f @60fps)** | 8–12 frame jika gagal tangkis |
| **Hit-Stop (Impact Freeze)** | — | **3 frame (0.05 detik)** | Jeda tabrakan pukulan nyata |

---

## 9. Parameter Sistem Curse Meter

| Parameter Sistem | Nilai Numerik Baseline |
|---|---|
| **Kapasitas Maksimum** | 100 Poin (Skala internal diegetik) |
| **Kenaikan per Hit Musuh** | +8 s.d. +15 Poin (Tergantung berat serangan) |
| **Penurunan Alami (Decay)** | -2 s.d. -4 Poin / detik saat tidak terkena hit |
| **Buka Eyepatch (Perception)** | +3 Poin / detik selama penutup mata terbuka |
| **Ambang Bahaya (*Danger Threshold*)** | 61 Poin (Vignette dingin & denyut es aktif) |
| **Ambang Surge Siap Pakai** | 90 Poin (Bisa picu ledakan es cakar) |
| **Durasi Mode Surge** | 6–10 Detik |
| **Penalti Pasca Surge (Fatigue)** | Meter reset ke 20 Poin, damage output Kaelen turun -15% selama 5 detik |

---

## 10. Parameter Audio & Dynamic Ducking

| Elemen Audio | Target Loudness | Karakteristik & Aturan Ducking |
|---|---|---|
| **Musik Latar (Eksplorasi)** | -20 LUFS | Layering dasar instrumen hangat/dingin |
| **Musik Kombat (Layer Penuh)** | -16 LUFS | Target standar media interaktif (Teori 18.C) |
| **Dialog / Bisikan Jiwa Beku** | -18 LUFS | **Ducking musik -6dB** (Attack: 150ms, Release: 400ms) |
| **SFX Pukulan & Es Pecah** | Peak -3 dB | Menghindari digital clipping |
| **Ambience Derit Es & Angin** | -28 s.d. -24 LUFS | Sangat halus di bawah audio narasi |

---

## 11. Anatomi Kaelen, Rigging Biomekanik & Hybrid Hair System

- **Tinggi & Proporsi**: Tinggi 1.78m, proporsi 1:6.8 atletis bergaya *FF7 Remake / Kena Grade*.
- **Teknik Rambut Hibrida (Hybrid Hair Pipeline)**:
  - **Solid Geometry Mesh**: Membentuk gumpalan massa utama rambut perak Kaelen (`#C9CDD1`) untuk siluet anime tegas dan respons cahaya specular yang kokoh.
  - **Alpha Cards (Flyaways)**: Strip helai transparan di permukaan luar untuk memberikan ketidakteraturan alami (*organic imperfections*) tanpa beban komputasi strand groom.
- **Hierarki Armature Utama**:
  - `Root` ➔ `Pelvis` ➔ `Spine_01..03` ➔ `Chest` ➔ `Neck` ➔ `Head`.
  - **Lengan Kiri**: `Clavicle_L` ➔ `UpperArm_L` ➔ `Forearm_L` ➔ `Hand_L` ➔ `Talon_01..05` (Rig cakar es).
  - **Lengan Kanan**: `Clavicle_R` ➔ `UpperArm_R` ➔ `Forearm_R` ➔ `Hand_R` ➔ `Fingers_R` (Rig jari berban).
  - **Rantai Syal Dual-Mode**: Rantai 5-bone (`Scarf_01` s.d. `Scarf_05`) dengan parameter *Spring-Damper* (Stiffness: **0.4–0.6**, Damping: **0.3–0.5**) — dirancang untuk mendukung transisi antara mode simulasi inersia kain gameplay dan keyframed control rig cutscene.
