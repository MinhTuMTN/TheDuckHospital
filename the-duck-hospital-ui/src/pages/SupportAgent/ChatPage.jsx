import { Box, Stack, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { memo, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderChat from "../../components/SupportAgent/HeaderChat";
import HeaderChatList from "../../components/SupportAgent/HeaderChatList";
import InputChat from "../../components/SupportAgent/InputChat";
import {
  getMessages,
  sendMessage,
} from "../../services/supportAgent/ChatServices";

const StyledChatContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  display: "flex",
  flexDirection: "column",
  flex: 10,
  overflowY: "auto",
  position: "relative",
}));

function ChatPage() {
  const location = useLocation();
  const conversation = location.state.conversation;
  const [isLoding, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [sequenceNumber, setSequenceNumber] = React.useState({
    min: -1,
    max: -1,
    bottom: -1,
  });
  const chatContainerRef = React.useRef(null);
  const bottomMessageRef = React.useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleSendMessage = useCallback(
    async (message) => {
      setSequenceNumber((prev) => {
        return {
          ...prev,
          max: newMessage.sequenceNumber,
          bottom: newMessage.sequenceNumber,
        };
      });
      setMessages((prev) => [...prev, newMessage]);
      const newMessage = {
        message,
        sequenceNumber: sequenceNumber.max + 1,
        supportAgent: true,
      };
      const response = await sendMessage(conversation.conversationId, message);
      if (!response.success)
        enqueueSnackbar("Gửi tin nhắn thất bại", { variant: "error" });
    },
    [conversation, sequenceNumber.max, enqueueSnackbar]
  );

  const handleGetMoreMessages = useCallback(async () => {
    console.log("Get more messages");
    console.log(sequenceNumber.min);
    if (sequenceNumber.min === 1 || isLoding) {
      return;
    }
    setIsLoading(true);
    const response = await getMessages(
      conversation.conversationId,
      sequenceNumber.min - 1,
      "previous"
    );
    setIsLoading(false);
    if (response.success) {
      const newMessages = response.data.data.messages;
      newMessages.reverse();
      setSequenceNumber((prev) => {
        return {
          ...prev,
          min: newMessages[0].sequenceNumber,
          bottom: newMessages[newMessages.length - 1].sequenceNumber,
        };
      });
      setMessages([...newMessages, ...messages]);
      bottomMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation, messages, sequenceNumber.min, isLoding]);
  const handleGetNewMessages = useCallback(async () => {
    const response = await getMessages(
      conversation.conversationId,
      sequenceNumber.max,
      "next"
    );
    if (response.success) {
      const newMessages = response.data.data.messages;
      if (newMessages.length === 0) {
        return;
      }
      setSequenceNumber((prev) => {
        return {
          ...prev,
          max: newMessages[newMessages.length - 1].sequenceNumber,
          bottom: newMessages[newMessages.length - 1].sequenceNumber,
        };
      });
      newMessages.reverse();
      setMessages((prev) => [...prev, ...newMessages]);
    }
  }, [conversation.conversationId, sequenceNumber.max]);

  useEffect(() => {
    const currentRef = chatContainerRef.current;
    const onScroll = () => {
      if (currentRef.scrollTop < 50) {
        handleGetMoreMessages();
      }
    };
    currentRef.addEventListener("scroll", onScroll);

    return () => {
      currentRef.removeEventListener("scroll", onScroll);
    };
  }, [handleGetMoreMessages]);
  useEffect(() => {
    const handleGetMessages = async () => {
      setIsLoading(true);
      const response = await getMessages(
        conversation.conversationId,
        -1,
        "previous"
      );
      setIsLoading(false);

      if (response.success) {
        const messages = response.data.data.messages;
        messages?.reverse();
        setSequenceNumber({
          min: messages[0].sequenceNumber,
          max: messages[messages.length - 1].sequenceNumber,
          bottom: messages[messages.length - 1].sequenceNumber,
        });
        setMessages(messages);
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    };
    handleGetMessages();
  }, [conversation]);
  useEffect(() => {
    if (bottomMessageRef.current) {
      bottomMessageRef.current.scrollIntoView(false, { behavior: "smooth" });
    }
  }, [sequenceNumber.bottom]);
  useEffect(() => {
    const interval = setInterval(() => {
      handleGetNewMessages();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [handleGetNewMessages]);

  return (
    <Stack height={"100vh"}>
      <HeaderChat conversation={conversation} />
      <StyledChatContainer flex={5} ref={chatContainerRef} id="chat">
        <Box sx={{ display: "block", marginBottom: "48px" }} />
        {messages.map((item, index) => (
          <Box
            ref={
              item.sequenceNumber === sequenceNumber.bottom
                ? bottomMessageRef
                : null
            }
            key={`chat-message-${index}`}
            paddingX={2}
            paddingY={"4px"}
            alignSelf={item.supportAgent ? "flex-end" : "flex-start"}
          >
            <Box
              padding={1}
              borderRadius={1}
              bgcolor={item.supportAgent ? "#0184c6" : "#fff"}
              color={item.supportAgent ? "#fff" : "#000"}
            >
              {item.message}
            </Box>
          </Box>
        ))}
        <HeaderChatList state={isLoding ? "loading" : "end"} />
      </StyledChatContainer>
      <InputChat onSendMessage={handleSendMessage} />
    </Stack>
  );
}

export default memo(ChatPage);
