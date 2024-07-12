import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
  Radio,
  RadioGroup,
  TablePagination,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import DialogForm from "../../../General/DialogForm";
import { enqueueSnackbar } from "notistack";
import {
  createDoctorSchedule,
  getInvalidExaminationDate,
  getInvalidTreatmentDate,
  getExaminationRoomsDepartment,
  getTreatmentRoomsDepartment,
} from "../../../../services/doctor/headDoctor/ScheduleServices";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

const CustomDoctorBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(2.5),
  margin: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(
    2
  )} ${theme.spacing(2)}`,
  border: `1.5px solid #000000`,
  borderRadius: "1rem",
  boxShadow: `0px 1px 3px #000000`,
  background: "#fafafa",
  transition: "background 2s",
  "&:hover": {
    border: `1.5px solid ${theme.palette.template.normal2}`,
    color: theme.palette.template.darker,
    background: `linear-gradient(45deg, #f3fcff 30%, #E2F7FF 90%)`,
    boxShadow: `0px 4px 5px ${theme.palette.template.darker}`,
    transform: "scale(1.05)",
  },
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "1.2rem",
}));

const Content = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "1.1rem",
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: "17px !important",
  marginBottom: "2px !important",
  fontWeight: "500 !important",
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  input: {
    height: "100%",
  },
}));

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.template.main,
    color: "white",
  },
  "&.Mui-selected.Mui-current": {
    // Màu sắc khi là ngày hiện tại đang chọn
    backgroundColor: "red", // Thay đổi màu sắc tùy thuộc vào yêu cầu của bạn
  },
}));

