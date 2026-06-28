import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasienForm = () => {
  // Menyatukan seluruh field ke dalam satu state objek agar rapi
  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    alamat: '',
    noTelp: '',
    dateOfBirth: '',
    symptoms: '',
    diagnosis: '',
  });

  const [antrian, setAntrian] = useState(null);
  const [patientId, setPatientId] = useState(null);

  // Handler universal untuk mendeteksi perubahan semua input teks dan textarea
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Menggabungkan seluruh data ke dalam objek FormData untuk dikirim ke API
    const dataToSend = new FormData();
    dataToSend.append('nik', formData.nik);
    dataToSend.append('nama', formData.nama); // Mewakili field name
    dataToSend.append('alamat', formData.alamat);
    dataToSend.append('noTelp', formData.noTelp);
    dataToSend.append('dateOfBirth', formData.dateOfBirth);
    dataToSend.append('symptoms', formData.symptoms);
    dataToSend.append('diagnosis', formData.diagnosis);

    try {
      const response = await axios.post('/patients', dataToSend);
      
      const serverPatientId = response.data.patientId;
      const serverAntrian = response.data.antrian;

      setPatientId(serverPatientId);
      setAntrian(serverAntrian);

      // Gunakan serverAntrian langsung agar nomor antrean akurat saat toast muncul
      toast.success(`Nomor antrian ${serverAntrian} diterima!`, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
      });

      // Menunggu animasi toast selesai (2 detik) sebelum pindah ke halaman konfirmasi
      setTimeout(() => {
        window.location.href = `/confirmation/${serverPatientId}`;
      }, 2000);

    } catch (error) {
      toast.error('Gagal mengirimkan data pasien', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
      });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <ToastContainer />
      <h2>Formulir Pendaftaran Pasien</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>NIK:</label>
          <br />
          <input 
            type="text" 
            name="nik" 
            value={formData.nik} 
            onChange={handleChange} 
            required 
          />
        </div>
        <br />

        <div>
          <label>Nama Lengkap:</label>
          <br />
          <input 
            type="text" 
            name="nama" 
            value={formData.nama} 
            onChange={handleChange} 
            required 
          />
        </div>
        <br />

        <div>
          <label>Tanggal Lahir:</label>
          <br />
          <input 
            type="date" 
            name="dateOfBirth" 
            value={formData.dateOfBirth} 
            onChange={handleChange} 
            required 
          />
        </div>
        <br />

        <div>
          <label>Alamat Tinggal:</label>
          <br />
          <input 
            type="text" 
            name="alamat" 
            value={formData.alamat} 
            onChange={handleChange} 
          />
        </div>
        <br />

        <div>
          <label>No. Telepon / HP:</label>
          <br />
          <input 
            type="text" 
            name="noTelp" 
            value={formData.noTelp} 
            onChange={handleChange} 
          />
        </div>
        <br />

        <div>
          <label>Gejala yang Dirasakan:</label>
          <br />
          <textarea 
            name="symptoms" 
            value={formData.symptoms} 
            onChange={handleChange} 
          />
        </div>
        <br />

        <div>
          <label>Diagnosis Awal:</label>
          <br />
          <textarea 
            name="diagnosis" 
            value={formData.diagnosis} 
            onChange={handleChange} 
          />
        </div>
        <br />

        <button type="submit">Kirim Data Pasien</button>
      </form>

      {antrian && (
        <div style={{ marginTop: '20px', fontWeight: 'bold', color: 'green' }}>
          <p>Nomor Antrean Anda: {antrian}</p>
        </div>
      )}
    </div>
  );
};

export default PasienForm;
