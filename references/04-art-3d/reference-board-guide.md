---
status: ACTIVE
type: REFERENCE
canonical: false
owner: art-team
last_reviewed: 2026-08-18
---

# Panduan Kurasi Reference Image Board — Lentera Pudar: 3D Action RPG Edition
### Shot-List Terkurasi Visual Legal (Kena: Bridge of Spirits + Hellblade I & II)

> **Dokumen Panduan Kurasi Visual (*Visual Reference & Shot-List Curation Bible*)**  
> Menetapkan kategori spesifik dan shot-list terarah untuk kurasi papan referensi visual (*PureRef / Milanote / Figma*) dari sumber legal/resmi guna memandu visual fidelity 3D dan psikologi gameplay.

---

## 1. Kategori Referensi: KENA: BRIDGE OF SPIRITS (Layer 1: Visual & Environment)

```
[01_palet_warna_kontras] ➔ [02_desain_karakter_siluet] ➔ [03_environment_organik] ➔ [04_pencahayaan_kontras]
```

### Kategori 01: Palet Warna & Kontras Hangat-Dingin
- **Shot-List**:
  - Tangkapan layar transisi visual area *Rot cleansing* (kebangkitan kehidupan hangat dari tanah mati).
  - Kontras tajam area *Corruption* (biru-ungu gelap pekat) bersanding dengan area yang tersucikan.
- **Fokus Evaluasi**: Cara menggabungkan dua temperatur warna ekstrem dalam satu komposisi frame tanpa memecah keharmonisan visual.

### Kategori 02: Desain Karakter, Proporsi & Siluet
- **Shot-List**:
  - Model showcase karakter Kena dari sudut pandang 360° (siluet bersih, proporsi 1:6.8 semi-realistis).
  - Desain visual makhluk pendukung Rot (bentuk simpel, ekspresif, mudah terbaca dari jarak jauh).
- **Fokus Evaluasi**: Keseimbangan detail wajah ekspresif dengan siluet pakaian yang bersih dan bebas clutter.

### Kategori 03: Environment Organik & Reruntuhan Kuno
- **Shot-List**:
  - Bangunan batu candi/makam kuno yang mulai lapuk dan menyatu dengan formasi alam/batu es.
  - Lorong-lorong batu berlumut dengan retakan alami.
- **Fokus Evaluasi**: Rasio harmonis antara geometri arsitektur buatan manusia vs elemen alam liar.

### Kategori 04: Pencahayaan Sumber Kecil Kontras Tinggi
- **Shot-List**:
  - Ruang gua/dungeon gelap gulita yang hanya diterangi satu sumber lentera kecil.
  - Jatuhnya bayangan lembut (*Lumen soft bounce*) di atas permukaan batu basah.
- **Fokus Evaluasi**: Tingkat kegelapan latar belakang yang dipertahankan agar sumber cahaya kecil terasa sakral dan dominan.

---

## 2. Kategori Referensi: HELLBLADE I & II (Layer 2: Mekanik, Psikologi & Audio)

```
[05_curse_progression] ➔ [06_kamera_closeup_emosional] ➔ [07_environment_transform] ➔ [08_boss_psikologis] ➔ [09_minimal_hud]
```

### Kategori 05: Rambatan Kutukan Fisik (*The Curse / Darkness Progression*)
- **Shot-List**:
  - Evolusi visual tangan Senua yang merambat dari jari, pergelangan, hingga menyentuh leher.
- **Fokus Evaluasi**: Penampilan material kutukan yang terasa hidup dan organik, bukan sekadar tekstur stiker statis.

### Kategori 06: Kamera Dekat & Sinematografi Emosional
- **Shot-List**:
  - *Close-up shot* pada wajah karakter saat menghadapi tragedi atau pengorbanan batin.
  - Efek *Depth of Field (DoF)* dengan latar belakang kabur yang memusatkan empati pada sorot mata karakter.
- **Fokus Evaluasi**: Penempatan sudut kamera intim (FOV 35°–50°) untuk momen Altar Duka Lentera Pudar.

### Kategori 07: Morfologi Lingkungan Mental Real-Time (*Live Transformation*)
- **Shot-List**:
  - Transisi koridor dinding yang merekah, memanjang, atau memunculkan siluet wajah saat karakter panik.
- **Fokus Evaluasi**: Transisi fluida tanpa jeda layar loading yang mengaburkan batas kenyataan dan trauma batin.

### Kategori 08: Bos sebagai Manifestasi Trauma Duka
- **Shot-List**:
  - Pertarungan bos yang merefleksikan kepedihan, rasa bersalah, dan pergulatan psikologis.
- **Fokus Evaluasi**: Bahasa tubuh dan animasi serangan bos yang terasa berat, menyakitkan, dan bermakna naratif.

### Kategori 09: Antarmuka Diegetik & Zero-Clutter HUD
- **Shot-List**:
  - Tangkapan gameplay combat aktif tanpa bar HP atau minimap di layar.
- **Fokus Evaluasi**: Penyampaian kondisi karakter secara intuitif melalui denyut cahaya syal, uap napas, dan postur tubuh.

---

## 3. Struktur Folder Reference Board Terstandarisasi

```
/reference-board
  ├── /01_palet_warna_kontras        (Kena Benchmark: 2700K vs 6500K)
  ├── /02_desain_karakter_siluet     (Kena Benchmark: Proporsi 1:6.8 Stylized-Realistic)
  ├── /03_environment_organik        (Kena Benchmark: Reruntuhan Makam Kuno)
  ├── /04_pencahayaan_kontras        (Kena Benchmark: Chiaroscuro & Lumen Light)
  ├── /05_curse_progression          (Hellblade: Pertumbuhan Es Fisik Lengan Kaelen)
  ├── /06_kamera_closeup_emosional   (Hellblade II: Close-up Altar Duka FOV 35°-50°)
  ├── /07_environment_transform      (Hellblade II: Nanite Live Morphing)
  ├── /08_boss_psikologis            (Hellblade: 5 Manifestasi Tahap Berduka)
  └── /09_minimal_hud                (Hellblade: Living Body & Syal Kompas)
```

> **Aturan Kurasi**: Setiap folder idealnya memuat **5–10 gambar resmi berkualitas tinggi** dari sumber legal (Steam store page, situs resmi developer, art book resmi, trailer 4K).
