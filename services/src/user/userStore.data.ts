import { IUser, UserRole } from './userStore'

const initialUserData:IUser[] = [
    { name: 'Anna', email: 'anna@acme.com', roles: [UserRole.CLIENT] },
    { name: 'Burt', email: 'burt@bung.com', roles: [UserRole.ADVISER] },
    { name: 'Carl', email: 'carl@cool.com', roles: [UserRole.ADVISER,UserRole.CLIENT] }
]

export default initialUserData

