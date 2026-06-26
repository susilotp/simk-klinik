import { useState, useEffect } from 'react';
import api from '../api/axios'; 

import type { QueueItem } from '../types'; 

export const useQueueData = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQueue = async () => {
    try {
      setIsLoading(true);
      setError(null); 
      
      const response = await api.get<{ queue: QueueItem[] }>('/api/v1/patients/queue');
      setQueue(response.data.queue);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Gagal mengambil data antrean';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return { queue, isLoading, error, refetch: fetchQueue };
};