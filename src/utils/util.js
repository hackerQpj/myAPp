import axios from "axios";

export const requestData = (url) => {
  if (url) {
    return axios.get(url);
  }
  return null;
};

export const log = console.log.bind(console);

export const getUserTokenInfo = () => {
  let userTokenInfo;
  try {
    userTokenInfo = JSON.parse(localStorage.getItem("roleInfo")); //获取登录存储的token（roleInfo）数据
  } catch (error) {
    userTokenInfo = null;
  }
  return userTokenInfo;
};
