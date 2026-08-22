---
status: ACTIVE
type: GOVERNANCE
authority_scope: program.ai_studio_refoundation
canonical: true
owner: governance-team
last_reviewed: 2026-08-22
---

# AI Game Dev Studio Architecture Refoundation Plan — Lentera Pudar

> **Dokumen Otoritas Program (*Canonical Program & Governance Roadmap*)**
> Dokumen ini adalah otoritas kanonikal untuk program **AI Game Dev Studio Architecture Refoundation (AS)** pada semesta Lentera Pudar. Dokumen ini menetapkan urutan roadmap program AS, batas fase, dependensi sekuensial, penundaan Phase H1, serta batas pengaman (*guardrails*) tata kelola.

---

## 1. Tujuan, Otoritas & Ruang Lingkup (*Purpose, Authority & Scope*)

Dokumen ini memegang otoritas kanonikal (`authority_scope: program.ai_studio_refoundation`) untuk:

1. Menetapkan urutan kanonikal program refoundation arsitektur studio game AI;
2. Mendefinisikan batas fase (*phase boundaries*) dan kriteria progresi berpagar (*gated progression*);
3. Menetapkan penundaan Phase H1 (*H1 deferral*) hingga seluruh program AS selesai dan diterima secara eksternal;
4. Menjadi acuan rute tata kelola pasca-R8 (*post-R8 governance routing*);
5. Menegakkan prinsip keselamatan, batasan isolasi repository, dan integritas tata kelola proyek.

### Urutan Kelanjutan Kanonikal (*Canonical Continuation Order*)

```text
R8
→ AS0
→ AS-G0
→ AS1
→ AS2
→ AS3
→ AS4
→ AS5
→ AS6
→ AS7
→ AS8
→ H1
```

---

## 2. Prinsip Inti & Batasan Tata Kelola (*Core Principles & Guardrails*)

Seluruh perencanaan, pengusulan, dan eksekusi dalam program AS wajib mematuhi ketentuan berikut:

- **Lentera Pudar Tetap Sasaran Produk Utama**: Pengembangan game *Lentera Pudar — The First Spark* tetap merupakan sasaran akhir utama proyek. Inisiatif AI Game Dev Studio Architecture Refoundation (AS) hadir semata-mata untuk meningkatkan arsitektur produksi, kontinuitas, governabilitas, portabilitas, verifikasi, dan kapabilitas produksi studio game.
- **Status Dokumen Desain V3.1 & Future Studio Plan**: Target arsitektur beku V3.1 (*frozen V3.1 target architecture*) dan *Future Studio Plan* berstatus sebagai masukan desain (*design inputs*), bukan bukti implementasi aktif (*implementation evidence*). Semantik rinci Studio OS hanya menjadi kanonikal melalui pelaksanaan fase AS yang bersangkutan dan penerimaan eksternal resmi.
- **Batasan Eksplisit AS-G0**:
  - AS-G0 tidak mengimplementasikan Studio OS;
  - AS-G0 tidak membuat repository Studio OS baru;
  - AS-G0 tidak merefaktor `AGENTS.md` maupun direktori `.agents/`;
  - AS-G0 tidak memodifikasi implementasi MCP apa pun;
  - AS-G0 tidak memodifikasi perkakas Blender MCP;
  - AS-G0 tidak menginisialisasi Unreal Engine project;
  - AS-G0 tidak memulai Phase H1;
  - Program AS tidak menentukan keputusan format pertukaran data (*interchange*) Blender → Unreal sebelum Phase H1 dilaksanakan.
- **Invarian Keputusan Arsitektur & Otoritas**:
  - ADR-001 hingga ADR-004 tetap berlaku penuh dan tidak berubah, kecuali jika diubah secara terpisah melalui mekanisme formal Architecture Decision Record berstatus `ACCEPTED`;
  - Pembuatan repository, penamaan (*naming*), penetapan visibilitas (*visibility*), pemilihan lisensi (*licensing*), publikasi (*publication*), operasi Git destruktif, dan pemensiunan/penghapusan repository legacy tetap menjadi gerbang persetujuan manusia (*human approval gates*).
- **Protokol Progresi Berpagar (*Gated Progression Protocol*)**:
  - Setiap fase implementasi berpagar (*gated phase*) wajib menghasilkan bukti fisik (*evidence-driven*), melalui tinjauan independen (*independent review*), dan memperoleh penerimaan eksternal (*external acceptance*) dari Project Owner sebelum fase berikutnya dapat dibuka.
  - Prinsip kebenaran kapabilitas tetap berlaku: $\text{DOCUMENTED} \neq \text{IMPLEMENTED} \neq \text{AVAILABLE} \neq \text{EXECUTED} \neq \text{VERIFIED} \neq \text{ACCEPTED}$.

