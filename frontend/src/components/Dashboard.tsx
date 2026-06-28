import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Interface aman ditaruh di sini selama ekstensi file adalah .tsx
interface AntreanItem {
  nik: string;
  status: string;
}

const Dashboard = () => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [data, setData] = useState<AntreanItem[]>([]);
  const [countdown, setCountdown] = useState<number>(30);

  // Menggunakan useCallback untuk mengunci cakupan fungsi fetch
  const fetchData = useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await axios.get<AntreanItem[]>('https://example.com');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsFetching(false);
      setInitialLoading(false);
      setCountdown(30); 
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (isFetching || initialLoading) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchData();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFetching, initialLoading, fetchData]);

  if (initialLoading) {
    return <div className="p-6 text-center text-gray-500">Memuat antrean awal...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Dashboard Antrean</h2>
        
        <div className="text-sm border px-3 py-1.5 rounded-lg bg-gray-50">
          {isFetching ? (
            <span className="text-blue-600 font-medium animate-pulse">Menyingkronkan data...</span>
          ) : (
            <span className="font-mono text-gray-600">Refresh dalam: {countdown}s</span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="border p-4 rounded-xl shadow-sm bg-white">
            <p className="font-semibold text-gray-700">NIK: <span className="font-mono">{item.nik}</span></p>
            <p className="text-sm text-gray-500">Status: <span className="text-blue-600 font-medium">{item.status}</span></p>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-center text-gray-400 py-6">Tidak ada data antrean.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
