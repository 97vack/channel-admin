import { Navigate } from "react-router-dom";
import { useLoginStateStore } from "@/store/useLoginStateStore";
import { isDev, isProd } from "@/utils/util";
import { USER_DEV_CACHE_KEY } from "@/utils/constant";

export function Guard({ children }: { children: React.ReactNode }) {
  const getToken = () => {
    console.log(11);
    const users = useLoginStateStore.getState().getLocalStorage();
    if (users) {
      return users.token;
    }
  };

  // const getDevUsersToken = () => {
  //   console.log(111111);
  //   const devToken = localStorage.getItem(USER_DEV_CACHE_KEY);
  //   if (devToken) {
  //     return JSON.parse(devToken).token;
  //   }
  //   return "";
  // };

  // const isLogin = () => {
  //   if (isProd()) return token;
  //   if (isDev()) {
  //     return token || getDevUsersToken();
  //   }
  //   return false;
  // };

  const isLogin = getToken();
  console.log(11);
  // if (!isLogin) {
  //   return <Navigate to={"/login"} replace />;
  // }
  return children;
}

export default Guard;
