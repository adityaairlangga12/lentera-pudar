---
status: ACTIVE
type: SPECIFICATION
authority_scope: art.3d_pipeline
canonical: true
owner: technical-art-team
last_reviewed: 2026-08-18
---

# Teori Fondasi 3D Expert — Lentera Pudar Master Reference
### Prinsip Inti Topology, UV Seam, PBR Shading, Rigging Deformation, LOD Siluet, & Baking Pipeline

> **Dokumen Sumber Kebenaran Fondasi 3D (*Expert 3D Foundations Reference*)**  
> Memberikan landasan teoritis mendalam bagi 3D Modeler, Rigger, Shading Artist, dan AI Agent untuk memahami *mengapa* teknik 3D bekerja, menjamin kualitas mesh deformasi tinggi, efisiensi UV, respons PBR realistis, dan integrasi mulus antara **Blender 5.2 LTS** dan **Unreal Engine 5**.

---

## 1. Teori Topologi & Aliran Garis (*Topology Theory & Edge Flow*)
- **Deformasi Sebagai Tolok Ukur Kualitas**: Kualitas mesh ditentukan oleh bagaimana poligon disusun untuk berdeformasi secara mulus saat dianimasikan, bukan sekadar tampilan statis di viewport.
- **Prinsip Edge Flow Organik**:
  - Edge loops wajib mengikuti arah serat otot dan kurvatur artikulasi sendi (mengacu pada [anatomy-kinesiology.md](anatomy-kinesiology.md)).
  - Area artikulasi utama: Siku, lutut, bahu, dan otot ekspresi wajah (Orbicularis oculi & oris).
- **Distribusi Face Geometry**:
  - *Quad (Segi Empat)*: Standar mutlak untuk area organik yang dianimasikan atau di-subdivide.
  - *Triangle (Segitiga)*: Diizinkan terbatas pada hard-surface statis yang tidak berdeformasi.
  - *N-gon (5+ Sisi)*: Dilarang keras pada area deformasi untuk mencegah shading artifacts dan pembelahan tak terduga.
- **Manajemen Pole (Vertex dengan $\ne 4$ Edges)**:
  - Pole 3-edge atau 5-edge wajib dialihkan ke area statis berdeformasi rendah (contoh: bagian belakang kepala atau bawah ketiak).
  - Dilarang keras menempatkan pole tepat di lipatan sendi aktif (siku/lutut).

---

## 2. Teori UV Unwrapping & Penempatan Seam (*UV & Seam Theory*)
- **Minimasi Distorsi Proyeksi**: Membuka koordinat tekstur geometri 3D ke bidang UV planar dengan menjaga rasio regangan (*stretching*) sekecil mungkin, terutama pada area detail tinggi (wajah, cakar es, telapak tangan).
- **Penempatan Seam Strategis**:
  - Tempatkan seam di area tersembunyi dari sudut pandang kamera tipikal (sisi dalam lengan, paha bagian dalam, bawah sol sepatu).
  - Tempatkan seam pada perbatasan material alami (sambungan kain jubah-kulit, plat pelindung baldric).
  - Manfaatkan sudut kurvatur tajam untuk pemotongan UV yang bersih.
- **Efisiensi UV Packing & Texel Density**:
  - Mengatur ukuran pulau UV (*UV Islands*) secara proporsional sesuai target Texel Density: $512\text{ px/m}$ (Hero/Boss) dan $256\text{ px/m}$ (Props) mengacu pada [environment-modular-techniques.md](environment-modular-techniques.md).

---

## 3. Teori Shading PBR & Material Layering (*PBR Shading Theory*)
- **Prinsip Dasar Physically Based Rendering**:
  - *Albedo / Base Color*: Warna murni permukaan tanpa informasi pencahayaan, bayangan, atau highlight yang dilukis manual (*no baked lighting*).
  - *Roughness*: Variasi mikro-tekstur permukaan yang menentukan sebaran highlight Cook-Torrance GGX ($0.15–0.30$ untuk kristal es, $0.70–0.85$ untuk batuan).
  - *Metallic*: Bernilai biner ($0.0$ untuk dielektrik/non-logam, $1.0$ untuk konduktor/logam murni). Nilai transisi hanya sah untuk debu/kotoran/oksidasi tipis.
