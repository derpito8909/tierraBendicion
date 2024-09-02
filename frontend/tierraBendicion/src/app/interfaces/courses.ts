import { Users } from './users';

export interface Courses {
  _id: string;
  name: string;
  user: Users;
  dateStart: Date;
  dateEnd: Date;
  schedule: string;
}
