import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import InstallationContent from '../InstallationContent';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class InstallationManage extends React.Component {
  render() {
    return <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        theme='light'
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div className="logo" />
        <Menu theme="white" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{textAlign: 'center', height: '100%'}}>
          <SubMenu key="sub1" title={<span>Codecraft</span>}>
            <Menu.Item key="1">安装包管理</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <InstallationContent />
        </div>
        </Content>
      </Layout>
    </Layout>
  }
}