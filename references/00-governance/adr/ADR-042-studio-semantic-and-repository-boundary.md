---
id: ADR-042
status: ACCEPTED
type: DECISION_RECORD
authority_scope: architecture.studio_semantic_boundary
canonical: true
owner: architecture-governance
decision_date: 2026-08-19
last_reviewed: 2026-08-19
supersedes: []
superseded_by: null
---

# ADR-042 — Studio Semantic Architecture & Repository Boundary

## Context

Pengembangan sistem agen dan otomatisasi produksi game pada semesta Lentera Pudar memerlukan pemisahan tanggung jawab yang jelas antara arsitektur studio generic dan aset spesifik game. Tanpa definisi semantik dan batas repositori yang tegas:

1. Konsep `Role`, `Provider`, `Profile`, `Skill`, `Capability`, `Tool`, dan `Runtime` dapat terbaur (*conflated*), sehingga perubahan teknis pada provider disalahartikan sebagai perubahan arsitektur, atau keberadaan dokumen skill disalahartikan sebagai kapabilitas operasional riil;
2. Aset agen project-local Lentera Pudar di direktori `.agents/**` dapat secara tidak sengaja dipromosikan menjadi arsitektur universal Studio OS lintas-proyek;
3. Batas kepemilikan repositori (*repository ownership boundary*) dan arah dependensi menjadi tidak jelas sebelum pembuatan repositori Studio OS yang terisolasi.

## Decision

### 1. Model Entitas Semantik & Invarian Inti

Menetapkan 10 entitas semantik baku beserta invarian pemisahan mutlak:

- **Role**: Tanggung jawab atau fungsi dalam produksi/tata kelola (misal: *Architecture Reviewer*, *3D Artist*, *QA Verifier*, *Technical Executor*). Role mendefinisikan *apa tanggung jawab yang dipenuhi*, bukan *backend teknis yang melaksanakannya*.
- **Provider**: Backend kecerdasan atau eksekusi eksternal/internal (misal: LLM backend, inference service). `Role != Provider`. Pergantian provider bukan perubahan arsitektur.
- **Profile**: Konfigurasi perilaku dan eksekusi partisipan runtime yang menyusun Role, preferensi provider, batasan perilaku, dan skill yang diizinkan. `Profile != Skill`.
- **Skill**: Paket instruksi/prosedur kerja terdokumentasi yang dapat digunakan ulang. Keberadaan skill berstatus `DOCUMENTED`. `Skill != Capability`.
- **Capability**: Kemampuan terbukti (*evidence-backed ability*) dari konfigurasi sistem/tooling untuk menjalankan kelas aksi tertentu di bawah kondisi yang dinyatakan. Menegakkan rantai: $\text{DOCUMENTED} \neq \text{IMPLEMENTED} \neq \text{AVAILABLE} \neq \text{EXECUTED} \neq \text{VERIFIED} \neq \text{ACCEPTED}$. `Capability != Tool`.
- **Tool**: Permukaan antarmuka/operasi callable yang diekspos ke konteks eksekusi. Invarian: $\text{Registration} \neq \text{Implementation} \neq \text{Availability} \neq \text{Execution} \neq \text{Verification}$.
- **Runtime**: Lingkungan atau konteks eksekusi tempat provider, profile, tools, dan semantik eksekusi beroperasi. `Runtime != Provider`.
- **Artifact**: Deliverable logis produksi atau tata kelola. `Artifact != File`. Satu artefak dapat berupa satu file, banyak file, generated output, atau struktur state repositori.
- **Project**: Konteks produksi spesifik yang mengonsumsi atau mengintegrasikan arsitektur Studio. Lentera Pudar adalah produk utama dan proyek referensi pertama. Studio OS tidak sama dengan Lentera Pudar.
- **Production Domain**: Klasifikasi bidang subjek produksi atau area alur kerja (misal: 3D, Audio, Narrative, Gameplay, QA). `Production Domain != Role`.

