import loki from 'lokijs';
import sequence from '../identity'
const uuid = sequence('USER')


export enum UserRole {
    CLIENT = 'CLIENT',
    ADVISER = 'ADVISER',
}

export interface IUser {
    id?: string;
    name: string;
    email: string;
    roles: UserRole[]
}

export interface IUserStore {

    insert(Users:IUser[]):IUser[]
    findAll():IUser[]
    find(id:string):IUser
    findOne(query:any):IUser
    update(data:IUser):IUser
    remove(data:IUser):IUser
}


class InMemoryUserStore implements IUserStore {

    db = new loki('user.db');
    users = this.db.addCollection('Users') as Collection<IUser>;

    insert(users:IUser[]):IUser[] {
        return users.map(it=>this.users.insert(Object.assign({id: uuid()}, it))) as IUser[]
    }
    
    findAll():IUser[] {
        return this.users.find()
    }

    find(id:string):IUser {
        return this.findOne({ id })
    }
    
    findOne(query:any):IUser {
        let found = this.users.findOne(query) as IUser;
        return found;
    }

    update(data:IUser):IUser {
        return this.users.update(data);
    }

    remove(data:IUser):IUser {
        this.users.remove(data);
        return data;
    }
}


export function createUserStore():IUserStore {
    const userStore = new InMemoryUserStore()
    return userStore;
}

export default createUserStore;
