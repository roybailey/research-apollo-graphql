import * as React from 'react';

import { Table } from 'antd';
import Button from "antd/lib/button/button"

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

//
const actionRowDelete = () => {
    console.log(`rows to delete`);
};

const actionRowCompleted = () => {
    console.log(`rows to complete`);
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
      <div>
          <div className="table-operations">
              <Button onClick={actionRowCompleted}>Mark Completed</Button>
              <Button onClick={actionRowDelete}>Delete</Button>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={
                data.allTodos.map((it:any)=>Object.assign({key : it.id}, it))
              } />
      </div>
  );
}

export default TodoList
