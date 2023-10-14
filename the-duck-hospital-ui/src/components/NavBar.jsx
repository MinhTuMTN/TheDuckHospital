import styled from "@emotion/styled";
import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const NavBarLogo = styled(Logo)(({ theme }) => ({
  marginRight: theme.spacing(2),
  width: "50px",
  height: "50px",
}));

function NavBar(props) {
  return (
    <StyledAppBar>
      <Toolbar>
        <NavBarLogo />
        <NavLink to="/">Home</NavLink>
      </Toolbar>
    </StyledAppBar>
  );
}

export default NavBar;
