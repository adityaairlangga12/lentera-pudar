---
status: ACTIVE
type: SPECIFICATION
authority_scope: art.facial_rig
canonical: true
owner: character-art-team
last_reviewed: 2026-08-18
---

# Ekspresi Wajah Manusia & FACS — Lentera Pudar Master Reference
### Anatomi Otot Wajah, Facial Action Coding System (FACS), Duchenne Marker, & Bahasa Emosi Gaze

> **Dokumen Sumber Kebenaran Ekspresi Wajah Karakter (*Facial Anatomy & FACS Reference*)**  
> Melengkapi biomekanika tubuh [anatomy-kinesiology.md](anatomy-kinesiology.md) dan psikologi pemain [expert-psychology.md](../07-foundations/psychology.md). Menjadi pedoman teknis rigging blend shape, ekspresi mikro, dan tatapan mata (*eye gaze*) untuk karakter Kaelen dan Aina di **Blender 5.2 LTS + Unreal Engine 5**.

---

## 1. Anatomi Otot Wajah (*Facial Musculature*)
Otot wajah menempel langsung pada lapisan kulit subkutan (*dermis*) tanpa perantara tendon tulang panjang. Sembilan kelompok otot utama pengendali ekspresi:
- **Frontalis**: Mengangkat alis, menghasilkan kerutan dahi horizontal (keterkejutan/ketakutan).
- **Corrugator Supercilii**: Menarik alis ke bawah-dalam, membentuk lipatan vertikal di antara alis (*glabella furrow* — otot kunci *Anger* & fokus bertarung).
- **Orbicularis Oculi**: Otot melingkar kelopak mata; bagian luar (*pars orbitalis*) membentuk kerutan sudut mata saat senyum tulus (*Duchenne marker*).
- **Zygomaticus Major**: Menarik sudut bibir ke atas-luar (otot utama senyum).
- **Levator Labii Superioris**: Mengangkat bibir atas (jijik/sedih tertahan).
- **Depressor Anguli Oris**: Menarik sudut bibir ke bawah (kesedihan mendalam/kecewa).
- **Mentalis**: Mengerutkan bantalan dagu (menahan tangis di momen duka Kaelen & Aina).
- **Orbicularis Oris**: Otot melingkar bibir (mengatup rapat, menahan kata-kata).
- **Platysma**: Otot leher tipis yang menegang saat syok emosional ekstrem.

---

## 2. Facial Action Coding System (FACS) — Standar Action Units (AU)

| Kode AU | Nama Gerakan | Otot Utama | Relevansi Narasi & Sektor Duka |
|---|---|---|---|
| **AU1** | Inner Brow Raiser | Frontalis (pars medialis) | Kesedihan, kepedihan mendalam (*Depression*) |
| **AU4** | Brow Lowerer | Corrugator Supercilii | Kemarahan, kepalan tekad (*Anger*) |
| **AU6** | Cheek Raiser | Orbicularis Oculi (orbitalis) | Senyum tulus penuh keikhlasan (*Duchenne*) |
| **AU12** | Lip Corner Puller | Zygomaticus Major | Senyum (tulus atau topeng sosial) |
| **AU15** | Lip Corner Depressor | Depressor Anguli Oris | Keputusasaan, kekalahan batin |
| **AU17** | Chin Raiser | Mentalis | Menahan kepedihan air mata (*Denial/Grief*) |
| **AU23** | Lip Tightener | Orbicularis Oris | Pengerasan bibir saat menahan amarah |
| **AU43** | Eyes Closed / Droop | Orbicularis Oculi (kelopak) | Kepasrahan, damai, pelepasan (*Acceptance*) |

---

## 3. Pemetaan Ekspresi Wajah ke 5 Sektor Duka (*5 Stages of Grief*)

1. **Sektor 1: Denial (Penyangkalan)**:
   - Kombinasi: `AU1 + AU2` (keterkejutan tertahan) + Wajah datar dipaksakan (otot mulut netral, tatapan tidak fokus / *gaze drift*).
   - Kesan: Disosiasi mental, menolak memproses kenyataan.
2. **Sektor 2: Anger (Kemarahan)**:
   - Kombinasi: `AU4` dominan + `AU23` (bibir mengatup kencang) + Rahang mengeras (*masseter tension*).
   - Kesan: Ketegangan eksplosif yang menutupi kerapuhan batin.
