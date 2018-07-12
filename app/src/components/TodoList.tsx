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


interface ITodoListProps {
    loading:any
    error:any
    data:any
    refetch:any
    onDelete:any
    onComplete:any
}


class TodoList extends React.Component<ITodoListProps> {

    public state = {
        selectedRowKeys: []
    }

    // rowSelection object indicates the need for row selection
    private onSelectChange = (selectedRowKeys:any, selectedRows:any) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({selectedRowKeys: selectedRowKeys})
    }

    public getCheckboxProps = (record:any) => ({
        disabled: record.disabled === true, // Column configuration not to be checked
        name: record.title,
    })

    //
    private actionRowDelete = () => {
        console.log(`rows to delete ${this.state.selectedRowKeys}`);
        this.props.onDelete(this.state.selectedRowKeys)
        this.setState({selectedRowKeys:[]})
    };

    private actionRowCompleted = () => {
        console.log(`rows to mark as completed ${this.state.selectedRowKeys}`);
        this.props.onComplete(this.state.selectedRowKeys)
        this.setState({selectedRowKeys:[]})
    };

    public render() {
        let {loading, error, data}:any = this.props

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
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: this.getCheckboxProps,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div className="table-operations" style={{padding: '10px'}}>
                    <Button type="primary" shape="circle" icon="download" onClick={() => this.props.refetch()}></Button>
                    <Button.Group size={"large"}>
                        <Button type="primary" disabled={!hasSelected} onClick={this.actionRowCompleted}>Mark Completed</Button>
                        <Button type="danger" disabled={!hasSelected} onClick={this.actionRowDelete}>Delete</Button>
                    </Button.Group>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection}
                       columns={columns}
                       pagination={{pageSize: 1000}}
                       dataSource={
                            data.allTodos.map((it: any) => Object.assign({key: it.id}, it))
                       }/>
            </div>
        );
    }
}

export default TodoList
