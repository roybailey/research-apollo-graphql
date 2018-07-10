import * as React from 'react'

import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'

import AuditList from './AuditList'


export const AuditContainer = (props:React.Props<any>) => (
  <Subscription
    subscription={gql`
      subscription {
        event {
            id
            timestamp
            namespace
            event
            type
        }
      }
    `}
    variables={{}}
  >
    {({ loading, error, data }) => <AuditList loading={loading} error={error} data={data} />}
  </Subscription>
);
