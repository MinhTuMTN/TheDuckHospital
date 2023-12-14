import styled from "@emotion/styled";
import React from "react";
import { Outlet } from "react-router-dom";
import LeftNavBarDoctor from "../components/Doctor/LeftNavBarDoctor";
import TopNavBarDoctor from "../components/Doctor/TopNavBarDoctor";
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
function DoctorLayout(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TopNavBarDoctor onDrawerClick={setOpen} />
      <LeftNavBarDoctor open={open} onOpenClose={setOpen} />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
}

export default DoctorLayout;
