import styled from "@emotion/styled";
import { Search } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import { NurseContext } from "../../auth/NurseProvider";
import CustomLi from "../../components/Customer/BookingItemPage/CustomLi";
import { searchPatient } from "../../services/nurse/BookingServices";
import {
  accepcNonPatientBooking,
  accepctPatientBooking,
} from "../../services/nurse/MedicalExamServices";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const CustomTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "400 !important",
  fontSize: "16px",
}));
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "11px 8px",
  },
}));

function ReceivingPatientsItem(props) {
  const { booking } = props;
  const [open, setOpen] = React.useState(false);
  const [patient, setPatient] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [identityNumber, setIdentityNumber] = React.useState(
    booking.patientProfile?.identityNumber || ""
  );
  const { roomId } = useContext(NurseContext);
  const handlePopupClose = () => {
    setOpen(false);
  };
  const handleAcceptPatient = async () => {
    const response = await accepctPatientBooking(booking.bookingCode, roomId);
    if (response.success) {
      enqueueSnackbar("Tiếp nhận bệnh nhân thành công", { variant: "success" });
      setOpen(false);
    } else {
      let message = "Đã có lỗi xảy ra";
      if (response.statusCode === 404) {
        message = "Không tìm thấy thông tin đặt trước";
      } else if (response.statusCode === 410) {
        message = "Phòng khám không hợp lệ";
      } else if (response.statusCode === 409) {
        message = "Ngày đặt khám không hợp lệ";
      } else if (response.statusCode === 411) {
        message = "Mã bệnh nhân không hợp lệ";
      }
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const handleAcceptNonPatient = async () => {
    if (identityNumber.trim().length === 0) {
      enqueueSnackbar("Vui lòng nhập số CCCD/CMND", { variant: "error" });
      return;
    }
    const response = await accepcNonPatientBooking(
      booking.bookingCode,
      identityNumber,
      roomId
    );
    if (response.success) {
      enqueueSnackbar("Tiếp nhận bệnh nhân thành công", { variant: "success" });
      setOpen(false);
    } else {
      let message = "Đã có lỗi xảy ra";
      if (response.statusCode === 404) {
        message = "Không tìm thấy thông tin đặt trước";
      } else if (response.statusCode === 410) {
        message = "Phòng khám không hợp lệ";
      } else if (response.statusCode === 409) {
        message = "Ngày đặt khám không hợp lệ";
      } else if (response.statusCode === 411) {
        message = "Mã bệnh nhân không hợp lệ";
      }
      enqueueSnackbar(message, { variant: "error" });
    }
  };
  const handleSearchPatientCode = async () => {
    if (identityNumber.trim().length === 0) return;

    setIsLoading(true);
    const response = await searchPatient(identityNumber);
    if (response.success) {
      setPatient(response.data.data);
    } else {
      setPatient(null);
    }
    setIsLoading(false);
  };
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "700",
          color: "#00b5f1",
          fontSize: "60px",
          paddingTop: "20px",
          paddingBottom: "20px",
          lineHeight: "1.3rem",
          paddingRight: 2,
        }}
      >
        {booking.queueNumber < 10
          ? "0" + booking.queueNumber
          : booking.queueNumber}
      </Typography>
      <Stack
        direction={"column"}
        sx={{
          width: "100%",
        }}
      >
        <ul
          style={{
            width: "100%",
            borderLeft: "1px solid #00b5f1",
            paddingLeft: "20px",
          }}
        >
          <CustomLi
            lableName="Họ tên:"
            value={booking.patientProfile?.fullName}
          />
          <CustomLi
            lableName="Ngày sinh:"
            value={dayjs(booking.patientProfile?.dateOfBirth).format(
              "DD/MM/YYYY"
            )}
          />
          <CustomLi
            lableName="Địa chỉ:"
            value={`
            ${booking.patientProfile?.district?.districtName}, 
            ${booking.patientProfile?.province?.provinceName}`}
          />
          <CustomLi
            lableName="Mã bệnh nhân:"
            value={booking.patientProfile?.patientCode || "Đang cập nhật"}
            color="red"
          />
          <li
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Button
              fullWidth
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                fontSize: "14px",
                backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
                color: "#fff", // Màu chữ
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(to right, #42a5f5, #6fccea)",
                },
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Tiếp nhận
            </Button>
          </li>
        </ul>
      </Stack>
      {!booking.patientProfile?.patientCode ? (
        <>
          <BootstrapDialog
            open={open}
            onClose={handlePopupClose}
            aria-labelledby="customized-dialog-title"
            maxWidth="xs"
          >
            <DialogTitle
              sx={{ m: 0, p: 2 }}
              id="customized-dialog-title"
              style={{
                display: "flex",
                alignItems: "center",
              }}
              component={"div"}
            >
              <HelpOutlineIcon
                sx={{
                  fontSize: "20px",
                }}
              />{" "}
              <Typography
                variant="h5"
                sx={{
                  marginLeft: "5px",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Tìm mã bệnh nhân
              </Typography>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handlePopupClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "text.secondary",
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <CustomTypography
                variant="body1"
                style={{
                  color: "#12263f",
                  textAlign: "left",
                  marginBottom: "8px",
                }}
              >
                * Tìm theo số CMND/CCCD
              </CustomTypography>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <CustomTextField
                  size="medium"
                  variant="outlined"
                  id="outlined-basic"
                  fullWidth
                  required
                  placeholder="Nhập số CCCD/CMND"
                  value={identityNumber}
                  onChange={(e) => setIdentityNumber(e.target.value)}
                  sx={{
                    minWidth: "250px",
                    "& input": {
                      fontSize: "14px",
                      padding: "10px 8px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    ),
                    style: { fontSize: 14, padding: "10px 4px" },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    width: "100px",
                    padding: "8px 0",
                    fontSize: "14px",
                  }}
                  onClick={handleSearchPatientCode}
                >
                  Tìm
                </Button>
              </Stack>
              {!isLoading && (
                <Box sx={{ height: 1, mt: 1.5 }}>
                  {patient ? (
                    <>
                      <Typography>Mã bệnh nhân cần tìm là: </Typography>
                      <span style={{ color: "#f81f1f", fontWeight: "bold" }}>
                        {patient.patientCode} - {patient.fullName}
                      </span>
                    </>
                  ) : (
                    <>
                      <Typography>
                        Không tìm thấy mã bệnh nhân tương ứng.
                      </Typography>
                      <Typography>
                        Nhấp vào nút{" "}
                        <span style={{ color: "#02b10d", fontWeight: "bold" }}>
                          "Tiếp nhận"
                        </span>{" "}
                        để tiếp nhận bệnh nhân.
                      </Typography>
                    </>
                  )}
                </Box>
              )}

              {isLoading && (
                <Box sx={{ height: 1, mt: 1.5 }}>
                  <Typography>Đang tìm kiếm mã bệnh nhân...</Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                sx={{ color: "#5aafff" }}
                onClick={handleAcceptNonPatient}
              >
                Tiếp nhận
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </>
      ) : (
        <>
          <BootstrapDialog
            open={open}
            onClose={handlePopupClose}
            aria-labelledby="customized-dialog-title"
            maxWidth="xs"
          >
            <DialogTitle
              sx={{ m: 0, p: 2 }}
              id="customized-dialog-title"
              style={{
                display: "flex",
                alignItems: "center",
              }}
              component={"div"}
            >
              <HelpOutlineIcon
                sx={{
                  fontSize: "20px",
                }}
              />{" "}
              <Typography
                variant="h5"
                sx={{
                  marginLeft: "5px",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Xác nhận
              </Typography>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handlePopupClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "text.secondary",
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom textAlign={"justify"}>
                Bạn có chắc chắn muốn tiếp nhận bệnh nhân có mã bệnh nhân{" "}
                <span
                  style={{
                    color: "#f81f1f",
                    fontWeight: "bold",
                  }}
                >
                  {booking.patientProfile?.patientCode}
                </span>{" "}
                này không?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                sx={{ color: "#5aafff" }}
                onClick={handleAcceptPatient}
              >
                Tiếp nhận
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </>
      )}
    </Stack>
  );
}

export default ReceivingPatientsItem;
