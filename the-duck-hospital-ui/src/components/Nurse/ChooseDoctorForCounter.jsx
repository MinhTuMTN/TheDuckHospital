import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import FormatCurrency from "../General/FormatCurrency";
import { createBookingAndMedicalRecord } from "../../services/nurse/BookingServices";
import { enqueueSnackbar } from "notistack";
import { useReactToPrint } from "react-to-print";
import BookingItem from "../Customer/BookingItemPage/BookingItem";

function ChooseDocterForCounter(props) {
  const { doctorSchedule } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const [medicalBill, setMedicalBill] = useState({});
  const patientProfile = useLocation().state?.patientProfile;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleCreateBookingAndMedicalExam = async () => {
    const response = await createBookingAndMedicalRecord(
      patientProfile.patientProfileId,
      doctorSchedule.doctorScheduleId
    );

    if (response.success) {
      setOpenDialog(false);
      setMedicalBill(response.data.data);
      setOpenPrintDialog(true);
    } else
      enqueueSnackbar("Đã xảy ra lỗi khi tạo phiếu khám", {
        variant: "error",
      });
  };
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          borderRadius: "10px",
          border: "1px solid #E0E0E0",
          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
          marginRight: "2px !important",
          paddingTop: "14px",
          paddingBottom: "14px",
          paddingLeft: "15px",
          paddingRight: "15px",
          width: "99%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0px 0px 3px 1px #1da1f2",
            border: "1px solid #89d2ff",
          },
        }}
        onClick={() => setOpenDialog(true)}
      >
        <Stack
          direction={"column"}
          spacing={0.5}
          sx={{
            flex: 2,
          }}
        >
          <Stack
            direction={"row"}
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701684643/doctor_jpgjbk.png"
              alt="doctor"
              sx={{
                width: "1.2rem",
                height: "1.2rem",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                fontWeight: "700!important",
                color: "#D21616",
              }}
            >
              {doctorSchedule?.doctorDegree} {doctorSchedule?.doctorName} - Buổi{" "}
              {doctorSchedule?.scheduleSession === "MORNING" ? "sáng" : "chiều"}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701685316/gender_cyvrdi.png"
              alt="gender"
              sx={{
                width: "20px",
                height: "20px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "template.darker",
              }}
            >
              Giới tính:{" "}
              {doctorSchedule?.doctorGender === "MALE" ? "Nam" : "Nữ"}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701685343/stethoscope_ysrsda.png"
              alt="gender"
              sx={{
                width: "20px",
                height: "20px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "template.darker",
              }}
            >
              Chuyên khoa: {doctorSchedule?.departmentName}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701685345/fee_oy7e2x.png"
              alt="gender"
              sx={{
                width: "20px",
                height: "20px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "template.darker",
              }}
            >
              Phí khám: <FormatCurrency amount={doctorSchedule?.price} />
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderLeft: "2px solid #E0E0E0",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              color: "template.darker",
            }}
          >
            Phòng khám:{" "}
            <span style={{ fontWeight: "500" }}>
              {doctorSchedule?.roomName}
            </span>
          </Typography>
          <Typography
            color={"template.normal1"}
            sx={{
              fontSize: "54px",
              fontWeight: "500",
            }}
          >
            {(doctorSchedule?.numberOfBookings < 10 ? "0" : "") +
              doctorSchedule?.numberOfBookings}
          </Typography>
        </Stack>
      </Stack>

      <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Thanh toán
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={() => setOpenDialog((prev) => !prev)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          Xác nhận thanh toán hoá đơn của bệnh nhân{" "}
          <span style={{ color: "#0096c8", fontWeight: "500" }}>
            {patientProfile.patientCode} - {patientProfile.fullName}
          </span>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#ff5757",
              textTransform: "none",
            }}
            onClick={handleCreateBookingAndMedicalExam}
          >
            Xuất hoá đơn
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog onClose={() => setOpenPrintDialog(false)} open={openPrintDialog}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Đặt khám thành công
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={() => setOpenPrintDialog(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          Đã đặt khám thành công cho bệnh nhân{" "}
          <span style={{ color: "#0096c8", fontWeight: "500" }}>
            {patientProfile.patientCode} - {patientProfile.fullName}
          </span>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#ff5757",
              textTransform: "none",
            }}
            onClick={() => {
              handlePrint();
              setOpenPrintDialog(false);
            }}
          >
            Xuất phiếu khám
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ display: "none" }}>
        <BookingItem medicalBill={medicalBill} ref={componentRef} />
      </div>
    </>
  );
}

export default ChooseDocterForCounter;
