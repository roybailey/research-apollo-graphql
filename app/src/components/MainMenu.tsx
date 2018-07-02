import * as React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export class MainMenu extends React.Component {
  // public state = {
  //   current: 'home',
  // }
  // private handleClick = (evt:any) => {
    // console.log('click ', evt);
    // this.setState({
    //   current: evt.key,
    // });
  // }
  public render() {
    console.log(JSON.stringify(this.props,null,2));
    
    return (
      <Menu
        theme="dark"
        // onClick={this.handleClick}
        // selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <NavLink activeClassName="active" to="/"><Icon type="home" />Home</NavLink>
        </Menu.Item>

        <Menu.Item key="dinner">
          <NavLink activeClassName="active" to="/dinner"><Icon type="apple" />What's for Dinner</NavLink>
        </Menu.Item>

        <Menu.Item key="todo">
          <NavLink activeClassName="active" to="/todo"><Icon type="schedule" />Todo List</NavLink>
        </Menu.Item>

        <Menu.Item key="audit">
          <NavLink activeClassName="active" to="/audit"><Icon type="bars" />Audit</NavLink>
        </Menu.Item>

        <SubMenu title={<span><Icon type="question-circle-o" />Helpful Links</span>}>
          <MenuItemGroup title="React">
            <Menu.Item key="setting:1">
              <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Ant Design</a>
            </Menu.Item>
            <Menu.Item key="setting:2">GraphQL</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="GraphQL">
            <Menu.Item key="setting:3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">graphql</a>
            </Menu.Item>
            <Menu.Item key="setting:4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">graphql-yoga</a>
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        
        <Menu.Item key="disabled" disabled={true}>
          <Icon type="frown" />Disabled
        </Menu.Item>

      </Menu>
    );
  }
}

export default MainMenu
