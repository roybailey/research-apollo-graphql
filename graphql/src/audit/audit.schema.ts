import fetch from 'node-fetch'
import { IResolvers } from 'graphql-yoga/dist/types'
import LogFactory from '../logger'
import { IAudit } from './audit'
import auditObservable from './audit.observable'

const logger = LogFactory.getLogger('audit.schema')


export const typeDefs = `
  type Audit {
    id: ID!
    namespace: String!
    event: String!
    type: String!
    timestamp: String!
    payload: String
  }
  type Query {
    events: [Audit!]!
    getEvent(id: ID!): Audit!
  }
  type Subscription {
    event: Audit!
  }
`;


export const resolvers:IResolvers = {

  Query: {
    events: () => {
      logger.debug("events()")
      return fetch(`http://localhost:9220/audit/event`).then(res => res.json())
    },
    getEvent: (_:any, { id }:any) => {
      logger.debug(`getEvent(${id})`)
      return fetch(`http://localhost:9220/audit/event/${id}`).then(res => res.json());
    }
  },

  Subscription: {
    event: {
      subscribe: (parent:any, args:any, { pubsub }:any) => {
        const channel = Math.random().toString(36).substring(2, 15) // random channel name
        const auditObserver = {
          next(events:IAudit[]) {
            logger.info(`audit observable events`, events)
            events.forEach(event => pubsub.publish(channel, { event }))
          },
          error(error:any) {
            logger.error(`error from audit consumer`,error)
          },
          complete() {
            logger.info(`audit observable complete`)
          }
        }
        auditObservable.subscribe(auditObserver)
        // let latest:string = new Date().toString()
        // setInterval(() => {
        //   fetch(`http://localhost:9220/audit/since/${latest}`)
        //     .then(res => res.json())
        //     .then(data => {
        //       console.log(`data ${JSON.stringify(data)}`)
        //       if(data && data.length > 0) {
        //         latest = data[data.length-1].timestamp
        //       }
        //     })
        //     // pubsub.publish(channel, { event: { id: count++, namespace: 'heartbeat', event: 'heartbeat', type: 'heartbeat', timestamp: new Date().toString() } })
        // }, 10000)
        return pubsub.asyncIterator(channel)
      },
    }
  },

}
