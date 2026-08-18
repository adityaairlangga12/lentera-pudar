---
status: ACTIVE
type: SPECIFICATION
authority_scope: gameplay.progression
canonical: true
owner: gameplay-team
last_reviewed: 2026-08-18
---

# Daftar Kemampuan Kaelen per Sektor — Lentera Pudar Master Reference
### Sistem Progresi Naratif Sekuensial (Model GRIS), Pengorbanan Altar Duka, & Utilitas Kumulatif 5 Sektor

> **Dokumen Sumber Kebenaran Progresi Kemampuan Kaelen (*Sector Ability Progression Reference*)**  
> Melengkapi [game-design-document.md](../01-core/game-design-document.md), [theory-reference.md](../07-foundations/theory-reference.md), [anatomy-kinesiology.md](../04-art-3d/anatomy-kinesiology.md), [enemy-design-balancing.md](enemy-design-balancing.md), dan [level-design-storytelling.md](level-design-storytelling.md). Menetapkan daftar definitif kemampuan baru Kaelen yang terbuka secara sekuensial melalui pengorbanan Syal Aina di tiap Altar Duka.

---

## 1. Filosofi Progresi: Model GRIS & Utilitas Kumulatif (*Cumulative Utility*)

Semesta *Lentera Pudar* menolak sistem pohon keahlian bebas (*free-form skill tree*), belanja stat koin, dan grinding level XP konvensional:
1. **Naratif-Sekuensial Terikat Altar Duka**:
   Kemampuan baru didapatkan secara otomatis dan bermakna saat Kaelen menyalakan Altar Duka di akhir setiap Sektor. Tiap pembukaan kemampuan menuntut pengorbanan fisik permanen: **Syal Jiwa Aina memendek** (*4 Stages of Sacrifice*).
2. **Hukum Keseimbangan Pengorbanan (*Cost-Benefit Parity*)**:
   Berdasarkan teori psikologi duka (*Loss Aversion $2.5\text{x}$*), memendeknya syal terasa berat bagi pemain. Oleh karena itu, kemampuan baru yang diperoleh wajib memberikan **kebermaknaan mekanik dan katarsis emosional yang sepadan**.
3. **Prinsip Utilitas Kumulatif (*Cumulative Utility & No-Obsolete Rule*)**:
   Kemampuan yang diperoleh di Sektor 1 tidak boleh menjadi usang (*obsolete*) di Sektor 5. Setiap kemampuan dirancang saling melengkapi (*stacking synergy*) dan tetap esensial dalam combat, puzzle, maupun navigasi hingga akhir petualangan.

---

## 2. Fondasi Awal Kaelen (Base Kit — Pra-Sektor 1 / Prolog)

Sebelum menyalakan Altar Duka pertama, Kaelen mengandalkan perlengkapan dasar:
- **Light Punch Combo (1–3 Hit)**: Tinju tangan kanan berbalut perban dengan inersia berat (*earthy root-motion*).
- **Heavy Cursed Strike (Ice Palm)**: Hantaman cakar es tangan kiri yang memicu ledakan kristal es (`#4A6FA5`, $+10\text{ Curse Meter}$).
- **12-Frame Tight Parry & Deflect**: Tangkisan presisi dengan jeda *hit-stop 3 frame* dan partikel bunga api emas Aina.
- **Evade Dash**: Meluncur cepat meninggalkan percikan bara syal (`#F4B860`) dengan *i-frames* singkat.
- **The Sealed Eye (Eyepatch Perception)**: Membuka segel mata kanan sesaat untuk melihat jejak spektral ($+3\text{ Curse/s}$, laju kutukan berhenti otomatis saat memasuki volume pendaratan platform `BP_SpectralLandingZone`).
- **Syal Aina (Panjang Penuh)**: Sumber cahaya dinamis Lumen 2700K dan kompas arah kibasan kain.

---

## 3. Matriks Progresi 5 Kemampuan per Sektor Duka

