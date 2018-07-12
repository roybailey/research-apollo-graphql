import { ITransaction, TransactionType } from './transactionStore'

// accountId === Account.number here and replaced with correct accountId GUID at load time

const initialTransactionData:ITransaction[] = [
    { accountId: '10000001', transactionType: TransactionType.CREDIT, amount: 5000, date: '20180101' },
    { accountId: '10000001', transactionType: TransactionType.DEBIT, amount: 1500, date: '20180103' },
    { accountId: '10000001', transactionType: TransactionType.DEBIT, amount: 100, date: '20180105' },

    { accountId: '20000002', transactionType: TransactionType.CREDIT, amount: 8000, date: '20180101' },
    { accountId: '20000002', transactionType: TransactionType.DEBIT, amount: 2500, date: '20180103' },
    { accountId: '20000002', transactionType: TransactionType.DEBIT, amount: 1000, date: '20180105' },

    { accountId: '20000004', transactionType: TransactionType.CREDIT, amount: 10000, date: '20180101' },
    { accountId: '20000004', transactionType: TransactionType.CREDIT, amount: 10000, date: '20180201' },
    { accountId: '20000004', transactionType: TransactionType.DEBIT, amount: 5000, date: '20180212' },

    { accountId: '30000003', transactionType: TransactionType.CREDIT, amount: 15000, date: '20180101' },
    { accountId: '30000003', transactionType: TransactionType.DEBIT, amount: 3500, date: '20180104' },
    { accountId: '30000003', transactionType: TransactionType.DEBIT, amount: 2000, date: '20180107' },
]

export default initialTransactionData

