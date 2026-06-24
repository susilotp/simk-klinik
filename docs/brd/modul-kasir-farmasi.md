### 4 Metode Pembayaran Utama

Sistem harus mampu mencatat dan memvalidasi empat metode pembayaran ini secara real-time:
- Tunai (Cash): 

    Metode paling klasik. Sistem wajib menyediakan fitur Kalkulator Kembalian otomatis untuk menghindari salah hitung.
- Debit / Kredit (EDC): 
    
    Membutuhkan input Nomor Referensi (Ref/Trace Number) dari mesin EDC ke dalam sistem sebagai bukti rekonsiliasi bank di akhir shift.
- QRIS / Digital Wallet: 
    
    Sistem sebaiknya mendukung Dynamic QRIS (nominal langsung muncul di HP pasien). Jika menggunakan Static QRIS, kasir harus bisa mengunggah atau mencentang konfirmasi bayar.
- Asuransi / Penjamin (Corporate): 
    
    Pasien tidak bayar di tempat, tetapi tagihan dialihkan ke pihak ketiga. Sistem harus mengunci plafon (limit) asuransi pasien dan mencatat statusnya sebagai Piutang Klinik.

### Format Kwitansi (Receipt Format)

Format yang ideal harus mencakup:
- Header Klinik
    - Nama Klinik, Logo, Alamat, dan Nomor Telepon.
    - Nomor Kwitansi (Generated otomatis, misal: INV/20260624/001).
    - Tanggal & Waktu Transaksi.
    - Nama Kasir yang bertugas.
- Data Pasien
    - Nomor Rekam Medis (No. RM) & Nama Pasien.
    - Nama Dokter yang menangani.
    
Rincian Biaya (Itemized Billing)

|Deskripsi|Qty|Harga Satuan|Subtotal|
|-|-|-|-|
|Jasa Konsultasi Dokter Umum|1|Rp 50.000|Rp 50.000|
|Tindakan: Rawat Luka Ringan|1|Rp 75.000|Rp 75.000|
|Obat: Paracetamol 500mg|10|Rp 500|Rp 5.000|
|Obat: Amoxicillin 500mg|10|Rp 1.500|Rp 15.000|

Footer & Pengesahan
- Total Tagihan: Rp 145.000
- Metode Bayar: Tunai (Bayar: Rp 150.000 | Kembali: Rp 5.000)
- Status: LUNAS
- Tanda Tangan Kasir & Cap Klinik.

### Manajemen Stok Obat (Inventory)

Sistem informasi harus mengakomodasi:
- Multi-Satuan (UOM): 
    
    Obat dibeli dalam bentuk Box/Botol, tapi dijual ke pasien dalam bentuk Strip, Tablet, atau PCS. Sistem harus otomatis mengonversi stok (misal: 1 Box = 10 Strip = 100 Tablet).
- Metode FIFO (First In, First Out): 
    
    Obat yang masuk duluan harus dikeluarkan duluan agar tidak kedaluwarsa di gudang.
- Tracking Batch & Expiry Date: 
    
    Setiap obat yang diinput harus memiliki nomor batch dan tanggal kedaluwarsa. Saat kasir melakukan scanning atau input obat, sistem otomatis memotong batch yang paling mendekati expired.

### Minimum Stock Alert (Peringatan Stok Minimum)

Fitur ini krusial agar klinik tidak kehabisan obat esensial (seperti paracetamol atau antibiotik umum).
- Sistem Buffer Stock: 
    
    Setiap obat diatur batasan minimalnya (misal: Amoxicillin minimal 50 tablet).
- Notifikasi Visual: 
    
    Ketika stok menyentuh angka 50, sistem akan memunculkan warna Kuning (Warning) di dashboard apotek/logistik. Jika menyentuh angka 0, warna berubah menjadi Merah (Out of Stock) dan sistem otomatis mengunci obat tersebut agar tidak bisa diresepkan oleh dokter.
- Auto-Purchase Request: 
    
    Sistem bisa otomatis membuat draf surat pemesanan (PO) ke vendor ketika stok menyentuh batas minimum.

### Dokumentasi Formula Harga
Setiap transaksi di kasir merupakan akumulasi dari tiga komponen utama. Komponen obat biasanya melibatkan margin (keuntungan) dan biaya jasa peracikan (tuslah atau embalase).
$$Total\ Bill = Biaya\ Konsultasi + Total\ Biaya\ Tindakan + Total\ Harga\ Obat$$
Di mana rumus untuk Total Harga Obat adalah:
$$Total\ Harga\ Obat = \sum \left( (Harga\ Beli\ Obat \times (1 + Margin)) \times Qty \right) + Biaya\ Embalase$$
Catatan Rumus:
- Margin: 
    
    Biasanya berkisar antara 15% - 25% tergantung kebijakan klinik.
- Biaya Embalase/Tuslah: 
    
    Biaya jasa peracikan obat puyer/kapsul atau biaya plastik klip (misal: Rp 2.000 per resep).

### Pain Point (Kendala Lapangan) Kasir Klinik
- Antrean Mengular Karena Sistem Lemot: 
    
    Proses loading data resep dari komputer dokter ke komputer kasir memakan waktu lama. Pasien yang sakit menjadi tidak sabar.
- Resep Dokter Tidak Terbaca/Tidak Sinkron: 
    
    Dokter salah input resep atau inputan dokter tidak muncul di layar kasir/apotek, sehingga kasir harus bolak-balik konfirmasi manual ke ruang dokter.
- Selisih Stok Fisik vs Sistem: 
    
    Di sistem tertera obat masih ada 10, tetapi saat dicari di rak apotek ternyata fisik obatnya habis. Ini mengacaukan proses pembayaran transaksi yang sudah terlanjur diproses.
- Laporan Closing Shift yang Rumit: 
    
    Di akhir shift, kasir sering stres jika uang tunai di laci tidak cocok dengan laporan sistem akibat pembulatan harga yang tidak konsisten atau pencatatan non-tunai yang tercecer.