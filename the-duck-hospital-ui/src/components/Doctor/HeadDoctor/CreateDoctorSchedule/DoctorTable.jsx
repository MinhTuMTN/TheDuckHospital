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
  getInvalidDate,
  getRoomsDepartment,
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
  fontSize: "14px !important",
  marginBottom: "2px !important",
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
  });
  const [rooms, setRooms] = useState([]);
  const [highlightedMorningDays, setHighlightedMorningDays] = useState([]);
  const [highlightedAfternoonDays, setHighlightedAfternoonDays] = useState([]);
  const minDate = dayjs();
  const [valueDate] = useState(dayjs());
  const [invalidDate, setInvalidDate] = useState({
    mornings: [],
    afternoons: [],
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
      !scheduleSelected.afternoon.checked
    ) {
      enqueueSnackbar("Cần chọn ít nhất 1 buổi để tạo ca trực", {
        variant: "error",
      });
      return;
    }

    if (
      highlightedMorningDays.length <= 0 &&
      highlightedAfternoonDays.length <= 0
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
      slot: doctorSchedule.slot,
      morningDates: highlightedMorningDays.map((date) => dayjs(date)),
      afternoonDates: highlightedAfternoonDays.map((date) => dayjs(date)),
    });
    if (response.success) {
      enqueueSnackbar("Tạo ca trực thành công!", { variant: "success" });
      setAddButtonClicked(false);
      setOpenPopup(false);
    } else enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
  };

  const handleGetRooms = useCallback(async () => {
    const response = await getRoomsDepartment();
    if (response.success) {
      setRooms(response.data.data);
    } else
      enqueueSnackbar("Lấy danh sách phòng thấy bại", { variant: "error" });
  }, []);

  useEffect(() => {
    handleGetRooms();
  }, [handleGetRooms]);

  const handleChange = (event) => {
    setScheduleSelected({
      ...scheduleSelected,
      [event.target.name]: {
        checked: event.target.checked,
        dates: [],
      },
    });
  };

  const handleGetInvalidDate = useCallback(async () => {
    const response = await getInvalidDate({
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
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, [doctorSchedule.roomId, doctorSchedule.doctorId]);

  useEffect(() => {
    if (doctorSchedule.roomId !== "") {
      handleGetInvalidDate();
    }
  }, [handleGetInvalidDate, doctorSchedule.roomId]);

  useEffect(() => {
    setHighlightedMorningDays([]);
  }, [doctorSchedule.roomId, scheduleSelected.morning.checked]);

  useEffect(() => {
    setHighlightedAfternoonDays([]);
  }, [doctorSchedule.roomId, scheduleSelected.afternoon.checked]);

  function disableInvalidMorningDate(date) {
    return invalidDate.mornings?.includes(date.format("YYYY/MM/DD"));
  }

  function disableInvalidAfternoonDate(date) {
    return invalidDate.afternoons?.includes(date.format("YYYY/MM/DD"));
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
                      slot: 30,
                    });
                    setOpenPopup(true);
                    setHighlightedMorningDays([]);
                    setHighlightedAfternoonDays([]);
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
            setHighlightedMorningDays([]);
            setHighlightedAfternoonDays([]);
          }}
          onOk={handleCreateSchedule}
          open={openPopup}
          title={"Tạo ca trực"}
          onClose={() => {
            setOpenPopup(false);
            setAddButtonClicked(false);
            setHighlightedMorningDays([]);
            setHighlightedAfternoonDays([]);
          }}
        >
          <Stack width={"30rem"} mt={3} spacing={4}>
            <Stack direction="row" spacing={2}>
              <CustomTextField
                label="Bác sĩ"
                value={doctorSchedule.doctorName}
                disabled
                required
                style={{
                  width: "60%",
                }}
              />
              <CustomTextField
                type="number"
                label="Số lượng chỗ"
                autoFocus
                autoComplete="off"
                style={{ width: "40%" }}
                InputProps={{ inputProps: { min: 1 } }}
                value={
                  doctorSchedule.slot ? doctorSchedule.slot.toString() : "1"
                }
                onChange={(e) => {
                  setDoctorSchedule((prev) => ({
                    ...prev,
                    slot:
                      e.target.value && parseInt(e.target.value) > 0
                        ? parseInt(e.target.value)
                        : 1,
                  }));
                }}
                required
                error={doctorSchedule.slot === 0 && addButtonClicked}
                helperText={
                  doctorSchedule.slot === 0 &&
                  addButtonClicked &&
                  "Số lượng chỗ phải lớn hơn 0"
                }
              />
            </Stack>
            <Stack spacing={2} direction="row">
              <Box width="50%">
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

              <Box width="50%">
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
