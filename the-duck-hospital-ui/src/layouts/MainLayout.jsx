import styled from "@emotion/styled";
import React from "react";
import { Outlet } from "react-router-dom";
import RightNavBar from "../components/General/Navbar/RightNavBar";
import Footer from "../components/General/Footer";
import NavBar from "../components/General/Navbar/NavBar";

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
  minHeight: "55vh",
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