- **Dynamic Material Layering**:
  - Desain efek pencairan es di Altar Duka (*Deadzone Regrowth*) menargetkan blending multi-layer berbasis *Render Target Mask* dan *Vertex Color Masking* untuk transisi PBR real-time yang organik; arsitektur runtime akan diaudit setelah H1.

---

## 4. Teori Rigging & Deformasi (*Rigging & Deformation Theory*)
- **Hierarki Skeletal & Forward Kinematics (FK)**: Struktur pohon rantai tulang mengikuti hierarki anatomis tubuh manusia (`Root` ➔ `Pelvis` ➔ `Spine_01..03` ➔ `Chest` ➔ `Neck` ➔ `Head`).
- **Integritas Skinning Weight**:
  - Total bobot skinning per vertex wajib bernilai tepat $1.0$ ($100\%$).
  - Maksimal $4\text{ bone influences}$ per vertex untuk kompatibilitas performa real-time engine.
  - Blending bobot gradual pada area sendi untuk menghindari lipatan tajam (*pinching*).
- **Corrective Shape Keys (Pose-Driven Morphs)**:
  - Mengoreksi batasan linear blend skinning pada sudut ekstrem (siku fleksi 140° + tonjolan otot bisep, lutut fleksi 140°) untuk mencegah hilangnya volume (*volume collapse*).
- **Integrasi IK vs FK (IK/FK Switching)**:
  - *Inverse Kinematics (IK)*: Dirancang untuk kontak lingkungan (Two-Bone FABRIK Foot IK di medan dungeon miring).
  - *Forward Kinematics (FK)*: Dirancang untuk ayunan bebas di udara (ayunan pukulan kombo Kaelen).

---

## 5. Teori Optimasi & LOD Siluet (*LOD & Optimization Theory*)
- **Prinsip Reduksi Berbasis Siluet**: Penurunan poligon pada LOD1–LOD3 wajib mempertahankan siluet fungsional dan keterbacaan mekanik (*combat readability*), bukan sekadar decimate otomatis acak.
- **Manajemen Texture Streaming & Mipmapping**:
  - Mipmap otomatis menekan aliasing/flickering pada jarak jauh.
  - Konsistensi Texel Density menjamin transisi antar tingkat mipmap berjalan mulus tanpa lompatan ketajaman visual yang mendadak.

---

## 6. Teori Pipeline Baking & Ekspor (*Baking & Export Pipeline*)
- **Tangent Space vs Object Space Normal Map**:
  - Menggunakan **Tangent Space Normal Map** untuk seluruh aset karakter dan prop yang berdeformasi/bergerak agar kalkulasi shading selaras dengan rotasi mesh.
- **Penggunaan Cage Mesh Presisi**:
  - Memanfaatkan *Cage Mesh* (selubung ekstrusi halus) saat baking high-poly ke low-poly untuk mengontrol jarak ray-casting dan mengeliminasi artefak celah tajam.
- **Baking Ambient Occlusion (AO) vs Lumen GI**:
  - Membatasi baking AO tekstur hanya untuk **detail mikro** (pori kain, celah ukiran runik).
  - Menghindari baking AO skala makro yang bertabrakan dengan kalkulasi pencahayaan global real-time Lumen (*mencegah double-darkening artifact*).
- **Format Ekspor & Kompatibilitas Engine**:
  - Kapabilitas ekspor yang saat ini terverifikasi pada layer `lentera-blender-mcp` adalah **glTF / GLB 2.0 deterministik**.
  - Standar format pertukaran data final *Blender $\rightarrow$ Unreal Engine 5* berstatus **`DEFERRED / NOT DECIDED UNTIL H1`** dan akan dikunci setelah Phase H1 (Unreal Engine Pipeline Readiness Audit) dieksekusi.
