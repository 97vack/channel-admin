import axios from "axios";

export const instance = axios.create({
  baseURL: "api",
  timeout: 100000,
});

instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const {
      response: { data },
    } = error;
    const { message } = data || {};
    // showNotify({ type: "danger", message });
    return Promise.reject(error);
  }
);

export default instance;
