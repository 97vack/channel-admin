import { useRef } from "react";
import { useLoginStateStore } from "@/store/useLoginStateStore";

export const useLoginState = () => {
  const loginStore = useLoginStateStore.getState();

  const stateAction = useRef({
    setUsers(values: any) {
      loginStore.setUsers(values);
    },
    removeCache() {
      localStorage.removeItem("users");
    },
    setCacheUsers() {
      const cacheUsers = localStorage.getItem("users");
      if (!loginStore.state.token && cacheUsers) {
        const parseCacheUsers = JSON.parse(cacheUsers);
        stateAction.setUsers(parseCacheUsers);
        stateAction.removeCache();
      }
    },
  }).current;

  const bindBeforeunload = () => {
    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("users", JSON.stringify(loginStore.state));
    });

    // 苹果手机执行下列方法
    window.addEventListener(
      "pagehide",
      () => {
        localStorage.setItem("users", JSON.stringify(loginStore.state));
      },
      false
    );
  };

  return {
    stateAction,
    bindBeforeunload,
  };
};

export default useLoginState;
