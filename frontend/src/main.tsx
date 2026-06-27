import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import api from './api/axios'; // Menggunakan instance axios ber-token yang kita buat sebelumnya
import type { QueueItem } from './types'; // Sesuai dengan file types sentral kita

// 1. Buat instance QueryClient di luar komponen
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // Cache data selama 1 jam (dalam milidetik)
      refetchInterval: 30000,    // Ambil data ulang setiap 30 detik otomatis
    },
  },
});

// 2. Custom Hook khusus untuk mengambil data antrean pasien
export const useQueueDataQuery = () => {
  return useQuery<QueueItem[], Error>({
    queryKey: ['patientsQueue'],
    queryFn: async () => {
      // Menembak URL endpoint backend secara aman
      const response = await api.get<{ queue: QueueItem[] }>('/api/v1/patients/queue');
      return response.data.queue;
    },
  });
};

// 3. Bungkus aplikasi utama dengan QueryClientProvider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Sistem Antrean Klinik</h1>
        {/* Komponen tabel atau dasbor antrean Anda ditaruh di sini */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