### 2. Matriks Batas Kepemilikan Repositori (*Repository Ownership Boundary*)

- **`adityaairlangga12/lentera-pudar`**: Memiliki kanon game, spesifikasi naratif/gameplay/art 3D, tata kelola dan status proyek, implementasi game/aset, Work Orders, Traces, Handoffs, Passports, konfigurasi integrasi spesifik game, dan aset agen project-local di `.agents/**`.
- **Future Studio OS (Repositori Terpisah Masa Depan)**: Memiliki kontrak generic Studio, skema data, registri, validator, semantik Role, semantik Provider, skema Profile, semantik registrasi Skill, kontrak Capability, abstraksi generic Tool/control-plane, semantik adapter Runtime/Provider, kerangka kerja ekstensi, dan mekanisme orkestrasi lintas-proyek. *Repositori ini belum dibuat dan tidak diinisialisasi pada AS1.*
- **`lentera-blender-mcp`**: Tetap merupakan repositori independen yang mengelola implementasi control-plane Blender, perkakas khusus Blender, dan server/tool Blender MCP. Tidak dimiliki oleh Lentera Pudar dan tidak diserap ke dalam Studio OS.

### 3. Arah Dependensi (*Dependency Direction*)

```text
Studio Semantic Contracts
        ↓
Future Studio OS Implementation
        ↓
Project Integration / Adapter Layer
        ↓
Lentera Pudar
```

Semantik studio generic tidak boleh diturunkan secara terbalik melalui promosi langsung struktur lokal Lentera.

### 4. Prinsip Stabilitas Inti & Ekstensibilitas Tepi

Inti semantik Studio OS dirancang ramping dan stabil. Variasi diekspresikan melalui registrasi, komposisi, profil, adapter, dan ekstensi sebelum mengubah semantik inti (*extend by registration/composition before changing core semantics*).

### 5. Klasifikasi Aset `.agents/**`

Direktori `.agents/**` pada repositori `lentera-pudar` diklasifikasikan secara tegas sebagai *existing Lentera Pudar project-local agent assets / documented specifications*, bukan sebagai Studio OS, bukan bukti implementasi Studio masa depan, dan bukan bukti aktivasi runtime.

## Consequences

- Implementasi fondasi Studio OS pada Phase AS2 wajib mematuhi semantik dan batas kepemilikan yang ditetapkan dalam ADR ini;
- Pembuatan fisik repositori Studio OS tetap menjadi gerbang persetujuan manusia (*human approval gate*) terpisah;
- Direktori `.agents/**` tetap dipertahankan dan tidak dimutasi pada AS1;
- Pergantian atau penambahan provider AI tidak memerlukan perancangan ulang arsitektur selama kontrak antarmuka terpenuhi;
- Integrasi antara Studio OS dan repositori game dilakukan melalui kontrak eksplisit dan lapisan adapter.

## Non-Decisions / Deferred Decisions

Keputusan-keputusan berikut secara eksplisit **DITUNDA** dan tidak diputuskan dalam ADR ini:

- Nama repositori Studio OS;
- Visibilitas repositori (*public/private*);
- Lisensi repositori (*licensing*);
- Bahasa pemrograman / runtime framework Studio OS;
- Daftar konkret provider AI yang didukung;
- Implementasi adapter provider;
- Desain dimensi / model final registri kapabilitas (dialokasikan pada AS4);
- Format pertukaran data (*interchange*) Blender → Unreal;
- Arsitektur teknis Unreal Engine;
- Keputusan audit kesiapan Phase H1;
- Implementasi fitur hipotetis multi-game atau 2D.

## Related Documents

- [AI Studio Semantic Architecture](../ai-studio-semantic-architecture.md)
- [AI Studio Refoundation Plan](../ai-studio-refoundation-plan.md)
- [Master Index](../master-index.md)
- [Project Status](../project-status.md)
