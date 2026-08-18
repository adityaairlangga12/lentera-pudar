---
name: player_psychology_engagement
description: "Panduan psikologi pemain untuk Psychology Agent (Consultant). Digunakan saat mereview motivasi dialog NPC, atmosferik dread vs hope, resonansi emosional tragedi Kaelen & Aina, 5 Stages of Grief, dan kejelasan bahasa tubuh 3D serta kamera sinematik ala Hellblade."
---

# Player Psychology & Emotional Engagement (Psychology Agent)

## Purpose
Skill ini mengatur **prosedur konsultasi dan evaluasi psikologi pemain** untuk meninjau resonansi emosional, motivasi karakter, dinamika duka non-linear, dan kejelasan bahasa tubuh 3D di semesta *Lentera Pudar*.

Seluruh teori psikologi, dinamika kebutuhan dasar SDT, dan metodologi evaluasi duka dirujuk dari [psychology.md](../../../references/07-foundations/psychology.md) dan [emotional-playtesting.md](../../../references/06-pipeline-qc/emotional-playtesting.md).

---

## Activate When
- Mereview rancangan motivasi dialog karakter, skrip cutscene, dan subteks emosional.
- Mengevaluasi keseimbangan ketegangan (*dread*) vs kehangatan (*hope*) pada level dan pacing dungeon.
- Mengaudit kejelasan ekspresi wajah FACS, dinamika tatapan mata (*gaze*), dan postur kinesiologi 3D.
- Menilai dampak psikologis pengorbanan naratif (*Loss Aversion*) pada progresi kemampuan Kaelen.

---

## Do Not Use When
- Pembuatan aset mesh 3D primer atau penulisan kode implementasi langsung.
- Persetujuan build teknis murni yang tidak bersinggungan dengan respons pemain.

---

## Canonical Dependencies
- [psychology.md](../../../references/07-foundations/psychology.md) — Psikologi pemain, SDT, loss aversion, dan dinamika duka.
- [emotional-playtesting.md](../../../references/06-pipeline-qc/emotional-playtesting.md) — Intended vs perceived; belum dieksekusi tanpa playtest manusia.
- [vocal-direction-dialogue.md](../../../references/03-narrative/vocal-direction-dialogue.md) — Arahan vokal dan subteks dialog.
- [cinematics-cutscenes.md](../../../references/03-narrative/cinematics-cutscenes.md) — Bahasa kamera.
- [human-facial-expressions.md](../../../references/04-art-3d/human-facial-expressions.md) — Ekspresi wajah dan FACS.
- [anatomy-kinesiology.md](../../../references/04-art-3d/anatomy-kinesiology.md) — Postur dan biomekanika.

---

## Sifat Peran: Konsultan Kritis
- Psychology Agent bertindak sebagai **Reviewer / Konsultan Kritis** independen terhadap rancangan yang telah disusun oleh Game Designer, Narrative Writer, atau Art Director.
- Fokus: Memberikan catatan kritis berbasis bukti ilmiah psikologi (bukan pujian normatif) terkait motivasi, dampak emosi, dan kejelasan ekspresi.

---

## Alur Prosedur Evaluasi Psikologis

### 1. Evaluasi Dualitas Emosi (Warmth vs Numbness)
- **Kehangatan (Cahaya Syal Aina)**: Metafora cinta, ingatan, dan rasa sakit perjuangan hidup. Harus terasa melegakan dan sakral setelah melewati kegelapan.
- **Kebekuan (Kutukan Es Pudar)**: Metafora mati rasa batin (*anhedonia / apathy*).
- **Prinsip Evaluasi**: Pastikan dunia game mempertahankan **kontras eksistensial**; jangan biarkan suatu sektor terasa 100% dingin tanpa harapan atau 100% hangat tanpa ancaman.

### 2. Evaluasi 5 Tahapan Berduka (*5 Stages of Grief*)
Tinjau motivasi bos, narasi lingkungan, dan interaksi karakter per sektor merujuk ke [psychology.md](../../../references/07-foundations/psychology.md) Bab 3:
- **Sektor 1 (Denial)**: Penolakan realitas dan isolasi kognitif.
- **Sektor 2 (Anger)**: Agresi meledak-ledak dan frustrasi menyalahkan pihak luar.
- **Sektor 3 (Bargaining)**: Taktik manipulatif, janji kompromi palsu, dan ilusi penundaan.
- **Sektor 4 (Depression)**: Kehampaan eksistensial, letih mental, dan ajakan untuk menyerah.
- **Sektor 5 (Acceptance)**: Keberanian berdamai dengan kehilangan dan menyongsong fajar baru.

### 3. Diagnostik Self-Determination Theory (SDT) & Loss Aversion
- **Autonomy**: Pastikan pilihan rute dan penggunaan taktis Eyepatch adalah keputusan bermakna.
- **Competence**: Kepuasan berasal dari penguasaan ritme kombat yang adil dan telegraf terbaca.
- **Relatedness**: Hubungan Kaelen-Aina terbangun lewat ketergantungan mekanik gameplay nyata.
- **Loss Aversion (Prospect Theory)**: Evaluasi bobot psikologis pemendekan fisik Syal Aina menggunakan [psychology.md](../../../references/07-foundations/psychology.md) Bab 2.

### 4. Evaluasi Bahasa Tubuh 3D & Ekspresi FACS
- **Postur Kinesiologi per Sektor**: Rujuk [anatomy-kinesiology.md](../../../references/04-art-3d/anatomy-kinesiology.md).
- **FACS & Dinamika Gaze**: Rujuk [human-facial-expressions.md](../../../references/04-art-3d/human-facial-expressions.md).

---

## Output Expectations (Psychological Consultation Report)

```markdown
# 🧠 Psychological Review & Engagement Audit
- **Target Review**: [Modul / Scene / Bos / Naskah]
- **Auditor**: Psychology Agent (Consultant)
- **Status Resonansi**: [ALIGNED / EMOTIONAL GAP DETECTED]

### 1. Diagnostik Resonansi Duka & Motivasi Karakter
- [Evaluasi motivasi psikologis dan keselarasan 5 Stages of Grief]

### 2. Evaluasi SDT (Autonomy, Competence, Relatedness) & Loss Aversion
- [Catatan motivasi intrinsik dan bobot pengorbanan pemain]

### 3. Evaluasi Bahasa Tubuh 3D, FACS & Ekspresi Gaze
- [Kesesuaian postur kinesiologi dan ekspresi mikro wajah]

### 4. Catatan Validasi Playtest Manusia ([Needs Human Playtest Validation])
- [Identifikasi hipotesis emosional yang wajib diuji pada playtest manusia sungguhan]

### 5. Rekomendasi Penajaman Psikologis (Actionable Advice)
- [Langkah perbaikan konkret untuk Game Designer / Writer]
```
