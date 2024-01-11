import { message as Message } from "antd";

export const isMobileDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

export const copyText = (content?: string) => {
  if (!content) return;
  const notify = (type: any, message: string = "复制成功") => {
    Message.success(message);
  };
  if (navigator?.clipboard?.writeText) {
    return navigator?.clipboard
      ?.writeText(content)
      .then(() => {
        notify("success");
        return content;
      })
      .catch(() => {
        notify("danger");
        return content;
      });
  }
  let oInput = document.createElement("input");
  oInput.value = content;
  document.body.appendChild(oInput);
  oInput.select(); // 选择oInput中所有文本对象
  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    //兼容ios
    if (!document.execCommand("Copy")) {
      oInput.setSelectionRange(0, oInput.value.length);
    }
  }
  document.execCommand("Copy"); // 执行浏览器复制命令
  document.body.removeChild(oInput);
  if (document.execCommand("Copy")) {
    notify("success");
    return Promise.resolve(content);
  } else {
    notify("danger");
    return Promise.reject(content);
  }
};

/**
 *
 * @param length 生成随机数
 * @returns string
 */
export const generateRandomCode = (length = 6) => {
  const characters = "0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
};

export const isMeaningful = (val: any) =>
  val !== "" && val !== undefined && val !== null;

export function getToLocale(rate: any, decimalPlaces = 2) {
  return parseFloat(rate).toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}

export const formatAmt = (
  value: any,
  options?: { decimalPlaces?: number; isAutoAddPrefix?: boolean }
) => {
  const { decimalPlaces = 2, isAutoAddPrefix = true } = options || {};
  return `${
    isMeaningful(value)
      ? `${isAutoAddPrefix ? "¥" : ""}` + getToLocale(value, decimalPlaces)
      : ""
  }`;
};
