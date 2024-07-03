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
import { useAuth } from "../../../auth/AuthProvider";
const sidebarItems = [
  {
    display: "Tiếp nhận bệnh nhân",
    icon: <PersonIcon />,
    to: "/nurse-counter/receiving-patients",
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
  width: "100%",
  color: "#797575",
  fontSize: "13px",

  "&:hover": {
    backgroundColor: active === "true" ? "#333860da" : "#ebebeb6c",
  },
}));

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  padding: `0 0 ${theme.spacing(0.3)} ${theme.spacing(3)}`,
  fontSize: "10px",
}));

function LeftNavBarCounter(props) {
  const { open, onOpenClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { setToken } = useAuth();
  const navigate = useNavigate();

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
              color: "#466f92",
              fontSize: "14px",
            }}
          >
            Quản lý
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
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#5a5c61",
                    }}
                    primary={item.display}
                  />
                </CustomListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
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
LeftNavBarCounter.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default LeftNavBarCounter;
