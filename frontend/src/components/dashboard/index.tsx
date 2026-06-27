import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios'; 
import type { QueueItem } from '../../types'; 

const Dashboard = () => {
  const { data, isLoading, error } = useQuery<QueueItem[], Error>({
    queryKey: ['queue'],
    queryFn: async () => {
      const response = await api.get<QueueItem[]>('/queue');
      return response.data;
    },
    staleTime: 1000 * 60 * 60, 
    refetchInterval: 30000,    
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!isLoading && !error && data) {
      console.log('Data antrean terbaru:', data);
    }
  }, [data, isLoading, error]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dasbor Antrean Pasien</h1>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <ul className="space-y-2">
          {data?.map((item) => (
            <li key={item.id} className="border p-3 rounded shadow-sm bg-white">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">Nomor: {item.queueNumber}</p>
              <p className="text-sm">Status: <span className="font-medium text-blue-600">{item.status}</span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