```
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                        PROGRESI KEMAMPUAN KAELEN (MODEL GRIS)                                         │
├───────────┬──────────────────────────┬─────────────────────────────┬──────────────┬───────────────┬───────────────────┤
│ SEKTOR    │ KEMAMPUAN (GAS CLASS)    │ TAHAP PENGORBANAN SYAL      │ PANJANG KAIN │ RADIUS LUMEN  │ FOKUS MEKANIK     │
├───────────┼──────────────────────────┼─────────────────────────────┼──────────────┼───────────────┼───────────────────┤
│ Prologue  │ Perlengkapan Dasar       │ Utuh / Pra-Altar            │ 180 cm       │ 800 cm        │ Onboarding & Base │
│ Sektor 1  │ Retakan Penyangkalan     │ Tahap 1: Panjang ➔ Sedang   │ 120 cm       │ 600 cm        │ Guard Break/Walls │
│ Sektor 2  │ Pusaran Amarah Beku      │ Tahap 2: Sedang ➔ Pendek    │ 70 cm        │ 450 cm        │ Surge Thrust/Jump │
│ Sektor 3  │ Kilasan Cermin Waktu     │ Tahap 3: Pendek ➔ Koyak     │ 30 cm        │ 320 cm        │ 360° Deflect/Rune │
│ Sektor 4  │ Jangkar Keheningan       │ Tahap 4: Koyak ➔ Bara Redup │ 10 cm (serat)│ 200 cm        │ Shockwave/Ground  │
│ Sektor 5  │ Percikan Fajar Abadi     │ Puncak: Penyerahan Penuh    │ Bersatu Abadi│ Penuh (Fajar) │ Frost-Fire Purge  │
└───────────┴──────────────────────────┴─────────────────────────────┴──────────────┴───────────────┴───────────────────┘
```

> **Hukum Taruhan Visibilitas (*Visibility Loss Aversion Stakes*)**:  
> Setiap kali Kaelen menyalakan Altar Duka, ia memperoleh kemampuan mekanik baru yang semakin kuat, namun **kehilangan radius cahaya Lumen secara permanen**. Di Sektor 4, kegelapan dungeon merapat hingga radius 200 cm, memaksa pemain mengandalkan isyarat audio spasial 3D binaural dan kilau samar refleksi es di lantai untuk bernavigasi.

---

### 3.1 Sektor 1: Denial (*The Silent Crypts*)
*Penyalaan Altar Duka 1 ➔ Syal Aina memendek dari Panjang ke Sedang.*

- **Metode Input Eksekusi**: **Combo Finisher via Impact-Linked Buffer Window (12 Frame / $0.20\text{s}$)**:
  - *Jendela Input*: Tombol **Heavy Attack** baru mulai diterima tepat saat pukulan Light ke-3 mendarat (*Hit 3 Impact Frame* / selama hit-stop 50ms berlangsung) hingga 6 frame awal masa recovery Hit 3.
  - *Anti-Mashing Guardrail*: Input Heavy sebelum Hit 3 mendarat diabaikan untuk mencegah pemicuan kombo tanpa intensi.
  - *Hasil Input Tepat*: Recovery Hit 3 langsung di-cancel ke startup `GA_ShatterStrike` (**$0\text{ Biaya Kutukan}$**, Guaranteed Guard Break).
  - *Hasil Input Terlambat*: Kaelen kembali ke stance netral dan mengeksekusi *Heavy Cursed Strike biasa* (**$+10\text{ Biaya Kutukan}$**, tanpa Guard Break otomatis).
  - *Isyarat Visual Diegetik*: Syal Aina memancarkan kedipan pendaran emas instan (*subtle gold flash*) pada frame impact Hit 3 sebagai penanda visual jendela finisher.
- **Biaya Kutukan (*Curse Cost*)**: **$0\text{ poin}$** (Bebas penambahan Curse Meter karena resonansi kemampuan telah disucikan oleh pengorbanan Syal Aina di Altar Duka).
- **Efek Mekanik & Scaling Damage**:
  - *Guaranteed Guard Break*: Menembus dan menghancurkan 100% kondisi *Block / Guard State* musuh defensif dan memecahkan cangkang pelindung *The Echo*.
  - *Damage Value*: Mengikuti standar besaran *Heavy Attack* reguler (tanpa pengali damage khusus).
  - *Hit-Stop*: $3\text{ frame}$ baku (0.05 detik).
- **Frame Data (Basis 30 FPS)**:
  - *Startup / Windup*: $18\text{ frame}$ (0.60 detik)
  - *Active Hitbox*: $8\text{ frame}$ (0.27 detik)
  - *Recovery*: $22\text{ frame}$ (0.73 detik)
