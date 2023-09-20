import {
  UserOutlined,
  HomeFilled,
  createFromIconfontCN,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./index.css";
const { Sider } = Layout;

export default function SideMemu({ collapsed }) {
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/c/font_4222344_ljja3jak09.js",
  });

  const items = [
    {
      key: "sub1",
      icon: <HomeFilled />,
      label: "首页",
      children: [
        { key: "1", label: "option1" },
        { key: "2", label: "option2" },
      ],
    },
    {
      key: "sub2",
      icon: <UserOutlined />,
      label: "用户管理",
      children: [
        {
          key: "3",
          label: "用户列表",
        },
        {
          key: "4",
          label: "option4",
          children: [{ key: "5", label: "option5" }],
        },
      ],
    },
    {
      key: "sub3",
      icon: <IconFont type="icon-quanxian" />,
      label: "权限管理",
      children: [
        { key: "1", label: "角色列表" },
        { key: "2", label: "权限列表" },
      ],
    },
    {
      key: "sub4",
      icon: <IconFont type="icon-xinwen" />,
      label: "新闻管理",
      children: [{ key: "1", label: "新闻列表" }],
    },
    {
      key: "sub5",
      icon: <IconFont type="icon-shenhe" />,
      label: "审核管理",
      children: [
        { key: "1", label: "option1" },
        { key: "2", label: "option2" },
      ],
    },
    {
      key: "sub6",
      icon: <IconFont type="icon-fabu" />,
      label: "发布管理",
      children: [
        { key: "1", label: "option1" },
        { key: "2", label: "option2" },
      ],
    },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">全球新闻发布系统</div>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["sub1"]}
        items={items}
      />
    </Sider>
  );
}
