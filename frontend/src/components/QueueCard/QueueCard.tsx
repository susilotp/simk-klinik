import type { QueueItem } from '../../types'; // Assuming you have a type definition for QueueItem in types.ts
import { PatientStatus } from '../../types'; 
import styles from './QueueCard.module.css';

interface QueueCardProps {
  queueItem: QueueItem;
  onViewDetail: () => void;
}

const QueueCard: React.FC<QueueCardProps> = ({ queueItem, onViewDetail }) => {
  const { status } = queueItem;

  let backgroundColor;
  
  switch (status) {
    case PatientStatus.WAITING_TRIAGE:
    case PatientStatus.TRIAGE:
      backgroundColor = styles.p1Status; // Kelompokkan sesuai kebutuhan visual Anda
      break;
    case PatientStatus.WAITING_DOCTOR:
    case PatientStatus.EXAMINATION:
      backgroundColor = styles.p2Status;
      break;
    case PatientStatus.WAITING_CASHIER:
      backgroundColor = styles.p3Status;
      break;
    case PatientStatus.DONE:
      backgroundColor = styles.p4Status;
      break;
    default:
      backgroundColor = styles.defaultStatus;
  }

  return (
    <div className={backgroundColor} onClick={onViewDetail}>
      <h2>{queueItem.name}</h2>
      <p>Status: {status}</p>
    </div>
  );
};

export default QueueCard;