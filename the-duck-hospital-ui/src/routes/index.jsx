import React from "react";
import { useRoutes } from "react-router-dom";
import Loading from "../components/Loading";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import PageRegister from "../pages/auth/PageRegister";
import Home from "../pages/customer/Home";
import PageUser from "../pages/PageUser";
import AdminLayout from "../layouts/AdminLayout";
import ChoosePatientProfiles from "../pages/customer/ChoosePatientProfiles";

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
          path: "/chosen-patient-profiles",
          element: <ChoosePatientProfiles />,
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
    {
      path: "/user",
      element: <PageUser />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "analytics",
          element: null,
        },
        {
          path: "address-management/province",
          element: null,
        },
      ],
    },
  ]);
}

export default Router;
