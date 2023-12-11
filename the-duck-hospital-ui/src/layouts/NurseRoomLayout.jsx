import styled from "@emotion/styled";
import React from "react";
import TopNavBar from "../components/Nurse/TopNavBar";
import LeftNavbar from "../components/Nurse/LeftNavbar";
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
function NurseLayout(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TopNavBar onDrawerClick={setOpen} />
      <LeftNavbar open={open} onOpenClose={setOpen} />
    </>
  );
}

export default NurseLayout;
