import { withLazyRoute } from "@/router/utils";
import { lazy } from "react";
import type { ReactRouteTypes } from "../index";

const Channel = lazy(() => import("@/pages/channel/admantum"));
const Surveyxa = lazy(() => import("@/pages/channel/surveyxa"));

export const routes: ReactRouteTypes[] = [
  {
    path: "channel/admantum",
    element: withLazyRoute(<Channel />),
  },
  {
    path: "channel/surveyxa",
    element: withLazyRoute(<Surveyxa />),
  },
];

export default routes;
