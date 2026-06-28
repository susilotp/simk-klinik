import React, { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import { FilterDropdown, FilterOption } from '@hookform/resolvers';

const AntrianPasien = () => {
  const [search, setSearch] = useState('');
  const [antrianPasien, setAntrianPasien] = useState([]);
  const [filterOptions, setFilterOptions] = useState([
    { name: 'Semua Status', value: '' },
    { name: 'Tunggu Triase', value: 'Tunggu Triase' },
    { name: 'Dalam Pemeriksaan', value: 'Dalam Pemeriksaan' },
    // tambahkan opsi lainnya
  ]);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearch) {
      const filteredAntrianPasien = antrianPasien.filter((q) =>
        q.name.toLowerCase().includes(debouncedSearch)
      );
      setAntrianPasien(filteredAntrianPasien);
    } else {
      setAntrianPasien(antrianPasien);
    }
  }, [debouncedSearch, antrianPasien]);

  const handleFilterChange = (value) => {
    if (value === '') {
      setAntrianPasien(antrianPasien);
    } else {
      const filteredAntrianPasien = antrianPasien.filter((q) =>
        q.name.toLowerCase().includes(value)
      );
      setAntrianPasien(filteredAntrianPasien);
    }
  };

  return (
    <div>
      <FilterDropdown
        options={filterOptions}
        onChange={handleFilterChange}
        placeholder="Pilih Status"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari Pasien"
      />
      <ul>
        {antrianPasien.map((q) => (
          <li key={q.id}>{q.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AntrianPasien;