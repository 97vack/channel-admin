import { useRequest } from "@/hooks/useRequest";
import { Button, Input } from "antd";
import { useForm } from "react-form-simple";
import { useHistory } from "@/hooks/useHistory";
import { useLoginState } from "@/hooks/useLoginState";
import loginBg from "@/assets/imgs/login-bg.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import loginLeftBg from "@/assets/imgs/login-left-bg.jpg";
import logoJpg from "@/assets/imgs/logo.jpg";
import logoSvg from "@/assets/imgs/logo.svg";
import { useLoginStateStore } from "@/store/useLoginStateStore";

export const LabelWrap = ({ children }: { children: any }) => (
  <span style={{ fontSize: "14px", color: "#5e5873" }}>{children}</span>
);

function Login() {
  const { history } = useHistory();
  const { stateAction } = useLoginState();
  const { run, loading } = useRequest("/auth/login", {
    method: "post",
    isSuccessNotify: true,
  });

  const { render, validate, model } = useForm(
    {
      email: "",
      password: "",
    },
    { labelPosition: "top" }
  );

  const login = async () => {
    await validate();
    const res = await run(model);
    if (res) {
      useLoginStateStore.getState().setUsers(res);
      console.log(555);
      history.push("/dashbord/channelList");
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      login();
    }
  };

  const renderEmail = render("email", {
    label: <LabelWrap>User</LabelWrap>,
    rules: { required: "Email is required" },
    requireIndicator: true,
  })(
    <Input
      onKeyDown={handleKeyDown}
      prefix={<UserOutlined />}
      placeholder="please Input Email"
      size="large"
    />
  );

  const renderPassword = render("password", {
    label: <LabelWrap>password</LabelWrap>,
    formItemStyle: { marginBottom: 0 },
    rules: { required: "password is required" },
    requireIndicator: true,
  })(
    <Input
      onKeyDown={handleKeyDown}
      prefix={<LockOutlined />}
      placeholder="please Input Password"
      size="large"
      type="password"
    />
  );

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "100vh",
        overflow: "auto",
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "100% 100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "20px",
          top: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          history.push("/");
        }}
      >
        <img src={logoJpg} alt="" style={{ width: "120px" }} />
      </div>
      <div
        style={{
          backgroundImage: `url(${loginLeftBg})`,
          height: "100vh",
          flex: 1,
          width: "50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div style={{ paddingTop: "150px", flex: 1 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 600, fontSize: "33px", color: "#5e5873" }}>
            <img
              src={logoSvg}
              alt=""
              style={{ verticalAlign: "middle", marginRight: "10px" }}
            />
            <span style={{ verticalAlign: "middle" }}>Welcome to DCP!✌️</span>
          </div>
          <div
            style={{ color: "#6e6b7b", fontSize: "14px", marginTop: "10px" }}
          >
            Please sign-in to your account
          </div>
        </div>
        <div style={{ width: "50%", margin: "80px auto 0" }}>
          {renderEmail}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "-5px",
                zIndex: 10,
              }}
            >
              <Button type="link">Forgot Password?</Button>
            </div>
            {renderPassword}
          </div>
          {/* <div style={{ textAlign: "right" }}>
          <Button type="link" style={{ paddingLeft: 0 }} onClick={() => {}}>
            忘记密码
          </Button>
        </div> */}
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <Button
              block
              size="large"
              type="primary"
              loading={loading}
              onClick={() => {
                login();
                // history.push("/channel");
              }}
            >
              Login
            </Button>
            <div style={{ color: "#6e6b7b", marginTop: "20PX" }}>
              New on our platform?<Button type="link">Create an account</Button>
            </div>
            {/* <Button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            history.push("/register");
          }}
        >
          注册
        </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
