export interface User {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
  activated?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
