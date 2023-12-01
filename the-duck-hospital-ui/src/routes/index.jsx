import React from "react";
import { useRoutes } from "react-router-dom";
import Loading from "../components/Loading";
import LogoLayout from "../layouts/LogoLayout";
import PageRegister from "../pages/auth/PageRegister";
import MainLayout from "../layouts/MainLayout";
import PageUser from "../pages/PageUser";
import AdminLayout from "../layouts/AdminLayout";

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
      element: <MainLayout />,
    },
    {
      path: "/user",
      element: <PageUser />,
    },
    // {
    //   path: "/user",
    //   element: <PageUser />,
    //   children: [
    //     {
    //       path: "/user/patient-records",
    //       element: <PatientRecords />,
    //     },
    //     {
    //       path: "/user/medical-bills",
    //       element: <MedicalBills />,
    //     },
    //     {
    //       path: "/user/notifications",
    //       element: <Notifications />,
    //     },
    //     {
    //       path: "/user/payment-history",
    //       element: <PaymentHistory />,
    //     },
    //   ],
    // },
    ,
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
