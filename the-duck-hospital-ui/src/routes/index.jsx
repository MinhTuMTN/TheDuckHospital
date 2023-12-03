import React from "react";
import { useRoutes } from "react-router-dom";
import Loading from "../components/Loading";
import LogoLayout from "../layouts/LogoLayout";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import PageRegister from "../pages/auth/PageRegister";
import PageUser from "../pages/PageUser";
import AdminLayout from "../layouts/AdminLayout";
import DepartmentListPage from "../pages/Admin/DepartmentManagement/DepartmentListPage";
import DepartmentDetailPage from "../pages/Admin/DepartmentManagement/DepartmentDetailPage";
import StaffListPage from "../pages/Admin/StaffManagement/StaffListPage";
import StaffDetailPage from "../pages/Admin/StaffManagement/StaffDetailPage";
import PatientListPage from "../pages/Admin/PatientManagement/PatientListPage";
import PatientDetailPage from "../pages/Admin/PatientManagement/PatientDetailPage";
import AccountListPage from "../pages/Admin/AccountManagement/AccountListPage";
import AccountDetailPage from "../pages/Admin/AccountManagement/AccountDetailPage";
import RoomListPage from "../pages/Admin/RoomManagement/RoomListPage";
import RoomDetailPage from "../pages/Admin/RoomManagement/RoomDetailPage";

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
      path: "*",
      element: <LogoLayout />,
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "auth/login",
          element: <LoginPage />,
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
    {

      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "analytics",
          element: null,
        },
        // {
        //   element: <Analytics />,
        //   index: true,
        // },
        {
          path: "appointment-management",
          element: null,
        },
        {
          path: "account-management",
          element: <AccountListPage />,
        },
        {
          path: "account-management/detail",
          element: <AccountDetailPage />,
        },
        {
          path: "staff-management",
          element: <StaffListPage />,
        },
        {
          path: "staff-management/detail",
          element: <StaffDetailPage />,
        },
        {
          path: "room-management",
          element: <RoomListPage />,
        },
        {
          path: "room-management/detail",
          element: <RoomDetailPage />,
        },
        {
          path: "department-management",
          element: <DepartmentListPage />,
        },
        {
          path: "department-management/detail",
          element: <DepartmentDetailPage />,
        },
        {
          path: "patient-management",
          element: <PatientListPage />,
        },
        {
          path: "patient-management/detail",
          element: <PatientDetailPage />,
        },
        {
          path: "payment-management",
          element: null,
        },
      ],
    },
  ]);
}

export default Router;