- **Fungsi Traversal & Puzzle**:
  - Mampu menghancurkan dinding kristal es tebal, pilar rapuh, dan penghalang makam kuno yang menyegel jalan rahasia (*destructible barriers*).
- **Alasan Naratif (Tema Duka: Penyangkalan)**:
  Kaelen dipaksa menghancurkan ilusi kenyamanan palsu warga makam beku Lord Alden. Menghancurkan cangkang zirah penolakan (*shattering the shell of denial*) menjadi simbol bahwa kepalsuan harus diruntuhkan dengan keras agar luka batin dapat mulai disembuhkan.
- **Dampak ke Desain Level & Retensi Utility**:
  - *Sektor 2*: Memecahkan lempengan es beku di lantai peleburan.
  - *Sektor 3–5*: Menjadi alat wajib untuk membuka *shortcut* tersembunyi dan memecahkan zirah musuh bertameng di seluruh sisa dungeon.
- *Catatan Status*: Seluruh nilai numerik (Curse Cost 0, Input Finisher, Guaranteed Guard Break, Frame Data 18/8/22 @30fps) adalah **Keputusan Desain Baru Resmi (User-Approved Design Decision)** paska-audit konsistensi lintas dokumen.

---

### 3.2 Sektor 2: Anger (*The Blazing Frost*)
*Penyalaan Altar Duka 2 ➔ Syal Aina memendek dari Sedang ke Pendek.*

- **Nama Kemampuan**: **Pusaran Amarah Beku (*Frost Surge / Raging Dash-Thrust*)**
- **Fungsi Gameplay**:
  - *Combat*: Dorongan akselerasi tinggi ke depan (*forward lunging thrust*) berbalut cakar es berputar yang menembus formasi musuh agresif (*The Berserker*), menghasilkan status *Heavy Stagger* dan *Knockback* area.
  - *Traversal*: *Air/Ground Surge Dash* — Kaelen dapat meluncur menerobos rintangan berbahaya (jurang es terbelah, semburan uap dingin tajam) yang memiliki friksi navigasi tinggi.
- **Alasan Naratif (Tema Duka: Kemarahan)**:
  Kaelen menyalurkan kobaran amarah batinnya di peleburan Ignis Vulkan. Alih-alih membiarkan amarah membakar dirinya sendiri, Kaelen mengubah gejolak kemarahan menjadi dorongan kinetik tajam untuk mendobrak rintangan fisik dan jurang keputusasaan.
- **Dampak ke Desain Level & Retensi Utility**:
  - *Sektor 3*: Bermanuver cepat menutup jarak terhadap musuh proyektil *The Deceiver*.
  - *Sektor 4–5*: Alat mobilitas utama untuk menyeberangi platform danau es yang terpisah jauh.

---

### 3.3 Sektor 3: Bargaining (*The Hall of Mirrors*)
*Penyalaan Altar Duka 3 ➔ Syal Aina memendek dari Pendek ke Koyak/Fragmen.*

- **Nama Kemampuan**: **Kilasan Cermin Waktu (*Reflective Echo / Temporal Deflect*)**
- **Fungsi Gameplay**:
  - *Combat*: Peningkatan parry presisi (12 frame) di mana tangkisan sukses memancarkan *Reflective Pulse* 360° yang memantulkan proyektil semu musuh (*The Deceiver*) kembali ke penembaknya dan melenyapkan klon ilusi bayangan di sekitar Kaelen.
  - *Puzzle*: Mampu menangkap dan memantulkan berkas cahaya syal/altar pada cermin es kuno selama beberapa detik untuk mengaktifkan mekanisme pintu rune waktu yang terkunci.
- **Alasan Naratif (Tema Duka: Tawar-Menawar)**:
  Di labirin cermin Lady Vespera, Kaelen berhenti memohon penundaan takdir dan tawar-menawar dengan masa lalu palsunya. Ia belajar membalikkan tipuan ilusi dan menerima bahwa masa lalu tidak bisa dinegosiasikan ulang.
- **Dampak ke Desain Level & Retensi Utility**:
  - *Sektor 4*: Melawan proyektil kegelapan bayangan trauma *The Hollow Reflection*.
  - *Sektor 5*: Memantulkan pilar cahaya pengadilan bos puncak *The Sovereign of Dawn*.

