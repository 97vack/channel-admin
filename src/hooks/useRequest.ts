import { useState } from "react";
import { request, UseRequestType } from "@/api";
import { AxiosRequestConfig } from "axios";

const default_options = () => ({
  isSuccessNotify: false,
  isErrorNotify: true,
  isAllowCancelError: false,
  format: true,
});

export const packUrl =
  (str: string) => (params: any, axiosRequestConfig: AxiosRequestConfig) =>
    request(str, params, axiosRequestConfig);

export const useRequest = (api: any, options?: UseRequestType) => {
  const _options = Object.assign(default_options(), options);
  const {
    isSuccessNotify,
    isErrorNotify,
    isAllowCancelError,
    formatResult,
    format,
    ...rests
  } = _options || {};

  const [loading, setLoading] = useState(false);

  const [retData, setRetData] = useState<any>(null);

  const run = async (params?: any, axiosConfig?: AxiosRequestConfig) => {
    setLoading(true);
    try {
      let _api = api;
      if (typeof api === "string") {
        _api = packUrl(api);
      }
      const res = await _api?.(params, {
        customRequestOptions: _options,
        ...rests,
        ...axiosConfig,
      });

      setLoading(false);
      if (res.code !== 0) {
        return isAllowCancelError ? Promise.resolve(res) : Promise.reject();
      } else {
        let _formatData = res;
        if (format) {
          _formatData = res.data;
        }
        if (formatResult) {
          _formatData = formatResult?.(res);
        }
        setRetData(_formatData);
        return _formatData;
      }
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
