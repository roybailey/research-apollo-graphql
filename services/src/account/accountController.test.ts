import request from 'supertest'
import { AccountType } from './accountStore'
import { accountApi } from '../apiServices'


describe('test account api', () => {

    let record = { id: 0, userId: 0 }

    it('should GET account list', async () => {
        const response = await request(accountApi).get('/account');
        expect(response.status).toBe(200);
        let actual = response.body[1]
        expect(actual.number).toEqual('20000002')
        expect(actual.id).not.toBeNull()
        record = actual
    });

    it('should GET account by id', async () => {
        const response = await request(accountApi).get(`/account/${record.id}`);
        expect(response.status).toBe(200);
        let actual = response.body
        expect(actual.number).toEqual('20000002')
        expect(actual.id).not.toBeNull()
    });

    it('should GET accounts by userId', async () => {
        const response = await request(accountApi).get(`/user-account/${record.userId}`);
        expect(response.status).toBe(200);
        let actual = response.body
        expect(actual.length).toEqual(2)
        expect(actual[0].accountType).toEqual(AccountType.CASH)
        expect(actual[1].accountType).toEqual(AccountType.INVESTMENT)
    });

})
