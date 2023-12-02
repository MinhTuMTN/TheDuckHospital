import styled from "@emotion/styled";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

function MainLayout(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <NavBar onDrawerClick={setOpen} />
      {/*<LeftNavBar open={open} onOpenClose={setOpen} />*/}
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
}

export default MainLayout;
