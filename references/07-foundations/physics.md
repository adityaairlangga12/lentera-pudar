---
status: ACTIVE
type: REFERENCE
authority_scope: foundations.physics
canonical: false
owner: technical-director
last_reviewed: 2026-08-18
---

# Fisika Tingkat Expert — Lentera Pudar Master Reference
### Acuan Fisika Rigid Body, XPBD Cloth Dynamics, Voronoi Fracture, SPH Fluida, & Light Transport

> **Dokumen Sumber Kebenaran Fisika Lanjutan (*Advanced Physics & Simulation Reference*)**  
> Memberikan dasar mekanika fluida, dinamika kain XPBD, solver impuls tabrakan, dan pemodelan transportasi cahaya untuk **Unreal Engine 5 + Blender 5.2 LTS**.

---

## 1. Rigid Body Dynamics & Sequential Impulse Solver
- **Persamaan Newton-Euler**:
  - Linear: $F = m \cdot a$ (Pergerakan translasi pusat massa).
  - Angular: $\tau = I \cdot \alpha$ (Rotasi berbasis tensor momen inersia objek $I$).
- **Sequential Impulse Solver (Chaos Physics)**:
  - Menyelesaikan tabrakan ratusan pecahan kristal es secara iteratif ($4–10\text{ iterasi/frame}$) demi stabilitas visual tanpa mengorbankan performa 60 FPS.
- **Koefisien Restitusi & Gesekan**:
  - Restitusi $e = 0.1–0.3$ untuk es (pecahan es jatuh berat menyerap energi daripada memantul elastis).
  - Model gesekan *Coulomb Friction Cone Approximation*.

---

## 2. Dinamika Kain XPBD (Extended Position-Based Dynamics)
- **Kelemahan Mass-Spring Klasik**: Rawan ledakan numerik (*jitter/instability*) pada stiffness tinggi.
- **Mekanisme XPBD (Chaos Cloth & Blender Cloth)**:
  - Memanipulasi langsung posisi partikel menggunakan parameter *Compliance* ($\alpha$, invers stiffness).
  - Menjamin kestabilan simulasi pada nilai stiffness berapapun tanpa distorsi mesh.
- **Pemisahan Bending vs Stretching Stiffness**:
  - *Stretching Stiffness* (Kekakuan regangan): Tinggi untuk menjaga integritas geometri kain.
  - *Bending Stiffness* (Kekakuan lipatan): Rendah untuk kelenturan flowing ribbon pada Syal Aina ($0.4–0.6$).
- **Self-Collision Optimization**: Spatial hashing berbasis BVH untuk mencegah lipatan jubah Kaelen menembus dirinya sendiri.

---

## 3. Fracture Mechanics & Voronoi Lattice-Biased
- **Konsentrasi Tegangan (*Stress Concentration*)**:
  - Patahan es memusat di titik tumbukan cakar es Kaelen dengan faktor konsentrasi $K_t$.
- **Voronoi Pre-Fractured System**:
  - Memotong mesh es menjadi potongan rigid body menggunakan komputasi sel Voronoi berbasis seed point.
  - **Lattice-Biased Seed Distribution**: Titik seed disebarkan mengikuti pola kisi kristal alami (bukan distribusi seragam acak batu) untuk menghasilkan pecahan prisma runcing khas es.

---

## 4. Dinamika Fluida Disederhanakan (Real-Time Approximations)
- **Eulerian Grid-Based Approximation**: Solusi murah untuk efek uap dingin dan embun beku.
- **Smoothed Particle Hydrodynamics (SPH Disederhanakan)**: Modul partikel fluida ringan sebagai kandidat simulasi partikel uap dan percikan lentera.
- **Flipbook Textures**: Simulasi fluida offline yang di-bake ke flipbook atlas tekstur planar untuk efek pencairan es berulang tanpa beban komputasi runtime.
- **Shallow Water Equations (SWE)**: Simulasi riak genangan air hasil lelehan es di lantai dungeon.

---

## 5. Light Transport & Cook-Torrance BRDF
- **Rendering Equation Konseptual**:
  $$L_o(x,\omega_o) = L_e(x,\omega_o) + \int_{\Omega} f_r(x,\omega_i,\omega_o) L_i(x,\omega_i) (\omega_i \cdot n) d\omega_i$$
- **Cook-Torrance BRDF**:
  - *Diffuse Term*: Lambertian reflectance dari Base Color PBR.
  - *Specular Term*: Distribusi **GGX / Trowbridge-Reitz**.
  - Roughness es $0.15–0.30$ menghasilkan highlight specular tajam dan terfokus, membedakannya dari batu kasar ($0.70–0.85$).
- **Aproksimasi Global Illumination (Lumen)**:
  - Signed Distance Field (SDF) Tracing untuk indirect lighting jarak jauh.
  - Screen-Space Tracing untuk detail kontak jarak dekat.
  - Surface Cache untuk menyimpan hasil iluminasi global tanpa kalkulasi ulang per frame.

---

## 6. Inverse Kinematics Solvers (CCD vs FABRIK)
- **CCD (Cyclic Coordinate Descent)**: Solver rotasi sendi iteratif bertahap, murah komputasi.
- **FABRIK (Forward And Backward Reaching Inverse Kinematics)**:
  - Bekerja di ruang posisi (Backward Pass dari target + Forward Pass dari pangkal tulang).
  - Konvergensi lebih cepat dan visual lebih stabil untuk Two-Bone Foot IK Kaelen pada kontur dungeon tidak rata.

---

## 7. Prinsip Trade-Off Akurasi vs Performa 60 FPS
Setiap modul fisika real-time adalah **aproksimasi terkalibrasi** yang mengorbankan akurasi analitis demi stabilitas frame rate $60\text{ FPS}$ ($<16.6\text{ ms}$).
