import * as React from 'react';
import { Layout, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

import { MainMenu } from './components/MainMenu';

import './AppLayout.css'


export const AppLayout = (props:React.Props<any>) => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <MainMenu />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
      {props.children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Typescript React Apollo GraphQL ©2018 Created by Curious People 
    </Footer>
  </Layout>
);
