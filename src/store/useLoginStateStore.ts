import { create } from "zustand";

const initialvalue = () => ({
  userId: "",
  token: "",
  timeStamp: 0,
  name: "",
});

const getState = (set: any, get: any) => ({
  state: { ...initialvalue() },
  setUsers(params: ReturnType<typeof initialvalue>) {
    const { state } = get();
    set({ state: Object.assign(state, params) });
  },
  clear() {
    set({ state: initialvalue() });
  },
  getLoginState() {
    return !!get().state.token;
  },
});

export const useLoginStateStore = create(getState);
