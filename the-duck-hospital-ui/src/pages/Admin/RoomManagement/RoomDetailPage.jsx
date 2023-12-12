import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomDetail from "../../../components/Admin/RoomManagement/RoomDetail";
import ScheduleTable from "../../../components/Admin/RoomManagement/ScheduleTable";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { getRoomById } from "../../../services/admin/RoomServices";
import { getSchedules } from "../../../services/admin/DoctorScheduleServices";

// const room = {
//   roomName: "TDH1-01",
//   departmentName: "Khoa nhi",
//   description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore veli",
//   schedule: {
//     morning: [
//       {
//         fullName: "Nguyễn Văn Doctor 1",
//         phoneNumber: "0123456789",
//         headOfDepartment: false,
//         role: "Bác sĩ",
//         time: "7h - 11h",
//       },
//       {
//         fullName: "Nguyễn Văn Doctor 2",
//         phoneNumber: "0123456788",
//         headOfDepartment: false,
//         role: "Bác sĩ",
//         time: "7h - 11h",
//       },
//     ],
//     afternoon: [
//       {
//         fullName: "Nguyễn Văn Doctor 1",
//         phoneNumber: "0123456789",
//         headOfDepartment: false,
//         role: "Bác sĩ",
//         time: "13h - 17h",
//       },
//       {
//         fullName: "Nguyễn Văn Doctor 2",
//         phoneNumber: "0123456788",
//         headOfDepartment: true,
//         role: "Bác sĩ",
//         time: "13h - 17h",
//       },
//       {
//         fullName: "Nguyễn Văn Doctor 3",
//         phoneNumber: "0123456788",
//         headOfDepartment: false,
//         role: "Bác sĩ",
//         time: "13h - 17h",
//       },
//     ],
//   },
//   deleted: false
// }


const BoxStyle1 = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

const TieuDe1 = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem !important",
  variant: "subtitle1",
  fontWeight: "720 !important",
  width: "12%",
}));

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "15%",
  "& input": {
    height: "55px",
  },
}));

function RoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [dateSelected, setDateSelected] = useState(dayjs());
  const [room, setRoom] = useState({});
  const [schedules, setSchedules] = useState([]);

  const handleGetRoom = useCallback(async () => {
    const response = await getRoomById(roomId);
    if (response.success) {
      setRoom(response.data.data);
    }
  }, [roomId]);

  useEffect(() => {
    handleGetRoom();
  }, [handleGetRoom]);

  const handleGetSchedules = useCallback(async () => {
    let date = dateSelected.format("YYYY/MM/DD")
    const response = await getSchedules(roomId, { date });
    if (response.success) {
      setSchedules(response.data.data);
    }
  }, [roomId, dateSelected]);

  useEffect(() => {
    handleGetSchedules();
  }, [handleGetSchedules, dateSelected]);

  useEffect(() => {
    if (schedules.length > 0) {
      const interval = setInterval(() => {
        handleGetSchedules();
      }, 10000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [handleGetSchedules, schedules]);

  return (
    <Box
      sx={{
        pt: 3,
        paddingBottom: 10,
        paddingX: 3,
        margin: "auto",
        width: "100%",
      }}
    >
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"column"}>
          <Stack
            direction={"row"}
            spacing={0}
            alignItems={"center"}
            marginBottom={3}
          >
            <IconButton
              aria-label="back"
              size="small"
              padding="0"
              margin="0"
              color="#111927"
              onClick={() => {
                navigate("/admin/room-management");
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography
              variant="body1"
              fontWeight={600}
              style={{
                fontSize: "14px",
                color: "#111927",
              }}
            >
              Danh sách phòng
            </Typography>
          </Stack>
          <Grid container>
            <Grid item xs={12} md={12} lg={10}>
              <Typography
                variant="h3"
                fontWeight={600}
                style={{
                  textTransform: "uppercase",
                  fontSize: ["1.5rem", "2rem"],
                }}
              >
                {"Phòng " + room.roomName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Stack
                component={Paper}
                elevation={3}
                sx={{
                  marginTop: 4,
                  borderRadius: "15px",
                }}
                spacing={"2px"}
              >
                <RoomDetail
                  room={room}
                  handleGetRoom={handleGetRoom}
                  handleGetSchedules={handleGetSchedules}
                />
              </Stack>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Stack
                component={Paper}
                elevation={3}
                sx={{
                  marginTop: 4,
                  borderRadius: "15px",
                }}
                spacing={"2px"}
              >
                <Stack
                  sx={{
                    borderRadius: "15px",
                    paddingTop: 1,
                  }}
                >
                  <BoxStyle1>
                    <Stack direction={"row"}>
                      <TieuDe1 sx={{ mt: 1 }}>Lịch làm việc</TieuDe1>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="en-gb"
                      >
                        <CustomDatePicker
                          label="Ngày làm việc"
                          value={dayjs(dateSelected)}
                          onChange={(newDate) => {
                            setDateSelected(newDate);
                          }}
                        />
                      </LocalizationProvider>
                    </Stack>
                  </BoxStyle1>
                  {schedules &&
                    <ScheduleTable items={schedules} />
                  }
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

export default RoomDetailPage;
