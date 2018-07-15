import { parse, format, isAfter } from 'date-fns'
import loki from 'lokijs';

import { IAudit } from './auditType'

import log4js from '../logger'
const logger = log4js.getLogger('auditStore')


export interface IAuditStore {

    insert(Audits:IAudit[]):IAudit[]
    findAll():IAudit[]
    find(id:string):IAudit
    findSince(timestamp:Date):IAudit[]
    findOne(query:any):IAudit
    update(data:IAudit):IAudit
    remove(data:IAudit):IAudit
}
let SEQUENCE = 0


class InMemoryAuditStore implements IAuditStore {

    db = new loki("audit.db");
    auditData = this.db.addCollection("audit") as Collection<IAudit>;

    insert(events:IAudit[]):IAudit[] {
        logger.debug(`insert audit \n`, events)
        const NOW = new Date()
        let entities = events.map(it=>Object.assign({id: (++SEQUENCE).toString()}, it, {timestamp: parse(it.timestamp)}))
        logger.debug(`insert audit enrichment \n`, entities)
        let results = entities.map(it=>this.auditData.insert(it)) as IAudit[]
        logger.debug(`insert audit results\n`, results)
        return results
    }

    orderBy(e1:IAudit,e2:IAudit) {
        return e1.timestamp.getTime()-e2.timestamp.getTime()
    }

    findAll():IAudit[] {
        return this.auditData.find().sort(this.orderBy)
    }

    findSince(timestamp:Date):IAudit[] {
        logger.debug(`find audit by timestamp `+timestamp)
        let results = this.auditData.find({ 'timestamp': { '$gt': timestamp }})
        logger.debug(`find audit by timestamp results\n`, results)
        return results.sort(this.orderBy)
    }

    find(id:string):IAudit {
        logger.debug(`findOne`, id)
        return this.findOne({ id })
    }
    
    findOne(query:any):IAudit {
        logger.debug(`findOne`, query)
        let found = this.auditData.findOne(query) as IAudit;
        return found;
    }

    update(event:IAudit):IAudit {
        logger.debug(`update`, event)
        return this.auditData.update(event as IAudit);
    }

    remove(event:IAudit):IAudit {
        logger.debug(`remove`, event)
        this.auditData.remove(event as IAudit);
        return event;
    }

}


export function createAuditStore():IAuditStore {
    const AuditStore = new InMemoryAuditStore()
    return AuditStore;
}

export default createAuditStore;
