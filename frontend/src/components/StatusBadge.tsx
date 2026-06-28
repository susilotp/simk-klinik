import { PatientStatus } from '../types';

interface StatusBadgeProps {
  status: PatientStatus | 'P1_Merah'; 
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusMap: Record<PatientStatus | 'P1_Merah', string> = {
    [PatientStatus.WAITING_TRIAGE]: 'Tunggu Triase',
    [PatientStatus.TRIAGE]: 'Triase',
    [PatientStatus.WAITING_DOCTOR]: 'Tunggu Dokter',
    [PatientStatus.EXAMINATION]: 'Pemeriksaan',
    [PatientStatus.WAITING_CASHIER]: 'Tunggu Kasir',
    [PatientStatus.DONE]: 'Selesai',
    P1_Merah: 'Pasien Gawat Darurat',
  };

  const colorMap: Record<PatientStatus | 'P1_Merah', string> = {
    [PatientStatus.WAITING_TRIAGE]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    [PatientStatus.TRIAGE]: 'bg-blue-100 text-blue-800 border-blue-300',
    [PatientStatus.WAITING_DOCTOR]: 'bg-amber-100 text-amber-800 border-amber-300',
    [PatientStatus.EXAMINATION]: 'bg-purple-100 text-purple-800 border-purple-300',
    [PatientStatus.WAITING_CASHIER]: 'bg-orange-100 text-orange-800 border-orange-300',
    [PatientStatus.DONE]: 'bg-green-100 text-green-800 border-green-300',
    P1_Merah: 'bg-red-500 text-white border-red-600',
  };

  const label = statusMap[status] || 'Status Tidak Dikenal';
  const color = colorMap[status] || 'bg-gray-100 text-gray-800';

  return (
    <div className={`flex items-center px-4 py-2 ${color}`}>
      {label}
    </div>
  );
};

export default StatusBadge;