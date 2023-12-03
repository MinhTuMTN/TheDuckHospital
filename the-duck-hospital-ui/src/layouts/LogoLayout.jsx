import styled from "@emotion/styled";
import { Avatar, CardMedia } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const StyledLogo = styled(CardMedia)(({ theme }) => ({
  width: "150px",
  cover: "no-repeat",
  backgroundSize: "contain",
  height: theme.spacing(8),
  marginRight: "10px",
}));
function LogoLayout(props) {
  const navigate = useNavigate();
  return (
    <>
      <StyledLogo
        onClick={() => navigate("/")}
        style={{
          cursor: "pointer",
          position: "fixed",
          top: "1rem",
          left: "1rem",
        }}
        image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701511186/Medical-removebg-preview_v5hwdt.png"
      />
      <Outlet />
    </>
  );
}

export default LogoLayout;
