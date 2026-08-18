---
status: ACTIVE
type: TOOL_CONTRACT
authority_scope: pipeline.api_contract
canonical: false
last_reviewed: 2026-08-18
---


# API Cheat Sheet — Blender MCP Hardened-v1

Panduan ini berisi contoh pemanggilan representatif. Kontrak dan status kemampuan tetap dimiliki [tools-mcp-stack.md](tools-mcp-stack.md). Contoh tidak membuktikan bahwa file, objek, atau hasil eksekusi sudah ada.

Gunakan `<PROJECT_ROOT>` sebagai placeholder dokumentasi. Saat eksekusi, resolve menjadi path absolut pada host aktif.

---

## 1. Pola Pemanggilan Perkakas Blender MCP (23 Public Tools)

### A. Inisialisasi Scene Baru & Pembuatan Mesh
```json
// Tool: create_mesh_primitive
{
  "type": "cylinder",
  "size": 2.0,
  "name": "SM_IceCrystal_Base",
  "output_blend_file": "<PROJECT_ROOT>/Assets/Models/SM_IceCrystal_Base.blend"
}
```

### B. Mutasi Geometri & Modifier pada File Eksis
```json
// Tool: apply_modifier
{
  "blend_file": "<PROJECT_ROOT>/Assets/Models/SM_IceCrystal_Base.blend",
  "object": "SM_IceCrystal_Base",
  "modifier_type": "BEVEL",
  "params": {
    "width": 0.05,
    "segments": 2
  }
}
```

### C. Pembersihan Geometri & Penggabungan Vertex
```json
// Tool: merge_by_distance
{
  "blend_file": "<PROJECT_ROOT>/Assets/Models/SM_IceCrystal_Base.blend",
  "object": "SM_IceCrystal_Base",
  "threshold": 0.001
}
```

### D. UV Unwrapping
```json
// Tool: unwrap_uv
{
  "blend_file": "<PROJECT_ROOT>/Assets/Models/SM_IceCrystal_Base.blend",
  "object": "SM_IceCrystal_Base",
  "method": "SMART_PROJECT"
}
```

### E. Observasi & Inspeksi Geometri Independen
```json
// Tool: get_mesh_stats
{
  "blend_file": "<PROJECT_ROOT>/Assets/Models/SM_IceCrystal_Base.blend",
  "object": "SM_IceCrystal_Base"
}
```

### F. Pembangunan Skeleton Bersih (Clean Armature & Rigging)
```json
// 1. Buat Armature Bersih (0 tulang / zero bones)
// Tool: create_armature
{
  "name": "SK_Kaelen_Rig",
  "output_blend_file": "<PROJECT_ROOT>/Assets/Models/SK_Kaelen_Rig.blend"
}

// 2. Tambah Tulang Root
// Tool: add_bone
{
  "blend_file": "<PROJECT_ROOT>/Assets/Models/SK_Kaelen_Rig.blend",
  "armature": "SK_Kaelen_Rig",
  "name": "Bone_Root",
  "head": [0.0, 0.0, 0.0],
  "tail": [0.0, 0.0, 1.0]
}

// 3. Tambah Tulang Child dengan Head Snapping
// Tool: add_bone
{
  "blend_file": "<PROJECT_ROOT>/Assets/Models/SK_Kaelen_Rig.blend",
  "armature": "SK_Kaelen_Rig",
  "name": "Bone_Spine",
  "parent": "Bone_Root",
  "head": [0.0, 0.0, 1.0],
  "tail": [0.0, 0.0, 1.5],
  "use_connect": true
}

// 4. Set Sudut Roll Kanonikal (Radian)
// Tool: set_bone_roll
{
  "blend_file": "<PROJECT_ROOT>/Assets/Models/SK_Kaelen_Rig.blend",
  "armature": "SK_Kaelen_Rig",
  "bone": "Bone_Spine",
  "angle_rad": 1.570796
}

// 5. Inspeksi State Armature
// Tool: get_armature_state
{
  "blend_file": "<PROJECT_ROOT>/Assets/Models/SK_Kaelen_Rig.blend",
  "armature": "SK_Kaelen_Rig"
}
```

