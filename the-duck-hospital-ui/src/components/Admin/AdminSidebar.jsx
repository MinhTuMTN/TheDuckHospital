import styled from "@emotion/styled";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssistWalkerIcon from "@mui/icons-material/AssistWalker";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DnsIcon from "@mui/icons-material/Dns";
import VaccinesIcon from '@mui/icons-material/Vaccines';
// import pic from "../assets/logo-removebg-preview.jpg";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useLocation } from "react-router-dom";
import CustomLink from "../General/CustomLink";

const CustomListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  backgroundColor: active === "true" ? "#333860da" : "",
  marginRight: theme.spacing(0.5),
  width: "100%",
  color: "white",

  "&:hover": {
    backgroundColor: active === "true" ? "#333860da" : "#3a3d5685",
  },
}));

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  padding: `0 0 ${theme.spacing(0.3)} ${theme.spacing(2.5)}`,
  color: "white",
  transform: "scale(1.1)",
}));

const sidebarItems = [
  {
    display: "Tài Khoản",
    icon: <AccountCircleIcon />,
    to: "/admin/account-management",
    section: "account-management",
  },
  {
    display: "Nhân Viên",
    icon: <BabyChangingStationIcon />,
    to: "/admin/staff-management",
    section: "staff-management",
  },
  {
    display: "Bệnh Nhân",
    icon: <AssistWalkerIcon />,
    to: "/admin/patient-management",
    section: "patient-management",
  },
  {
    display: "Khoa",
    icon: <DnsIcon />,
    to: "/admin/department-management",
    section: "department-management",
  },
  {
    display: "Phòng",
    icon: <MeetingRoomIcon />,
    to: "/admin/room-management",
    section: "room-management",
  },
  {
    display: "Dịch vụ",
    icon: <MedicalServicesIcon />,
    to: "/admin/service-management",
    section: "service-management",
  },
  {
    display: "Thuốc",
    icon: <VaccinesIcon />,
    to: "/admin/medicine-management",
    section: "medicine-management",
  },
  {
    display: "Thanh Toán",
    icon: <ReceiptIcon />,
    to: "/admin/transaction-management",
    section: "transaction-management",
  },
  {
    display: "Thống Kê",
    icon: <AnalyticsIcon />,
    to: "/admin/analytics",
    section: "analytics",
    analytics: true,
  },
];

function AdminSidebar(props) {
  const { open, onOpenClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const location = useLocation();
  let currentSection = location.pathname
    .split("/")
    .filter((part) => part !== "")[1];

  if (currentSection === undefined) currentSection = "analytics";
  const activeSection = sidebarItems.find(
    (item) => item.section === currentSection
  )?.section;

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        PaperProps={{
          sx: {
            background: "linear-gradient(180deg, #000428 0%, #043765 100%)",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              paddingTop: 3,
              paddingX: 1,
              alignItems: "center",
              display: "flex",
            }}
          >
            <Box
              sx={{
                height: "4.5rem",
                width: "4.5rem",
                display: "flex",
                direction: "row",
              }}
            >
              {/* <img alt="logo" src={pic} /> */}
            </Box>
            <Typography variant="h5" sx={{ color: "white" }}>
              The Duck Hospital
            </Typography>
          </Box>
          <Typography
            variant="h6"
            paddingX={3}
            paddingTop={4}
            paddingBottom={1}
            style={{
              fontSize: "15px",
              color: "white",
              fontWeight: "700",
            }}
          >
            {" "}
            THỐNG KÊ{" "}
          </Typography>
          <ListItem
            disablePadding
            key={sidebarItems[sidebarItems.length - 1].section}
          >
            <CustomLink
              to={sidebarItems[sidebarItems.length - 1].to}
              width={"100%"}
            >
              <CustomListItemButton
                active={
                  activeSection ===
                  sidebarItems[sidebarItems.length - 1].section
                    ? "true"
                    : "false"
                }
              >
                <CustomListItemIcon>
                  {sidebarItems[sidebarItems.length - 1].icon}
                </CustomListItemIcon>
                <ListItemText
                  disableTypography
                  style={{ color: "#b5bac0 !important", fontSize: "14px" }}
                  primary={sidebarItems[sidebarItems.length - 1].display}
                />
              </CustomListItemButton>
            </CustomLink>
          </ListItem>
          <Typography
            variant="h6"
            paddingX={3}
            paddingTop={2}
            style={{
              fontSize: "15px",
              color: "white",
              fontWeight: "700",
            }}
          >
            {" "}
            QUẢN LÝ{" "}
          </Typography>
          <List>
            {sidebarItems.map(
              (item, index) =>
                !item.analytics && (
                  <ListItem disablePadding key={item.section}>
                    <CustomLink to={item.to} width={"100%"}>
                      <CustomListItemButton
                        active={
                          activeSection === item.section ? "true" : "false"
                        }
                      >
                        <CustomListItemIcon>{item.icon}</CustomListItemIcon>
                        <ListItemText
                          disableTypography
                          style={{
                            color: "#b5bac0 !important",
                            fontSize: "14px",
                          }}
                          primary={item.display}
                        />
                      </CustomListItemButton>
                    </CustomLink>
                  </ListItem>
                )
            )}
          </List>
        </Box>
      </Drawer>
    );
  }
  return (
    <SwipeableDrawer
      anchor="left"
      onClose={() => onOpenClose(false)}
      onOpen={() => onOpenClose(true)}
      open={open}
      PaperProps={{
        sx: {
          background: "linear-gradient(180deg, #FF416C 0%, #f38b57 100%)",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      <Drawer
        anchor="left"
        PaperProps={{
          sx: {
            background: "linear-gradient(180deg, #000428 0%, #043765 100%)",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              paddingTop: 1,
              paddingX: 1,
              alignItems: "center",
              display: "flex",
            }}
          >
            <Box
              sx={{
                height: "4.5rem",
                width: "4.5rem",
                display: "flex",
                direction: "row",
              }}
            >
              {/* <img alt="logo" src={pic} /> */}
            </Box>
            <Typography variant="h5" sx={{ color: "white" }}>
              The Duck Hospital
            </Typography>
          </Box>
          <Typography
            variant="body1"
            paddingX={3}
            style={{
              fontSize: "15px",
              color: "white",
              fontWeight: "700",
              paddingTop: "10px",
            }}
          >
            QUẢN LÝ{" "}
          </Typography>

          <List>
            {sidebarItems.map((item, index) => (
              <ListItem disablePadding key={item.section}>
                <CustomLink to={item.to} width={"100%"}>
                  <CustomListItemButton
                    active={activeSection === item.section ? "true" : "false"}
                  >
                    <CustomListItemIcon>{item.icon}</CustomListItemIcon>
                    <ListItemText
                      disableTypography
                      style={{ color: "#b5bac0 !important", fontSize: "14px" }}
                      primary={item.display}
                    />
                  </CustomListItemButton>
                </CustomLink>
              </ListItem>
            ))}
          </List>
          <Typography
            variant="h6"
            paddingX={3}
            paddingBottom={4}
            style={{
              fontSize: "15px",
              color: "white",
              fontWeight: "700",
            }}
          >
            {" "}
            THỐNG KÊ{" "}
          </Typography>
        </Box>
      </Drawer>
    </SwipeableDrawer>
  );
}
AdminSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default AdminSidebar;
