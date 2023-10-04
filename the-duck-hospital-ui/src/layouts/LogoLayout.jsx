import { Avatar } from "@mui/material";
import React from "react";
import Logo from "../components/Logo";
import { Link, Outlet } from "react-router-dom";
import styled from "@emotion/styled";

const CustomHeader = styled("header")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: theme.spacing(10),
  height: theme.spacing(10),
  padding: theme.spacing(2),
}));

function LogoLayout(props) {
  return (
    <>
      <CustomHeader>
        <Link to="/">
          <Logo />
        </Link>
      </CustomHeader>
      <Outlet />
    </>
  );
}

export default LogoLayout;
