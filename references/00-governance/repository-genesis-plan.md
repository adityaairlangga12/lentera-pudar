---
status: ACTIVE
type: GOVERNANCE
authority_scope: repository.genesis
canonical: true
owner: governance-team
last_reviewed: 2026-08-18
---

# Repository Genesis Plan — Lentera Pudar

## 1. Purpose, Authority & Non-Goals

Dokumen ini adalah otoritas kanonikal untuk pelaksanaan R7 Fresh `lentera-pudar` Repository Genesis dan verifikasi independen R8 Migration Verification & Legacy Repository Retirement Gate. Setiap eksekusi R7 dan penilaian R8 wajib mengikuti manifest, transformasi, gate, serta batas keselamatan di dokumen ini.

Rencana ini tidak:

- memulai atau menerima R7 maupun R8;
- menginisialisasi Unreal project, gameplay systems, atau production assets;
- menetapkan format interchange Blender → Unreal;
- menetapkan kebijakan Git LFS atau source control binary;
- mengarsipkan, menghapus, atau memensiunkan repository legacy;
- menggantikan otoritas domain lain yang dirutekan melalui [master-index.md](master-index.md).

## 2. Capability and Evidence Truth Rules

R7 dan R8 wajib membedakan `DOCUMENTED`, `IMPLEMENTED`, `AVAILABLE`, `EXECUTED`, dan `VERIFIED`. Kehadiran file konfigurasi, template, skill, atau dokumentasi tidak membuktikan registration, runtime loading, server availability, execution, maupun verification.

Setiap klaim hasil wajib dibedakan sebagai `VERIFIED FACT`, `INFERENCE`, `UNKNOWN`, atau `CONFLICT`. Status selesai hanya sah jika acceptance criteria, target state terobservasi, dan bukti independen seluruhnya tersedia. Repository dan bukti GitHub aktual adalah sumber kebenaran untuk transisi genesis.

## 3. R6 Planning Baseline

```text
R6_PLANNING_BASELINE_SHA = ee46ee3f02286178bd83f5ccad68766cb0de4a22
```

SHA tersebut adalah baseline perencanaan R6, bukan final genesis source. Baseline itu memuat state R1–R5 yang diterima sebelum canonical R6 closure.

## 4. Final Genesis Source Binding

```text
GENESIS_SOURCE_SHA = merge commit SHA of the externally accepted R6 closure PR
```

Literal future merge SHA tidak ditulis ke dalam PR yang akan menghasilkan SHA tersebut. Sebelum transisi repository apa pun, R7 wajib memperoleh merge-commit identity dari bukti GitHub PR penutupan R6 dan membuktikan:

```text
current main HEAD == GENESIS_SOURCE_SHA
```

Jika `main` telah bergerak melampaui SHA yang disetujui, R7 wajib `STOP` dan meminta baseline re-verification. R7 hanya boleh menerapkan transformasi yang secara eksplisit diotorisasi oleh dokumen ini.

## 5. Approved Genesis Manifest

### MIGRATE

- `AGENTS.md`;
- seluruh approved `references/` content, termasuk dokumen genesis ini dan ADR register;
- portable `.agents` baseline:
  - `.agents/AGENTS.md`;
  - `.agents/README.md`;
  - `.agents/hooks.example.json`;
  - `.agents/hooks/block-force-push.sh`;
  - `.agents/mcp_config.example.json`;
  - seluruh sembilan `.agents/skills/*/SKILL.md`;
- `tools/verify_repository.mjs`.

### EXCLUDE

- `Assets/ConceptArt/.gitkeep`;
- `Assets/Models/.gitkeep`;
- `.agents/hooks.json`;
- `tools/.gitkeep`;
- old Git history dan old commits;
- historical working branches;
- historical tags, termasuk `v0.1.0-foundation`;
- releases dan PR refs;
- local atau host configuration;
- temporary audit/chat artifacts;
- generated, cache, dan build artifacts.

R7 dilarang menciptakan replacement asset directories sebelum H1 atau source-asset planning menetapkan struktur yang terverifikasi.

### RECREATE

- `README.md`;
- `.gitignore`.

### HUMAN_DECISION_REQUIRED

- keberadaan dan isi `LICENSE`;
- repository visibility;
- exact temporary legacy repository name;
- durable `BACKUP_DESTINATION`.

Expected target adalah 56 files tanpa `LICENSE` atau 57 files dengan `LICENSE`. Angka tersebut bukan pengganti verifikasi. R7 wajib menghasilkan exact sorted manifest sebelum commit dan membandingkannya terhadap manifest yang disetujui. Setiap mismatch mewajibkan `STOP`.

## 6. Authorized R7 Transformations

R7 hanya boleh melakukan transformasi berikut:

1. membuat ulang `README.md`;
2. membuat ulang `.gitignore`;
3. mengoreksi `.agents/README.md` agar tidak menyatakan `.agents/hooks.json` masih dipertahankan sebagai compatibility snapshot;
4. memperbarui `references/00-governance/project-status.md` ke execution state R7;
5. membuat `LICENSE` hanya jika bentuk dan isinya telah disetujui Project Owner.

