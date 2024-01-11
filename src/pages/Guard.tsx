import { useLoginState } from "@/hooks/useLoginState";
import { useNavigate, Navigate } from "react-router-dom";

export function Guard({ children }: { children: React.ReactNode }) {
  const { stateAction } = useLoginState();
  const isLoginState = stateAction.getLoginState();
  const nav = useNavigate();

  console.log(1111);

  if (!isLoginState) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}

export default Guard;
