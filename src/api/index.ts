import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { message as Message } from "antd";

export type UseRequestType = {
  isSuccessNotify?: boolean;
  formatResult?: (data: any) => any;
  isErrorNotify?: boolean;
  isStopReject?: boolean;
} & AxiosRequestConfig;

export const axiosInstance = axios.create({
  baseURL: "api",
  timeout: 100000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const {
      config,
      response: { data },
    } = error;
    const customRequestOptions: UseRequestType = (config || {})
      .customRequestOptions;
    const { isErrorNotify = true } = customRequestOptions;
    if (isErrorNotify) {
      Message.error(data?.message || "请求错误");
    }
    return Promise.resolve(data);
  }
);

export const request = (
  str: string,
  requestParams: any,
  axiosRequestConfig: AxiosRequestConfig
) => {
  const { method = "get" } = axiosRequestConfig || {};
  const formatParams =
    method === "get" ? { params: requestParams } : requestParams;

  if (method === "get") {
    return axios.get(str, {
      ...axiosRequestConfig,
      ...formatParams,
    });
  }
  return (axiosInstance as any)[method](str, formatParams, axiosRequestConfig);
};

export default axiosInstance;
