import { useTheme } from "@emotion/react";
import { Done, FormatListBulletedOutlined } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  acceptConversation,
  getWaitingConversations,
} from "../../services/supportAgent/ChatServices";

const NotFound = () => {
  return (
    <Stack
      alignItems={"center"}
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormatListBulletedOutlined
        sx={{
          width: "100px",
          height: "100px",
          fontWeight: "bold",
          color: "#d6dbe1",
        }}
      />
      <Typography
        sx={{
          color: "#677280",
          fontSize: "14px",
          textAlign: "left",
          fontWeight: "500",
          paddingX: 2,
        }}
      >
        Chưa có cuộc trò chuyện nào
      </Typography>
    </Stack>
  );
};

function WaitingConversationList() {
  const [conversations, setConversations] = React.useState([]);
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleAccept = async (conversation) => {
    const response = await acceptConversation(conversation.conversationId);
    if (response.success) {
      navigate(`chat/${conversation.conversationId}`, {
        state: { conversation },
      });
    } else {
      enqueueSnackbar("Không thể chấp nhận cuộc trò chuyện", {
        variant: "error",
      });
    }
  };

  const handleGetConversations = useCallback(async () => {
    const response = await getWaitingConversations();
    if (response.success) {
      setConversations(response.data.data);
    }
  }, []);
  useEffect(() => {
    handleGetConversations();
    const interval = setInterval(() => {
      handleGetConversations();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [handleGetConversations]);
  return (
    <List sx={{ flex: 1 }}>
      {conversations.length === 0 && <NotFound />}
      {conversations.map((conversation) => (
        <ListItem
          key={conversation.conversationId}
          disablePadding
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingY: 0,
            paddingX: 1,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingY: 1,
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                width: "100%",
                paddingY: 1,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ListItemIcon>
                <PersonIcon
                  sx={{
                    fontSize: "30px",
                    color: "#0184c6",
                  }}
                />
              </ListItemIcon>
              <Stack>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: theme.palette.text.main,
                    textAlign: "left",
                    fontWeight: "500",
                  }}
                >
                  {conversation.userName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#8c8c8c",
                    textAlign: "left",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "50%",
                  }}
                >
                  {conversation.lastMessageIsMine && "Bạn: "}
                  {conversation.lastMessage}
                </Typography>
              </Stack>
            </Box>
            <Done
              onClick={() => handleAccept(conversation)}
              sx={{
                color: "#0184c6",
                cursor: "pointer",

                "&:hover": {
                  color: "#0184c6c4",
                },
              }}
            />
          </ListItem>
        </ListItem>
      ))}
    </List>
  );
}

export default WaitingConversationList;
