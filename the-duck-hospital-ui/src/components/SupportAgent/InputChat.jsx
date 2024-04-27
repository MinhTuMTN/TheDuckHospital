import { Send } from "@mui/icons-material";
import { Stack, TextField } from "@mui/material";
import React from "react";

function InputChat(props) {
  const { onSendMessage } = props;
  const [message, setMessage] = React.useState("");
  return (
    <Stack flex={1} direction={"row"} alignItems={"center"} paddingX={"16px"}>
      <TextField
        variant="standard"
        multiline
        placeholder="Nhập tin nhắn"
        fullWidth
        size="medium"
        InputProps={{
          disableUnderline: true,
        }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Send
        sx={{ color: "#0184c6", cursor: "pointer" }}
        onClick={() => {
          onSendMessage && onSendMessage(message);
          setMessage("");
        }}
      />
    </Stack>
  );
}

export default InputChat;
