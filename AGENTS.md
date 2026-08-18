# Lentera Pudar — Core Agent Policy & Project Invariants

> **Dokumen Tata Kelola Inti Agen AI (*Global Minimum Context & Core Policy*)**  
> Dokumen ini adalah acuan tata kelola global yang dimuat di setiap sesi kerja AI Asisten Teknis dan Sub-Agent. Dokumen ini menetapkan identitas inti proyek, batasan invarian mutlak, kebijakan integritas teknis, dan pointer rujukan ke dokumen spesifikasi kanonikal. Seluruh detail pengetahuan naratif, numerik, dan prosedural diakses secara dinamis (*on-demand*) merujuk pada [master-index.md](references/00-governance/master-index.md).

---

## 1. Identitas Inti Proyek (*Project Identity — Minimal*)
- **Judul Resmi**: *Lentera Pudar — The First Spark* (Seri Pembuka Semesta Lentera Pudar).
- **Genre & Format**: 3D Third-Person Action-Adventure RPG (Stylized-Realistic / Poetic Dark Fantasy).
- **Target Engine & DCC**: Unreal Engine 5 + Blender 5.2 LTS.
- **Target Platform**: PC Windows (Steam-Ready), Steam Deck, dan Controller Support penuh.
- **Otoritas Desain Master**: [game-design-document.md](references/01-core/game-design-document.md).

---

## 2. Invariant Proyek Kunci (*Critical Project Invariants*)

### A. Invariant Tumpukan Teknologi (*Target Technology Stack*)
- **Target Runtime & DCC**: Unreal Engine 5 + Blender 5.2 LTS untuk pipeline produksi 3D.
- **Batas Status**: Pemilihan stack tidak membuktikan bahwa Unreal project, gameplay systems, atau production assets telah diimplementasikan. Periksa [project-status.md](references/00-governance/project-status.md) untuk current state.
- **Otoritas Keputusan**: [ADR-001 — Primary Runtime & DCC Stack](references/00-governance/adr/ADR-001-primary-runtime-and-dcc-stack.md).

### B. Mandat Anti-RPG Konvensional (*Anti-RPG Progression Guard*)
Seluruh AI Agent DILARANG KERAS merancang, mengusulkan, atau mengimplementasikan mekanik RPG konvensional berikut:
- ❌ **Dilarang Free-Form Skill Tree**: Pembelian poin kemampuan bebas atau pohon bakat non-linear.
- ❌ **Dilarang Stat Leveling Numerik**: Peningkatan atribut angka generik (STR, DEX, INT, HP Pool, Level 1..99).
- ❌ **Dilarang Loot Drop Acak & Gacha**: Grinding koin emas, drop item probabilitas, atau peti harta acak.
- **Model Progresi Kanonikal**: Progresi Kaelen 100% naratif-sekuensial (Model GRIS) terikat pengorbanan Altar Duka 1–5.
- **Otoritas Kanonikal**: [sector-ability-progression.md](references/02-gameplay/sector-ability-progression.md).

---

## 3. Tata Kelola Sumber Kebenaran (*Source-of-Truth Governance*)
- **Otoritas Berbasis Lingkup (*Scope-Based Authority*)**: Otoritas dokumen diatur berdasarkan domain fungsional dan lingkup penentu yang dideklarasikan secara resmi pada [master-index.md](references/00-governance/master-index.md). Tidak ada hierarki dokumen universal sepihak.
- **Batasan Otoritas ADR**: ADR hanya memiliki otoritas keputusan arsitektur jika berstatus `ACCEPTED` dan secara eksplisit mengatur topik/perubahan terkait. Jika tidak, dokumen otoritas kanonikal domain tetap berlaku.
- **Penanganan Konflik (*Conflict Protocol*)**: Jika terdeteksi pertentangan data tanpa resolusi yang jelas, agen dilarang memilih diam-diam; wajib menandai `[CONFLICT]` dan meminta resolusi manusia. Pembuatan atau pembaruan ADR dilakukan HANYA jika resolusi tersebut merepresentasikan keputusan arsitektur atau desain yang memerlukan pencatatan rekam jejak resmi.
- **Batas Inferensi AI**: Asumsi mandiri AI memiliki tingkat otoritas terendah dan dilarang menimpa dokumen spesifikasi tertulis.

---

