---
status: ACTIVE
type: REFERENCE
authority_scope: pipeline.patterns
canonical: false
last_reviewed: 2026-08-18
---


# QC Patterns Log — Lentera Pudar: 3D Action RPG Edition

Dokumen ini mencatat pola kegagalan dan tindakan preventif yang memiliki evidence reference current-project dan dapat diperiksa. Incident history tanpa bukti tidak dipertahankan dalam log aktif ini.

---

## Format Pencatatan Pola Reject (Pattern Template)

```markdown
### PATTERN-XXX: [Nama Pola Kegagalan]
- **Tanggal**: YYYY-MM-DD
- **Kategori**: [Visual QC / Functional QC / Rigging & Physics QC / Consistency QC]
- **Komponen Terdampak**: (Nama file/mesh/armature/material)
- **Evidence Reference**: Commit, test/log, artifact, atau laporan inspeksi yang dapat diperiksa.
- **Evidence Status**: `VERIFIED` / `PARTIAL`; `PARTIAL` tetap memerlukan Evidence Reference yang dapat diperiksa dan tidak boleh mewakili narasi historis tanpa bukti.
- **Gejala / Error**: Deskripsi error atau kecacatan visual yang muncul.
- **Akar Masalah**: Mengapa kesalahan ini bisa terjadi?
- **Tindakan Perbaikan (Fix)**: Solusi teknis yang diterapkan.
- **Langkah Preventif**: Aturan/pemeriksaan baru apa yang ditambahkan ke checklist QC agar tidak terulang?
```

---

## Log Pola Terobservasi

### PATTERN-004: Registry Pass Tidak Menjamin Seluruh Runtime Path Lulus
- **Tanggal**: 2026-08-18
- **Kategori**: Tooling Integration QC
- **Komponen Terdampak**: `lentera-blender-mcp` commit `8d2bdd5`, tool `render_viewport_screenshot`.
- **Evidence Reference**: `node --test tests/contract/*.test.js` menghasilkan 33/33 pass; `node --test tests/integration/*.test.js` menghasilkan 13/14 pass dan screenshot mengembalikan `isError: true`.
- **Evidence Status**: `VERIFIED` untuk hasil eksekusi pada host audit 2026-08-18.
- **Gejala / Error**: Public registry dan handler mapping lulus, tetapi satu execution path integrasi gagal.
- **Akar Masalah**: `UNKNOWN`; R4 tidak mengubah repository MCP terpisah dan tidak mengarang diagnosis.
- **Tindakan Perbaikan**: Turunkan status screenshot menjadi `VERIFICATION_FAILED` pada kontrak toolchain dan hindari menjadikannya bukti wajib.
- **Langkah Preventif**: Selalu jalankan contract tests dan integration tests; jangan menaikkan status behavior hanya dari `tools/list` atau handler registration.
