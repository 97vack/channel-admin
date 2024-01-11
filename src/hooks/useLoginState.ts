import { generateRandomCode } from "@/utils/util";
import { useRef } from "react";
import { useLoginStateStore } from "@/store/useLoginStateStore";

export const useLoginState = () => {
  const loginStore = useLoginStateStore.getState();

  const variable = useRef({
    STATE_T_KEY: "STATE_T_KEY",
  }).current;

  const cacheAction = useRef({
    getCachekey() {
      return { key: generateRandomCode(16) };
    },
    setCacheData() {
      const c = this.getCachekey();
      localStorage.setItem(variable.STATE_T_KEY, c.key);
      localStorage.setItem(c.key, JSON.stringify(loginStore.state));
    },
    getCacheData() {
      const state_key = localStorage.getItem(variable.STATE_T_KEY);
      if (state_key) {
        const states = localStorage.getItem(state_key);

        if (states) {
          const _states = JSON.parse(states);
          const { timeStamp } = _states;

          if (Date.now() - Number(timeStamp) >= 60 * 60 * 1000 * 12) {
            stateAction.clear();
            return;
          }
          stateAction.setUsers(states);

          this.removeCache();
        }
      }
    },
    removeCache() {
      const state_key = localStorage.getItem(variable.STATE_T_KEY);
      localStorage.removeItem(state_key || "");
      localStorage.removeItem(variable.STATE_T_KEY);
    },
  }).current;

  const stateAction = useRef({
    clear() {
      loginStore.clear();
    },
    setUsers(values: any) {
      loginStore.setUsers(values);
    },
    getLoginState: loginStore.getLoginState,
    getState() {
      return loginStore.state;
    },
  }).current;

  const bindBeforeunload = () => {
    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", (e) => {
      cacheAction.removeCache();
      cacheAction.setCacheData();
    });

    // 苹果手机执行下列方法
    window.addEventListener(
      "pagehide",
      () => {
        cacheAction.removeCache();
        cacheAction.setCacheData();
      },
      false
    );
  };

  return {
    stateAction,
    cacheAction,
    bindBeforeunload,
  };
};

export default useLoginState;
