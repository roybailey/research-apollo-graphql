import { addMinutes, addSeconds } from 'date-fns'

import log4js from '../logger'
const logger = log4js.getLogger('auditStore.test')

import { IAudit } from './AuditType';
import { createAuditStore } from './AuditStore';


describe('Audit store', () => {

    const auditStore = createAuditStore();

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

    it('created some Audit events', () => {
        logger.debug(`create audit records`, testData)
        const newAudit = auditStore.insert(testData)
        expect(newAudit).toMatchObject(testData)
        const sameAudit = auditStore.findOne({ id: newAudit[0].id })
        expect(newAudit[0]).toMatchObject(sameAudit)
    });

    it('gets the latest Audit events by timestamp', () => {
        let latest = auditStore.findSince(addSeconds(testData[1].timestamp, -1))
        expect(latest.length).toEqual(2)
        latest = auditStore.findSince(testData[1].timestamp)
        expect(latest.length).toEqual(1)
    });

});
