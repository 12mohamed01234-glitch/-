
export enum AppView {
  LANDING = 'landing',
  DASHBOARD = 'dashboard',
  FACULTIES = 'faculties',
  DRIVE = 'drive',
  RESULTS = 'results',
  EXAMS = 'exams',
  EVALUATION = 'evaluation',
  COMPLAINTS = 'complaints',
  SERVICES = 'services',
  LOGIN = 'login',
  PROFILE = 'profile',
  SURVEYS = 'surveys',
  ALUMNI = 'alumni',
  ELEARNING = 'elearning',
  RESEARCH = 'research',
  STAFF_DIRECTORY = 'staff_directory'
}

export type Language = 'ar' | 'en';

export type UserRole = 'student' | 'staff' | 'admin' | 'faculty_admin';

export interface Faculty {
  id: string;
  name: string;
  nameAr: string;
  code: string;
  icon: string;
  description: string;
  descriptionAr: string;
}

export interface ResourceFile {
  id: string;
  name: string;
  nameAr: string;
  type: 'pdf' | 'doc' | 'xls' | 'zip';
  size: string;
  date: string;
}

export interface Professor {
  id: string;
  name: string;
  nameAr: string;
  title: string;
  titleAr: string;
  facultyId: string;
  department: string;
  departmentAr?: string;
  specialization?: string;
  specializationAr?: string;
  email: string;
  bio?: string;
  bioAr?: string;
  officeHours?: string;
  officeHoursAr?: string;
  courses?: string[];
  coursesAr?: string[];
  rating: number;
  image?: string;
}

export interface CourseResult {
  code: string;
  name: string;
  nameAr: string;
  credits: number;
  grade: string;
  points: number;
  semester: string;
}

export interface UniversityService {
  id: string;
  view?: AppView;
  externalUrl?: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: 'Academic' | 'Financial' | 'Administrative' | 'Government';
  status: 'Available' | 'Maintenance' | 'Restricted';
  icon: string;
  color?: string;
}

export interface User {
  id: string;
  name: string;
  nameAr: string;
  role: UserRole;
  faculty: string;
  facultyAr: string;
  department: string;
  departmentAr: string;
  level: number;
  gpa: number;
  creditsEarned: number;
  avatar?: string;
}
