import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

import { WebSocketLink } from 'apollo-link-ws'

import { Store } from 'redux'
import { ReduxCache } from 'apollo-cache-redux'

export const initApolloClient = (httpUri:string, wsUri:string, store?:Store) => {

  // Create an http link:
  const httpLink = new HttpLink({ uri: httpUri });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true
    }
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation }:any = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
      }),
      link
    ]),
    cache: (store)? new ReduxCache({store}) : new InMemoryCache()
  });
}

export default initApolloClient
