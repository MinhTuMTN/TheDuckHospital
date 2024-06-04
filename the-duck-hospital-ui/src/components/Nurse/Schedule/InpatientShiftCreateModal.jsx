import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  CardMedia,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import {
  createInpatientShiftSchedule,
  getInpatientShift,
  getRoomSchedules,
} from "../../../services/nurse/ScheduleServices";
import { appColors } from "../../../utils/appColorsUtils";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  flex: 1,
  bgcolor: "background.paper",
  boxShadow: 24,
};
// PropsType
InpatientShiftCreateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  nurse: PropTypes.object,
};

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

const CustomDayItem = (props) => {
  const { highlight, day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlight.includes(day.format("YYYY/MM/DD"));

  return (
    <HighlightedDay
      {...other}
      day={day}
      selected={isSelected}
      outsideCurrentMonth={outsideCurrentMonth}
    />
  );
};

const shifts = [
  {
    value: "MORNING",
    name: "Sáng",
    icon: "🌞",
  },
  {
    value: "AFTERNOON",
    name: "Chiều",
    icon: "🌤️",
  },
  {
    value: "EVENING",
    name: "Tối",
    icon: "🌙",
  },
  {
    value: "NIGHT",
    name: "Đêm",
    icon: "🌃",
  },
];

function InpatientShiftCreateModal(props) {
  const { open, onClose, nurse } = props;
  const [roomId, setRoomId] = React.useState("");
  const [roomSchedules, setRoomSchedules] = React.useState([{}]);
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event) => {
    setRoomId(event.target.value);
  };
  const [selectedSession, setSelectedSession] = useState("MORNING");
  const [morningDays, setMorningDays] = useState([]);
  const [afternoonDays, setAfternoonDays] = useState([]);
  const [eveningDays, setEveningDays] = useState([]);
  const [nightDays, setNightDays] = useState([]);
  const minDate = dayjs();
  const [valueDate] = useState(dayjs());
  const [invalidDate, setInvalidDate] = useState({
    mornings: [],
    afternoons: [],
    evenings: [],
    nights: [],
  });
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  function disableInvalidMorningDate(date) {
    return invalidDate[selectedSession.toLowerCase() + "s"]?.includes(
      date.format("YYYY/MM/DD")
    );
  }

  useEffect(() => {
    const handleGetRooms = async () => {
      const standardResponse = await getRoomSchedules(
        "TREATMENT_ROOM_STANDARD"
      );
      const vipResponse = await getRoomSchedules("TREATMENT_ROOM_VIP");
      if (standardResponse.success && vipResponse.success) {
        const rooms = standardResponse.data.data.concat(vipResponse.data.data);
        setRoomSchedules(rooms);
        if (rooms.length > 0) {
          setRoomId(rooms[0].roomId);
        }
      }
    };
    handleGetRooms();
  }, []);

  const handleOnChangeCalendar = useCallback(
    (newDate) => {
      const onChangeFunction =
        selectedSession === "MORNING"
          ? setMorningDays
          : selectedSession === "AFTERNOON"
          ? setAfternoonDays
          : selectedSession === "EVENING"
          ? setEveningDays
          : setNightDays;

      onChangeFunction((prev) => {
        if (prev.includes(newDate.format("YYYY/MM/DD")))
          return prev.filter(
            (prevDate) => prevDate !== newDate.format("YYYY/MM/DD")
          );
        else return [...prev, newDate.format("YYYY/MM/DD")];
      });
    },
    [selectedSession]
  );
  const handleMonthChange = useCallback((month) => {
    setCurrentMonth(month);
  }, []);

  const handleCreateInpatientShift = async () => {
    const response = await createInpatientShiftSchedule(
      roomId,
      nurse.staffId,
      morningDays?.map((date) => dayjs(date)),
      afternoonDays?.map((date) => dayjs(date)),
      eveningDays?.map((date) => dayjs(date)),
      nightDays?.map((date) => dayjs(date))
    );
    if (response.success) {
      enqueueSnackbar("Tạo ca trực thành công", {
        variant: "success",
      });
      setMorningDays([]);
      setAfternoonDays([]);
      setEveningDays([]);
      setNightDays([]);
      setSelectedSession("MORNING");
      setRoomId("");
      onClose();
    } else {
      enqueueSnackbar("Tạo ca trực thất bại", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const hanleGetInpatientShift = async () => {
      if (roomId === "") return;
      const response = await getInpatientShift(
        roomId,
        nurse?.staffId,
        currentMonth.get("month") + 1,
        currentMonth.get("year")
      );
      if (response.success) {
        const invalidDates = response.data.data;
        setInvalidDate({
          mornings: invalidDates.morning?.map((date) =>
            dayjs(date).format("YYYY/MM/DD")
          ),
          afternoons: invalidDates.afternoon?.map((date) =>
            dayjs(date).format("YYYY/MM/DD")
          ),
          evenings: invalidDates.evening?.map((date) =>
            dayjs(date).format("YYYY/MM/DD")
          ),
          nights: invalidDates.night?.map((date) =>
            dayjs(date).format("YYYY/MM/DD")
          ),
        });
      }
    };

    hanleGetInpatientShift();
  }, [currentMonth, roomId, nurse?.staffId]);

  return (
    <Modal open={open} onClose={onClose}>
      <Stack direction={"row"} sx={style}>
        <CardMedia
          component="img"
          alt="Random Image"
          image={nurse?.avatar}
          sx={{ width: "40%", height: "auto" }}
        />
        <Stack
          direction={"column"}
          justifyContent={"flex-start"}
          width={"60%"}
          sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            width={"100%"}
            justifyContent={"space-between"}
            style={{
              borderBottom: "1px solid #c8c8c8",
              paddingBottom: 6,
              paddingLeft: 2,
            }}
          >
            <Typography variant="h5" fontWeight={500} letterSpacing={1}>
              Quản lý ca trực
            </Typography>
            <IconButton
              onClick={onClose}
              style={{
                padding: "0px",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack paddingTop={3} spacing={3}>
            <TextField
              disabled
              value={nurse?.fullName}
              label="Điều dưỡng"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                style: {
                  padding: "26px 0px",
                },
              }}
            />

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Phòng trực
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  size="medium"
                  value={roomId}
                  label="Phòng trực"
                  onChange={handleChange}
                >
                  {roomSchedules?.map((room) => (
                    <MenuItem key={`room-${room.roomId}`} value={room.roomId}>
                      Phòng {room.roomName} ({room.description})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box width="100%">
              <Stack direction={"row"} spacing={2}>
                {shifts?.map((shift) => (
                  <Button
                    key={shift.value}
                    variant="contained"
                    onClick={() => setSelectedSession(shift.value)}
                    sx={{
                      flex: 1,
                      backgroundColor:
                        selectedSession === shift.value
                          ? appColors.primary
                          : appColors.secondary,
                      color:
                        selectedSession === shift.value
                          ? appColors.secondary
                          : "#000000",
                      "&:hover": {
                        backgroundColor: appColors.primary,
                        color: appColors.secondary,
                      },
                    }}
                  >
                    <Stack direction={"row"}>
                      {shift.icon} {shift.name}
                    </Stack>
                  </Button>
                ))}
              </Stack>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DateCalendar
                  value={valueDate}
                  minDate={minDate}
                  disabled={roomId === ""}
                  shouldDisableDate={disableInvalidMorningDate}
                  onChange={handleOnChangeCalendar}
                  onMonthChange={handleMonthChange}
                  slots={{
                    day: CustomDayItem,
                  }}
                  slotProps={{
                    day: {
                      highlight:
                        selectedSession === "MORNING"
                          ? morningDays
                          : selectedSession === "AFTERNOON"
                          ? afternoonDays
                          : selectedSession === "EVENING"
                          ? eveningDays
                          : nightDays,
                    },
                  }}
                  sx={{
                    display: true,
                    margin: "0 auto",
                    width: "100%",
                    "& .MuiDayCalendar-header, .MuiDayCalendar-weekContainer": {
                      justifyContent: "space-around",
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Stack>
          <Stack justifyContent={"flex-end"} width={"100%"} direction={"row"}>
            <Button
              variant="text"
              sx={{
                width: "30%",
                color: appColors.primary,
                marginBottom: 2,
              }}
              onClick={handleCreateInpatientShift}
            >
              Xác nhận
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
}

export default InpatientShiftCreateModal;
