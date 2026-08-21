---
id: ADR-043
status: ACCEPTED
type: DECISION_RECORD
authority_scope: architecture.studio_capability_control_plane
canonical: true
owner: architecture-governance
decision_date: 2026-08-20
last_reviewed: 2026-08-20
supersedes: []
superseded_by: null
---

# ADR-043 — Studio Capability Registry & Control-Plane Architecture

## Context

Pada arsitektur Studio OS pasca-AS1 (model semantik & batas repositori), AS2 (fondasi genesis & kontrak), dan AS3 (Provider, Profile, Skill, serta RuntimeCompositionPlan deterministik), sistem memerlukan fondasi arsitektural untuk mengelola kapabilitas (*capabilities*), perkakas eksekusi (*tools*), dan antarmuka control-plane tanpa mencampuradukkan deklarasi statis dengan ketersediaan operasional riil atau eksekusi.

Tanpa penegakan arsitektur formal:
1. Deklarasi statis atau registrasi tool dapat disalahartikan sebagai bukti ketersediaan server atau keberhasilan implementasi handler;
2. Identitas paket/deskriptor dapat disamakan dengan identitas entitas semantik;
3. Ketiadaan bukti operasional dapat diabaikan dan menghasilkan asumsi ketersediaan palsu (*false positive availability*);
4. Rencana komposisi runtime dapat langsung memicu eksekusi tanpa perencanaan control-plane yang aman dan deterministik;
5. Orchestration logic generic dapat tercemar oleh konfigurasi spesifik proyek (*Lentera Pudar*), toolchain spesifik (*Blender*), atau engine spesifik (*Unreal*).

## Decision

### 1. Deklarasi Bukan Bukti Operasional (*Declaration != Operational Evidence*)

Menetapkan pemisahan mutlak antara deklarasi statis (*static descriptors*) dan bukti operasional (*operational evidence*):

- **Entitas Deklarasi Statis**:
  - `CapabilityDescriptor`: Mendeklarasikan identitas kapabilitas, kontrak semantik, relasi, prasyarat, dan metadata deskriptif.
  - `ToolDescriptor`: Mendeklarasikan identitas tool, skema parameter/return, kapabilitas yang didukung, dan metadata antarmuka callable.
  - `ControlPlaneDescriptor`: Mendeklarasikan endpoint logis, tipe adapter yang dibutuhkan, dan kapabilitas control-plane.
- **Batasan Mutlak**: Deskriptor statis **DILARANG KERAS** memuat atau dianggap sebagai bukti bahwa:
  - handler telah terimplementasi;
  - server/service aktif dan tersedia;
  - aksi telah dieksekusi;
  - output telah diverifikasi;
  - kapabilitas efektif berstatus `AVAILABLE`.
- Dilarang menetapkan arsitektur di mana deklarasi statis memuat asersi operasional permanen yang setara dengan `available: true`, `verified: true`, atau `works: true`.

$$\text{Descriptor Existence} \neq \text{Operational Evidence}$$

### 2. Kapabilitas Bukan Perkakas (*Capability != Tool*)

- **Capability**: Kemampuan terbukti (*evidence-backed ability*) untuk menjalankan kelas aksi tertentu di bawah batasan dan kondisi lingkungan yang dinyatakan.
- **Tool**: Permukaan antarmuka (*interface surface*) atau operasi callable yang diekspos ke runtime.
- Keberadaan registrasi tool **TIDAK OTOMATIS** menghasilkan $\text{Effective Capability} = \text{AVAILABLE}$.
- Menegakkan invarian berjenjang:

$$\text{Capability} \neq \text{Tool}$$
$$\text{Tool Registration} \neq \text{Handler Implementation} \neq \text{Server Availability} \neq \text{Execution} \neq \text{Verification} \neq \text{Effective Capability}$$

### 3. Identitas Deskriptor Bukan Identitas Semantik (*Descriptor Identity != Semantic Identity*)

- Identitas pengemasan/deskriptor (*packaging/descriptor id*) dan identitas entitas semantik (*semantic entity id*) adalah dua hal yang berbeda.
- Relasi semantik Capability dan Tool tidak boleh memperlakukan ID deskriptor/paket sebagai substitusi langsung dari ID entitas semantik.
- Disiplin ini selaras dengan pemisahan identitas semantik yang telah ditegakkan pada kontrak Provider, Profile, Skill, dan Runtime (AS2/AS3).

### 4. Bukti Operasional Berbatas Lingkungan & Waktu (*Operational Evidence Discipline*)

- Kebenaran operasional wajib direpresentasikan melalui bukti/observasi eksplisit (*explicit evidence*) yang terikat pada konteks lingkungan (*environment-scoped*) dan waktu (*time-bound*).
- Bukti operasional wajib membedakan secara tegas:
  1. Adopsi teknologi (*Technology Adoption*);
  2. Ketersediaan server (*Server Availability*);
  3. Registrasi tool (*Tool Registration*);
  4. Implementasi handler (*Handler Implementation*);
  5. Eksekusi (*Execution*);
  6. Verifikasi (*Verification*).
