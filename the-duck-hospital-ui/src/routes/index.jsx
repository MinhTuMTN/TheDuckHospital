import React from "react";
import { useRoutes } from "react-router-dom";
import Page404 from "../pages/Page404";
import LogoLayout from "../layouts/LogoLayout";
import PageLogin from "../pages/auth/PageLogin";

function Router(props) {
  return useRoutes([
    {
      path: "*",
      element: <LogoLayout />,
      children: [
        {
          path: "*",
          element: <Page404 />,
        },
        {
          path: "auth/login",
          element: <PageLogin />,
        },
      ],
    },
    {
      path: "/",
      element: <div>Home</div>,
    },
  ]);
}

export default Router;
