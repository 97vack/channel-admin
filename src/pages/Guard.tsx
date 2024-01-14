import { Navigate } from "react-router-dom";
import { useLoginStateStore } from "@/store/useLoginStateStore";

export function Guard({ children }: { children: React.ReactNode }) {
  const token = useLoginStateStore((s) => s.state.token);

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}

export default Guard;
