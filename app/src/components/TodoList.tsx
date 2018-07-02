import * as React from 'react';

import { Table } from 'antd';

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  render: (text:string) => <a href="javascript:;">{text}</a>,
}, {
  title: 'title',
  dataIndex: 'title',
}, {
  title: 'Status',
  dataIndex: 'status',
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys:any, selectedRows:any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record:any) => ({
    disabled: record.disabled === true, // Column configuration not to be checked
    name: record.title,
  }),
};

interface Props {
  loading:any
  error:any
  data:any
}

export const TodoList = ({ loading, error, data }:Props) => {
  if (loading) {
      return <p>Loading...</p>;
  }
  if (error) {
      return (
        <React.Fragment>
          <p>Error :(</p>
          <p>{error}</p>
        </React.Fragment>
      );
  }
  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data.allTodos} />
  );
};

export default TodoList
