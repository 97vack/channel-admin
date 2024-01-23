import { Button, Input } from "antd";
import useForm from "react-form-simple";
import { useRequest } from "@/hooks/useRequest";
import { emailRegex } from "@/utils/validationPatterns";

const Register = () => {
  const { model, render, validate } = useForm(
    {
      name: "",
      email: "wenjuancha97@outlook.com",
      password: "wenjuancha",
      code: "",
    },
    { labelPosition: "top" }
  );
  const { run, loading } = useRequest("/auth/register", {
    method: "post",
    isSuccessNotify: true,
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
    rules: {
      // validator(value) {
      //   if (!emailRegex.test(value)) {
      //     return "邮箱格式不对";
      //   }
      //   return "";
      // },
    },
    // formatChangeValue: (e) => e,
  })(<Input placeholder="请输入" />);
  const renderPassword = render("password", {
    label: "密码",
    rules: [{ required: "密码不能为空" }],
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
