import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// PERBAIKAN: Gunakan .trim() agar teks kosong "" dianggap sebagai error oleh .required()
const schema = yup.object().shape({
  nama: yup.string().trim().required('Nama tidak boleh kosong'),
  nik: yup.string()
    .matches(/^([0-9]{16})$/, 'NIK harus 16 angka')
    .required('NIK tidak boleh kosong'),
  tanggalLahir: yup.string().trim().required('Tanggal lahir tidak boleh kosong'),
});

type RegistrationFormValues = yup.InferType<typeof schema>;

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div>
        <label htmlFor="nama-input">Nama:</label>
        <input id="nama-input" { ...register('nama') } type="text" />
        {errors.nama && <div style={{ color: 'red' }}>{errors.nama.message}</div>}
      </div>
      <br />

      <div>
        <label htmlFor="nik-input">NIK:</label>
        <input id="nik-input" { ...register('nik') } type="text" />
        {errors.nik && <div style={{ color: 'red' }}>{errors.nik.message}</div>}
      </div>
      <br />

      <div>
        <label htmlFor="dob-input">Tanggal Lahir:</label>
        <input id="dob-input" { ...register('tanggalLahir') } type="date" />
        {errors.tanggalLahir && <div style={{ color: 'red' }}>{errors.tanggalLahir.message}</div>}
      </div>
      <br />

      <button type="submit">Daftar</button>
    </form>
  );
};

export default RegistrationForm;