import loki from 'lokijs';
import { v1 as uuid } from 'uuid'


export enum TransactionType {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
}

export interface ITransaction {
    id?: string;
    accountId: string;
    transactionType: TransactionType;
    amount: number;
    date: string;
}

export interface ITransactionStore {

    createTransactions(transactions:ITransaction[]):ITransaction[]
    find(id:string):ITransaction
    findOne(query:any):ITransaction
    findAll():ITransaction[]
}


class InMemoryTransactionStore implements ITransactionStore {

    db = new loki('transaction.db');
    transactions = this.db.addCollection('Transactions') as Collection<ITransaction>;

    createTransactions(transactions:ITransaction[]):ITransaction[] {
        return transactions.map(transaction => this.transactions.insert({
            id: uuid(),
            accountId: transaction.accountId,
            transactionType: transaction.transactionType,
            amount: transaction.amount,
            date: transaction.date
        })) as ITransaction[]
    }
    
    findAll():ITransaction[] {
        return this.transactions.find()
    }

    find(id:string):ITransaction {
        return this.findOne({ id })
    }
    
    findOne(query:any):ITransaction {
        let found = this.transactions.findOne(query) as ITransaction;
        return found;
    }
}


export function createTransactionStore():ITransactionStore {
    const TransactionStore = new InMemoryTransactionStore()
    return TransactionStore;
}

export default createTransactionStore;
