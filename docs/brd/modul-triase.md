### SOP Triase 
SOP Triase di klinik harus cepat, objektif, dan tidak memicu bottleneck. Menggunakan sistem Emergency Severity Index (ESI) atau Australasian Triage Scale (ATS) yang dimodifikasi untuk faskes tingkat pertama adalah pilihan terbaik.

Alur SOP di dalam Sistem:
- Skrining Visual & Keluhan Utama (< 2 Menit): Begitu pasien datang, perawat melakukan penilaian visual cepat (apakah pasien bernapas? sadar? kejang?). Input keluhan utama ke sistem.
- Pemeriksaan Tanda Vital Sign (TTV): Sistem harus mengwajibkan input vital sign dasar sebelum menentukan kategori triase.
- Pengambilan Keputusan Otomatis (Decision Support): Sistem secara otomatis memberikan rekomendasi warna/skala triase berdasarkan algoritma input TTV dan keluhan.
- Alokasi Ruangan & Notifikasi: Pasien otomatis masuk ke antrean dokter sesuai urgensi (Merah langsung ke ruang tindakan, Kuning ke bed observasi, Hijau ke antrean poli reguler).

### Parameter Vital Sign & Penentuan Skala Urgensi
Di klinik, kita membagi urgensi menjadi 4 atau 5 skala (umumnya menggunakan sistem 4 warna agar lebih praktis di klinik non-RSUD). Berikut adalah parameter yang wajib dicatat di sistem dan bagaimana sistem harus memetakan skalanya:

Parameter Vital Sign Wajib:
- Laju Pernapasan (Respiratory Rate / RR): Parameter paling sensitif untuk mendeteksi perburukan kondisi.
- Saturasi Oksigen ($SpO_2$): Wajib, terutama untuk kasus anak dan lansia dengan keluhan respirasi.
- Denyut Nadi (Heart Rate / HR): Menilai kekuatan dan keteraturan ritme jantung.
- Tekanan Darah (Blood Pressure / BP): Menilai syok atau krisis hipertensi.
- Suhu Tubuh (Temperature): Menilai infeksi/sepsis atau kejang demam pada anak.
- Tingkat Kesadaran (GCS / AVPU): Alert (Sadar), Voice (Respon suara), Pain (Respon nyeri), Unresponsive (Tidak sadar).

### Tabel Penentuan Skala Urgensi (Logika untuk Sistem):
|Parameter|P1 - MERAH (Resusitasi / Gawat Darurat)|P2 - KUNING (Emergency / Urgen)|P3 - HIJAU (Non-Urgen / Rawat Jalan)|P4 - HITAM (Meninggal)|
|-|-|-|-|-|
|Kesadaran (AVPU)|Unresponsive (U) atau hanya respon Nyeri (P)|Respon Suara (V) atau Bingung/Gelisah|Alert (A) / Sadar Penuh|Tanda pasti kematian|
|Jalan Napas|Sumbatan total / Stridor berat|Paten, tapi ada sesak/mengi|Paten, Normal|Tidak ada|
|Laju Napas (RR)|$< 10$ atau $> 30$ x/menit|$24 - 30$ x/menit|$12 - 20$ x/menit|Tidak ada|
|Saturasi ($SpO_2$)$|< 92\%$ (Tanpa oksigen)|$92\% - 94\%$|$> 95\%$|Tidak terdeteksi|
|Nadi (HR)|$< 50$ atau $> 130$ x/menit|$110 - 130$ x/menit|$60 - 100$ x/menit|Tidak ada|
|Tekanan Darah|Sistolik $< 90$ mmHg atau Krisis ($> 220$ mmHg)|Sistolik $160 - 180$ mmHg atau Diastolik $> 100$ mmHg|Normal ($120/80$ mmHg)|Tidak terdeteksi|

Sistem auto-flagging: jika perawat memasukkan angka RR: 32, sistem langsung otomatis mengunci status pasien ke P1/Merah, tanpa menunggu perawat berpikir lama.

### Pain Points
- Pemberian Label Triase yang Subjektif: Perawat junior dan senior bisa berbeda persepsi jika tidak ada panduan baku.
    - Solusi Sistem: Sistem harus mengunci keputusan warna triase berdasarkan skor objektif (seperti tabel di atas), bukan sekadar pilihan drop-down bebas.
- Fenomena "Under-Triage" atau "Over-Triage": Pasien yang terlihat tenang padahal sedang syok (misal: syok sepsis stadium awal) salah dimasukkan ke zona hijau. Atau sebaliknya, zona merah penuh oleh pasien yang hanya panik.
    - Solusi Sistem: Berikan fitur "Red Flag Alerts" di sistem. Jika ada kombinasi keluhan tertentu (misal: Nyeri Dada menjalar + Riwayat Jantung), sistem langsung menaikkan status ke Kuning/Merah terlepas dari vital sign yang tampak normal.
- Komunikasi yang Putus ke Dokter (Missed Communication): Perawat sudah menaruh pasien di bed tindakan, tapi dokter di dalam poli tidak tahu ada pasien darurat karena sibuk memeriksa pasien hijau.
    - Solusi Sistem: Sistem wajib memiliki alarm/pop-up interuptif di layar komputer dokter. Jika ada pasien P1/Merah masuk, layar dokter harus memunculkan alert berkedip: "Pasien Gawat Darurat di Ruang Tindakan!" yang menghentikan aktivitas input data sementara.
- Waktu Dokumentasi yang Terlalu Lama: Format triase di sistem terlalu banyak kolom teks bebas yang harus diketik.
    - Solusi Sistem: Gunakan Checklist dan Clickable Options. Perawat triase tidak punya waktu untuk mengetik esai. Cukup klik opsi keluhan utama dan masukkan angka TTV, beres dalam 45 detik.