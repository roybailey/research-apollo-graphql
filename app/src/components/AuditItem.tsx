import * as React from 'react'

import {Tag, Icon} from 'antd'


export const AuditItem = ({event}:any) => (
    <div>
        <Icon type={event.event === 'delete' ? 'frown' : 'smile-circle'}
              style={{color: event.event === 'delete' ? 'red' : 'blue'}}/>
        &nbsp;
        <Tag color={event.event === 'delete' ? 'red' : 'blue'}>{event.timestamp}</Tag>
        `{event.namespace} / {event.event} / {event.type}`
    </div>
);

export default AuditItem
