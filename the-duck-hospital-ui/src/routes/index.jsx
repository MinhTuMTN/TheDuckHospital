import React from "react";
import { useRoutes } from "react-router-dom";
import Loading from "../components/General/Loading";
import AdminLayout from "../layouts/AdminLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import LogoLayout from "../layouts/LogoLayout";
import MainLayout from "../layouts/MainLayout";
import NurseCounterLayout from "../layouts/NurseCounterLayout";
import NurseRoomLayout from "../layouts/NurseRoomLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import UserLayout from "../layouts/UserLayout";
import AccountDetailPage from "../pages/Admin/AccountManagement/AccountDetailPage";
import AccountListPage from "../pages/Admin/AccountManagement/AccountListPage";
import DepartmentDetailPage from "../pages/Admin/DepartmentManagement/DepartmentDetailPage";
import DepartmentListPage from "../pages/Admin/DepartmentManagement/DepartmentListPage";
import MedicalServiceDetailPage from "../pages/Admin/MedicalServiceManagement/MedicalServiceDetailPage";
import MedicalServiceListPage from "../pages/Admin/MedicalServiceManagement/MedicalServiceListPage";
import MedicineDetailPage from "../pages/Admin/MedicineManagement/MedicineDetailPage";
import MedicineListPage from "../pages/Admin/MedicineManagement/MedicineListPage";
import PatientDetailPage from "../pages/Admin/PatientManagement/PatientDetailPage";
import PatientListPage from "../pages/Admin/PatientManagement/PatientListPage";
import PatientProfileDetailPage from "../pages/Admin/PatientManagement/PatientProfileDetailPage";
import RoomDetailPage from "../pages/Admin/RoomManagement/RoomDetailPage";
import RoomListPage from "../pages/Admin/RoomManagement/RoomListPage";
import StaffDetailPage from "../pages/Admin/StaffManagement/StaffDetailPage";
import StaffListPage from "../pages/Admin/StaffManagement/StaffListPage";
import TransactionListPage from "../pages/Admin/TransactionManagament/TransactionListPage";
import BookingsPage from "../pages/Doctor/BookingsPage";
import CreateSchedulePage from "../pages/Doctor/HeadDoctor/CreateSchedulePage";
import ScheduleListPage from "../pages/Doctor/HeadDoctor/ShiftListPage";
import SchedulePage from "../pages/Doctor/SchedulePage";
import ChooseDoctorAndTime from "../pages/Nurse/ChooseDocterAndTime";
import QueueNumberPage from "../pages/Nurse/QueueNumberPage";
import ReceivingPatients from "../pages/Nurse/ReceivingPatients";
import ReceivingPatientsCounter from "../pages/Nurse/ReceivingPatientsCounter";
import PaymentFailedPage from "../pages/PaymentFailedPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import LoginPage from "../pages/auth/LoginPage";
import BookingItemPage from "../pages/customer/BookingItemPage";
import ChooseDayPage from "../pages/customer/ChooseDayPage";
import ChooseDoctorPage from "../pages/customer/ChooseDoctorPage";
import ChoosePatientProfiles from "../pages/customer/ChoosePatientProfiles";
import ConfirmBookingInformation from "../pages/customer/ConfirmBookingInformation";
import CreateProfile from "../pages/customer/CreateProfile";
import Home from "../pages/customer/Home";
import MedicalBillsPage from "../pages/customer/MedicalBillsPage";
import NotificationPage from "../pages/customer/NotificationPage";
import PatientRecordsPage from "../pages/customer/PatientRecordsPage";
import PaymentHistoryPage from "../pages/customer/PaymentHistoryPage";
import PaymentOrders from "../pages/customer/PaymentOrders";
import TransactionDetailPage from "../pages/Admin/TransactionManagament/TransactionDetailPage";
import MedicalExaminationRecord from "../pages/Doctor/MedicalExaminationRecord";
import AnalyticsGeneral from "../pages/Admin/StatisticsManagement/AnalyticsGeneral";
import MedicalTestPage from "../pages/Doctor/MedicalTestPage";
import MedicalTestRecord from "../pages/Doctor/MedicalTestRecord";
import History from "../pages/Doctor/History";
import HistoryPage from "../pages/customer/HistoryPage";
import VerifyInformation from "../pages/customer/VerifyInformation";
import FindPatientIdPage from "../pages/customer/FindPatientIdPage";
import IntroducePage from "../pages/customer/IntroducePage";
import SupportPage from "../pages/customer/SupportPage";
import ChatPage from "../pages/SupportAgent/ChatPage";
import SupportAgentLayout from "../layouts/SupportAgentLayout";
import WelcomePage from "../pages/SupportAgent/WelcomePage";
import NurseScheduleLayout from "../layouts/NurseScheduleLayout";
import NurseSchedulePage from "../pages/Nurse/NurseSchedulePage";
import NurseScheduleManagementPage from "../pages/Nurse/HeadNurse/NurseScheduleManagementPage";
import CreateNurseSchedulePage from "../pages/Nurse/HeadNurse/CreateNurseSchedulePage";
import CashierPage from "../pages/Cashier/CashierPage";
import AnalyticsDepartmentBased from "../pages/Admin/StatisticsManagement/AnalyticsDepartmentBased";
import ChooseRoomForPatient from "../pages/Nurse/Hospitalization/ChooseRoomForPatient";
import NurseInpatientLayout from "../layouts/NurseInpatientLayout";
import ChoosePatient from "../pages/Nurse/Hospitalization/ChoosePatient";
import HospitalizationDetails from "../pages/Nurse/Hospitalization/HospitalizationDetails";
import PleaseChooseRoom from "../pages/Nurse/Hospitalization/PleaseChooseRoom";
import DoctorScheduleLayout from "../layouts/DoctorScheduleLayout";

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
          path: "/introduce",
          element: <IntroducePage />,
        },
        {
          path: "/support",
          element: <SupportPage />,
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
          path: "/find-patient-id",
          element: <FindPatientIdPage />,
        },
        {
          path: "/verify-information",
          element: <VerifyInformation />,
        },
        {
          path: "/edit-profile",
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
          path: "/payment-success",
          element: <PaymentSuccessPage />,
        },
        {
          path: "/payment-failed",
          element: <PaymentFailedPage />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/",
          element: (
            <ProtectedLayout forRole={["User", "Admin", "Doctor", "Nurse"]} />
          ),
          children: [
            {
              element: <UserLayout />,
              path: "/user",
              children: [
                {
                  element: <PatientRecordsPage />,
                  index: true,
                },
                {
                  path: "medical-bills",
                  element: <MedicalBillsPage />,
                },
                {
                  path: "notifications",
                  element: <NotificationPage />,
                },
                {
                  path: "history-record",
                  element: <PaymentHistoryPage />,
                },
              ],
            },
            {
              path: "/user/medical-bills/:medicalBillId",
              element: <BookingItemPage />,
            },
            {
              path: "/user/history-record/:medicalRecordId",
              element: <HistoryPage />,
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
      path: "/",
      element: <ProtectedLayout forRole={["SupportAgent"]} />,
      children: [
        {
          path: "/support-agent",
          element: <SupportAgentLayout />,
          children: [
            {
              path: "",
              element: <WelcomePage />,
              index: true,
            },
            {
              path: "chat/:chatId",
              element: <ChatPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedLayout forRole={["Cashier"]} />,
      children: [
        {
          path: "/cashier",
          element: <CashierPage />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedLayout forRole={["Nurse", "HeadNurse"]} />,
      children: [
        {
          path: "/nurse-room",
          element: <NurseRoomLayout />,
          children: [
            {
              index: true,
              element: <ReceivingPatients />,
            },
            {
              path: "receiving-patients",
              element: <ReceivingPatients />,
            },

            {
              path: "queue-number",
              element: <QueueNumberPage />,
            },
            {
              path: "hospitalization-choose-room",
              element: <ChooseRoomForPatient />,
            },
          ],
        },
        {
          path: "/nurse-counter",
          element: <NurseCounterLayout />,
          children: [
            {
              path: "receiving-patients",
              element: <ReceivingPatientsCounter />,
            },
            {
              index: true,
              element: <ReceivingPatientsCounter />,
            },
            {
              path: "choose-doctor-and-time",
              element: <ChooseDoctorAndTime />,
            },
          ],
        },
        {
          path: "/nurse-schedule",
          element: <NurseScheduleLayout />,
          children: [
            {
              index: true,
              element: <NurseSchedulePage />,
            },
            {
              path: "head-nurse",
              element: <ProtectedLayout forRole={["HeadNurse"]} />,
              children: [
                {
                  path: "schedule-management",
                  element: <NurseScheduleManagementPage />,
                },
                {
                  path: "schedule-management/create",
                  element: <CreateNurseSchedulePage />,
                },
              ],
            },
          ],
        },
        {
          path: "/nurse-inpatient",
          element: <NurseInpatientLayout />,
          children: [
            {
              index: true,
              element: <PleaseChooseRoom />,
            },
            {
              path: ":roomId/patients",
              element: <ChoosePatient />,
            },
            {
              path: ":roomId/patients/:hospitalizationId",
              element: <HospitalizationDetails />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
    },
    {
      path: "/doctor",
      element: (
        <ProtectedLayout
          forRole={["Doctor", "HeadDoctor", "LaboratoryTechnician"]}
        />
      ),
      children: [
        {
          path: "",
          element: <DoctorLayout />,
          children: [
            {
              path: "doctor-bookings",
              element: <BookingsPage />,
            },
            {
              path: "medical-examination-record/:medicalRecordId",
              element: <MedicalExaminationRecord />,
            },
            {
              path: "medical-test-record/:medicalTestId",
              element: <MedicalTestRecord />,
            },
            {
              path: "history/:medicalRecordId",
              element: <History />,
            },
            {
              path: "doctor-test",
              element: <MedicalTestPage />,
            },
          ],
        },
        {
          path: "/doctor/doctor-schedules",
          element: <DoctorScheduleLayout />,
          children: [
            {
              index: true,
              element: <SchedulePage />,
            },
            {
              path: "",
              element: <ProtectedLayout forRole={["HeadDoctor"]} />,
              children: [
                {
                  path: "schedule-management",
                  element: <ScheduleListPage />,
                },
                {
                  path: "schedule-management/create",
                  element: <CreateSchedulePage />,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "analytics/general",
          element: <AnalyticsGeneral />,
        },
        {
          path: "analytics/department-based",
          element: <AnalyticsDepartmentBased />,
        },
        {
          element: <AnalyticsGeneral />,
          index: true,
        },
        {
          path: "account-management",
          element: <AccountListPage />,
        },
        {
          path: "account-management/:userId",
          element: <AccountDetailPage />,
        },
        {
          path: "account-management/:userId/patient-profile/:patientProfileId",
          element: <PatientProfileDetailPage />,
        },
        {
          path: "staff-management",
          element: <StaffListPage />,
        },
        {
          path: "staff-management/:staffId",
          element: <StaffDetailPage />,
        },
        {
          path: "room-management",
          element: <RoomListPage />,
        },
        {
          path: "room-management/:roomId",
          element: <RoomDetailPage />,
        },
        {
          path: "department-management",
          element: <DepartmentListPage />,
        },
        {
          path: "department-management/:departmentId",
          element: <DepartmentDetailPage />,
        },
        {
          path: "department-management/:departmentId/staff/:staffId",
          element: <StaffDetailPage />,
        },
        {
          path: "patient-management",
          element: <PatientListPage />,
        },
        {
          path: "patient-management/:patientId",
          element: <PatientDetailPage />,
        },
        {
          path: "patient-management/:patientId/patient-profile/:patientProfileId",
          element: <PatientProfileDetailPage />,
        },
        {
          path: "service-management",
          element: <MedicalServiceListPage />,
        },
        {
          path: "service-management/:serviceId",
          element: <MedicalServiceDetailPage />,
        },
        {
          path: "transaction-management",
          element: <TransactionListPage />,
        },
        {
          path: "transaction-management/:transactionId",
          element: <TransactionDetailPage />,
        },
        {
          path: "medicine-management",
          element: <MedicineListPage />,
        },
        {
          path: "medicine-management/:medicineId",
          element: <MedicineDetailPage />,
        },
      ],
    },
    //   ],
    // },
  ]);
}

export default Router;
