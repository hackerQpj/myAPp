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
    scriptUrl: "//at.alicdn.com/t/c/font_4222344_bl59uk22qdg.js",
  });

  const iconList = {
    "/home": <HomeFilled />,
    "/user-manage": <UserOutlined />,
    "/user-manage/list": <IconFont type="icon-list" />,
    "/limit-manage": <IconFont type="icon-quanxianguanli" />,
    "/limit-manage/limit-list": <IconFont type="icon-quanxianliebiao" />,
    "/limit-manage/role-list": <IconFont type="icon-jiaoseliebiao" />,
    "/news-manage": <IconFont type="icon-xinwendongtai" />,
    "/news-manage/add": <IconFont type="icon-tiaoyanjihua" />,
    "/news-manage/drafts": <IconFont type="icon-caogaoxiang" />,
    "/news-manage/sort": <IconFont type="icon-fenlei" />,
    "/audit-manage": <IconFont type="icon-shenhe" />,
    "/audit-manage/audit-news": <IconFont type="icon-shenheguanli" />,
    "/audit-manage/audit-lists": <IconFont type="icon-icon" />,
    "/publish-manage": <IconFont type="icon-fabu" />,
    "/publish-manage/unpublished": <IconFont type="icon-daifabu" />,
    "/publish-manage/published": <IconFont type="icon-yifabu" />,
    "/publish-manage/sunset": <IconFont type="icon-yiguanbi" />,
  };
  //形成一个映射对象

  const [munuData, setMenuData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/menus?_embed=children").then((res) => {
      const { data } = res || {};
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item) => {
          if (item.children.length === 0) {
            item.children = "";
          }
        });
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

  let tokenData;
  try {
    if (localStorage.getItem("roleInfo")) {
      tokenData = JSON.parse(localStorage.getItem("roleInfo")); //获取登录存储的token（roleInfo）数据
    }
  } catch (error) {
    tokenData = {};
  }
  const { role: { menus: { checked = [] } = {} } = {} } = tokenData;

  const checkPagePermit = (filterItems) => {
    return (
      filterItems.permission === 1 &&
      checked &&
      checked.includes(filterItems?.key)
    );
  }; //权限等级为1的才会渲染

  const renderMenu = (siderData) => {
    return siderData
      .filter((items) => items.path && items.title)
      .map((filterItems, idx) => {
        if (filterItems.children) {
          return (
            checkPagePermit(filterItems) && (
              <SubMenu
                key={filterItems.path}
                icon={iconList[filterItems.path] || filterItems.icon}
                title={filterItems.title}
              >
                {renderMenu(filterItems.children)}
              </SubMenu>
            )
          );
        }
        return (
          checkPagePermit(filterItems) && (
            <Menu.Item
              key={filterItems.path}
              icon={iconList[filterItems.path] || filterItems.icon}
              onClick={() => {
                navigate(filterItems.path);
              }}
            >
              {filterItems.title}
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
          <div className="logo">新闻管理平台</div>
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
