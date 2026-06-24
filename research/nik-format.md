## Format NIK

NIK = 16 digit
- 6 digit kode wilayah
- 6 digit tanggal lahir
- 4 digit urutan

Kode Wilayah (6 Digit Pertama):
- 2 digit pertama menunjukkan kode Provinsi tempat NIK pertama kali didaftarkan.
- 2 digit selanjutnya adalah kode Kabupaten/Kota.
- 2 digit selanjutnya adalah kode Kecamatan.

Tanggal Lahir (6 Digit Kedua):
- 2 digit tanggal: Untuk laki-laki ditulis sesuai tanggal lahir (01-31), sedangkan untuk perempuan tanggal lahir ditambah angka 40 (41-71). (Contoh: Perempuan lahir tanggal 12, maka tertulis 52).
- 2 digit bulan: Menunjukkan bulan lahir (01-12).
- 2 digit tahun: Menunjukkan dua digit terakhir tahun kelahiran.

Nomor Urut (4 Digit Terakhir): Merupakan nomor antrean atau nomor urut yang dihasilkan secara otomatis oleh sistem komputerisasi guna memastikan tidak ada NIK yang sama.

regex validasi: /^[0-9]{16}$/