---

### 3.4 Sektor 4: Depression (*The Abyss of Stillness*)
*Penyalaan Altar Duka 4 ➔ Syal Aina memendek ke sisa serat terakhir (Bara Redup).*

- **Nama Kemampuan**: **Jangkar Keheningan (*Anchor of Stillness / Resonant Grounding*)**
- **Fungsi Gameplay**:
  - *Combat*: Hantaman tumit/cakar ke tanah (*Ground Slam / Shockwave Stomp*) yang menancapkan medan resonansi hangat ke lantai es. Menetralkan gelombang kejut musuh raksasa (*The Weight*), memberikan kekebalan terhadap efek *Stagger*, serta memperlambat akumulasi *Curse Meter* sebesar 50% selama Kaelen berada di dalam lingkaran jangkar.
  - *Traversal & Puzzle*: Mampu memadatkan permukaan air es gelap yang rapuh/licin menjadi tumpuan batu hangat yang kokoh untuk pijakan melompat di jurang kehampaan vertikal.
- **Alasan Naratif (Tema Duka: Depresi)**:
  Menghadapi keputusasaan terdalam dan bayangannya sendiri (*The Hollow Reflection*), Kaelen menolak untuk tenggelam dalam kepasrahan hampa. Ia menancapkan tekad batinnya ke bumi — menjadi jangkar ketabahan di tengah samudra keheningan duka.
- **Dampak ke Desain Level & Retensi Utility**:
  - *Sektor 5*: Menjadi benteng pertahanan vital untuk menahan badai es kutukan skala besar pada duel rekonsiliasi akhir.

---

### 3.5 Sektor 5: Acceptance (*The Dawning Altar*)
*Puncak Rekonsiliasi Naratif ➔ Penyerahan Wujud Fisik Syal Sempurna menuju Benua Luar.*

- **Nama Kemampuan**: **Percikan Fajar Abadi (*The Sovereign Spark / Radiance of Acceptance*)**
- **Fungsi Gameplay**:
  - *Combat*: Penyatuan sempurna antara cakar es kutukan Kaelen dengan api abadi jiwa Aina (*Frost-Fire Harmonization*). Pukulan cakar es memancarkan gelombang cahaya emas 2700K yang langsung mencairkan kutukan musuh menjadi partikel abu hangat, membersihkan akumulasi *Curse Meter*, dan membuka *Stagger Vulnerability Window* instan.
  - *World Interaction*: Mampu mencairkan segel beku gerbang raksasa Benua Luar (*Overworld Gate*) dan menyalakan kembali Mercusuar Peradaban yang telah lama padam.
- **Alasan Naratif (Tema Duka: Penerimaan)**:
  Puncak rekonsiliasi emosional. Kaelen tidak lagi membenci lengan kutukan esnya dan tidak lagi menyangkal kepergian Aina. Penerimaan penuh mengubah luka trauma menjadi kekuatan pelindung sejati untuk melangkah keluar menuju kehidupan baru di Benua Luar (*The Overworld*).
- **Dampak Lanjutan**: Menjadi mekanik inti pertempuran dan penyucian dunia pada ekspansi petualangan di luar dungeon pembuka.

---

## 4. Rantai Integrasi Teknis & QC

1. **Rencana Pemetaan UE5 Gameplay Ability System (GAS)**:
   - Setiap kemampuan secara konseptual dipetakan ke identifier rancangan ability (`GA_ShatterStrike`, `GA_FrostSurge`, `GA_ReflectiveEcho`, `GA_AnchorStillness`, `GA_SovereignSpark`); arsitektur runtime konkret dan implementasi kelas Unreal belum diaudit.
2. **Kesesuaian Rantai Kinetik Biomekanika**:
   - Seluruh animasi kemampuan mematuhi titik tumpu kaki, inersia torsi spinal, dan penguncian sendi saat impact sesuai [anatomy-kinesiology.md](../04-art-3d/anatomy-kinesiology.md).
3. **Kepatuhan Nilai Frame & Hit-Stop**:
   - Seluruh benturan hantaman kemampuan mempertahankan jeda *hit-stop 3 frame* (0.05 detik) dan getaran partikel es/api sesuai [style-guide.md](../04-art-3d/style-guide.md).