---

## 3. Definisi Fase Kanonikal Program AS (*Canonical Phase Definitions*)

### AS0 — Current Architecture Audit
- **Status Baseline**: `ACCEPTED`
- **Fokus & Lingkup**: Audit menyeluruh *read-only* atas baseline arsitektur repository saat ini, tata kelola refoundation R1–R8, kesiapan rantai perkakas MCP/DCC, serta penutupan arah desain target V3.1. Penerimaan AS0 adalah penutupan fase audit dan tidak mengimplikasikan bahwa Studio OS telah diimplementasikan.

### AS-G0 — Governance Activation
- **Status Baseline**: `ACCEPTED`
- **Fokus & Lingkup**: Aktivasi tata kelola kanonikal program AS di dalam repository Lentera Pudar, pencatatan urutan fase dan batas lingkup dalam dokumen ini, perutean tata kelola pasca-R8 pada [master-index.md](master-index.md), sinkronisasi [project-status.md](project-status.md), serta penundaan Phase H1 hingga AS8 diterima secara eksternal.

### AS1 — Studio Semantic Architecture & Repository Boundary
- **Status Baseline**: `ACCEPTED`
- **Fokus & Lingkup**: Perumusan formal arsitektur semantik Studio OS, batas modularitas, spesifikasi kontrak data/skema, arsitektur isolasi multi-repository, dan penyusunan spesifikasi teknis pada [ai-studio-semantic-architecture.md](ai-studio-semantic-architecture.md) serta [ADR-042](adr/ADR-042-studio-semantic-and-repository-boundary.md) sebelum inisialisasi kode.

### AS2 — Studio OS Genesis, Contracts & Extension Foundation
- **Status Baseline**: `ACCEPTED`
- **Fokus & Lingkup**: Inisialisasi repository mandiri Studio OS yang terisolasi, pembuatan paket fondasi kontrak, antarmuka ekstensi (*extension foundation*), dan struktur proyek inti berdasar persetujuan manusia atas nama dan lisensi repository.

### AS3 — Provider, Profile, Skill & Runtime Refoundation
- **Status Baseline**: `ACCEPTED` (Kontrak semantik Provider/Profile/Skill/Runtime dan fondasi komposisi runtime deterministik telah diimplementasikan, diverifikasi secara independen pada tahap kandidat dan pasca-merge, serta diterima secara eksternal oleh Project Owner; penerimaan AS3 tidak mengotorisasi implementasi AS4.)
- **Fokus & Lingkup**: Abstraksi layer multi-provider AI, spesifikasi profil agen peran teknis, isolasi runtime eksekusi, dan refoundasi mekanisme integrasi skill lokal.

### AS4 — Capability Registry & Control-Plane Integration
- **Status Baseline**: `ACCEPTED` (Penutupan arsitektur AS4-A0 serta seluruh gerbang implementasi berpagar AS4-G1 s.d. AS4-G4 telah diselesaikan secara sekuensial; fondasi kontrak capability/tool/control-plane, registri dan evaluasi kapabilitas fail-closed berbasis bukti, validasi runtime-tool dan perencanaan control-plane deterministik, serta batas orkestrasi generic dengan adapter terinjeksi telah diverifikasi secara independen pada tahap kandidat dan pasca-merge serta diterima secara eksternal oleh Project Owner; penerimaan AS4 tidak mengotorisasi implementasi AS5.)
- **Fokus & Lingkup**: Registri kapabilitas multi-dimensi, penegakan kontrak perkakas/MCP, orkestrasi control-plane generic, evaluasi kapabilitas fail-closed berbasis bukti, dan validasi runtime tools.
- **Dekomposisi Gerbang Terbuka & Batas Otorisasi (*Approved Gated Decomposition*)**:
  - `AS4-A0 — Capability & Control-Plane Architecture Closure`: Penutupan arsitektur tata kelola kanonikal kapabilitas dan control-plane pada [ADR-043](adr/ADR-043-studio-capability-control-plane-architecture.md) dan [ai-studio-semantic-architecture.md](ai-studio-semantic-architecture.md). Tidak mengotorisasi maupun memulai implementasi AS4-G1.
  - `AS4-G1 — Capability / Tool / Control-Plane Contract Foundation`: Fondasi kontrak statis, skema JSON, tipe data, validator, dan pengujian untuk `CapabilityDescriptor`, `ToolDescriptor`, `ControlPlaneDescriptor`, `OperationalEvidence`, dan `CapabilityAssessment`. Tanpa registri, tanpa evaluator, tanpa eksekusi.
  - `AS4-G2 — Registries & Evidence-Backed Capability Evaluation`: Implementasi `CapabilityRegistry`, `ToolRegistry`, `ControlPlaneRegistry`, dan evaluator `CapabilityAssessment` deterministik berbasis bukti dengan semantik fail-closed. Tanpa dispatch, tanpa jaringan, tanpa integrasi Lentera.
  - `AS4-G3 — Runtime-Tool Validation & Control-Plane Planning`: Validasi kompatibilitas runtime-tool dan produksi deterministik `ControlPlanePlan`. Tanpa eksekusi.
  - `AS4-G4 — Generic Control-Plane Orchestration Boundary`: Batas orkestrasi generic dengan adapter terinjeksi (`ControlPlaneAdapter`) dan semantik `ExecutionReceipt`. Tanpa binding spesifik Lentera, Blender, atau Unreal.
