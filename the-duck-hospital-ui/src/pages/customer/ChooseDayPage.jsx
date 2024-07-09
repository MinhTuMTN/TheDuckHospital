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
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfoLine from "../../components/Customer/InfoLine";
import CustomLink from "../../components/General/CustomLink";
import { getTimeSlotById } from "../../utils/timeSlotUtils";
import { Close } from "@mui/icons-material";

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
  borderRadius: "12px",
  textTransform: "none",
  boxShadow: "none",
  background:
    isactive === "true"
      ? "linear-gradient(to right, #42a5f5, #6fccea)"
      : "#fff",
  color: isactive === "true" ? "#fff" : "#000",
  display: "flex",
  flexBasis: "48%",
  margin: "4px 0",
  border: "1px solid #e0e0e0",

  "&:hover": {
    backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
    color: "#fff !important",
    boxShadow: "none",
  },
}));

function ChooseDayPage(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [selectedDate, setSelectedDate] = useState(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const navigate = useNavigate();

  const { doctor, profile, schedules = [] } = useLocation().state;
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setConfirmationOpen(true);

    const dateStr = dayjs(newDate).format("DD/MM/YYYY");
    const doctorSchedules = doctor.doctorSchedules;
    const selectedSchedules = doctorSchedules.filter((schedule) => {
      return dayjs(schedule.date).format("DD/MM/YYYY") === dateStr;
    });
    setSelectedSchedules(selectedSchedules);
  };
  const disableDate = useCallback(
    (date) => {
      const dateStr = dayjs(date).format("DD/MM/YYYY");
      if (schedules && schedules.length > 0) {
        const enableDate = dayjs(schedules[0].schedule.date).format(
          "DD/MM/YYYY"
        );

        return dateStr !== enableDate;
      }
      const doctorSchedules = doctor.doctorSchedules;
      const isDisable = doctorSchedules.some((schedule) => {
        return dayjs(schedule.date).format("DD/MM/YYYY") === dateStr;
      });
      return !isDisable;
    },
    [doctor.doctorSchedules, schedules]
  );

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setSelectedSchedule(null);
    setSelectedTimeSlot(null);
    handleButtonClick(null);
  };

  const handleConfirmationProceed = () => {
    if (!selectedSchedule) {
      enqueueSnackbar("Vui lòng chọn buổi khám và giờ khám", {
        variant: "error",
      });
      return;
    }
    setConfirmationOpen(false);

    schedules.push({
      doctor,
      schedule: selectedSchedule,
      timeSlot: selectedTimeSlot,
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
                paddingX: 0,
                paddingY: 0,
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                paddingX={"12px"}
                paddingY={"10px"}
              >
                <Typography fontWeight={500} fontSize={"16px"}>
                  {" "}
                  Chọn giờ khám bệnh
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => {
                    handleConfirmationClose();
                  }}
                >
                  <Close
                    style={{
                      fontSize: "22px",
                    }}
                  />
                </IconButton>
              </Stack>
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
                  lableName="Bác sĩ khám:"
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
                direction={"column"}
                spacing={1}
                sx={{
                  marginTop: "8px",
                }}
              >
                {selectedSchedules.map((schedule) => (
                  <Stack key={schedule.doctorScheduleId}>
                    <Typography fontSize={14} fontWeight={500}>
                      {schedule.scheduleSession === "MORNING"
                        ? "Buổi sáng:"
                        : "Buổi chiều:"}
                    </Typography>
                    <Stack
                      direction={"row"}
                      flexWrap={"wrap"}
                      justifyContent={"space-between"}
                    >
                      {schedule.timeSlots?.map((timeSlot) => (
                        <CustomButtonChoosen
                          key={timeSlot.timeSlotId}
                          variant="contained"
                          isactive={
                            activeButton === timeSlot.timeSlotId
                              ? "true"
                              : "false"
                          }
                          onClick={() => {
                            handleButtonClick(timeSlot.timeSlotId);
                            setSelectedSchedule(schedule);
                            setSelectedTimeSlot(timeSlot);
                          }}
                          disabled={
                            !schedule.available ||
                            timeSlot.currentSlot >= timeSlot.maxSlot
                          }
                        >
                          {getTimeSlotById(timeSlot.timeId)}
                        </CustomButtonChoosen>
                      ))}
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </DialogContent>
            <DialogActions
              sx={{
                borderTop: "1px solid #e0e0e0",
                paddingX: "12px",
                paddingY: "4px",
              }}
            >
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
