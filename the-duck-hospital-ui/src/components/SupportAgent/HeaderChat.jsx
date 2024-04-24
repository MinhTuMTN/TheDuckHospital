import { CloseOutlined, LocalAtmOutlined } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography, styled } from "@mui/material";
import React, { memo, useMemo } from "react";

const StyledIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px",
  cursor: "pointer",
}));

function HeaderChat(props) {
  const { conversation } = props;
  const avatarName = useMemo(() => {
    const name = conversation.userName.split(" ");
    return name[name.length - 2].charAt(0) + name[name.length - 1].charAt(0);
  }, [conversation.userName]);
  return (
    <Stack
      flex={1.5}
      direction={"row"}
      alignItems={"center"}
      paddingX={2}
      justifyContent={"space-between"}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <Avatar
          sx={{
            backgroundColor: "#0184c6",
          }}
        >
          {avatarName}
        </Avatar>
        <Typography marginLeft={2} fontWeight={500} fontSize={"18px"}>
          {conversation.userName}
        </Typography>
      </Stack>
      <Stack direction={"row"} columnGap={"8px"}>
        <StyledIcon>
          <LocalAtmOutlined
            sx={{
              color: "#0184c6",
            }}
          />
          <Typography color={"#0184c6"}>Hoàn tiền</Typography>
        </StyledIcon>
        <StyledIcon>
          <CloseOutlined color="error" />
          <Typography color={"error"}>Đóng</Typography>
        </StyledIcon>
      </Stack>
    </Stack>
  );
}

export default memo(HeaderChat);
