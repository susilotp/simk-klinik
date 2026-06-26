import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientForm = () => {
  const [name, setName] = useState('');
  const [nik, setNik] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [patientId, setPatientId] = useState(null);
  const [antrian, setAntrian] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('nik', nik);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('symptoms', symptoms);
      formData.append('diagnosis', diagnosis);

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nama:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <br />
        <label>
          NIK:
          <input type="text" value={nik} onChange={(event) => setNik(event.target.value)} />
        </label>
        <br />
        <label>
          Tanggal Lahir:
          <input type="date" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />
        </label>
        <br />
        <label>
          Gejala:
          <textarea value={symptoms} onChange={(event) => setSymptoms(event.target.value)} />
        </label>
        <br />
        <label>
          Diagnosis:
          <textarea value={diagnosis} onChange={(event) => setDiagnosis(event.target.value)} />
        </label>
        <br />
        <button type="submit">Kirim Data Pasien</button>
      </form>
      {antrian && (
        <p>Nomor antrian: {antrian}</p>
      )}
    </div>
  );
};

export default PatientForm;