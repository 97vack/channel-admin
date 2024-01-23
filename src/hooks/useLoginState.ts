import { useRef } from "react";
import { useLoginStateStore } from "@/store/useLoginStateStore";
import { USER_CACHE_KEY } from "@/utils/constant";

export const useLoginState = () => {
  const loginStore = useLoginStateStore.getState();

  const stateAction = useRef({
    setCacheUsers() {
      const cacheUsers = localStorage.getItem(USER_CACHE_KEY);
      if (!loginStore.state.token && cacheUsers) {
        const parseCacheUsers = JSON.parse(cacheUsers);
        loginStore.setUsers(parseCacheUsers);
      }
      loginStore.removeLocalStorage();
    },
  }).current;

  const bindBeforeunload = () => {
    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      loginStore.setUserLocalStorage();
    });

    // 苹果手机执行下列方法
    window.addEventListener(
      "pagehide",
      () => {
        loginStore.setUserLocalStorage();
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
