---
status: ACTIVE
type: REFERENCE
canonical: false
owner: technical-director
last_reviewed: 2026-08-18
---

# Matematika Tingkat Expert — Lentera Pudar Master Reference
### Acuan Matematika Vektor, Quaternion SLERP, Cubic Bezier, Arc-Length Spline, SDF, & Fractal Noise

> **Dokumen Sumber Kebenaran Matematika Lanjutan (*Advanced Mathematical Reference*)**  
> Memberikan landasan matematis presisi bagi AI Agent dan programmer dalam menyetel rotasi quaternion, kurva kamera, spline level C2, signed distance fields, dan fungsi noise prosedural di **Blender 5.2 LTS + Unreal Engine 5**.

---

## 1. Vektor, Matriks, & Ruang Koordinat
- **Dot Product ($a \cdot b = |a||b|\cos\theta$)**: Mengukur derajat keselarasan arah (Target-lock combat Kaelen & validasi kemiringan lereng lantai).
- **Cross Product ($a \times b$)**: Menghasilkan vektor ortogonal tegak lurus (Perhitungan surface normal pantulan es & kalkulasi sumbu rotasi terpendek).
- **Normalisasi Vektor**: Seluruh vektor arah wajib di-normalisasi ($|v|=1$) sebelum perhitungan shader dan rotasi untuk mencegah artefak overexposure.
- **Hierarki Ruang Koordinat**:
  - *Local/Object Space*: Posisi relatif terhadap pivot mesh (pemodelan/rigging di Blender).
  - *World Space*: Posisi absolut global level (simulasi Chaos Physics & collision).
  - *Camera/View Space*: Posisi relatif terhadap view matrix kamera (post-process & diegetic HUD).

---

## 2. Quaternion & Rotasi Bebas Gimbal Lock
- **Struktur**: $q = w + xi + yj + zk$ merepresentasikan orientasi 3D tanpa risiko *Gimbal Lock* pada sudut ekstrem.
- **SLERP (Spherical Linear Interpolation)**:
  - Interpolasi sudut konstan sepanjang permukaan bola 4D.
  - Wajib digunakan untuk **transisi rotasi kamera sinematik** dan framing naratif Altar Duka.
- **NLERP (Normalized Linear Interpolation)**:
  - Aproksimasi linear yang dinormalisasi, hemat komputasi.
  - Digunakan untuk **blending animasi mikro** berulang (transisi Idle ke Walk).

---

## 3. Interpolasi, Easing & Cubic Bezier sebagai Bahasa Emosi
- **Keluarga Easing**:
  - *Ease-In*: Akselerasi lembut (Pendaran syal Aina mulai meredup).
  - *Ease-Out*: Deselerasi terkontrol (Kamera berhenti presisi pada framing naratif).
  - *Ease-In-Out*: Kurva $S$-curve alami (Transisi kamera duel lock-on).
- **Cubic Bezier Dinamis ($P(t)$)**:
  - **Sektor 2 (Anger)**: Kurva *overshoot lalu settle* (sedikit melampaui target sebelum mengunci) merefleksikan emosi meledak-ledak.
  - **Sektor 4 (Depression)**: Kurva *flat lalu deselerasi curam lambat* merefleksikan kepasrahan dan beban mental berat.

---

## 4. Spline Geometri & Jalur Kamera (Arc-Length & C2 Continuity)
- **Catmull-Rom Spline**: Interpolating spline yang melewati tepat seluruh titik kontrol (Jalur kamera sinematik storyboard).
- **Composite Bezier Spline**: Tangent fleksibel untuk bentuk koridor labirin organik (*Hall of Mirrors*).
- **Arc-Length Reparameterization**:
  - Menghitung ulang parameter $t$ berdasarkan jarak fisik aktual lintasan.
  - Menjamin kecepatan pergerakan kamera tetap konstan di segmen kurva tajam maupun landai.
- **Curvature Continuity (C2)**:
  - Menjamin turunan kedua kurva kontinu di titik sambungan segmen lorong dungeon.
  - Menghilangkan patahan halus visual saat pemain bergerak cepat.

---

## 5. Signed Distance Fields (SDF) Matematis
- **Definisi**: Fungsi jarak bertanda $f(p)$ dengan sifat 1-Lipschitz ($|f(p_1) - f(p_2)| \le |p_1 - p_2|$).
- **Aplikasi Real-Time**:
  - *Sphere Tracing*: Ray marching efisien pada Lumen Global Illumination.
  - *Collision Proxy*: Aproksimasi tabrakan murah untuk partikel pecahan es kasar sebelum fracture detail aktif.
  - *Volumetric Penumbra*: Kalkulasi soft shadow analitik tanpa shadow map beresolusi tinggi.

---

## 6. Noise Functions & Fractal Brownian Motion (fBm)
- **Perlin Noise**: Gradien halus bergelombang (Variasi permukaan lelehan es).
- **Simplex Noise**: Bebas artefak arah, efisien pada 3D/4D (Pergerakan partikel bara lentera `FX_Warmth_Embers`).
- **Worley / Cellular Noise**: Pola partisi sel berbasis jarak (Distribusi retakan es kristal & Voronoi seed).
- **Fractal Brownian Motion (fBm)**:
  - Menumpuk multi-layer oktaf noise dengan rasio frekuensi $2:1$ dan parameter *persistence* terkontrol.
  - Menghasilkan detail retakan multi-skala alami pada shader kristal es Kaelen.

---

## 7. Formalisasi Finite State Machine & Hierarchical AI
- **Automata Formal**: 5-tuple $(S, \Sigma, \delta, s_0, F)$ untuk Character Combat Controller Kaelen ($S = \{\text{Idle}, \text{Attack}, \text{Recovery}\}$).
- **Hierarchical State Machine (HSM) & Behavior Tree**:
  - Mengelompokkan sub-state untuk mencegah ledakan kombinatorial transisi ($S \times S$).
  - Behavior Tree dan HSM merupakan kandidat struktur representasi logika untuk AI musuh dan boss; arsitektur runtime konkret belum diaudit.
