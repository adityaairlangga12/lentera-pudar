---
status: ACTIVE
type: SPECIFICATION
authority_scope: narrative.script
canonical: true
owner: narrative-team
last_reviewed: 2026-08-18
---

# Skenario & Naskah Step-by-Step Tutorial Prolog Onboarding — Lentera Pudar Master Reference
### Alur Pembelajaran Mekanik Diegetik Non-Verbal (Teaching Through Geometry & Organic Onboarding)

> **Dokumen Sumber Kebenaran Skenario Tutorial Prolog (*Prologue Tutorial Script Reference*)**  
> Melengkapi [theory-reference.md](../07-foundations/theory-reference.md) (Bab 2.A), [enemy-design-balancing.md](../02-gameplay/enemy-design-balancing.md) (Bab 3), [ui-ux-accessibility.md](../02-gameplay/ui-ux-accessibility.md) (Bab 2), [game-design-document.md](../01-core/game-design-document.md) (Bab IV & V), dan [style-guide.md](../04-art-3d/style-guide.md). Menetapkan alur langkah-demi-langkah pengenalan seluruh kontrol dan mekanik dasar dari detik pertama Kaelen membuka mata hingga memasuki gerbang Sektor 1 (*The Silent Crypts*).

---

## 1. Filosofi Tutorialisasi: Zero-Text Diegetic Onboarding

Tutorial semesta *Lentera Pudar* dirancang dengan 3 pilar utama:
1. **Teaching Through Geometry & Lighting**:
   Pemain tidak disuapi pop-up teks instruksi panjang. Arsitektur level, kontras suhu cahaya (Kelvin 2700K vs 6500K), dan inersia kamera membimbing naluri pemain secara alami.
2. **Contextual & Fleeting Glyph Assist**:
   Petunjuk tombol (glyph) hanya muncul samar pada radius $<2.0\text{ m}$ saat interaksi pertama, menggunakan ikon tombol dinamis sesuai kontroler (Gamepad / Keyboard), dan menghilang permanen setelah aksi berhasil dieksekusi.
3. **Organic Fail-Safe Loop**:
   Jika pemain ragu atau gagal, dunia memberikan isyarat diegetik berulang secara halus (kibasan kain syal, denyut bara api emas, suara bisikan binaural) tanpa pernah menampilkan pesan kegagalan buatan.

---

## 2. Peta Alur Skenario Prolog (The 6 Steps of Awakening)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                ALUR ONBOARDING PROLOG (THE 6 STEPS)                                    │
├─────────┬──────────────────────────┬─────────────────────────────┬─────────────────────────────────────┤
│ LANGKAH │ MEKANIK YANG DIAJARKAN   │ SETTING RUANG SPASIAL       │ DIEGETIC CUE / FAIL-SAFE            │
├─────────┼──────────────────────────┼─────────────────────────────┼─────────────────────────────────────┤
│ Step 1  │ Gerak Dasar & Cahaya Syal│ Ceruk Makam Gelap Gulita    │ Kibasan Syal Aina 2700K & PointLight│
│ Step 2  │ Light Punch (Tinju Kanan)│ Celah Runtuhan Es Rapuh     │ Suara Retakan & Glyph Samar         │
│ Step 3  │ Heavy Cursed Ice Strike  │ Gerbang Segel Es Tebal      │ Denyut Urat Es Lengan (+10 Curse)   │
│ Step 4  │ 12-Frame Tight Parry     │ Arena Koridor 1v1 Terkontrol│ Windup 18f Musuh Tunggal (The Echo) │
│ Step 5  │ The Sealed Eyepatch      │ Tebing Buntu / Jurang Kering│ Bisikan Binaural & Rune Spektral    │
│ Step 6  │ Interaksi Altar Duka 1   │ Ruang Altar Gerbang Sektor 1│ Pemendekan Syal & Kemampuan Pertama │
└─────────┴──────────────────────────┴─────────────────────────────┴───────────────────────────────────┘
```

---

## 3. Naskah Skenario Langkah-demi-Langkah (Step-by-Step Walkthrough)

### 3.1 Langkah 1: Gerak Dasar & Cahaya Syal (*The Awakening & Living Light*)
- **Ruang / Setting**:
  - *Ruang Makam Sempit (Crypt Alcove)*: Ruang batu kuno gelap gulita (`#141013`). Satu-satunya sumber penerangan berasal dari pendaran emas Syal Aina (`#F4B860` 2700K) yang melingkari leher Kaelen. Suasana sunyi senyap, hanya terdengar tetesan air beku dan desah napas Kaelen.
