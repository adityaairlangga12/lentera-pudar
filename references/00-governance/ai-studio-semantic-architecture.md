---
status: ACTIVE
type: SPECIFICATION
authority_scope: architecture.studio_semantics
canonical: true
owner: architecture-governance
governed_by: [ADR-042, ADR-043, ADR-044]
last_reviewed: 2026-08-22
---

# AI Studio Semantic Architecture & Repository Boundary

> **Spesifikasi Arsitektur Semantik Kanonikal (*Canonical Semantic Specification*)**  
> Dokumen ini adalah otoritas spesifikasi kanonikal (`authority_scope: architecture.studio_semantics`) yang dipayungi oleh [ADR-042](adr/ADR-042-studio-semantic-and-repository-boundary.md), [ADR-043](adr/ADR-043-studio-capability-control-plane-architecture.md), dan [ADR-044](adr/ADR-044-lentera-studio-integration-production-lifecycle-architecture.md). Dokumen ini menetapkan pemisahan entitas semantik studio, invarian tata kelola mutlak, matriks batas kepemilikan repositori, arah dependensi, arsitektur kapabilitas/control-plane, integrasi siklus hidup produksi, prinsip stabilitas inti, dan batasan migrasi program AI Game Dev Studio Architecture Refoundation (AS).

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
  Serta pemisahan semantik tingkat kapabilitas operasional:
  $$\text{Technology Adoption} \neq \text{Server Availability} \neq \text{Tool Registration} \neq \text{Handler Implementation} \neq \text{Effective Capability}$$
  - **Technology Adoption**: Teknologi telah dipilih, disetujui, atau diadopsi untuk digunakan. Hal ini TIDAK membuktikan instalasi fisik, ketersediaan server, registrasi tool, implementasi handler, maupun kapabilitas efektif.
  - **Server Availability**: Suatu server atau service dapat dijangkau/tersedia secara fisik di lingkungan target yang diobservasi. Hal ini TIDAK membuktikan bahwa tool spesifik terdaftar, handler terimplementasi dengan benar, maupun kapabilitas efektif end-to-end.
  - **Tool Registration**: Suatu tool atau antarmuka telah diekspos atau didaftarkan pada permukaan eksekusi runtime. Hal ini TIDAK membuktikan implementasi handler (`Tool Registration != Handler Implementation`).
  - **Handler Implementation**: Kode atau logika eksekusi di balik tool/aksi telah ditulis secara fisik. Hal ini TIDAK membuktikan ketersediaan server, keberhasilan eksekusi, maupun kapabilitas efektif.
  - **Effective Capability**: Sistem end-to-end benar-benar mampu menjalankan aksi yang didefinisikan di bawah kondisi yang dinyatakan berdasarkan bukti fisik yang relevan. Kapabilitas efektif dilarang disimpulkan hanya dari adopsi, registrasi, implementasi, atau ketersediaan server semata.
- **Batasan**: Invarian mutlak: $\text{Capability} \neq \text{Tool}$ dan $\text{Capability Declaration} \neq \text{Operational Evidence}$. Deklarasi kontrak kapabilitas atau registrasi deskriptif tidak dengan sendirinya membuktikan ketersediaan operasional atau keberhasilan eksekusi. Model arsitektur registri dan evaluasi kapabilitas disahkan melalui [ADR-043](adr/ADR-043-studio-capability-control-plane-architecture.md), sedangkan implementasi teknis dialokasikan secara berpagar pada gerbang AS4-G1 s.d. AS4-G4.

### 2.6 Tool
- **Definisi**: Permukaan antarmuka (*interface surface*) atau operasi callable yang diekspos ke dalam konteks eksekusi tertentu.
- **Karakteristik**: Perkakas yang dapat dipanggil oleh runtime untuk berinteraksi dengan disk, engine, atau proses eksternal.
- **Batasan**: Invarian mutlak: $\text{Tool Registration} \neq \text{Handler Implementation} \neq \text{Server Availability} \neq \text{Execution} \neq \text{Verification} \neq \text{Effective Capability}$. Deskriptor atau registrasi tool bukan klaim kapabilitas otomatis dan tidak membuktikan bahwa handler siap dieksekusi atau server aktif.

