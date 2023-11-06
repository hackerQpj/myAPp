import axios from "axios";

export const requestData = (url) => {
  if (url) {
    return axios.get(url);
  }
  return null;
};

export const log = console.log.bind(console)
