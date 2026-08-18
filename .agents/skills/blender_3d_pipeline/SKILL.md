---
name: blender_3d_pipeline
description: "Panduan project-local untuk authoring dan verifikasi asset Blender 5.2 LTS dengan capability gate terhadap tool yang tersedia."
---

# Blender 5.2 LTS 3D High-Detail & Asset Pipeline

## Purpose
Skill ini mengatur **prosedur teknis pemodelan 3D, topologi berorientasi deformasi, penataan UV seam, rigging biomekanik, shading PBR, dan ekspor deterministik** di Blender 5.2 LTS untuk semesta *Lentera Pudar*.

Seluruh konstanta numerik, batas poligon, palet warna baku, dan proporsi anatomis diatur secara kanonikal di [style-guide.md](../../../references/04-art-3d/style-guide.md), [anatomy-kinesiology.md](../../../references/04-art-3d/anatomy-kinesiology.md), dan [3d-asset-pipeline.md](../../../references/04-art-3d/3d-asset-pipeline.md).

---

## Activate When
- Pembuatan atau pengeditan mesh 3D karakter, monster, prop, dan modular environment.
- Penataan topologi quad dominance pada area lipatan sendi dan otot aktif.
- Unwrapping UV, normal map cage baking, dan penataan material PBR.
- Pembangunan armature, skinning weight painting, FACS blend shapes, dan dual-mode cloth bones.
- Validasi struktur candidate export Blender; kompatibilitas engine dan format handoff final diverifikasi terpisah.

---

## Do Not Use When
- Modifikasi aset 2D historis (Godot / Aseprite) yang telah berstatus `SUPERSEDED`.
- Penulisan skrip naratif murni tanpa interaksi permodelan 3D DCC.

---

## Canonical Dependencies
- [style-guide.md](../../../references/04-art-3d/style-guide.md) — Konstanta numerik, poly budget, texel density, dan warna The Triad.
- [anatomy-kinesiology.md](../../../references/04-art-3d/anatomy-kinesiology.md) — Proporsi hero, bony landmarks, Tri-Layer Shingling, dan limit sendi.
- [human-facial-expressions.md](../../../references/04-art-3d/human-facial-expressions.md) — FACS Action Units dan blend-shape expressions.
- [3d-asset-pipeline.md](../../../references/04-art-3d/3d-asset-pipeline.md) — Fondasi 3D, baking, dan LOD architecture.
- [environment-modular-techniques.md](../../../references/04-art-3d/environment-modular-techniques.md) — Grid modular dan kit-bashing.
- [sop-workflow.md](../../../references/06-pipeline-qc/sop-workflow.md) — SOP dengan capability gate.
- [tools-mcp-stack.md](../../../references/06-pipeline-qc/tools-mcp-stack.md) — Kontrak dan status aktual Blender MCP.

---

## Prosedur Kerja Terstandarisasi

### 1. SOP 1: Mesh Modeling & Topologi Deformasi
- **Proporsi & Bony Landmarks**: Bentuk siluet karakter mengikuti proporsi hero dan pastikan bony landmarks terbaca jelas merujuk ke [anatomy-kinesiology.md](../../../references/04-art-3d/anatomy-kinesiology.md) Bab 1 & 2.
- **Prinsip Edge Flow & Quad Dominance**:
  - Edge loops wajib melingkari kelompok otot dan lipatan sendi aktif.
  - Wajib 100% Quad pada area bergerak; N-gon dilarang keras pada area deformasi.
  - Alihkan pole 3/5-edge ke area statis berdeformasi rendah (belakang kepala, ketiak).
- **Poly Budget & Texel Density**: Validasi jumlah poligon dan texel density terhadap batas aktif di [style-guide.md](../../../references/04-art-3d/style-guide.md) Bab 2.
- **Struktur Tri-Layer Biomechanical Shingling**: Terapkan arsitektur 3-lapisan (Layer 1 Base Flesh, Layer 2 Rigid Prism Cluster, Layer 3 Sliding Olecranon Shingles) pada lengan es kutukan untuk mencegah distorsi elastis (*anti-rubbery deformation*).
- **Hybrid Hair Geometry**: Bangun gumpalan volume utama rambut perak sebagai basis siluet, dilapisi alpha cards untuk variasi helai alami.