- **Aturan Transisi & Pembatasan Otorisasi**:
  - Urutan gerbang: `AS4-A0 → AS4-G1 → AS4-G2 → AS4-G3 → AS4-G4`.
  - Seluruh sekuens gerbang implementasi berpagar AS4-A0 hingga AS4-G4 telah selesai dieksekusi berdasarkan otorisasi terpisah dan eksplisit, diverifikasi secara independen, dan diterima secara eksternal oleh Project Owner.
  - Penerimaan AS4-A0 **TIDAK** mengotorisasi atau memulai implementasi AS4-G1; penerimaan AS4-G1 **TIDAK** otomatis mengotorisasi AS4-G2, dan pemisahan yang sama berlaku hingga AS4-G4.
  - Pasca-penutupan AS4, AS5 berstatus `NOT_STARTED` dan menjadi gerbang tata kelola berikutnya (*NEXT governance gate*); AS6–AS8 tetap `NOT_STARTED`; Phase H1 tetap `NOT_STARTED` dan terblokir (*BLOCKED*) hingga AS8 diterima secara eksternal.

### AS5 — Lentera Pudar Integration & Production Lifecycle
- **Status Baseline**: `NOT_STARTED` (Sub-gate progression: AS5-A0, AS5-G1, dan AS5-G2 berstatus `ACCEPTED`; AS5-G3 menjadi gerbang tata kelola berikutnya (*NEXT governance gate*), berstatus `NOT_STARTED`, dan implementasinya belum dimulai serta memerlukan otorisasi eksplisit terpisah dari Project Owner dan Work Order implementasi berbatas; AS5-G4 s.d. AS5-G5 tetap `NOT_STARTED`.)
- **Fokus & Lingkup**: Integrasi repositori Lentera Pudar dengan control-plane Studio OS, standardisasi siklus hidup aset produksi, dan penegakan gerbang SOP produksi (3D, Audio, Narrative, Gameplay).
- **Dekomposisi Gerbang Terbuka & Batas Otorisasi (*Approved Gated Decomposition*)**:
  - `AS5-A0 — Lentera–Studio Integration & Production Lifecycle Architecture Closure`: `ACCEPTED` (Penutupan arsitektur tata kelola kanonikal pada [ADR-044](adr/ADR-044-lentera-studio-integration-production-lifecycle-architecture.md) dan [ai-studio-semantic-architecture.md](ai-studio-semantic-architecture.md). Tata kelola/kanon saja. Tidak mengotorisasi maupun memulai implementasi AS5-G1).
  - `AS5-G1 — Studio OS Consumable Private Package Boundary`: `ACCEPTED` (Batas pengemasan dan konsumsi paket privat Studio OS yang aman pada `adityaairlangga12/ai-game-dev-studio-os` telah diselesaikan di bawah otorisasi terpisah, diverifikasi secara independen pada tahap kandidat dan pasca-merge, serta diterima secara eksternal oleh Project Owner; tanpa kontrak semantik baru; tanpa logika spesifik Lentera; penerimaan AS5-G1 tidak mengotorisasi implementasi AS5-G2).
  - `AS5-G2 — Generic Project / ProductionDomain / Artifact Contract Foundation`: `ACCEPTED` (Fondasi kontrak, skema, dan validator generic `Project`, `ProductionDomain`, dan `Artifact` pada Studio OS `adityaairlangga12/ai-game-dev-studio-os` telah diselesaikan di bawah otorisasi terpisah, diverifikasi secara independen pada tahap kandidat dan pasca-merge, serta diterima secara eksternal oleh Project Owner; tanpa konfigurasi Lentera; tanpa eksekusi proyek; penerimaan AS5-G2 tidak mengotorisasi implementasi AS5-G3).
  - `AS5-G3 — Lentera Project Integration & Production Lifecycle Foundation`: `NOT_STARTED; NEXT governance gate` (Mengimplementasikan deskriptor/konfigurasi proyek, perutean domain, dan fondasi rekam jejak siklus hidup berbasis berkas lokal proyek di `adityaairlangga12/lentera-pudar`; implementasi belum dimulai dan TIDAK diotorisasi oleh tata kelola ini; memerlukan otorisasi eksplisit terpisah dari Project Owner dan Work Order implementasi berbatas; tanpa eksekusi control-plane eksternal; tanpa dispatch Blender/Unreal).
  - `AS5-G4 — Lentera Control-Plane Binding & Operational Evidence Bridge`: `NOT_STARTED` (Mengintegrasikan binding konfigurasi proyek dengan perencanaan/orkestrasi Studio OS dan jembatan bukti operasional eksplisit di `adityaairlangga12/lentera-pudar`. Tanpa Unreal/H1; eksekusi Blender memerlukan bukti operasional dan otorisasi terpisah).
  - `AS5-G5 — Reference Production Lifecycle Verification & Integration Cutover`: `NOT_STARTED` (Verifikasi minimal satu siklus hidup proyek referensi representatif dari intent hingga bukti dan verifikasi independen sebelum memensiunkan struktur lama di `adityaairlangga12/lentera-pudar`. Tanpa H1; tanpa klaim kesiapan Unreal; tanpa penghapusan otomatis struktur legacy).
