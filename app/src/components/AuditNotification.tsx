import * as React from 'react';

import { Subscription } from "react-apollo";
import gql from "graphql-tag";

import {List, notification, Icon, Tag} from 'antd';



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
          <List
              itemLayout="horizontal"
              dataSource={[(data)? data.event : {}]}
              renderItem={(event:any) => {
                  return (event.namespace)? (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href="/audit">{`${event.namespace} / ${event.event} / ${event.type}`}</a>}
                            description={
                              <div>
                                <Icon type={event.event==='delete'? 'frown':'smile-circle'} style={{ color: event.event==='delete'? 'red':'blue' }} />
                                &nbsp;
                                <Tag color={event.event==='delete'? 'red':'blue'}>{event.timestamp}</Tag>
                              </div>
                            }
                        />
                    </List.Item>
                  ) : <i>...waiting...</i>
              }}
          />,
      </div>
    )}
  </Subscription>
);
