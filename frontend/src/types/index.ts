export interface Patient {
  id: number;
  name: string;
  dateOfBirth: Date | null;
  contactNumber: string;
}

export interface Queue {
  id: number;
  patientName: string;
  examinationDate: Date | null;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface Examination {
  id: number;
  patientId: number;
  diagnosis: string;
  treatmentPlan: string;
  examinationDate: Date;
}

export const PatientStatus = {
  WAITING_TRIAGE: 'WAITING_TRIAGE',
  TRIAGE: 'TRIAGE',
  WAITING_DOCTOR: 'WAITING_DOCTOR',
  EXAMINATION: 'EXAMINATION',
  WAITING_CASHIER: 'WAITING_CASHIER',
  DONE: 'DONE',
} as const;

export type PatientStatus = (typeof PatientStatus)[keyof typeof PatientStatus];

export interface QueueItem {
  id: string;
  name: string;
  queueNumber: string;
  status: PatientStatus; 
  registeredAt: string;
  complaint: string;
}