import { CloseOutlined, LocalAtmOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  Modal,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { memo, useMemo, useState } from "react";
import { closeConversation } from "../../services/supportAgent/ChatServices";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const StyledIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px",
  cursor: "pointer",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  px: 4,
  py: 2,
};

function HeaderChat(props) {
  const { conversation } = props;
  const [closeConversationModal, setCloseConversationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleCloseConversation = async () => {
    setIsLoading(true);
    const response = await closeConversation(conversation.conversationId);
    setIsLoading(false);
    if (response.success) navigate("/support-agent");
    else
      enqueueSnackbar("Không thể đóng cuộc trò chuyện này. Vui lòng thử lại", {
        variant: "error",
      });
    handleCloseConversationModal();
  };
  const handleCloseConversationModal = () => setCloseConversationModal(false);
  const avatarName = useMemo(() => {
    const name = conversation.userName.split(" ");
    return name[name.length - 2].charAt(0) + name[name.length - 1].charAt(0);
  }, [conversation.userName]);
  return (
    <>
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
          <StyledIcon
            onClick={() => {
              setCloseConversationModal(true);
            }}
          >
            <CloseOutlined color="error" />
            <Typography color={"error"}>Đóng</Typography>
          </StyledIcon>
        </Stack>
      </Stack>

      <Modal
        open={closeConversationModal}
        onClose={handleCloseConversationModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CircularProgress
                  sx={{
                    color: "#0184c6",
                    marginBottom: 2,
                  }}
                />
                <Typography sx={{ fontWeight: "500" }}>
                  Đang xử lý. Vui lòng chờ...
                </Typography>
              </Box>
            </>
          ) : (
            <>
              {" "}
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Đóng cuộc trò chuyện này
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Bạn có chắc chắn muốn đóng cuộc trò chuyện này không?
              </Typography>
              <Stack
                direction={"row"}
                justifyContent={"flex-end"}
                marginTop={2}
              >
                <StyledIcon
                  onClick={() => {
                    handleCloseConversationModal();
                  }}
                >
                  <Typography color={"error"}>Hủy</Typography>
                </StyledIcon>
                <StyledIcon onClick={handleCloseConversation}>
                  <Typography color={"#0184c6"}>Xác nhận</Typography>
                </StyledIcon>
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default memo(HeaderChat);
