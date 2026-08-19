---
status: ACTIVE
type: SPECIFICATION
authority_scope: architecture.studio_semantics
canonical: true
owner: architecture-governance
governed_by: [ADR-042]
last_reviewed: 2026-08-19
---

# AI Studio Semantic Architecture & Repository Boundary

> **Spesifikasi Arsitektur Semantik Kanonikal (*Canonical Semantic Specification*)**  
> Dokumen ini adalah otoritas spesifikasi kanonikal (`authority_scope: architecture.studio_semantics`) yang dipayungi oleh [ADR-042](adr/ADR-042-studio-semantic-and-repository-boundary.md). Dokumen ini menetapkan pemisahan entitas semantik studio, invarian tata kelola mutlak, matriks batas kepemilikan repositori, arah dependensi, prinsip stabilitas inti, dan batasan migrasi program AI Game Dev Studio Architecture Refoundation (AS).

---

## 1. Tujuan & Otoritas (*Purpose & Authority*)

Dokumen ini memegang otoritas spesifikasi arsitektur kanonikal untuk mendefinisikan batas semantik dan kepemilikan repositori Studio OS serta integrasinya dengan *Lentera Pudar*.

Tujuan spesifikasi ini meliputi:

1. Menetapkan definisi semantik 10 entitas inti studio dan mencegah kerancuan peran;
2. Menegakkan invarian semantik yang memisahkan tanggung jawab konseptual dari detail implementasi;
3. Menetapkan matriks batas kepemilikan repositori antara `lentera-pudar`, *Future Studio OS*, dan `lentera-blender-mcp`;
4. Menentukan arah dependensi struktural yang benar dari generic contracts menuju integrasi game;
5. Mengatur prinsip ekstensibilitas sebelum modifikasi inti semantik;
6. Menetapkan batasan migrasi sekuensial yang aman dan mencegah perombakan destruktif (*big-bang refactor*).

---

## 2. Model Entitas Semantik Inti (*Core Semantic Entity Model*)

Arsitektur Studio mendefinisikan 10 entitas semantik inti secara terpisah:

### 2.1 Role
- **Definisi**: Tanggung jawab atau fungsi logis di dalam ekosistem produksi game atau tata kelola.
- **Karakteristik**: Menjelaskan *apa tanggung jawab yang dipenuhi*, bukan *teknologi atau backend apa yang mengeksekusinya*. Contoh peran: *Architecture Reviewer*, *3D Artist*, *Narrative Designer*, *QA Verifier*, *Technical Executor*.
- **Batasan**: Role tidak mengimplikasikan Provider, Profile, Skill, Capability, Tool, atau Runtime tertentu.

### 2.2 Provider
- **Definisi**: Backend kecerdasan atau eksekusi (eksternal maupun internal) yang bertugas melayani permintaan komputasi/inferensi runtime (misalnya: backend model inferensi, platform API).
- **Karakteristik**: `Role != Provider`. Pilihan provider tidak boleh mengubah makna semantik dari sebuah Role.
- **Batasan**: Pergantian atau substitusi provider semata-mata adalah pergantian adapter teknis dan bukan perubahan arsitektur. Tidak ada provider tunggal yang di-hardcode sebagai keharusan arsitektur Studio.

### 2.3 Profile
- **Definisi**: Konfigurasi operasional dan perilaku dari seorang partisipan runtime (agen atau pengguna teknis).
- **Karakteristik**: Profile menyusun dan mereferensikan Role, preferensi provider, batasan perilaku (*behavioral constraints*), daftar skill yang diizinkan, dan parameter runtime.
- **Batasan**: `Profile != Skill`. Keberadaan konfigurasi Profile tidak membuktikan bahwa sistem memiliki kapabilitas operasional yang terverifikasi.

