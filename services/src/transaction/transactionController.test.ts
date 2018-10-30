import request from 'supertest'
import {transactionApi} from '../apiServices'
import {TransactionType} from './transactionStore'


describe('test account api', () => {

    let record = { id:0, accountId: 0 }

    it('should GET transaction list', async () => {
        const response = await request(transactionApi).get('/transaction');
        expect(response.status).toBe(200);
        let actual = response.body[0]
        expect(actual.amount).toEqual(5000)
        expect(actual.id).not.toBeNull()
        record = actual
    });

    it('should GET transaction by id', async () => {
        const response = await request(transactionApi).get(`/transaction/${record.id}`);
        expect(response.status).toBe(200);
        let actual = response.body
        expect(actual.transactionType).toEqual('CREDIT')
        expect(actual.amount).toEqual(5000)
        expect(actual.date).toEqual('20180101')
        expect(actual.id).not.toBeNull()
    });

    it('should GET transaction by accountId', async () => {
        const response = await request(transactionApi).get(`/account-transaction/${record.accountId}`);
        expect(response.status).toBe(200);
        let actual = response.body

        expect(actual.length).toEqual(3)
        expect(actual[0].transactionType).toEqual(TransactionType.CREDIT)
        expect(actual[1].transactionType).toEqual(TransactionType.DEBIT)
    });

})
