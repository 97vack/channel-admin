import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { message as Message } from "antd";
import { useLoginStateStore } from "@/store/useLoginStateStore";

export type UseRequestType = {
  isSuccessNotify?: boolean;
  formatResult?: (data: any) => any;
  isErrorNotify?: boolean;
  isAllowCancelError?: boolean;
  format?: boolean;
} & AxiosRequestConfig;

const apiUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 100000,
});

const notifyMessage = (response: any, data: any, status: number) => {
  const { config } = response;
  const customRequestOptions: UseRequestType = ((config || {}) as any)
    .customRequestOptions;
  const { isErrorNotify = true, isSuccessNotify = false } =
    customRequestOptions;

  const { code, message } = data;
  if (status === 200) {
    if (isSuccessNotify && code == 0) {
      Message.success(message ?? "请求成功");
      return;
    }
    if (code !== 0 && isErrorNotify) {
      Message.error(message || "请求错误");
    }
  } else {
    if (isErrorNotify) {
      Message.error(message || "请求错误");
    }
    if (status === 401) {
      useLoginStateStore.getState().clear();
      window.location.href = "/login";
    }
  }
};

axiosInstance.interceptors.request.use(
  function (config) {
    const user = useLoginStateStore.getState().getLocalStorage();
    // 在发送请求之前做些什么
    config.headers.authorization = user?.token || "";
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    notifyMessage(response, response.data, response.status);
    return response.data;
  },
  function (error) {
    const {
      response: { data, status },
    } = error;
    notifyMessage(error, data, status);
    return Promise.resolve(data);
  }
);

export const request = (
  str: string,
  requestParams?: any,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { method = "get" } = axiosRequestConfig || {};

  const formatParams =
    method === "get" ? { params: requestParams } : requestParams;

  if (method === "get") {
    return axiosInstance.get(str, {
      ...axiosRequestConfig,
      ...formatParams,
    });
  }
  return (axiosInstance as any)[method](str, formatParams, axiosRequestConfig);
};

export default axiosInstance;
