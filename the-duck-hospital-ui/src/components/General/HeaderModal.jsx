import React from "react";
import { IconButton, Stack, Typography, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Header = styled(Stack)({
  padding: "8px 4px 8px 14px",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #E0E0E0",
});

function HeaderModal(props) {
  const { handleOnClose, title } = props;
  return (
    <Header direction={"row"}>
      <Typography variant="h6">{title}</Typography>
      <IconButton onClick={handleOnClose}>
        <CloseIcon />
      </IconButton>
    </Header>
  );
}

export default HeaderModal;