3. **Sektor 3: Bargaining (Tawar-Menawar)**:
   - Kombinasi: `AU1 + AU4` (alis berkerut bimbang) + `AU12` parsial asimetris.
   - Kesan: Kebingungan eksistensial, memohon penundaan takdir.
4. **Sektor 4: Depression (Depresi — Kehampaan Total)**:
   - Kombinasi: `AU1 + AU15` (sudut mulut turun) + `AU43` parsial (kelopak mata layu) + Tonus otot wajah mengendur total.
   - Kesan: Kehabisan daya hidup, kepasrahan beku (*emotional numbness*).
5. **Sektor 5: Acceptance (Penerimaan — Dawning Altar)**:
   - Kombinasi: `AU12` lembut tanpa/lemah `AU6` + Kelopak mata rileks.
   - Kesan: Senyum damai nan tenang (bukan euforia), keikhlasan melepaskan.

---

## 4. Duchenne Marker: Senyum Tulus vs Senyum Topeng
- **Senyum Tulus (*Genuine Duchenne Smile*)**: Mengaktifkan `AU6 + AU12` secara sinkron (sudut mata berkerut hangat bersama bibir).
- **Senyum Topeng (*Masked Smile*)**: HANYA mengaktifkan `AU12` tanpa `AU6` (mulut tersenyum namun tatapan mata tetap dingin/berat).
- *Penerapan*: Digunakan saat Kaelen atau Aina berpura-pura tegar di awal perjalanan untuk menyembunyikan rasa sakit.

---

## 5. Asimetri Wajah & Ekspresi Mikro (*Micro-Expressions*)
- **Asimetri Alami**: Wajah manusia tidak pernah simetris sempurna. Rig wajib menerapkan offset intensitas (5–15%) dan delay timing (2–4 frame) antara belahan wajah kiri dan kanan.
- **Ekspresi Mikro (1/25 s.d. 1/5 detik)**: Kilasan ekspresi duka sejati (misal `AU1+AU4` sekilas selama 3 frame) sebelum kembali ke topeng datar.

---

## 6. Standar Teknis Rig Wajah di Blender 5.2 & Target Integrasi Engine
- **Blend Shapes Berbasis AU**: Membangun shape keys terpisah untuk masing-masing Action Unit individual (bukan preset ekspresi jadi), digabungkan lewat pose drivers.
- **Pemisahan Kontrol Eye Region vs Mouth Region**: Memungkinkan mata mengekspresikan duka mendalam sementara bibir tetap terkunci netral.
- **Corrective Morphs Glabella**: Menambahkan corrective shape key pada kombinasi ekstrem `AU1 + AU4` untuk mencegah distorsi topologi dahi.
- **Batasan Rotasi Rahang (*Jaw Limits*)**: Mengunci translasi/rotasi tulang mandibula rahang bawah (rotasi pitch maksimal 15°–20°).

---

## 7. Bahasa Tatapan Mata (*Eye Gaze & Focus Dynamics*)
- **Gaze Aversion (Menghindari Kontak Mata)**: Indikator rasa bersalah masa lalu Kaelen.
- **Gaze Lock (Tatapan Mengunci Intens)**: Digunakan saat duel lock-on combat 1v1 dan momen klimaks naratif.
- **Downward Gaze + Slow Blink**: Tatapan menunduk lesu di Sektor 4 (*Depression*).
- **Gaze Drift (Tatapan Mengambang Tanpa Titik Fokus)**: Disosiasi batin di Sektor 1 (*Denial*).
- *Setup Teknis*: Modul Eye-Tracking Control Rig wajib memiliki parameter terpisah untuk *Look-At Target* dan *Hold Duration* sebelum transisi.

---

## 8. Sinkronisasi Audio-Visual Vokal & FACS (Lihat [vocal-direction-dialogue.md](../03-narrative/vocal-direction-dialogue.md))
- **Micro-Pause & Micro-Expression Sync**: Jeda mikro intonasi vokal dipadukan tepat dengan kedutan mikro `AU1+AU4` (1/25–1/5 detik).
- **Suara Tercekat saat `AU17` (Chin Raiser)**: Penurunan volume vokal dan getaran suara tertahan saat otot dagu mengencang menahan tangis.
- **Gaze Aversion & Proyeksi Suara**: Proyeksi vokal mengecil secara proporsional saat tatapan mata mengelak karena rasa bersalah.

