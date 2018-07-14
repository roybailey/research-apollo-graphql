import loki from 'lokijs';
import sequence from '../identity'
const uuid = sequence('ACC')


export enum AccountType {
    CASH = 'CASH',
    INVESTMENT = 'INVESTMENT',
}

export interface IAccountCreation {
    userId: string;
    accountType: AccountType;
    number: string;
    bankCode: string;
    balance?: number;
}

export interface IAccount {
    id?: string;
    userId: string;
    accountType: AccountType;
    number: string;
    bankCode: string;
    balance: number;
}

export interface IAccountStore {

    createAccounts(accounts:IAccountCreation[]):IAccount[]
    find(id:string):IAccount
    findByUserId(userId:string):IAccount
    findOne(query:any):IAccount
    findAll(query:any):IAccount[]
    updateBalance(userId:string, number:string, bankCode:string, amount: number):IAccount
}


class InMemoryAccountStore implements IAccountStore {

    db = new loki('account.db');
    accounts = this.db.addCollection('Accounts') as Collection<IAccount>;

    createAccounts(accounts:IAccountCreation[]):IAccount[] {
        return accounts.map(account=>this.accounts.insert({
            id: uuid(),
            userId: account.userId,
            number: account.number,
            bankCode: account.bankCode,
            accountType: account.accountType,
            balance: account.balance || 0
        })) as IAccount[]
    }

    find(id:string):IAccount {
        return this.findOne({ id })
    }
    
    findOne(query:any):IAccount {
        let found = this.accounts.findOne(query) as IAccount;
        return found;
    }

    findAll(query:any):IAccount[] {
        let found = this.accounts.find(query) as IAccount[];
        return found;
    }

    findByUserId(userId:string):IAccount {
        return this.findOne({ userId: userId })
    }

    updateBalance(userId:string, number:string, bankCode:string, amount: number):IAccount {
        let found = this.findOne({ userId, number, bankCode })
        found.balance += amount
        return found;
    }

}


export function createAccountStore():IAccountStore {
    const accountStore = new InMemoryAccountStore()
    return accountStore;
}

export default createAccountStore;