### 2.7 Runtime
- **Definisi**: Lingkungan atau konteks eksekusi tempat provider, profile, tools, dan semantik eksekusi beroperasi.
- **Karakteristik**: `Runtime != Provider` dan `Runtime != Role`.
- **Batasan**: Dokumentasi konfigurasi runtime tidak membuktikan ketersediaan runtime secara fisik di lingkungan host.

### 2.8 Artifact
- **Definisi**: Deliverable atau hasil kerja logis dari proses produksi game atau tata kelola.
- **Karakteristik**: Invarian mutlak: $\text{Artifact} \neq \text{File}$ dan $\text{Artifact acceptance} \neq \text{canon acceptance}$. Sebuah artefak logis dapat direpresentasikan oleh:
  - Satu file fisik;
  - Kumpulan beberapa file fisik;
  - Output yang dihasilkan secara dinamis (*generated output*);
  - Struktur state repositori;
  - Output eksternal pipeline produksi.
- **Batasan**: Penerimaan suatu artefak logis (*artifact acceptance*) tidak otomatis memberikan otoritas kanonikal (*canon acceptance*). Persistensi atau otoritas kanonikal mewajibkan jalur tata kelola yang berlaku, kepemilikan otoritas yang dideklarasikan, dan status repositori kanonikal. Penerimaan artefak juga tidak serta-merta mengkanonisasi seluruh file pembantu di sekitarnya.

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
Artifact acceptance != canon acceptance
Execution != Verification != Acceptance
Provider change != architecture change
Registration != Implementation != Availability != Execution != Verification
Technology Adoption != Server Availability != Tool Registration != Handler Implementation != Effective Capability
Capability Declaration != Operational Evidence
ControlPlanePlan != Execution
ExecutionReceipt != Verification
ExecutionReceipt != OperationalEvidence
ExecutionReceipt != CapabilityAssessment
Passport != Artifact
Passport existence != Artifact acceptance
Host capability != project capability
```

Prinsip-prinsip di atas adalah invarian struktural dan bukan sekadar contoh opsional.

---

## 4. Matriks Batas Kepemilikan Repositori (*Repository Ownership Matrix*)

| Repositori | Klasifikasi Batas | Lingkup Kepemilikan Otoritatif | Hal yang DILARANG Dimiliki |
|---|---|---|---|
| **`adityaairlangga12/lentera-pudar`** | Primary product / first reference production project | - Kanon semesta dan cerita game.<br>- Spesifikasi GDD, Narrative, Gameplay, dan Art 3D.<br>- Tata kelola, status, dan ADR game.<br>- Implementasi gameplay dan aset produksi game.<br>- Work Orders, Traces, Handoffs, dan Passports proyek.<br>- Konfigurasi integrasi spesifik Lentera Pudar.<br>- Aset agen project-local di `.agents/**`. | - Kontrak generic universal Studio OS.<br>- Skema multi-game generic.<br>- Server eksternal Blender MCP. |
| **`adityaairlangga12/ai-game-dev-studio-os`** | Generic Studio OS repository | - Kontrak semantik generic Studio.<br>- Skema data, registri, dan validator universal.<br>- Abstraksi Role, Provider, Profile, dan Skill generic.<br>- Kontrak kapabilitas dan control-plane generic.<br>- Semantik adapter runtime/provider.<br>- Kerangka kerja ekstensi lintas-proyek. | - Aset atau cerita game spesifik Lentera.<br>- File binary produksi Unreal game.<br>- Server eksternal Blender MCP. |
| **`lentera-blender-mcp`** | Independent tooling repository | - Implementasi control-plane Blender.<br>- Tooling dan script internal Blender.<br>- Server JSON-RPC Blender MCP. | - Spesifikasi game Lentera Pudar.<br>- Kontrak generic Studio OS di luar domain Blender. |

---

## 5. Arah Dependensi (*Dependency Direction*)

Aliran ketergantungan konseptual dirancang mengalir secara satu arah:

```text
Studio Semantic Contracts
        ↓
Studio OS Generic Implementation
        ↓
Project Integration / Adapter Layer
        ↓
Lentera Pudar
```

- *Lentera Pudar* menyediakan bukti kebutuhan produksi riil (*reference-production evidence*).
- Namun demikian, arsitektur generic Studio OS **DILARANG** diturunkan dengan cara mempromosikan struktur lokal Lentera Pudar secara membabi buta menjadi semantik universal.

---

## 6. Arsitektur Kapabilitas & Batas Control-Plane AS4 (*AS4 Capability & Control-Plane Architecture*)

Berdasarkan [ADR-043](adr/ADR-043-studio-capability-control-plane-architecture.md), sistem menetapkan arsitektur kapabilitas dan control-plane generic dengan pemisahan peran yang tegas:

### 6.1 Deklarasi Statis vs. Bukti Operasional (*Declaration vs. Evidence*)
- **Deklarasi Statis**: `CapabilityDescriptor`, `ToolDescriptor`, dan `ControlPlaneDescriptor` mendefinisikan identitas semantik, kontrak antarmuka, relasi, prasyarat, dan metadata tanpa memuat asersi ketersediaan permanen (`available: true`, `verified: true`, `works: true`).
- **Bukti Operasional**: Observasi operasional yang terikat lingkup lingkungan (*environment-scoped*) dan waktu (*time-bound*) yang mencatat status fisik aktual (adopsi, server, registrasi tool, handler, eksekusi, verifikasi).

### 6.2 Keluarga Registri (*Registry Family*)
- `CapabilityRegistry`: Registrasi deklaratif dan resolusi eksak untuk `CapabilityDescriptor`.
- `ToolRegistry`: Registrasi deklaratif dan resolusi eksak untuk `ToolDescriptor`.
- `ControlPlaneRegistry`: Registrasi deklaratif dan resolusi eksak untuk `ControlPlaneDescriptor`.
- Invarian: Keberadaan entitas dalam registri murni bersifat deklaratif dan tidak membuktikan ketersediaan operasional (`Registration != Availability != Execution`).

### 6.3 Evaluasi Kapabilitas Fail-Closed (*Capability Assessment*)
- Evaluator deterministik mengonsumsi deklarasi kapabilitas, perkakas, dan bukti operasional eksplisit untuk menghasilkan `CapabilityAssessment` dengan status ketersediaan: `AVAILABLE`, `UNAVAILABLE`, atau `UNKNOWN`.
- **Prinsip Fail-Closed**: Ketiadaan bukti operasional atau bukti yang tidak memadai **DILARANG KERAS** menghasilkan status `AVAILABLE`.
- Asesmen operasional Studio OS mendukung tetapi tidak menggantikan 3 dimensi kebenaran tata kelola proyek ADR-004.

### 6.4 Batas Perencanaan & Orkestrasi Control-Plane (*Planning & Orchestration Boundary*)
- `RuntimeCompositionPlan` (AS3) yang bersifat deklaratif digabungkan dengan kebutuhan kapabilitas, registri, dan `CapabilityAssessment` untuk menghasilkan `ControlPlanePlan`.
- Invarian: $\text{ControlPlanePlan} \neq \text{Execution}$. Rencana control-plane murni deklaratif dan wajib *fail closed* bila prasyarat tidak terpenuhi.
- Aliran orkestrasi:
  $$\text{ControlPlanePlan} \longrightarrow \text{ControlPlaneOrchestrator} \longrightarrow \text{Injected ControlPlaneAdapter} \longrightarrow \text{ExecutionReceipt}$$
- Invarian: $\text{ExecutionReceipt} \neq \text{Verification}$. Bukti eksekusi tidak membuktikan verifikasi atau keberterimaan hasil.
- Inti generic Studio OS dilarang memuat konfigurasi, endpoint, kredensial, atau path spesifik Lentera Pudar, Blender, maupun Unreal.

### 6.5 Batas Kepemilikan Repositori
- **`adityaairlangga12/ai-game-dev-studio-os`**: Kontrak generic Capability/Tool/ControlPlane, registri, validator, evaluator fail-closed, semantik perencanaan, dan batas orkestrasi generic.
- **`lentera-blender-mcp`**: Implementasi control-plane mandiri spesifik Blender, tooling Blender, dan server JSON-RPC Blender MCP.
- **`adityaairlangga12/lentera-pudar`**: Konfigurasi integrasi spesifik proyek Lentera Pudar, penggunaan produksi, bukti operasional, dan tata kelola siklus hidup proyek.

---

## 7. Arsitektur Integrasi & Siklus Hidup Produksi AS5 (*AS5 Studio Integration & Production Lifecycle Architecture*)

Berdasarkan [ADR-044](adr/ADR-044-lentera-studio-integration-production-lifecycle-architecture.md), sistem menetapkan arsitektur integrasi konsumsi Studio OS oleh Lentera Pudar dan manajemen siklus hidup produksi:

### 7.1 Pemisahan Empat Bidang Konseptual (*Four-Plane Lifecycle Separation*)
- **A. Declaration / Configuration Plane**: Deskriptor proyek, pemetaan production-domain, deklarasi artefak, dan kebutuhan kapabilitas/runtime.
- **B. Execution Plane**: `RuntimeCompositionPlan`, `ControlPlanePlan`, `ControlPlaneOrchestrator`, `Injected ControlPlaneAdapter`, dan `ExecutionReceipt`.
- **C. Evidence / Verification Plane**: Observasi proyek aktual, `OperationalEvidence` eksplisit, verifikasi domain-appropriate (6-DoD, uji log, link-check), dan bukti independen terobservasi.
- **D. Lifecycle / Acceptance Plane**: Otorisasi Work Order berbatas, state siklus hidup artefak, Trace, Handoff, Passport, penerimaan Project Owner/manusia, dan keputusan stage-gate kanonikal proyek.
- Invarian mutlak: $\text{ExecutionReceipt} \neq \text{OperationalEvidence} \neq \text{CapabilityAssessment} \neq \text{Verification}$. Hasil eksekusi adapter yang sukses tidak otomatis memajukan status artefak, verifikasi, atau tata kelola proyek.

### 7.2 Persistensi Siklus Hidup Berbasis Berkas Lokal Proyek (*Project-Local File-Backed Persistence*)
- Rekaman siklus hidup produksi dikelola sebagai berkas lokal proyek yang terlacak versi (*project-local, version-controlled, file-backed lifecycle records*).
- Menjamin reviewability via pull requests, Git provenance, portabilitas tanpa dependensi basis data eksternal, diffability deterministik, dan kepemilikan penuh di repositori `lentera-pudar`.
- Invarian: $\text{Artifact} \neq \text{File}$ tetap berlaku; artefak logis dapat terdiri dari satu atau banyak berkas.

### 7.3 Tanggung Jawab Entitas Siklus Hidup (*Lifecycle Entity Responsibilities*)
- **Work Order**: Kontrak otorisasi eksekusi berbatas yang menetapkan ruang kerja, repositori, jalur yang diizinkan, kriteria penerimaan, dan bukti yang disyaratkan.
- **Trace**: Rekam jejak eksekusi dan konteks observasi aktual yang terikat pada Work Order; tidak sama dengan verifikasi atau penerimaan.
- **Handoff**: Rekam transfer tanggung jawab produksi antar-domain yang mensyaratkan bukti dan status artefak hulu yang valid; tidak menciptakan penerimaan hilir otomatis.
- **Passport**: Ringkasan portabel milik proyek mengenai identitas artefak, provenansi, referensi verifikasi, dan status siklus hidup. $\text{Passport} \neq \text{Artifact}$ dan $\text{Passport existence} \neq \text{Artifact acceptance}$.

### 7.4 Jembatan Bukti & Evaluasi Kapabilitas Fail-Closed (*Evidence Bridge*)
- `ExecutionReceipt` dapat dirujuk sebagai masukan bukti eksekusi, tetapi dilarang otomatis diubah menjadi status `VERIFIED`, `ACCEPTED`, atau `CapabilityAssessment = AVAILABLE`.
- Bukti operasional (`OperationalEvidence`) wajib terikat lingkup lingkungan dan waktu; evaluasi kapabilitas wajib fail-closed.

### 7.5 Perutean Domain Produksi (*Production Domain Routing*)
- Integrasi siklus hidup merutekan ke otoritas domain kanonikal (Domain 01–04) dan QA/SOP (Domain 06).
- Mendukung domain: 3D Art, Audio, Narrative, Gameplay, QA/QC.
- Invarian: $\text{Production Domain} \neq \text{Role}$. Verifikasi teknis tidak menggantikan penilaian emosional/kreatif manusia.

### 7.6 Batas Isolasi Blender & Firewall Unreal / H1
- `lentera-blender-mcp` tetap independen; bukti operasional Blender wajib direakuisisi per sesi lingkungan; tidak ada eksekusi Blender di AS5-A0.
- Phase H1 dan Unreal Engine tetap terisolasi secara mutlak; tidak ada inisialisasi proyek Unreal, pemilihan format interchange final, atau pembukaan Domain 05 di AS5. H1 terblokir hingga AS8 diterima secara eksternal dan project-status membukanya secara terpisah.

### 7.7 Dekomposisi Gerbang AS5 & Aturan Otorisasi (*AS5 Gated Decomposition*)
- Urutan gerbang: `AS5-A0 → AS5-G1 → AS5-G2 → AS5-G3 → AS5-G4 → AS5-G5`.
- Aturan pemisahan otorisasi: Penerimaan AS5-A0 **TIDAK** mengotorisasi implementasi AS5-G1; penerimaan AS5-G1 **TIDAK** mengotorisasi AS5-G2; pemisahan yang sama berlaku hingga AS5-G5.
- Setiap gerbang implementasi memerlukan otorisasi terpisah Project Owner, Work Order berbatas, eksekusi Maker, verifikasi Verifier independen, dan penerimaan Project Owner.

---

## 8. Prinsip Stabilitas Inti & Ekstensibilitas Tepi (*Core Stability & Edge Extensibility*)

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

## 9. Klasifikasi Aset `.agents/**` Saat Ini

Direktori `.agents/**` pada repositori `lentera-pudar` saat ini diklasifikasikan sebagai:

**Aset agen dan spesifikasi prosedur lokal proyek Lentera Pudar (*existing Lentera Pudar project-local agent assets / documented specifications*)**

Direktori tersebut:
- ❌ **Bukan** Studio OS;
- ❌ **Bukan** bukti bahwa implementasi Studio OS telah selesai;
- ❌ **Bukan** arsitektur generic lintas-proyek;
- ❌ **Bukan** bukti aktivasi runtime.

Aset skill lokal tetap menjadi spesifikasi lokal proyek Lentera Pudar hingga dimigrasikan secara resmi melalui fase program AS yang relevan.

---

## 10. Batas Repositori Studio OS (*Studio OS Repository Boundary*)

- Repositori Studio OS (`adityaairlangga12/ai-game-dev-studio-os`) adalah repositori terpisah dan mandiri untuk domain generic Studio OS.
- Pembuatan dan evolusi repositori Studio OS berada di bawah gerbang fase AS yang berlaku dan memerlukan otorisasi eksplisit dari Project Owner (*explicit Project Owner authorization*).
- Repositori Studio OS tetap berstatus privat; perubahan visibilitas (*public/private*), lisensi (*licensing*), dan strategi publikasi merupakan gerbang persetujuan manusia (*human approval gates*) yang diatur secara terpisah.

---

## 11. Independensi `lentera-blender-mcp`

- `lentera-blender-mcp` adalah repositori terpisah dan independen untuk control plane Blender.
- Repositori tersebut **TIDAK** dimiliki oleh `lentera-pudar` dan **TIDAK** diserap ke dalam repositori Studio OS.
- Integrasi antara Studio OS, Lentera Pudar, dan `lentera-blender-mcp` berlangsung melalui kontrak antarmuka dan adapter, tanpa peleburan kepemilikan repositori.

---

## 12. Urutan Batas Migrasi (*Migration Sequencing Boundary*)

Program AS menjalankan migrasi berpagar tanpa perubahan destruktif (*no big-bang migration*):

1. **AS1**: Menetapkan arsitektur semantik dan batas kepemilikan repositori (`ACCEPTED`);
2. **AS2**: Menginisialisasi repositori Studio OS dan paket fondasi kontrak (`ACCEPTED`);
3. **AS3**: Merefundasi implementasi Provider, Profile, Skill, dan Runtime pada Studio OS (`ACCEPTED`);
4. **AS4**: Mengimplementasikan registri kapabilitas, validasi runtime-tool, perencanaan control-plane, dan orkestrasi generic (`ACCEPTED`);
5. **AS5**: Mengintegrasikan repositori Lentera Pudar dengan Studio OS melalui sekuens berpagar: AS5-A0 (penutupan arsitektur) → AS5-G1 (batas paket privat) → AS5-G2 (kontrak generic Project/ProductionDomain/Artifact) → AS5-G3 (fondasi integrasi & siklus hidup Lentera) → AS5-G4 (binding & jembatan bukti operasional) → AS5-G5 (verifikasi siklus hidup produksi referensi & cutover);
6. **Pasca-AS5**: Struktur lokal lama hanya dipensiunkan/direfaktor setelah jalur pengganti yang terverifikasi telah beroperasi penuh dan diterima secara resmi.

---

## 13. Keputusan yang Ditunda (*Deferred Decisions & Non-Goals*)

Keputusan berikut secara eksplisit **DITUNDA** ke fase berikutnya:

- Skema fisik detail field-by-field JSON untuk Work Order, Trace, Handoff, dan Passport (dialokasikan pada AS5-G2/AS5-G3);
- Struktur direktori penyimpanan berkas siklus hidup pada disk (dialokasikan pada AS5-G3);
- Mekanisme teknis pengemasan privat Studio OS (dialokasikan pada AS5-G1);
- Detail implementasi adapter control-plane spesifik (dialokasikan pada AS5-G4);
- Pemilihan arsitektur atau mesin basis data eksternal;
- Format pertukaran data (*interchange*) Blender → Unreal (H1);
- Arsitektur teknis Unreal Engine berdasarkan evidence yang tersedia atau diusulkan pada saat H1 (H1/Domain 05);
- Fungsionalitas multi-game / 2D / portfolio tetap FUTURE dan hanya dapat diaktifkan melalui evidence kebutuhan serta governance dan Project Owner authorization yang berlaku.

---

## 14. Implikasi Verifikasi & Keberterimaan (*Verification & Acceptance*)

- Setiap klaim keberhasilan fase program AS wajib menyajikan bukti fisik terobservasi (*evidence-driven*).
- Evaluasi internal oleh pembuat (*maker self-check*) bukan verifikasi independen.
- Hak penerimaan fase (*external acceptance*) sepenuhnya berada di tangan Project Owner.

---

## 15. Dokumen Tata Kelola Terkait (*Related Canonical Governance*)

- [ADR-042 — Studio Semantic Architecture & Repository Boundary](adr/ADR-042-studio-semantic-and-repository-boundary.md)
- [ADR-043 — Studio Capability Registry & Control-Plane Architecture](adr/ADR-043-studio-capability-control-plane-architecture.md)
- [ADR-044 — Lentera–Studio Integration & Production Lifecycle Architecture](adr/ADR-044-lentera-studio-integration-production-lifecycle-architecture.md)
- [AI Studio Refoundation Plan](ai-studio-refoundation-plan.md)
- [Master Index](master-index.md)
- [Project Status](project-status.md)
