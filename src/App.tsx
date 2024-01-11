import { useEffect } from "react";
import "./App.css";
import { useRequest } from "@/hooks/useRequest";
import { Button, message, Input } from "antd";
import { axiosInstance } from "@/api";
import { useForm } from "react-form-simple";
import { useNavigate, Outlet } from "react-router-dom";
import { Guard } from "@/pages/Guard";

function App() {
  return (
    <Guard>
      <Outlet />
    </Guard>
  );
}

export default App;
