import React from "react";
import { UserOutlined, HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./index.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

function SideMemu(props) {
  const { collapsed } = props;
  const navigate = useNavigate();

  const siderData = [
    {
      title: "首页",
      icon: <HomeFilled />,
      permission: 1,
      path: "/home",
    },
    {
      title: "用户管理",
      icon: <UserOutlined />,
      permission: 1,
      path: "/user-manage",
      children: [
        {
          title: "用户列表",
          path: "/user-list",
          icon: <UserOutlined />,
        },
      ],
    },
    {
      title: "权限管理",
      icon: <UserOutlined />,
      permission: 1,
      path: "limit-manage",
      children: [
        {
          title: "权限列表",
          path: "/limit-list",
          icon: <UserOutlined />,
        },
      ],
    },
  ];

  const renderMenu = (siderData) => {
    return siderData.map((item, idx) => {
      if (item.children) {
        return (
          <SubMenu key={item.path} icon={item.icon} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item
          key={item.path}
          icon={item.icon}
          onClick={() => {
            navigate(item.path);
          }}
        >
          {item.title}
        </Menu.Item>
      );
    });
  };

  return (
    <Layout
      className="layoutContainer"
      style={{ display: "flex", flexGrow: 0 }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">知音平台</div>
        <Menu mode="inline" theme="dark">
          {renderMenu(siderData)}
        </Menu>
        {/* mode决定submenu子组件展开方式 */}
      </Sider>
    </Layout>
  );
}

export default SideMemu;
