import styled from "@emotion/styled";
import React from "react";
import { Link, Outlet } from "react-router-dom";

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
        <Link to="/"></Link>
      </CustomHeader>
      <Outlet />
    </>
  );
}

export default LogoLayout;
