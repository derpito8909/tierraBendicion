import { Users } from './users';

export interface Activity {
  _id: string;
  name: String;
  description: string;
  date: Date;
  attendance: number;
  user: Users[];
}
