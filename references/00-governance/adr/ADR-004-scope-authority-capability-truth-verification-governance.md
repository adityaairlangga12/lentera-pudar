---
id: ADR-004
status: ACCEPTED
type: DECISION_RECORD
authority_scope: governance.authority_verification
canonical: true
owner: architecture-governance
decision_date: 2026-08-18
last_reviewed: 2026-08-18
supersedes: []
superseded_by: null
---

# ADR-004 — Scope-Based Authority, Capability Truth & Verification Governance

## Context

Proyek memiliki banyak dokumen dan lapisan tooling. Hierarki universal antarjenis dokumen serta status linear tunggal dapat membuat desain, availability, execution, dan verification tercampur menjadi klaim penyelesaian yang tidak didukung bukti.

## Decision

### Scope-Based Authority

- Otoritas ditentukan oleh domain dan `authority_scope`, bukan oleh hierarki universal tipe dokumen.
- Setiap scope memiliki pemilik kanonikal yang ditunjukkan pada master index.
- ADR `ACCEPTED` memiliki otoritas hanya untuk keputusan yang dinyatakan secara eksplisit pada scope-nya.
- Jika ADR tidak mengatur suatu fakta, dokumen pemilik kanonikal domain tetap berlaku.
- Konflik yang tidak dapat diselesaikan harus ditandai sebagai `CONFLICT`, bukan diputuskan diam-diam.

### Capability Truth

Status dievaluasi melalui dimensi terpisah:

1. **Maturity / Delivery**: `NOT_STARTED`, `DESIGNED`, `DOCUMENTED`, `IMPLEMENTED`, `EXECUTED`, `VERIFIED`.
2. **Availability**: `AVAILABLE`, `UNAVAILABLE`, `UNKNOWN`.
3. **Disposition / Planning**: `ACTIVE`, `PLANNED`, `DEFERRED`, `CANCELLED`.

Registrasi tool tidak membuktikan implementasi; implementasi tidak membuktikan availability; execution tidak membuktikan target state.

### Verification Governance

Klaim selesai memerlukan seluruh unsur berikut:

```text
VERIFIED = Acceptance Criteria + Observed Target State + Independent Evidence
```

Payload sukses, self-report, path lokal, atau rencana perubahan tidak cukup sebagai bukti target state tanpa observasi yang sesuai domain.

## Consequences

- Project status harus membedakan desain dari implementasi dan availability.
- Laporan kerja harus menyebutkan evidence, asumsi, unknown, conflict, dan blocker secara jujur.
- Master index bertindak sebagai router otoritas, bukan sebagai pengganti seluruh spesifikasi domain.
- Dokumen atau tool yang belum diverifikasi tidak boleh menjadi dasar klaim produksi selesai.

## Related Documents

- [Master Index](../master-index.md)
- [Project Status](../project-status.md)
- [ADR Register](README.md)
- [Root Agent Policy](../../../AGENTS.md)
