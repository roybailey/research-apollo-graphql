import * as React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";


export const DinnerContainer = (props:React.Props<any>) => (
  <Query
    query={gql`
      {
        whatsForDinner
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
        <h1>{data.whatsForDinner}</h1>
      );
    }}
  </Query>
);
