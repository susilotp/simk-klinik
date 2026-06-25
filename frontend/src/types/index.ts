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