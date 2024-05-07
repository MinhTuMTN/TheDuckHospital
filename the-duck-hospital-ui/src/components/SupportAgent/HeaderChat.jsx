import { CloseOutlined, LocalAtmOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Modal,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkRefundBooking,
  closeConversation,
  refundBooking,
} from "../../services/supportAgent/ChatServices";
import MuiTextFeild from "../General/MuiTextFeild";
import dayjs from "dayjs";
import { formatCurrency } from "../General/FormatCurrency";

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

function Loading() {
  return (
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
  );
}

function HeaderChat(props) {
  const { conversation } = props;
  const [openConversationModal, setOpenConversationModal] = useState(false);

  const [openRefundModal, setOpenRefundModal] = useState(false);
  const [refundErrorMessages, setRefundErrorMessages] = useState("");
  const [bookingCode, setBookingCode] = useState("");
  const [bookingCodeChecking, setBookingCodeChecking] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [refundReason, setRefundReason] = useState("");
  const [refundReasonError, setRefundReasonError] = useState("");

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

  const handleCheckBookingRefund = useCallback(async () => {
    if (bookingCode.length !== 12) {
      return;
    }

    setBookingCodeChecking(true);
    const response = await checkRefundBooking(
      conversation.conversationId,
      bookingCode
    );
    setBookingCodeChecking(false);
    if (response.success) {
      setBookingData(response.data.data);
    } else {
      switch (response.errorCode) {
        case 10020:
          setRefundErrorMessages("Mã đặt khám không tồn tại");
          break;
        case 10021:
          setRefundErrorMessages("Mã đặt khám đã được hoàn tiền");
          break;
        case 10022:
          setRefundErrorMessages(
            "Mã đặt khám không thuộc về tài khoản của khách hàng"
          );
          break;
        case 10023:
          setRefundErrorMessages("Mã đặt khám đã hết hạn hoàn tiền");
          break;
        default:
          setRefundErrorMessages("Có lỗi xảy ra. Vui lòng thử lại");
          break;
      }
    }
  }, [bookingCode, conversation.conversationId]);

  const handleCloseConversationModal = () => setOpenConversationModal(false);
  const handleCloseRefundModal = () => setOpenRefundModal(false);
  const avatarName = useMemo(() => {
    const name = conversation.userName.split(" ");
    return name[name.length - 2].charAt(0) + name[name.length - 1].charAt(0);
  }, [conversation.userName]);

  useEffect(() => {
    handleCheckBookingRefund();
  }, [handleCheckBookingRefund]);

  const handleRefund = async () => {
    if (refundReason.length === 0) {
      enqueueSnackbar("Lý do hoàn tiền không được để trống", {
        variant: "error",
      });
      return;
    }

    if (!bookingData) {
      enqueueSnackbar("Không thể hoàn tiền cho mã đặt khám này", {
        variant: "error",
      });
      return;
    }

    setIsLoading(true);
    const response = await refundBooking(
      conversation.conversationId,
      bookingCode,
      refundReason
    );
    setIsLoading(false);

    if (response.success) {
      enqueueSnackbar("Hoàn tiền thành công", {
        variant: "success",
      });
      handleCloseRefundModal();
    } else {
      enqueueSnackbar(
        "Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin và thử lại",
        {
          variant: "error",
        }
      );
    }
  };

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
          {conversation.avatar ? (
            <Avatar
              src={conversation.avatar}
              alt={conversation.userName}
              sx={{
                width: (theme) => theme.spacing(5),
                height: (theme) => theme.spacing(5),
              }}
            />
          ) : (
            <Avatar
              sx={{
                width: (theme) => theme.spacing(5),
                height: (theme) => theme.spacing(5),
              }}
            >
              {avatarName}
            </Avatar>
          )}
          <Typography marginLeft={2} fontWeight={500} fontSize={"18px"}>
            {conversation.userName}
          </Typography>
        </Stack>
        <Stack direction={"row"} columnGap={"8px"}>
          <StyledIcon onClick={() => setOpenRefundModal(true)}>
            <LocalAtmOutlined
              sx={{
                color: "#0184c6",
              }}
            />
            <Typography color={"#0184c6"}>Hoàn tiền</Typography>
          </StyledIcon>
          <StyledIcon
            onClick={() => {
              setOpenConversationModal(true);
            }}
          >
            <CloseOutlined color="error" />
            <Typography color={"error"}>Đóng</Typography>
          </StyledIcon>
        </Stack>
      </Stack>

      <Modal
        open={openConversationModal}
        onClose={handleCloseConversationModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading ? (
            <Loading />
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

      <Modal
        open={openRefundModal}
        onClose={handleCloseRefundModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Hoàn tiền
              </Typography>
              <MuiTextFeild
                autoComplete="off"
                value={bookingCode}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length !== 12) {
                    setRefundErrorMessages("Mã đặt khám không hợp lệ");
                    setBookingData(null);
                  } else {
                    setRefundErrorMessages("");
                  }

                  setBookingCode(value);
                }}
                placeholder="Mã đặt khám"
                variant="outlined"
                fullWidth
                label="Mã đặt khám"
                size="medium"
                margin="normal"
              />
              {refundErrorMessages && (
                <Typography color={"error"} fontSize={"14px"}>
                  {refundErrorMessages}
                </Typography>
              )}

              {bookingData && (
                <Card
                  sx={{
                    padding: 2,
                    marginTop: 1,
                  }}
                >
                  <Typography>
                    Chuyên khoa: <strong>{bookingData.departmentName}</strong>
                  </Typography>
                  <Typography>
                    Bác sĩ: <strong>{bookingData.doctorName}</strong>
                  </Typography>
                  <Typography>
                    Bệnh nhân: <strong>{bookingData.patientName}</strong>
                  </Typography>
                  <Typography>
                    Ngày đặt khám:{" "}
                    <strong>
                      {dayjs(bookingData.bookingDate).format("DD/MM/YYYY")}
                    </strong>
                  </Typography>
                  <Typography>
                    Số tiền hoàn trả:{" "}
                    <strong>{formatCurrency(bookingData.refundAmount)}</strong>
                  </Typography>
                </Card>
              )}

              {bookingCodeChecking && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: 2,
                  }}
                >
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "#0184c6",
                    }}
                  />
                </Box>
              )}

              <MuiTextFeild
                autoComplete="off"
                value={refundReason}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length === 0)
                    setRefundReasonError("Lý do hoàn tiền không được để trống");
                  else setRefundReasonError("");
                  setRefundReason(value);
                }}
                placeholder="Lý do hoàn tiền"
                variant="outlined"
                fullWidth
                label="Lý do hoàn tiền"
                size="medium"
                margin="normal"
              />
              {refundReasonError && (
                <Typography color={"error"} fontSize={"14px"}>
                  {refundReasonError}
                </Typography>
              )}

              <Stack
                direction={"row"}
                justifyContent={"flex-end"}
                marginTop={2}
              >
                <StyledIcon
                  onClick={() => {
                    handleCloseRefundModal();
                  }}
                >
                  <Typography color={"error"}>Hủy</Typography>
                </StyledIcon>
                <StyledIcon onClick={handleRefund}>
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
