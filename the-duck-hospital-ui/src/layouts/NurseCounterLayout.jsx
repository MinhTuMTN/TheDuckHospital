import styled from "@emotion/styled";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import LeftNavBarCounter from "../components/Nurse/LeftNavBarCounter";
import TopNavBar from "../components/Nurse/TopNavBar";
import { NurseContext } from "../auth/NurseProvider";
const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});
function NurseCounterLayout(props) {
  const [open, setOpen] = React.useState(false);
  const { roomName } = useContext(NurseContext);
  return (
    <>
      <TopNavBar onDrawerClick={setOpen} roomName={roomName} />
      <LeftNavBarCounter open={open} onOpenClose={setOpen} />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
}

export default NurseCounterLayout;
