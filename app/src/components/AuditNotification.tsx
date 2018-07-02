import * as React from 'react';

import { Subscription } from "react-apollo";
import gql from "graphql-tag";

import { Button, notification, Icon } from 'antd';


const openNotification = (event:any) => {
  if(event) {
    notification.open({
      message: `${event.timestamp} [${event.namespace} / ${event.event} / ${event.type}]`,
      description: `${event.payload}`,
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
  }
  return ''
};


export const AuditNotification = (props:React.Props<any>) => (
  <Subscription
    subscription={gql`
      subscription {
        event {
            id
            timestamp
            namespace
            event
            type
            payload
        }
      }
    `}
    variables={{}}
  >
    {({ loading, error, data }) => (
      <div>
        {(data)? openNotification(data.event) :''}
      </div>
    )}
  </Subscription>
);
