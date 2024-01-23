import { create } from "zustand";
import { isDev, encrypt, decrypt } from "@/utils/util";
import { USER_CACHE_KEY } from "@/utils/constant";

const initialvalue = () => ({
  userId: "",
  token: "",
  timeStamp: 0,
  name: "",
});

const getState = (set: any, get: any) => ({
  state: { ...initialvalue() },
  setUserLocalStorage() {
    const { state } = get();
    localStorage.setItem(
      encrypt(USER_CACHE_KEY),
      encrypt(JSON.stringify(state))
    );
  },
  removeLocalStorage() {
    localStorage.removeItem(encrypt(USER_CACHE_KEY));
  },
  getLocalStorage() {
    const userStr = localStorage.getItem(encrypt(USER_CACHE_KEY));
    try {
      if (userStr) {
        return JSON.parse(decrypt(userStr));
      }
    } catch (error) {
      return null;
    }
  },
  setUsers(params: ReturnType<typeof initialvalue>) {
    const { state } = get();
    const _state = Object.assign(state, params);
    set({ state: _state });
    get().setUserLocalStorage();
  },
  clear() {
    set({ state: initialvalue() });
    get().removeLocalStorage();
  },
});

export const useLoginStateStore = create(getState);
