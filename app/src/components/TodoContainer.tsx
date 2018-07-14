import * as React from 'react';

import {Query, Mutation, ApolloConsumer} from "react-apollo";
import gql from "graphql-tag";

import TodoForm from './TodoForm'
import {TodoList} from './TodoList'
import ApolloClient from "apollo-client/ApolloClient"


const queryAllTodos = gql`
    {
        allTodos {
            id
            title
            status
        }
    }
`

const TodoListGQL = (props: any) => (
    <Query query={queryAllTodos}>
        {(graphQlProps) => {
            return (
                <TodoList {...props} {...graphQlProps} />
            );
        }}
    </Query>
);


const handleCreateTodo = (createTodo: (payload: any) => void) => (values: any) => {
    console.log('Received values of form: ', values);
    createTodo({
        variables: {varTitle: values.title, varCompleted: values.completed === true},
        refetchQueries: [{query: queryAllTodos}]
    });
}


const TodoFormGQL = (props: React.Props<any>) => (
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


const handleCompleteTodo = (client: ApolloClient<any>, selectedIds: string[]) => {
    console.log(`Completed ID values : ${selectedIds}`);
    return client.mutate({
        mutation: gql`
            mutation($varID:ID!, $varTitle: String!, $varCompleted:Boolean!) {
                updateTodo(id:$varID, content: $varTitle, isCompleted: $varCompleted) {
                    id
                    title
                    status
                }
            }
        `,
        variables: {varID: selectedIds[0], varTitle: 'Updated By GraphQL', varCompleted: true},
        refetchQueries: [{query: queryAllTodos}]
    }).then(data => {
        console.log(`Updated Todo success ${JSON.stringify(data)}`)
    }).catch(error => {
        console.error(`Updated Todo failed ${error}`)
    });
}


const handleDeleteTodo = (client: ApolloClient<any>, selectedIds: string[]) => {
    console.log('Deleting ID values : ', selectedIds);
    return client.mutate({
        mutation: gql`
            mutation($varID:ID!) {
                deleteTodo(id:$varID) {
                    id
                    title
                    status
                }
            }
        `,
        variables: {varID: selectedIds[0], varTitle: 'Updated By GraphQL', varCompleted: true},
        refetchQueries: [{query: queryAllTodos}]
    }).then(data => {
        console.log(`Updated Todo success ${JSON.stringify(data)}`)
    }).catch(error => {
        console.error(`Updated Todo failed ${error}`)
    });
}


export class TodoContainer extends React.Component<any> {

    public render() {

        return (
            <ApolloConsumer>
                {client => (
                    <div>
                        <TodoFormGQL/>
                        <TodoListGQL
                            onDelete={(ids: string[]) => handleDeleteTodo(client, ids)}
                            onComplete={(ids: string[]) => handleCompleteTodo(client, ids)}/>
                    </div>
                )}
            </ApolloConsumer>
        )
    }
}

