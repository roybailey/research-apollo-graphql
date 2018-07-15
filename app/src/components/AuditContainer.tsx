import * as React from 'react'

import { Query, Subscription } from 'react-apollo'
import gql from 'graphql-tag'

import AuditList from './AuditList'


const queryAllAuditEvents = gql`
    {
        events {
            id,
            namespace
            event
            type
            timestamp
        }
    }
`

const subscribeAuditEvents = gql`
    subscription {
        event {
            id
            namespace
            event
            type
            timestamp
        }
    }
`;


export const AuditContainer = () => (
  <Query
    query={queryAllAuditEvents}
    variables={{}}
  >
    {({ loading, error, data, subscribeToMore, ...result }) => {
      console.log(data)
      return (<AuditList loading={loading} error={error} data={data}
                         subscribeToNewEvents={() =>
                             subscribeToMore({
                                 document: subscribeAuditEvents,
                                 variables: {},
                                 updateQuery: (prev, { subscriptionData }) => {
                                     console.log(`subscribeToMore.updateQuery`)
                                     console.log(subscriptionData )
                                     console.log(prev)
                                     if (!subscriptionData.data) return prev;
                                     if (subscriptionData.data.event.id===prev.events[0].id) return prev;
                                     const newFeedItem = subscriptionData.data.event;

                                     return Object.assign({}, prev, {
                                       events: [newFeedItem, ...prev.events]
                                     });
                                 }
                             })
                         }
        />)
    }}
  </Query>
);
