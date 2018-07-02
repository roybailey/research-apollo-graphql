import * as React from 'react';

import { Spin } from 'antd';


export const Loading = () => (
  <React.Fragment>
    <Spin size="large" />
    <h1 style={{display: 'inline', padding: '0em 0.5em'}}> Loading... </h1>
  </React.Fragment>
)


export const Error = ({ error }:any) => (
  <React.Fragment>
    <p>Error :(</p>
    <p>{error}</p>
  </React.Fragment>
)
