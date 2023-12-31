import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import InfoLine from "../../components/Customer/InfoLine";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import CustomLink from "../../components/General/CustomLink";
import { enqueueSnackbar } from "notistack";

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));
const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 15px",
  toUpperCase: "none",
  fontSize: "14px !important",

  textTransform: "none",
}));

const Header = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, #5ab2f7, #12cff3)`,
  color: "white",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  paddingY: "12rem !important",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "825px",
}));

const Body = styled(Box)(({ theme }) => ({
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "35px",
  paddingBottom: "20px",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
  width: "825px",
  [theme.breakpoints.down("md")]: {
    padding: "0px",
  },
}));

const CustomButtonChoosen = styled(Button)(({ theme, isactive }) => ({
  borderRadius: "4px",
  border: "1.5px solid ",
  borderImage: `linear-gradient(45deg, #5a96f7, #12b3f3)`, // Đặt đường viền gradient khi hover
  borderImageSlice: 1,
  textTransform: "none",
  background:
    isactive === "true"
      ? "linear-gradient(to right, #42a5f5, #6fccea)"
      : "#fff",
  color: isactive === "true" ? "#fff" : "#000",

  "&:hover": {
    backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
    color: "#fff !important",
  },
}));

let doctorSchedules = [];
const disableDate = (date) => {
  const dateStr = dayjs(date).format("DD/MM/YYYY");
  const isDisable = doctorSchedules.some((schedule) => {
    return dayjs(schedule.date).format("DD/MM/YYYY") === dateStr;
  });
  return !isDisable;
};

function ChooseDayPage(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [selectedDate, setSelectedDate] = useState(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const navigate = useNavigate();

  const { doctor, profile, schedules = [] } = useLocation().state;
  doctorSchedules = doctor.doctorSchedules;
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setConfirmationOpen(true);

    const dateStr = dayjs(newDate).format("DD/MM/YYYY");
    const selectedSchedules = doctorSchedules.filter((schedule) => {
      return dayjs(schedule.date).format("DD/MM/YYYY") === dateStr;
    });
    setSelectedSchedules(selectedSchedules);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setSelectedSchedule(null);
    handleButtonClick(null);
  };

  const handleConfirmationProceed = () => {
    if (!selectedSchedule) {
      enqueueSnackbar("Vui lòng chọn buổi khám", { variant: "error" });
      return;
    }
    setConfirmationOpen(false);

    schedules.push({
      doctor,
      schedule: selectedSchedule,
    });
    navigate("/confirm-booking-information", {
      state: {
        doctor,
        profile,
        date: selectedDate,
        schedules,
      },
    });
  };
  const breakcrumbs = [
    <CustomLink to={"/"} key={1}>
      <CustomTextBreakcrumb>Trang chủ</CustomTextBreakcrumb>
    </CustomLink>,
    <CustomLink to={"/choose-patient-profiles"} key={2}>
      <CustomTextBreakcrumb>Đăng ký khám bệnh</CustomTextBreakcrumb>
    </CustomLink>,
    <CustomTextBreakcrumb key={3} onClick={() => navigate(-1)}>
      Chọn bác sĩ
    </CustomTextBreakcrumb>,
    <CustomTextBreakcrumb key={4}>Chọn ngày khám</CustomTextBreakcrumb>,
  ];
  const theme = useTheme();
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <Box
      sx={{
        paddingX: isLgUp ? 22 : 2,
        py: 4,
        backgroundColor: "#E8F2F7",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breakcrumbs}
      </Breadcrumbs>
      <Grid
        container
        spacing={{
          xs: 1,
          md: 2,
        }}
        marginLeft={{
          xs: "-8px",
          md: "-8px",
        }}
        sx={{
          display: "flex",
          mt: 3,
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            paddingLeft: "0px",
            paddingRight: isMdUp ? "20px" : "0",
            textAlign: "left",
            justifyContent: "space-between",
          }}
        >
          <CustomButton
            variant="text"
            sx={{
              "&:hover": {
                backgroundColor: "	#ffffff",
              },
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon
              sx={{
                marginRight: "5px",
              }}
            />
            Quay lại
          </CustomButton>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Header component={Paper} elevation={3}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "500",
                color: "white",
                textAlign: "center",
                paddingY: 1.2,
              }}
            >
              Vui lòng chọn Ngày khám
            </Typography>
          </Header>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            width: "825px",
            borderRadius: "8px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "0px !important",
            [theme.breakpoints.down("md")]: {
              width: 600, // Set width for medium screens
            },
            [theme.breakpoints.down("sm")]: {
              width: 450, // Set width for small screens
            },
          }}
        >
          <Body component={Paper} elevation={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                sx={{
                  margin: "0 auto",
                  width: isLgUp ? "70%" : "100%",
                  "& .MuiDayCalendar-header, .MuiDayCalendar-weekContainer": {
                    justifyContent: "space-around",
                  },
                }}
                shouldDisableDate={disableDate}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Body>
          <Dialog open={isConfirmationOpen} onClose={handleConfirmationClose}>
            <DialogTitle
              sx={{
                borderBottom: "1px solid #e0e0e0",
                paddingY: "8px",
              }}
            >
              Chọn buổi khám bênh
            </DialogTitle>
            <DialogContent
              sx={{
                paddingX: {
                  xs: "16px !important",
                  md: "24px !important",
                },
                paddingY: "14px !important",
                width: {
                  xs: "310px",
                  md: "400px",
                },
              }}
            >
              <Stack direction={"column"} spacing={0.7}>
                <InfoLine
                  lableName="Ngày khám:"
                  dateBooking={selectedDate}
                  urlImage="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701685344/calendar_pranne.png"
                />

                <InfoLine
                  lableName="Bác sĩ:"
                  value={`${doctor.degree} ${doctor.doctorName}`}
                  urlImage="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701685343/stethoscope_ysrsda.png"
                />
                <InfoLine
                  lableName="Chuyên khoa:"
                  value={doctor.department?.departmentName}
                  urlImage="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701791362/aid-kit_v8w5qp.png"
                />
                <InfoLine
                  lableTime="Chọn giờ khám phù hợp với bạn:"
                  urlImage="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701791758/clock_2_ckncns.png"
                />
              </Stack>

              <Stack
                direction={"row"}
                spacing={1}
                sx={{
                  marginTop: "8px",
                }}
              >
                {selectedSchedules.map((schedule) => (
                  <CustomButtonChoosen
                    key={schedule.doctorScheduleId}
                    variant="contained"
                    isactive={
                      activeButton === schedule.doctorScheduleId
                        ? "true"
                        : "false"
                    }
                    onClick={() => {
                      handleButtonClick(schedule.doctorScheduleId);
                      setSelectedSchedule(schedule);
                    }}
                    disabled={!schedule.available}
                  >
                    {schedule.scheduleType === "MORNING"
                      ? "Buổi sáng"
                      : "Buổi chiều"}
                  </CustomButtonChoosen>
                ))}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleConfirmationClose} color="error">
                Hủy bỏ
              </Button>
              <Button onClick={handleConfirmationProceed} color="primary">
                Đồng ý
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChooseDayPage;