- **Aturan Transisi & Pembatasan Otorisasi**:
  - Urutan gerbang: `AS5-A0 → AS5-G1 → AS5-G2 → AS5-G3 → AS5-G4 → AS5-G5`.
  - AS5-A0, AS5-G1, dan AS5-G2 telah selesai dan berstatus `ACCEPTED`; AS5-G3 menjadi gerbang tata kelola berikutnya (*NEXT governance gate*), berstatus `NOT_STARTED`, dan `TIDAK DIOTORISASI` untuk implementasi oleh penerimaan G2; gerbang AS5-G4 s.d. AS5-G5 tetap `NOT_STARTED` dan belum diotorisasi.
  - Setiap gerbang implementasi memerlukan otorisasi eksplisit terpisah dari Project Owner, Work Order berbatas yang aktif, eksekusi Maker, verifikasi independen Verifier, dan penerimaan Project Owner.
  - Pasca-penerimaan AS5-G2, implementasi AS5-G3 tetap `NOT_STARTED`; AS6–AS8 tetap `NOT_STARTED`; Phase H1 tetap `NOT_STARTED` dan terblokir (*BLOCKED*) hingga AS8 diterima secara eksternal dan project status membukanya secara terpisah.

### AS6 — Reliability, Security, Recovery & Commercial Hardening
- **Status Baseline**: `NOT_STARTED`
- **Fokus & Lingkup**: Pengujian keandalan sistem, mekanisme isolasi keamanan dan batas kredensial, verifikasi prosedur pemulihan (*backup & recovery*), serta *commercial hardening*.

### AS7 — Cross-Repository & Cross-Domain Consistency Audit
- **Status Baseline**: `NOT_STARTED`
- **Fokus & Lingkup**: Audit konsistensi silang komprehensif antara repositori Studio OS dan repositori Lentera Pudar, validasi integritas skema data bersama, dan verifikasi invariant multi-repository.

### AS8 — Independent Studio Architecture Verification
- **Status Baseline**: `NOT_STARTED`
- **Fokus & Lingkup**: Verifikasi arsitektur independen menyeluruh, evaluasi checklist kriteria keberterimaan program AS, audit bukti fisik, dan penutupan formal program AS sebelum mengotorisasi fase runtime game engine.

### H1 — Unreal Pipeline Readiness Audit
- **Status Baseline**: `NOT_STARTED` (Terblokir hingga AS8 diterima secara eksternal dan status proyek kanonikal secara terpisah membuka H1)
- **Fokus & Lingkup**: Audit kesiapan fisik pipeline Unreal Engine 5, verifikasi runtime/installation/project state, audit arsitektur teknis Unreal yang tersedia atau diusulkan berdasarkan evidence pada saat H1, serta evaluasi kesiapan pipeline aset/DCC berdasarkan evidence yang diamati selama H1.

---

## 4. Navigasi & Hubungan Tata Kelola (*Governance Relationships*)

- **Peta Navigasi Global**: [master-index.md](master-index.md) mengintegrasikan dokumen ini sebagai otoritas tunggal untuk `program.ai_studio_refoundation`.
- **Pelaporan Status Proyek**: [project-status.md](project-status.md) merefleksikan status fisik, status fase AS, dan daftar blocker aktif sesuai dokumen ini.
- **Rencana Genesis Repository**: [repository-genesis-plan.md](repository-genesis-plan.md) tetap menjadi otoritas historis dan checklist verifikasi untuk transisi R7/R8.
