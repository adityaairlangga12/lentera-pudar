---
status: ACTIVE
type: SPECIFICATION
authority_scope: art.biomechanics
canonical: true
owner: character-art-team
last_reviewed: 2026-08-18
---

# Anatomi Manusia & Kinesiologi — Lentera Pudar Master Reference
### Acuan Ilmiah Sculpting, Biomechanical Rigging, Kinetic Chain Combat, & 8-Fase Lokomosi

> **Dokumen Sumber Kebenaran Anatomi & Kinesiologi (*Biomechanical & Kinesiology Reference*)**  
> Menjadi fondasi ilmiah bagi AI Agent dan 3D Animator untuk memastikan seluruh model 3D, weight-painting, corrective morphs, dan animasi combat di **Blender 5.2 LTS + Unreal Engine 5** memiliki bobot gerak (*weight transfer*), presisi anatomi, dan kealamian fisiologis.

---

## 1. Proporsi Dasar & Kanon Tubuh Hero (1:6.8 Stylized-Realistic)

| Parameter | Kaelen (Dewasa, Atletis) | Fungsi & Keterangan |
|---|---|---|
| **Tinggi Total** | $\approx 6.8$ Kepala ($1.78\text{ m}$) | Kanon proporsi atletis pengelana (*Heroic Proportions*). |
| **Lebar Bahu** | $\approx 2\text{x}$ Lebar Kepala | Build tubuh ramping terlatih, bahu kokoh untuk mengimbangi jubah. |
| **Titik Tengah Tubuh** | Pangkal Paha (*Hip / Pubic Arch*) | Titik acuan simetri pembagian tubuh atas dan bawah. |
| **Panjang Lengan** | Ujung jari mencapai pertengahan paha | Acuan validasi instan panjang humerus + radius/ulna. |
| **Panjang Kaki** | $\approx 50\%$ dari tinggi total | Jarak dari Greater Trochanter ke telapak kaki. |

> **Prinsip Stilasi (Kena Benchmark)**: Proporsi di atas adalah baseline realistis. Diberikan penyesuaian stilasi 5–10% pada area kepala dan mata agar ekspresif, tanpa merusak proporsi biomekanik tubuh.

---

## 2. Titik Rujukan Tulang Baku (Bony Landmarks)

Titik-titik tulang permukaan yang **wajib terbaca pada mesh sculpt** dan menjadi patokan penempatan sendi/bone saat rigging:

```
[Vertebra Prominens] ──> Pangkal Leher (Postur Tulang Belakang)
[Acromion & Clavicle] ──> Batas Bahu & Deltoid
[Olecranon] ─────────────> Tonjolan Siku (Pivot Elbow Bend)
[Radius/Ulna Styloid] ───> Pergelangan Tangan (Pronasi/Supinasi)
[Iliac Crest & Trochanter]> Puncak Panggul & Pivot Hip
[Patella] ───────────────> Tempurung Lutut (Pivot Knee Bend)
[Medial/Lateral Malleolus]> Mata Kaki Dalam & Luar (Batas Bawah Rig)
```

| Area Tubuh | Bony Landmark | Fungsi Praktis di Blender & UE5 |
|---|---|---|
| **Bahu** | *Acromion* & *Clavicle* | Penempatan bone `Clavicle_L/R`, batas origo otot deltoid. |
| **Siku** | *Olecranon* | Titik pivot tekukan siku; area rawan kerutan saat weight painting. |
| **Panggul** | *Iliac Crest* & *Greater Trochanter* | Penentu lebar pinggul dan pivot rotasi sendi paha (`Thigh_L/R`). |
| **Lutut** | *Patella* | Tempurung lutut; titik acuan visual deformasi saat jongkok/kuda-kuda. |
| **Mata Kaki** | *Medial & Lateral Malleolus* | Batas bawah rotasi pergelangan kaki; penentu pivot IK Foot. |
| **Pergelangan** | *Styloid Process (Radius/Ulna)* | Acuan rotasi pronasi/supinasi lengan bawah Kaelen. |
| **Pangkal Leher**| *Vertebra Prominens (C7)* | Titik acuan postur tulang belakang (tegap vs bungkuk emosional). |