const ServerMorningDay = (props) => {
  const { highlightedMorningDays, day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedMorningDays.includes(day.format("YYYY/MM/DD"));

  return (
    <HighlightedDay
      {...other}
      day={day}
      selected={isSelected}
      outsideCurrentMonth={outsideCurrentMonth}
    />
  );
};

const ServerAfternoonDay = (props) => {
  const { highlightedAfternoonDays, day, ...other } = props;

  const isSelected = highlightedAfternoonDays.includes(
    day.format("YYYY/MM/DD")
  );

  return <HighlightedDay {...other} day={day} selected={isSelected} />;
};

const ServerEveningDay = (props) => {
  const { highlightedEveningDays, day, ...other } = props;

  const isSelected = highlightedEveningDays.includes(day.format("YYYY/MM/DD"));

  return <HighlightedDay {...other} day={day} selected={isSelected} />;
};

const ServerNightDay = (props) => {
  const { highlightedNightDays, day, ...other } = props;

  const isSelected = highlightedNightDays.includes(day.format("YYYY/MM/DD"));

  return <HighlightedDay {...other} day={day} selected={isSelected} />;
};

function DoctorTable(props) {
  const { count, onPageChange, onRowsPerPageChange, page, items, rowsPerPage } =
    props;
  const [openPopup, setOpenPopup] = useState(false);
  const [doctorSchedule, setDoctorSchedule] = useState({
    doctorName: "",
    doctorId: "",
    medicalServices: [],
    medicalServiceId: "",
    roomId: "",
  });
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [scheduleSelected, setScheduleSelected] = useState({
    morning: {
      checked: true,
      dates: [],
    },
    afternoon: {
      checked: false,
      dates: [],
    },
    evening: {
      checked: false,
      dates: [],
    },
    night: {
      checked: false,
      dates: [],
    },
  });
  const [rooms, setRooms] = useState([]);
  const [roomType, setRoomType] = useState("EXAMINATION_ROOM");
  const [scheduleType, setScheduleType] = useState("EXAMINATION");
  const [highlightedMorningDays, setHighlightedMorningDays] = useState([]);
  const [highlightedAfternoonDays, setHighlightedAfternoonDays] = useState([]);
  const [highlightedEveningDays, setHighlightedEveningDays] = useState([]);
  const [highlightedNightDays, setHighlightedNightDays] = useState([]);
  const minDate = dayjs();
  const [valueDate] = useState(dayjs());
  const [invalidDate, setInvalidDate] = useState({
    mornings: [],
    afternoons: [],
    evenings: [],
    nights: [],
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleCreateSchedule = async () => {
    setAddButtonClicked(true);
    if (doctorSchedule.doctorId?.trim() === "") {
      enqueueSnackbar("Bác sĩ không được để trống", { variant: "error" });
      return;
    }

    if (doctorSchedule.medicalServiceId === "") {
      enqueueSnackbar("Dịch vụ không được để trống", { variant: "error" });
      return;
    }

    if (doctorSchedule.roomId === "") {
      enqueueSnackbar("Phòng không được để trống", { variant: "error" });
      return;
    }

    if (doctorSchedule.slot === 0) {
      enqueueSnackbar("Số lượng chỗ phải lớn hơn 0", { variant: "error" });
      return;
    }

    if (
      !scheduleSelected.morning.checked &&
      !scheduleSelected.afternoon.checked &&
      !scheduleSelected.evening.checked &&
      !scheduleSelected.night.checked
    ) {
      enqueueSnackbar("Cần chọn ít nhất 1 buổi để tạo ca trực", {
        variant: "error",
      });
      return;
    }

    if (
      highlightedMorningDays.length <= 0 &&
      highlightedAfternoonDays.length <= 0 &&
      highlightedEveningDays.length <= 0 &&
      highlightedNightDays.length <= 0
    ) {
      enqueueSnackbar("Cần chọn ít nhất 1 ngày để tạo ca trực", {
        variant: "error",
      });
      return;
    }

    const response = await createDoctorSchedule({
      doctorId: doctorSchedule.doctorId,
      medicalServiceId: doctorSchedule.medicalServiceId,
      roomId: doctorSchedule.roomId,
      slotPerTimeSlot: doctorSchedule.slot,
      scheduleType: scheduleType,
      morningDates: highlightedMorningDays.map((date) => dayjs(date)),
      afternoonDates: highlightedAfternoonDays.map((date) => dayjs(date)),
      eveningDates: highlightedEveningDays.map((date) => dayjs(date)),
      nightDates: highlightedNightDays.map((date) => dayjs(date)),
    });
    resetScheduleData();
    if (response.success) {
      enqueueSnackbar("Tạo ca trực thành công!", { variant: "success" });
      setAddButtonClicked(false);
      setOpenPopup(false);
    } else enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  };

  const resetScheduleData = () => {
    setDoctorSchedule((prev) => ({
      ...prev,
      roomId: "",
    }));
    setHighlightedMorningDays([]);
    setHighlightedAfternoonDays([]);
    setHighlightedEveningDays([]);
    setHighlightedNightDays([]);
    setScheduleSelected({
      morning: {
        checked: true,
        dates: [],
      },
      afternoon: {
        checked: false,
        dates: [],
      },
      evening: {
        checked: false,
        dates: [],
      },
      night: {
        checked: false,
        dates: [],
      },
    });
  };

  const handleGetExaminationRooms = useCallback(async () => {
    const response = await getExaminationRoomsDepartment();
    if (response.success) {
      setRooms(response.data.data);
    } else
      enqueueSnackbar("Lấy danh sách phòng khám thấy bại", {
        variant: "error",
      });
  }, []);

  const handleGetTreatmentRooms = useCallback(async () => {
    const response = await getTreatmentRoomsDepartment();
    if (response.success) {
      setRooms(response.data.data);
    } else
      enqueueSnackbar("Lấy danh sách phòng nội trú thấy bại", {
        variant: "error",
      });
  }, []);

  useEffect(() => {
    resetScheduleData();
    if (roomType === "EXAMINATION_ROOM") {
      handleGetExaminationRooms();
    } else {
      handleGetTreatmentRooms();
    }
  }, [handleGetExaminationRooms, handleGetTreatmentRooms, roomType]);

  const handleChange = (event) => {
    setScheduleSelected({
      ...scheduleSelected,
      [event.target.name]: {
        checked: event.target.checked,
        dates: [],
      },
    });
  };

  const handleGetInvalidExaminationDate = useCallback(async () => {
    const response = await getInvalidExaminationDate({
      roomId: doctorSchedule.roomId,
      doctorId: doctorSchedule.doctorId,
    });
    if (response.success) {
      setInvalidDate((prev) => {
        return {
          ...prev,
          mornings: response.data.data.mornings.map((date) =>
            dayjs(date).format("YYYY/MM/DD")
          ),
        };
      });

      setInvalidDate((prev) => {
        return {
          ...prev,
          afternoons: response.data.data.afternoons.map((date) =>
            dayjs(date).format("YYYY/MM/DD")
          ),
        };
      });

      setInvalidDate((prev) => {
        return {
          ...prev,
          evenings: [],
        };
      });

      setInvalidDate((prev) => {
        return {
          ...prev,
          nights: [],
        };
      });
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, [doctorSchedule.roomId, doctorSchedule.doctorId]);

  const handleGetInvalidTreatmentDate = useCallback(async () => {
    const response = await getInvalidTreatmentDate({
      roomId: doctorSchedule.roomId,
      doctorId: doctorSchedule.doctorId,
    });
    if (response.success) {
      setInvalidDate((prev) => {
        return {
          ...prev,
          mornings: response.data.data.mornings.map((date) =>
            dayjs(date).format("YYYY/MM/DD")
          ),
        };
      });

      setInvalidDate((prev) => {
        return {
          ...prev,
          afternoons: response.data.data.afternoons.map((date) =>
            dayjs(date).format("YYYY/MM/DD")
          ),
        };
      });

      setInvalidDate((prev) => {
        return {
          ...prev,
          evenings: response.data.data.evenings.map((date) =>
            dayjs(date).format("YYYY/MM/DD")
          ),
        };
      });

      setInvalidDate((prev) => {
        return {
          ...prev,
          nights: response.data.data.nights.map((date) =>
            dayjs(date).format("YYYY/MM/DD")
          ),
        };
      });
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, [doctorSchedule.roomId, doctorSchedule.doctorId]);

  useEffect(() => {
    if (doctorSchedule.roomId !== "") {
      if (scheduleType === "EXAMINATION") {
        handleGetInvalidExaminationDate();
      } else {
        handleGetInvalidTreatmentDate();
      }
    }
  }, [
    handleGetInvalidExaminationDate,
    handleGetInvalidTreatmentDate,
    doctorSchedule.roomId,
    scheduleType,
  ]);

  useEffect(() => {
    setHighlightedMorningDays([]);
  }, [doctorSchedule.roomId, scheduleSelected.morning.checked]);

  useEffect(() => {
    setHighlightedAfternoonDays([]);
  }, [doctorSchedule.roomId, scheduleSelected.afternoon.checked]);

  useEffect(() => {
    setHighlightedEveningDays([]);
  }, [doctorSchedule.roomId, scheduleSelected.evening.checked]);

  useEffect(() => {
    setHighlightedNightDays([]);
  }, [doctorSchedule.roomId, scheduleSelected.night.checked]);

  function disableInvalidMorningDate(date) {
    return invalidDate.mornings?.includes(date.format("YYYY/MM/DD"));
  }

  function disableInvalidAfternoonDate(date) {
    return invalidDate.afternoons?.includes(date.format("YYYY/MM/DD"));
  }

  function disableInvalidEveningDate(date) {
    return invalidDate.evenings?.includes(date.format("YYYY/MM/DD"));
  }

  function disableInvalidNightDate(date) {
    return invalidDate.nights?.includes(date.format("YYYY/MM/DD"));
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Grid container sx={{ padding: 2 }}>
            {items.map((item, index) => (
              <Grid item xs={isSmallScreen ? 12 : 6} key={index}>
                <CustomDoctorBox
                  onClick={() => {
                    setDoctorSchedule({
                      doctorId: item.staffId,
                      doctorName: item.fullName,
                      roomId: "",
                      medicalServices: item.medicalServices,
                      medicalServiceId: item.medicalServices[0].serviceId,
                      startTime: dayjs().add(1, "day"),
                      endTime: dayjs().add(1, "day"),
                      slot: 5,
                    });
                    setOpenPopup(true);
                    setHighlightedMorningDays([]);
                    setHighlightedAfternoonDays([]);
                    setHighlightedEveningDays([]);
                    setHighlightedNightDays([]);
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Label>Bác sĩ:</Label>
                    <Content>{item.fullName}</Content>
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Label>Số điện thoại:</Label>
                    <Content>{item.phoneNumber}</Content>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Label>Email:</Label>
                    <Content>
                      {isSmallScreen
                        ? item.email?.slice(0, 10) + "..."
                        : item.email}
                    </Content>
                  </Stack>
                </CustomDoctorBox>
              </Grid>
            ))}
          </Grid>
        </Box>
        <DialogForm
          cancelText={"Hủy"}
          okText={"Tạo"}
          onCancel={() => {
            setOpenPopup(false);
            setAddButtonClicked(false);
            resetScheduleData();
            setRoomType("EXAMINATION_ROOM");
            setScheduleType("EXAMINATION");
          }}
          onOk={handleCreateSchedule}
          open={openPopup}
          title={"Tạo ca trực"}
          onClose={() => {
            setOpenPopup(false);
            setAddButtonClicked(false);
            resetScheduleData();
            setRoomType("EXAMINATION_ROOM");
            setScheduleType("EXAMINATION");
          }}
        >
          <Stack width={"30rem"} mt={3} spacing={1}>
            <Stack direction="row" spacing={2} flexWrap={true}>
              <CustomTextField
                label="Bác sĩ"
                value={doctorSchedule.doctorName}
                disabled
                required
                sx={{
                  width: roomType === "EXAMINATION_ROOM" ? "60%" : "100%",
                }}
              />
              {roomType === "EXAMINATION_ROOM" && (
                <CustomTextField
                  type="number"
                  label="Số lượt khám trong một giờ"
                  autoFocus
                  autoComplete="off"
                  style={{ width: "40%" }}
                  InputProps={{ inputProps: { min: 1 } }}
                  value={
                    doctorSchedule.slot ? doctorSchedule.slot.toString() : "0"
                  }
                  onChange={(e) => {
                    setDoctorSchedule((prev) => ({
                      ...prev,
                      slot:
                        e.target.value && parseInt(e.target.value) >= 0
                          ? parseInt(e.target.value)
                          : 0,
                    }));
                  }}
                  required
                  error={doctorSchedule.slot === 0 && addButtonClicked}
                  helperText={
                    doctorSchedule.slot === 0 &&
                    addButtonClicked &&
                    "Số lượng khám trong một giờ phải lớn hơn 0"
                  }
                />
              )}
            </Stack>
            {roomType === "EXAMINATION_ROOM" && (
              <Typography
                variant="caption"
                style={{ width: "100%", marginTop: 4 }}
                color={"#8e8e8e"}
              >
                Trong một buổi khám sẽ có tổng cộng {doctorSchedule.slot * 4}{" "}
                người có thể đăng ký online
              </Typography>
            )}

            <Stack
              style={{ width: "100%" }}
              direction={"row"}
              alignItems={"center"}
              spacing={2}
            >
              <CustomTypography variant="body1">Loại phòng: </CustomTypography>
              <FormControl di>
                <RadioGroup
                  defaultValue="EXAMINATION_ROOM"
                  value={roomType}
                  row
                >
                  <FormControlLabel
                    onChange={(e) => {
                      setRoomType(e.target.value);
                      setScheduleType("EXAMINATION");
                    }}
                    value="EXAMINATION_ROOM"
                    control={<Radio />}
                    label="Khám"
                  />
                  <FormControlLabel
                    onChange={(e) => {
                      setRoomType(e.target.value);
                      setScheduleType("INPATIENT_EXAMINATION");
                    }}
                    value="TREATMENT_ROOM"
                    control={<Radio />}
                    label="Nội trú"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>

            <Box>
              <CustomTypography
                variant="body1"
                style={{
                  color:
                    doctorSchedule.roomId === "" && addButtonClicked
                      ? "red"
                      : "",
                }}
              >
                Phòng *
              </CustomTypography>
              <FormControl
                fullWidth
                error={doctorSchedule.roomId === "" && addButtonClicked}
              >
                <Select
                  value={doctorSchedule.roomId}
                  onChange={(e) => {
                    setDoctorSchedule((prev) => ({
                      ...prev,
                      roomId: e.target.value,
                    }));
                  }}
                  displayEmpty
                  required
                  sx={{
                    fontSize: "16px !important",
                    width: "100%",
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {rooms?.map((item, index) => (
                    <MenuItem key={index} value={item.roomId}>
                      <Typography style={{ fontSize: "16px" }}>
                        {item.roomName}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
                {doctorSchedule.roomId === "" && addButtonClicked && (
                  <FormHelperText>Phòng không được để trống</FormHelperText>
                )}
              </FormControl>
            </Box>

            <Stack
              spacing={2}
              direction="row"
              style={{
                display: "none",
              }}
            >
              <Box width="100%">
                <CustomTypography
                  variant="body1"
                  style={{
                    color:
                      doctorSchedule.medicalServiceId === "" && addButtonClicked
                        ? "red"
                        : "",
                  }}
                >
                  Dịch vụ *
                </CustomTypography>

                <FormControl
                  fullWidth
                  error={
                    doctorSchedule.medicalServiceId === "" && addButtonClicked
                  }
                >
                  <Select
                    value={doctorSchedule.medicalServiceId}
                    onChange={(e) =>
                      setDoctorSchedule((prev) => {
                        return {
                          ...prev,
                          medicalServiceId: e.target.value,
                        };
                      })
                    }
                    displayEmpty
                    required
                    sx={{
                      fontSize: "16px !important",
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {doctorSchedule.medicalServices?.map((item, index) => (
                      <MenuItem key={index} value={item.serviceId}>
                        <Typography style={{ fontSize: "16px" }}>
                          {item.serviceName}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  {doctorSchedule.medicalServiceId === "" &&
                    addButtonClicked && (
                      <FormHelperText>
                        Dịch vụ không được để trống
                      </FormHelperText>
                    )}
                </FormControl>
              </Box>
            </Stack>

            <Box width="100%">
              <FormControl
                component="fieldset"
                variant="standard"
                style={{ width: "100%" }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={scheduleSelected.morning.checked}
                        onChange={handleChange}
                        name="morning"
                      />
                    }
                    label={"Buổi sáng"}
                  />
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="en-gb"
                  >
                    <DateCalendar
                      value={valueDate}
                      minDate={minDate}
                      disabled={
                        doctorSchedule.roomId === "" ||
                        !scheduleSelected.morning.checked
                      }
                      shouldDisableDate={disableInvalidMorningDate}
                      onChange={(newDate) => {
                        setHighlightedMorningDays((prev) => {
                          if (prev.includes(newDate.format("YYYY/MM/DD")))
                            return prev.filter(
                              (prevDate) =>
                                prevDate !== newDate.format("YYYY/MM/DD")
                            );
                          else return [...prev, newDate.format("YYYY/MM/DD")];
                        });
                      }}
                      slots={{
                        day: ServerMorningDay,
                      }}
                      slotProps={{
                        day: {
                          highlightedMorningDays,
                        },
                      }}
                      sx={{
                        display: scheduleSelected.morning.checked ? "" : "none",
                        margin: "0 auto",
                        width: "100%",
                        "& .MuiDayCalendar-header, .MuiDayCalendar-weekContainer":
                          {
                            justifyContent: "space-around",
                          },
                      }}
                    />
                  </LocalizationProvider>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={scheduleSelected.afternoon.checked}
                        onChange={handleChange}
                        name="afternoon"
                      />
                    }
                    label={"Buổi chiều"}
                  />
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="en-gb"
                  >
                    <DateCalendar
                      value={valueDate}
                      minDate={minDate}
                      disabled={
                        doctorSchedule.roomId === "" ||
                        !scheduleSelected.afternoon.checked
                      }
                      shouldDisableDate={disableInvalidAfternoonDate}
                      onChange={(newDate) => {
                        setHighlightedAfternoonDays((prev) => {
                          if (prev.includes(newDate.format("YYYY/MM/DD")))
                            return prev.filter(
                              (prevDate) =>
                                prevDate !== newDate.format("YYYY/MM/DD")
                            );
                          else return [...prev, newDate.format("YYYY/MM/DD")];
                        });
                      }}
                      slots={{
                        day: ServerAfternoonDay,
                      }}
                      slotProps={{
                        day: {
                          highlightedAfternoonDays,
                        },
                      }}
                      sx={{
                        display: scheduleSelected.afternoon.checked
                          ? ""
                          : "none",
                        margin: "0 auto",
                        width: "100%",
                        "& .MuiDayCalendar-header, .MuiDayCalendar-weekContainer":
                          {
                            justifyContent: "space-around",
                          },
                      }}
                    />
                  </LocalizationProvider>

                  {scheduleType !== "EXAMINATION" && (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={scheduleSelected.evening.checked}
                            onChange={handleChange}
                            name="evening"
                          />
                        }
                        label={"Buổi tối"}
                      />
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="en-gb"
                      >
                        <DateCalendar
                          value={valueDate}
                          minDate={minDate}
                          disabled={
                            doctorSchedule.roomId === "" ||
                            !scheduleSelected.evening.checked
                          }
                          shouldDisableDate={disableInvalidEveningDate}
                          onChange={(newDate) => {
                            setHighlightedEveningDays((prev) => {
                              if (prev.includes(newDate.format("YYYY/MM/DD")))
                                return prev.filter(
                                  (prevDate) =>
                                    prevDate !== newDate.format("YYYY/MM/DD")
                                );
                              else
                                return [...prev, newDate.format("YYYY/MM/DD")];
                            });
                          }}
                          slots={{
                            day: ServerEveningDay,
                          }}
                          slotProps={{
                            day: {
                              highlightedEveningDays,
                            },
                          }}
                          sx={{
                            display: scheduleSelected.evening.checked
                              ? ""
                              : "none",
                            margin: "0 auto",
                            width: "100%",
                            "& .MuiDayCalendar-header, .MuiDayCalendar-weekContainer":
                              {
                                justifyContent: "space-around",
                              },
                          }}
                        />
                      </LocalizationProvider>

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={scheduleSelected.night.checked}
                            onChange={handleChange}
                            name="night"
                          />
                        }
                        label={"Đêm khuya"}
                      />
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="en-gb"
                      >
                        <DateCalendar
                          value={valueDate}
                          minDate={minDate}
                          disabled={
                            doctorSchedule.roomId === "" ||
                            !scheduleSelected.night.checked
                          }
                          shouldDisableDate={disableInvalidNightDate}
                          onChange={(newDate) => {
                            setHighlightedNightDays((prev) => {
                              if (prev.includes(newDate.format("YYYY/MM/DD")))
                                return prev.filter(
                                  (prevDate) =>
                                    prevDate !== newDate.format("YYYY/MM/DD")
                                );
                              else
                                return [...prev, newDate.format("YYYY/MM/DD")];
                            });
                          }}
                          slots={{
                            day: ServerNightDay,
                          }}
                          slotProps={{
                            day: {
                              highlightedNightDays,
                            },
                          }}
                          sx={{
                            display: scheduleSelected.night.checked
                              ? ""
                              : "none",
                            margin: "0 auto",
                            width: "100%",
                            "& .MuiDayCalendar-header, .MuiDayCalendar-weekContainer":
                              {
                                justifyContent: "space-around",
                              },
                          }}
                        />
                      </LocalizationProvider>
                    </>
                  )}
                </FormGroup>
              </FormControl>
            </Box>
          </Stack>
        </DialogForm>
      </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[6, 12, 18, 24, 30]}
        sx={{
          borderTop: `1px solid #dadada`,
        }}
      />
    </>
  );
}

DoctorTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

export default DoctorTable;
