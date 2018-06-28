import request from 'supertest'
import server from './server'
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';

//
// This test simply fires up the GraphQLServer and fires an empty query to test it ran and recieved the query
// Ideally we would mock out or spin up the micro-services needed by the graphQL resolvers,
// but for now we will create integration API tests to check server and micro-services are working as expected
//

describe('test todo graphQL', () => {

  let app:HttpServer|HttpsServer

  beforeEach(async function () {
    app = await server.start({
      port: 7887,
      endpoint: '/graphql'
    }, () => console.log(`Server is running on localhost:7887/graphql`))
  });
  afterEach(function () {
    app.close();
  });
  
  it('should start up server', async () => {

      const query = `
        query {
        }
      `;

      const response = await request(server.express).post(`/`).send({query})
      expect(response.status).toBe(404);

    });

});

