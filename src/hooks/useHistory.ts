import { useRef } from "react";
import { useNavigate, To, NavigateOptions } from "react-router-dom";

export const useHistory = () => {
  const navigate = useNavigate();

  const history = useRef({
    push(to: To, options?: NavigateOptions) {
      navigate(to, options);
    },
    replace(to: To, options?: NavigateOptions) {
      navigate(to, {
        ...options,
        replace: true,
      });
    },
  }).current;

  return {
    ...history,
    history,
  };
};

export default useHistory;
