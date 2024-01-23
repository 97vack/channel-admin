import { withLazyRoute } from "@/router/utils";
import { lazy } from "react";
import type { ReactRouteTypes } from "../index";

const ChannelList = lazy(() => import("@/pages/dashbord/ChannelList"));

export const routes: ReactRouteTypes[] = [
  {
    path: "dashbord/channelList",
    element: withLazyRoute(<ChannelList />),
  },
];

export default routes;