---

## 3. Rantai Kinetik & Transfer Momentum Kombat (*Kinetic Chain*)

Serangan pukulan dan cakar es Kaelen bukan gerak lengan terisolasi, melainkan **rantai transfer momentum kontinu** dari tanah:

```
1. Telapak Kaki Belakang Menjejak Tanah (Ground Reaction Force)
                    ↓
2. Rotasi Pergelangan Kaki & Ekstensi Lutut
                    ↓
3. Rotasi Panggul (Pelvic Rotation) — Sumber Tenaga Utama
                    ↓
4. Torsi Tulang Belakang (Thoracolumbar Rotation)
                    ↓
5. Protraction Scapula (Tulang Belikat & Bahu Mendorong Maju)
                    ↓
6. Ekstensi Siku Lengan Penyerang
                    ↓
7. Wrist Lock (Pergelangan Mengunci Tepat Saat Impact Frame)
```

### Aplikasi Kombat Kaelen:
- **Light Punch Combo (Startup 3–5 frame)**: Rantai kinetik pendek; rotasi panggul cepat, fokus pada kelincahan dan pemulihan cepat.
- **Heavy Cursed Strike (Startup 12–18 frame)**: Rantai kinetik penuh. Membutuhkan waktu untuk transfer berat badan dari kaki belakang ke kaki depan, memuntir panggul secara maksimal, dan mengalirkan energi kutukan ke cakar es.
- **GA_ShatterStrike / Heavy Finisher (Startup 18 frame, Active 8 frame, Recovery 22 frame)**:
  - *Earthy Kinetic Chain & Heavy Recoil*: Pukulan menghantamkan seluruh massa tubuh Kaelen ke depan. Tumbukan *Guard Break* menghasilkan *recoil kinesiologis nyata* di mana tubuh Kaelen sedikit terdorong mundur oleh gaya reaksi inersia tanah (*Ground Reaction Force*).
  - *Non-Cancellable Commitment Window*: 16 frame pertama dari masa recovery ($22\text{ frame}$) merupakan komitmen gerak mutlak (*un-cancellable*). Pemain hanya dapat melakukan *Parry/Dash Cancel* pada 6 frame terakhir recovery, menjaga tensi pertarungan *deliberate ala Hellblade* dan mencegah game berubah menjadi aksi arcade ringan tanpa risiko.
- **Prinsip *Head Stays Level***: Walaupun torso dan panggul berputar kuat, kepala Kaelen tetap terkontrol stabil sebagai sauh visual pemain.

---

## 4. Kinesiologi 8-Fase Siklus Lokomosi (*Human Gait Cycle*)

```
[STANCE PHASE (60%)] ──────────────────────────────────> [SWING PHASE (40%)]
Heel Strike ➔ Loading ➔ Midstance ➔ Terminal ➔ Toe-Off ➔ Initial Swing ➔ Midswing ➔ Terminal Swing
```

### 8 Fase Siklus Gerak per Kaki:
1. **Initial Contact (Heel Strike)**: Tumit menyentuh tanah terlebih dahulu; kaki depan lurus.
2. **Loading Response**: Lutut sedikit menekuk untuk meredam tumbukan berat badan.
3. **Midstance**: Titik tumpu penuh di atas kaki; titik terendah gerak vertikal tubuh.
4. **Terminal Stance (Heel Off)**: Tumit terangkat, betis (*Gastrocnemius*) mulai meregang menghasilkan gaya dorong.
5. **Pre-Swing (Toe-Off)**: Ujung jari mendorong lepas dari lantai; dorongan momentum maksimal.
6. **Initial Swing**: Kaki melayang terayun ke depan; lutut menekuk untuk clearance dari tanah.
7. **Midswing**: Kaki melewati garis vertikal tubuh; titik ayunan tertinggi.
8. **Terminal Swing**: Lutut mulai lurus kembali bersiap untuk *Heel Strike* berikutnya.

