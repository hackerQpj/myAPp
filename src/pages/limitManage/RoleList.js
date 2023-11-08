import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Tree } from "antd";
import { DeleteOutlined, BarsOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

export const RoleList = () => {
  const { confirm } = Modal;
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentId, setCurrentId] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/roles").then((res) => {
      const { data = [] } = res || {};
      data.length > 0 && setDataSource(data);
    });
    axios.get("http://localhost:3000/menus?_embed=children").then((res) => {
      const { data = [] } = res || {};
      data.length > 0 && setTreeData(data);
    });
  }, []);

  const delefuction = (item) => {
    axios.delete(`http://localhost:3000/roles/${item.id}`);
    setDataSource(dataSource.filter((data) => data.id !== item.id));
  };

  const onCheck = (checkValues) => {
    console.log("checkValues", checkValues);
    setCurrentData(checkValues);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "操作",
      dataIndex: "",
      key: "address",
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
                  title: "你确认删除数据嘛",
                  icon: <ExclamationCircleOutlined />,
                  okText: "确认",
                  cancelText: "取消",
                  onOk: () => {
                    delefuction(item);
                  },
                  onCancel: () => {},
                });
              }}
            />

            <Button
              type="primary"
              shape="circle"
              onClick={() => {
                setModalVisible(true);
                console.log("item", item);
                setCurrentData(item?.menus);
                setCurrentId(item?.id);
              }}
              icon={<BarsOutlined />}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id} //有一个唯一key不会报红
      />
      <Modal
        title="权限分配"
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
          setDataSource(
            dataSource.map((item) => {
              if (item.id === currentId) {
                return {
                  ...item,
                  menus: currentData,
                };
              }
              return item;
            })
          );

          axios.patch(`http://localhost:3000/roles/${currentId}`, {
            menus: currentData,
          });
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <Tree
          checkable
          checkedKeys={currentData}
          onCheck={onCheck}
          checkStrictly={true}
          treeData={treeData}
        />
      </Modal>
    </>
  );
};
