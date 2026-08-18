---
id: ADR-001
status: ACCEPTED
type: DECISION_RECORD
authority_scope: architecture.runtime_dcc_stack
canonical: true
owner: architecture-governance
decision_date: 2026-08-18
last_reviewed: 2026-08-18
supersedes: []
superseded_by: null
---

# ADR-001 — Primary Runtime & DCC Stack

## Context

Proyek memerlukan satu target runtime dan satu DCC primer agar spesifikasi desain, pipeline aset, dan audit kesiapan teknis memiliki batas yang konsisten. Pemilihan stack tidak boleh disalahartikan sebagai bukti bahwa project runtime atau arsitektur implementasinya sudah tersedia.

## Decision

- **Unreal Engine 5** ditetapkan sebagai target runtime dan production engine utama.
- **Blender 5.2 LTS** ditetapkan sebagai DCC primer untuk pemodelan, sculpting, rigging, animasi, UV, material authoring, dan persiapan ekspor aset 3D.
- Tooling Blender yang telah diverifikasi dapat digunakan sesuai batas kapabilitas aktualnya.

## Current Evidence Boundary

Pada saat keputusan ini diterima:

- Unreal project belum diinisialisasi;
- arsitektur implementasi Unreal belum diaudit;
- Unreal gameplay systems belum dimulai;
- Blender 5.2 LTS dan baseline `lentera-blender-mcp` memiliki bukti verifikasi yang dicatat pada status proyek dan dokumen toolchain.

Keputusan stack ini tidak membuktikan bahwa sistem Unreal, aset produksi, atau integrasi Blender–Unreal sudah diimplementasikan.

## Explicit Non-Decisions

- Versi minor Unreal Engine belum dikunci oleh ADR ini.
- Format interchange final Blender → Unreal tidak diputuskan dan tetap `DEFERRED` sampai H1.
- Arsitektur gameplay, rendering, source control aset, dan Unreal automation tidak diputuskan oleh ADR ini.

## Consequences

- Semua desain baru harus kompatibel dengan arah Unreal Engine 5 dan pipeline authoring Blender 5.2 LTS.
- Keputusan teknis Unreal yang membutuhkan bukti runtime harus menunggu audit dan observasi environment aktual.
- Dokumen tidak boleh mengubah target stack menjadi klaim implementasi tanpa evidence terpisah.

## Related Documents

- [Project Status](../project-status.md)
- [Game Design Document](../../01-core/game-design-document.md)
- [3D Asset Pipeline](../../04-art-3d/3d-asset-pipeline.md)
- [Tools & MCP Stack](../../06-pipeline-qc/tools-mcp-stack.md)
