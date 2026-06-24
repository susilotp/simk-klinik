### Alur Rekam Medis
Alur rekam medis yang baik harus mencerminkan perjalanan pasien di klinik secara linier, seamless, dan meminimalkan waktu tunggu.

```[Pasien Datang] ──> [Pendaftaran / Antrean] ──> [Tanda Vital & Asesmen Awal (Perawat)]```

```[Kasir & Farmasi] <── [Selesai Pelayanan] <── [Pemeriksaan, Diagnosis & Terapi (Dokter)]```

Detail Tahapan:

1. Pendaftaran (Registrasi/Check-in): Petugas mencatat identitas pasien atau memindai kartu (BPJS/KTP). Status antrean otomatis masuk ke dashboard perawat dan dokter.
2. Pemeriksaan Awal (Triage/Asesmen Keperawatan): Perawat mengisi tanda-tanda vital (Tensi, Nadi, Suhu, RR) dan keluhan utama. Data ini harus langsung mengalir ke layar dokter.
3. Pemeriksaan Medis (Dokter): Dokter melakukan SOAP (Subjective, Objective, Assessment, Plan). Di sinilah integrasi ICD-10, tindakan, dan resep terjadi.
4. Finalisasi & Integrasi Downstream: Begitu dokter menekan tombol "Selesai", resep langsung terkirim ke bagian Farmasi, dan tagihan tindakan langsung terkirim ke Kasir. Pasien tidak perlu membawa kertas bolak-balik.

### Struktur Data Utama
Untuk mempermudah tim developer, berikut adalah struktur logis yang dibutuhkan dokter saat menginput data klinis:

A. ICD-10 Diagnosis

Struktur harus mendukung pencarian cepat (bisa berdasarkan kode atau teks nama penyakit) karena dokter tidak menghafal semua kode.
- Hierarki: Kode Utama (3 digit, misal: A09 untuk Diare) -> Sub-kode (4 digit, misal: A09.9 Gastroenteritis & kolitis infeksius).
- Atribut Khusus: Harus ada pembeda antara Diagnosis Utama (Primary) dan Diagnosis Sekunder/Penyerta (Secondary/Comorbidity).

B. Tindakan (Prosedur/ICD-9-CM)
- Struktur: Kode Tindakan, Nama Tindakan, Pelaksana (Dokter/Perawat), Jumlah, dan Tarif.
- Kebutuhan: Terhubung langsung dengan billing kasir dan inventaris bahan medis habis pakai (BMHP) yang digunakan saat tindakan (misal: jarum suntik, kassa).

C. Resep Multi-Item

Struktur resep harus fleksibel namun ketat untuk mencegah salah obat (medication error).
Setiap Resep (Header) memiliki relasi one-to-many dengan Item Resep (Detail):
- Nama Obat & Sediaan: (Contoh: Paracetamol 500mg Tab)
- Jumlah/Kuantitas: (Contoh: 10 tablet)
- Aturan Pakai (Signa): Harus terstruktur, jangan teks bebas penuh. Contoh komponen: Frekuensi (3x sehari), Dosis (1 tablet), Waktu (sebelum/sesudah makan), Keterangan (jika demam, habiskan).
- Jenis Resep: Pembeda antara Resep Non-Racikan dan Resep Racikan (memiliki sub-item obat, nama racikan, dan metode sediaan seperti puyer/kapsul).

### Identifikasi Kebutuhan Cetak (Output)

Meskipun sistemnya digital, dokumen fisik (atau PDF untuk dikirim via WhatsApp/Email) tetap wajib ada untuk keperluan legalitas dan pihak ketiga.
- Surat Sakit (Surat Keterangan Istirahat):
    - Data yang ditarik: Nama pasien, umur/tanggal lahir, pekerjaan, jumlah hari istirahat (terhitung tanggal A s.d tanggal B).
    - Catatan Penting: Jangan menampilkan diagnosis ICD-10 secara gamblang di surat sakit untuk menjaga privasi pasien (rahasia medis), kecuali atas permintaan tertulis pasien atau instansi tertentu. Cukup nyatakan "dalam kondisi sakit dan butuh istirahat".
- Surat Rujukan (Internal/Eksternal):
    - Data yang ditarik: Identitas pasien, Rumah Sakit/Faskes tujuan, Poli spesialis tujuan, Anamnesis singkat, Hasil pemeriksaan fisik/penunjang, Diagnosis utama, Obat/tindakan yang sudah diberikan, dan alasan merujuk.
- Nota Resep (Untuk Farmasi/Pasien):
    - Data yang ditarik: Nomor resep, nama dokter, nama & umur pasien, daftar obat + aturan pakai, dan penanda "Iter" (jika resep bisa diulang).

### Pain Point
Jika Anda ingin sistem ini dicintai oleh dokter dan staf klinik, selesaikan masalah-masalah klasik berikut:
- Pencarian ICD-10 dan Obat yang Lambat:

    Dokter hanya punya waktu beberapa menit per pasien. Jika mencari obat atau kode diagnosis harus mengetik lengkap atau loading-nya lama, dokter akan kembali menggunakan kertas. Solusi: Gunakan fitur auto-complete/search-as-you-type yang pintar.
- Input Berulang (Miskin Fitur Template):

    Penyakit di klinik seringkali berulang (misal: ISPA, Gastritis, Hipertensi). Dokter benci mengetik resep dan SOAP yang sama ratusan kali.
    Solusi: Buat fitur "Template Resep/Paket Obat" atau "Kloning Rekam Medis" dari kunjungan sebelumnya. Sekali klik, resep standar ISPA langsung terisi.
- Alergi Obat yang Tidak Terlihat Jelas:

    Ini masalah patient safety. Jika pasien memiliki alergi obat (misal: Alergi Amoxicillin), peringatan ini harus muncul dengan warna merah mencolok di bagian atas layar resep. Sistem harus menolak atau memberi alert keras jika dokter tidak sengaja meresepkan obat tersebut.
- Sistem "Click-Heavy" (Terlalu Banyak Klik):

    Antarmuka yang mengharuskan dokter membuka 3-4 pop-up window hanya untuk menyelesaikan satu resep sangatlah melelahkan. Usahakan alur pengisian SOAP, Diagnosis, dan Resep berada dalam satu halaman terintegrasi (Single Page Application / Tabbed View).