import { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar, Space, Dropdown, message ,theme} from "antd";
const { Header } = Layout;

export default function TopHeader({ collapsed, setCollapsed }) {
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    showMessage && message.info("close the menu");
  }, [showMessage]);

  const handleMenuClick = (e) => {
    if (e.key === "2") {
      setOpen(false);
    }
  };

  const handleOpenChange = (flag) => {
    setOpen(flag);
    setShowMessage(!flag);
  };

  const items = [
    {
      label: "超级管理员",
      key: "1",
    },
    {
      label: "退出",
      key: "2",
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: 10 }}>欢迎admin回来</span>
          <Dropdown
            menu={{
              items,
              onClick: handleMenuClick,
            }}
            onOpenChange={handleOpenChange}
            open={open}
            arrow={true}
          >
            <Space direction="vertical" size={16}>
              <Avatar
                size={48}
                icon={<UserOutlined />}
                style={{ marginRight: 20 }}
              />
            </Space>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
