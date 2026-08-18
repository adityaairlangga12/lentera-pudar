---
name: creative_vision_direction
description: "Pustaka keahlian arahan visi kreatif, filosofi seni melankolis-hangat The Triad, resonansi puitis tragedi Kaelen & Aina, diksi dialog emosional, kurasi visual reference board, dan kalibrasi mutu Few-Shot untuk semesta Lentera Pudar — 3D Action RPG (Unreal Engine 5 + Blender 5.2 LTS)."
---

# Creative Vision & Poetic Narrative Direction

## Purpose
Skill ini mengatur **prosedur evaluasi visi kreatif, kritik seni formal, keselarasan nada dialog emosional, dan konsistensi estetika melankolis-hangat** di semesta *Lentera Pudar*.

Seluruh filosofi naratif, diksi dialog master, dan kerangka estetika diatur secara kanonikal di [creative-vision.md](../../../references/01-core/creative-vision.md), [art-creativity.md](../../../references/07-foundations/art-creativity.md), dan [vocal-direction-dialogue.md](../../../references/03-narrative/vocal-direction-dialogue.md).

---

## Activate When
- Mereview atau menyusun naskah dialog karakter, deskripsi cutscene, dan arah vokal.
- Mengevaluasi tata cahaya, kontras atmosferik, dan keselarasan palet The Triad pada level greybox/set-dress.
- Menilai resonansi emosional mekanik gameplay terhadap narasi duka (The Fading Scarf, Cursed Hand, Eyepatch).
- Mengurasi reference board visual dan memvalidasi shot-list sinematik.

---

## Do Not Use When
- Optimasi performa engine tingkat rendah atau penulisan skrip build tanpa dimensi artistik/naratif.
- Perhitungan rigid body physics murni yang tidak berhubungan dengan mood atau estetika visual.

---

## Canonical Dependencies
- [creative-vision.md](../../../references/01-core/creative-vision.md) — Visi kreatif, The Triad, dan resonansi Kaelen-Aina.
- [art-creativity.md](../../../references/07-foundations/art-creativity.md) — Kerangka estetika, kritik seni, dan teori warna.
- [style-guide.md](../../../references/04-art-3d/style-guide.md) — Konstanta numerik warna dan pencahayaan.
- [vocal-direction-dialogue.md](../../../references/03-narrative/vocal-direction-dialogue.md) — Arahan vokal, format naskah, dan subteks.
- [cinematics-cutscenes.md](../../../references/03-narrative/cinematics-cutscenes.md) — Bahasa kamera dan transisi sinematik.
- [few-shot-calibration.md](../../../references/06-pipeline-qc/few-shot-calibration.md) — Contoh format berbasis bukti, bukan bukti implementasi.
- [reference-board-guide.md](../../../references/04-art-3d/reference-board-guide.md) — Panduan kurasi reference board.

---

## Alur Prosedur Evaluasi & Kritik Kreatif

### 1. Uji Nilai Grayscale (*Value-First Mandate*)
- Evaluasi komposisi visual, shot sinematik, dan layout arena dalam mode **Grayscale**.
- Titik fokus emosional utama (Syal Aina / Landmark Altar Duka) wajib tetap terbaca jelas dan kontras tanpa bergantung pada warna.

### 2. Evaluasi Komposisi Dominasi Warna
- Evaluasi komposisi dominasi warna menggunakan panduan kanonikal komposisi seni di [art-creativity.md](../../../references/07-foundations/art-creativity.md) Bab 3:
  - **Dominan**: Netral Gelap (batuan makam, bayangan dungeon, jubah kelana).
  - **Sekunder**: Biru Dingin Kutukan (kristal es, kabut pudar, keputusasaan).
  - **Aksen**: Kuning Hangat Jiwa Aina (pendaran syal lentera, bara harapan).
- Rujuk nilai Hex sRGB dan Kelvin baku di [style-guide.md](../../../references/04-art-3d/style-guide.md) Bab 1.A.

### 3. Kritik Seni Formal Tiga Pilar (Unity, Tension, Resolution)
- **Unity**: Seluruh elemen visual, audio, dan pencahayaan harus melayani satu mood melankolis yang koheren.
- **Tension**: Kontras tajam antara dinginnya kutukan vs kehangatan jiwa yang memudar, serta asimetri cakar es vs perban.
- **Resolution**: Pandangan mata pemain selalu diarahkan pada titik jeda/harapan yang jelas (Altar Duka / Breather Room).

### 4. Review Karakterisasi & Diksi Dialog
- **Kaelen (Protagonis — Pengelana Tangan Beku)**:
  - Dingin di luar, hancur di dalam. Menolak mati rasa demi menepati janji pada Aina.
  - *Larangan*: Dilarang menulis dialog heroik bersemangat, ceria, atau arogan.
  - Diksi harus padat, berat, dan reflektif. Utamakan penyampaian emosi via bahasa tubuh 3D.
- **Aina (Jiwa Syal Lentera)**:
  - Lembut, bijaksana, penuh penerimaan (*acceptance*), mencintai Kaelen tanpa syarat.
  - Nada bicara puitis dan menenangkan; tidak pernah menuntut atau menyalahkan Kaelen.

### 5. Integrasi Estetika ke Dalam Mekanik 3D
- **The Fading Scarf**: Pemendekan fisik syal di tiap altar duka wajib diperlakukan sebagai momen kehilangan yang sakral (diiringi kamera intim dan arsitektur pencahayaan dinamis).
- **Cursed Hand Strike**: Penggunaan kekuatan cakar es harus selalu memiliki bobot harga emosional yang terasa bagi Kaelen.
- **Eyepatch (Penglihatan Spektral)**: Membuka segel mata trauma adalah metafora bahwa melihat kebenaran selalu berharga mahal.

### 6. Keselarasan Sinematik & Bahasa Kamera
- Pastikan pergerakan dan sudut kamera bertindak sebagai **representasi psikologis** Kaelen di 5 sektor duka merujuk ke [cinematics-cutscenes.md](../../../references/03-narrative/cinematics-cutscenes.md).
- Terapkan transisi seamless dari gameplay over-shoulder ke cutscene sinematik tanpa hard cut layar hitam.

---

## Validation & Output Expectations

Laporan evaluasi kreatif disajikan dengan struktur ringkas:
```markdown
# 🎨 Creative & Narrative Direction Review
- **Modul / Aset**: [Nama Aset / Scene / Naskah]
- **Status Evaluasi**: [APPROVED / ACTION REQUIRED]

### 1. Evaluasi Kontras Suhu & Komposisi Warna (Value & Palet The Triad)
- [Catatan kontras visual dan keterbacaan grayscale]

### 2. Evaluasi Diksi Karakter & Resonansi Subteks
- [Catatan nada dialog Kaelen / Aina dan sinkronisasi non-verbal]

### 3. Integrasi Estetika-Gameplay & Bahasa Kamera
- [Catatan transisi emosional dan framing kamera spasial]

### 4. Rekomendasi Penajaman Emosional (Actionable Critique)
- [Langkah konkret penyelarasan kreatif]
```
