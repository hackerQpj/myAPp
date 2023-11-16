import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getUserTokenInfo, requestData } from "../../utils/util";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Drafts = () => {
  const [dataSource, setDataSource] = useState();
  let userTokenInfo = getUserTokenInfo();
  const { username } = userTokenInfo;
  const { confirm } = Modal;
  const navigate = useNavigate();

  useEffect(() => {
    requestData(`/news?author=${username}&auditState=0&_expand=category`)
      .then((res) => {
        const { data } = res || {};
        setDataSource(data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [username, dataSource]);

  const handleDelete = (id) => {
    setDataSource(dataSource.filter((data) => data.id !== id));
    axios.delete(`http://localhost:3000/news/${id}`);
  };

  const handleSudmit = (auditState, id) => {
    setDataSource(dataSource.filter((data) => data.auditState !== auditState));
    //这里用auditState可能不会引起组件重新渲染，可以用ID，id变化会直接重新渲染组件，
    //另外一种办法看useeffect依赖项添加dataSouce变化也可以重新渲染组件
    axios.patch(`http://localhost:3000/news/${id}`, {
      auditState,
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (item) => {
        return <b>{item}</b>;
      },
    },
    {
      title: "新闻标题",
      render: (item, idx) => {
        return <a href={`/news-manage/preview/${item.id}`}>{item.title}</a>;
      },
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "新闻分类",
      dataIndex: "category",
      key: "category",
      render: (item) => {
        return item.title;
      },
    },
    {
      title: "操作",
      render: (item, idx) => {
        const { id } = item || {};
        return (
          <div>
            <Button
              icon={<DeleteOutlined />}
              shape="circle"
              danger
              style={{ marginRight: "4px" }}
              onClick={() => {
                confirm({
                  title: "你确认删除此数据吗?",
                  onOk() {
                    handleDelete(id);
                  },
                  onCancel() {
                    //console.log("Cancel");
                  },
                });
              }}
            ></Button>
            <Button
              icon={<EditOutlined />}
              shape="circle"
              style={{ marginRight: "4px" }}
              onClick={() => {
                navigate(`/news-manage/update/${id}`);
              }}
            ></Button>
            <Button
              icon={<UploadOutlined />}
              shape="circle"
              type="primary"
              onClick={() => {
                confirm({
                  title: "你确认提交审核新闻吗?",
                  onOk() {
                    handleSudmit(1, id);
                  },
                  onCancel() {
                    //console.log("Cancel");
                  },
                });
              }}
            ></Button>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(item) => item.id}
    />
  ); //有一个唯一key不会报红
};
