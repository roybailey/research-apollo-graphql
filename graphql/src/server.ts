import { GraphQLServer, PubSub } from 'graphql-yoga'
import { typeDefs, resolvers } from './schema'
import debugFactory from 'debug'

const debug = debugFactory('research-apollo')

declare var process : {
  env: {
    NODE_ENV: string
    PORT: number
  }
}

const port = process.env.PORT || 7777;

const opts = {
  port: port,
  endpoint: '/graphql',
  subscriptions: '/graphql',
  debug: true,
}

const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub }})
if (process.env.NODE_ENV !== 'test') {
  server.start(opts, ({port,endpoint,debug}) => console.log(`Server is running on localhost:${port}${endpoint} with debug=${debug}`))
}

export default server
