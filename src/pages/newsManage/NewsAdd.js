import React, { useEffect, useRef, useState } from "react";
import {
  Steps,
  Button,
  Form,
  Input,
  Select,
  message,
  notification,
} from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import { getUserTokenInfo, requestData } from "../../utils/util";
import NewsEditor from "../../components/news-manage/NewsEditor";
import { Flex } from "antd/lib";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const NewsAdd = () => {
  const [current, setCurrent] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [formInfo, setFormInfo] = useState();
  const [contentData, setContentData] = useState();
  const [form] = Form.useForm();
  const reactQuillRef = useRef(null);
  const { Option } = Select;
  const navigate = useNavigate();

  const userTokenInfo = getUserTokenInfo();

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  useEffect(() => {
    requestData("/categories").then((res) => {
      const { data } = res || {};
      setCategoryData(data);
    });
  }, []);

  const handleSave = (auditState) => {
    axios
      .post("http://localhost:3000/news", {
        ...formInfo,
        content: contentData,
        region: userTokenInfo?.region ? userTokenInfo?.region : "全球",
        author: userTokenInfo.username,
        roleId: userTokenInfo.roleId,
        auditState: auditState, //存到草稿箱
        publishState: 0,
        createTime: Date.now(),
        star: 0,
        view: 0,
      })
      .then((res) => {
        navigate(
          auditState === 0 ? "/news-manage/drafts" : "/audit-manage/audit-lists"
        );
        notification.info({
          message: `通知`,
          description: `你可以到${
            auditState === 0 ? "草稿箱" : "审核列表"
          }中查看你的新闻`,
          placement: "top",
        });
      });
  };

  return (
    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <PageHeader
        title="撰写新闻"
        style={{ marginTop: "20px", marginLeft: "20px" }}
      />

      <Steps
        current={current}
        items={[
          {
            title: "基本信息",
            description: "新闻标题，新闻分类",
          },
          {
            title: "新闻内容",
            description: "新闻主题内容",
          },
          {
            title: "新闻提交",
            description: "保存草稿或者提交审核",
          },
        ]}
        onChange={onChange}
      />

      {current === 0 && (
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          form={form}
        >
          <Form.Item
            label="新闻标题"
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
            style={{ marginTop: "30px" }}
          >
            <Input placeholder="请输入新闻标题" />
          </Form.Item>

          <Form.Item
            label="新闻分类"
            name="categoryId"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="请选择新闻分类"
              // onChange={onGenderChange}
              allowClear
            >
              {categoryData &&
                categoryData.length > 0 &&
                categoryData.map((item, idx) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.value}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
        </Form>
      )}
      <NewsEditor reactQuillRef={reactQuillRef} current={current} />
      <div
        style={{
          marginTop: 24,
          display: Flex,
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
        }}
      >
        {current < 2 && (
          <Button
            type="primary"
            onClick={() => {
              if (current === 0) {
                form
                  .validateFields()
                  .then((value) => {
                    console.log("value", value);
                    setFormInfo(value);
                    setCurrent(current + 1);
                  })
                  .catch((err) => {
                    //console.log("--err--", err);
                  });
              } else {
                const content = reactQuillRef.current.editor.getContents();
                console.log(
                  "content666",
                  content.ops[0].insert === "\n",
                  !!content
                );
                if (content && content.ops[0].insert === "\n") {
                  message.error("请输入新闻内容");
                } else {
                  setCurrent(current + 1);
                  setContentData(content);
                }
              }
            }}
          >
            下一步
          </Button>
        )}
        {current === 2 && (
          <Button
            type="primary"
            style={{ marginRight: "8px" }}
            onClick={() => {
              handleSave(0);
            }}
          >
            保存草稿箱
          </Button>
        )}
        {current === 2 && (
          <Button
            danger
            onClick={() => {
              handleSave(1);
            }}
          >
            提交审核
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => {
              setCurrent(current - 1);
            }}
          >
            上一步
          </Button>
        )}
      </div>
    </div>
  );
};
