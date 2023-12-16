import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
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
import { useAuth } from "../../auth/AuthProvider";
import TodayIcon from "@mui/icons-material/Today";
import GroupsIcon from "@mui/icons-material/Groups";

const sidebarItems = [
  {
    display: "Bệnh nhân",
    icon: <GroupsIcon />,
    to: "/doctor/doctor-bookings",
  },

  {
    display: "Lịch trực",
    icon: <TodayIcon />,
    to: "/doctor/doctor-schedules",
  },
];

const headDoctorSidebarItems = [
  {
    display: "Danh sách ca trực",
    icon: <PersonIcon />,
    to: "/doctor/head-doctor/schedule-management",
    label: "Quản lý ca trực",
  },
  {
    display: "Tạo ca trực",
    icon: <PersonIcon />,
    to: "/doctor/head-doctor/schedule-management/create",
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

function LeftNavBarDoctor(props) {
  const { open, onOpenClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { fullName, setToken } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const { role } = useAuth();
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
            Bác sĩ
          </Typography>
        </Box>
        <List>
          {sidebarItems.map((item, index) => (
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

        {role === "HeadDoctor" && (
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
                Trưởng khoa
              </Typography>
            </Box>
            <List>
              {headDoctorSidebarItems.map((item, index) => (
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
          borderTop: "1px solid #e0e0e0",
          paddingX: 2,
          paddingY: 2.5,
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702377250/camel_ckn4py.png"
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              padding: "5px",
              border: "1px solid #c8c8c8",
              boxShadow: "0px 0px 5px 0px #c8c8c8",
            }}
          />
          <Stack
            direction={"column"}
            spacing={0}
            sx={{
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "#8c8c8c",
                textAlign: "left",
              }}
            >
              Bác sĩ
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: theme.palette.text.main,
                textAlign: "left",
                fontWeight: "500",
              }}
            >
              {fullName}
            </Typography>
          </Stack>
        </Stack>

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
LeftNavBarDoctor.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default LeftNavBarDoctor;
