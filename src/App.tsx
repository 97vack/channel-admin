import { useEffect, useRef } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Guard } from "@/pages/Guard";
import { useLoginState } from "@/hooks/useLoginState";
import { Menu } from "@/pages/layout/Menu";
import { useLoginStateStore } from "@/store/useLoginStateStore";

function App() {
  // const { stateAction, bindBeforeunload } = useLoginState();
  const isInit = useRef(true);
  if (isInit.current) {
    // bindBeforeunload();
    const { getLocalStorage, setUsers } = useLoginStateStore.getState();
    const users = getLocalStorage();
    if (users) {
      setUsers(users);
    }
  }
  isInit.current = false;

  return (
    <Guard>
      <div
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        <Menu />
        <div
          style={{
            flex: 1,
            height: "100vh",
            overflowX: "hidden",
            overflowY: "auto",
            padding: "20px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </Guard>
  );
}

export default App;