### 2.4 Skill
- **Definisi**: Paket instruksi, panduan operasional, atau prosedur kerja terstruktur yang terdokumentasi dan dapat digunakan ulang.
- **Karakteristik**: Kehadiran fisik artefak skill pada repositori membuktikan status `DOCUMENTED`.
- **Batasan**: `Skill != Capability`. Keberadaan dokumen skill tidak membuktikan registrasi runtime, pemuatan (*loading*), pemanggilan (*invocation*), ketersediaan handler, kapabilitas efektif, maupun keberhasilan eksekusi.

### 2.5 Capability
- **Definisi**: Kemampuan terbukti (*evidence-backed ability*) dari suatu konfigurasi sistem, runtime, atau rantai perkakas untuk menjalankan kelas aksi tertentu di bawah kondisi dan batasan yang dinyatakan.
- **Karakteristik**: Evaluasi kapabilitas wajib mematuhi alur kebenaran kanonikal:
  $$\text{DOCUMENTED} \neq \text{IMPLEMENTED} \neq \text{AVAILABLE} \neq \text{EXECUTED} \neq \text{VERIFIED} \neq \text{ACCEPTED}$$
- **Batasan**: `Capability != Tool`. AS1 tidak mendefinisikan model dimensi kebenaran kaku yang baru; perancangan registri kapabilitas detail dialokasikan secara khusus pada Phase AS4.

### 2.6 Tool
- **Definisi**: Permukaan antarmuka (*interface surface*) atau operasi callable yang diekspos ke dalam konteks eksekusi tertentu.
- **Karakteristik**: Perkakas yang dapat dipanggil oleh runtime untuk berinteraksi dengan disk, engine, atau proses eksternal.
- **Batasan**: Invarian mutlak: $\text{Tool Registration} \neq \text{Handler Implementation} \neq \text{Availability} \neq \text{Execution} \neq \text{Verification}$. Keberadaan tool bukan klaim kapabilitas otomatis.

### 2.7 Runtime
- **Definisi**: Lingkungan atau konteks eksekusi tempat provider, profile, tools, dan semantik eksekusi beroperasi.
- **Karakteristik**: `Runtime != Provider` dan `Runtime != Role`.
- **Batasan**: Dokumentasi konfigurasi runtime tidak membuktikan ketersediaan runtime secara fisik di lingkungan host.

### 2.8 Artifact
- **Definisi**: Deliverable atau hasil kerja logis dari proses produksi game atau tata kelola.
- **Karakteristik**: Invarian mutlak: $\text{Artifact} \neq \text{File}$. Sebuah artefak logis dapat direpresentasikan oleh:
  - Satu file fisik;
  - Kumpulan beberapa file fisik;
  - Output yang dihasilkan secara dinamis (*generated output*);
  - Struktur state repositori;
  - Output eksternal pipeline produksi.
- **Batasan**: Penerimaan suatu artefak logis tidak serta-merta mengkanonisasi seluruh file pembantu di sekitarnya.

### 2.9 Project
- **Definisi**: Konteks produksi game spesifik yang mengonsumsi, memanfaatkan, atau mengintegrasikan arsitektur Studio.
- **Karakteristik**: *Lentera Pudar* adalah produk utama dan proyek referensi produksi pertama (*first reference production project*).
- **Batasan**: Studio OS tidak boleh disamakan (*synonymous*) dengan Lentera Pudar.

### 2.10 Production Domain
- **Definisi**: Klasifikasi bidang keahlian subjek produksi atau area alur kerja (misalnya: 3D Art, Audio, Narrative, Gameplay, QA/QC).
- **Karakteristik**: Invarian mutlak: $\text{Production Domain} \neq \text{Role}$.
- **Batasan**: `3D` adalah domain produksi; `3D Artist` atau `Rigging Specialist` adalah role di dalam domain tersebut. Keduanya tidak boleh disatukan.

---

## 3. Invarian Semantik Wajib (*Required Semantic Invariants*)

Seluruh dokumen tata kelola, spesifikasi, dan implementasi diwajibkan mematuhi invarian mutlak berikut:

