import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
  Rating,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StaffDetail from "../../../components/Admin/StaffManagement/StaffDetail";
import { getStaffById } from "../../../services/admin/StaffServices";
import { useCallback, useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import {
  getDateHasDoctorSchedule,
  getSchedulesByStaffIdAndDate,
} from "../../../services/admin/DoctorScheduleServices";
import PatientChart from "../../../components/Admin/StaffManagement/PatientChart";
import ScheduleStaffTable from "../../../components/Admin/StaffManagement/ScheduleStaffTable";

const paperStyle = {
  marginTop: 4,
  borderRadius: "8px",
};

const StaffId = styled(Typography)(({ theme }) => ({
  backgroundColor: "#d6d7db",
  padding: "2px 5px",
  borderRadius: "15px",
  fontSize: "13px !important",
  alignItems: "center",
  fontWeight: "500",
  width: "fit-content",
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
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

function StaffDetailPage() {
  const navigate = useNavigate();
  const { staffId, departmentId } = useParams();
  const { state } = useLocation();
  const [staff, setStaff] = useState({});
  const [isDoctor, setIsDoctor] = useState(false);
  const [dateSelected, setDateSelected] = useState(dayjs());
  const [schedules, setSchedules] = useState([]);
  const [dateSchedule, setDateSchedule] = useState([]);

  const handleGetSchedules = useCallback(async () => {
    if (!isDoctor) return;
    let date = dateSelected.format("YYYY/MM/DD");
    const response = await getSchedulesByStaffIdAndDate({
      staffId: staffId,
      date: date,
    });
    if (response.success) {
      setSchedules(response.data.data);
    }
  }, [staffId, dateSelected, isDoctor]);

  useEffect(() => {
    if (staff?.role === "Bác sĩ") handleGetSchedules();
  }, [handleGetSchedules, dateSelected, staff]);

  const handleGetStaff = useCallback(async () => {
    const response = await getStaffById(staffId);
    if (response.success) {
      setStaff(response.data.data);
      if (response.data.data.role === "Bác sĩ") {
        setIsDoctor(true);
      }
    }
  }, [staffId]);

  useEffect(() => {
    handleGetStaff();
  }, [handleGetStaff]);

  useEffect(() => {
    const handleGetDateHasSchedule = async () => {
      const response = await getDateHasDoctorSchedule(staffId);
      if (response.success) {
        setDateSchedule(
          response.data.data.map((date) => dayjs(date).format("YYYY/MM/DD"))
        );
      }
    };

    handleGetDateHasSchedule();
  }, [staffId]);

  function disableDateNotHasSchedule(date) {
    return !dateSchedule?.includes(date.format("YYYY/MM/DD"));
  }

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
                state
                  ? navigate(`/admin/department-management/${departmentId}`)
                  : navigate("/admin/staff-management");
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
              {state
                ? `Thông tin khoa ${state?.departmentName}`
                : "Danh sách nhân viên"}
            </Typography>
          </Stack>
          <Grid container>
            <Grid item xs={12} md={12} lg={10}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <img
                  src={
                    staff?.avatar
                      ? staff.avatar
                      : "https://cdn.iconscout.com/icon/free/png-256/free-doctor-2349775-1955453.png"
                  }
                  alt={"staff-avatar"}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                />
                <Stack direction={"column"}>
                  <Typography
                    variant="h4"
                    fontWeight={600}
                    style={{
                      textTransform: "uppercase",
                      fontSize: ["1.5rem", "2rem"],
                    }}
                  >
                    {staff.fullName}
                  </Typography>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography
                      variant="body1"
                      fontWeight={450}
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      staff_id:
                    </Typography>
                    <StaffId>{staff.staffId}</StaffId>
                  </Stack>
                  {isDoctor && (
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <Typography
                        variant="body1"
                        fontWeight={450}
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        {"Đánh giá: "}
                      </Typography>
                      <Rating value={staff.rating} readOnly />
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        {"(" + staff.numberOfRating + ")"}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
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
                <StaffDetail staff={staff} handleGetStaff={handleGetStaff} />
              </Stack>
            </Grid>
          </Grid>

          {isDoctor && (
            <>
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
                      <BoxStyle>
                        <Stack direction={"row"}>
                          <TieuDe sx={{ mt: 1 }}>Lịch làm việc</TieuDe>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="en-gb"
                          >
                            <CustomDatePicker
                              label="Ngày làm việc"
                              value={dayjs(dateSelected)}
                              shouldDisableDate={disableDateNotHasSchedule}
                              onChange={(newDate) => {
                                setDateSelected(newDate);
                              }}
                            />
                          </LocalizationProvider>
                        </Stack>
                      </BoxStyle>
                      {schedules && <ScheduleStaffTable items={schedules} />}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>

              <Stack component={Paper} elevation={3} sx={paperStyle}>
                <Stack
                  sx={{
                    borderRadius: "10px",
                    paddingTop: 0,
                  }}
                >
                  <PatientChart staffId={staff.staffId} />
                </Stack>
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default StaffDetailPage;
