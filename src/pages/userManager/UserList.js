import React, { useCallback, useEffect, useState } from "react";
import { Table, Switch, Button, Modal, Form } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import UserForm from "../../components/user-manage/UserForm";

export const UserList = () => {
  const [userListData, setUserListData] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateVisible] = useState(false);
  const [regionData, setRegionData] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [regionIsDisable, setRegionIsDisable] = useState(false);
  const [getIdState, setGetIdState] = useState();
  const { confirm } = Modal;
  const [form] = Form.useForm();
  const [userForm] = Form.useForm();

  const {
    role: { id: adminId },
    region: tokenRegion,
  } = JSON.parse(localStorage.getItem("roleInfo")); //获取登录存储的token（roleInfo）数据

  const getUserListdata = useCallback(() => {
    axios.get("http://localhost:3000/users?_expand=role").then((res) => {
      const { data } = res || {};
      if (adminId === 1) {
        setUserListData(data); //超级管理员数据都可以见
      } else {
        setUserListData(
          data.filter((item) => {
            return item.role.id === adminId && item.region === tokenRegion;
          })
        );
      }
    });
  }, [adminId, tokenRegion]);

  useEffect(() => {
    getUserListdata();
    axios.get("http://localhost:3000/regions").then((res) => {
      const { data } = res || {};
      setRegionData(data);
    });
    axios.get("http://localhost:3000/roles").then((res) => {
      const { data } = res || {};
      data.length > 0 && setRoleList(data);
    });
  }, [getUserListdata]);

  const deletefunction = (item) => {
    setUserListData(userListData.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:3000/users/${item.id}`);
  };

  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      key: "region",
      filters: [
        ...regionData.map((item) => {
          return {
            text: item.title,
            value: item.value,
          };
        }),
        {
          text: "全球",
          value: "全球",
        },
      ],
      onFilter: (value, record) => record.region === value,
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => {
        return role.roleName;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "用户状态",
      render: (item) => {
        return (
          <Switch
            checked={item.roleState}
            disabled={item?.default}
            onChange={() => {
              item.roleState = !item.roleState;
              setUserListData([...userListData]);
              axios.patch(`http://localhost:3000/users/${item.id}`, {
                roleState: item.roleState,
              });
            }}
          ></Switch>
        );
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              danger={true}
              style={{ marginRight: "4px" }}
              icon={<DeleteOutlined />}
              shape="circle"
              disabled={item?.id === 1 ? true : false}
              onClick={() => {
                confirm({
                  title: "你确认删除数据吗",
                  onOk() {
                    deletefunction(item);
                  },
                  onCancer() {},
                });
              }}
            ></Button>
            <Button
              type="primary"
              shape="circle"
              disabled={item?.id === 1 ? true : false}
              icon={<EditOutlined />}
              onClick={() => {
                setGetIdState(item.id);
                setIsUpdateVisible(true);
                userForm.setFieldsValue({
                  ...item,
                });
              }}
            ></Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Button
        type="primary"
        style={{ marginTop: "2px", marginBottom: "2px" }}
        onClick={() => {
          form.resetFields();
          setIsAddModalVisible(true);
        }}
      >
        添加用户
      </Button>
      <Table
        dataSource={userListData}
        columns={columns}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 7 }}
      />
      <Modal
        open={isAddModalVisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onOk={() => {
          form
            .validateFields()
            .then((value) => {
              axios
                .post("http://localhost:3000/users?_expand=role", {
                  ...value,
                  roleState: true,
                  default: false,
                })
                .then((res) => {
                  getUserListdata();
                  setIsAddModalVisible(false);
                });
            })
            .catch((err) => {
              console.log("--err--", err);
            });
        }}
        onCancel={() => {
          setIsAddModalVisible(false);
          setRegionIsDisable(false);
        }}
      >
        <UserForm
          regionIsDisable={regionIsDisable}
          regionData={regionData}
          setRegionIsDisable={setRegionIsDisable}
          roleList={roleList}
          form={form}
        />
      </Modal>
      <Modal
        open={isUpdateModalVisible}
        title="更新用户"
        okText="确定"
        cancelText="取消"
        onOk={() => {
          userForm
            .validateFields()
            .then((value) => {
              axios
                .patch(`http://localhost:3000/users/${getIdState}`, {
                  ...value,
                  roleState: true,
                  default: false,
                })
                .then((res) => {
                  getUserListdata();
                  setIsUpdateVisible(false);
                });
            })
            .catch((err) => {
              console.log("err", err);
            });
        }}
        onCancel={() => {
          setIsUpdateVisible(false);
          setRegionIsDisable(false);
        }}
      >
        <UserForm
          regionIsDisable={regionIsDisable}
          regionData={regionData}
          setRegionIsDisable={setRegionIsDisable}
          roleList={roleList}
          form={userForm}
          isUpdate={true}
        />
      </Modal>
    </>
  );
};
