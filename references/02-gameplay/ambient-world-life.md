---
status: ACTIVE
type: SPECIFICATION
authority_scope: gameplay.ambient_world
canonical: true
owner: world-team
last_reviewed: 2026-08-18
---

# NPC Ambient & Kehidupan Lingkungan — Lentera Pudar Master Reference
### Perilaku NPC Latar, Ekosistem Satwa Spasial, Reaktivitas Lingkungan (*World Awareness*), & Karakter Sampingan

> **Dokumen Sumber Kebenaran Kehidupan Lingkungan (*Ambient World Life Reference*)**  
> Melengkapi [level-design-storytelling.md](level-design-storytelling.md), [game-design-document.md](../01-core/game-design-document.md), [expert-psychology.md](../07-foundations/psychology.md), dan [creative-vision.md](../01-core/creative-vision.md). Menetapkan lapisan keempat dunia *Lentera Pudar*: **"Kehidupan yang terus berjalan tanpa menunggu pemain."**

---

## 1. Filosofi Inti: Kontras Dunia Netral vs Beban Batin Kaelen
Duka terasa paling menyayat hati ketika dunia di sekeliling tetap berjalan netral, acuh, dan hidup.
- **Tiga Aturan Utama**:
  1. *Subordinasi Naratif*: Kehidupan ambient tidak boleh merebut fokus visual dari momen naratif Kaelen dan Syal Aina.
  2. *Pemetaan 5 Sektor Duka*: Seluruh perilaku satwa dan NPC latar dipetakan secara simbolis ke tahap duka sektor terkait.
  3. *Low-Cost High-Impact*: Mengandalkan variasi timing acak dan rutinitas minimal, bukan AI simulation kompleks yang mahal komputasi.

---

## 2. Perilaku NPC Ambient (*Idle & Reaction Mechanics*)
- **Rutinitas Minimal (2–3 Idle Actions)**:
  - NPC latar memiliki 2–3 aksi bergantian secara acak (menunduk merenung, membetulkan jubah usang, menoleh perlahan).
  - Dilarang menggunakan *single animation loop* yang kaku seperti manekin.
- **Aware State Halus (Tanpa Dialog Penuh)**:
  - NPC menoleh pelan saat Kaelen melintas dan melakukan kontak mata singkat sebelum memalingkan pandangan (*gaze aversion*).
  - *Sektor Anger*: NPC tampak waspada dan menjaga jarak saat Kaelen mendekat.
  - *Sektor Acceptance*: NPC membalas tatapan dengan damai dan tenang.
- **Prinsip Kualitas**: 3 NPC dengan variasi gestur asinkron jauh lebih meyakinkan dibanding 10 NPC statis.

---

## 3. Ekosistem Satwa Ambient & Reaktivitas Pasif
- **Satwa Latar Tematik (Fauna Es & Bayangan)**:
  - *Sektor 1: Denial*: Burung beku/serangga es bergerak dalam pola geometris melingkar berulang (disorientasi).
  - *Sektor 2: Anger*: Satwa kecil panik dan berhamburan kabur saat Kaelen mendekat (lingkungan waspada).
  - *Sektor 3: Bargaining*: Siluet satwa bayangan yang menghilang saat didekati.
  - *Sektor 4: Depression*: Hening tanpa satwa; sesekali serangga es hinggap statis di reruntuhan dingin.
  - *Sektor 5: Acceptance*: Burung-burung hinggap tenang di dekat jalur Kaelen menyongsong cahaya fajar 2700K.
- **Reaksi Vegetasi & Partikel Pasif**:
  - Reaksi mikro vegetasi es tertekan saat dilintasi Kaelen, pusaran kabut tipis/debu es reaktif terhadap kecepatan gerak kaki.

---

## 4. Reaktivitas Dunia (*Local World Awareness & Persistensi*)
Dunia yang hidup adalah dunia yang memiliki memori fisik:
- **Persistensi Lokal Sektor**:
  - Reruntuhan es dan pilar yang dihancurkan Kaelen tetap hancur selama sesi permainan di sektor tersebut (tidak me-reset instan saat berpindah koridor).
  - Jejak langkah Kaelen di permukaan salju dan lapisan abu altar bertahan beberapa menit sebelum perlahan tertutup embun beku.
- **Batasan Ruang Lingkup**: *World awareness* murni ditujukan untuk kredibilitas atmosfer (*believability*), bukan percabangan cerita bercabang besar (*narrative branching*).

---

## 5. Perancangan Karakter Sampingan (*Secondary Characters*)
- **Detail Tunggal Berkesan**: Karakter sampingan yang ditemui Kaelen tidak memerlukan alur cerita panjang, melainkan satu kebiasaan spesifik, kalimat puitis tajam, atau barang peninggalan yang memperkuat tema duka.
- **Cermin Fase Duka**: Karakter sampingan berperan sebagai cermin alternatif bagaimana jiwa lain merespons kehilangan di semesta *Lentera Pudar*.

---

## 6. Urutan Prioritas Implementasi Teknis
1. **Prioritas 1**: Rutinitas Idle NPC Ambient (Variasi timing asinkron & kontak mata halus).
2. **Prioritas 2**: *World Awareness* Sederhana (Persistensi reruntuhan es & jejak langkah).
3. **Prioritas 3**: Ekosistem Satwa Ambient Latar & Partikel Reaktif.
4. **Prioritas 4**: Karakter Sampingan Tematik.
