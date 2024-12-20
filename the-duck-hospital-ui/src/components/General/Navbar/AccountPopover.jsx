import { Avatar, Divider, Popover, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useAuth } from "../../../auth/AuthProvider";
import AdminMenuList from "./AdminMenuList";
import CashierMenuList from "./CashierMenuList";
import DoctorMenuList from "./DoctorMenuList";
import LaboratoryTechnicalList from "./LaboratoryTechnicalList";
import NurseMenuList from "./NurseMenuList";
import PatientMenuList from "./PatientMenuList";
import SupportAgentList from "./SupportAgentList";
function AccountPopover(props) {
  const { anchorEl, onClose, open, width } = props;
  const { setToken, fullName, role } = useAuth();

  const MenuList = useMemo(() => {
    switch (role) {
      case "User":
        return <PatientMenuList onClose={onClose} setToken={setToken} />;
      case "Nurse":
      case "HeadNurse":
        return <NurseMenuList onClose={onClose} setToken={setToken} />;
      case "Doctor":
      case "HeadDoctor":
        return <DoctorMenuList onClose={onClose} setToken={setToken} />;
      case "Admin":
        return <AdminMenuList onClose={onClose} setToken={setToken} />;
      case "LaboratoryTechnician":
        return (
          <LaboratoryTechnicalList onClose={onClose} setToken={setToken} />
        );
      case "SupportAgent":
        return <SupportAgentList onClose={onClose} setToken={setToken} />;
      case "Cashier":
        return <CashierMenuList onClose={onClose} setToken={setToken} />;
      default:
        return null;
    }
  }, [role, onClose, setToken]);
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={onClose}
      open={open}
    >
      <Stack
        spacing={1}
        direction={"column"}
        sx={{
          width: width ? width : "235px",
          px: "8px",
          paddingY: "16px",
        }}
      >
        <Stack direction={"row"} spacing={1.7} paddingX={1}>
          <Avatar />
          <Stack direction={"column"}>
            <Typography
              variant="h6"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Xin chào,
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "14px", fontWeight: "bold" }}
            >
              {fullName}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        {MenuList}
      </Stack>
    </Popover>
  );
}

AccountPopover.propTypes = {
  // Định nghĩa propTypes cho component SignOut
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  width: PropTypes.string,
};

export default AccountPopover;
