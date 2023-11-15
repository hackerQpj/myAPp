import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import routeconfig from "./routeConfig";
import SideMemu from "../components/sidermenu/SideMenu";
import { Layout, theme } from "antd";
import TopHeader from "../components/topheader/TopHeader";
import Nopermission from "./Nopermission";
import { getUserTokenInfo } from "../utils/util";
import axios from "axios";

const { Content } = Layout;

export default function AppRouter(props) {
  const [collapsed, setCollapsed] = useState(false);
  let userTokenInfo = getUserTokenInfo();
  const { role: { menus: { checked = [] } = {} } = {} } = userTokenInfo || {};

  const checkUserPermission = (item) => {
    return checked.includes(item.path); //做路由权限验证
  };

  // useEffect(() => {
  //   Promise.all([
  //     axios.get("http://localhost:3000/menus"),
  //     axios.get("http://localhost:3000/children"),
  //   ]).then((res) => {
  //     console.log("res", res);//两个接口同时请求成功后返回数据，
  //   });
  // }, []);

  //newList可以从服务端获取，但是最后还是要通过路径映射到本地的地址
  const renderRoutes = (newList) => {
    if (Array.isArray(newList)) {
      return newList
        .filter((item) => item.path && item.component)
        .map((item, idx) => {
          if (item.children) {
            return item.children.map((item) => {
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
