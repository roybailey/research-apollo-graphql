import * as React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { TodoList } from './TodoList'


export const TodoContainer = (props:React.Props<any>) => (
  <Query
    query={gql`
      {
        allTodos {
            id
            title
            status
        }
      }
    `}
  >
    {({ loading, error, data }) => {
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
        <TodoList loading={loading} error={error} data={data} />
      );
    }}
  </Query>
);
