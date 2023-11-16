import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import { useParams } from "react-router-dom";
import { requestData } from "../../utils/util";
import moment from "moment";

export const NewsPreview = (props) => {
  const { id } = useParams(); //获取传过来的参数id
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    requestData(`/news/${id}?_expand=category`)
      .then((res) => {
        console.log("res", res);
        const { data } = res || {};
        setDataSource(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [id]);

  return (
    dataSource && (
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <div
          style={{
            border: "1px solid rgb(235, 237, 240)",
          }}
        >
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={dataSource?.title}
            subTitle={dataSource.category.title}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="创建者">
                {dataSource.author}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {moment(dataSource?.createTime).format("YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item label="发布时间"></Descriptions.Item>
              <Descriptions.Item label="区域">
                {dataSource.region}
              </Descriptions.Item>
              <Descriptions.Item label="审核状态">
                <span style={{ color: "red" }}>待审核</span>
              </Descriptions.Item>
              <Descriptions.Item label="发布状态">
                <span style={{ color: "red" }}>未发布</span>
              </Descriptions.Item>
              <Descriptions.Item label="访问数量">
                {dataSource.view}
              </Descriptions.Item>
              <Descriptions.Item label="点赞数量">
                {dataSource.star}
              </Descriptions.Item>
              <Descriptions.Item label="评论数量"></Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
        <div
          style={{
            marginTop: "20px",

            paddingLeft: "20px",
            padding: "2 24px",
            border: "1px solid gray",
          }}
        >
          {dataSource &&
            dataSource?.content?.ops?.length > 0 &&
            dataSource?.content?.ops.map((item, idx) => {
              return <div key={idx}> {item.insert}</div>;
            })}
        </div>
      </div>
    )
  );
};
