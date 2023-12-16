import { CalendarMonthOutlined } from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { MenuList, SvgIcon } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthProvider";
import { CustomMenuItem, CustomMenuItemLogOut } from "./PatientMenuList";

function DoctorMenuList(props) {
  const { onClose, setToken } = props;
  const { role } = useAuth();
  const navigate = useNavigate();
  return (
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
          navigate("/doctor/doctor-bookings");
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
  );
}

export default DoctorMenuList;
