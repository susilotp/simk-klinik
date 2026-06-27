import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface QueueItem {
  id: number;
  name: string;
  status: string;
}

// 1. Buat interface untuk mendefinisikan seluruh struktur isi Context
interface QueueContextType {
  currentQueue: QueueItem[];
  updatePatientStatus: (id: number, status: string) => void;
  addPatient: (patient: QueueItem) => void;
}

// 2. Berikan tipe data QueueContextType ke dalam createContext (awalnya diisi undefined)
const QueueContext = createContext<QueueContextType | undefined>(undefined);

// 3. Gunakan tipe ReactNode langsung pada parameter children (Lebih modern daripada React.FC)
export const QueueProvider = ({ children }: { children: ReactNode }) => {
  const [currentQueue, setCurrentQueue] = useState<QueueItem[]>([]);

  const updatePatientStatus = (id: number, status: string) => {
    setCurrentQueue((prevQueue) =>
      prevQueue.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const addPatient = (patient: QueueItem) => {
    setCurrentQueue((prevQueue) => [...prevQueue, patient]); // Lebih aman menggunakan callback state
  };

  return (
    // 4. Nilai value sekarang sudah cocok 100% dengan struktur QueueContextType
    <QueueContext.Provider value={{ currentQueue, updatePatientStatus, addPatient }}>
      {children}
    </QueueContext.Provider>
  );
};

export default QueueContext;

import { useContext } from 'react';

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue harus digunakan di dalam lingkungan QueueProvider');
  }
  return context;
};
