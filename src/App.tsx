import { useEffect } from "react";
import "./App.css";
import { useRequest } from "@/hooks/request";
import { Button, message } from "antd";

function App() {
  const { run } = useRequest("/channel/admantum/test");

  useEffect(() => {
    run();
  }, []);

  return (
    <div>
      <div style={{ width: "300px", margin: "100px auto", fontSize: "20px" }}>
        积分: 0
        <div>
          <button
            style={{ minWidth: "60px", height: "30px" }}
            onClick={() => {
              message.info("This is a normal message");
            }}
          >
            打开优惠墙
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default App;

function Test() {}
