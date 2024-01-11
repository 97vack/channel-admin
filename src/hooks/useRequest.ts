import React, { useState } from "react";
import { message as Message } from "antd";
import { request, UseRequestType } from "@/api";
import { AxiosRequestConfig } from "axios";

export const packUrl =
  (str: string) => (params: any, axiosRequestConfig: AxiosRequestConfig) =>
    request(str, params, axiosRequestConfig);

export const useRequest = (api: any, options?: UseRequestType) => {
  const {
    isSuccessNotify = false,
    isErrorNotify = true,
    isStopReject = true,
    formatResult,
    ...rests
  } = options || {};

  const [loading, setLoading] = useState(false);

  const [retData, setRetData] = useState(null);

  const run = async (params?: any, axiosConfig?: AxiosRequestConfig) => {
    setLoading(true);
    try {
      let _api = api;
      if (typeof api === "string") {
        _api = packUrl(api);
      }
      const res = await _api?.(params, {
        customRequestOptions: options,
        ...rests,
        ...axiosConfig,
      });
      setLoading(false);
      if (res.code !== 0) {
        if (isStopReject) {
          return Promise.reject();
        }
      } else {
      }

      const { message, code, data } = res?.data || {};

      console.log(message, code, data);
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
      setLoading(false);
    }
  };

  return {
    run,
    data: retData,
    loading,
  };
};
