import request from 'supertest'
import { accountApi } from '../apiServices'


describe('test account api', () => {

    let id = 0

    it('should GET account list', async () => {
        const response = await request(accountApi).get('/account');
        expect(response.status).toBe(200);
        let actual = response.body[0]
        expect(actual.number).toEqual('10000001')
        expect(actual.id).not.toBeNull()
        id = actual.id
    });

})
