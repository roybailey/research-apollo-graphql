import LogFactory from '../logger'
import createGraphQL from '../test.base'
import { IUser } from './user'

const logger = LogFactory.getLogger('user.test')
const graphql = createGraphQL(logger)

//
// This test expects the default server and micro-services to be running
// Integration test to help development of graphQL schema/resolvers against micro-services
//

describe('test todo graphQL', () => {

  let users:IUser[]

  it('should return user list', async () => {

      const QueryAllUsers = `
        {
          allUsers {
            id
            name
            email
          }
        }
      `;

      const response = await graphql(QueryAllUsers)

      let actual = response.body
      logger.debug('allUsers response',actual);
      expect(response.status).toBe(200);

      users = actual.data.allUsers
      logger.debug('allUsers response',users);
      expect(users.length).toBeGreaterThan(0)
      expect(users[0].id).not.toBeNull()
      expect(users[0].name).not.toBeNull()
      expect(users[0].email).not.toBeNull()
    });

    it('should return user by id', async () => {

      const QueryUserByIdWithVariable = `
        query getUserWithIdVariable($varUserId: ID!) {
          getUser(id: $varUserId) {
            id
            name
            email
          }
        }
      `;

      const response = await graphql(QueryUserByIdWithVariable, {
        varUserId: users[0].id
      })
 
      let actual = response.body
      logger.debug('getUser response',actual);
      expect(response.status).toBe(200);

      let user = actual.data.getUser
      expect(user.id).not.toBeNull()
      expect(user.title).not.toBeNull()
      expect(user.status).not.toBeNull()
    });

});

