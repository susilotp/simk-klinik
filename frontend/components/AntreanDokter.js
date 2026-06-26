import React from 'react';
import { useState, useEffect } from 'react';

const AntreanDokter = () => {
  const [antrean, setAntrean] = useState([]);
  const [urutan, setUrutan] = useState(0);

  useEffect(() => {
    // Simulasi data antrean
    const dataAntrean = [
      { no: 'A-001', jenis: 'Umum/Gigi' },
      { no: 'B-001', jenis: 'Spesialis Anak' },
      { no: 'C-001', jenis: 'KIA/Kebidanan' },
    ];
    setAntrean(dataAntrean);
  }, []);

  const handleUrutan = () => {
    setUrutan((prevUrutan) => prevUrutan + 1);
  };

  return (
    <div>
      <h2>Antrean Dokter</h2>
      <ul>
        {antrean.map((item, index) => (
          <li key={index}>
            {item.no} - {item.jenis}
          </li>
        ))}
      </ul>
      <button onClick={handleUrutan}>Lanjutkan Urutan</button>
    </div>
  );
};

export default AntreanDokter;