```text
Role != Provider
Profile != Skill
Skill != Capability
Capability != Tool
Runtime != Provider
Production Domain != Role
Artifact != File
Execution != Verification != Acceptance
Provider change != architecture change
Registration != Implementation != Availability != Execution != Verification
```

Prinsip-prinsip di atas adalah invarian struktural dan bukan sekadar contoh opsional.

---

## 4. Matriks Batas Kepemilikan Repositori (*Repository Ownership Matrix*)

| Repositori | Status Keberadaan | Lingkup Kepemilikan Otoritatif | Hal yang DILARANG Dimiliki |
|---|---|---|---|
| **`adityaairlangga12/lentera-pudar`** | Aktif / Eksis | - Kanon semesta dan cerita game.<br>- Spesifikasi GDD, Narrative, Gameplay, dan Art 3D.<br>- Tata kelola, status, dan ADR game.<br>- Implementasi gameplay dan aset produksi game.<br>- Work Orders, Traces, Handoffs, dan Passports proyek.<br>- Konfigurasi integrasi spesifik Lentera Pudar.<br>- Aset agen project-local di `.agents/**`. | - Kontrak generic universal Studio OS.<br>- Skema multi-game generic.<br>- Server eksternal Blender MCP. |
| **Future Studio OS** | **Masa Depan / Belum Dibuat** | - Kontrak semantik generic Studio.<br>- Skema data, registri, dan validator universal.<br>- Abstraksi Role, Provider, Profile, dan Skill generic.<br>- Kontrak kapabilitas dan control-plane generic.<br>- Semantik adapter runtime/provider.<br>- Kerangka kerja ekstensi lintas-proyek. | - Aset atau cerita game spesifik Lentera.<br>- File binary produksi Unreal game.<br>- Server eksternal Blender MCP. |
| **`lentera-blender-mcp`** | Aktif / Terpisah | - Implementasi control-plane Blender.<br>- Tooling dan script internal Blender.<br>- Server JSON-RPC Blender MCP. | - Spesifikasi game Lentera Pudar.<br>- Kontrak generic Studio OS di luar domain Blender. |

---

## 5. Arah Dependensi (*Dependency Direction*)

Aliran ketergantungan konseptual dirancang mengalir secara satu arah:

```text
Studio Semantic Contracts
        ↓
Future Studio OS Implementation
        ↓
Project Integration / Adapter Layer
        ↓
Lentera Pudar
```

- *Lentera Pudar* menyediakan bukti kebutuhan produksi riil (*reference-production evidence*).
- Namun demikian, arsitektur generic Studio OS **DILARANG** diturunkan dengan cara mempromosikan struktur lokal Lentera Pudar secara membabi buta menjadi semantik universal.

---

## 6. Prinsip Stabilitas Inti & Ekstensibilitas Tepi (*Core Stability & Edge Extensibility*)

- **Prinsip Utama**: **Perluas melalui registrasi dan komposisi sebelum mengubah semantik inti (*Extend by registration/composition before changing core semantics*)**.
- Inti semantik Studio OS dijaga tetap ramping, kokoh, dan stabil.
- Variasi kebutuhan diekspresikan melalui:
  - Registrasi skill/perkakas baru;
  - Komposisi profile agen;
  - Adapter provider baru;
  - Deskriptor metadata;
  - Ekstensi modular.
- Desain arsitektur generic wajib didorong oleh kebutuhan produksi nyata *Lentera Pudar*. Kebutuhan hipotetis portofolio multi-game atau game 2D berstatus *FUTURE* dan tidak diimplementasikan sebelum ada kebutuhan fisik.

---

## 7. Klasifikasi Aset `.agents/**` Saat Ini

Direktori `.agents/**` pada repositori `lentera-pudar` saat ini diklasifikasikan sebagai:

**Aset agen dan spesifikasi prosedur lokal proyek Lentera Pudar (*existing Lentera Pudar project-local agent assets / documented specifications*)**

