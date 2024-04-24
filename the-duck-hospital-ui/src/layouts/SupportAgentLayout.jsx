import { styled } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import LeftNavbar from "../components/SupportAgent/LeftNavbar";

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

function SupportAgentLayout() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <LeftNavbar open={open} onOpenClose={setOpen} />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
}

export default SupportAgentLayout;
