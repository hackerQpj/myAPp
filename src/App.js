import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import SideMemu from "./components/SideMenu";
import TopHeader from "./components/TopHeader";
const { Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <SideMemu collapsed={collapsed} />
      <Layout>
        <TopHeader
          colorBgContainer={colorBgContainer}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
