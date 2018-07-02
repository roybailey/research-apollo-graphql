import * as React from 'react';

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import TodoForm from './TodoForm'
import TodoList from './TodoList'


const TodoListGQL = (props:React.Props<any>) => (
  <Query query={gql`
      {
        allTodos {
            id
            title
            status
        }
      }
    `}>
    {({ loading, error, data }) => {
      return (
        <TodoList loading={loading} error={error} data={data} />
      );
    }}
  </Query>
);


const handleCreateTodo = (createTodo: (payload:any) => void) => (values:any) => {
  console.log('Received values of form: ', values);
  createTodo({ variables: { varTitle: values.title, varCompleted: values.completed === true } });
}


const TodoFormGQL = (props:React.Props<any>) => (
  <Mutation mutation={gql`
      mutation createTodo($varTitle:String!, $varCompleted:Boolean!) {
        createTodo(content: $varTitle, isCompleted: $varCompleted) {
          id
          title
          status
        }
      }
    `}>{createTodo => (
    <TodoForm onSubmit={handleCreateTodo(createTodo)}/>
  )}
  </Mutation>
);


export const TodoContainer = (props:React.Props<any>) => (
    <div>
      <TodoFormGQL />
      <TodoListGQL />
    </div>
);
