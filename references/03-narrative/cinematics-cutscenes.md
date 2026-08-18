---
status: ACTIVE
type: SPECIFICATION
authority_scope: narrative.cinematics
canonical: true
owner: cinematics-team
last_reviewed: 2026-08-18
---

# Arahan Sinematik & Cutscene — Lentera Pudar Master Reference
### Bahasa Kamera Emosional per Sektor Duka, Pacing Cutscene, Sinkronisasi FACS AU, & Transisi Seamless

> **Dokumen Sumber Kebenaran Sinematografi & Cutscene (*Cinematics & Cutscenes Reference*)**  
> Melengkapi [creative-vision.md](../01-core/creative-vision.md), [human-facial-expressions.md](../04-art-3d/human-facial-expressions.md), [level-design-storytelling.md](../02-gameplay/level-design-storytelling.md), dan [expert-art-creativity.md](../07-foundations/art-creativity.md). Mengatur pergerakan kamera sebagai representasi kondisi mental Kaelen (*Hellblade Cinematic Benchmark*).

---

## 1. Filosofi Sinematik: Kamera Sebagai Keadaan Mental Protagonis
Kamera di *Lentera Pudar* bukan sekadar alat perekam aksi yang netral, melainkan perwujudan langsung dari **kondisi psikologis dan emosional Kaelen**:
- Setiap sudut pengambilan gambar (*shot angle*) ditentukan bukan dari "mana yang paling bagus", melainkan **"sudut mana yang paling jujur menyampaikan apa yang dirasakan Kaelen saat ini"**.

---

## 2. Bahasa Kamera per Sektor Tahapan Berduka

| Sektor Duka | Karakteristik Pergerakan & Framing Kamera | Makna Psikologis |
|---|---|---|
| **Sektor 1: Denial** | Framing simetris kaku, jarak kamera-karakter konstan, sudut pandang statis | Meniru penolakan Kaelen untuk melihat tragedi dari perspektif lain. |
| **Sektor 2: Anger** | Handheld shake dinamis, pemotongan (*cut*) bertempo cepat, close-up mendadak | Ketidakstabilan kamera mencerminkan amarah yang meledak-ledak. |
| **Sektor 3: Bargaining** | Sudut miring (*Dutch angle*), pergerakan memutar di sekitar cermin, depth of field manipulatif | Disorientasi tawar-menawar ilutif dan realitas semu. |
| **Sektor 4: Depression** | *Long take* durasi panjang tanpa cut, kamera statis/sangat lambat, framing luas (karakter tampak kerdil/tenggelam) | Memberi bobot fisik pada berjalannya waktu dan kehampaan total. |
| **Sektor 5: Acceptance** | Framing lapang terbuka, pergerakan kamera halus (Quaternion SLERP), transisi mulus menyongsong fajar | Kestabilan dan kedamaian rekonsiliasi emosional. |

---

## 3. Pacing & Integrasi Gameplay-to-Cutscene
- **Seamless Takeover (Anti Hard-Cut)**: Transisi dari gameplay ke cutscene dilakukan secara mulus (*seamless blend*) tanpa layar hitam mendadak. Kamera beralih halus dari *Over-Shoulder* gameplay ke *Cinematic Shot*.
- **Interactive Narrative Moments**: Memberikan kontrol mikro pada pemain (rotasi pandangan terbatas) selama dialog berlangsung untuk mempertahankan keterlibatan.
- **Hierarki Durasi Cutscene**:
  - *Transisi Antar Sektor / Altar Duka*: Cutscene sinematik penuh berdurasi proporsional (45–90 detik).
  - *Interaksi Dialog Ringan*: Scripted in-game camera blend (10–20 detik).
- **The Power of Silence (Silent Beats)**: Menyisipkan jeda hening tanpa musik atau dialog pada momen katarsis duka.

---

## 4. Perencanaan Pengambilan Gambar (*Shot Planning & FACS AU Sync*)
- **Aturan Cakupan 3-Shot**: Setiap beat naratif kunci wajib memiliki minimal 3 variasi sudut:
  1. *Wide Shot*: Konteks arsitektur level dan atmosferik dungeon.
  2. *Medium Shot*: Bahasa tubuh (bahu merosot, *Contrapposto*, gestur tangan beku).
  3. *Close-Up Shot*: Ekspresi wajah presisi dengan FACS Action Units (`AU1`, `AU4`, `AU15`, `AU17`).
- **Sinkronisasi Presisi Cut ke FACS AU**: Waktu pemotongan ke shot *Close-Up* disinkronkan tepat pada detik pemicu *Action Unit* kunci (contoh: cut ke wajah saat `AU17` dagu menahan tangis aktif).
- **Prioritas Reaction Shot**: Dalam interaksi Kaelen dan Syal Aina, reaksi non-verbal pendengar diberi bobot sinematik setara atau lebih tinggi dari pembicara.
- **Emotional Depth of Field (DoF)**:
  - *Shallow DoF (f/1.8 – f/2.8)*: Mengisolasi Kaelen dari dunia saat introspeksi batin mendalam.
  - *Deep DoF (f/8.0 – f/11.0)*: Menyatukan Kaelen dengan reruntuhan es untuk *environmental storytelling*.

---

## 5. Kontinuitas Teknis (Technical Continuity)
- **Match-Cut Positioning**: Posisi akhir kamera di ujung cutscene harus berada dalam radius orientasi kamera gameplay default untuk mencegah disorientasi pemain.
- **Konsistensi Pencahayaan Kelvin**: Desain tata cahaya sinematik cutscene wajib mempertahankan kontras 2700K (Syal Aina) vs 6500K (Kristal Es). Lumen GI merupakan kandidat implementasi real-time yang akan diverifikasi setelah arsitektur Unreal diaudit.
- **State Persistence**: Posisi musuh, sisa HP, dan status partikel es tidak boleh bergeser (*snap*) saat transisi cutscene berakhir.
