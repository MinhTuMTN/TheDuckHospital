import MedicalBills from "../../pages/SidebarItemPage/MedicalBills";
import Notifications from "../../pages/SidebarItemPage/Notifications";
import PatientRecords from "../../pages/SidebarItemPage/PatientRecords";
import PaymentHistory from "../../pages/SidebarItemPage/PaymentHistory";

const SidebarItem = ({ activeItem }) => {
  return activeItem === "PatientRecords" ? (
    <PatientRecords />
  ) : activeItem === "MedicalBills" ? (
    <MedicalBills />
  ) : activeItem === "Notifications" ? (
    <Notifications />
  ) : (
    <PaymentHistory />
  );
};

export default SidebarItem;
