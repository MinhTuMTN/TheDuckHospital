import styled from "@emotion/styled";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import TodayIcon from "@mui/icons-material/Today";
import {
  Box,
  Button,
  CardMedia,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthProvider";
import { Person } from "@mui/icons-material";

const sidebarItemsNurse = [
  {
    display: "Lịch trực",
    icon: <TodayIcon />,
    to: "/nurse-schedule",
  },
];

const sidebarItemsDoctor = [
  {
    display: "Lịch trực",
    icon: <TodayIcon />,
    to: "/doctor/doctor-schedules",
  },
];

const headNurseSidebarItems = [
  {
    display: "Danh sách ca trực",
    icon: <CalendarMonthOutlinedIcon />,
    to: "/nurse-schedule/head-nurse/schedule-management",
    label: "Quản lý ca trực",
  },
  {
    display: "Tạo ca trực",
    icon: <EditCalendarOutlinedIcon />,
    to: "/nurse-schedule/head-nurse/schedule-management/create",
    label: "Quản lý ca trực",
  },
];

const headDoctorSidebarItems = [
  {
    display: "Danh sách ca trực",
    icon: <Person />,
    to: "/doctor/doctor-schedules/schedule-management",
    label: "Quản lý ca trực",
  },
  {
    display: "Tạo ca trực",
    icon: <Person />,
    to: "/doctor/doctor-schedules/schedule-management/create",
    label: "Quản lý ca trực",
  },
];

const StyledLogo = styled(CardMedia)(({ theme }) => ({
  display: "flex",
  width: "220px",
  cover: "no-repeat",
  backgroundSize: "contain",
  height: theme.spacing(8),
  paddingX: "16px",
}));

const CustomListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  marginRight: theme.spacing(0.5),
  width: "100%",
  color: "#797575",
  fontWeight: "450",
  fontSize: "16px",

  "&:hover": {
    backgroundColor: active === "true" ? "#333860da" : "#ebebeb6c",
  },
}));

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  padding: `0 0 ${theme.spacing(0.3)} ${theme.spacing(2.5)}`,
}));

function LeftNavbarSchedule(props) {
  const { open, onOpenClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { setToken, role } = useAuth();
  const navigate = useNavigate();
  const mainItems =
    role === "Nurse" || role === "HeadNurse"
      ? sidebarItemsNurse
      : sidebarItemsDoctor;
  const headSilebarItems =
    role === "HeadNurse" ? headNurseSidebarItems : headDoctorSidebarItems;
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        textAlign: "center",
      }}
    >
      <Box>
        <Box
          sx={{
            paddingY: 2,
            display: "flex",
            width: "100%",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <StyledLogo image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701511186/Medical-removebg-preview_v5hwdt.png" />
        </Box>

        <Box
          sx={{
            justifyContent: "flex-start",
            width: "100%",
            paddingX: 2,
            marginTop: 2,
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "#020222",
              fontSize: "18px",
            }}
          >
            {role === "Nurse" || role === "HeadNurse" ? "Điều dưỡng" : "Bác sĩ"}
          </Typography>
        </Box>
        <List>
          {mainItems.map((item, index) => (
            <NavLink
              key={`nav-bar-store-${index}`}
              style={{ textDecoration: "none" }}
              to={item.to}
            >
              <ListItem disablePadding key={item.section}>
                <CustomListItemButton>
                  <CustomListItemIcon>{item.icon}</CustomListItemIcon>
                  <ListItemText
                    disableTypography
                    style={{ fontSize: "16px" }}
                    primary={item.display}
                  />
                </CustomListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>

        {(role === "HeadNurse" || role === "HeadDoctor") && (
          <>
            <Box
              sx={{
                justifyContent: "flex-start",
                width: "100%",
                paddingX: 2,
                marginTop: 2,
              }}
            >
              <Typography
                sx={{
                  textAlign: "left",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: "#020222",
                  fontSize: "18px",
                }}
              >
                {role === "HeadNurse" ? "Điều dưỡng trưởng" : "Trưởng khoa"}
              </Typography>
            </Box>
            <List>
              {headSilebarItems.map((item, index) => (
                <NavLink
                  key={`nav-bar-store-${index}`}
                  style={{ textDecoration: "none" }}
                  to={item.to}
                  state={{ label: item.label }}
                >
                  <ListItem disablePadding key={item.section}>
                    <CustomListItemButton>
                      <CustomListItemIcon>{item.icon}</CustomListItemIcon>
                      <ListItemText
                        disableTypography
                        style={{ fontSize: "16px" }}
                        primary={item.display}
                      />
                    </CustomListItemButton>
                  </ListItem>
                </NavLink>
              ))}
            </List>
          </>
        )}
      </Box>

      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          position: "sticky",
          borderTop: "1px solid #e0e0e0",
          paddingX: 2,
          paddingY: 2.5,
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#ff0d00d9",
            fontSize: "14px",
            textTransform: "none",
            justifyContent: "center",
            width: "100%",
            ":hover": {
              backgroundColor: "error.main",
            },
          }}
          onClick={() => {
            setToken(null);
            window.location.href = "/";
          }}
        >
          <Typography
            sx={{
              marginRight: "10px",
            }}
          >
            Đăng xuất
          </Typography>
          <LogoutIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </Button>
      </Stack>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        PaperProps={{
          sx: {
            backgroundColor: "#fff",

            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
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
          background: "#fff",
          color: "theme.palette.primary.main",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </SwipeableDrawer>
  );
}
LeftNavbarSchedule.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default LeftNavbarSchedule;
