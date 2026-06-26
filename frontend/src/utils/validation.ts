import * as yup from 'yup';

export const nikSchema = yup.string().required('NIK wajib diisi').matches(/^[0-9]{16}$/, 'NIK harus 16 digit angka');

export const namaSchema = yup.string().required('Nama lengkap wajib diisi');

export const tanggalLahirSchema = yup.date().required('Tanggal lahir wajib diisi');

export const jenisKelaminSchema = yup.string().oneOf(['Laki-laki', 'Perempuan'], 'Jenis kelamin harus salah satunya');

export const teleponSchema = yup.string().required('Nomor telepon/WhatsApp wajib diisi').matches(/^[0-9]{10,15}$/, 'Nomor telepon/WhatsApp harus 10-15 digit angka');