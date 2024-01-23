import headerLogo from "@/assets/imgs/header-logo.png";
import { useRef } from "react";
import { css } from "@emotion/css";
import { Button } from "./Button";
import { useHistory } from "@/hooks/useHistory";
import { useLoginStateStore } from "@/store/useLoginStateStore";

export function Header({ onClick }: { onClick?: any }) {
  const { push } = useHistory();

  const users = useLoginStateStore.getState().getLocalStorage();

  const navs = useRef([
    {
      title: "Home",
      ele: "home",
    },
    {
      title: "About us",
      ele: "about",
    },
    {
      title: "Customer",
      ele: "customer",
    },
    {
      title: "Contract us",
      ele: "contract",
    },
  ]).current;

  const renderNav = navs.map((v) => (
    <span
      onClick={() => {
        onClick?.(v);
      }}
      key={v.title}
      style={{
        fontSize: "18px",
        fontWeight: "600",
        cursor: "pointer",
      }}
      className={css({
        "& + &": {
          color: "#333",
          marginLeft: "30px",
        },
        "&:hover": {
          color: "#1e73be",
        },
      })}
    >
      {v.title}
    </span>
  ));
  return (
    <div style={{ background: "#f1f1f1", padding: "25px 15px" }}>
      <div
        style={{
          width: "60%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={headerLogo} alt="" style={{ width: "95px" }} />
        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          <div>{renderNav}</div>
          <div style={{ marginLeft: "20px" }}>
            <Button
              style={{
                width: "100px",
                height: "35px",
                background: "#ff743d",
                fontSize: "16px",
                padding: 0,
                borderRadius: "10px",
              }}
              onClick={() => {
                if (users?.token) {
                  push("/dashbord/channelList");
                } else {
                  push("/login");
                }
              }}
            >
              {users && users.token ? "Account" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
