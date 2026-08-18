---
name: encounter_pacing
description: "Standar kurva kesulitan (difficulty curve), ritme encounter musuh, loop risiko-imbalan (risk-reward), dan pacing stamina/kutukan dalam dungeon Lentera Pudar — 3D Action RPG (Unreal Engine 5 + Blender 5.2 LTS)."
---

# Encounter Pacing & Combat Rhythm

## Purpose
Skill ini mengatur **prosedur perancangan intensitas pertempuran, ritme encounter musuh, kurva emosi pemain, dan alokasi emotional bandwidth** di dungeon *Lentera Pudar*.

Seluruh parameter timing kombat, daftar arketipe musuh, dan spesifikasi visibilitas sektor diatur secara kanonikal di [enemy-design-balancing.md](../../../references/02-gameplay/enemy-design-balancing.md), [sector-ability-progression.md](../../../references/02-gameplay/sector-ability-progression.md), dan [style-guide.md](../../../references/04-art-3d/style-guide.md). Penyebutan GAS adalah target desain, bukan bukti arsitektur Unreal telah diaudit.

---

## Activate When
- Merancang komposisi gelombang musuh dan tata letak pertarungan per ruang dungeon.
- Mengevaluasi kurva kesulitan, keadilan wind-up telegraf musuh, dan parry window.
- Menentukan penempatan Breather Room dan interval pelepasan ketegangan (*relief*).
- Menyelaraskan arsitektur spasial arena terhadap state machine AI musuh.

---

## Do Not Use When
- Penulisan naskah cutscene naratif tanpa elemen pertempuran.
- Rigging armature 3D atau pemodelan topologi aset.

---

## Canonical Dependencies
- [enemy-design-balancing.md](../../../references/02-gameplay/enemy-design-balancing.md) — Arketipe duka, telegraphing, dan balancing kombat.
- [sector-ability-progression.md](../../../references/02-gameplay/sector-ability-progression.md) — Kemampuan naratif dan frame data kombat.
- [level-design-storytelling.md](../../../references/02-gameplay/level-design-storytelling.md) — Spasial duka, breadcrumbing, dan breather rooms.
- [style-guide.md](../../../references/04-art-3d/style-guide.md) — Timing kombat dan parameter visual.
- [psychology.md](../../../references/07-foundations/psychology.md) — Teori flow, loss aversion, dan emotional bandwidth.

---

## Prosedur Analisis & Perancangan Pacing

### 1. Ritme 4-Fase Encounter
1. **Intro (Pengenalan)**: Kenalkan ancaman/musuh baru dalam lingkungan terkontrol (1 musuh tunggal) di dekat radius cahaya syal Aina.
2. **Escalation (Eskalasi)**: Gabungkan musuh dengan variasi pola serangan atau rintangan spasial; Curse Meter mulai naik ke zona menengah.
3. **Twist (Tekanan Lingkungan)**: Pertarungan di area dengan visibilitas terbatas atau ancaman lingkungan, memaksa keputusan taktis antara perlindungan cahaya vs risiko penggunaan Eyepatch.
4. **Relief & Reward (Pelepasan & Hadiah)**: Ruangan aman (Altar Duka atau Breather Room) dengan pencahayaan hangat untuk memulihkan emotional bandwidth pemain.

### 2. Manajemen Ketegangan (Tension vs Relief)
- **Tekanan Kutukan (Curse Pressure)**: Tangan es menciptakan urgensi taktis; rujuk [style-guide.md](../../../references/04-art-3d/style-guide.md) Bab 9.
- **Lantern Light as Resource / Safety**: Rujuk tabel visibilitas di [style-guide.md](../../../references/04-art-3d/style-guide.md) Bab 7.C.
- **Keterbacaan Telegraf Serangan**: Rujuk [enemy-design-balancing.md](../../../references/02-gameplay/enemy-design-balancing.md) Bab 3.

### 3. Penegakan Frame Data Kombat
- Evaluasi rangkaian kombo Kaelen, buffer window finisher, parry window, dan hit-stop terhadap [sector-ability-progression.md](../../../references/02-gameplay/sector-ability-progression.md) dan [enemy-design-balancing.md](../../../references/02-gameplay/enemy-design-balancing.md).

### 4. Aturan Wajib Breather Room & Safe Archways
- Validasi Breather Room terhadap [level-design-storytelling.md](../../../references/02-gameplay/level-design-storytelling.md); jangan memakai log keputusan retired sebagai authority.
- Breather Room berfungsi untuk: 1) titik checkpoint diegetik, 2) pemulihan pasif Curse Meter, 3) alokasi jeda kontemplatif untuk mencegah kelelahan afektif pemain (*emotional burnout*), 4) penyampaian lore puitis Aina.

### 5. Simbiosis Spasial Arena vs FSM Musuh
- Hindari arena datar berbentuk kotak polos; rujuk [level-design-storytelling.md](../../../references/02-gameplay/level-design-storytelling.md).

---

## Output Expectations (Encounter Pacing Audit)

```markdown
# ⚔️ Encounter Pacing & Combat Rhythm Audit
- **Sektor / Ruang Dungeon**: [Nama Area / Sektor Duka]
- **Status Evaluasi**: [BALANCED / HIGH FATIGUE / LOW TENSION]

### 1. Evaluasi Struktur 4-Fase & Alokasi Bandwidth
- [Analisis alur Intro ➔ Escalation ➔ Twist ➔ Relief]

### 2. Keterbacaan Telegraf & Keadilan Respon
- [Evaluasi wind-up musuh dan jendela reaksi parry/evade]

### 3. Evaluasi Taruhan Visibilitas & Curse Stakes
- [Kesesuaian radius cahaya syal dan interval Breather Room]

### 4. Rekomendasi Penyesuaian Ritme (Action Items)
- [Langkah balancing konkret]
```
