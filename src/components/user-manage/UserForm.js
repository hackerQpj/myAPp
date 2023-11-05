import React from "react";
import { Form, Input, Select } from "antd";

export default function UserForm(props) {
  const { regionIsDisable, regionData, setRegionIsDisable, roleList, form } =
    props || {};
  const { Option } = Select;

  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: "Please input your Title",
          },
        ]}
      >
        <Input placeholder="请输入用户名"></Input>
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "Please input your password",
          },
        ]}
      >
        <Input placeholder="请输入密码"></Input>
      </Form.Item>
      <Form.Item
        name="region"
        label="区域"
        rules={
          regionIsDisable
            ? []
            : [
                {
                  required: true,
                  message: "Please input your Title",
                },
              ]
        }
      >
        <Select disabled={regionIsDisable}>
          {regionData.length > 0 &&
            regionData.map((data) => {
              return (
                <Option value={data.value} key={data.id}>
                  {data.value}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[
          {
            required: true,
            message: "Please input your Title",
          },
        ]}
      >
        <Select
          onChange={(roleId) => {
            if (roleId === "1") {
              setRegionIsDisable(true);
              form.setFieldsValue({
                region: "全球",
              });
            } else {
              setRegionIsDisable(false);
            }
          }}
        >
          {roleList.length > 0 &&
            roleList.map((data) => {
              return <Option key={data.id}>{data.roleName}</Option>;
            })}
        </Select>
      </Form.Item>
    </Form>
  );
}
