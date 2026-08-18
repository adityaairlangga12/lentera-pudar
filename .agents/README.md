# Project-Local Agent Assets

Direktori ini menyimpan policy scoped, skill specification, template konfigurasi, dan optional safety hook untuk agent runtime yang kompatibel.

## Capability Boundary

- Kehadiran `SKILL.md` berarti skill **terdokumentasi dalam repository**.
- Kehadiran file tidak membuktikan skill telah di-install, didaftarkan, dimuat otomatis, atau dipanggil oleh Codex/client lain.
- `mcp_config.example.json` dan `hooks.example.json` adalah template portabel terdokumentasi. Salin ke konfigurasi lokal yang didukung client dan isi path host secara lokal; jangan commit konfigurasi lokal.
- Konfigurasi MCP atau hook client aktual hanya boleh berada pada konfigurasi lokal yang di-ignore Git.
- Kehadiran template di repository tidak membuktikan registration, runtime loading, availability, atau execution.
- Policy yang harus selalu berlaku ditempatkan di root [AGENTS.md](../AGENTS.md) atau dokumen canonical, bukan hanya di skill opsional.
- Instruksi system/platform dan permission runtime tetap lebih tinggi daripada asset repository ini.

## Skill Registry

| Skill | Tujuan | Status repository |
|---|---|---|
| `blender_3d_pipeline` | Authoring dan verifikasi asset Blender | `DOCUMENTED`; runtime activation dependent |
| `creative_vision_direction` | Review creative vision dan narrative direction | `DOCUMENTED`; runtime activation dependent |
| `cross_check_docs` | Audit metadata, link, authority, dan consistency | `DOCUMENTED`; runtime activation dependent |
| `encounter_pacing` | Review encounter pacing dan combat rhythm | `DOCUMENTED`; runtime activation dependent |
| `mcp_tools_pipeline` | Capability-gated Blender MCP workflow | `DOCUMENTED`; runtime activation dependent |
| `orchestration_protocol` | Dekomposisi dan koordinasi multi-step | `DOCUMENTED`; runtime activation dependent |
| `player_psychology_engagement` | Review psychology dan emotional engagement | `DOCUMENTED`; runtime activation dependent |
| `prompt_refinement` | Klarifikasi intent, risk, dan verification contract | `DOCUMENTED`; runtime activation dependent |
| `qc_check` | QC adversarial berbasis bukti | `DOCUMENTED`; runtime activation dependent |

## Local Configuration

Gunakan nama lokal seperti `.agents/mcp_config.local.json` atau `.agents/hooks.local.json`; keduanya di-ignore Git. Jangan mengubah template menjadi klaim bahwa server/hook telah tersedia.

## Validation

Jalankan:

```text
node tools/verify_repository.mjs
```

Validator memeriksa frontmatter skill, link relatif, path mesin, identifier ADR retired, JSON, dan duplicate canonical authority scope.