### 2. SOP 2: UV Unwrapping & Baking Pipeline
- **Penempatan Seam Tersembunyi**: Letakkan seam di sisi dalam lengan, bawah selangkangan, dan batas pertemuan material alami.
- **Normal Baking Cage**: Gunakan Tangent Space Normal Map dengan cage mesh halus untuk transfer detail High-Poly ke Low-Poly tanpa artefak perpecahan.
- **Baking AO Mikro**: Batasi baking Ambient Occlusion pada celah mikro; hindari AO makro yang bentrok dengan dynamic GI engine.

### 3. SOP 3: Skeletal Rigging, FACS & Biomekanika
- **Hierarki Armature Bersih**: Buat armature kosong (`create_armature` menghasilkan 0 tulang), lalu susun hierarki eksplisit via `add_bone`: `Bone_Root` → `Bone_Pelvis` → `Bone_Spine` → `Bone_Chest` → `Bone_Neck` → `Bone_Head`.
- **Sudut Roll Presisi**: Atur roll tulang dalam radian via `set_bone_roll`.
- **Integritas Skinning**: Total bobot per vertex $= 1.0$ ($100\%$) dengan maksimal 4 bone influences.
- **FACS Blend Shapes**: Siapkan shape keys berbasis Facial Action Units merujuk ke [human-facial-expressions.md](../../../references/04-art-3d/human-facial-expressions.md).
- **Corrective Pose-Driven Morphs**: Tambahkan corrective shape keys untuk menjaga volume lipatan siku, bahu, dan lutut merujuk ke limit rotasi sendi di [anatomy-kinesiology.md](../../../references/04-art-3d/anatomy-kinesiology.md) Bab 4.

### 4. SOP 4: Cloth & Secondary Dynamics
- **Dual-Mode Scarf Rigging**: Pasang rantai 5-bone spring bones pada syal lentera untuk mendukung peralihan antara simulasi fisika kain dan keyframe animasi sinematik.

### 5. Ekspor Deterministik
- Wajib apply all transforms via `apply_all_transforms`.
- Jika candidate export glTF/GLB diperlukan, gunakan `export_gltf` dan `validate_export`. Ini tidak menetapkan production interchange final ke Unreal.

---

## Tool Execution & Safety Guidance

> [!IMPORTANT]
> **Prinsip Eksekusi Headless File-Backed**:  
> Seluruh eksekusi Blender MCP berjalan dalam mode `HEADLESS_FILE_BACKED`. Sebelum mengeksekusi mutasi:
> 1. Tentukan target file fisik eksplisit (`blend_file` untuk file eksis, `output_blend_file` untuk file baru).
> 2. Dilarang mengasumsikan state memori aktif dari pemanggilan sebelumnya atau bergantung pada UI selection state.
> 3. Jalankan observabilitas sebelum mutasi (`get_scene_state`, `list_objects`, `get_mesh_stats`, `get_armature_state`).

### Penanganan Kegagalan:
- Jika terjadi error pada eksekusi tool MCP: panggil `get_last_error`, periksa log via `get_console_output`, buka kembali state file target yang tersimpan, perbaiki parameter penyebab kegagalan, dan lakukan percobaan ulang sesuai semantik retry operasi.

---

## Validation Checklist
- [ ] Transform mesh ter-apply 100% pada semua objek sebelum ekspor.
- [ ] Topologi 100% Quad pada area lipatan sendi; zero N-gons.
- [ ] Total bobot vertex pada skinning tepat 1.0 (maksimal 4 bone influences).
- [ ] Poly count dan texel density memenuhi batas spesifikasi [style-guide.md](../../../references/04-art-3d/style-guide.md).
- [ ] Visual Shading konsisten dengan palet The Triad non-outline.
- [ ] Artefak ekspor tervalidasi via `validate_export`.
