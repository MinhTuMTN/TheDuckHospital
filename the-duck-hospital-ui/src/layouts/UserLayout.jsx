import styled from "@emotion/styled";
import { PersonAddOutlined } from "@mui/icons-material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import {
  Box,
  Breadcrumbs,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CustomLink from "../components/General/CustomLink";

const Sidebar = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const Right = styled(Paper)(({ theme }) => ({
  display: "flex",
  minHeight: "55vh",
}));

const CustomListItemButton = styled(ListItemButton)(({ theme, isactive }) => ({
  backgroundColor: isactive === "true" ? "#fff" : "",
  color: isactive === "true" ? "#1da1f2" : "#000",
  width: "100%",
  padding: "4px 16px",
  boxShadow: isactive === "true" ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "",

  svg: {
    color: isactive === "true" ? "#1da1f2" : "#000",
  },

  "&:hover": {
    backgroundColor: "#fff",
  },

  "&:hover svg": {
    color: "#1da1f2",
  },

  "&:hover span": {
    fontWeight: "bold",
    color: "#1da1f2",
  },

  span: {
    fontWeight: isactive === "true" ? "bold" : "normal",
  },
  borderRadius: ".5rem",
  marginBottom: ".5rem",
}));

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: "black",
  transform: "scale(1.1)",
}));

const sidebarItems = [
  {
    display: "Hồ sơ bệnh nhân",
    icon: <BadgeOutlinedIcon />,
    to: "/user/patient-records",
    section: "PatientRecords",
  },
  {
    display: "Phiếu khám bệnh",
    icon: <ReceiptLongOutlinedIcon />,
    to: "/user/medical-bills",
    section: "MedicalBills",
  },
  {
    display: "Thông báo",
    icon: <NotificationsNoneOutlinedIcon />,
    to: "/user/notifications",
    section: "Notifications",
  },
  {
    display: "Lịch sử thanh toán",
    icon: <HistoryOutlinedIcon />,
    to: "/user/payment-history",
    section: "PaymentHistory",
  },
];

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));

function UserLayout() {
  const navigate = useNavigate();
  const [section, setSection] = useState("PatientRecords");
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const breakcrumbs = [
    <CustomLink to="/" key={1}>
      <CustomTextBreakcrumb>Trang chủ</CustomTextBreakcrumb>
    </CustomLink>,
    <CustomTextBreakcrumb key={3}>
      {sidebarItems.find((s) => s.section === section).display}
    </CustomTextBreakcrumb>,
  ];
  return (
    <Box
      sx={{
        paddingX: isLgUp ? 22 : 2,
        py: 3,
        width: "100%",
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#f1f9fe",
        overflow: "hidden",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breakcrumbs}
      </Breadcrumbs>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {(isLgUp || isMdUp) && (
          <Grid item md={2.8}>
            <Sidebar>
              <List sx={{ width: "100%" }}>
                <ListItem
                  disablePadding
                  key={`add-profile`}
                  sx={{
                    width: "100%",
                  }}
                >
                  <ListItemButton
                    sx={{
                      backgroundColor: "normal1.main",
                      width: "100%",
                      padding: "4px 16px",
                      borderRadius: ".5rem",
                      marginBottom: ".9rem",

                      "&:hover": {
                        backgroundColor: "normal1.main",
                      },
                    }}
                    onClick={() => {}}
                  >
                    <CustomListItemIcon>
                      <PersonAddOutlined style={{ color: "#fff" }} />
                    </CustomListItemIcon>
                    <ListItemText
                      style={{ color: "#fff", fontWeight: "bold !important" }}
                    >
                      <Typography fontWeight={"bold"}>Thêm hồ sơ</Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>

                {sidebarItems.map((item, index) => (
                  <ListItem
                    disablePadding
                    key={item.section}
                    sx={{ width: "100%" }}
                  >
                    <CustomListItemButton
                      isactive={section === item.section ? "true" : "false"}
                      onClick={() => {
                        setSection(item.section);
                        navigate(item.to);
                      }}
                    >
                      <CustomListItemIcon>{item.icon}</CustomListItemIcon>
                      <ListItemText primary={item.display} />
                    </CustomListItemButton>
                  </ListItem>
                ))}
              </List>
            </Sidebar>
          </Grid>
        )}
        <Grid item xs={12} md={9.2}>
          <Right>
            <Outlet />
          </Right>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserLayout;
