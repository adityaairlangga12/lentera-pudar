---
status: ACTIVE
type: CALIBRATION
authority_scope: pipeline.calibration
canonical: false
last_reviewed: 2026-08-18
---


# Few-Shot Quality Calibration — Lentera Pudar: 3D Action RPG Edition
### Standar Mutu Konkret & Kalibrasi Diri AI Agent (Benchmark Benar vs Salah)

Dokumen ini berisi contoh hipotetis untuk membedakan laporan berbasis bukti dari klaim subjektif. Contoh “benar” adalah format yang diharapkan, bukan bukti bahwa asset, Unreal project, material, cloth, lighting, boss, atau animation tersebut sudah diimplementasikan.

---

## 1. Kalibrasi Penamaan Aset & Konvensi File

❌ **SALAH (Melanggar Pipeline Hygiene)**:
```
kristal_es_baru_v2_FINAL.blend
IceThing.uasset
Kaelen_Model (1).blend
```
> *Akar Kesalahan*: Tidak mengikuti prefix kategori (`SM_`, `SK_`, `T_`), memakai spasi/duplikasi software bawaan, dan tidak deskriptif.

✅ **BENAR (Naming yang Dapat Diaudit)**:
```
SM_IceCrystal_Cluster_01.blend
SM_IceCrystal_Cluster_01.uasset
SK_Kaelen_Body.blend
```
> *Keunggulan*: Mengikuti konvensi baku, penomoran varian eksplisit (`_01`), siap diindeks oleh tool otomatisasi engine.

---

## 2. Kalibrasi Parameter Material PBR (The Triad)

❌ **SALAH (Subjektif & Tanpa Dasar)**:
> *"Saya membuat material es dengan roughness 0.05 dan warna biru terang supaya kelihatan berkilau dan bagus."*

> *Akar Kesalahan*: Nilai Roughness 0.05 di luar batas [style-guide.md](../04-art-3d/style-guide.md) (0.15–0.30), mengabaikan Subsurface Scattering (SSS), dan beralasan subjektif.

✅ **BENAR (Berbasis Dokumen Acuan)**:
> *"Material kristal es (`M_Cursed_Crystal`) dikonfigurasi dengan Base Color `#4A6FA5`, Roughness 0.22 (rentang Style Guide 0.15–0.30), Metallic 0.0, dan Subsurface Scattering Radius 0.8 cm dengan hamburan warna `#7EE8FA`. Emissive terhubung ke Material Parameter Collection `MPC_CurseMeter` sesuai Teori Bab 11.C, diuji pada kondisi pencahayaan terang dan gelap dungeon."*

> *Keunggulan*: Seluruh angka terikat pada Style Guide numerik dan terintegrasi ke sistem gameplay global.

---

## 3. Kalibrasi Laporan Task Cloth Simulation (Syal Aina)

❌ **SALAH (Klaim Narasi Tanpa Bukti Uji)**:
> *"Syal Aina sudah disimulasikan dan terlihat bagus serta bergerak natural mengikuti karakter. Task selesai."*

> *Akar Kesalahan*: Klaim subjektif, tidak mencantumkan parameter fisika, tidak menguji 4 kondisi gerak wajib, dan menyembunyikan potensi clipping.

✅ **BENAR JIKA DIDUKUNG OUTPUT UJI (Transparan dan Terukur)**:
> *"Cloth simulation Syal Aina selesai dikonfigurasi pada Chaos Cloth UE5 dengan parameter: Stiffness 0.5, Damping 0.4, Solver Iterations 10 (sesuai Style Guide Bab 4). Telah disimulasikan pada 4 kondisi gerak:*
> - *Idle (0 cm/s): Lolos tanpa distorsi.*
> - *Jog (150 cm/s): Kibaran dinamis alami.*
> - *Sprint (400 cm/s): Inersia stabil.*
> - *Evade Dash: Ditemukan clipping ringan pada pundak kanan.*
> *Menandai isu clipping dash sebagai Minor Bug untuk penyesuaian collision capsule. Task belum ditandai selesai penuh sampai verifikasi ulang lolos DoD."*

> *Keunggulan*: Data pengujian lengkap, pelaporan anomali jujur dengan klasifikasi severity, mematuhi prinsip anti-teater.

---

## 4. Kalibrasi Tata Cahaya Sektor Dungeon

❌ **SALAH (Menghilangkan Kontras Storytelling)**:
> *"Saya menambahkan beberapa point light kuning di sepanjang lorong makam agar ruangan tidak gelap total."*

> *Akar Kesalahan*: Merusak rasio chiaroscuro, menghilangkan kontras emosional antara 2700K (Aina) vs 6500K (Kutukan), dan merusak estetika gelap dungeon.

