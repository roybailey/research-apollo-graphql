import fetch from 'node-fetch'
import log4js from '../logger'
import { clearInterval } from 'timers';
import { Observable } from 'apollo-link';
import { IAudit } from './audit'
import { Observer } from 'subscriptions-transport-ws'

const logger = log4js.getLogger('audit.consumer')


export class AuditConsumer {

  _id:NodeJS.Timer
  limit:number = Number.MAX_SAFE_INTEGER
  count:number = 0
  latest:string = new Date().toString()
  subscribers:Observer<IAudit[]>[] = []

  constructor() {
    this._id = setInterval(() => {
      console.log(`latest ${this.latest}`)
      fetch(`http://localhost:9220/audit/since/${this.latest}`)
        .then(res => res.json())
        .then(data => this.fireEvent(data))
        .catch(error => logger.error(`failed to fetch latest audit events`, error))
      }, 10000)
  }

  subscribe(subscriber:Observer<IAudit[]>) {
    if(subscriber && subscriber.next)
      this.subscribers.push(subscriber)
  }

  fireEvent(data:IAudit[]) {
    logger.debug(`firing data event}`, data)

    if(data && data.length > 0) {
      this.latest = data[data.length-1].timestamp
    }

    this.subscribers.forEach(sub => {
      if(sub.next)
        sub.next(data || [])
    })

    if (this.count++ === this.limit) {
      this.subscribers.forEach(sub => {
        if(sub.complete)
          sub.complete()
      })
      this.shutdown();
    }

    // pubsub.publish(channel, { event: { id: count++, namespace: 'heartbeat', event: 'heartbeat', type: 'heartbeat', timestamp: new Date().toString() } })
  }

  shutdown() {
    clearInterval(this._id)
  }
}

const auditConsumer = new AuditConsumer()

export default auditConsumer

