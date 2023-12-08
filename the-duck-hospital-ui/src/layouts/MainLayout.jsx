import styled from "@emotion/styled";
import React from "react";
import { Outlet } from "react-router-dom";
import RightNavBar from "../components/Customer/RightNavBar";
import Footer from "../components/General/Footer";
import NavBar from "../components/General/NavBar";

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
      <RightNavBar open={open} onOpenClose={setOpen} />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
      <Footer />
    </>
  );
}

export default MainLayout;
