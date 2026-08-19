---
status: ACTIVE
type: GOVERNANCE
authority_scope: architecture.adr_register
canonical: true
owner: architecture-governance
last_reviewed: 2026-08-19
---

# Architecture Decision Record Register

Register ini mencatat keputusan yang bersifat struktural, lintas-domain, mahal untuk dibalik, atau menentukan batas arsitektur dan tata kelola proyek.

ADR tidak menggantikan dokumen spesifikasi domain. Keputusan mengenai balancing, naskah, parameter visual, desain musuh, UI, atau detail aset tetap dimiliki dokumen kanonikal pada scope masing-masing kecuali keputusan tersebut benar-benar mengubah arsitektur lintas-domain.

## Status ADR

- `PROPOSED`: keputusan sedang dinilai dan belum memiliki otoritas.
- `ACCEPTED`: keputusan berlaku pada scope yang dinyatakan.
- `DEFERRED`: keputusan sengaja ditunda sampai bukti atau prasyarat tersedia.
- `SUPERSEDED`: keputusan telah digantikan oleh ADR lain yang disebutkan secara eksplisit.
- `REJECTED`: usulan telah ditolak dan tidak memiliki otoritas.

Hanya ADR berstatus `ACCEPTED` yang memiliki otoritas keputusan, dan hanya untuk `authority_scope` serta isi keputusan yang dinyatakan secara eksplisit.

## Register Aktif

| ID | Keputusan | Status | Authority Scope |
|---|---|---|---|
| [ADR-001](ADR-001-primary-runtime-and-dcc-stack.md) | Primary Runtime & DCC Stack | `ACCEPTED` | `architecture.runtime_dcc_stack` |
| [ADR-002](ADR-002-full-3d-native-production-architecture.md) | Full 3D Native Production Architecture | `ACCEPTED` | `architecture.production_3d` |
| [ADR-003](ADR-003-blender-mcp-hardened-v1-execution-architecture.md) | Blender MCP Hardened-v1 Execution Architecture | `ACCEPTED` | `architecture.blender_mcp_execution` |
| [ADR-004](ADR-004-scope-authority-capability-truth-verification-governance.md) | Scope-Based Authority, Capability Truth & Verification Governance | `ACCEPTED` | `governance.authority_verification` |
| [ADR-042](ADR-042-studio-semantic-and-repository-boundary.md) | Studio Semantic Architecture & Repository Boundary | `ACCEPTED` | `architecture.studio_semantic_boundary` |

> The historical identifier interval strictly greater than `ADR-004` and strictly less than `ADR-042` is reserved from the pre-refoundation lineage and MUST NOT be reused. New post-refoundation allocation resumes at `ADR-042`.

## Kualifikasi ADR

Sebuah keputusan layak menjadi ADR jika sedikitnya satu kondisi berikut terpenuhi:

- menentukan engine, runtime, DCC, atau batas toolchain utama;
- memengaruhi beberapa domain sekaligus;
- mahal atau berisiko tinggi untuk dibalik;
- menentukan arsitektur persistent state, source control, atau automasi;
- menetapkan tata kelola otoritas dan model verifikasi proyek.

Keputusan rutin yang tidak memenuhi kriteria tersebut harus dicatat pada dokumen kanonikal domain, bukan dibuatkan ADR baru.

## Kontrak Metadata

Setiap ADR wajib memiliki:

- `id`;
- `status`;
- `type: DECISION_RECORD`;
- `authority_scope`;
- `canonical`;
- `owner`;
- `decision_date`;
- `last_reviewed`;
- `supersedes`;
- `superseded_by`.

Nomor ADR bersifat berurutan dan tidak digunakan ulang. ADR yang digantikan tetap dipertahankan dengan status `SUPERSEDED` agar jejak keputusan tidak hilang.

## Resolusi Konflik

Gunakan aturan konflik pada [master-index.md](../master-index.md). ADR `ACCEPTED` mengatur hanya keputusan yang dinyatakan pada scope-nya. Untuk fakta yang tidak diatur ADR secara eksplisit, dokumen pemilik kanonikal domain tetap menjadi sumber kebenaran.
