import React from "react";
import { useRoutes } from "react-router-dom";
import Page404 from "../pages/Page404";
import LogoLayout from "../layouts/LogoLayout";

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
      ],
    },
    {
      path: "/",
      element: <div>Home</div>,
    },
  ]);
}

export default Router;