### Tiga Dinamika Gerak Alami (Anti-Robot):
- **Pelvic Tilt (Kemiringan Panggul)**: Panggul miring turun pada sisi kaki yang menumpu saat *Midstance*, dan naik pada sisi kaki yang melayang.
- **Counter-Rotation (Torsi Bahu vs Panggul)**: Saat panggul berputar ke kiri, bahu berputar berlawanan ke kanan untuk menjaga keseimbangan momentum.
- **Pembeda Fundamental Walk vs Run**:
  - *Walk*: Selalu memiliki fase kontak ganda (*Double Support Phase*).
  - *Run*: Memiliki fase melayang tanpa kontak tanah (*Flight Phase*).
  - *Dash Kaelen*: Postur condong ke depan ekstrem (*forward lean*) dengan akselerasi langkah awal pendek.

---

## 5. Deformasi Sendi & Corrective Shape Keys (Pose-Driven Morphs)

Untuk mencegah penyusutan volume mesh (*volume loss / collapsing joints*) saat pose ekstrem di Blender dan UE5 Control Rig:

```
[Pose Ekstrem Sendi] ➔ [Driver Sudut Tulang] ➔ [Aktivasi Corrective Shape Key] ➔ [Volume Mesh Pulih + Muscle Bulge]
```

### 4 Area Sendi Prioritas Kaelen:
1. **Siku (Elbow)**:
   - *Deformasi*: Fleksi 0° s.d. 145°.
   - *Koreksi*: Mencegah kerutan gepeng di lipatan dalam siku dan memicu *Muscle Bulging* pada otot bisep saat fleksi $\ge 90^\circ$.
2. **Bahu & Scapula (Shoulder)**:
   - *Deformasi*: Elevasi lengan ke atas 0° s.d. 180°.
   - *Koreksi*: Mengangkat deltoid dan trapezius secara harmonis tanpa penetrasi mesh leher.
3. **Lutut (Knee)**:
   - *Deformasi*: Fleksi 0° s.d. 140°.
   - *Koreksi*: Menjaga tempurung patella tetap menonjol dan mencegah paha belakang menembus betis saat dash rendah.
4. **Panggul (Hip)**:
   - *Deformasi*: Fleksi paha 0° s.d. 120° dan rotasi lateral saat kuda-kuda combat.

---

## 6. Postur Tubuh & Garis Aksi Emosional (Grief Archetypes)

Bahasa tubuh Kaelen mengekspresikan dinamika 5 Tahap Berduka secara non-verbal:

- **Line of Action**: Garis lengkung imajiner energi pose yang mengalir dinamis dari kepala hingga kaki (bukan garis lurus kaku).
- **Contrapposto (Idle Pose)**: Berat badan bertumpu lebih besar pada satu kaki, pinggul miring lembut, bahu counter-balance rileks.
- **Transformasi Postur per Sektor Duka**:
  - **Sektor 1 & 2 (Denial & Anger)**: Postur tegap, dada terbuka, langkah tegas dan waspada.
  - **Sektor 4 (Depression - *Abyss of Stillness*)**: Postur menunduk, bahu merosot ke depan (*kyphotic posture*), langkah pendek dan lambat.
  - **Sektor 5 (Acceptance - *Dawning Altar*)**: Postur tegak rileks, bahu terbuka damai, tatapan mata stabil menyongsong fajar.

---

## 7. Biomekanika Asimetris Lengan Es Kaelen (*Tri-Layer Biomechanical Shingling*)

Untuk mencegah kecacatan visual di mana material kristal es padat melar elastis seperti karet (*rubbery deformation artifact*) saat sendi siku ditekuk ekstrem ($0^\circ \text{ s.d. } 145^\circ$):

```
[Layer 1: Daging Bawah] ──> Smooth Weighting (Fleksibel, SSS, Pendaran Urat Es Reaktif)
[Layer 2: Prisma Utama] ──> Rigid 100% Weighting (Kaku mutlak ke Bone Lengan Bawah/Atas)
[Layer 3: Sendi Siku]   ──> Shingle/Plate System (Lempeng kristal geser tumpang-tindih)
```

