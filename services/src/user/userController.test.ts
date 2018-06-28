import request from 'supertest'
import { userApi } from '../apiServices'


describe('test user api', () => {

    const todosArray = [{
        goal: 'test api',
        title: 'test api'
    }];

    let id = 0

    it('should GET user list', async () => {
        const response = await request(userApi).get('/user');
        expect(response.status).toBe(200);
        let actual = response.body[0]
        expect(actual.email).toEqual('anna@acme.com')
        expect(actual.id).not.toBeNull()
        id = actual.id
    });

})
