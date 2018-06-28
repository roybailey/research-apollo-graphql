import { Logger } from 'log4js'
import request, {Response} from 'supertest'


// replace this with environment variable,
// check for running server and gracefully exit
// with instructions if not running (this is really integration test)
const SERVER = 'http://localhost:7777'

export const createGraphQL = (logger:Logger) => (query:any, variables:any = {}):Promise<Response> => {
    let payload = {
      query: query,
      variables: variables
    }
    logger.debug('request graphql : ',payload);
    return request(SERVER).post(`/graphql`).send(payload)
}

export default createGraphQL
