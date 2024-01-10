import React, { useState } from "react";
import { message as Message } from "antd";
import { instance } from "@/api";
import { AxiosRequestConfig } from "axios";

export type UseRequestType = {
  isSuccessNotify?: boolean;
  formatResult?: (data: any) => any;
  isErrorNotify?: boolean;
  isStopReject?: boolean;
} & AxiosRequestConfig;

export const packUrl =
  (str: string, method: AxiosRequestConfig["method"]) => (params: any) =>
    (instance as any)[method || "get"](str, params);

export const useRequest = (api: any, options?: UseRequestType) => {
  const {
    isSuccessNotify = false,
    isErrorNotify = true,
    isStopReject = true,
    formatResult,
    method,
    ...rests
  } = options || {};

  const [loading, setLoading] = useState(false);

  const [retData, setRetData] = useState(null);

  const run = async (params?: any) => {
    setLoading(true);
    try {
      let _api = api;
      if (typeof api === "string") {
        _api = packUrl(api, method);
      }
      const res = await _api?.(params);

      console.log(res);

      const { message, code, data } = res?.data || {};
      setLoading(false);
      if (isErrorNotify && code !== 0) {
        Message.error(message ?? "请求失败");
        if (!isStopReject) {
          return Promise.reject(res?.data);
        }
      }
      if (isSuccessNotify && code == 0) {
        Message.success(message ?? "请求成功");
      }

      if (formatResult) {
        const formatData = formatResult(data);
        setRetData(formatData);
        return formatData;
      }

      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    run,
    data: retData,
    loading,
  };
};
