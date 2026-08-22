---
id: ADR-044
status: ACCEPTED
type: DECISION_RECORD
authority_scope: architecture.studio_integration_production_lifecycle
canonical: true
owner: architecture-governance
decision_date: 2026-08-22
last_reviewed: 2026-08-22
supersedes: []
superseded_by: null
---

# ADR-044 — Lentera–Studio Integration & Production Lifecycle Architecture

## Context

Setelah penutupan arsitektur semantik Studio OS (ADR-042 / AS1), fondasi genesis dan kontrak (AS2), refoundasi Provider/Profile/Skill/Runtime (AS3), serta penutupan tata kelola dan implementasi kapabilitas/control-plane generic (ADR-043 / AS4), sistem memerlukan penutupan arsitektur kanonikal untuk mendefinisikan bagaimana proyek game *Lentera Pudar* mengonsumsi fondasi Studio OS dan mengelola siklus hidup produksi (*production lifecycle*).

Sebelumnya, mekanisme integrasi Lentera–Studio dan arsitektur siklus hidup produksi ditunda (*deferred*) pada ADR-042 dan ADR-043. Tanpa penegakan keputusan arsitektural kanonikal:
1. Proyek game dapat secara keliru mengimpor atau memodifikasi kode inti Studio OS secara langsung (*bidirectional coupling*), merusak arah dependensi satu arah;
2. Hasil eksekusi adapter atau tanda terima eksekusi (`ExecutionReceipt`) dapat disalahartikan sebagai verifikasi otomatis, asesmen kapabilitas, atau penerimaan artefak/tata kelola proyek;
3. Struktur pelacakan kerja (Work Order, Trace, Handoff, Passport) dapat tercampuradukkan dengan deliverable fisik atau memaksakan ketergantungan database eksternal yang prematur;
4. Implementasi teknis integrasi (AS5-G1 s.d. AS5-G5) dapat dimulai tanpa dekomposisi gerbang bertahap yang terkendali;
5. Batas isolasi Phase H1 dan independensi repositori eksternal (*lentera-blender-mcp*, Unreal Engine) dapat terancam.

## Decision

### 1. Arah Dependensi Satu Arah (*One-Way Dependency Direction*)

Menetapkan arah dependensi konseptual kanonikal:

```text
Studio OS Generic Contracts / Runtime / Control Plane
                         ↓
            Project Integration / Adapter Layer
                         ↓
                    Lentera Pudar
```

- **Aliran Satu Arah**: Repositori `lentera-pudar` mengonsumsi kontrak generic, runtime composition, dan orkestrasi control plane generic dari Studio OS melalui lapisan integrasi/adapter proyek.
- **Larangan Keras Dependensi Terbalik**: Inti generic Studio OS **DILARANG KERAS** memiliki dependensi balik terhadap konfigurasi spesifik Lentera Pudar, aset game, kanon naratif/gameplay, maupun state siklus hidup proyek Lentera Pudar.

### 2. Batas Kepemilikan Repositori (*Repository Ownership Boundary*)

Menegaskan batas kepemilikan repositori secara tegas tanpa ada pengalihan kepemilikan (*no repository ownership transfer*):

- **`adityaairlangga12/ai-game-dev-studio-os`** memiliki:
  - Kontrak generic (*generic contracts*);
  - Skema generic (*generic schemas*);
  - Registri generic (*generic registries*);
  - Validator generic (*generic validators*);
  - Komposisi runtime generic (*generic runtime composition*);
  - Evaluasi kapabilitas generic (*generic capability assessment*);
  - Perencanaan control-plane generic (*generic planning*);
  - Orkestrasi generic (*generic orchestration*);
  - Abstraksi ekstensi dan runtime generic yang dapat digunakan ulang.
- **`adityaairlangga12/lentera-pudar`** memiliki:
  - Konfigurasi integrasi spesifik proyek (*project-specific integration configuration*);
  - Binding spesifik proyek (*project-specific bindings*);
  - Penggunaan produksi (*production usage*);
  - Observasi dan bukti operasional proyek (*project operational observations/evidence*);
  - Rekam jejak kerja: *Work Orders*, *Traces*, *Handoffs*, dan *Passports*;
  - State siklus hidup artefak (*artifact lifecycle state*);
  - Rekam verifikasi proyek (*project verification records*);
  - Otoritas keberterimaan dan tata kelola siklus hidup proyek (*project acceptance/lifecycle authority*).
