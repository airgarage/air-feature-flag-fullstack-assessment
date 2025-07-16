export enum UserRole {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  EMPLOYEE = 'EMPLOYEE',
  ENFORCER = 'ENFORCER',
  VISITOR = 'VISITOR',
  DRIVER = 'DRIVER',
}

export interface User {
  id: number;
  role: UserRole;
  full_name: string;
  email: string;
}
