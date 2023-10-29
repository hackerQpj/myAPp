import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  HomeFilled,
  createFromIconfontCN,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./index.css";
import axios from "axios";
const { Sider } = Layout;
const { SubMenu } = Menu;

function SideMemu(props) {
  const { collapsed } = props;
  const navigate = useNavigate();
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/c/font_4222344_5ont97j1bn6.js",
  });

  const iconList = {
    "/home": <HomeFilled />,
    "/user-manage": <UserOutlined />,
    "/user-list": <IconFont type="icon-list" />,
    "limit-manage": <IconFont type="icon-quanxianguanli" />,
    "/limit-list": <IconFont type="icon-quanxianliebiao" />,
    "/role-list": <IconFont type="icon-jiaoseliebiao" />,
  };
  //形成一个映射对象

  const [munuData, setMenuData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/menu").then((res) => {
      const { data } = res || {};
      if (Array.isArray(data) && data.length > 0) {
        setMenuData(data); //请求接口数据
      }
    });
  }, []);

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
          icon: <IconFont type="icon-list" />,
        },
      ],
    },
    {
      title: "权限管理",
      icon: <IconFont type="icon-quanxianguanli" />,
      permission: 1,
      path: "limit-manage",
      children: [
        {
          title: "权限列表",
          path: "/limit-list",
          icon: <IconFont type="icon-quanxianliebiao" />,
        },
      ],
    },
  ];

  const openKeys = `/${window.location.pathname.split("/")[1]}`;

  const checkPagePermit = (item) => {
    return item.permission === 1;
  }; //权限等级为1的才会渲染

  const renderMenu = (siderData) => {
    return siderData
      .filter((items) => items.path && items.title)
      .map((items, idx) => {
        if (items.children) {
          return (
            <SubMenu
              key={items.path}
              icon={iconList[items.path] || items.icon}
              title={items.title}
            >
              {renderMenu(items.children)}
            </SubMenu>
          );
        }
        return (
          checkPagePermit(items) && (
            <Menu.Item
              key={items.path}
              icon={iconList[items.path] || items.icon}
              onClick={() => {
                navigate(items.path);
              }}
            >
              {items.title}
            </Menu.Item>
          )
        );
      });
  };

  return (
    <Layout
      className="layoutContainer"
      style={{ display: "flex", flexGrow: 0 }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div className="logo">知音平台</div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={[`${window.location?.pathname}`]}
              defaultOpenKeys={[openKeys]}
            >
              {renderMenu(munuData || siderData)}
            </Menu>
            {/* mode决定submenu子组件展开方式 */}
          </div>
        </div>
      </Sider>
    </Layout>
  );
}

export default SideMemu;