- Dilarang menyimpulkan kapabilitas proyek dari kapabilitas host (`host capability != project capability`), atau menyimpulkan ketersediaan saat ini dari riwayat masa lalu (`historical availability != current availability`).
- ADR ini tidak menentukan arsitektur penyimpanan atau database persisten.

### 5. Evaluasi Kapabilitas & Prinsip Fail-Closed (*Capability Assessment*)

- Evaluator deterministik mengonsumsi:
  $$\text{Capability Declarations} + \text{Tool/Control-Plane Declarations} + \text{Explicit Operational Evidence} \longrightarrow \text{CapabilityAssessment}$$
- `CapabilityAssessment` menghasilkan status ketersediaan efektif:
  - `AVAILABLE`: Terbukti secara eksplisit melalui bukti operasional valid yang sesuai lingkup dan waktu.
  - `UNAVAILABLE`: Terbukti gagal, offline, tidak terpasang, atau tidak memenuhi syarat.
  - `UNKNOWN`: Bukti tidak ada, kedaluwarsa, tidak memadai, atau tidak dapat diverifikasi.
- **Prinsip Mutlak**: **FAIL CLOSED**. Ketiadaan atau ketidakcukupan bukti **DILARANG KERAS** menghasilkan status `AVAILABLE`.
- Asesmen operasional Studio OS tidak menggantikan 3 dimensi kebenaran tata kelola proyek pada ADR-004 (*Maturity/Delivery*, *Availability*, *Disposition/Planning*), melainkan bertindak sebagai data pendukung operasional. Studio OS tidak memiliki otoritas siklus hidup (*lifecycle authority*) proyek Lentera Pudar.

### 6. Keluarga Registri (*Registry Family*)

Menetapkan keluarga registri konseptual:
- `CapabilityRegistry`: Registri deklaratif untuk validasi dan resolusi `CapabilityDescriptor`.
- `ToolRegistry`: Registri deklaratif untuk validasi dan resolusi `ToolDescriptor`.
- `ControlPlaneRegistry`: Registri deklaratif untuk validasi dan resolusi `ControlPlaneDescriptor`.
- Invarian mutlak: Registri hanya menyediakan registrasi deklaratif dan resolusi eksak; keberadaan entitas dalam registri tidak membuktikan ketersediaan operasional.

$$\text{Registration} \neq \text{Implementation} \neq \text{Availability} \neq \text{Execution} \neq \text{Verification} \neq \text{Effective Capability}$$

### 7. Batas Perencanaan Control-Plane (*Runtime / Control-Plane Planning Boundary*)

- `RuntimeCompositionPlan` (AS3) tetap murni deklaratif dan bebas dari eksekusi.
- Perencanaan control-plane adalah transformasi terpisah:
  $$\text{RuntimeCompositionPlan} + \text{Capability Requirements} + \text{Registries} + \text{CapabilityAssessment} \longrightarrow \text{ControlPlanePlan}$$
- `ControlPlanePlan` adalah rencana deklaratif dan bukan eksekusi.
- Invarian mutlak:

$$\text{ControlPlanePlan} \neq \text{Execution}$$

- Perencanaan wajib *fail closed* (gagal secara aman) jika kapabilitas, perkakas, atau kontrak control-plane yang disyaratkan tidak dapat diresolusi secara valid.

### 8. Batas Orkestrasi Generic (*Generic Orchestration Boundary*)

- Aliran orkestrasi generic Studio OS didefinisikan sebagai:
  $$\text{ControlPlanePlan} \longrightarrow \text{ControlPlaneOrchestrator} \longrightarrow \text{Injected ControlPlaneAdapter} \longrightarrow \text{ExecutionReceipt}$$
- Invarian mutlak:

$$\text{ExecutionReceipt} \neq \text{Verification}$$

- Tanda terima eksekusi (`ExecutionReceipt`) hanya membuktikan bahwa aksi telah dijalankan (`EXECUTED`), bukan bahwa hasilnya telah diverifikasi atau diterima.
- Inti generic Studio OS **DILARANG KERAS** memuat (*hardcode*):
  - Konfigurasi spesifik Lentera Pudar;
  - Implementasi spesifik Blender;
  - Implementasi spesifik Unreal Engine;
  - Path sistem berkas host tertentu;
  - Kredensial, token, atau API keys;
  - Endpoint jaringan spesifik proyek.

### 9. Batas Kepemilikan Repositori & MCP (*Repository & MCP Boundary*)

