import { useEffect } from "react";
import { useRequest } from "@/hooks/useRequest";
import { Button, message, Input } from "antd";
import { axiosInstance } from "@/api";
import { useForm } from "react-form-simple";
import { useHistory } from "@/hooks/useHistory";

function Login() {
  const { history } = useHistory();
  const { run, loading } = useRequest("/user/login", { method: "post" });

  const { render, validate, model } = useForm(
    {
      email: "",
      password: "",
    },
    { labelPosition: "top" }
  );

  const login = async () => {
    await validate();
    await run(model);
  };

  const renderEmail = render("email", { label: "邮箱" })(<Input />);

  const renderPassword = render("password", {
    label: "密码",
    formItemStyle: { marginBottom: 0 },
  })(<Input />);

  return (
    <div style={{ margin: "200px auto", width: "300px" }}>
      <div>
        {renderEmail}
        {renderPassword}
        <div style={{ textAlign: "right" }}>
          <Button type="link" style={{ paddingLeft: 0 }} onClick={() => {}}>
            忘记密码
          </Button>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          type="primary"
          loading={loading}
          onClick={() => {
            login();
            // history.push("/channel");
          }}
        >
          登录
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            history.push("/register");
          }}
        >
          注册
        </Button>
      </div>
    </div>
  );
}

export default Login;
