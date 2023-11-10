import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import routeconfig from "./routeConfig";
import SideMemu from "../components/SiderMenu/SideMenu";
import { Layout, theme } from "antd";
import TopHeader from "../components/topheader/TopHeader";
import Nopermission from "./Nopermission";
import { getUserTokenInfo } from "../utils/util";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const { Content } = Layout;

export default function AppRouter(props) {
  const [collapsed, setCollapsed] = useState(false);
  let userTokenInfo = getUserTokenInfo();
  const { role: { menus: { checked = [] } = {} } = {} } = userTokenInfo || {};

  const checkUserPermission = (item) => {
    return checked.includes(item.path); //做路由权限验证
  };

  const renderRoutes = (newList) => {
    if (Array.isArray(newList)) {
      return newList
        .filter((item) => item.path && item.component)
        .map((item, idx) => {
          if (item.chilren) {
            return item.chilren.map((item) => {
              return (
                <Route
                  key={item.id}
                  path={item.path}
                  element={item.component}
                  exact
                ></Route>
              );
            });
          } else {
            return (
              checkUserPermission(item) && (
                <Route
                  key={item.id}
                  path={item.path}
                  element={item.component}
                  exact
                ></Route>
              ) //渲染的路由下面的children
            );
          }
        });
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  NProgress.start();
  
  useEffect(() => {
    NProgress.done();
  }, []);

  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <SideMemu collapsed={collapsed}></SideMemu>

      <Layout
        style={{ display: "flex", flexDirection: "column", height: "700px" }}
      >
        <TopHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        ></TopHeader>

        <Content
          style={{
            margin: "16px 16px",
            minHeight: 280,
            background: colorBgContainer,
            overflow: "auto",
          }}
        >
          <Routes>
            {renderRoutes(routeconfig)}
            <Route path="*" element={<Nopermission />} exact></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
