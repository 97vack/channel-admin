import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";
import App from "@/App";
import { lazy } from "react";
import { withLazyRoute } from "./utils";
import channelRoutes from "./channel";
import dashbordRoutes from "./dashbord";
import type { RouteObject } from "react-router-dom";

const Login = lazy(() => import("@/pages/Login"));

const Register = lazy(() => import("@/pages/Register"));
const Home = lazy(() => import("@/pages/home"));

export type ReactRouteTypes = RouteObject & {
  menuKey?: string;
};

export const routers = createBrowserRouter([
  {
    path: "/",
    element: withLazyRoute(<Home />),
  },
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [...dashbordRoutes, ...channelRoutes],
  },
  {
    path: "/login",
    element: withLazyRoute(<Login />),
  },
  {
    path: "/register",
    element: withLazyRoute(<Register />),
  },
]);
