import styled from "@emotion/styled";
import React from "react";
import { Outlet } from "react-router-dom";
import LeftNavbarNurseSchedule from "../components/Nurse/LeftBar/LeftNavbarSchedule";
import { appColors } from "../utils/appColorsUtils";
import TopNavBar from "../components/Nurse/TopBar/TopNavBar";
import LeftNavbarSchedule from "../components/Nurse/LeftBar/LeftNavbarSchedule";
const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  backgroundColor: appColors.backgroundColorMain,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  backgroundColor: appColors.backgroundColorMain,
  width: "100%",
});
function DoctorScheduleLayout(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TopNavBar onDrawerClick={setOpen} roomName={"doctor-schedule"} />
      <LeftNavbarSchedule open={open} onOpenClose={setOpen} />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
}

export default DoctorScheduleLayout;
