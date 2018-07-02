import * as React from 'react'

import { Table, Spin } from 'antd'

import { Loading, Error } from './Widgets'


const columns = [{
  title: 'ID',
  dataIndex: 'id',
  render: (text:string) => <a href="javascript:;">{text}</a>,
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
  loading:any
  error:any
  data:any
}

export const AuditList = ({ loading, error, data }:Props) => {
  if (loading) {
      return <Loading />;
  }
  if (error) {
      return <Error message={error} />;
  }
  return (
    <Table columns={columns} dataSource={[Object.assign({key: data.event.id}, data.event)]} />
  );
};

export default AuditList