- **`lentera-blender-mcp`** tetap independen dan memiliki:
  - Implementasi server/control-plane spesifik Blender;
  - Tooling dan skrip internal Blender;
  - Implementasi eksekusi JSON-RPC/MCP Blender.

### 3. Batas Konsumen Paket Privat (*Private Consumer Boundary*)

- Integrasi Lentera Pudar dengan Studio OS mensyaratkan batas pengemasan konsumen privat (*durable private consumer boundary*) dari Studio OS ke integrasi proyek sebelum implementasi Lentera dapat bergantung pada Studio OS.
- ADR ini **TIDAK MENGIMPLEMENTASIKAN** batas pengemasan tersebut. Implementasi batas pengemasan dialokasikan pada gerbang **AS5-G1**.
- **Batasan Mutlak**:
  - Repositori Studio OS tetap bersifat privat kecuali disetujui secara terpisah;
  - Tidak ada publikasi paket publik (*public registry publication*) yang diimplikasikan;
  - Tidak ada perubahan visibilitas (*visibility*) atau lisensi (*license*) yang diimplikasikan;
  - Pengemasan konsumen bukan logika spesifik proyek;
  - Path absolut host spesifik mesin **DILARANG KERAS** dijadikan semantik paket yang dapat dipindahkan (*portable package semantics*).

### 4. Fondasi Kontrak Generic Project / ProductionDomain / Artifact

- Entitas semantik kanonikal: `Project`, `ProductionDomain`, dan `Artifact` mensyaratkan dukungan kontrak/skema generic di Studio OS sebelum instansiasi spesifik proyek diintegrasikan ke Lentera Pudar.
- Kontrak generic dimiliki oleh Studio OS; instansiasi, konfigurasi, dan rekam jejak siklus hidup spesifik Lentera dimiliki oleh `lentera-pudar`.
- Implementasi kontrak generic ini dialokasikan pada gerbang **AS5-G2**. ADR ini tidak menambahkan kode maupun skema fisik.

### 5. Pemisahan Empat Bidang Siklus Hidup Produksi (*Four-Plane Lifecycle Separation*)

Menetapkan pemisahan formal empat bidang (*planes*) konseptual:

```text
+-------------------------------------------------------------+
| A. DECLARATION / CONFIGURATION PLANE                        |
|    - Deskriptor/konfigurasi proyek                          |
|    - Pemetaan production-domain                             |
|    - Deklarasi artefak & kebutuhan kapabilitas/runtime      |
+-------------------------------------------------------------+
                              ↓
+-------------------------------------------------------------+
| B. EXECUTION PLANE                                          |
|    - RuntimeCompositionPlan & ControlPlanePlan              |
|    - ControlPlaneOrchestrator & Injected ControlPlaneAdapter|
|    - ExecutionReceipt                                       |
+-------------------------------------------------------------+
                              ↓
+-------------------------------------------------------------+
| C. EVIDENCE / VERIFICATION PLANE                            |
|    - Observasi proyek aktual & OperationalEvidence eksplisit|
|    - Verifikasi sesuai domain (6-DoD, test log, link-check) |
|    - Bukti independen terobservasi                          |
+-------------------------------------------------------------+
                              ↓
+-------------------------------------------------------------+
| D. LIFECYCLE / ACCEPTANCE PLANE                             |
|    - Otorisasi bounded Work Order                           |
|    - Status siklus hidup artefak (Draft -> Verified -> Acc) |
|    - Trace, Handoff, Passport                               |
|    - Penerimaan Project Owner / verifikasi manusia          |
|    - Keputusan stage-gate kanonikal proyek                  |
+-------------------------------------------------------------+
```

**Invarian Wajib Empat Bidang**:
$$\text{Execution} \neq \text{Verification} \neq \text{Acceptance}$$
$$\text{ExecutionReceipt} \neq \text{OperationalEvidence}$$
$$\text{ExecutionReceipt} \neq \text{CapabilityAssessment}$$
$$\text{ExecutionReceipt} \neq \text{Verification}$$
$$\text{Artifact} \neq \text{File}$$
$$\text{Artifact acceptance} \neq \text{canon acceptance}$$
$$\text{Host capability} \neq \text{project capability}$$

Hasil eksekusi adapter yang berhasil (`ExecutionReceipt`) **DILARANG KERAS** memajukan status artefak, status verifikasi, stage-gate produksi, atau status siklus hidup proyek secara otomatis.

### 6. Persistensi Siklus Hidup Berbasis Berkas Lokal Proyek (*Project-Local File-Backed Persistence*)

