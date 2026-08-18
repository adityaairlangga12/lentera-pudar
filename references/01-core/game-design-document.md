---
status: ACTIVE
type: SPECIFICATION
authority_scope: project.identity
canonical: true
owner: game-design-team
last_reviewed: 2026-08-18
---

# Game Design Document (GDD) — Lentera Pudar: 3D Action RPG Master Bible

> **Dokumen Sumber Kebenaran Mutlak (*Game Design Source of Truth*)**  
> Mencakup seluruh filosofi, kosmologi semesta, arsitektur dual-layer (Kena & Hellblade), mekanik 3D gameplay, sistem diegetik, psikologi pemain, dan pipeline teknis **Unreal Engine 5 + Blender 5.2 LTS**.

---

## DAFTAR ISI
1. [BAB I: Identitas Proyek, Core Pillars & Arsitektur Dual-Layer](#bab-i-identitas-proyek-core-pillars--arsitektur-dual-layer)
2. [BAB II: Kosmologi Semesta & 5 Tahapan Berduka (5 Stages of Grief)](#bab-ii-kosmologi-semesta--5-tahapan-berduka-5-stages-of-grief)
3. [BAB III: Dualitas Karakter & Tragedi Ikatan Jiwa (Kaelen & Aina)](#bab-iii-dualitas-karakter--tragedi-ikatan-jiwa-kaelen--aina)
4. [BAB IV: Sistem Diegetik & Minimal HUD (Living Body & Scarf)](#bab-iv-sistem-diegetik--minimal-hud-living-body--scarf)
5. [BAB V: Mekanik Persepsi & Eksplorasi (The Eye of Frost / Eyepatch System)](#bab-v-mekanik-persepsi--eksplorasi-the-eye-of-frost--eyepatch-system)
6. [BAB VI: Sistem Kombat 3D Adaptif & Kinematika Berbobot](#bab-vi-sistem-kombat-3d-adaptif--kinematika-berbobot)
7. [BAB VII: Psikologi Auditori & Environment Mental Real-Time](#bab-vii-psikologi-auditori--environment-mental-real-time)
8. [BAB VIII: Desain Encounter & 5 Boss Trauma Manifestation](#bab-viii-desain-encounter--5-boss-trauma-manifestation)
9. [BAB IX: Pipeline Teknis & Standar Produksi (UE5 + Blender 5.2)](#bab-ix-pipeline-teknis--standar-produksi-ue5--blender-52)

---

## BAB I: IDENTITAS PROYEK, CORE PILLARS & ARSITEKTUR DUAL-LAYER

### 1.1 Identitas & Spesifikasi Proyek
- **Judul Resmi**: *Lentera Pudar — The First Spark* (Seri Pembuka Semesta Lentera Pudar).
- **Genre**: 3D Third-Person Action-Adventure RPG (Stylized-Realistic / Poetic Dark Fantasy).
- **Target Platform**: PC Windows (Steam-Ready), Steam Deck, dan Controller Support penuh.
- **Target Engine & Pipeline**: Unreal Engine 5 (kandidat teknologi: Nanite, Lumen GI, Niagara, Chaos Cloth) + Blender 5.2 LTS. Unreal project belum diinisialisasi dan arsitektur implementasinya belum diaudit.
- **Target Performa**: Solid 60 FPS / 120 FPS pada resolusi 1080p, 1440p, dan 4K ($99^{th}\text{ percentile frame time} < 16.6\text{ ms}$).

### 1.2 Cetak Biru Arsitektur Dual-Layer (*The Dual-Layer Benchmark Architecture*)
Lentera Pudar mengintegrasikan dua pilar referensi industri secara disiplin tanpa tumpang tindih:

```mermaid
flowchart TD
    subgraph LayerVisual["🎨 LAYER 1: BAGAIMANA DUNIA TERLIHAT (Kena: Bridge of Spirits)"]
        V1["Artstyle Stylized-Realistic (Proporsi 1:6.8, Siluet Bersih)"]
        V2["Pencahayaan Kontras Tinggi Kelvin (2700K vs 6500K Lumen GI)"]
        V3["Environment Organik & Reruntuhan Kuno yang Hidup Kembali"]
        V4["Restorasi Jejak Hangat (Niagara Sparks & Area Re-warming)"]
    end

    subgraph LayerGameplay["🧠 LAYER 2: BAGAIMANA DUNIA TERASA DIMAINKAN (Hellblade I & II)"]
        G1["Kondisi Mental Karakter = Sistem Gameplay Inti (Diegetic UI)"]
        G2["Curse Meter sebagai Pertumbuhan Es Fisik (The Darkness Body Spread)"]
        G3["Binaural Spatial 3D Audio & Whispers of the Frozen"]
        G4["Mekanik Persepsi Eyepatch (Perspective & Alignment Puzzles)"]
        G5["Kombat 1v1 Deliberate, Heavy Impact & Tight Parrying"]
        G6["Live Mental Morphing Environment & Close-Camera Cinematics"]
    end

    LayerVisual --> MasterGame["✨ LENTERA PUDAR: THE FIRST SPARK<br>(Poetic Melancholy & Heavy Psychological Combat)"]
    LayerGameplay --> MasterGame
```

### 1.3 Teori Tiga Warna & Kontras Suhu Kelvin (*The Triad of Lentera Pudar*)
Seluruh perancangan visual, shader, material, dan lighting wajib tunduk pada **Hukum Tiga Warna (The Triad)**:
1. **Kuning Hangat (`#F4B860` — 2700K Kelvin Warm Emissive)**:
   Mewakili Jiwa Aina, api syal lentera, sumber harapan, dan cinta tanpa pamrih. Menerangi kegelapan melalui point light dinamis Lumen.
2. **Biru Dingin (`#4A6FA5` & `#7EE8FA` — 6500K Kelvin Cold Shard)**:
   Mewakili Kutukan Pudar, kristal es memori, kepasrahan, dan mati rasa emosional. Memancarkan uap beku dan pendaran emissive kristal pada lengan kiri Kaelen.
3. **Netral Gelap (`#2A211C` — Dark Neutral Stone)**:
   Mewakili reruntuhan dungeon kuno, tanah fana, abu masa lalu, jubah kelana Kaelen, dan penentu atmosferik bayangan 3D.

---

## BAB II: KOSMOLOGI SEMESTA & 5 TAHAPAN BERDUKA (5 STAGES OF GRIEF)

### 2.1 Hakikat Hakiki Kutukan Pudar (*The Fading Curse / Emotional Apathy*)
Kutukan Pudar bukan sekadar es fisik atau sihir kutukan iblis. Pudar adalah **perwujudan fisik dari kepasrahan total dan kepunahan hasrat hidup (Emotional Numbness / Anhedonia)**.
- Ketika manusia mengalami kepedihan dan trauma hidup yang melampaui batas kewarasannya, suhu tubuh mereka mendingin, molekul mereka melambat, dan jiwa mereka mengkristal menjadi **patung kristal es biru pudar (`#4A6FA5`)**.
- **Ironi Psikologis**: Menjadi es terasa "damai dan bebas dari rasa sakit". Membakar lentera untuk mencairkan mereka berarti mengembalikan rasa sakit dan kenangan pedih hidup mereka.
- **Kristal Es Pudar**: Es ini terbentuk dari air mata dan kenangan masa lalu yang membeku abadi.

### 2.2 Tiga Respon Manusia terhadap Pudar
1. **The Frozen Ascetics (Kaum Pasrah)**: Memilih membeku sukarela dan menganggap api lentera sebagai pengacau kedamaian abadi mereka.
2. **The Ash Fanatics (Pemuja Abu)**: Membakar rumah, sejarah, dan kemanusiaan mereka demi menjaga api unggun tetap menyala karena takut mati rasa.
3. **The Drifters (Para Pengelana — Seperti Kaelen)**: Terjebak di batas kenyataan: separuh tubuh mati rasa oleh es, separuh tubuh menahan perihnya api lentera.

### 2.3 Pemetaan 5 Sektor Dungeon (Model Kübler-Ross & Environmental Storytelling)
*Detail tata ruang spasial, verticality, breadcrumbing diegetik, dan simbiosis arena FSM merujuk pada [level-design-storytelling.md](../02-gameplay/level-design-storytelling.md).*

```
[Sektor 1: DENIAL] ➔ [Sektor 2: ANGER] ➔ [Sektor 3: BARGAINING] ➔ [Sektor 4: DEPRESSION] ➔ [Sektor 5: ACCEPTANCE]
```

| Sektor | Tahap Duka | Nama Wilayah | Suasana Visual & Atmosfer | Bos Wilayah |
|---|---|---|---|---|
| **Sektor 1** | **Denial** (Penyangkalan) | *The Silent Crypts* | Makam beku kuno di mana patung-patung warga membeku saat sedang berpura-pura beraktivitas normal. Koridor sempit simetris berulang (*looping claustrophobia*). | **Lord Alden**, Sang Penjaga Gerbang Kosong (Kesatria zirah es yang menolak kerajaannya telah musnah). |
| **Sektor 2** | **Anger** (Kemarahan) | *The Blazing Frost* | Peleburan es di mana amarah dingin meledak-ledak. Jalur terputus tajam, friksi navigasi tinggi, dan reruntuhan *destructible*. | **Ignis Vulkan**, Sang Pandai Besi Api Hampa. |
| **Sektor 3** | **Bargaining** (Tawar-Menawar) | *The Hall of Mirrors* | Labirin cermin waktu dan arsip perjanjian kuno terendam air es. Pantulan cermin memperlihatkan masa lalu palsu dan rute bercabang semu. | **Lady Vespera**, Sang Penenun Perjanjian. |
| **Sektor 4** | **Depression** (Depresi) | *The Abyss of Stillness* | Danau keheningan gelap tanpa suara. Ruang luas hampa (*descending verticality*), langkah kaki terasa sangat berat. | **The Hollow Reflection** (Manifestasi bayangan trauma Kaelen sendiri). |
| **Sektor 5** | **Acceptance** (Penerimaan) | *The Dawning Altar* | Puncak menara di mana fajar pertama menembus badai es abadi. Ruang lapang terbuka dengan sightline panjang menuju Benua Luar (*Overworld*). | **The Sovereign of Dawn** (Ujian akhir rekonsiliasi batin). |

### 2.4 Kehidupan Lingkungan & Reaktivitas Dunia (*Ambient World Life & Local World Awareness*)
*Spesifikasi perilaku NPC latar, ekosistem satwa duka, dan persistensi lokal merujuk pada [ambient-world-life.md](../02-gameplay/ambient-world-life.md).*
- **Kontras Dunia Netral**: Dunia tetap hidup dan bergerak netral, mempertegas kontras dengan beban batin Kaelen.
- **Rutinitas NPC Ambient**: 2–3 idle actions asinkron dengan kontak mata singkat halus saat Kaelen melintas.
- **Ekosistem Satwa Spasial**: Perilaku satwa latar mencerminkan tahap duka (Denial: pola berulang; Anger: panik kabur; Acceptance: hinggap tenang).
- **World Awareness Lokal**: Reruntuhan es yang hancur dan jejak kaki di salju/abu tetap bertahan selama sesi di sektor terkait.

---

## BAB III: DUALITAS KARAKTER & TRAGEDI IKATAN JIWA (KAELEN & AINA)

```
                     [ TRAGEDI IKATAN JIWA ]
             
    🗡️ KAELEN (Protagonis 3D)           🧣 AINA (Jiwa Syal Lentera)
    • Sang Pembawa Rasa Bersalah.       • Sang Pengorbanan Murni.
    • Setengah beku di lengan kiri       • Membakar wujud fisiknya menjadi
      karena keputusasaan masa lalu.       syal api emas 2700K.
    • Bertarung tangan kosong & cakar.   • Menjadi kompas & jangkar batin.
    • Mata kanan tersegel eyepatch.      • Memendek permanen di tiap Altar Duka.
```

### 3.1 Protagonis: Kaelen (Sang Pengelana Duka)
- **Anatomi & Proporsi**: Pria bertubuh atletis (proporsi 1:6.8, siluet bersih ala *FF7 Remake / Kena*), berambut abu-abu perak acak.
- **Lengan Kiri Beku (`#4A6FA5` & `#7EE8FA`)**: Dibalut kluster prisma kristal es tajam yang berdenyut emissive reaktif, berujung pada cakar es kristal (*crystal talons*).
- **Mata Kanan Tersegel (*Eyepatch* `#141013`)**: Penutup mata kulit hitam dengan gesper perak sebagai segel penahan luka beku kutukan masa lalu.
- **Tangan Kanan Normal**: Dibalut perban spiral pelindung kepalan tangan (`#FAF2EC` / `#D0C4BA`), mengeksekusi pukulan fisik berbobot (*earthy impact*).
- **Pakaian**: Jubah kelana gelap usang (`#2A211C`) dengan tali selempang kantung kulit bersilang di dada (*baldric harness*).

### 3.2 Sang Pelindung Abadi: Aina (Jiwa di Balik Syal Kuning)
- **The Fading Scarf (`#F4B860` 2700K)**: Syal kain emas melingkar di leher Kaelen, memancarkan cahaya hangat lembut yang menerangi lingkungan 3D dungeon.
- **Simulasi Fisika Kain Dinamis**: Desain target menggunakan *Cloth Simulation & Spring Bones* (5-bone chain) agar syal dapat berkibar mengikuti gravitasi, inersia langkah kaki, dan tiupan angin badai es; implementasi Unreal belum dimulai.
- **Mekanik Naratif: *4 Stages of Sacrifice***:
  Setiap kali Kaelen menyalakan Altar Duka di akhir sektor dungeon, nyala api menyerap jiwa Aina, menyebabkan panjang syal memendek secara permanen (Panjang ➔ Sedang ➔ Pendek ➔ Koyak/Fragmen).

---

## BAB IV: SISTEM DIEGETIK & MINIMAL HUD (LIVING BODY & SCARF)

Lentera Pudar mengadopsi filosofi antarmuka **Zero-Clutter Diegetic HUD** (terinspirasi dari *Hellblade* dan *Dead Space*), di mana kondisi karakter terbaca langsung dari tubuh dan dunianya.

```mermaid
flowchart LR
    subgraph DiegeticStatus["Status Tubuh & Lingkungan (Tanpa Bar Layar)"]
        D1["Es Merambat di Lengan/Leher ➔ Tingkat Curse Meter"]
        D2["Denyut & Arah Kibaran Syal ➔ Penunjuk Arah / Kompas Emosional"]
        D3["Intensitas Bisikan Binaural ➔ Tingkat Bahaya & Kedekatan Bos"]
        D4["Napas Terengah & Postur Bungkuk ➔ Stamina Menipis"]
    end
```

### 4.1 Pertumbuhan Es Fisik (*The Curse Spread / The Darkness*)
- Tidak ada health/curse bar konvensional yang mendominasi layar.
- **Rambatan Kristal Es**: Saat Kaelen terkena serangan berat, gagal parry, atau menggunakan kekuatan es secara berlebihan, rancangan shader visual via parameter dinamis `Curse_Spread` (skala normalisasi $0.0\text{ s.d. } 1.0$, dipetakan dari gameplay `CurseMeter` $0\text{ s.d. } 100\text{ poin}$ via formula $\text{Curse\_Spread} = \text{CurseMeter} / 100.0$) secara visual merambatkan es dari cakar ($0.0$), siku ($0.25$), bahu ($0.60$), dada ($0.90$), hingga menyentuh pipi dan leher ($1.0$).
- **Peringatan Kritis**: Saat *Curse Meter* mendekati 90% (`Curse_Spread \ge 0.90`), urat-urat es di wajah Kaelen berpendar biru tajam dan layar mengalami desaturasi dingin (*frost vignette*).

### 4.2 Kompas Emosional Syal Aina (*Scarf Emotional Compass*)
- Tidak ada minimap atau penunjuk arah GPS buatan.
- **Ujung Kibaran Syal**: Ujung syal Aina selalu berkibar lembut mengarah ke Altar Duka terdekat atau jalan keluar.
- **Denyut Cahaya**: Ketika Kaelen mendekati rahasia tersembunyi atau puzzle lingkungan, syal berdenyut lebih terang dengan frekuensi mirip detak jantung yang menenangkan.

### 4.3 Kegagalan Kombat, Framing Kematian & Sistem Respawn Diegetik

#### 4.3.1 Ilusi Kepasrahan Abadi (*Permadeath Illusion / The Freeze of Despair — Boss & Trauma Failure Loop*)
Sistem kegagalan naratif khusus pada pertempuran bos atau pertempuran intens tingkat tinggi, menggabungkan tensi psikologis *permadeath* ala *Hellblade* dengan katarsis duka puitis:

1. **Kondisi Pemicu (*Trigger Condition*)**:
   - Terpicu ketika *Curse Meter* terisi penuh ($100\%$) sebanyak **3 kali kumulatif** dalam satu sesi pertempuran bos (`CurseOverloadCount == 3`).
   - Berbeda dari kematian HP biasa, pemicuan ini menandakan Kaelen menyerah pada keputusasaan dan mati rasa emosional (*The Freeze of Despair*).

2. **Sinematik Refleksi Trauma & Pacing Bertingkat (*Layered Narrative Pacing*)**:
   - **Pemicuan Pertama (Full Trauma Cutscene)**:
     - Layar membeku total dengan audio es retak tajam, kamera berputar ke *close-up* wajah Kaelen saat kristal es merambat menutupi pupil matanya.
     - Layar bertransisi ke ruang memori monokrom gelap (*The Void of Memory*), memperlihatkan siluet masa lalu tragedi Kaelen sebelum bisikan hangat Aina (`#F4B860` 2700K Kelvin Lumen) menariknya kembali dari jurang mati rasa (*"Kaelen... jangan biarkan dingin ini mengambilmu..."*).
     - Durasi sinematik: 8–10 detik, tidak dapat di-skip (*unskippable*) pada penayangan pertama demi resonansi emosional mendalam.
   - **Pemicuan Berulang pada Bos yang Sama (*Abbreviated Trauma Whisper — Anti-Fatigue Guardrail*)**:
     - Jika pemain mengalami *Freeze of Despair* kembali pada pertempuran bos yang sama, sistem **TIDAK MENGULANG** sinematik panjang secara utuh untuk menjaga ritme gameplay dan mencegah degradasi bobot naratif (*narrative fatigue*).
     - Digantikan oleh transisi kilat 3 detik (*micro-fade*): desis es membeku, kilatan siluet Aina memeluk Kaelen, dan 1 baris bisikan vokal acak yang mendesak, lalu langsung respawn.

3. **Titik Respawn & Pemulihan Kontrol (*Boss Checkpoint & Control Handoff*)**:
   - **Titik Respawn**: Kaelen di-respawn di **Depan Gerbang Kabut Bos (*Boss Fog Gate / Arena Archway*)** atau *Major Checkpoint Altar Duka* terdekat di sektor tersebut.
   - **Transisi Kamera**: Kamera kembali ke posisi *Third-Person Exploration* (FOV 78°) dengan transisi *fade-in* 1.5 detik saat Kaelen bangkit dari posisi berlutut.

4. **Kondisi Status & Reset Dunia (*Boss State & Resource Reset*)**:
   - **Curse Meter**: Di-reset penuh ke **$0\%$** (berbeda dari respawn biasa $25\%$), karena kehangatan pengorbanan jiwa Aina dalam cutscene telah menyucikan kembali kristal es yang membekukan jiwa Kaelen.
   - **HP Kaelen**: Dipulihkan penuh ke $100\%$.
   - **Status Bos & Arena**: Pertarungan bos me-reset penuh (**HP Bos $100\%$**, fase serangan kembali ke Fase 1, dan destruksi pilar khusus arena bos kembali utuh) untuk menjaga keutuhan tantangan duel 1v1.

5. **Guardrails Teknis Anti-Interupsi & State Locks**:
   - **Cutscene Invulnerability Lock**: Saat kondisi `CurseOverloadCount == 3` terdeteksi, mekanisme gameplay dirancang untuk mengaplikasikan tag status `State.TraumaCutsceneLock` dan `State.Invulnerable`. Seluruh input pemain (gerak, serang, dodge) dikunci, damage eksternal dan akumulasi kutukan dihentikan total, dan AI bos dinonaktifkan agar tidak ada proyektil atau animasi serangan yang menginterupsi sinematik.
   - **Spectral & Animation Cleanup**: Event `OnFreezeOfDespairTrigger` memanggil pembersihan status spektral (`ClearAllSpectralStates`), mengunci kembali penutup mata (`bIsEyepatchActive = false`), mereset modifier kecepatan, dan melepas kuncian kamera (`ClearBossLockOn`).

#### 4.3.2 Sistem Respawn Combat Biasa (*Non-Freeze of Despair / Minor Failure Loop*)
Dirancang khusus untuk kegagalan saat melawan musuh koridor/kroco biasa tanpa merusak imersi atau memicu cutscene naratif berat:
1. **Titik Respawn (Ambang Pintu Aman & Breather Room)**:
   - Kaelen di-respawn pada **Ambang Pintu Masuk Arena (*Encounter Threshold / Safe Archway*)** atau *Breather Room* terdekat tepat sebelum ruangan pertarungan tersebut.
   - *Logika Desain*: Menghindari frustrasi me-replay 15–30 menit eksplorasi dungeon, namun tetap memberikan jeda spasial agar pemain dapat menata ulang strategi duel 1v1.
2. **Transisi Visual Saat Kalah (*Frost Glaze & Audio Muffle*)**:
   - Tanpa teks "YOU DIED" atau "GAME OVER" generik di layar.
   - Saat Kaelen tumbang, kamera terkunci rendah memperlihatkan lutut Kaelen jatuh ke lantai, lapisan kristal es tipis merambat cepat dari tepi layar (*Frost Vignette Glaze*), suara audio teredam (*low-pass filter 400Hz* seolah tenggelam dalam dingin), lalu layar memudar cepat (*fade to black-blue `#141013`*) selama 1.5 detik.
3. **Transisi Visual Saat Respawn (*Dynamic Thawing & Aina's Warmth Pulse*)**:
   - Layar memudar kembali (*fade in*) memperlihatkan Kaelen bertumpu pada satu lutut di ambang pintu aman.
   - **Isyarat Diegetik**: Lapisan kristal es di dada dan pipi Kaelen merekah retak dan mencair kembali (*dynamic vertex thawing*), Syal Aina (`#F4B860` 2700K) berkedip hangat dua kali dengan pendaran Lumen lembut, disertai efek audio hembusan napas lega Kaelen (*soft exhalation*). Kaelen bangkit berdiri dan kontrol langsung aktif tanpa jeda.
4. **Penalti & Konsekuensi (*Trade-Off & Retensi Persistensi*)**:
   - *Curse Meter Stabilization*: Curse Meter diatur ulang ke batas ambang dasar sektor (25%), bukan 0% — mencerminkan bahwa duka dan kutukan tidak pernah hilang total secara magis.
   - *Encounter Reset vs World Persistence*: Formasi musuh di ruangan terkait me-reset posisi, namun reruntuhan pilar dan objek yang telah dihancurkan Kaelen tetap hancur (*Local World Awareness persistensi*).
   - *Zero Artificial Punishment*: Tidak ada pengurangan panjang Syal Aina atau kehilangan resource (panjang syal murni memendek hanya di Altar Duka secara naratif).
5. **Frekuensi Checkpoint Minor per Sektor**:
   - Setiap sektor memiliki **1 Major Checkpoint (Altar Duka)** di awal/akhir sektor dan **2–3 Minor Checkpoints (Breather Rooms / Safe Archways)** di sepanjang koridor.
   - Interval penempatan: Rata-rata 1 checkpoint minor setiap 2–3 ruang encounter combat (waktu tempuh 4–6 menit eksplorasi), menjaga ritme ketegangan tanpa memanjakan atau menghukum berlebihan.
6. **Dinamika Pemulihan Curse Meter di Breather Room**:
   - **Laju Penurunan**: Saat Kaelen berdiam/duduk di dalam radius *Breather Room* (`BP_BreatherZone`), *Curse Meter* berkurang secara pasif dengan laju **$-2\text{ poin/detik}$**.
   - **Batas Ambang Minimum (*Sector Baseline Floor*)**: Pemulihan di Breather Room berhenti pada batas ambang **$25\%$** (tidak bisa turun hingga 0%). Hanya penyalaan Altar Duka resmi yang dapat menyucikan kutukan hingga $0\%$.
   - **Isyarat Visual & Audio Diegetik**: Pendaran biru dingin pada kristal siku Kaelen perlahan meredup, uap beku di dada menguap menjadi percikan partikel bara emas hangat Aina (`#F4B860` 2700K), diiringi efek audio desis es yang mencair lembut (*gentle thaw hum*) dan detak denyut syal yang melambat tenang.
7. **Guardrails Teknis & Edge-Case Failure Handling**:
   - **Sanctuary State & Cutscene Invulnerability**: Area Altar Duka berstatus zona suci bebas musuh (*Sanctuary State*). Saat interaksi cutscene dimulai, alur gameplay dirancang untuk memicu tag `State.Invulnerable` pada Kaelen (imun terhadap seluruh damage dan penambahan kutukan) hingga kontrol pemain pulih sepenuhnya, mencegah desinkronisasi kamera atau kematian saat cutscene.
   - **Encounter Aggro Boundary & Anti-Spawn-Camping**: Titik respawn di *Safe Archway* terletak di luar batas pemicu aggro musuh (`BP_EncounterTriggerBoundary`). Musuh tidak dapat melintasi ambang batas ini dan posisi AI musuh otomatis me-reset ke titik asal ruangan saat pemain respawn, mencegah loop kematian instan.
   - **Shader Parameter Clamping & Reset**: Scalar parameter `FrostVignetteOpacity` pada post-process dan dynamic vertex thawing mesh Kaelen wajib di-clamp ketat ($0.0 \le \text{FrostOpacity} \le 1.0$) dengan perintah reset paksa ke $0.0$ saat Kaelen bangkit berdiri, mencegah tumpukan visual glitch jika terjadi kegagalan berturut-turut.
   - **Hierarki Prioritas FSM & Reset Status Spektral**:
     - *Hierarki Failure*: Jika HP Kaelen habis tepat bersamaan dengan tercapainya ambang 3x Curse Meter 100% pada pertarungan bos, FSM kematian mendahulukan *The Freeze of Despair* (`Priority Level 1`) di atas *Minor Combat Respawn* (`Priority Level 2`).
     - *Spectral Reset on Respawn*: Pemicuan event respawn (`OnRespawnInitialize`) secara otomatis mengeksekusi pembersihan status spektral (`ClearAllSpectralStates`), mengunci kembali *Sealed Eyepatch* (`bIsEyepatchActive = false`), menghentikan timer laju kutukan $+3\text{ poin/detik}$, dan mengembalikan color grading kamera ke profil default.

### 4.4 Sistem Antarmuka Minimal & Aksesibilitas Empatik (Lihat [ui-ux-accessibility.md](../02-gameplay/ui-ux-accessibility.md))
- **Antarmuka Diegetik Utama**: Indikator status tersemat langsung pada tubuh Kaelen (es lengan kiri & panjang syal emas). HUD non-diegetik memudar otomatis saat eksplorasi.
- **Aksesibilitas Komprehensif**: Mode buta warna berbasis bentuk simbol, closed captions vokal emosional, visual cues untuk audio tell, dan slider parry window assist (12 frame ➔ 18 frame).
- **Localization-Ready Architecture**: Desain text container dinamis (+40% ekspansi) dan zero baked text pada aset tekstur 3D.

---

## BAB V: MEKANIK PERSEPSI & EKSPLORASI (THE EYE OF FROST / EYEPATCH SYSTEM)

### 5.1 Mekanik Mata Tersegel (*The Sealed Right Eye: Temptation of Sight*)
Pemain dapat menahan tombol khusus (*Hold Button*) untuk **membuka sesaat penutup mata kanan Kaelen**.

```
[Buka Eyepatch] ➔ [Post-Process Spectral Ice World] ➔ [Lihat Memori & Simbol] ➔ [RISIKO: Curse Naik + Bisikan Menggila]
```

- **Fitur Penglihatan Spektral**:
  1. Mengungkap jalan setapak rahasia yang terbuat dari jembatan es transparan.
  2. Melihat titik lemah musuh/bos yang terbungkus lapisan kristal tipis.
  3. Mengungkap memori masa lalu para korban (*Echoes of the Past*).
- **Konsekuensi *Risk-Reward***:
  - Membuka mata kanan berarti menatap langsung ke jurang Kutukan Pudar.
  - Setiap detik mata terbuka, **Curse Meter bertambah +3 poin/detik** (dari total 100 poin) dan bisikan jiwa beku di telinga pemain makin keras dan agresif.
  - Pemain dipaksa membuat keputusan taktis: *"Berapa lama aku berani membuka mata ini demi melihat jalan?"*

### 5.2 Puzzle Penyelarasan Perspektif Lingkungan (*Environmental Perspective Alignment*)
Terinspirasi dari mekanik persepsi *Hellblade*:
- Pemain menemukan gerbang batu kuno yang disegel oleh pecahan rune es.
- Pemain harus memposisikan kamera 3D Kaelen pada sudut pandang tertentu sehingga reruntuhan batu, pilar yang runtuh, dan retakan es di dinding membentuk simbol yang utuh.
- Saat simbol selaras sempurna, syal Aina memancarkan kilau emas yang membakar segel es gerbang tersebut.

---

## BAB VI: SISTEM KOMBAT 3D ADAPTIF & KINEMATIKA BERBOBOT

### 6.1 Kamera Dinamis Adaptif (*Adaptive Dynamic Camera Stance*)
Kamera beralih secara dinamis dan mulus (*smooth interpolation*) antara dua mode:

```
                  [ ADAPTIVE CAMERA SYSTEM ]
                             │
       ┌─────────────────────┴─────────────────────┐
       ▼                                           ▼
[MODE EKSPLORASI (Ala Kena)]             [MODE DUEL / LOCK-ON (Ala Hellblade)]
• Jarak: 3.8 – 4.5 Meter                 • Jarak: 2.6 – 3.0 Meter (Over-Shoulder)
• FOV: 78° (Luas & Bebas)                • FOV: 70° (Ketat & Intim)
• Fokus: Reruntuhan & Gerak Syal         • Fokus: Gerak Tubuh Musuh & Timing Parry
```

### 6.2 State Machine Kombat 3D (FSM)

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Jog : Input Gerak
    Jog --> Sprint : Tahan Sprint
    Jog --> Idle : Lepas Input

    Idle --> LightCombo : Tekan Serang (Tangan Berban)
    LightCombo --> HeavyCursedStrike : Tahan Serang (Cakar Es)
    LightCombo --> EvadeDash : Tekan Dash
    
    Idle --> ParryStance : Tombol Guard / Deflect
    ParryStance --> ParryCounter : Sukses Window (12 Frame)
    ParryStance --> Hurt : Gagal / Terlambat

    Hurt --> Idle : Recovery
    Hurt --> FreezeDeath : Curse Meter Penuh
```

1. **Light Punch Combo (1–3 Hit)**:
   Kaelen melancarkan pukulan tinju tangan kanan berbalut perban. Memiliki inersia berat (*earthy root-motion*), menghasilkan getaran fisik padat pada musuh.
2. **Heavy Cursed Strike / Ice Palm Strike**:
   Hantaman cakar kristal es tangan kiri yang memicu ledakan kristal es area (`#4A6FA5`). Menghasilkan *stagger* besar pada musuh, namun menaikkan *Curse Meter* Kaelen sebesar +10%.
3. **Tight Parry Window & Deflect**:
   Jendela tangkisan presisi (12 frame / 0.2 detik). Tangkisan sukses memicu efek *hit-stop* 50ms (rancangan *hit-stop task* Delta-Time Accumulator), pecahan bunga api emas Aina, dan membuka ruang untuk *Parry Counter* mematikan.
4. **Evade Dash**:
   Gerakan meluncur cepat ke samping/belakang meninggalkan jejak percikan api emas syal Aina (`#F4B860`), memiliki *invulnerability frames* (i-frames) singkat.

### 6.3 Rasa Hantaman & Kinematika (*Combat Kinematics & Weight*)
- **Hit-Stop (Delta-Time Accumulator / Impact Freeze)**: 
  - Dirancang untuk dipetakan ke rancangan task ability (`UAbilityTask_HitStop`) dengan durasi waktu absolut **$50\text{ ms}$ ($0.050\text{ detik}$)** menggunakan *Delta-Time Accumulator* (menghentikan `PlayRate = 0.0f` pada Anim Montage dan mengembalikannya ke `1.0f` saat akumulasi waktu tercapai; arsitektur runtime konkret akan diaudit pada H1).
  - *Frame-Rate Independent*: Menjamin rasa benturan tulang dan kristal es terasa konsisten dan berbobot di 30 FPS (Steam Deck), 60 FPS, maupun 120 FPS tanpa terpengaruh lonjakan *frame-drop*.
- **Procedural Screen Shake & Impulse**: Getaran kamera directional sesuai sudut tebasan/pukulan.
- **Physical Particle Feedback**: Pecahan kristal es tajam dan debu reruntuhan batu berhamburan saat pukulan mendarat.

### 6.4 Arketipe Musuh & Balancing Kombat (Lihat [enemy-design-balancing.md](../02-gameplay/enemy-design-balancing.md))
- **Arketipe Manifestasi Duka**: *The Echo* (Denial - duplikasi & ilusi), *The Berserker* (Anger - agresif & parry-reward), *The Deceiver* (Bargaining - proyektil semu & cover), *The Weight* (Depression - tanky & shockwave), *The Mirror* (Acceptance - refleksi gaya Kaelen).
- **Attack Telegraphing**: Fase windup minimal 12–18 frame dengan kilau biru dingin `#4A6FA5`, perubahan siluet instan, dan audio cues spasial.
- **Fun Guardrails**: Nilai kepuasan mekanik (*mechanical satisfaction*) dan responsivitas kontrol tidak boleh dikorbankan demi tema berat.

### 6.5 Progresi Kemampuan Kaelen per Sektor Duka (Lihat [sector-ability-progression.md](../02-gameplay/sector-ability-progression.md))
- **Model GRIS Naratif-Sekuensial**: Kemampuan baru terbuka di akhir sektor saat menyalakan Altar Duka dan mengorbankan panjang Syal Aina:
  1. *Sektor 1 (Denial)* ➔ **Retakan Penyangkalan (*Fracture of Denial*)**: Guard break tameng tebal & penghancur dinding kristal es rapuh.
  2. *Sektor 2 (Anger)* ➔ **Pusaran Amarah Beku (*Frost Surge*)**: Forward lunging thrust stagger, knockback area & gap-jump melintasi jurang es.
  3. *Sektor 3 (Bargaining)* ➔ **Kilasan Cermin Waktu (*Reflective Echo*)**: Deflect pantulan proyektil 360° & pengaktifan puzzle rune cermin.
  4. *Sektor 4 (Depression)* ➔ **Jangkar Keheningan (*Anchor of Stillness*)**: Shockwave anti-stagger, peredam curse meter 50%, dan pemadat pijakan es rapuh.
  5. *Sektor 5 (Acceptance)* ➔ **Percikan Fajar Abadi (*The Sovereign Spark*)**: Frost-fire harmonization, pembersih kutukan instan, dan pembuka gerbang Overworld.

---

## BAB VII: PSIKOLOGI AUDITORI & ENVIRONMENT MENTAL REAL-TIME

### 7.1 Bisikan Spasial Binaural 3D (*Binaural Whispers of the Frozen*)
- Desain audio Lentera Pudar menargetkan tata suara 3D spatialized; MetaSounds / Audio Spatialization merupakan kandidat teknologi yang akan diaudit pada fase implementasi Unreal:
- **Suara Jiwa Beku (Binaural Whispers)**: Bisikan-bisikan dingin berbicara langsung ke telinga kiri dan kanan pemain menggunakan headset:
  - *"Menyerahlah Kaelen... menjadi es tidak terasa sakit."*
  - *"Lihat syalnya, dia sekarat karenamu..."*
  - *"Di belakangmu! Awas!"* (Sebagian bisikan membantu, sebagian menjatuhkan mental pemain).
- **Intensitas Adaptif**: Frekuensi bisikan meningkat drastis saat *Curse Meter* tinggi dan saat memasuki arena bos.

### 7.2 Perubahan Lingkungan Mental Real-Time (*Live Mental Morphing Environment*)
Terinspirasi dari *Hellblade II*, ruangan dungeon tidak statis:
- Ketika *Curse Meter* Kaelen meningkat tinggi atau saat menghadapi trauma masa lalu, desain menargetkan **koridor dungeon merekah, dinding es memanjang secara visual, dan siluet wajah-wajah beku muncul di dinding** tanpa layar loading. *World Position Offset* dan teknik morphing yang kompatibel dengan Nanite masih merupakan kandidat implementasi dan akan diaudit setelah arsitektur Unreal tersedia.
- Ketika Kaelen menyalakan Altar Duka, dinding kembali stabil dan rona hangat 2700K perlahan merambat menyelimuti lantai batu.

### 7.3 Hierarki Musik Adaptif & Audio Ducking
1. **Dua Kutub Aransemen**:
   - **Kutub Dingin (Duka & Kesendirian)**: Droning frekuensi rendah (sub-bass), desau badai salju, dan derit pecahan kristal es.
   - **Kutub Hangat (Aina & Harapan)**: Denting piano berdebu yang intim, petikan gitar akustik nylon lembut, dan solo cello melankolis.
2. **Dynamic Ducking**: Saat Aina berbisik melalui syalnya, seluruh audio ambient dungeon meredup (*ducking -6dB*), menaruh fokus penuh pada kehangatan suaranya.

---

## BAB VIII: DESAIN ENCOUNTER & 5 BOSS TRAUMA MANIFESTATION

Setiap bos di 5 Sektor Dungeon bukan sekadar musuh fisik penjaga pintu, melainkan **cerminan luka batin dan tahapan berduka Kaelen** yang menolak disembuhkan:

```mermaid
flowchart TD
    B1["👑 SEKTOR 1: LORD ALDEN (Denial)<br>Kesatria Zirah Es • Menolak Kerajaannya Musnah • Tameng Es Tak Tertembus"]
    B2["🔨 SEKTOR 2: IGNIS VULKAN (Anger)<br>Pandai Besi Api Hampa • Amarah Es Meledak • Lantai Meleleh Dingin"]
    B3["🪞 SEKTOR 3: LADY VESPERA (Bargaining)<br>Penenun Waktu • Ilusi Masa Lalu • Tawar-Menawar Menipu"]
    B4["👤 SEKTOR 4: THE HOLLOW REFLECTION (Depression)<br>Bayangan Kaelen Sendiri • Meniru Gaya Bertarung Pemain • Keheningan Total"]
    B5["🌅 SEKTOR 5: THE SOVEREIGN OF DAWN (Acceptance)<br>Ujian Rekonsiliasi Terakhir • Fajar Terbit • Gerbang Overworld Terbuka"]

    B1 --> B2 --> B3 --> B4 --> B5
```

### 8.1 Rincian Desain 5 Bos Utama
1. **Sektor 1 (Denial) — Lord Alden, Sang Penjaga Gerbang Kosong**:
   - *Fase 1*: Bertarung di balik tameng es raksasa. Menolak mengakui bahwa prajuritnya sudah menjadi patung es.
   - *Mekanik*: Pemain harus membuka *Eyepatch* sesaat untuk melihat retakan tersembunyi pada zirah punggungnya.
2. **Sektor 2 (Anger) — Ignis Vulkan, Sang Pandai Besi Api Hampa**:
   - *Fase 1*: Menghantamkan palu es raksasa yang menyemburkan pecahan magma beku.
   - *Mekanik*: Arena pertempuran terbelah; pemain harus menggunakan *Evade Dash* melompati retakan api dingin.
3. **Sektor 3 (Bargaining) — Lady Vespera, Sang Penenun Perjanjian**:
   - *Fase 1*: Berpindah-pindah melalui cermin dinding raksasa, menciptakan klon masa lalu yang membujuk Kaelen.
   - *Mekanik*: Pemain menyelaraskan perspektif cermin 3D untuk menghancurkan ilusi aslinya.
4. **Sektor 4 (Depression) — The Hollow Reflection (Bayangan Kaelen)**:
   - *Fase 1*: Bertarung di atas danau air es gelap tanpa suara. Radius cahaya syal menyusut ke titik terendah.
   - *Mekanik*: Bos menggunakan set gerakan yang sama persis dengan Kaelen (*Circular Replay Buffer AI*), memaksa pemain mematahkan pola serangannya sendiri via *Parry*.
5. **Sektor 5 (Acceptance) — The Sovereign of Dawn**:
   - *Fase 1*: Pertarungan rekonsiliasi emosional di puncak menara altar.
   - *Puncak Naratif*: Aina menyerahkan sisa percikan terakhirnya, membuka gerbang menuju dunia luar (*Overworld*).

---

## BAB IX: PIPELINE TEKNIS & STANDAR PRODUKSI (UE5 + BLENDER 5.2)

### 9.1 Standardisasi Pemodelan & Rigging di Blender 5.2 LTS
- **Proporsi Mesh**: Karakter 1:6.8 high-detail stylized-realistic (**40.000–60.000 tris untuk Hero Character LOD0**; deform base mesh pra-subdivisi berkisar 15.000–30.000 tris sebelum high-frequency surface detail di-bake ke normal map).
- **Hybrid Hair System**: Rambut perak Kaelen (`#C9CDD1`) dimodelkan dengan *Solid Geometry Base Mesh* (massa volume utama) dipadu *Alpha Strip Cards* (helai acak alami/flyaways) — mengadopsi standar teknis Kena.
- **Hierarki Armature Biomekanik**:
  - `Root` ➔ `Pelvis` ➔ `Spine_01..03` ➔ `Chest` ➔ `Neck` ➔ `Head`.
  - **Rantai Syal Dinamis (Dual-Mode)**: 5-Bone Chain (`scarf_01` s.d. `scarf_05`) dengan parameter *Spring-Damper* (Stiffness: **0.4–0.6**, Damping: **0.3–0.5**) untuk simulasi inersia kain Chaos Cloth (gameplay) dan Hand-Keyframed Control Rig (cutscene naratif Altar Duka) — sesuai [style-guide.md](../04-art-3d/style-guide.md) Bab 4.
- **Konsistensi Bone Roll**: Bone Roll terkunci rapi ($+Y$ along bone, $+Z$ normal forward).
- **Format Ekspor & Pertukaran Data**: Kapabilitas ekspor Blender yang saat ini telah diverifikasi melalui lentera-blender-mcp adalah glTF/GLB. Format pertukaran final dari Blender ke Unreal Engine 5 belum ditetapkan dan akan diputuskan setelah H1.

### 9.2 Sistem Shading, Rendering & Restorasi Lingkungan di Unreal Engine 5
1. **Stylized-Realistic PBR (Zero Black Outline)**: Shading PBR murni tanpa post-process cel-shading outline hitam.
2. **Crystal Ice Shader (M_Cursed_Crystal)**:
   - Transmissive Surface, Refraction index 1.31 (Es), Subsurface Scattering (Radius 0.5–1.2cm `#7EE8FA`), dan Emissive Fresnel (`#4A6FA5` & `#7EE8FA`).
   - Parameter dinamis `Curse_Spread` dirancang untuk mengontrol perambatan material kristal es ke seluruh tubuh mesh (kandidat integrasi parameter material real-time dievaluasi pada H1).
3. **Warm Fabric Shader (M_Aina_Scarf)**:
   - Velvet / Cloth shading model, Two-Sided, Emissive 2700K (`#F4B860`), dirancang untuk terintegrasi dengan solver kain real-time di UE5 (evaluasi runtime pada H1).
4. **Dynamic Thawing (Pencairan Es Altar Duka)**:
   - Pencairan es Altar Duka dirancang menggunakan pendekatan runtime mask / render target untuk mentransisikan es retak menjadi batu hangat (`#5C5A55`) secara dinamis (arsitektur implementasi konkret akan diaudit pada H1).
5. **Niagara FX Systems**:
   - `FX_Warmth_Embers`: Partikel percikan api emas syal Aina yang menyebar di area dungeon yang telah disucikan.
   - `FX_Frost_Mist`: Uap beku dingin di sekitar cakar es Kaelen.
   - `FX_Hit_Sparks`: Percikan benturan saat eksekusi parry sukses.

### 9.3 Standar Kelayakan Rilis Komersial (Steam-Ready Grade Compliance)
1. **Performa Solid 60/120 FPS**: Lock 60 FPS pada spesifikasi minimum PC (GTX 1060 / RX 580) dan 120 FPS pada spesifikasi rekomendasi (RTX 3060 / 4060).
2. **Zero Fatal Memory Leaks**: Alokasi memori VRAM & RAM stabil sepanjang sesi dungeon.
3. **Input Compliance Penuh**: Dukungan penuh keyboard/mouse dan controller (Xbox, PlayStation, Steam Deck) dengan *button glyphs* dinamis.
