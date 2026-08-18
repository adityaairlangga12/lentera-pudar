---
status: ACTIVE
type: PROCEDURE
authority_scope: pipeline.sop
canonical: true
governed_by: [ADR-001, ADR-002, ADR-003, ADR-004]
last_reviewed: 2026-08-18
---


# SOP / Workflow Operasional — Lentera Pudar: 3D Action RPG Edition
### Resep Langkah-per-Langkah untuk Tugas Berulang (Blender 5.2 LTS + Unreal Engine 5)

Dokumen ini menetapkan tujuh alur kerja target dan capability gate-nya. Rujuk [qa-qc-framework.md](qa-qc-framework.md) dan [style-guide.md](../04-art-3d/style-guide.md).

> **Current-state gate:** Unreal project, Unreal MCP, gameplay systems, production assets, dan final Blender → Unreal interchange belum tersedia. Langkah yang bergantung pada Unreal tidak boleh dieksekusi atau diklaim selesai sampai prasyaratnya diverifikasi. Penyelesaian tahap Blender dapat dilaporkan terpisah sebagai artifact Blender, bukan sebagai handoff Unreal selesai.

---

## DAFTAR SOP OPERASIONAL
1. [SOP 1: Pembuatan Prop Baru (Blender ➔ UE5)](#sop-1-membuat-prop-baru-dari-nol-sampai-masuk-ue5)
2. [SOP 2: Setup Material & Shader Baru (Substance ➔ UE5 MPC)](#sop-2-setup-material--shader-baru)
3. [SOP 3: Rigging Karakter & Musuh Humanoid](#sop-3-rigging-karakter--musuh-baru)
4. [SOP 4: Setup Simulasi Kain (Chaos Cloth & Spring Bones)](#sop-4-setup-cloth-simulation-baru-syal-jubah-elemen-kain)
5. [SOP 5: Konstruksi Level & Sektor Dungeon (Grey-Box ➔ Detailing)](#sop-5-membangun-level--sektor-baru-dari-grey-box-sampai-detail)
6. [SOP 6: Integrasi Sistem Gameplay & Combat FSM (Blueprint / GAS)](#sop-6-menambahkan-kemampuansistem-gameplay-baru-blueprintgas)
7. [SOP 7: Produksi & Integrasi Tata Suara (Audio Spasial 3D)](#sop-7-menambahkan-audio-baru-musik-layerbisikansfx)

---

## SOP 1: Membuat Prop Baru (dari Nol sampai Masuk UE5)

1. **Cek Pustaka Aset**: Periksa apakah prop serupa sudah ada di folder `/Props/` sesuai konvensi penamaan untuk mencegah duplikasi kerja.
2. **Tentukan Poly Budget**: Tetapkan batas poligon merujuk pada [style-guide.md](../04-art-3d/style-guide.md) Bab 6 (Prop Besar: 15.000–30.000 tris Nanite, Prop Kecil: 500–3.000 tris).
3. **Block-Out Dasar di Blender**: Buat bentuk primitif kasar, verifikasi siluet 360° dari 4 sudut pandang viewport.
4. **Detailing Geometri**: Tambahkan edge loop, bevel, dan lekukan sesuai poly budget yang telah ditentukan.
5. **UV Unwrapping**: Bentangkan peta UV bersih tanpa overlap yang tidak disengaja; sembunyikan seam di area lipatan alami.
6. **Penamaan Standar Baku**: Beri nama sesuai konvensi (`SM_[NamaProp]_[Varian]`, contoh: `SM_Crypt_Pillar_01`).
7. **Assign Material / Material ID**: Terapkan material PBR sesuai SOP 2 atau gunakan material instance existing jika cocok.
8. **Konfigurasi Collision Mesh**: Buat custom collision mesh (`UCX_...`) untuk geometri kompleks, atau simple box/capsule untuk bentuk dasar.
9. **Hierarki LOD**: Generate LOD minimal LOD0–LOD1 untuk aset berulang non-Nanite.
10. **Siapkan Candidate Export**: Terapkan transformasi dan buat artifact uji hanya bila format/axis/scale untuk tujuan uji sudah dinyatakan. Ini belum menetapkan production interchange final.
11. **Capability Gate Unreal**: Jika Unreal project atau jalur impor belum tersedia, berhenti dengan status `BLENDER_ARTIFACT_READY / UNREAL_HANDOFF_BLOCKED`. Setelah tersedia, impor melalui jalur yang benar-benar terverifikasi pada runtime aktif.
12. **Verifikasi Visual di UE5**: Cek skala prop terhadap hero Kaelen (1.78m), arah normal wajah, dan penugasan material instance.
13. **Jalankan DoD Model 3D**: Verifikasi checklist DoD Model 3D ([qa-qc-framework.md](qa-qc-framework.md) Bab 2.A) hanya pada tahap yang benar-benar dapat diamati.
14. **Version Control Gate**: Commit file yang sesuai kebijakan repository. Jangan mengasumsikan Git LFS sudah menjadi kebijakan final.

---

## SOP 2: Setup Material & Shader Baru

1. **Identifikasi Kategori**: Cek tabel material di [style-guide.md](../04-art-3d/style-guide.md) Bab 2.
2. **Gunakan Nilai Resmi**: Jika kategori sudah ada (Kristal Es, Jubah, Syal, Kulit, Batu), gunakan parameter eksak yang tercantum.
3. **Protokol Gap-Handling**: Jika kategori benar-benar baru, tandai sebagai **GAP**, ajukan usulan parameter terukur, dan tunggu approval sebelum melanjutkan.
4. **Authoring Tekstur**: Gunakan tool authoring yang telah tersedia dan disetujui; jangan menganggap Substance telah diadopsi hanya karena disebut sebagai opsi.
5. **Konfigurasi PBR di UE5**: Masukkan Base Color, Roughness, Metallic, dan Normal Map ke Material Graph UE5.
6. **Koneksi Emissive Dinamis (MPC)**: Jika material berpendar (Syal Aina / Kristal Es), hubungkan ke *Material Parameter Collection* (`MPC_CurseMeter` / `Curse_Spread`), bukan konstanta statis.
7. **Subsurface Scattering (SSS)**: Untuk material kristal es (`M_Cursed_Crystal`), atur SSS Radius 0.5–1.2cm dengan hamburan `#7EE8FA`.
8. **Uji 2 Kondisi Cahaya**: Uji tampilan material di bawah pencahayaan terang dan pencahayaan dungeon gelap pekat.
9. **Penamaan Standar**: Master Material (`M_[NamaMaterial]`), Material Instance (`MI_[NamaMaterial]_[Varian]`).
10. **Jalankan DoD Material**: Verifikasi checklist DoD Material ([qa-qc-framework.md](qa-qc-framework.md) Bab 2.B).
11. **Commit Version Control**.

---

## SOP 3: Rigging Karakter & Musuh Baru (Biomekanik & Corrective Morphs)

1. **Import Base Mesh & Validasi Bony Landmarks**: Masukkan base mesh ke Blender 5.2 LTS, verifikasi *Bony Landmarks* (Acromion, Clavicle, Olecranon, Iliac Crest, Patella, Malleolus) terbaca jelas sebagai titik tumpu rig.
2. **Penyusunan Armature Standar**: Gunakan Rigify / custom rig yang kompatibel dengan hierarki UE5 Humanoid (`Root` ➔ `Pelvis` ➔ `Spine_01..03` ➔ `Chest` ➔ `Neck` ➔ `Head`).
3. **Rigging Asimetris & Dual-Mode Scarf**: Buat rantai tulang jari tangan kanan, 5 cakar kristal es tangan kiri (`Talon_01..05`), dan rantai 5-bone syal (`Scarf_01..05`).
4. **Weight Painting Presisi & Tri-Layer Biomechanical Shingling**:
   - Lakukan skinning manual pada sendi rawan pinching (ketiak, siku, lutut, pangkal paha).
   - **Lengan Es Kiri**: Ikuti Tri-Layer Biomechanical Shingling pada [anatomy-kinesiology.md](../04-art-3d/anatomy-kinesiology.md); jangan mengganti spesifikasi domain dengan identifier ADR lama.
5. **Setup Corrective Shape Keys (Pose-Driven Morphs)**:
   - Buat shape key koreksi volume pada fleksi siku 140° (+ Muscle Bulge bisep).
   - Buat shape key koreksi pada elevasi bahu dan fleksi lutut 140°.
   - Hubungkan shape keys ke rotation driver tulang terkait.
6. **Set Batas Rotasi Sendi (Joint Constraint Limits)**: Kunci limit rotasi anatomis (Siku 0°–145°, Lutut 0°–140°, Tulang Belakang $\pm 35^\circ–45^\circ$) agar terhindar dari deformasi patah saat blend tree.
7. **Uji Deformasi Ekstrem & Kinetic Chain**: Uji pose jongkok penuh, pukulan cakar es dengan rotasi panggul-tulang belakang, fleksi siku 145° (uji zero rubbery artifact), dan kuda-kuda dash.
8. **Capability Gate Unreal**: Setup Control Rig, retargeting, dan IK hanya dilakukan setelah project, format handoff, dan API/editor tersedia. Sebelumnya laporkan artifact Blender secara terpisah.
9. **Jalankan DoD Rigging & Animasi**: Verifikasi checklist ([qa-qc-framework.md](qa-qc-framework.md) Bab 2.C) sesuai tahap yang tersedia.
10. **Commit Version Control**.

---

## SOP 4: Setup Cloth Simulation Baru (Syal / Jubah / Elemen Kain)

1. **Identifikasi Kategori Kain**: Syal Aina (Lentur & ringan: Stiffness 0.4–0.6) vs Jubah Kaelen (Tebal & berbobot: Stiffness 0.6–0.8) sesuai [style-guide.md](../04-art-3d/style-guide.md) Bab 4.
2. **Pembuatan Pola Drapery**: Buat pola kain di Marvelous Designer / Blender cloth sculpting sebelum disimulasikan.
3. **Konfigurasi Pinning Points**: Kunci titik leher melingkar penuh untuk syal Aina; kunci 2 titik bahu untuk jubah.
4. **Input Parameter Solver UE5 Chaos Cloth**: Masukkan Stiffness, Damping, Solver Iterations (8–12 iterasi), dan Wind Response Multiplier (1.2x untuk syal Aina).
5. **Handoff Transisi Halus & Pre-Roll** sesuai [style-guide.md](../04-art-3d/style-guide.md):
   - Konfigurasi *Cloth Physical Blend Weight Curve* (0.0 ➔ 1.0) berdurasi 0.5 detik (15 frame @30fps) saat cutscene menyerahkan kontrol ke gameplay.
   - Pada pertukaran mesh syal modular (`SK_Scarf_Stage1..Stage4`), aktifkan simulasi *5-Frame Physics Pre-Roll Warm-Up* tersembunyi off-screen selama blackout cutscene Altar Duka sebelum fade-in.
6. **Uji 4 Skenario Gerak Wajib**:
   - Diam (*Idle $0\text{ cm/s}$*)
   - Berjalan (*Walk $150\text{ cm/s}$*)
   - Berlari (*Sprint $400\text{ cm/s}$*)
   - Melesat (*Evade Dash*)
7. **Inspeksi Clipping**: Periksa apakah kain menembus geometri tubuh; sesuaikan collision capsule jika ditemukan overlap.
8. **Jalankan DoD Cloth**: Verifikasi checklist fisik kain ([qa-qc-framework.md](qa-qc-framework.md) Bab 2.C).
9. **Commit Version Control**.

---

## SOP 5: Membangun Level & Sektor Baru (dari Grey-Box sampai Detail)

### Tahap 1: Grey-Box Prototype (WAJIB sebelum visual detail)
1. **Layout Geometri Kasar**: Setelah Unreal project tersedia, bangun blocking layout berdasarkan pemisahan *Critical Path* dan *Optional Path* ([theory-reference.md](../07-foundations/theory-reference.md) Bab 2.B).
2. **Penempatan Landmark Dominan**: Tempatkan menara/altar visual dominan sebagai kompas alami navigasi minimal HUD.
3. **Penempatan Breather Room**: Sisipkan ruang tenang tanpa combat di antara arena pertarungan untuk menjaga ritme *Tension-Release*.
4. **Playtest Internal Minimal 3x**: Uji pacing, navigasi, dan camera clipping di fase grey-box (Gate 2).

### Tahap 2: Detailing & Atmospheric Lighting
5. **Substitusi Aset Final**: Ganti geometry kasar dengan static mesh detail hasil kurasi reference board.
6. **Tata Cahaya Lumen & Chiaroscuro**: Konfigurasikan PointLight syal 2700K (800–1200 lm), Ambient Fill 6200K (50–150 lm), dan jaga rasio kontras $\ge 8:1$.
7. **World Partition Setup**: Konfigurasi cell size streaming agar level termuat mulus tanpa pop-in.
8. **Environmental Storytelling**: Tempatkan patung warga beku, artefak masa lalu, dan retakan es.
9. **Audio Ambience & Trigger Spasial**: Pasang trigger bisikan binaural 3D dan volume ducking.
10. **Jalankan DoD Level**: Verifikasi checklist ([qa-qc-framework.md](qa-qc-framework.md) Bab 2.E).
11. **Commit Version Control**.

---

## SOP 6: Menambahkan Kemampuan/Sistem Gameplay Baru (Blueprint/GAS)

1. **Capability Gate**: SOP ini belum dapat dieksekusi sebelum Unreal project dan arsitektur gameplay diaudit. Setelah tersedia, cek apakah kemampuan serupa sudah ada untuk menghindari duplikasi logika.
2. **Kepatuhan Parameter Timing Frame**: Terapkan angka startup, active window, dan recovery frame merujuk pada [style-guide.md](../04-art-3d/style-guide.md) Bab 8 (Parry: 12 frame / 0.2 detik, Hit-Stop: 3 frame).
3. **Implementasi State Machine**: Hubungkan logika ke Animation Blueprint (Kaelen) atau Behavior Tree (AI Musuh).
4. **Uji Transisi State & Edge Cases**: Uji skenario tak terduga (contoh: Dash saat Curse Meter penuh 100%, parry tepat saat knockback).
5. **Koneksi ke Curse Meter**: Terapkan penambahan/pengurangan poin curse (+8–15 hit, +3/s eyepatch, decay -2–4/s).
6. **Uji Bebas Soft-Lock**: Uji kombinasi input cepat secara berurutan; pastikan karakter selalu dapat pulih ke state Idle.
7. **Jalankan DoD Sistem Gameplay**: Verifikasi checklist ([qa-qc-framework.md](qa-qc-framework.md) Bab 2.F).
8. **Commit Version Control**.

---

## SOP 7: Menambahkan Audio Baru (Musik Layer/Bisikan/SFX)

1. **Rekam / Authoring Raw Audio**: Rekam dialog, bisikan, atau instrumen (piano berdebu, cello, derit es) di DAW.
2. **Restorasi & Denoise**: Bersihkan frekuensi kotor menggunakan iZotope RX.
3. **Integrasi Runtime**: Setelah audio stack diputuskan dan runtime tersedia, impor melalui tool yang benar-benar diadopsi. Normalisasi loudness sesuai [style-guide.md](../04-art-3d/style-guide.md) Bab 10.
4. **Konfigurasi Dynamic Ducking**: Set side-chain ducking otomatis sebesar $-6\text{ dB}$ (Attack: 150ms, Release: 400ms) saat suara Aina atau bisikan jiwa beku aktif.
5. **Tata Suara Spasial 3D Binaural**: Atur kurva atenuasi spasial 3D untuk bisikan di telinga kiri/kanan.
6. **Verifikasi Headphone Fisik**: Uji hasil audio langsung menggunakan headphone fisik nyata.
7. **Jalankan DoD Audio**: Verifikasi checklist ([qa-qc-framework.md](qa-qc-framework.md) Bab 2.D).
8. **Commit Version Control**.

---

## ATURAN MUTLAK EKSEKUSI SOP

1. **Dilarang Melompati Tahapan**: Tahap grey-box wajib lolos playtest sebelum masuk ke detailing visual.
2. **Protokol Gap Otomatis**: Jika menemukan kasus di luar 7 SOP ini, AI Agent **wajib berhenti dan menandai sebagai GAP** disertai usulan solusi terukur.
3. **Traceable Work**: Perubahan yang menjadi bagian repository harus melalui diff dan commit yang terukur; artifact sementara tidak otomatis menjadi canonical project knowledge.
4. **Capability Stop**: Jika prasyarat tool/runtime tidak tersedia, berhenti pada status tahap terakhir yang terbukti dan laporkan dependency berikutnya.
5. **Living Document**: Pembaruan SOP mencatat tanggal review pada metadata dan alasan melalui riwayat Git.
