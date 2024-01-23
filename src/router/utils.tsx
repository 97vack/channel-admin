import React, { Suspense } from "react";

export const withLazyRoute = (component: React.ReactNode) => {
  return <Suspense>{component}</Suspense>;
};