- **Trigger**:
  - Kamera perlahan membuka pandangan dari sudut mata Kaelen (*POV First-Person sesaat*) lalu melakukan transisi *seamless* mundur ke posisi *Over-Shoulder Third-Person* (FOV 78°).
  - Syal Aina memancarkan denyut cahaya lembut (*pulse animation*) dan ujung kainnya terangkat tertiup angin pelan, berkibar mengarah ke celah lorong di depan.
- **Aksi Pemain**:
  - Menggerakkan tuas analog kiri / tombol `WASD` untuk melangkah keluar dari ceruk makam.
- **Fail-Safe**:
  - Jika pemain tidak bergerak selama lebih dari 5 detik, Syal Aina berdenyut lebih terang (+20% intensitas Lumen) dan suara bisikan lembut Aina berdesir di telinga kanan (*"Kaelen... mari berjalan..."*). Glyph stik analog kiri muncul memudar tipis di sudut bawah layar dan hilang begitu Kaelen mengambil langkah pertama.

---

### 3.2 Langkah 2: Light Punch — Tinju Tangan Kanan (*The Bandaged Fist*)
- **Ruang / Setting**:
  - *Lorong Retakan Runtuhan (The Fractured Chokepoint)*: Lorong sempit di mana jalurnya terhalang oleh susunan stalagmit kristal es rapuh dan balok kayu lapuk. Cahaya syal Aina memantul pada permukaan kristal es yang tipis.
- **Trigger**:
  - Kaelen mendekati penghalang (radius $<1.5\text{ m}$). Jalur buntu secara fisik, memaksa pemain mencari cara mendobrak rintangan.
- **Aksi Pemain**:
  - Menekan tombol **Light Attack** (`Square` di PS / `X` di Xbox / `LMB` di PC).
  - Kaelen melancarkan kombo tinju 1–2 hit tangan kanan berbalut perban. Kristal es rapuh hancur berhamburan dengan jeda *hit-stop 3 frame* dan debu es berhamburan.
- **Fail-Safe**:
  - Jika pemain hanya menabrak rintangan tanpa memukul, permukaan es memancarkan retakan halus (*procedural fracture line*) saat tersentuh tubuh Kaelen, dan glyph tombol Light Attack muncul samar di atas rintangan selama 3 detik.

---

### 3.3 Langkah 3: Heavy Cursed Strike & Curse Feedback (*The Cursed Talons & Trade-Off*)
- **Ruang / Setting**:
  - *Ambang Segel Es Tebal (The Frozen Barrier Archway)*: Sebuah gerbang lengkung batu kuno yang tertutup lempengan kristal es tebal berwarna biru tua keunguan (`#4A6FA5`). Lempengan ini terlalu padat untuk dihancurkan tinju perban biasa.
- **Trigger**:
  - Jika pemain mencoba memukul dengan Light Attack, tinju Kaelen terpental dengan efek benturan tumpul (*deflection recoil*) dan lempengan es tidak retak.
  - Lengan kiri Kaelen yang membeku mulai bergetar halus (*haptic controller pulse*), pendaran kristal es di sikunya berpendar biru dingin 6500K seolah menuntut pelepasan energi.
- **Aksi Pemain**:
  - Menahan tombol **Heavy Attack** (`Triangle` di PS / `Y` di Xbox / `RMB` di PC).
  - Kaelen menghantamkan cakar es tangan kiri (*Cursed Ice Strike*). Lempengan es tebal meledak hancur berkeping-keping.
  - **Umpan Balik Diegetik**: Es merambat naik dari siku ke bahu Kaelen, *Curse Meter* terisi $+10\text{ poin}$, dan layar mengalami *frost vignette* mikro sesaat sebelum stabil. Pemain memahami bahwa kekuatan es memecahkan rintangan besar namun memakan stabilitas batinnya.
- **Fail-Safe**:
  - Jika pemain memukul dengan Light Attack berkali-kali tanpa hasil, bisikan jiwa es di telinga kiri berdesir (*"Gunakan kutukanmu..."*) dan lengan kiri Kaelen berpendar lebih terang sebagai petunjuk visual tak terbantahkan.

---

