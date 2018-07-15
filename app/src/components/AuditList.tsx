import * as React from 'react'

import {Table, Spin, Timeline, Tag, Icon} from 'antd'

import {Loading, Error} from './Widgets'
import AuditItem from "./AuditItem"


const columns = [{
    title: 'ID',
    dataIndex: 'id',
    render: (text: string) => <a href="javascript:;">{text}</a>,
}, {
    title: 'timestamp',
    dataIndex: 'timestamp',
}, {
    title: 'namespace',
    dataIndex: 'namespace',
}, {
    title: 'event',
    dataIndex: 'event',
}, {
    title: 'type',
    dataIndex: 'type',
}];

interface Props {
    loading: any
    error: any
    data: any
    subscribeToNewEvents: () => void
}

export class AuditList extends React.Component<Props> {

    componentDidMount() {
        this.props.subscribeToNewEvents()
    }

    render() {
        let {loading, error, data}: Props = this.props
        if (loading) {
            return <Loading/>;
        }
        if (error) {
            return <Error message={error}/>;
        }
        //let events = data.events.map((event:any)=>Object.assign({key: event.id}, event))
        return (
            <Timeline>
                {data.events.map((event: any) => (
                    <Timeline.Item key={event.id} color={event.event === 'delete' ? 'red' : 'green'}>
                        <AuditItem event={event} />
                    </Timeline.Item>
                ))}
            </Timeline>
        );
    }
}

export default AuditList
