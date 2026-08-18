# Aturan Scoped AI & Konfigurasi Ekosistem (.agents/)

Dokumen ini adalah aturan yang di-scope khusus saat AI Agent bekerja atau memodifikasi file di dalam direktori `.agents/`.

---

## 1. Safety Hook
- `hooks/block-force-push.sh` dan `hooks.example.json` adalah optional client-specific guard.
- Kehadiran template tidak membuktikan hook aktif. Agent tetap dilarang melakukan force-push tanpa otorisasi eksplisit dan pemeriksaan target, meskipun hook tidak dimuat runtime.
- Jangan mengubah guard menjadi lebih permisif sebagai bagian tugas yang tidak terkait.

---

## 2. Konsistensi Format & Arsitektur Skill (`skills/*/SKILL.md`)
- **Struktur Frontmatter Wajib**: Setiap file skill baru di dalam `skills/*/SKILL.md` memiliki YAML frontmatter dengan field `name` dan `description`:
  ```yaml
  ---
  name: <nama_skill>
  description: "<Ringkasan fungsi dan pemicu pemanggilan skill>"
  ---
  ```
- **Prinsip Anti-Duplikasi**: Skill merujuk ke owner `authority_scope` yang relevan dan tidak mengambil alih spesifikasi domain.
- **Observability Protocol**: Setiap skill operasional wajib mematuhi standar *Inspect-Before-Execute* dan *Evidence-Driven* sesuai protokol utama proyek.
- **Activation Truth**: File skill berstatus `DOCUMENTED`. Runtime registration, loading, dan invocation harus dibuktikan terpisah.

---

## 3. Template Konfigurasi MCP
- `mcp_config.example.json` adalah template portabel, bukan konfigurasi aktif.
- Path host disimpan hanya pada file lokal yang di-ignore Git.
- Unreal MCP tetap `NOT_STARTED / UNAVAILABLE / PLANNED`; jangan memindahkannya ke `mcpServers` sebelum server, endpoint, dan registration diverifikasi.
- Blender MCP menggunakan model normatif `HEADLESS_FILE_BACKED`; konfigurasi client tetap harus diverifikasi pada runtime yang menjalankannya.

---

## 4. Skill Usage

- Gunakan skill hanya ketika runtime mendukungnya dan trigger tugas cocok.
- `prompt_refinement` adalah panduan opsional untuk ambiguitas, risiko, dan capability gate; ia bukan authority yang mengalahkan root `AGENTS.md` atau instruksi platform.
- Hindari header/protocol theater. Komunikasikan informasi material secara natural dan evidence-first.
