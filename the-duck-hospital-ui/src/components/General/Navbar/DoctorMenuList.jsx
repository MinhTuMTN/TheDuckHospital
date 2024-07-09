import {
  CalendarMonthOutlined,
  MedicalServicesOutlined,
  MeetingRoomOutlined,
  WbTwilightOutlined,
} from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  MenuList,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthProvider";
import { DoctorContext } from "../../../auth/DoctorProvider";
import { getTodaySchedule } from "../../../services/doctor/DoctorScheduleServices";
import { CustomMenuItem, CustomMenuItemLogOut } from "./PatientMenuList";

export function DoctorScheduleItem(props) {
  const { schedule } = props;
  const { updateDoctorScheduleId, updateRoomName, updateDepartmentName } =
    useContext(DoctorContext);
  const navigate = useNavigate();
  const handleClick = () => {
    updateDoctorScheduleId(schedule.doctorScheduleId);
    updateRoomName(schedule.roomName);
    updateDepartmentName(schedule.serviceName);
    navigate("/doctor/doctor-bookings");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        width: "50%",
        minWidth: "15rem",
        cursor: "pointer",
      }}
      component={Paper}
      variant="outlined"
      onClick={handleClick}
    >
      <Typography
        variant="body1"
        color={"normal2.main"}
        sx={{ fontWeight: "500", display: "flex", alignItems: "center" }}
      >
        <WbTwilightOutlined
          color={"normal1"}
          sx={{
            marginRight: 1,
          }}
        />
        Buổi {schedule.scheduleSession === "MORNING" ? "Sáng" : "Chiều"}
      </Typography>

      <Typography
        variant="body1"
        sx={{ fontWeight: "500", display: "flex", alignItems: "center" }}
      >
        <MedicalServicesOutlined
          color={"normal1"}
          sx={{
            marginRight: 1,
          }}
        />
        {schedule.serviceName}
      </Typography>

      <Typography
        variant="body1"
        color={"delete.main"}
        sx={{ fontWeight: "500", display: "flex", alignItems: "center" }}
      >
        <MeetingRoomOutlined
          color={"normal1"}
          sx={{
            marginRight: 1,
          }}
        />
        Phòng {schedule.roomName}
      </Typography>
    </Box>
  );
}

function DoctorMenuList(props) {
  const { onClose, setToken } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [schedule, setSchedule] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetTodaySchedule = async () => {
      setIsLoading(true);
      const response = await getTodaySchedule();
      if (response.success) setSchedule(response.data.data);
      setIsLoading(false);
    };

    if (!openDialog) return;

    handleGetTodaySchedule();
  }, [openDialog]);

  return (
    <>
      <MenuList
        disablePadding
        dense
        sx={{
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <CustomMenuItem
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          <SvgIcon
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                d="M9 3L9 4L4 4C2.9069372 4 2 4.9069372 2 6L2 18C2 19.093063 2.9069372 20 4 20L20 20C21.093063 20 22 19.093063 22 18L22 6C22 4.9069372 21.093063 4 20 4L15 4L15 3L9 3 z M 4 6L20 6L20 18L4 18L4 6 z M 11 8L11 11L8 11L8 13L11 13L11 16L13 16L13 13L16 13L16 11L13 11L13 8L11 8 z"
                fill="#5B5B5B"
              />
            </svg>
          </SvgIcon>
          Khám chữa bệnh
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            navigate("/doctor/doctor-schedules");
            onClose();
          }}
        >
          <CalendarMonthOutlined
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          />
          Lịch trực
        </CustomMenuItem>
        <CustomMenuItemLogOut
          sx={{
            color: "red !important",
          }}
          onClick={(e) => {
            setToken(null);
            onClose();
            window.location.href = "/";
          }}
        >
          <LogoutOutlinedIcon
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          />
          Đăng xuất
        </CustomMenuItemLogOut>
      </MenuList>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Chọn ca trực</DialogTitle>
        <Divider variant="middle" />
        <DialogContent>
          <Typography>
            Vui lòng chọn ca trực hôm nay để có thể tiếp tục
          </Typography>

          <Stack mt={1} direction={"row"} spacing={1}>
            {isLoading && <Typography>Đang tải...</Typography>}
            {!isLoading &&
              schedule.map((item, index) => (
                <DoctorScheduleItem
                  key={`schedule-doctor-today-${index}`}
                  schedule={item}
                />
              ))}

            {!isLoading && schedule.length === 0 && (
              <Typography>Không có ca trực nào</Typography>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DoctorMenuList;
