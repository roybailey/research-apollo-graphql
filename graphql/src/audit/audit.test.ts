import LogFactory from '../logger'
import createGraphQL from '../test.base'
import { IAudit } from './audit'

const logger = LogFactory.getLogger('audit.test')
const graphql = createGraphQL(logger)

//
// This test expects the default server and micro-services to be running
// Integration test to help development of graphQL schema/resolvers against micro-services
//

describe('test audit graphQL', () => {

  let events:IAudit[]

  it('should return event list', async () => {

      const QueryEvents = `
        {
          events {
            id
            namespace
            event
            type
            timestamp
            payload
          }
        }
      `;

      const response = await graphql(QueryEvents)

      let actual = response.body
      logger.debug('events response',actual);
      expect(response.status).toBe(200);

      events = actual.data.events
      expect(events.length).toBeGreaterThan(0)
      expect(events[0].id).not.toBeNull()
      expect(events[0].namespace).not.toBeNull()
      expect(events[0].event).not.toBeNull()
      expect(events[0].type).not.toBeNull()
      expect(events[0].timestamp).not.toBeNull()
    });

});

