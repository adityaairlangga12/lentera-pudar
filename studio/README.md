# Lentera Pudar — Studio OS Integration & Production Lifecycle Foundation (AS5-G3)

This directory contains the project-local declaration, configuration, and file-backed lifecycle schema foundation for integrating **Lentera Pudar — The First Spark** with **AI Game Dev Studio OS**.

---

## 1. Architectural Context & Dependency Direction

The integration strictly adheres to the one-way dependency direction established in [ADR-044](../references/00-governance/adr/ADR-044-lentera-studio-integration-production-lifecycle-architecture.md) and [ai-studio-semantic-architecture.md](../references/00-governance/ai-studio-semantic-architecture.md):

```text
Studio OS Generic Contracts / Runtime / Control Plane (ai-game-dev-studio-os)
                                ↓
         Project Integration Configuration (lentera-pudar/studio)
                                ↓
               Lentera Pudar Game Production & Lifecycle
```

- **Studio OS** (`adityaairlangga12/ai-game-dev-studio-os`) owns generic contracts, schemas, registries, validators, capability assessment, runtime composition, and generic orchestration boundaries.
- **Lentera Pudar** (`adityaairlangga12/lentera-pudar`) owns project-specific integration configuration, production domain routing, file-backed lifecycle records, and project acceptance authority.

---

## 2. Supporting Studio OS Dependency Lock

The integration is pinned to the exact accepted Studio OS AS5-G2 lock:

- **Repository**: `adityaairlangga12/ai-game-dev-studio-os`
- **Commit**: `c981fe506495fcb124f1080cbe1fc0547fae0032`
- **Package Name**: `ai-game-dev-studio-os`
- **Package Version**: `0.1.0`

This lock represents a declarative dependency and provenance record. It is **not** an assertion of live network connectivity, runtime availability, or server registration.

---

## 3. Project Configuration Root

- [project-integration.json](project-integration.json): Project-local declaration root defining the Lentera `ProjectDescriptor` instance, five production domain routes, an empty artifact catalog, and declared lifecycle storage roots.
- [project-integration.schema.json](project-integration.schema.json): Project-local JSON Schema Draft 2020-12 validating the configuration root against Studio OS contract references and project invariants.

---

## 4. Production Domain Routes

Lentera defines exactly five canonical production domain routes:

| Production Domain ID | Domain Key | Label | Canonical Authority Target | Scope / Focus |
|---|---|---|---|---|
| `production-domain.art-3d` | `art-3d` | 3D Art | [references/04-art-3d/](../references/04-art-3d/) | 3D visual art, assets, biomechanics, modular techniques |
| `production-domain.audio` | `audio` | Audio | [references/06-pipeline-qc/sop-workflow.md](../references/06-pipeline-qc/sop-workflow.md) | SOP 7 — adding new audio (music/whisper/SFX) |
| `production-domain.narrative` | `narrative` | Narrative | [references/03-narrative/](../references/03-narrative/) | Story, script, dialogue direction, cinematics |
| `production-domain.gameplay` | `gameplay` | Gameplay | [references/02-gameplay/](../references/02-gameplay/) | Progression, combat, level design, enemy balancing |
| `production-domain.qa-qc` | `qa-qc` | QA/QC | [references/06-pipeline-qc/qa-qc-framework.md](../references/06-pipeline-qc/qa-qc-framework.md) | Quality assurance, Definition of Done, verification contracts |

> **Invariant**: $\text{ProductionDomain} \neq \text{Role}$. Routing is navigational and declarative; it does not duplicate domain specifications.

---

## 5. File-Backed Lifecycle Schema Foundation

The [lifecycle/schemas/](lifecycle/schemas/) directory establishes JSON Schema Draft 2020-12 specifications for project-local, file-backed lifecycle tracking:

1. [work-order.schema.json](lifecycle/schemas/work-order.schema.json): Bounded execution authorization contracts defining objectives, workspace, allowed/forbidden paths, acceptance criteria, and owner authorization.
2. [trace.schema.json](lifecycle/schemas/trace.schema.json): Execution provenance and observed context linked to Work Orders ($\text{Trace} \neq \text{Verification} \neq \text{Acceptance}$).
3. [handoff.schema.json](lifecycle/schemas/handoff.schema.json): Formal transfer records between ProductionDomains ($\text{Handoff existence} \neq \text{Downstream acceptance}$).
4. [passport.schema.json](lifecycle/schemas/passport.schema.json): Portable lifecycle summaries of logical Artifact provenance ($\text{Passport} \neq \text{Artifact}$; $\text{Passport existence} \neq \text{Artifact acceptance}$).
5. [artifact-lifecycle-record.schema.json](lifecycle/schemas/artifact-lifecycle-record.schema.json): Fail-closed lifecycle state machine enforcing strict evidence requirements (`DRAFT` $\rightarrow$ `VERIFIED` $\rightarrow$ `ACCEPTED`).

---

## 6. Declared State & Non-Goals

- **Empty Artifact Catalog**: `artifactCatalog` is intentionally `[]`. AS5-G3 foundation existence does not imply production game assets exist.
- **Declared Storage Roots Only**: Future record roots (`studio/lifecycle/records/*`) are declared in configuration. No production records or placeholder files are created at this gate.
- **No External Control-Plane Execution**: No `ControlPlaneAdapter` or `ControlPlaneOrchestrator` execution is implemented at AS5-G3.
- **No Operational Evidence Bridge**: Bridging execution receipts to operational evidence is deferred to AS5-G4.
- **No Blender / Unreal Dispatch**: No external process dispatch, Blender MCP server, or Unreal Engine integration is implemented or configured.
- **Gate Boundaries**: AS5-G4 and AS5-G5 remain `NOT_STARTED`. Phase H1 remains `BLOCKED`.
