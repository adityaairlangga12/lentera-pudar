---
status: ACTIVE
type: SPECIFICATION
authority_scope: art.environment_modular
canonical: true
owner: environment-art-team
last_reviewed: 2026-08-18
---

# Teknik Tambahan — Lentera Pudar: 3D Action RPG Edition
### Pelengkap Praktis 3D Production Pipeline: Trim Sheets, Texel Density, Modular Kit & Color Grading

> **Dokumen Sumber Kebenaran Teknik Tambahan (*Advanced 3D Production Techniques*)**  
> Melengkapi SOP Workflow dan Style Guide Numerik dengan teknik produksi standar industri AAA (Trim Sheets, Vertex Color Masking, Modular Kit-Bashing, Normal Map Baking, Texel Density, dan Post-Process LUTs).

---

## 1. Trim Sheet & Texture Atlasing (Optimasi Memori & Draw Calls)
- **Konsep**: Membuat satu kanvas tekstur besar ($2048\times 2048$ atau $4096\times 4096$) berisi susunan strip material berulang (batu pahat kuno, border ornamen altar, lis logam zirah, dan patahan es).
- **Aplikasi**: UV mapping ratusan prop reruntuhan dungeon Sektor 1–5 diarahkan ke strip trim sheet yang sama alih-alih membuat tekstur unik 2K per objek.
- **Dampak**: Menekan alokasi VRAM hingga 60% dan mengurangi beban draw call secara masif pada target 60 FPS lock.

---

## 2. Vertex Color Masking & Render Target Dynamic Thawing
- **Konsep Kandidat**: Memanfaatkan channel warna titik vertex (RGBA) dan Render Target Mask untuk memadukan dua set shader PBR pada satu mesh tunggal tanpa seam; implementasi runtime belum ditetapkan.
- **Aplikasi di Altar Duka**:
  - Saat Altar Duka dinyalakan, mekanisme interaksi dirancang memproyeksikan mask radius pemuaian ke Render Target / Vertex Color lantai (arsitektur runtime konkret dievaluasi pada H1).
  - Desain channel mask menargetkan kontrol transisi live: kristal es retak (`#4A6FA5`, Roughness 0.22) mencair menjadi batu hangat kering (`#5C5A55`, Roughness 0.75).
  - Mencegah kebutuhan penggantian (*swap*) static mesh yang kasar dan menghasilkan transisi sinematik ala *Deadzone Regrowth* Kena.

---

## 3. Modular Level Design & Kit-Bashing (Grid 300cm)
- **Konsep**: Membangun modul arsitektur dungeon berbasis grid seragam ($300\text{ cm}\times 300\text{ cm}\times 300\text{ cm}$) yang dapat disusun modular (koridor lurus, persimpangan 3-arah, sudut siku-siku, gerbang runik).
- **Aplikasi**: Mempercepat fase Grey-Box (SOP 5) di Blender dan Unreal Engine 5 secara presisi sebelum masuk tahap detailing visual.

---

## 4. Normal Map Baking (High-Poly Sculpt ➔ Low-Poly Game Mesh)
- **Konsep**: Memindahkan mikrotekstur permukaan, pori-pori batu, dan pahatan otot dari high-poly sculpt (jutaan tris di Blender/ZBrush) ke dalam tekstur Normal Map tangent-space pada mesh game (40k–60k tris LOD0).
- **Prosedur**:
  1. Sculpting detail high-poly di Blender / ZBrush.
  2. Retopology low-poly sesuai batas poly budget Style Guide Bab 6.
  3. UV unwrapping non-overlapping dengan padding minimal 16 piksel.
  4. Baking normal map 16-bit float di Substance Painter / Blender baking tools.

---

## 5. Standar Texel Density (Konsistensi Resolusi Tekstur)
- **Definisi**: Standar kepadatan piksel tekstur relatif terhadap luas permukaan fisik objek di dunia 3D.
- **Target Baku Lentera Pudar**:
  - **Hero Kaelen & Boss Utama**: **$512\text{ px/m}$** (resolusi tinggi tajam untuk close-up kamera).
  - **Aset Environment & Props Umum**: **$256\text{ px/m}$** (keseimbangan optimal ketajaman vs VRAM).
- **Kepatuhan**: Menjadi checklist wajib pada DoD Model 3D ([qa-qc-framework.md](../06-pipeline-qc/qa-qc-framework.md) Bab 2.A) untuk mencegah kontras blur antar prop berdampingan.

---

## 6. Color Grading & Post-Process Look-Up Tables (LUT)
- **Konsep**: Dirancang untuk menerapkan koreksi warna, kurva kontras, dan kurva desaturasi global melalui file LUT 3D pada *post-process* Unreal Engine 5.
- **Pemetaan Sektor Duka**:
  - `LUT_Sector01_Denial`: Saturasi 100%, kontras dingin-hangat seimbang.
  - `LUT_Sector02_Anger`: Saturasi 85%, rona kemerahan dingin tajam.
  - `LUT_Sector03_Bargaining`: Saturasi 70%, rona kaca kristal waktu.
  - `LUT_Sector04_Depression`: Saturasi 40–50%, kontras chiaroscuro ekstrem 12:1.
  - `LUT_Sector05_Acceptance`: Saturasi 100%, rona keemasan fajar terbit (2700K).

---

## 7. Komposisi Lingkungan: Rule of Thirds & Leading Lines
- **Rule of Thirds**: Menempatkan landmark dominan (Altar Duka, pintu gerbang, siluet boss) pada sepertiga bidang pandang kamera (bukan selalu di titik pusat tengah).
- **Leading Lines**: Mengarahkan retakan es di lantai, deretan pilar reruntuhan, dan aliran partikel kunang-kunang untuk menuntun arah mata pemain secara diegetik tanpa bantuan panah minimap.
