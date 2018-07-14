import {TransactionType, createTransactionStore, ITransaction} from './transactionStore';
import initialTransactionData from './transactionStore.data'


describe('transaction store', () => {

    const transactionStore = createTransactionStore();

    const testData: ITransaction[] = initialTransactionData;

    const initialCount = transactionStore.findAll({}).length

    it('should create test transactions', () => {
        const transactions = transactionStore.createTransactions(testData)
        expect(transactions).toMatchObject(testData);
        const sameUser = transactionStore.findOne({ id: transactions[0].id })
        expect(transactions[0]).toMatchObject(sameUser);
    });

    it('should find transactions for specific account', () => {
        const transactions = transactionStore.findAll({ accountId: testData[5].accountId })
        expect(transactions.length).toEqual(3);
    });

    const finalCount = transactionStore.findAll({}).length
    expect(initialCount).toEqual(finalCount)
});
