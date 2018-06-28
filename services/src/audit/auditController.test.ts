import { addMinutes, addSeconds } from 'date-fns'
import request from 'supertest'

import { IAudit } from './auditType'
import { auditApi } from '../apiServices'


describe('test audit api', () => {

    const testData:IAudit[] = [{
        namespace: 'test',
        event: 'insert',
        type: 'one',
        timestamp: addMinutes(new Date(), -120),
        payload: JSON.stringify({ aaa: '111', bbb: '222' })
    },
    {
        namespace: 'test',
        event: 'insert',
        type: 'two',
        timestamp: addMinutes(new Date(), -60),
        payload: JSON.stringify({ aaa: '111', bbb: '222' })
    },
    {
        namespace: 'test',
        event: 'insert',
        type: 'three',
        timestamp: new Date(),
        payload: JSON.stringify({ aaa: '111', bbb: '222' })
    }];

    let id = 0

    it('should POST new audit', async () => {
        const response = await request(auditApi).post(`/audit/event`).send(testData);
        expect(response.status).toBe(200);
        let actual = response.body[0]
        expect(actual.event).toEqual('insert')
        expect(actual.id).not.toBeNull()
        id = actual.id
    });

    it('should GET audit list', async () => {
        const response = await request(auditApi).get('/audit/event');
        expect(response.status).toBe(200);
        let actual = response.body[0]
        expect(actual.event).toEqual('insert')
        expect(actual.id).not.toBeNull()
        id = actual.id
    });

    it('should GET audit by id', async () => {
        const response = await request(auditApi).get(`/audit/event/${id}`);
        expect(response.status).toBe(200);
        let actual = response.body
        expect(actual.event).toEqual('insert')
        expect(actual.id).toEqual(id)
    });

    it('should GET latest audit events by timestamp', async () => {
        const response = await request(auditApi).get(`/audit/since/${addMinutes(testData[1].timestamp,1)}`);
        expect(response.status).toBe(200);
        let actual = response.body
        expect(actual.length).toEqual(2)
    });

})
