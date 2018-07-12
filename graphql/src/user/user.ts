
export enum UserRole {
  CLIENT = 'CLIENT',
  ADVISER = 'ADVISER',
}

export interface IUser {
  id?: string,
  name: string,
  email: string
}