- **`adityaairlangga12/ai-game-dev-studio-os`**: Memiliki kontrak generic Capability/Tool/ControlPlane, skema data, registri, validator, semantik evaluasi kapabilitas, semantik perencanaan, dan orkestrasi generic.
- **`lentera-blender-mcp`**: Tetap mandiri mengelola implementasi control-plane spesifik Blender, tooling/skrip Blender, dan server JSON-RPC Blender MCP.
- **`adityaairlangga12/lentera-pudar`**: Memiliki konfigurasi integrasi spesifik proyek, penggunaan produksi, bukti operasional proyek, dan tata kelola siklus hidup proyek.
- Tidak ada pengalihan kepemilikan repositori (*no repository ownership transfer*).

### 10. Dekomposisi Fase AS4 yang Disetujui (*Approved AS4 Decomposition*)

Menetapkan struktur dekomposisi berpagar untuk Phase AS4:

```text
AS4-A0 — Capability & Control-Plane Architecture Closure (Governance / Canon Only)
   ↓
AS4-G1 — Capability / Tool / Control-Plane Contract Foundation (Contracts, Schemas, Validators)
   ↓
AS4-G2 — Registries & Evidence-Backed Capability Evaluation (Registries & Evaluator)
   ↓
AS4-G3 — Runtime-Tool Validation & Control-Plane Planning (Validation & Planning)
   ↓
AS4-G4 — Generic Control-Plane Orchestration Boundary (Orchestrator, Injected Adapters, Receipts)
```

- **Protokol Gerbang Bertahap**:
  - `AS4-A0`: Penutupan arsitektur kanonikal tata kelola (tidak mengotorisasi implementasi AS4-G1).
  - `AS4-G1`: Fondasi kontrak statis, skema JSON, tipe data, validator, dan pengujian. Tanpa registri, tanpa evaluator, tanpa eksekusi.
  - `AS4-G2`: Implementasi `CapabilityRegistry`, `ToolRegistry`, `ControlPlaneRegistry`, dan evaluator `CapabilityAssessment` deterministik berbasis bukti. Tanpa dispatch, tanpa jaringan, tanpa integrasi Lentera.
  - `AS4-G3`: Validasi runtime-tool dan produksi deterministik `ControlPlanePlan`. Tanpa eksekusi.
  - `AS4-G4`: Batas orkestrasi generic dengan adapter terinjeksi dan semantik `ExecutionReceipt`. Tanpa binding spesifik Lentera, Blender, atau Unreal.
- Setiap gerbang implementasi memerlukan otorisasi terpisah dan eksplisit dari Project Owner, Work Order terbatas, verifikasi independen, dan penerimaan formal sebelum gerbang berikutnya dapat dibuka.
- Penerimaan AS4-A0 **TIDAK** mengotorisasi implementasi AS4-G1. Penerimaan AS4-G1 **TIDAK** otomatis mengotorisasi AS4-G2, dan aturan pemisahan yang sama berlaku hingga AS4-G4.

## Consequences

- Arsitektur kapabilitas dan control-plane memiliki dasar kanonikal yang kuat dan fail-closed;
- Implementasi Studio OS pada gerbang AS4-G1 s.d. AS4-G4 wajib mematuhi seluruh invarian semantik yang ditetapkan;
- Status proyek AS4 tetap `NOT_STARTED` hingga gerbang implementasi diotorisasi secara terpisah oleh Project Owner;
- Lentera Pudar tetap terisolasi dari detail eksekusi generic hingga integrasi resmi pada AS5.

## Non-Decisions / Deferred Decisions

Keputusan-keputusan berikut secara eksplisit **DITUNDA** dan tidak diputuskan dalam ADR ini:

- Layout field TypeScript konkret;
- Nama properti JSON Schema di luar persyaratan semantik;
- Layout kelas dan struktur file fisik Studio OS;
- Implementasi konkret Provider produksi;
- Implementasi konkret transport MCP;
- Konfigurasi endpoint Blender MCP;
- Konfigurasi adapter spesifik Lentera Pudar;
- Mekanisme penyimpanan rahasia / kredensial;
- Arsitektur database atau persistensi bukti;
- Arsitektur UI / dashboard;
- Format pertukaran data (*interchange*) Blender → Unreal;
- Arsitektur teknis Unreal Engine;
- Kesiapan audit Phase H1;
- Mekanisme integrasi Phase AS5.

## Related Documents

- [AI Studio Semantic Architecture](../ai-studio-semantic-architecture.md)
- [AI Studio Refoundation Plan](../ai-studio-refoundation-plan.md)
- [ADR-004 — Scope-Based Authority, Capability Truth & Verification Governance](ADR-004-scope-authority-capability-truth-verification-governance.md)
- [ADR-042 — Studio Semantic Architecture & Repository Boundary](ADR-042-studio-semantic-and-repository-boundary.md)
- [ADR Register](README.md)
- [Master Index](../master-index.md)
- [Project Status](../project-status.md)
