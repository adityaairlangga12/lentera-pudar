---
status: ACTIVE
type: SPECIFICATION
authority_scope: gameplay.enemy_balancing
canonical: true
owner: combat-team
last_reviewed: 2026-08-18
---

# Desain Musuh & Balancing Combat — Lentera Pudar Master Reference
### Dari FSM Generik Menuju Arketipe Manifestasi Duka, Telegraphing Readability, & Batasan Kepuasan Mekanik

> **Dokumen Sumber Kebenaran Desain Musuh & Kombat (*Enemy Design & Combat Balancing Reference*)**  
> Melengkapi [game-design-document.md](../01-core/game-design-document.md), [theory-reference.md](../07-foundations/theory-reference.md), dan [encounter_pacing](../../.agents/skills/encounter_pacing/SKILL.md). Mengatur arketipe musuh sebagai representasi psikologis 5 Tahapan Berduka, kurva kesulitan per-encounter, dan jaminan kepuasan bermain (*mechanical satisfaction*).

---

## 1. Filosofi Inti: Musuh Sebagai Manifestasi Pikiran Duka
Alih-alih mendesain musuh generik (*brawler, tank, runner*), setiap musuh di *Lentera Pudar* dirancang dari pertanyaan eksistensial: **"Representasi trauma atau pikiran intrusif apa yang diwujudkan oleh musuh ini?"**
Mekanik musuh diturunkan secara langsung dari emosi duka tersebut (mengadopsi pendekatan psikologis *Hellblade: Senua's Sacrifice*).

---

## 2. Empat Arketipe Musuh Berbasis Tahapan Berduka

| Sektor Duka | Nama Arketipe | Filosofi Emosional | Perilaku AI & Mekanik Kombat |
|---|---|---|---|
| **Sektor 1: Denial** | **The Echo** (Sang Bayangan Semu) | Penyangkalan kenyataan, ambiguitas ingatan masa lalu | Menduplikasi diri dan meniru serangan Kaelen. Pemain dilatih membaca *visual/audio tell* otentik untuk menemukan musuh asli. |
| **Sektor 2: Anger** | **The Berserker** (Sang Api Dingin) | Amarah yang meledak-ledak dan tidak sabar | Serangan beruntun agresif dengan celah pembukaan besar (*punish window*) jika dipancing dengan parry 12-frame yang sabar. |
| **Sektor 3: Bargaining** | **The Deceiver** (Sang Penenun Janji) | Tawar-menawar manipulatif dan ilusi penundaan | Menggunakan teleportasi, cover pilar, dan klon proyektil es semu untuk memecah konsentrasi pemain. |
| **Sektor 4: Depression** | **The Weight** (Sang Beban Keheningan) | Kepasrahan, keputusasaan, dan rasa berat yang melumpuhkan | Bergerak lambat namun memiliki HP tebal, armor es masif, dan serangan area (*shockwave*) berbobot tinggi. |
| **Sektor 5: Acceptance** | **The Mirror** (Sang Refleksi Sejati) | Rekonsiliasi diri dan penerimaan masa lalu | Menyerap dan membalas teknik bertarung Kaelen dari sektor-sektor sebelumnya; ujian puncak penguasaan seluruh mekanik. |

---

## 3. Kurva Kesulitan & Desain Alur Encounter (*Encounter Pacing Loop*)
Kurva kesulitan per-encounter mikro menerapkan pola 4-tahap terstruktur:
1. **Onboarding Encounter**: Memperkenalkan arketipe baru dalam ruang terkontrol 1v1 dengan ruang manuver luas untuk eksplorasi pola serang.
2. **Escalation Phase**: Meningkatkan tempo dalam encounter yang sama (penambahan variasi gerakan atau bahaya lingkungan es retak).
3. **Combo Archetype Encounter**: Menggabungkan dua arketipe kontras secara sinergis (contoh: *The Echo* yang ambigu dipadu *The Berserker* yang mendesak waktu).
4. **Recovery Encounter / Rest Beat**: Memberikan encounter ringan atau transisi hening (*Breather Room*) sebelum pertempuran berat berikutnya.

---

## 4. Keterbacaan Serangan & Telegraphing (*Readability Mandate*)
Combat *Lentera Pudar* mengutamakan keadilan (*fairness*) dan keterbacaan instan telegraf serangan musuh:
- **Windup Frames Baku**: Setiap serangan wajib memiliki fase ancang-ancang visual minimal $12–18\text{ frame}$ (0.40 detik @30fps) dengan pendaran kilau biru dingin `#4A6FA5`.
- **Perubahan Siluet (Silhouette Shift)**: Perubahan postur tubuh musuh saat ancang-ancang wajib terbaca jelas dalam siluet monokrom (mengacu pada [expert-art-creativity.md](../07-foundations/art-creativity.md)).
- **Audio Spatial Tell**: Isyarat suara 3D binaural mendahului serangan untuk deteksi musuh di luar sudut pandang kamera.
- **Tell Khusus The Echo**: Sinyal mikro halus yang konsisten untuk membedakan bayangan asli dari duplikat ilusi.

---

## 5. Batasan Kritis: Tema Duka Tidak Boleh Mengorbankan Fun Mekanik
> [!IMPORTANT]
> **Prinsip Pengaman (*Fun Guardrails*)**:  
> Tema duka dan suasana berat (seperti encounter lambat melawan *The Weight*) **DILARANG KERAS** membuat pertempuran terasa membosankan, lesu, atau tidak responsif.

- **Hit-Stop & Impact Feedback**: Setiap pukulan telak wajib memberikan *3-frame hit-stop*, getaran partikel es retak, dan audio impact yang memuaskan.
- **Responsivitas Kontrol**: Animasi Kaelen tetap lincah dan responsif; rasa berat diciptakan lewat atmosfer dan pacing musuh, bukan lewat *input lag* buatan.
- **Well-Earned Victory**: Kemenangan atas musuh bertempo lambat harus memberikan rasa lega dan kepuasan mekanik yang tinggi.
