import React from "react";
import { useRoutes } from "react-router-dom";
import Loading from "../components/Loading";
import LogoLayout from "../layouts/LogoLayout";
import PageRegister from "../pages/auth/PageRegister";

const LoadComponent = (Component) => (props) =>
  (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  );

const Login = LoadComponent(
  React.lazy(() => import("../pages/auth/PageLogin"))
);
const NotFound = LoadComponent(React.lazy(() => import("../pages/Page404")));

function Router(props) {
  return useRoutes([
    {
      path: "*",
      element: <LogoLayout />,
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "auth/login",
          element: <Login />,
        },
        {
          path: "auth/register",
          element: <PageRegister />,
        },
      ],
    },
    {
      path: "/",
      element: <Loading />,
    },
  ]);
}

export default Router;
