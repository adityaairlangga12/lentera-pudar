---
id: ADR-003
status: ACCEPTED
type: DECISION_RECORD
authority_scope: architecture.blender_mcp_execution
canonical: true
owner: tooling-architecture
decision_date: 2026-08-18
last_reviewed: 2026-08-18
supersedes: []
superseded_by: null
---

# ADR-003 — Blender MCP Hardened-v1 Execution Architecture

## Context

Otomasi Blender membutuhkan model eksekusi dan working-state authority yang deterministik. Registrasi tool atau respons sukses dari handler tidak cukup untuk membuktikan bahwa mutasi benar-benar terjadi pada file target.

## Decision

Arsitektur eksekusi `lentera-blender-mcp` yang diterima adalah model **`HEADLESS_FILE_BACKED`**:

- komunikasi MCP menggunakan transport stdio antara client dan server;
- setiap operasi Blender dijalankan melalui subprocess Blender 5.2 LTS headless yang terisolasi;
- file `.blend` fisik menjadi otoritas working state persisten dalam scope Blender;
- keberhasilan mutasi harus diverifikasi melalui pembacaan ulang state atau artefak target;
- GUI/WebSocket bridge tidak menjadi bagian dari baseline aktif dan berstatus `DEFERRED / UNAVAILABLE` sampai dibuktikan lain.

## Verified Baseline Boundary

Keputusan arsitektur `HEADLESS_FILE_BACKED` di atas tetap `ACCEPTED`. Status keputusan tersebut terpisah dari hasil verifikasi tooling terbaru, yang dapat berubah saat pengujian diulang.

Evidence terbaru yang tercatat untuk package version `1.0.0` adalah:

- 23 public tools;
- 17 deferred tools;
- contract tests `33/33 PASS`;
- integration tests `13/14 PASS`;
- `render_viewport_screenshot`: `VERIFICATION_FAILED`.

Angka tersebut mendeskripsikan hasil pengujian tooling pada baseline yang diperiksa. Kegagalan satu execution path screenshot tidak digeneralisasi sebagai kegagalan tool lain, dan evidence tersebut tidak memperluas kapabilitas ke tool deferred atau ke integrasi Unreal yang belum diverifikasi.

## Explicit Non-Decisions

- Kapabilitas ekspor glTF/GLB yang terverifikasi pada Blender tidak menetapkan format interchange final Blender → Unreal.
- ADR ini tidak menetapkan arsitektur Unreal MCP.
- ADR ini tidak membuktikan kompatibilitas artifact dengan runtime pihak ketiga tanpa validasi terpisah.

## Consequences

- Klaim mutasi Blender harus menyertakan bukti file-backed yang dapat diperiksa.
- Proses yang hanya terdaftar, memanggil stub, atau mengembalikan payload sukses tidak boleh dilaporkan sebagai target state terverifikasi.
- Tool baru harus mengikuti isolasi proses, kontrak input/output, dan verifikasi artifact yang sesuai dengan model ini.

## Related Documents

- [Project Status](../project-status.md)
- [Tools & MCP Stack](../../06-pipeline-qc/tools-mcp-stack.md)
- [API Cheat Sheet](../../06-pipeline-qc/api-cheat-sheet.md)
- [3D Asset Pipeline](../../04-art-3d/3d-asset-pipeline.md)
