import { Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Modal, Popover } from "antd";
import { Tag } from "antd";
import { requestData } from "../util";
import axios from "axios";
import { Switch } from "antd";

export const LimitList = () => {
  const [dataSource, setDataSource] = useState([]);
  const { confirm } = Modal;

  useEffect(() => {
    //_embed=children与子表进行关联
    requestData("http://localhost:3000/menus?_embed=children").then((res) => {
      const { data } = res || {};
      if (data && data.length > 0) {
        data.forEach((item) => {
          if (item.children.length === 0) {
            item.children = "";
          }
        });
        setDataSource(res.data);
      }
    });
  }, []);

  const deletefunction = (item) => {
    console.log("item.grade", item.grade);
    if (item.grade === 1) {
      setDataSource(dataSource.filter((data) => data.id !== item.id));
      axios.delete(`http://localhost:3000/menus/${item.id}`);
    } else {
      let list = dataSource.filter((data) => data.id === item.menuId); //找到父级
      list[0].children = list[0].children.filter((data) => data.id !== item.id);
      setDataSource([...dataSource]);
      axios.delete(`http://localhost:3000/children/${item.id}`);
    }
  };

  const switchMethod = (item) => {
    item.permission = item.permission === 1 ? 0 : 1;
    setDataSource([...dataSource]);
    if (item.grade === 1) {
      axios.patch(`http://localhost:3000/menus/${item.id}`, {
        permission: item.permission,
      });
    } else {
      axios.patch(`http://localhost:3000/children/${item.id}`, {
        permission: item.permission,
      });
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "权限名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "权限路径",
      dataIndex: "path",
      key: "path",
      render: (itemPath) => {
        return <Tag color="orange">{itemPath}</Tag>;
      },
    },
    {
      title: "操作",
      key: "active",
      render: (item) => {
        return (
          <div>
            <Button
              danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              style={{ marginRight: "4px" }}
              onClick={() => {
                confirm({
                  title: "你确认删除数据吗?",
                  icon: <ExclamationCircleFilled />,
                  onOk() {
                    deletefunction(item);
                  },
                  onCancel() {
                    //console.log("Cancel");
                  },
                });
              }}
            />
            <Popover
              title="页面配置项"
              trigger={item.permission === 1 ? "click" : ""}
              content={
                <Switch
                  checked={!!item.permission}
                  onChange={() => {
                    switchMethod(item);
                  }}
                ></Switch>
              }
            >
              <Button
                type="primary"
                shape="circle"
                disabled={item.permission === 0 ? true : false}
                icon={<EditOutlined />}
              />
            </Popover>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 5 }}
      rowKey={(item) => item.id}
    />
  );
};