### 3.4 Langkah 4: 12-Frame Tight Parry Timing (*The First Fallen Shade 1v1*)
- **Ruang / Setting**:
  - *Ruang Makam Persegi Terkontrol (The Solitary Duelling Hall)*: Ruang segi empat luas berlantai batu datar, diterangi obor beku redup. Di tengah ruangan, berdiri satu musuh jiwa beku tunggal (*The Echo*) yang bangkit perlahan dari tumpukan es.
- **Trigger**:
  - Kaelen melangkah masuk ke ruangan. Pintu belakang tertutup jeruji es sementara (arena terkunci 1v1 sesuai standar *Onboarding Encounter*).
  - Kamera otomatis mengunci fokus (*Duel Lock-On*, FOV 70°). *The Echo* menyiapkan serangan ayunan pedang es lambat dengan fase windup panjang (18 frame, diiringi kilau biru tajam `#4A6FA5` pada senjatanya).
- **Aksi Pemain**:
  - Menekan tombol **Parry / Block** (`L1` di PS / `LB` di Xbox / `Q` di PC) tepat pada jendela 12 frame saat tebasan musuh mengarah masuk.
  - **Keberhasilan Parry**:
    - Terjadi jeda dramatis *hit-stop 3 frame* (0.05 detik).
    - Percikan bunga api emas Aina (`#F4B860`) memancar menolak bilah es musuh.
    - Musuh terlempar ke posisi *Full Stagger Window* (musuh tidak berdaya selama 3 detik).
    - Kaelen menghabisi musuh dengan 1 pukulan penutup, jeruji es terbuka, dan arena kembali hening.
- **Fail-Safe**:
  - Jika pemain terlambat menangkis atau terkena serangan:
    - Kaelen hanya menerima damage kecil (10% HP) dan terdorong mundur dengan *knockback soft*.
    - Musuh memiliki jeda *recovery* panjang (2 detik) sebelum menyerang kembali, memberi ruang bagi pemain untuk mencoba lagi.
    - Jika Kaelen tumbang, ia respawn seketika di ambang pintu masuk ruangan dan musuh mengulang siklus windup lambat yang sama hingga pemain berhasil mengeksekusi parry.

---

### 3.5 Langkah 5: Buka Eyepatch Perception (*The Sealed Eye & The Spectral Path*)
- **Ruang / Setting**:
  - *Tebing Keruntuhan Buntu (The Blind Chasm)*: Lorong berakhir di tepi jurang es yang terputus total. Di seberang jurang terdapat pintu batu besar yang tertutup rapat, namun tidak ada jembatan fisik untuk menyeberang.
- **Trigger**:
  - Kaelen mendekati tepi jurang. Simbol mata es beku terukir samar di pilar batu samping jurang, namun tidak ada jalan maju.
  - Kamera melakukan *Dutch tilt* mikro dan bisikan 3D binaural terdengar di kedua telinga (*"Buka matamu yang terkunci... lihat apa yang mereka sembunyikan..."*).
- **Aksi Pemain**:
  - Menahan tombol **Sealed Eye / Perception** (`R3` / `Hold E` / Tombol Khusus).
  - Kaelen melepaskan ikatan penutup mata kulit hitamnya sesaat.
  - **Efek Dunia Spektral & Kondisi Henti Otomatis (*Auto-Stop Trigger*)**:
    - Layar berubah menjadi gradien desaturasi dingin bertepi kristal es.
    - Di atas jurang, jembatan memori kristal es biru transparan berpendar memperlihatkan jalur yang kokoh untuk dilalui.
    - *Curse Meter* bertambah $+3\text{ poin/detik}$ seiring mata terbuka, memicu urgensi pemain untuk segera menyeberangi jembatan.
    - **Trigger Henti Kutukan Pasti (*Anti-Death-Spiral Rule*)**: Laju penambahan kutukan $+3\text{ poin/detik}$ **BERHENTI OTOMATIS** tepat saat kapsul Kaelen memasuki volume pendaratan platform seberang (`BP_SpectralLandingZone: OnComponentBeginOverlap`). Sistem secara otomatis memicu animasi pelepasan/penguncian kembali penutup mata kulit hitam dan mengembalikan grading kamera ke normal tanpa menuntut input manual pemain, mencegah akumulasi kutukan berlebih.
- **Fail-Safe**:
  - Jika pemain diam di tepi jurang tanpa menahan tombol mata selama 6 detik, bekas luka mata kanan Kaelen berdenyut dengan pendaran biru dingin menembus penutup mata kulitnya, disertai getaran haptik berdenyut lembut pada kontroler.

