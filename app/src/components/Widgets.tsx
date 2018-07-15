import * as React from 'react';

import { Spin } from 'antd';


export const Loading = ({ ...props }:any) => (
  <React.Fragment>
    <Spin size="large" />
    <h1 style={{display: 'inline', padding: '0em 0.5em'}}> Loading... </h1>
    {props.children}
  </React.Fragment>
)


export const Error = ({ error, ...props }:any) => (
  <React.Fragment>
    <p>Error :(</p>
    <p>{error}</p>
    {props.children}
  </React.Fragment>
)
