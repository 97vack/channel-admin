import { Button, Input } from "antd";
import useForm from "react-form-simple";
import { useRequest } from "@/hooks/useRequest";

const Register = () => {
  const { model, render, validate } = useForm(
    {
      name: "",
      email: "",
      password: "",
      code: "",
    },
    { labelPosition: "top" }
  );
  const { run, loading } = useRequest("/auth/register", {
    method: "post",
  });

  const register = async () => {
    await validate();
    await run({
      ...model,
    });
  };

  const renderName = render("name", { label: "名字" })(
    <Input placeholder="请输入" />
  );
  const renderEmail = render("email", {
    label: "邮箱",
    // formatChangeValue: (e) => e,
  })(<Input placeholder="请输入" />);
  const renderPassword = render("password", {
    label: "密码",
    // formatChangeValue: (e) => e,
  })(<Input placeholder="请输入" />);
  const renderCode = render("code", {
    label: "验证码",
  })(<Input type="code" />);

  return (
    <div style={{ width: "500px", margin: "100px auto" }}>
      {/* {renderName} */}
      {renderEmail}
      {renderPassword}
      {/* {renderCode} */}
      <div>
        <Button
          loading={loading}
          onClick={() => {
            register();
          }}
        >
          注册
        </Button>
      </div>
    </div>
  );
};

export default Register;