1. **Layer 1 (Daging & Urat Subsurface)**:
   - Spesifikasi target menggunakan *smooth skinning* standar untuk daging lengan di bawah balutan es, dengan deformasi elastis alami dan desain material urat es biru yang bereaksi terhadap nilai `Curse_Spread`.
2. **Layer 2 (Kluster Prisma Utama — Rigid 100% Weight)**:
   - Prisma kristal es di sepanjang *humerus* dan *radius/ulna* ditargetkan memiliki weight $100\%$ kaku ke bone `upperarm_l` dan `lowerarm_l` masing-masing tanpa gradient falloff, untuk mempertahankan sifat getas dan solid kristal es.
3. **Layer 3 (Engsel Siku & Pergelangan — Olecranon Shingle System)**:
   - Pada pivot sendi siku (*Olecranon Landmark*) dan pergelangan tangan (*Styloid Landmark*), kristal dirancang sebagai **lempeng prisma bertingkat (*interlocking geological shingles*)**. Target deformasinya: saat siku ditekuk $\ge 90^\circ$, prisma lengan bawah meluncur masuk ke bawah prisma lengan atas secara mekanis mulus; saat lengan lurus, lempeng kembali mengunci rapat tanpa meninggalkan celah kosong.
4. **Efek Mikro-Friction Niagara (`FX_CrystalJointFriction`)**:
   - Desain VFX menargetkan partikel debu uap es beku halus pada titik gesekan engsel siku saat terjadi ekstensi/fleksi kecepatan tinggi (serangan pukulan dan parry). Implementasi Niagara belum dimulai.

---

## 8. Batas Rotasi Sendi Realistis (Joint Constraint Limits)

Batasan rotasi anatomis dirancang untuk dikunci pada sistem Control Rig dan IK Solvers di engine target:

| Sendi | Rentang Rotasi Wajar | Catatan Biomekanik |
|---|---|---|
| **Siku (Elbow)** | 0° (Lurus) s.d. 145° (Tekuk Penuh) | Mencegah *hyperextension* ke arah berlawanan. |
| **Lutut (Knee)** | 0° s.d. 140° | Mengunci fleksi satu arah ke belakang. |
| **Bahu (Shoulder)** | 0° s.d. 180° (Fleksi Depan) | Rotasi multi-aksial bebas dalam batas scapula. |
| **Panggul (Hip)** | 0° s.d. 120° (Fleksi Paha) | Disesuaikan dengan posisi lutut. |
| **Leher (Neck)** | $\pm 80^\circ$ (Yaw), $+60^\circ / -40^\circ$ (Pitch) | Mencegah kepala berputar tidak wajar saat look-at target. |
| **Tulang Belakang** | $\pm 35^\circ–45^\circ$ per segmen besar | Torsi terdistribusi merata sepanjang vertebra lumbar & thoracic. |
| **Rahang (Jaw)** | $0^\circ$ s.d. $20^\circ$ (Pitch) | Mengunci artikulasi mandibula mulut. |

---

## 9. Anatomi Wajah, FACS & Bahasa Emosi (Lihat [human-facial-expressions.md](human-facial-expressions.md))
- **Otot Wajah Subkutan**: Frontalis, Corrugator Supercilii, Orbicularis Oculi, Zygomaticus Major, Depressor Anguli Oris, dan Mentalis.
- **FACS Action Units (AU)**: Rigging shape keys berbasis AU (`AU1`, `AU4`, `AU6`, `AU12`, `AU15`, `AU17`, `AU43`).
- **Duchenne Marker**: Pembeda senyum tulus (`AU6+AU12`) vs senyum topeng sosial (`AU12` tanpa `AU6`).
- **Asimetri & Micro-Expressions**: Offset 5–15% intensitas kiri-kanan wajah dan ekspresi mikro duka 1/25–1/5 detik.
- **Eye Gaze Dynamics**: Gaze aversion (rasa bersalah), gaze lock (duel), downward gaze (depresi), dan gaze drift (disosiasi denial).