✅ **BENAR JIKA DIDUKUNG INSPEKSI SCENE (Menjaga Rasio Chiaroscuro)**:
> *"Pencahayaan ambient dungeon Sektor 1 diset pada intensitas 80 lm (6200K Kelvin) sebagai fill light sangat redup. Syal Aina menjadi satu-satunya key light dominan (1000 lm, 2700K Kelvin). Rasio kontras key-to-ambient diuji pada 10:1 (memenuhi target minimal 8:1 sesuai Style Guide Bab 5). Tidak ada penambahan lampu statis buatan di koridor agar syal tetap menjadi fokus visual satu-satunya."*

> *Keunggulan*: Menjaga pilar artistik melankolis-hangat dan mematuhi batas rasio kontras.

---

## 5. Kalibrasi Penanganan Kebutuhan di Luar Dokumen (Gap-Handling)

❌ **SALAH (Menebak Sendiri Diam-Diam)**:
> *AI Agent membutuhkan material 'Kaca Beku Reruntuhan', lalu langsung membuat shader dengan angka acak tanpa mencatat gap.*

> *Akar Kesalahan*: Melanggar SOP, menciptakan deviasi tidak terdokumentasi antar sesi kerja.

✅ **BENAR (Prosedur Gap Eksplisit & Usulan Terukur)**:
> *"Task ini memerlukan material 'Kaca Beku' untuk jendela Sektor 3, namun kategori ini belum tercantum di Style Guide Bab 2. Saya menandai ini sebagai **GAP**. Saya mengusulkan parameter awal: Base Color `#A0C4E2`, Roughness 0.10–0.18, Metallic 0.0, Transmission 0.85 untuk direview manusia sebelum ditetapkan sebagai standar resmi."*

> *Keunggulan*: Disiplin arsitektur, menyajikan solusi actionable tanpa mengambil keputusan sepihak di luar wewenang.

---

## 6. Kalibrasi Desain Boss Tematik (5 Stages of Grief)

❌ **SALAH (Musuh Generik Lepas Konteks)**:
> *"Boss Sektor 2 didesain sebagai monster api merah menyala bertanduk tajam agar terlihat sangat menyeramkan dan mematikan."*

> *Akar Kesalahan*: Lepas dari tema psikologis Sektor 2 (*Anger* sebagai topeng kepasrahan), menggunakan warna generik di luar The Triad.

✅ **BENAR (Manifestasi Trauma Psikologis Kaelen)**:
> *"Boss Sektor 2 (Ignis Vulkan) dirancang sebagai manifestasi kemarahan dingin (*Anger*) yang menutupi keputusasaan. Api yang meledak dari tubuhnya adalah api hampa yang retak menampakkan kristal es biru (`#4A6FA5`) di baliknya saat terkena hit — membuktikan kemarahannya adalah bentuk pertahanan diri yang rapuh. Palet warna tetap tunduk pada The Triad Kelvin (2700K vs 6500K)."*

> *Keunggulan*: Memiliki jiwa narasi, merefleksikan lore psikologis duka, dan patuh pada teori seni semesta Lentera Pudar.

---

## 7. Kalibrasi Animasi Kombat & Kinesiologi (Kinetic Chain & Lokomosi)

❌ **SALAH (Animasi Lengan Terisolasi & Tanpa Bobot)**:
> *"Saya membuat animasi pukulan Heavy Strike dengan memutar bone bahu dan tangan maju ke depan secara cepat. Karakter sudah memukul musuh."*

> *Akar Kesalahan*: Mengabaikan rantai kinetik (kaki, panggul, tulang belakang diam), mengabaikan weight transfer, menghasilkan pukulan "mengambang" tanpa bobot (*weightless*), tidak ada pelvic counter-rotation.

✅ **BENAR (Rantai Kinetik Penuh & Transfer Momentum Nyata)**:
> *"Animasi Heavy Cursed Strike dirancang dengan prinsip Kinetic Chain lengkap (Startup 14 frame @30fps):*
> - *Frame 1–6 (Anticipation)*: Kaki belakang menjejak dalam, panggul merendah dan berputar $-25^\circ$, bahu counter-rotate, syal Aina melambai tertinggal (follow-through).
> - *Frame 7–10 (Momentum Transfer)*: Panggul berputar cepat $+45^\circ$, torsi thoracolumbar mengalirkan tenaga ke scapula protraction dan ekstensi siku.
> - *Frame 11–13 (Impact & Wrist Lock)*: Pergelangan cakar es mengunci tepat pada frame 11, memicu Hit-Stop 3-frame (0.05s freeze) dan partikel `FX_Hit_Sparks`.
> - *Frame 14–22 (Recovery)*: Transfer berat badan selesai di kaki depan, panggul kembali ke posisi stabil. Siku menggunakan corrective morph key untuk mencegah kerutan volume."*

> *Keunggulan*: Animasi berbobot, meyakinkan secara biomekanik, patuh pada timing Style Guide dan Teori Kinesiologi.
