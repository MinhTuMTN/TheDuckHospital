import React from "react";
import MyLogo from "../assets/logo.jpg";
import { Avatar } from "@mui/material";

function Logo(props) {
  return (
    <Avatar
      sx={{
        width: "100%",
        height: "100%",
      }}
      src={MyLogo}
      alt="Logo"
    />
  );
}

export default Logo;
