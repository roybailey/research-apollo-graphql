import loki from 'lokijs';

import sequence from '../identity'
const uuid = sequence('TX')

import log4js from '../logger'
const logger = log4js.getLogger('transactionStore')


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
    findAll(query:any):ITransaction[]
}


class InMemoryTransactionStore implements ITransactionStore {

    db = new loki('transaction.db');
    transactions = this.db.addCollection('Transactions') as Collection<ITransaction>;

    createTransactions(transactions:ITransaction[]):ITransaction[] {
        let tx = transactions.map(transaction => this.transactions.insert({
            id: uuid(),
            accountId: transaction.accountId,
            transactionType: transaction.transactionType,
            amount: transaction.amount,
            date: transaction.date
        })) as ITransaction[]
        logger.debug(`Inserted Transactions`, tx)
        return tx;
    }
    
    find(id:string):ITransaction {
        return this.findOne({ id })
    }
    
    findOne(query:any):ITransaction {
        let found = this.transactions.findOne(query) as ITransaction;
        return found;
    }

    findAll(query:any):ITransaction[] {
        logger.debug(`findAll`, query)
        return this.transactions.find(query) as ITransaction[]
    }

}


export function createTransactionStore():ITransactionStore {
    const TransactionStore = new InMemoryTransactionStore()
    return TransactionStore;
}

export default createTransactionStore;
