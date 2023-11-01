import React, { useEffect, useState } from "react";

export const RoleList = () => {
  let arrList = [
    { title: "水果" },
    { title: "衣服" },
    { title: "水果" },
    { title: "衣服" },
    { title: "水果" },
    { title: "衣服" },
    { title: "水果" },
    { title: "衣服" },
    { title: "水果" },
    { title: "衣服" },
    { title: "水果" },
    { title: "衣服" },
    { title: "水果" },
    { title: "衣服" },
  ];

  const [initData, setInitData] = useState(arrList.slice(0, 8));

  
  useEffect(() => {
    const content = document.getElementById("container");
   

    const handler = () => {
      console.log('--执行handler--');
      const isBottom = () => {
        return content.scrollTop + content.clientHeight >= content.scrollHeight;
      };
      let page = 1;
      if (isBottom()) {
       
        page++;
        //console.log("page", page);
        setInitData(arrList.slice(0, page * 8));
      }
    };

    content.addEventListener("scroll", handler);

    // return () => {
    //   window.removeEventListener("scroll", handler);
    // };
  }, []);

  return (
    <div
      id="container"
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignContent: "flex-start",
          width: "302px",
        }}
      >
        {initData.length > 0 &&
          initData.map((item, idx) => {
            return (
              <div
                style={{
                  width: "150px",
                  height: "160px",
                  backgroundColor: "gray",
                  color: "green",
                  marginTop: "2px",
                }}
              >
                {item.title}
              </div>
            );
          })}
      </div>
    </div>
  );
};
