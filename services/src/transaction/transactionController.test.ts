import request from 'supertest'
import { transactionApi } from '../apiServices'


describe('test account api', () => {

    let id = 0

    it('should GET transaction list', async () => {
        const response = await request(transactionApi).get('/transaction');
        expect(response.status).toBe(200);
        let actual = response.body[0]
        expect(actual.amount).toEqual(5000)
        expect(actual.id).not.toBeNull()
        id = actual.id
    });

})
