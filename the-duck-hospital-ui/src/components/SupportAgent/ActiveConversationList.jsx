import { useTheme } from "@emotion/react";
import { FormatListBulletedOutlined } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConversations } from "../../services/supportAgent/ChatServices";
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

function ActiveConversationList() {
  const [conversations, setConversations] = React.useState([]);
  const theme = useTheme();
  const navigate = useNavigate();
  const handleNavigateToChatScreen = (conversation) => {
    navigate(`chat/${conversation.conversationId}`, {
      state: { conversation },
    });
  };

  const handleGetConversations = useCallback(async () => {
    const response = await getConversations();
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
          onClick={() => handleNavigateToChatScreen(conversation)}
        >
          <ListItemButton
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              paddingY: 1,
            }}
          >
            <ListItemIcon>
              {conversation.avatar ? (
                <img
                  src={conversation.avatar}
                  alt="avatar"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <PersonIcon
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    color: theme.palette.primary.main,
                  }}
                />
              )}
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
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default ActiveConversationList;
