import { useRef } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Guard } from "@/pages/Guard";
import { useLoginState } from "@/hooks/useLoginState";
import { useLoginStateStore } from "@/store/useLoginStateStore";

function App() {
  const { stateAction, bindBeforeunload } = useLoginState();
  const loginStore = useLoginStateStore.getState();
  const isInit = useRef(true);
  if (isInit.current) {
    bindBeforeunload();
    stateAction.setCacheUsers();
  }
  isInit.current = false;

  return (
    <Guard>
      <div style={{ padding: "15px" }}>
        <Outlet />
      </div>
    </Guard>
  );
}

export default App;
