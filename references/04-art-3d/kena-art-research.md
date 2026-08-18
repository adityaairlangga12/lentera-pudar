---
status: ACTIVE
type: REFERENCE
canonical: false
owner: art-team
last_reviewed: 2026-08-18
---

# Riset Mendalam: 3D Art Kena: Bridge of Spirits — Lentera Pudar Master Reference
### Acuan Teknis Estetika Stylized-Realistic, Shading, Hybrid Hair & Dynamic Environmental Thawing

> **Dokumen Sumber Kebenaran Riset 3D Art (*Visual Pipeline & Technical Art Benchmark*)**  
> Merangkum temuan teknis dari Ember Lab (*Kena: Bridge of Spirits*) yang dipakai sebagai acuan dan kandidat adaptasi untuk target pipeline **Blender 5.2 LTS + Unreal Engine 5** semesta *Lentera Pudar*. Dokumen ini tidak menyatakan bahwa pipeline Unreal atau teknik runtime tersebut telah diimplementasikan.

---

## 1. Kategori Artstyle: Stylized-Realistic PBR (Zero Black Outline)
- **Karakteristik Visual**: Perpaduan antara stilasi proporsi semi-realistis (1:6.8) dengan material PBR beresolusi tinggi (kain tenun berpori lusuh, batu basah, kristal es reflektif).
- **Anti Cel-Shading**: Tidak menggunakan garis tepi hitam (*zero black inking/outline*). Kedalaman bentuk dan pemisahan siluet dibangun melalui tata cahaya kontras tinggi Kelvin (2700K vs 6500K Lumen GI) dan rim light.
- **Rujukan Sumber**: [MMORPG.com — Kena: Bridge of Spirits Review](https://www.mmorpg.com/reviews/kena-bridge-of-spirits-pc-review-2000123183), [80.lv — Visual Identity & Development of Kena](https://80.lv/articles/visual-identity-development-of-kena-bridge-of-spirits).

---

## 2. Teknik Rambut: Hybrid Hair System (Solid Geometry + Alpha Cards)
- **Solid Geometry (Base Mass)**: Membentuk gumpalan massa utama rambut perak Kaelen (`#C9CDD1`). Memberikan volume yang kokoh, menangkap pencahayaan specular/rim light secara tegas, dan menjaga siluet anime bersih dari kejauhan.
- **Alpha Planes / Cards (Flyaway Strands)**: Helai-helai tipis transparan di permukaan terluar untuk memberikan variasi helai rambut acak (*imperfections*) agar rambut terlihat organik dan tidak kaku seperti helm.
- **Rujukan Sumber**: [PlayStation Blog — Bringing the Lead Character of Kena to Life](https://blog.playstation.com/2021/09/15/bringing-the-lead-character-of-kena-bridge-of-spirits-to-life/).

---

## 3. Filosofi Animasi Kain: Pendekatan Dual-Mode
- **Temuan Ember Lab**: Karakter utama Kena menggunakan *hand-keyframed animation* untuk seluruh rambut dan kain demi kontrol emosi sutradara penuh, sementara karakter lain memakai physics.
- **Standar Adaptasi Lentera Pudar (Dual-Mode System)**:
  1. **Gameplay Runtime (Locomotion & Combat 60 FPS)**: Ditargetkan mengadopsi solusi fisika kain sekunder real-time (*Stiffness 0.4–0.6, Wind 1.2x*) untuk efisiensi komputasi dan responsivitas terhadap input gerak.
  2. **Cinematic Cutscenes (Altar Duka & Boss Intro)**: Ditargetkan menggunakan **Hand-Keyframed Control Rig** pada rantai tulang syal 5-bone untuk ekspresi puitis terarah (syal memeluk leher Kaelen, melambai lembut, atau meredup dramatis).

---

## 4. Sistem Restorasi Lingkungan: Render Target Mask Dynamic Thawing
- **Mekanik Kena (Deadzone Regrowth)**: Transisi area mati (*Deadzone/Corruption*) menjadi area hidup menggunakan penulisan mask ke *Render Target* yang memicu layunya aset korupsi dan mekarnya foliage tertiup angin.
- **Adaptasi Lentera Pudar (Pencairan Es Altar Duka)**:
  - Saat Kaelen menyalakan Altar Duka di akhir sektor:
    - Alur gameplay dirancang memproyeksikan pemuaian radius melingkar ke **Render Target Mask** (arsitektur runtime akan diaudit pada H1).
    - Desain shader menargetkan transisi material lantai dungeon secara dinamis dari kristal es biru retak (`#4A6FA5`) menjadi batu kuno hangat (`#5C5A55`).
    - Desain VFX menargetkan partikel bara api emas (`FX_Warmth_Embers` 2700K) yang menyebar organik mengikuti gelombang pencairan es.

---

## 5. Subsurface Scattering (SSS) & Shading Halus
- **Kulit Hero Kaelen (`#D8B79A`)**: Spesifikasi target menggunakan SSS profil kulit alami untuk memancarkan kehangatan internal dan mencegah kesan boneka plastik (*anti-uncanny valley*).
- **Kristal Es Kutukan (`#4A6FA5` / `#7EE8FA`)**: Spesifikasi target menggunakan SSS radius 0.5–1.2cm dengan hamburan warna cyan es untuk kedalaman optik kristal transmissive.

---

## 6. Optimasi Geometri & Level of Detail (HLOD & Billboards)
- Strategi optimasi target adalah menggabungkan mesh reruntuhan jarak jauh menjadi proxy **HLOD (Hierarchical LOD)** guna menekan *draw calls*; kelayakannya untuk arsitektur UE5 akan diverifikasi setelah H1.
- Mempertahankan dampak emosional (*emotional impact*) sebagai prioritas nomor satu saat melakukan optimasi performa.
