
export interface IAudit {
    id?: string,
    namespace: string,
    event: string,
    type: string,
    timestamp: Date,
    payload?: string,
}


export class AuditSink {

    static logAuditEvents = (events:IAudit[]) => {
        console.log(events);
        return events;
    }

    sink:(events:IAudit[]) => IAudit[]

    constructor(sink:(events:IAudit[]) => IAudit[] = AuditSink.logAuditEvents) {
        this.sink = sink
    }

    audit(events:IAudit[]):IAudit[] {
        return this.sink(events)
    }

    raise(namespace:string, event:string, type:string, payload:any) {
        this.audit([{
            namespace: namespace,
            event: event,
            type: type,
            timestamp: new Date(),
            payload: JSON.stringify(payload)
        }]);
    }
}
