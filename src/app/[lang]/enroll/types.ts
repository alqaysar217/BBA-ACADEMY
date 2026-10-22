
import { Timestamp } from 'firebase/firestore';

export interface Student {
  status: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  lastGrade: string;
}

export interface EnrollmentData {
  parent1Name: string;
  parent1Phone: string;
  parent1Email: string;
  relationship1: string;
  parent2Name: string;
  parent2Phone: string;
  parent2Email: string;
  relationship2: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
  };
  siblingCount: string;
  students: Student[];
  programFormat: string;
  programOption: string;
  paymentTier: string;
  languageOption: string;
  weekendTerm: string;
  weekendSlot: string;
  files: any[];
  status?: 'draft' | 'submitted';
  submittedAt?: Timestamp;
  updatedAt?: Timestamp;
  userId?: string;
  lang?: string;
}
