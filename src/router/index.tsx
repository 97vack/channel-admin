import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";
import App from "@/App";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("@/pages/Login"));
const Channel = lazy(() => import("@/pages/channel"));
const Register = lazy(() => import("@/pages/Register"));
const Home = lazy(() => import("@/pages/home"));

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/channel",
        element: (
          <Suspense>
            <Channel />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense>
        <Register />
      </Suspense>
    ),
  },
]);