---

### 3.6 Langkah 6: Interaksi Altar Duka Pertama (*The First Sacrifice & Stage-Gate 0*)
- **Ruang / Setting**:
  - *Ruang Altar Penyangkalan (The Threshold Sanctuary)*: Ruang kubah batu megah di ambang pintu masuk Sektor 1. Di tengah ruangan berdiri sebuah Altar Duka Kuno (*The Altar of Grief*) yang diselimuti es beku abadi. Di belakang altar terdapat Gerbang Raksasa Makam Beku Sektor 1 (*The Gate of Denial*).
- **Trigger**:
  - Kaelen menyeberangi jembatan spektral dan tiba di pelataran altar. Syal Aina berdenyut kencang dengan kehangatan 2700K maksimal, mengarahkan ujung kainnya tepat ke mangkuk persembahan altar.
  - Glyph interaksi halus `Interact` (`X` / `A` / `F`) muncul mengambang lembut di atas altar saat Kaelen berada pada jarak $<2.0\text{ m}$.
- **Aksi Pemain**:
  - Menekan tombol **Interact** untuk menyalakan Altar Duka.
  - **Cutscene Diegetik & Pengorbanan Pertama**:
    - Kaelen meletakkan kedua tangannya di atas altar beku.
    - Syal Aina memancarkan kobaran api emas terang, mencairkan es yang menyegel altar.
    - **Momen Pengorbanan Naratif (Stage 1 Sacrifice)**: Ujung Syal Aina terbakar perlahan menjadi bara debu emas dan **memendek secara permanen dari Panjang ke Sedang**.
    - **Penerimaan Kemampuan Pertama**: Gelombang resonansi kristal menyatu ke lengan Kaelen, membuka kemampuan resmi **Retakan Penyangkalan (*Fracture of Denial*)** (GAS: `GA_ShatterStrike`).
    - *Curse Meter* dibersihkan total menjadi 0%, dan Gerbang Sektor 1 *The Silent Crypts* terbuka perlahan dengan dentuman batu berat.
- **Penyelesaian Tutorial (Transition to Gameplay)**:
  - Game melakukan *Auto-Save Permanen* (Checkpoint Major), kamera kembali ke kendali bebas pemain, dan Kaelen melangkah masuk ke dalam petualangan Sektor 1 secara penuh.

---

## 4. Matriks Ringkasan Kontrol & Umpan Balik Onboarding

| Langkah | Input Tombol (PS / Xbox / PC) | Mekanik | Efek Visual / Audio | Konsekuensi Sistem |
|---|---|---|---|---|
| **Step 1** | `L-Stick` / `WASD` | Lokomosi Dasar | Syal Aina 2700K berkibar memandu jalan | Eksplorasi aktif |
| **Step 2** | `Square` / `X` / `LMB` | Light Punch | Tinju perban, serpihan kristal rapuh pecah | Rintangan hancur |
| **Step 3** | `Triangle` / `Y` / `RMB` | Heavy Cursed Strike | Cakar es biru meledak, urat es merambat | $+10\text{ Curse Meter}$ |
| **Step 4** | `L1` / `LB` / `Q` | 12-Frame Parry | Hit-stop 3f, bunga api emas `#F4B860` | Musuh Stagger 3s |
| **Step 5** | `R3` / `Hold E` | Sealed Eye (Perception) | Jembatan spektral biru es muncul | $+3\text{ Curse/detik}$ |
| **Step 6** | `X` / `A` / `F` | Interaksi Altar Duka | Syal memendek Tahap 1, Altar menyala | Unlock *Fracture of Denial* |

---

## 5. Kepatuhan QA/QC & Verifikasi Gate (DoD Checklist)

- [ ] Seluruh transisi antar-langkah berlangsung *seamless* tanpa layar pemuatan (*loading screen*) atau pop-up teks tutorial yang membekukan gameplay.
- [ ] Jendela parry pada Langkah 4 terkalibrasi presisi pada 12 frame (0.2 detik @60fps) dengan jeda hit-stop 3 frame.
- [ ] Efek rambatan es pada Langkah 3 dan pembukaan mata pada Langkah 5 dirancang terhubung ke parameter visual *Curse Meter* pada integrasi engine.
- [ ] Pengorbanan syal pada Langkah 6 memicu perubahan skeletal mesh/cloth collision syal Kaelen secara permanen dan menyimpan save-state di disk.
