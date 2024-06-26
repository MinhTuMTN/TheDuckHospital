import { styled } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import LeftNavbarNurseInpatient from "../components/Nurse/LeftBar/LeftNavbarNurseInpatient";
import TopNavBarInpatient from "../components/Nurse/TopBar/TopNavBarInpatient";
const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1",
  maxWidth: "100%",
  backgroundColor: "#f5f7fb",
  minHeight: "100vh",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

function NurseInpatientLayout() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TopNavBarInpatient onDrawerClick={setOpen} roomName={"counter"} />
      <LeftNavbarNurseInpatient open={open} onOpenClose={setOpen} />
      <LayoutRoot>
        <Outlet />
      </LayoutRoot>
    </>
  );
}

export default NurseInpatientLayout;
