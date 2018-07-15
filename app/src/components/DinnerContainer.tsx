import * as React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";
import {Button} from "antd"


export const DinnerContainer = (props:React.Props<any>) => (
  <Query
    query={gql`
      {
        whatsForDinner
      }
    `}
  >
    {({ loading, error, data, refetch }) => {
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
          <h1>{data.whatsForDinner}</h1>
          <Button onClick={() => refetch()}>Refetch!</Button>
        </div>
      );
    }}
  </Query>
);
