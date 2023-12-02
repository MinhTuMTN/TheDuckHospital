import React from "react";
import { useRoutes } from "react-router-dom";
import Loading from "../components/Loading";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import PageRegister from "../pages/auth/PageRegister";
import Home from "../pages/customer/Home";

const LoadComponent = (Component) => (props) =>
  (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  );

const NotFound = LoadComponent(React.lazy(() => import("../pages/Page404")));

function Router(props) {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
    },
    {
      path: "auth/login",
      element: <LoginPage />,
    },
    {
      path: "auth/register",
      element: <PageRegister />,
    },
  ]);
}

export default Router;