- Menetapkan rekaman siklus hidup berbasis berkas lokal proyek yang terlacak pada sistem kendali versi Git (*project-local, version-controlled, file-backed lifecycle records*) sebagai baseline arsitektur AS5.
- **Rasional**:
  1. *Reviewability*: Mudah ditinjau melalui pull request dan mekanisme diff standar;
  2. *Git Provenance*: Jejak audit, komit, dan riwayat terikat langsung ke revisi repositori;
  3. *Portability*: Tidak memerlukan infrastruktur server basis data eksternal yang kompleks;
  4. *Deterministic Diffability*: Perubahan status dapat diverifikasi secara deterministik;
  5. *Correct Ownership*: Mempertahankan kepemilikan data siklus hidup di tangan proyek Lentera Pudar tanpa dependensi basis data sentral Studio OS.
- Invarian: $\text{Artifact} \neq \text{File}$ tetap berlaku penuh; satu artefak logis dapat merujuk pada beberapa file fisik atau struktur direktori.
- ADR ini **TIDAK** memutuskan arsitektur basis data eksternal dan **TIDAK** mengimplementasikan file siklus hidup fisik pada fase A0.

### 7. Tanggung Jawab Semantik Work Order, Trace, Handoff, dan Passport

Menetapkan batas tanggung jawab entitas siklus hidup konseptual tanpa mengunci skema fisik prematur:

- **Work Order**:
  - Kontrak otorisasi eksekusi berbatas (*bounded execution authorization*);
  - Mendefinisikan repositori, workspace, dan lingkup jalur yang diizinkan/dilarang;
  - Menetapkan kriteria keberterimaan (*acceptance criteria*) dan bukti yang disyaratkan.
- **Trace**:
  - Rekam jejak eksekusi dan provenansi (*execution and provenance record*) yang terikat pada Work Order;
  - Mencatat konteks eksekusi dan hasil observasi aktual;
  - Keberadaan Trace tidak sama dengan verifikasi atau penerimaan.
- **Handoff**:
  - Rekam transfer formal tanggung jawab kerja antar-domain produksi atau peran;
  - Mensyaratkan status artefak hulu dan bukti yang sesuai dengan prasyarat handoff;
  - Handoff tidak menciptakan penerimaan hilir secara otomatis.
- **Passport**:
  - Ringkasan portabel milik proyek yang mencatat identitas artefak, provenansi, referensi verifikasi/penerimaan, dan konteks siklus hidup yang relevan;
  - Invarian mutlak: $\text{Passport} \neq \text{Artifact}$ dan $\text{Passport existence} \neq \text{Artifact acceptance}$.

ADR ini **DILARANG KERAS** mengarang layout field JSON implementasi lengkap pada fase AS5-A0.

### 8. Jembatan Bukti & Evaluasi Kapabilitas (*Evidence Bridge*)

- `ExecutionReceipt` dapat dirujuk sebagai masukan bukti eksekusi/provenansi, tetapi **DILARANG KERAS** ditransformasikan secara otomatis menjadi:
  - `VERIFIED`;
  - `ACCEPTED`;
  - `CapabilityAssessment = AVAILABLE`;
  - Penerimaan artefak;
  - Penyelesaian proyek.
- Bukti operasional (`OperationalEvidence`) wajib tetap eksplisit, terikat lingkup lingkungan (*environment-scoped*), dan terikat waktu (*time-bound*) sesuai ADR-043.
- Evaluasi kapabilitas wajib tetap **FAIL CLOSED**.

### 9. Perutean Domain Produksi (*Production Domain Routing*)

- Integrasi siklus hidup produksi wajib merujuk dan merutekan ke otoritas kanonikal domain yang ada (Domain 01–04) serta kerangka QA/SOP (Domain 06), bukan menduplikasi spesifikasi domain.
- AS5 mendukung domain produksi meliputi:
  - 3D Art (`references/04-art-3d/`);
  - Audio (`references/06-pipeline-qc/sop-workflow.md#sop-7-menambahkan-audio-baru-musik-layerbisikansfx`);
  - Narrative (`references/03-narrative/`);
  - Gameplay (`references/02-gameplay/`);
  - QA/QC (`references/06-pipeline-qc/qa-qc-framework.md`).
- Menegakkan invarian: $\text{Production Domain} \neq \text{Role}$.
- Verifikasi teknis tidak menggantikan penilaian kreatif/manusia pada domain yang mensyaratkan validasi emosional atau pertimbangan estetika.

### 10. Batas Isolasi Blender (*Blender Boundary*)

