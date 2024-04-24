import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const HeaderChatList = (props) => {
  const { state } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        width: "100%",
        position: "absolute",
        top: 0,
      }}
    >
      {state === "loading" ? (
        <CircularProgress size={25} color="primary" />
      ) : (
        <Typography color="#969696">
          Không còn tin nhắn nào để hiển thị
        </Typography>
      )}
    </Box>
  );
};

export default HeaderChatList;
