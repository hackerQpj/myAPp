import axios from "axios";

export const requestData = (url) => {
  const BASE_URL = "http://localhost:3000";
  if (url) {
    if (url.includes("http://localhost:3000")) {
      return axios.get(url);
    } else {
      return axios.get(`${BASE_URL}${url}`);
    }
  } else {
    return null;
  }
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

const printCountdown = () => {
  const intervals = [6000, 5000, 4000]; // 间隔时间（毫秒）
  const countdowns = [6, 5, 4]; // 对应的倒计时秒数

  let currentIndex = 0;

  const print = () => {
    const countdown = countdowns[currentIndex];
    console.log(countdown + " 秒");
    currentIndex = (currentIndex + 1) % intervals.length;
    setTimeout(print, intervals[currentIndex]);
  };

  // 初始启动
  print();
};