Tidak ada source content lain yang boleh ditulis ulang secara diam-diam.

Target `project-status.md` setelah successful R7 execution:

```text
R6 = ACCEPTED
R7 = IMPLEMENTED / PENDING R8 VERIFICATION
R8 = NOT_STARTED / NEXT
H1 = BLOCKED until R8 external acceptance
```

State tersebut adalah execution state dan tidak boleh diklaim sebagai external R7 acceptance.

### README Policy

`README.md` hasil rekreasi wajib memuat:

- identitas proyek Lentera Pudar;
- arah full-3D third-person action-adventure RPG;
- Unreal Engine 5 sebagai target runtime;
- Blender 5.2 LTS sebagai primary DCC;
- current truth Unreal project, gameplay systems, dan production assets;
- routing ke `references/00-governance/master-index.md`, `references/00-governance/project-status.md`, dan `references/00-governance/repository-genesis-plan.md`;
- perintah `node tools/verify_repository.mjs`;
- peringatan documented capability bukan runtime capability;
- kebijakan local MCP configuration;
- owner-approved license status.

README dilarang membawa obsolete Git atau project history.

### Gitignore Policy

R7 membuat ulang `.gitignore` dari semantik baseline yang diterima dan wajib mengabaikan:

```text
.agents/mcp_config.local.json
.agents/hooks.local.json
.agents/mcp_config.json
.agents/hooks.json
```

Binary/LFS wording wajib menyatakan kebijakan `NOT YET ESTABLISHED`. Production binary ingestion harus menunggu approved source-control policy. R7 dilarang membuat `.gitattributes` atau mengaktifkan Git LFS.

## 7. Fresh Git History Policy

- initial dan default branch: `main`;
- history: tepat satu root commit tanpa parent;
- preferred commit title: `chore(genesis): establish accepted UE5 foundation`;
- tidak mengimpor parent, branch, tag, release, PR ref, atau old commit.

Post-genesis merge policy:

- squash merge: `ENABLED`;
- merge commits: `DISABLED`;
- rebase merge: `DISABLED`.

## 8. Legacy Repository Safety Boundary

Urutan wajib:

```text
durable backup
→ verify backup
→ rename old repository
→ keep old repository unarchived and recoverable
→ create fresh repository
→ R7 implementation
→ R8 independent verification
→ R8 external acceptance
→ explicit post-R8 Project Owner decision on retirement
```

Immutable current legacy repository ID:

```text
1333750526
```

Identity verification wajib menggunakan repository ID, bukan nama saja. Selama R7 dan R8, repository legacy tidak boleh diarsipkan, dihapus, kehilangan history/branch/tag/release, atau diperlakukan sebagai retired.

## 9. Backup Requirements

Sebelum rename, `BACKUP_DESTINATION` harus telah dipilih secara eksplisit, durable, writable, dan berada di luar kedua repository working tree.

Bukti minimum:

- mirror backup;
- Git bundle;
- successful `git bundle verify`;
- SHA-256 checksum yang cocok;
- successful `git fsck --full`;
- refs, branches, dan tags inventory;
- GitHub repository metadata/settings inventory;
- repository ID;
- backup location dan timestamp.

Kegagalan satu verifikasi mewajibkan `STOP` sebelum rename.

## 10. GitHub Settings Target Matrix

| Area | Target |
|---|---|
| Repository name | fresh `lentera-pudar` |
| Visibility | `HUMAN_DECISION_REQUIRED` |
| Default branch | `main` |
| Squash merge | enabled |
| Merge commits | disabled |
| Rebase merge | disabled |
| Auto-merge | disabled |
| Delete branch after merge | enabled |
| Main protection | block force-push/deletion; require PR after genesis |
| Required approvals | 0 initially for sole-owner workflow |
| Required CI | none until separately established |
| Issues | enabled |
| Discussions | disabled |
| Projects | disabled |
| Wiki | disabled |
| Actions | enabled without migrated workflows/secrets |
| Tags/releases | none |
| Webhooks/deploy keys | none |
| Collaborators | owner only unless explicitly approved |
| Description/topics | optional owner decision |
| Secret scanning/push protection | enable where supported |
| Git LFS | not configured in R7 |
| Legacy repository | remain unarchived during R7/R8 |

## 11. Human Approval Preconditions

Sebelum identity-changing operation, Project Owner wajib menentukan secara eksplisit:

- `PUBLIC` atau `PRIVATE`;
- license choice;
- exact temporary legacy repository name;
- durable `BACKUP_DESTINATION`.

Current repository state, prior visibility, atau silence tidak boleh dianggap sebagai approval.

## 12. R7 Execution Procedure

