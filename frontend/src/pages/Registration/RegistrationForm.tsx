import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// 1. Definisikan skema validasi Yup
const schema = yup.object().shape({
  nama: yup.string().required('Nama tidak boleh kosong'),
  nik: yup.string()
    .matches(/^([0-9]{16})$/, 'NIK harus 16 angka')
    .required('NIK tidak boleh kosong'),
  tanggalLahir: yup.string().required('Tanggal lahir tidak boleh kosong'), 
  // Catatan: input type="date" mengirim nilai sebagai string 'YYYY-MM-DD'
});

// 2. Buat tipe data otomatis dari skema Yup agar TypeScript aman
type RegistrationFormValues = yup.InferType<typeof schema>;

const RegistrationForm = () => {
  // 3. Ambil 'formState: { errors }' untuk menampilkan pesan error
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormValues>({
    resolver: yupResolver(schema),
  });

  // 4. Berikan tipe data 'RegistrationFormValues' pada parameter data
  const onSubmit = async (data: RegistrationFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nama:</label>
        <input { ...register('nama') } type="text" />
        {/* 5. Cara menampilkan pesan error yang benar */}
        {errors.nama && <div style={{ color: 'red' }}>{errors.nama.message}</div>}
      </div>
      <br />

      <div>
        <label>NIK:</label>
        <input { ...register('nik') } type="text" />
        {errors.nik && <div style={{ color: 'red' }}>{errors.nik.message}</div>}
      </div>
      <br />

      <div>
        <label>Tanggal Lahir:</label>
        <input { ...register('tanggalLahir') } type="date" />
        {errors.tanggalLahir && <div style={{ color: 'red' }}>{errors.tanggalLahir.message}</div>}
      </div>
      <br />

      <button type="submit">Daftar</button>
    </form>
  );
};

export default RegistrationForm;
