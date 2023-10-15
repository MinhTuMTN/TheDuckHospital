import styled from "@emotion/styled";
import { Box, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Page from "../components/Page";
import { Outlet } from "react-router-dom";
import React from 'react'
import { useEffect, useState } from 'react';
import SidebarItem from "../components/SidebarItem";
import Breadcrumb from "../components/Breadcrumb";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

const PageUser = styled(Box)(({ themme }) => ({
  display: "flex",
  height: "100%",
}));

const Sidebar = styled(Paper)(({ theme }) => ({
  flex: 2,
  height: "85vh",
  display: "flex",
}));

const Right = styled(Box)(({ theme }) => ({
  flex: 7,
  display: "flex",
}));

const CustomListItemButton = styled(ListItemButton)(({ theme, isActive }) => ({
  backgroundColor: (isActive ? "#86C8BC" : ""),
  borderRadius: "0 25px 25px 0",
  width: "100%",

  "&:hover": {
    backgroundColor: (isActive ? "#86C8BC" : "#EAFAF7"),
  }
}));

const CustomListItemIcon = styled(ListItemIcon)(({ theme, isActive }) => ({
  padding: `0 0 ${theme.spacing(0.3)} ${theme.spacing(2.5)}`,
  color: "black",
  transform: "scale(1.1)",
}));

const sidebarItems = [
  {
    display: 'Hồ sơ bệnh nhân',
    icon: <BadgeOutlinedIcon />,
    to: '/profile',
    section: 'PatientRecords'
  },
  {
    display: 'Phiếu khám bệnh',
    icon: <ReceiptLongOutlinedIcon />,
    to: '/profile/MedicalBills',
    section: 'MedicalBills'
  },
  {
    display: 'Thông báo',
    icon: <NotificationsNoneOutlinedIcon />,
    to: '/profile/Notifications',
    section: 'Notifications'
  },
  {
    display: 'Lịch sử thanh toán viện phí',
    icon: <HistoryOutlinedIcon />,
    to: '/profile/PaymentHistory',
    section: 'PaymentHistory'
  }
]

function PageProfile(props) {
  const [section, setSection] = useState('PatientRecords')

  useEffect(() => {
    console.log(section)
  }, [section])

  return (
    <Page title="User">
      <Breadcrumb />
      <PageUser>
        <Sidebar>
          {/* <Sidebar /> */}
          <List>
            {sidebarItems.map((item, index) => (

              <ListItem disablePadding key={item.section}>
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
        <Right>
          <SidebarItem activeItem={section} />
        </Right>
      </PageUser>
    </Page>
  );
}

export default PageProfile;