Direktori tersebut:
- ❌ **Bukan** Studio OS;
- ❌ **Bukan** bukti bahwa implementasi Studio OS telah selesai;
- ❌ **Bukan** arsitektur generic lintas-proyek;
- ❌ **Bukan** bukti aktivasi runtime.

Aset skill lokal tetap menjadi spesifikasi lokal proyek Lentera Pudar hingga dimigrasikan secara resmi melalui fase program AS yang relevan.

---

## 8. Batas Repositori Studio OS Masa Depan (*Future Studio OS Boundary*)

- Repositori Studio OS **BELUM DIBUAT** dan tidak dibuat pada Phase AS1.
- Inisialisasi fisik repositori Studio OS berada di bawah Phase AS2 dan tunduk pada gerbang persetujuan manusia (*Project Owner approval gate*) atas nama repositori, lisensi, dan visibilitas.

---

## 9. Independensi `lentera-blender-mcp`

- `lentera-blender-mcp` adalah repositori terpisah dan independen untuk control plane Blender.
- Repositori tersebut **TIDAK** dimiliki oleh `lentera-pudar` dan **TIDAK** diserap ke dalam repositori Studio OS masa depan.
- Integrasi antara Studio OS dan `lentera-blender-mcp` di masa depan akan berlangsung melalui kontrak antarmuka dan adapter, tanpa peleburan kepemilikan repositori.

---

## 10. Urutan Batas Migrasi (*Migration Sequencing Boundary*)

Program AS menjalankan migrasi berpagar tanpa perubahan destruktif (*no big-bang migration*):

1. **AS1**: Menetapkan arsitektur semantik dan batas kepemilikan repositori;
2. **AS2**: Menginisialisasi repositori Studio OS dan paket fondasi kontrak setelah persetujuan Project Owner;
3. **AS3**: Merefundasi implementasi Provider, Profile, Skill, dan Runtime pada Studio OS;
4. **AS4**: Mengimplementasikan registri kapabilitas dan integrasi control-plane;
5. **AS5**: Mengintegrasikan repositori Lentera Pudar dengan Studio OS;
6. **Pasca-AS5**: Struktur lokal lama hanya dipensiunkan/direfaktor setelah jalur pengganti yang terverifikasi telah beroperasi penuh.

---

## 11. Keputusan yang Ditunda (*Deferred Decisions & Non-Goals*)

Keputusan berikut secara eksplisit **DITUNDA** ke fase berikutnya:

- Penetapan nama repositori Studio OS (AS2);
- Pemilihan visibilitas (*public/private*) dan lisensi repositori Studio OS (AS2);
- Pemilihan bahasa pemrograman dan framework implementasi Studio OS (AS2);
- Daftar konkret provider AI dan implementasi adapternya (AS3);
- Desain model dan dimensi final registri kapabilitas (AS4);
- Format pertukaran data (*interchange*) Blender → Unreal (H1);
- Arsitektur teknis Unreal Engine berdasarkan evidence yang tersedia atau diusulkan pada saat H1 (H1/Domain 05);
- Fungsionalitas multi-game / 2D / portfolio tetap FUTURE dan hanya dapat diaktifkan melalui evidence kebutuhan serta governance dan Project Owner authorization yang berlaku.

---

## 12. Implikasi Verifikasi & Keberterimaan (*Verification & Acceptance*)

- Setiap klaim keberhasilan fase program AS wajib menyajikan bukti fisik terobservasi (*evidence-driven*).
- Evaluasi internal oleh pembuat (*maker self-check*) bukan verifikasi independen.
- Hak penerimaan fase (*external acceptance*) sepenuhnya berada di tangan Project Owner.

---

## 13. Dokumen Tata Kelola Terkait (*Related Canonical Governance*)

- [ADR-042 — Studio Semantic Architecture & Repository Boundary](adr/ADR-042-studio-semantic-and-repository-boundary.md)
- [AI Studio Refoundation Plan](ai-studio-refoundation-plan.md)
- [Master Index](master-index.md)
- [Project Status](project-status.md)
