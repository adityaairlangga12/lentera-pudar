---
id: ADR-002
status: ACCEPTED
type: DECISION_RECORD
authority_scope: architecture.production_3d
canonical: true
owner: architecture-governance
decision_date: 2026-08-18
last_reviewed: 2026-08-18
supersedes: []
superseded_by: null
---

# ADR-002 — Full 3D Native Production Architecture

## Context

Karakter, lingkungan, kamera, animasi, pencahayaan, material, dan gameplay perlu dirancang dalam satu ruang produksi 3D yang konsisten. Keputusan lintas-domain ini menentukan bentuk dasar pipeline kreatif dan teknis, sementara detail visual dan gameplay tetap dimiliki spesifikasi domain.

## Decision

Lentera Pudar menggunakan arsitektur produksi **full 3D native** untuk pengalaman third-person action-adventure RPG bergaya stylized-realistic.

Keputusan ini mencakup:

- karakter dan makhluk sebagai mesh serta rig 3D;
- lingkungan dan level sebagai ruang 3D;
- animasi, kamera, pencahayaan, material, VFX, dan interaksi dirancang untuk runtime 3D;
- pipeline authoring aset berpusat pada workflow DCC 3D yang dapat diverifikasi.

## Current Evidence Boundary

Keputusan ini adalah arah produksi dan arsitektur konten. Pada saat diterima, production 3D dan audio assets masih `NOT_STARTED`. Karena itu, ADR ini tidak menyatakan bahwa model, rig, level, material, animasi, VFX, atau asset runtime tertentu sudah tersedia.

## Explicit Non-Decisions

- Parameter numerik visual dan aset tetap dimiliki dokumen spesifikasi domain.
- Teknologi runtime seperti Nanite, Lumen, Niagara, Chaos Cloth, Control Rig, atau World Partition bukan implementasi yang otomatis diterima oleh ADR ini.
- Format file final, LOD strategy runtime, dan kebijakan penyimpanan binary asset memerlukan keputusan berbasis evidence terpisah.

## Consequences

- Spesifikasi karakter, lingkungan, sinematik, dan gameplay harus konsisten dengan produksi serta navigasi ruang 3D.
- Pekerjaan produksi harus membuktikan target state melalui artefak dan inspeksi, bukan hanya melalui keberadaan desain.
- Detail domain tidak perlu dibuat sebagai ADR selama tidak mengubah arsitektur lintas-domain.

## Related Documents

- [Game Design Document](../../01-core/game-design-document.md)
- [Creative Vision](../../01-core/creative-vision.md)
- [3D Asset Pipeline](../../04-art-3d/3d-asset-pipeline.md)
- [Style Guide](../../04-art-3d/style-guide.md)
