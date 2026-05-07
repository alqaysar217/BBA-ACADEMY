export type UserRole = 'Student' | 'Admin' | 'SuperAdmin';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  isFree: boolean;
  thumbnail: string;
  studentsCount: number;
  rating: number;
  durationHours: number;
  lessonsCount: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  durationSeconds: number;
  order: number;
  isCompleted?: boolean;
}

export interface Certificate {
  id: string;
  certificateNumber: string; // e.g., CERT-2026-000845
  studentName: string;
  courseName: string;
  issueDate: string;
  qrCodeUrl: string;
  isValid: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  pdfUrl: string;
}
