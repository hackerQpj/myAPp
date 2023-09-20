import React, { useState, useRef, useEffect } from "react";
import { Layout, Row, theme } from "antd";
import SideMemu from "./components/SideMenu";
import TopHeader from "./components/TopHeader";
import { UnorderedListOutlined } from "@ant-design/icons";
import Test from "./components/Test";
import "./App.css";

const { Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //实现一个倒计时组件
  const useCountDowm = (time) => {
    const [remainTime, setRemainTime] = useState(time);
    useEffect(() => {
      setTimeout(() => {
        if (remainTime > 0) {
          setRemainTime(remainTime - 1);
          console.log("---remainTime---", remainTime);
        }
      }, 1000);
    }, [remainTime]);

    return [remainTime, setRemainTime];
  };

  const [remainTime, setRemainTime] = useCountDowm(0);

  // 使用 useRef 创建一个 ref 对象，并将其初始值设置为 0
  const countRef = useRef(0);

  // 使用 useState 来更新组件的状态
  const [count, setCount] = useState(0);

  const increment = () => {
    console.log("---增加之前count值--", count);
    setCount(count + 1);
    console.log("---增加之后count值--", count);
    countRef.current += 1; // 使用 ref 来保存持久性的计数
  };

  const triple = () => {
    console.log("count", count);
    setCount(count + 1);
    setCount(count + 1);
    console.log("set后的count值", count);
  };

  const reduce = () => {
    setTimeout(() => {
      console.log("count", count); //2
      setCount(count + 1); //在原生事件和settimeout中是同步的
      console.log("set后的count值", count); //3
    }, 0);
  };

  console.log("--外层输出count--", count);

  return (
    <Layout className="main-layout">
      <SideMemu collapsed={collapsed} />
      <Layout>
        <TopHeader
          colorBgContainer={colorBgContainer}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <Content
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ marginRight: "30px" }}
              onClick={() => {
                setRemainTime(10);
              }}
            >
              {remainTime > 0 ? `${remainTime}s后可点击` : "点击开始倒计时"}
            </button>
            <Test />
          </div>

          <div>
            <p>Count (useState): {count}</p>
            <p>Count (useRef): {countRef.current}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={triple}>triple</button>
            <button onClick={reduce}>reduce</button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