- Snapshot historis/saat ini dari Blender 5.2 LTS dan `lentera-blender-mcp` tidak membuktikan kapabilitas otomatis pada waktu eksekusi di masa mendatang.
- Setiap integrasi produksi Blender di masa depan wajib mereakuisisi bukti operasional terkini yang terikat lingkungan (*current environment-scoped operational evidence*).
- `lentera-blender-mcp` tetap menjadi repositori terpisah dan mandiri.
- Repositori `lentera-pudar` memiliki konfigurasi sisi-proyek, konteks pemanggilan produksi, bukti operasional, dan rekam siklus hidup.
- Implementasi server Blender **DILARANG** disalin (*copied*) ke dalam Lentera Pudar.
- **Tidak ada eksekusi Blender yang diotorisasi oleh ADR-044 maupun AS5-A0.**

### 11. Perlindungan Mutlak Batas Unreal Engine & Phase H1 (*Unreal / H1 Firewall*)

ADR-044 dan seluruh gerbang implementasi AS5 **DILARANG KERAS**:
1. Menginisialisasi proyek Unreal Engine semata-mata untuk memuaskan AS5;
2. Menentukan format pertukaran data (*interchange*) final Blender → Unreal;
3. Membuat implementasi Unreal MCP;
4. Mengklaim ketersediaan runtime Unreal Engine;
5. Menjalankan Phase H1;
6. Membuka Domain 05;
7. Mengklaim kesiapan produksi Unreal Engine.

Keputusan arsitektur teknis Unreal dan format pertukaran data final Blender → Unreal tetap menjadi keputusan Phase H1 berdasarkan bukti fisik pada saat H1.

Phase H1 tetap **TERBLOKIR (*BLOCKED*)** hingga memenuhi dua syarat kumulatif:
1. Phase AS8 telah diterima secara eksternal (*externally accepted*) oleh Project Owner; **DAN**
2. Dokumen [project-status.md](../project-status.md) secara kanonikal dan terpisah membuka Phase H1.

### 12. Keamanan Transisi & Perlindungan Aset Legacy (`.agents/** Cutover Safety`)

- Struktur direktori `.agents/**` pada repositori Lentera Pudar tetap berstatus sebagai spesifikasi terdokumentasi lokal proyek (*project-local documented specifications*).
- Dilarang memensiunkan, memigrasikan, menghapus, atau menulis ulang jalur lokal/legacy hanya karena pengganti AS5 telah diusulkan.
- Struktur lokal lama hanya boleh dipensiunkan/direfaktor setelah jalur pengganti memenuhi seluruh rantai:
  $$\text{IMPLEMENTED} \longrightarrow \text{AVAILABLE} \longrightarrow \text{EXECUTED} \longrightarrow \text{VERIFIED} \longrightarrow \text{ACCEPTED}$$
- Tidak ada perombakan serentak destruktif (*no big-bang migration*).

### 13. Dekomposisi Gerbang AS5 yang Disetujui (*Approved AS5 Gated Decomposition*)

Menetapkan urutan kanonikal enam gerbang terisolasi untuk Phase AS5:

```text
AS5-A0 — Lentera–Studio Integration & Production Lifecycle Architecture Closure
         (Tata kelola & kanon arsitektur saja; tanpa implementasi)
   ↓
AS5-G1 — Studio OS Consumable Private Package Boundary
         (Repositori: ai-game-dev-studio-os; batas pengemasan/konsumen privat saja)
   ↓
AS5-G2 — Generic Project / ProductionDomain / Artifact Contract Foundation
         (Repositori: ai-game-dev-studio-os; kontrak/skema generic; tanpa ID Lentera)
   ↓
AS5-G3 — Lentera Project Integration & Production Lifecycle Foundation
         (Repositori: lentera-pudar; deskriptor proyek, perutean domain, fondasi rekam siklus hidup)
   ↓
AS5-G4 — Lentera Control-Plane Binding & Operational Evidence Bridge
         (Repositori utama: lentera-pudar; binding proyek, jembatan bukti operasional)
   ↓
AS5-G5 — Reference Production Lifecycle Verification & Integration Cutover
         (Verifikasi siklus hidup produksi referensi end-to-end terisolasi sebelum cutover)
```