1. Resolve externally accepted R6 closure PR dan `GENESIS_SOURCE_SHA`.
2. Verifikasi current `main` tepat pada SHA tersebut.
3. Resolve seluruh human approval preconditions.
4. Freeze mutation dan catat initial evidence.
5. Buat mirror, bundle, checksum, refs inventory, dan settings inventory pada durable backup destination.
6. Jalankan seluruh backup verification.
7. Verifikasi target names dan collision risk.
8. Rename old repository ke nama legacy yang disetujui.
9. Verifikasi repository legacy tetap unarchived, recoverable, dan ber-ID `1333750526`.
10. Buat empty fresh `lentera-pudar` dengan visibility yang disetujui.
11. Verifikasi fresh repository ID berbeda dari legacy ID.
12. Bangun isolated staging tree hanya dari approved manifest.
13. Terapkan hanya authorized R7 transformations.
14. Buat dan bandingkan exact sorted manifest; target terverifikasi harus 56 atau 57 sesuai keputusan license.
15. Jalankan validator, link/path checks, contamination scan, dan diff checks.
16. Inisialisasi `main` dan buat tepat satu parentless root commit.
17. Push hanya `main` tanpa tag.
18. Terapkan GitHub settings target.
19. Catat evidence ledger, laporkan execution state, dan `STOP` untuk R8.

## 13. R7 Stop Conditions

R7 wajib fail closed dan berhenti jika:

- current `main` tidak sama dengan `GENESIS_SOURCE_SHA`;
- ada human decision yang belum resolved;
- `BACKUP_DESTINATION` unresolved atau tidak memenuhi durability/writability boundary;
- mirror, bundle, checksum, atau `git fsck` gagal;
- repository-name collision terdeteksi;
- legacy repository ID mismatch;
- fresh repository ID tidak distinct;
- manifest mismatch;
- unauthorized file transformation terdeteksi;
- validator gagal;
- canonical link rusak;
- genesis history memiliki parent atau lebih dari satu commit;
- unexpected tag atau branch muncul;
- visibility atau license tidak sesuai keputusan owner;
- ditemukan required architecture decision yang belum dibuat.

## 14. R8 Independent Verification Checklist

R8 wajib memverifikasi secara independen:

- fresh repository ID berbeda dari `1333750526`;
- legacy repository mempertahankan ID `1333750526`;
- legacy tetap unarchived dan recoverable;
- seluruh backup evidence terverifikasi;
- tepat satu fresh parentless commit;
- hanya `main` yang ada pada initial state;
- tidak ada historical tags, releases, branches, atau PR refs;
- exact approved manifest cocok;
- seluruh excluded files tidak ada;
- README, `.gitignore`, dan optional `LICENSE` sesuai keputusan;
- tidak ada `.gitattributes` atau Git LFS activation;
- tidak ada host-specific contamination;
- canonical genesis plan dan master-index routing tetap utuh;
- ADR register tetap utuh;
- validator melaporkan 0 issues;
- seluruh canonical links resolve;
- GitHub settings cocok dengan approved target;
- tidak ada secrets, hooks, workflow, atau runtime state yang tidak sengaja dimigrasikan;
- status R7, R8, dan H1 truthful;
- tidak terjadi legacy deletion atau archive.

R8 tidak boleh otomatis memensiunkan repository lama.

## 15. Evidence Ledger Requirements

R7 wajib menghasilkan ledger yang setidaknya mencatat:

- R6 closure PR number/link dan merge commit SHA;
- source dan fresh repository IDs;
- approved human decisions dan pemberi approval;
- backup destination, timestamp, checksum, bundle verification, dan `git fsck` result;
- pre/post-rename repository names;
- exact sorted source/target manifests dan comparison result;
- genesis root commit SHA serta parent/commit-count evidence;
- branch/tag/release inventory;
- validator, link, portability, dan diff-check outputs;
- final GitHub settings snapshot;
- rollback action jika ada.

Ledger adalah evidence untuk R8; keberadaannya tidak menggantikan inspeksi independen.

## 16. Rollback Procedure

Sebelum fresh repository dibuat, kegagalan ditangani dengan rename repository legacy kembali ke nama awal setelah identity dan collision checks.

Setelah fresh repository dibuat, rollback harus non-destructive:

1. hentikan semua push;
2. rename fresh repository ke nama karantina yang tersedia;
3. rename repository legacy kembali ke `lentera-pudar`;
4. verifikasi legacy repository ID tetap `1333750526`;
5. verifikasi default branch, refs, tags, releases, settings, dan remotes;
6. pertahankan fresh repository yang gagal sampai Project Owner memberi keputusan terpisah.

Rollback tidak boleh menghapus atau mengarsipkan salah satu repository secara otomatis.

## 17. Post-R8 Retirement Boundary

Archive, deletion, atau retirement repository legacy berada di luar R7 dan di luar eksekusi otomatis R8. Tindakan tersebut baru boleh dipertimbangkan setelah:

1. R8 memperoleh external acceptance;
2. recovery evidence tetap valid;
3. Project Owner memberi persetujuan eksplisit yang terpisah untuk tindakan dan target spesifik.

Tanpa ketiga kondisi tersebut, repository legacy wajib tetap tersedia, unarchived, dan recoverable.
