import styled from "@emotion/styled";
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
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Sidebar = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const Right = styled(Paper)(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "100vh",
}));

const CustomListItemButton = styled(ListItemButton)(({ theme, isActive }) => ({
  backgroundColor: isActive ? "#fff" : "",
  color: isActive ? "#1da1f2" : "#000",
  width: "100%",
  padding: "4px 16px",
  boxShadow: isActive ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "",

  svg: {
    color: isActive ? "#1da1f2" : "#000",
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
    fontWeight: isActive ? "bold" : "normal",
  },
  borderRadius: ".5rem",
  marginBottom: ".5rem",
}));

const CustomListItemIcon = styled(ListItemIcon)(({ theme, isActive }) => ({
  color: "black",
  transform: "scale(1.1)",
}));

const sidebarItems = [
  {
    display: "Hồ sơ bệnh nhân",
    icon: <BadgeOutlinedIcon />,
    // to: '/user/patient-records',
    section: "PatientRecords",
  },
  {
    display: "Phiếu khám bệnh",
    icon: <ReceiptLongOutlinedIcon />,
    // to: '/user/medical-bills',
    section: "MedicalBills",
  },
  {
    display: "Thông báo",
    icon: <NotificationsNoneOutlinedIcon />,
    // to: '/user/notifications',
    section: "Notifications",
  },
  {
    display: "Lịch sử thanh toán",
    icon: <HistoryOutlinedIcon />,
    // to: '/user/payment-history',
    section: "PaymentHistory",
  },
];

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));

function PageUser(props) {
  const [section, setSection] = useState("PatientRecords");
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    console.log(section);
  }, [section]);

  const breakcrumbs = [
    <CustomTextBreakcrumb key={1}>Trang chủ</CustomTextBreakcrumb>,
    <CustomTextBreakcrumb key={2}>Thông tin tài khoản</CustomTextBreakcrumb>,
  ];
  return (
    <Box
      sx={{
        paddingX: isLgUp ? 22 : 2,
        py: 3,
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#f1f9fe",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breakcrumbs}
      </Breadcrumbs>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {isLgUp && (
          <Grid item md={2.5}>
            <Sidebar>
              <List sx={{ width: "100%" }}>
                {sidebarItems.map((item, index) => (
                  <ListItem
                    disablePadding
                    key={item.section}
                    sx={{ width: "100%" }}
                  >
                    <CustomListItemButton
                      isActive={section === item.section}
                      onClick={() => {
                        setSection(item.section);
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
        <Grid item xs={12} md={9.5}>
          <Right>
            <Outlet />
          </Right>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PageUser;