- **Rincian Peran & Batasan Gerbang**:
  - `AS5-A0`: Penutupan arsitektur tata kelola kanonikal (ADR-044). Tidak mengotorisasi implementasi AS5-G1.
  - `AS5-G1`: Membuat paket Studio OS dapat dikonsumsi secara aman sebagai dependensi privat proyek di `ai-game-dev-studio-os`. Tanpa kontrak semantik baru; tanpa logika spesifik Lentera.
  - `AS5-G2`: Menambahkan kontrak/skema/validator generic `Project`, `ProductionDomain`, `Artifact` di `ai-game-dev-studio-os`. Tanpa konfigurasi Lentera; tanpa eksekusi proyek.
  - `AS5-G3`: Mengimplementasikan deskriptor/konfigurasi proyek, perutean domain, dan fondasi rekam siklus hidup di `lentera-pudar`. Tanpa eksekusi control-plane eksternal; tanpa dispatch Blender/Unreal.
  - `AS5-G4`: Mengintegrasikan binding proyek dengan batas perencanaan dan orkestrasi Studio OS serta jembatan bukti operasional eksplisit di `lentera-pudar`. Tanpa Unreal/H1; eksekusi Blender memerlukan otorisasi dan bukti operasional terpisah.
  - `AS5-G5`: Memverifikasi minimal satu siklus hidup proyek referensi representatif dari intent hingga bukti dan verifikasi independen sebelum memensiunkan struktur lama. Tanpa klaim kesiapan Unreal; tanpa penghapusan otomatis struktur legacy.
- Pasca-AS5-G5, penutupan lengkap Phase AS5 tetap memerlukan verifikasi independen dan penerimaan eksternal formal dari Project Owner.

### 14. Aturan Pemisahan Otorisasi Gerbang (*Gate Authorization Rule*)

Menegaskan aturan keselamatan gerbang:
- Penerimaan AS5-A0 **TIDAK MENGOTORISASI** implementasi AS5-G1;
- Penerimaan AS5-G1 **TIDAK MENGOTORISASI** implementasi AS5-G2;
- Aturan pemisahan yang sama berlaku ketat hingga AS5-G5.
- Kelayakan tata kelola (*NEXT / eligible*) $\neq$ otorisasi eksekusi implementasi.
- Setiap gerbang implementasi mewajibkan:
  1. Otorisasi eksplisit terpisah dari Project Owner;
  2. Work Order berbatas yang aktif;
  3. Eksekusi oleh Maker;
  4. Verifikasi independen oleh Verifier;
  5. Penerimaan formal oleh Project Owner.

## Consequences

- Arsitektur integrasi Lentera Pudar dengan Studio OS dan siklus hidup produksi memiliki acuan kanonikal yang kokoh;
- Batas kepemilikan repositori, arah dependensi, dan independensi repositori pendukung tetap terlindungi;
- Status fase AS5 tetap `NOT_STARTED` pada tingkat implementasi hingga gerbang AS5-G1 diotorisasi secara terpisah;
- Phase H1 tetap terisolasi dan terblokir secara aman hingga AS8 diterima secara eksternal.

## Non-Decisions / Deferred Decisions

Keputusan berikut secara eksplisit **DITUNDA** dan tidak diputuskan dalam ADR ini:
- Skema fisik detail field-by-field JSON untuk Work Order, Trace, Handoff, dan Passport (dialokasikan pada AS5-G2/AS5-G3);
- Struktur direktori penyimpanan berkas siklus hidup pada disk (dialokasikan pada AS5-G3);
- Mekanisme teknis pengemasan privat Studio OS (dialokasikan pada AS5-G1);
- Detail implementasi adapter control-plane spesifik (dialokasikan pada AS5-G4);
- Pemilihan arsitektur atau mesin basis data eksternal;
- Format pertukaran data final Blender → Unreal (H1);
- Arsitektur teknis Unreal Engine (H1/Domain 05);
- Keputusan kesiapan Phase H1;
- Implementasi hardening AS6, audit AS7, dan verifikasi AS8.

## Related Documents

- [Master Index](../master-index.md)
- [Project Status](../project-status.md)
- [ADR Register](README.md)
- [ADR-004 — Scope-Based Authority, Capability Truth & Verification Governance](ADR-004-scope-authority-capability-truth-verification-governance.md)
- [ADR-042 — Studio Semantic Architecture & Repository Boundary](ADR-042-studio-semantic-and-repository-boundary.md)
- [ADR-043 — Studio Capability Registry & Control-Plane Architecture](ADR-043-studio-capability-control-plane-architecture.md)
- [AI Studio Semantic Architecture](../ai-studio-semantic-architecture.md)
- [AI Studio Refoundation Plan](../ai-studio-refoundation-plan.md)
- [QA/QC Framework](../../06-pipeline-qc/qa-qc-framework.md)
- [SOP Workflow](../../06-pipeline-qc/sop-workflow.md)
