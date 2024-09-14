export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  sub?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
