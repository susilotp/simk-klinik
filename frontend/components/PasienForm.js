import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PasienForm = () => {
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [antrian, setAntrian] = useState(0);
  const [patientId, setPatientId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nik', nik);
    formData.append('nama', nama);
    formData.append('alamat', alamat);
    formData.append('noTelp', noTelp);

    try {
      const response = await axios.post('/patients', formData);
      setPatientId(response.data.patientId);
      setAntrian(response.data.antrian);
      toast.success(`Nomor antrian ${antrian} diterima!`, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseBeforeOpening: 500,
      });
      window.location.href = `/confirmation/${patientId}`;
    } catch (error) {
      toast.error('Gagal mengirimkan data pasien', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseBeforeOpening: 500,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nik:</label>
        <input type="text" value={nik} onChange={(event) => setNik(event.target.value)} />
      </div>
      <div>
        <label>Nama:</label>
        <input type="text" value={nama} onChange={(event) => setNama(event.target.value)} />
      </div>
      <div>
        <label>Alamat:</label>
        <input type="text" value={alamat} onChange={(event) => setAlamat(event.target.value)} />
      </div>
      <div>
        <label>No. Telp:</label>
        <input type="text" value={noTelp} onChange={(event) => setNoTelp(event.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PasienForm;