### G. Ekspor glTF 2.0 & Validasi Biner Terverifikasi
```json
// 1. Ekspor Scene ke GLB
// Tool: export_gltf
{
  "blend_file": "<PROJECT_ROOT>/Assets/Models/SM_IceCrystal_Base.blend",
  "path": "<PROJECT_ROOT>/Artifacts/SM_IceCrystal_Base.glb",
  "overwrite": true
}

// 2. Validasi Independen Struktur Biner Artefak
// Tool: validate_export
{
  "path": "<PROJECT_ROOT>/Artifacts/SM_IceCrystal_Base.glb",
  "expected_nodes": ["SM_IceCrystal_Base"],
  "require_meshes": true
}
```

> [!IMPORTANT]
> **Prinsip Verifikasi**: Respons eksekusi `export_gltf` HANYA membuktikan operator selesai berjalan (`EXECUTED`). Status `VERIFIED` wajib didukung oleh bukti fisik dari pemanggilan `validate_export`.

---

## 2. Future Reference — Unreal Python (`unreal`)

> **Current-state gate:** Unreal project dan Unreal MCP belum tersedia. Contoh di bawah hanya design reference, belum dieksekusi, dan wajib diperiksa ulang terhadap versi engine yang kelak dikunci.

### A. Asset Import Otomatis (SOP 1, Langkah 11)
```python
import unreal

task = unreal.AssetImportTask()
task.filename = "<PROJECT_ROOT>/Artifacts/SM_IceCrystal_Base.glb"
task.destination_path = "/Game/Props/IceCrystal"
task.destination_name = "SM_IceCrystal_01"
task.automated = True
task.save = True
task.replace_existing = True

unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks([task])
```

### B. Material Instance & MPC Binding (SOP 2, Langkah 6)
```python
# Create Material Instance
mi_factory = unreal.MaterialInstanceConstantFactoryNew()
asset_tools = unreal.AssetToolsHelpers.get_asset_tools()
mi = asset_tools.create_asset("MI_IceCrystal_01", "/Game/Materials", unreal.MaterialInstanceConstant, mi_factory)

# Bind Parent Master Material
master_mat = unreal.EditorAssetLibrary.load_asset("/Game/Materials/M_Cursed_Crystal")
unreal.MaterialEditingLibrary.set_material_instance_parent(mi, master_mat)
unreal.MaterialEditingLibrary.set_material_instance_scalar_parameter_value(mi, "Roughness", 0.22)

# Update Material Parameter Collection (MPC_CurseMeter)
mpc = unreal.EditorAssetLibrary.load_asset("/Game/Materials/MPC_CurseMeter")
unreal.MaterialEditingLibrary.set_material_parameter_collection_scalar_parameter_value(mpc, "Curse_Spread", 0.65)
```

### C. Level Construction & Spawning Actors (SOP 5)
```python
mesh_asset = unreal.EditorAssetLibrary.load_asset("/Game/Props/IceCrystal/SM_IceCrystal_01")
spawn_loc = unreal.Vector(0.0, 0.0, 0.0)
spawn_rot = unreal.Rotator(0.0, 0.0, 0.0)

actor = unreal.EditorLevelLibrary.spawn_actor_from_object(mesh_asset, spawn_loc, spawn_rot)
actor.set_actor_scale3d(unreal.Vector(1.0, 1.0, 1.0))
```

### D. Automated High-Resolution Screenshot (Visual Review Gate)
```python
unreal.AutomationLibrary.take_high_res_screenshot(1920, 1080, "QC_Review_Sector01_Altar.png")
```

## 3. Known Verification Limit

`render_viewport_screenshot` pada Blender MCP berstatus `VERIFICATION_FAILED` berdasarkan integration test 2026-08-18. Jangan menjadikannya jalur bukti wajib sampai regression test kembali lulus.
