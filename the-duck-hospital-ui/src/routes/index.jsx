import React from "react";
import { useRoutes } from "react-router-dom";
import Loading from "../components/Loading";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import Home from "../pages/customer/Home";
import PageUser from "../pages/PageUser";
import AdminLayout from "../layouts/AdminLayout";
import ChoosePatientProfiles from "../pages/customer/ChoosePatientProfiles";
import ProtectedLayout from "../layouts/ProtectedLayout";
import LogoLayout from "../layouts/LogoLayout";
import CreateProfile from "../pages/customer/CreateProfile";
import DepartmentListPage from "../pages/Admin/DepartmentManagement/DepartmentListPage";
import DepartmentDetailPage from "../pages/Admin/DepartmentManagement/DepartmentDetailPage";
import StaffListPage from "../pages/Admin/StaffManagement/StaffListPage";
import StaffDetailPage from "../pages/Admin/StaffManagement/StaffDetailPage";
import ChooseDoctorPage from "../pages/customer/ChooseDoctorPage";
import ChooseDayPage from "../pages/customer/ChooseDayPage";
import ConfirmBookingInformation from "../pages/customer/ConfirmBookingInformation";
import PaymentOrders from "../pages/customer/PaymentOrders";

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
          path: "/choose-patient-profiles",
          element: <ChoosePatientProfiles />,
        },

        {
          path: "/create-profile",
          element: <CreateProfile />,
        },
        {
          path: "/choose-doctor",
          element: <ChooseDoctorPage />,
        },
        {
          path: "/choose-date",
          element: <ChooseDayPage />,
        },

        {
          path: "/confirm-booking-information",
          element: <ConfirmBookingInformation />,
        },

        {
          path: "/payment-orders",
          element: <PaymentOrders />,
        },

        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/user",
          element: <ProtectedLayout forRole={["User", "Admin"]} />,
          children: [
            {
              element: <PageUser />,
              index: true,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <LogoLayout />,
      children: [
        {
          path: "/auth/login",
          element: <LoginPage />,
        },
      ],
    },
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
          path: "staff-management",
          element: <StaffListPage />,
        },
        {
          path: "staff-management/detail",
          element: <StaffDetailPage />,
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
          element: null,
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
