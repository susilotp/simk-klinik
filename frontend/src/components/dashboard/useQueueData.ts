import { useQuery } from '@tanstack/react-query';
// 1. Gunakan instance api yang sudah dikonfigurasi (bukan axios mentah)
import api from '../../api/axios'; 
// 2. Impor tipe data QueueItem dari file types sentral Anda
import type { QueueItem } from '../../types'; 

const fetchQueue = async (): Promise<QueueItem[]> => {
  try {
    // URL otomatis digabung dengan VITE_API_URL dari file .env
    const response = await api.get<{ queue: QueueItem[] }>('/api/v1/patients/queue');
    return response.data.queue;
  } catch (error) {
    console.error('Error fetching queue data:', error);
    throw error;
  }
};

export const useQueueDataQuery = () => {
  return useQuery<QueueItem[], Error>({
    queryKey: ['patientsQueue'],
    queryFn: fetchQueue,
  });
};
