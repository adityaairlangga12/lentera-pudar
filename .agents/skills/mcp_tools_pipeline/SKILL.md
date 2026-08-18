---
name: mcp_tools_pipeline
description: "Pemahaman arsitektur Blender 5.2 LTS MCP dan tata kelola integrasi tool 3D, standar layer API (Atomic, Macro, Workflow), prinsip observabilitas, dan kepatuhan kapabilitas 5-dimensi."
---

# Lentera Pudar — 3D MCP Tools Pipeline

## Purpose
Skill ini mengatur **protokol orkestrasi perkakas 3D MCP, pembagian layer API, targeting file fisik persisten (`blend_file`), prinsip observabilitas sebelum mutasi, dan tata kelola kebenaran kapabilitas perkakas** di semesta *Lentera Pudar*.

Seluruh kontrak API dan status capability diatur di [tools-mcp-stack.md](../../../references/06-pipeline-qc/tools-mcp-stack.md) dan [master-index.md](../../../references/00-governance/master-index.md). Skill ini tidak membuktikan server telah didaftarkan atau tersedia pada runtime aktif.

---

## Activate When
- Menjalankan operasi pemodelan, rigging, shading, atau ekspor melalui server MCP Blender 5.2 LTS (`lentera-blender-mcp`).
- Melakukan inspeksi scene state dan penanganan error/timeout pada eksekusi perkakas.
- Mengorkestrasi pipeline multi-langkah (*workflow tools*) yang melibatkan interaksi DCC.

---

## Do Not Use When
- Pengeditan dokumentasi konseptual murni yang tidak memerlukan pemanggilan tool MCP.
- Mengasumsikan eksekusi pada server perkakas yang belum diimplementasikan atau berstatus deferred.

---

## Canonical Dependencies
- [tools-mcp-stack.md](../../../references/06-pipeline-qc/tools-mcp-stack.md) — Kontrak public registry dan status revalidasi.
- [api-cheat-sheet.md](../../../references/06-pipeline-qc/api-cheat-sheet.md) — Contoh pemanggilan non-evidence.
- [master-index.md](../../../references/00-governance/master-index.md) — Capability truth dan owner scope.

---

## Kebijakan Kebenaran Kapabilitas (*Capability Truth Policy*)

Setiap agen membedakan maturity, availability, dan disposition sesuai [master-index.md](../../../references/00-governance/master-index.md):
$$\text{Tool Registration} \neq \text{Implementation} \neq \text{Server Availability} \neq \text{Execution} \neq \text{Verification}$$

### 1. Status Unreal Engine 5 MCP
- Server MCP Unreal Engine 5 berstatus **`NOT_STARTED / UNAVAILABLE / PLANNED`**. Placeholder konfigurasi bukan tool registration.
- AI Agent **DILARANG MENGKLAIM** bahwa UE5 MCP saat ini aktif, tersedia, atau dapat dieksekusi secara otomatis.

### 2. Status Blender 5.2 LTS MCP (Hardened v1)
- Model eksekusi yang diterima adalah **`HEADLESS_FILE_BACKED`** via stdio MCP server; availability tetap dicek pada runtime aktif.
- Tepat **23 tool berada dalam public registry** dan 17 tool deferred tidak dipublikasikan. Revalidasi 2026-08-18 menemukan screenshot integration path gagal; lihat [tools-mcp-stack.md](../../../references/06-pipeline-qc/tools-mcp-stack.md).
- Status pendaftaran skema perkakas (*Tool Registration*) tidak sama dengan keberadaan kode eksekusi nyata (*Implemented Handler*).
- Sebelum mengeksekusi operasi mutasi, pastikan tool yang dipanggil termasuk dalam 23 tool publik aktif.
- Respons `{status: "ok"}` atau payload hasil eksekusi HANYA berstatus `EXECUTED` dan dilarang diklaim sebagai tugas selesai sebelum diverifikasi secara independen.

---

## Kontrak Targeting File Fisik

1. **Targeting File Eksis (`blend_file`)**:
   - Seluruh mutasi pada scene yang sudah ada wajib menyertakan path `blend_file` yang valid.
   - Jangan pernah mengasumsikan state memori dari pemanggilan sebelumnya bertahan (*no cross-call in-memory session*).
2. **Targeting File Baru (`output_blend_file`)**:
   - Digunakan saat menginisialisasi scene/mesh baru (misal: `create_mesh_primitive`, `create_armature`).

---

## Pembagian 3 Layer API Terstandarisasi

Perkakas publik diorganisasikan ke dalam 3 layer:
1. **Atomic Tools**: Aksi tunggal deterministik dengan batas lingkup kecil (misal: `set_bone_roll`, `set_shading_mode`, `create_mesh_primitive`).
2. **Macro Pattern**: Orkestrasi beberapa tool public menjadi tugas terarah, misalnya `create_armature` → `add_bone` → `set_bone_roll`, atau `apply_modifier` → `merge_by_distance` → `unwrap_uv`.
3. **Workflow Pattern**: Eksekusi multi-tahap dengan status per langkah, misalnya `export_gltf` → `validate_export`. Screenshot viewport tidak menjadi gate wajib selama regresinya masih terbuka.

---

## Prinsip Observabilitas Sebelum Mutasi (*Inspect-Before-Mutate*)

Sebelum dan sesudah mengeksekusi operasi mutasi pada scene 3D:
1. **Inspeksi Awal**: Panggil tool observasi seperti `get_scene_state`, `list_objects`, atau `get_mesh_stats` dengan menyertakan `blend_file`.
2. **Eksekusi Terisolasi**: Jalankan mutasi dengan parameter terikat ketat.
3. **Inspeksi Diagnostik Pasca-Eksekusi**: Jika terjadi anomali, periksa log via `get_console_output` atau `get_last_error`.
4. **Verifikasi Independen**:
   $$\mathbf{VERIFIED} = \text{Task Acceptance Criteria} + \text{Observed Target State} + \text{Independent Evidence}$$
   - Modeling: `get_mesh_stats` / `get_object_state`
   - Rigging: `get_armature_state`
   - Ekspor: `validate_export`

---

## Output Expectations
- Pelaporan pemanggilan tool yang jujur mencantumkan status kapabilitas riil.
- Penggunaan alat observasi secara konsisten sebelum dan sesudah mutasi.
