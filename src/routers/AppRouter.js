import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routeconfig from "./routeConfig";
import SideMemu from "../components/SiderMenu/SideMenu";
import { Layout, theme } from "antd";
import TopHeader from "../components/TopHeader";
const { Content } = Layout;

export default function AppRouter(props) {
  const [collapsed, setCollapsed] = useState(false);
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
                ></Route>
              );
            });
          } else {
            return (
              <Route
                key={item.id}
                path={item.path}
                element={item.component}
              ></Route>
            );
          }
        });
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
      <Layout>
        <TopHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        ></TopHeader>
        <Content
          style={{
            margin: "16px 16px",
            //padding: 12,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>{renderRoutes(routeconfig)}</Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
