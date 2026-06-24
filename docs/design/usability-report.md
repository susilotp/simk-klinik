Laporan simulasi **Usability Testing (UT)** untuk prototipe Sistem Informasi Manajemen Klinik (SIMK) ini disusun berdasarkan langkah-langkah teknis yang ditetapkan dalam panduan eksekusi proyek. Sesi ini melibatkan 3 calon pengguna (Perawat, Dokter, dan Kasir) dengan durasi masing-masing 30 menit menggunakan rekaman layar Loom.

### **1. Skenario dan Metodologi Pengujian**
Pengujian dilakukan terhadap prototipe *High-Fidelity* yang mencakup alur *State Machine* dari pendaftaran hingga selesai.
*   **Peserta:** 1 Perawat (Dewi), 1 Dokter (Andi), 1 Kasir (Rina).
*   **Alat:** Figma Prototype, Loom Screen Recording.
*   **Tugas Utama:**
    1.  Melakukan registrasi pasien baru dengan validasi NIK 16 digit.
    2.  Menginput tanda-tanda vital (TTV) dan memverifikasi *auto-flagging* skala triase.
    3.  Mengisi rekam medis SOAP, mencari diagnosis ICD-10, dan membuat e-resep.
    4.  Memproses pembayaran tunai menggunakan kalkulator kembalian otomatis.

### **2. Rekapitulasi Task Completion Rate (TCR)**

| Task | Deskripsi | Success Rate | Catatan |
| :--- | :--- | :---: | :--- |
| **T1** | Registrasi & Validasi NIK | 100% | Validasi NIK real-time sangat membantu akurasi. |
| **T2** | Input TTV & Auto-Triage | 67% | Pengguna sempat bingung saat sistem mengunci warna secara otomatis. |
| **T3** | SOAP & E-Resep | 100% | Pencarian *search-as-you-type* pada ICD-10 sangat efisien. |
| **T4** | Pembayaran & Struk WA | 100% | Fitur kirim struk via WhatsApp dianggap sangat inovatif. |

**Rata-rata Task Completion Rate: 91,7%**

### **3. Temuan Usability (Pain Points)**
Berdasarkan analisis rekaman Loom, ditemukan beberapa kendala yang dialami pengguna:
*   **Alergi Kurang Mencolok:** Dokter melaporkan bahwa label "Alergi" pada bagian atas layar pemeriksaan sudah ada, namun warnanya kurang interuptif untuk mencegah *medication error*.
*   **Klik Berlebihan (*Click-Heavy*):** Dokter merasa navigasi antar tab (SOAP ke E-Resep) memerlukan terlalu banyak klik; disarankan menggunakan tampilan *single-page* yang terintegrasi.
*   **Konfirmasi Auto-Flagging:** Perawat menyarankan adanya pop-up konfirmasi sebelum status pasien berubah menjadi "P1-Merah" agar tidak terjadi kesalahan input yang memicu alarm palsu di layar dokter.
*   **NIK Error State:** Pengguna meminta border warna merah pada kolom NIK menjadi lebih tebal saat digit kurang dari 16 agar lebih terlihat jelas.

### **4. Iterasi Desain (Hasil Perbaikan)**
Berdasarkan temuan di atas, prototipe diperbarui dengan langkah-langkah berikut:
1.  **Red Flag Alert:** Menambahkan efek berkedip (*blinking*) pada peringatan Alergi Obat di layar Dokter untuk menjamin *patient safety*.
2.  **Integrated View:** Mengubah layout modul Dokter menjadi satu halaman panjang (*Single Page Application*) agar pengisian SOAP, Diagnosis, dan Resep dapat dilakukan hanya dengan satu kali *scroll*.
3.  **UI NIK:** Meningkatkan ketebalan border input NIK dari 1px menjadi 2px saat terjadi *error* validasi regex `/^{16}$/`.
4.  **Confirm Modal:** Menambahkan modal konfirmasi "Apakah Anda yakin menetapkan skala P1/Merah?" pada modul Triase untuk mengurangi subjektivitas dan kesalahan operasional.

Hasil iterasi ini akan dipresentasikan kepada Direktur Klinik untuk mendapatkan *sign-off* akhir sebelum masuk ke Fase 2 (Frontend Development).