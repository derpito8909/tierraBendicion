import { Courses } from './courses';

export interface Members {
  _id: string;
  fullname: string;
  address: string;
  neighbourhood: string;
  reference: string;
  cellPhoneNumber: string;
  visitAccepted: boolean;
  visitTime: string;
  maritalStatus: 'Soltero' | 'Casado' | 'Union Libre';
  age: number;
  prayerRequest?: string;
  isActive: boolean;
  course: Courses[];
}
