import React from "react";

export const UserList = () => {
  let urlArr = ["manage_type=myprojects", "projectId=4222344"];

  const fuc1 = (arr) => {
    
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      let subKey = urlArr[i].split("=")[0];
      let subValue = urlArr[i].split("=")[1];
      obj[subKey] = subValue;
    }
    return obj;
  };

  return (
    <div
      onClick={() => {
        console.log(fuc1(urlArr));
      }}
    >
      userList
    </div>
  );
};
