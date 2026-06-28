import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AntrianPasien = () => {
  // 1. State Sumber Data Utama dari API
  const [masterAntrian, setMasterAntrian] = useState([]);
  
  // 2. State untuk Kontrol Pencarian, Filter, dan Debounce Teks
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // 3. State untuk Keperluan Statistik Card
  const [stats, setStats] = useState({
    totalHariIni: 0,
    tungguTriase: 0,
    dalamPemeriksaan: 0,
    selesai: 0,
  });

  const filterOptions = [
    { name: 'Semua Status', value: '' },
    { name: 'Tunggu Triase', value: 'TUNGGU' },
    { name: 'Dalam Pemeriksaan', value: 'Dalam Pemeriksaan' },
    { name: 'Selesai', value: 'DONE' },
  ];

  // Efek Simulasi Debounce Manual (Mencegah Lag Tanpa Library Tambahan)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.toLowerCase());
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  // 4. Ambil Data Antrean dari Server API Backend
  const fetchQueue = async () => {
    try {
      const response = await axios.get('/api/antrian');
      const queueData = response.data.queue || [];
      setMasterAntrian(queueData);
      updateStats(queueData); // Perbarui statistik langsung dari data segar API
    } catch (error) {
      console.error('Gagal mengambil data antrean:', error);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  // 5. Hitung Logika Statistik Berdasarkan Aturan Filter Status Backend
  const updateStats = (queue) => {
    const todayStr = new Date().toISOString().split('T')[0];

    const totalHariIniCount = queue.filter((q) => {
      if (!q.date) return false;
      return q.date.startsWith(todayStr);
    }).length;

    const tungguTriaseCount = queue.filter((q) => q.status === 'TUNGGU').length;
    const dalamPemeriksaanCount = queue.filter((q) => q.status === 'Dalam Pemeriksaan').length;
    const selesaiCount = queue.filter((q) => q.status === 'DONE').length;

    setStats({
      totalHariIni: totalHariIniCount,
      tungguTriase: tungguTriaseCount,
      dalamPemeriksaan: dalamPemeriksaanCount,
      selesai: selesaiCount,
    });
  };

  // 6. Logika Penyaringan Data Tampilan (Aman & Tidak Merusak Data Master)
  const filteredData = masterAntrian.filter((item) => {
    const matchesSearch = item.name ? item.name.toLowerCase().includes(debouncedSearch) : false;
    const matchesFilter = statusFilter === '' ? true : item.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dashboard & Antrian Pasien</h1>

      {/* SEKSI 1: Kumpulan Card Statistik */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '150px' }}>
          <h3>Total Hari Ini</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px 0' }}>{stats.totalHariIni}</p>
          <small>Pasien datang hari ini</small>
        </div>
        <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '150px' }}>
          <h3>Tunggu Triase</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px 0', color: '#d97706' }}>{stats.tungguTriase}</p>
          <small>Menunggu triase medis</small>
        </div>
        <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '150px' }}>
          <h3>Dalam Pemeriksaan</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px 0', color: '#2563eb' }}>{stats.dalamPemeriksaan}</p>
          <small>Sedang diperiksa dokter</small>
        </div>
        <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '150px' }}>
          <h3>Selesai</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px 0', color: '#16a34a' }}>{stats.selesai}</p>
          <small>Selesai pemeriksaan</small>
        </div>
      </div>

      {/* SEKSI 2: Kontrol Filter & Input Pencarian */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          {filterOptions.map((opt, idx) => (
            <option key={idx} value={opt.value}>{opt.name}</option>
          ))}
        </select>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama pasien..."
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '250px' }}
        />
      </div>

      {/* SEKSI 3: Daftar Antrean Hasil Filter */}
      <h3>Daftar Pasien ({filteredData.length})</h3>
      <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
        {filteredData.map((q) => (
          <li key={q.id}>
            <strong>{q.name}</strong> - <span style={{ color: '#555' }}>Status: {q.status}</span>
          </li>
        ))}
        {filteredData.length === 0 && (
          <li style={{ listStyleType: 'none', color: '#999', italic: 'true' }}>Tidak ada data pasien yang cocok.</li>
        )}
      </ul>
    </div>
  );
};

export default AntrianPasien;
