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
import { CustomMenuItem, CustomMenuItemLogOut } from "./PatientMenuList";
import { getTodaySchedule } from "../../../services/doctor/DoctorScheduleServices";
import { DoctorContext } from "../../../auth/DoctorProvider";

export function DoctorScheduleItem(props) {
  const { schedule } = props;
  const { updateDoctorScheduleId } = useContext(DoctorContext);
  const navigate = useNavigate();
  const handleClick = () => {
    updateDoctorScheduleId(schedule.doctorScheduleId);
    navigate("/doctor/doctor-schedules");
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
        Buổi {schedule.scheduleType === "MORNING" ? "Sáng" : "Chiều"}
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
  const { role } = useAuth();
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
        {role === "HeadDoctor" && (
          <CustomMenuItem
            onClick={() => {
              navigate("/doctor/head-doctor/schedule-management/create");
              onClose();
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
                  d="M11 0L11 3L13 3L13 0L11 0 z M 4.2226562 2.8085938L2.8085938 4.2226562L4.9296875 6.34375L6.34375 4.9296875L4.2226562 2.8085938 z M 19.777344 2.8085938L17.65625 4.9296875L19.070312 6.34375L21.191406 4.2226562L19.777344 2.8085938 z M 12 5C8.1458514 5 5 8.1458514 5 12C5 15.854149 8.1458514 19 12 19C15.854149 19 19 15.854149 19 12C19 8.1458514 15.854149 5 12 5 z M 12 7C14.773268 7 17 9.2267316 17 12C17 14.773268 14.773268 17 12 17C9.2267316 17 7 14.773268 7 12C7 9.2267316 9.2267316 7 12 7 z M 0 11L0 13L3 13L3 11L0 11 z M 21 11L21 13L24 13L24 11L21 11 z M 4.9296875 17.65625L2.8085938 19.777344L4.2226562 21.191406L6.34375 19.070312L4.9296875 17.65625 z M 19.070312 17.65625L17.65625 19.070312L19.777344 21.191406L21.191406 19.777344L19.070312 17.65625 z M 11 21L11 24L13 24L13 21L11 21 z"
                  fill="#5B5B5B"
                />
              </svg>
            </SvgIcon>
            Tạo ca trực
          </CustomMenuItem>
        )}

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