## 4. Kebijakan Anti-Halusinasi & Integritas Bukti (*Anti-Hallucination Policy*)
- **Larangan Fabrikasi**: Agen dilarang mengarang (*fabricate*) status repositori, isi file, ketersediaan tools, kapabilitas MCP, hasil build/test, keberadaan aset, state Blender/Unreal, atau keputusan desain.
- **Distingsi Status Kebenaran**: Bedakan secara tegas dalam pelaporan:
  - `VERIFIED FACT`: Fakta fisik yang baru saja diperiksa di disk / output tool aktual.
  - `INFERENCE`: Kesimpulan logis berbasis data terverifikasi (wajib dinyatakan sebagai inferensi).
  - `UNKNOWN`: Bukti yang tersedia tidak mencukupi untuk memverifikasi fakta/status (mencakup ketiadaan bukti repositori, runtime state yang tidak dapat diakses, tool yang tidak tersedia, build/test yang belum dieksekusi, atau data yang belum terbukti). Dilarang mengisi celah informasi dengan asumsi.
  - `CONFLICT`: Pertentangan langsung antara dua sumber otoritatif aktif.
- **Otoritas Kebijakan**: [ai-agent-methodology.md](references/06-pipeline-qc/ai-agent-methodology.md).

---

## 5. Kebenaran Kapabilitas (*Capability Truth Policy*)
- **Alur Status Kebenaran**:
  $$\text{DOCUMENTED} \longrightarrow \text{IMPLEMENTED} \longrightarrow \text{AVAILABLE} \longrightarrow \text{EXECUTED} \longrightarrow \text{VERIFIED}$$
- **Distingsi Kritis**: $\text{Tool Registration} \neq \text{Implementation} \neq \text{Server Availability} \neq \text{Execution} \neq \text{Verification}$.
- **Anti-Mock Guard**: Respons payload `{status: "ok"}` dari stub mock HANYA berstatus `EXECUTED` dan dilarang diklaim sebagai mutasi selesai.
- **Hak Klaim Selesai**: Klaim bahwa suatu tugas selesai HANYA sah jika berstatus `VERIFIED`.
- **Otoritas Kanonikal**: [master-index.md](references/00-governance/master-index.md) Bab I (§1.5 & §1.6).

---

## 6. Kebijakan Verifikasi (*Verification Policy*)
- **Formula Verifikasi Baku**:
  $$\text{VERIFIED} = \text{Task Acceptance Criteria} + \text{Observed Target State} + \text{Independent Evidence}$$
- **Standar Bukti Independen**: Bukti fisik wajib disajikan sesuai domain tugas (inspeksi geometri mesh, render screenshot visual, validasi hierarki tulang, build log, atau script link-check).
- **Otoritas Kanonikal**: [qa-qc-framework.md](references/06-pipeline-qc/qa-qc-framework.md).

---

## 7. Prinsip Observability-First (*Inspect Before Mutate*)
- **Inspeksi Sebelum Mutasi**: Agen wajib memeriksa target state yang relevan sebelum melakukan modifikasi file, mesh 3D, atau shader saat lingkungan dan perkakas mendukung inspeksi.
- **Otoritas Kebijakan**: [ai-agent-methodology.md](references/06-pipeline-qc/ai-agent-methodology.md).

---

## 8. Komunikasi & Project-Local Skills
- Komunikasikan asumsi material, batas kemampuan, risiko, bukti, dan blocker secara proporsional tanpa memaksakan seremoni format.
- Skill di [.agents/skills](.agents/README.md) adalah specification repository. Kehadirannya tidak membuktikan skill ter-install atau aktif pada runtime agent.
- `prompt_refinement` dapat digunakan saat runtime secara eksplisit memuat atau memanggilnya; policy inti yang selalu berlaku tetap berada di dokumen ini dan canonical governance.

---

## 9. Manajemen Perubahan & Eksekusi (*Change Management*)
- **Perubahan Terisolasi**: Utamakan perubahan kecil yang dapat ditinjau (*reviewable*).
- **Disiplin Lingkup**: Tentukan batasan file yang boleh diubah, cegah pergeseran lingkup (*scope creep*), dan jangan menyatakan selesai tanpa bukti verifikasi.
- **Otoritas Prosedur**: [sop-workflow.md](references/06-pipeline-qc/sop-workflow.md).

---

## 10. Pengambilan Referensi Dinamis (*Dynamic Reference Routing*)
- **Prinsip Utama**: **Global Minimum Context + Relevant On-Demand Knowledge**.
- Agen dilarang memuat seluruh dokumen sekaligus ke context window. Dokumen referensi dimuat secara selektif per domain tugas merujuk pada peta navigasi dan panduan pencarian dinamis di [master-index.md](references/00-governance/master-index.md).
