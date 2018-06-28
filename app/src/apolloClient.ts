import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

import { Store } from 'redux'
import { ReduxCache } from 'apollo-cache-redux'

export const initApolloClient = (url:string, store?:Store) => new ApolloClient({
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
    new HttpLink({
      uri: url,
      credentials: 'same-origin'
    })
  ]),
  cache: (store)? new ReduxCache({store}) : new InMemoryCache()
});

export default initApolloClient
