import styled from "@emotion/styled";
import {
  BookmarkBorderOutlined,
  CalendarMonthOutlined,
  Close,
  LocalHospitalOutlined,
  LocalPharmacyOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  Stack,
  SvgIcon,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthProvider";
import DialogSearchRoom from "../../Nurse/DialogSearchRoom";
import { getTodaySchedule } from "../../../services/doctor/DoctorScheduleServices";
import { DoctorScheduleItem } from "./DoctorMenuList";

const userMainItems = [
  {
    display: "Đặt khám ngay",
    icon: <BookmarkBorderOutlined />,
    to: "/choose-patient-profiles",
  },
  {
    display: "Hồ sơ bệnh nhân",
    icon: <PersonOutlineIcon />,
    to: "/user",
  },
  {
    display: "Phiếu khám bệnh",
    icon: <PostAddIcon />,
    to: "/user/medical-bills",
  },
];

const doctorMainItems = [
  {
    display: "Khám chữa bệnh",
    icon: (
      <SvgIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M9 3L9 4L4 4C2.9069372 4 2 4.9069372 2 6L2 18C2 19.093063 2.9069372 20 4 20L20 20C21.093063 20 22 19.093063 22 18L22 6C22 4.9069372 21.093063 4 20 4L15 4L15 3L9 3 z M 4 6L20 6L20 18L4 18L4 6 z M 11 8L11 11L8 11L8 13L11 13L11 16L13 16L13 13L16 13L16 11L13 11L13 8L11 8 z"
            fill="#098CC4"
          />
        </svg>
      </SvgIcon>
    ),
    onClick: "doctor",
  },
  {
    display: "Lịch trực",
    icon: <CalendarMonthOutlined />,
    to: "/doctor/doctor-schedules",
  },
];

const headDoctorMainItems = [
  {
    display: "Tạo lịch trực",
    icon: (
      <SvgIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M11 0L11 3L13 3L13 0L11 0 z M 4.2226562 2.8085938L2.8085938 4.2226562L4.9296875 6.34375L6.34375 4.9296875L4.2226562 2.8085938 z M 19.777344 2.8085938L17.65625 4.9296875L19.070312 6.34375L21.191406 4.2226562L19.777344 2.8085938 z M 12 5C8.1458514 5 5 8.1458514 5 12C5 15.854149 8.1458514 19 12 19C15.854149 19 19 15.854149 19 12C19 8.1458514 15.854149 5 12 5 z M 12 7C14.773268 7 17 9.2267316 17 12C17 14.773268 14.773268 17 12 17C9.2267316 17 7 14.773268 7 12C7 9.2267316 9.2267316 7 12 7 z M 0 11L0 13L3 13L3 11L0 11 z M 21 11L21 13L24 13L24 11L21 11 z M 4.9296875 17.65625L2.8085938 19.777344L4.2226562 21.191406L6.34375 19.070312L4.9296875 17.65625 z M 19.070312 17.65625L17.65625 19.070312L19.777344 21.191406L21.191406 19.777344L19.070312 17.65625 z M 11 21L11 24L13 24L13 21L11 21 z"
            fill="#098CC4"
          />
        </svg>
      </SvgIcon>
    ),
    to: "/doctor/head-doctor/schedule-management/create",
  },
];

const nurseMainItems = [
  {
    display: "Quầy dịch vụ",
    icon: <LocalPharmacyOutlined />,
    to: "/nurse-counter",
  },
  {
    display: "Phòng khám",
    icon: <LocalHospitalOutlined />,
    onClick: "nurse",
  },
];

const basicItems = [
  {
    display: "Trang chủ",
    icon: <HomeOutlinedIcon />,
    to: "/",
  },

  {
    display: "Giới thiệu",
    icon: <InfoOutlinedIcon />,
    to: "/",
  },

  {
    display: "Quy trình",
    icon: <SettingsOutlinedIcon />,
    to: "/",
  },
  {
    display: "Thắc mắc",
    icon: <QuestionAnswerOutlinedIcon />,
    to: "/",
  },

  {
    display: "Liên hệ",
    icon: <HelpOutlineOutlinedIcon />,
    to: "/",
  },
];

const contactItems = [
  {
    display: "Hotline đặt khám: 0123456789",
    href: "tel:0123456789",
    icon: <HeadsetMicOutlinedIcon />,
  },
  {
    display: "Email: admin@theduckhospital.onmicrosoft.com",
    href: "mailto:admin@theduckhospital.onmicrosoft.com",
    icon: <AttachEmailOutlinedIcon />,
  },
];

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  padding: `0 0 ${theme.spacing(0.3)} ${theme.spacing(2.5)}`,
  transform: "scale(1.1)",
  color: "rgb(9, 140, 196)",
  fontSize: "1rem",
}));

const StyledLogo = styled(CardMedia)(({ theme }) => ({
  display: "flex",
  width: "150px",
  cover: "no-repeat",
  backgroundSize: "contain",
  height: theme.spacing(8),
  paddingX: "16px",
}));

function RightNavBar(props) {
  const { open, onOpenClose } = props;
  const { token, setToken, fullName, role } = useAuth();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [schedule, setSchedule] = React.useState([]);
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

  let mainItems = [];
  switch (role) {
    case "User":
      mainItems = userMainItems;
      break;
    case "Doctor":
      mainItems = doctorMainItems;
      break;
    case "HeadDoctor":
      mainItems = doctorMainItems.concat(headDoctorMainItems);
      break;
    case "Nurse":
      mainItems = nurseMainItems;
      break;
    default:
      break;
  }
  const [nurseDialogOpen, setNurseDialogOpen] = React.useState(false);
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          paddingY: 1,
          alignItems: "center",
          display: "flex",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
          width="100%"
          paddingX={2}
        >
          <StyledLogo image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701511186/Medical-removebg-preview_v5hwdt.png" />
          <IconButton
            sx={{
              border: "1px solid #484040",
              borderRadius: "50%", // để tạo góc bo tròn
              padding: "4px",
            }}
            onClick={() => onOpenClose(false)}
          >
            <SvgIcon fontSize="medium">
              <Close />
            </SvgIcon>
          </IconButton>
        </Stack>
      </Box>
      <Box
        sx={{
          borderTop: "1.5px solid #dcd2d2",
          borderBottom: "1.5px solid #e0e0e0",

          paddingX: 2,
          paddingY: 2,
        }}
      >
        {token ? (
          <Stack
            direction={"row"}
            spacing={0.3}
            sx={{
              paddingX: 2,
            }}
          >
            <Typography
              variant="body1"
              style={{
                color: "#5f5c5c",
              }}
            >
              Xin chào,
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: "#0b5394",
                fontWeight: "bold",
              }}
            >
              {` ${fullName}`}
            </Typography>
          </Stack>
        ) : (
          <Button
            variant="contained"
            sx={{
              width: "100%",
              height: "50px",
              color: "white",
              background: "#00a0ff",
            }}
            onClick={() => navigate("/auth/login")}
          >
            Đăng nhập
          </Button>
        )}
      </Box>

      {token && (
        <>
          <Box
            sx={{
              height: "8px !important",
              backgroundColor: "#f4f0f0",
              width: "100%",
            }}
          />
          <Stack
            sx={{
              width: "100%",
            }}
          >
            {mainItems.map((item, index) => (
              <Stack
                key={`item-${index}`}
                direction={"row"}
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  paddingX: 1,
                  paddingY: 1.5,
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (item.onClick) {
                    if (item.onClick === "nurse") {
                      setNurseDialogOpen(true);
                    } else if (item.onClick === "doctor") {
                      setOpenDialog(true);
                    }
                  } else {
                    navigate(item.to);
                    onOpenClose(false);
                  }
                }}
              >
                <CustomListItemIcon>{item.icon}</CustomListItemIcon>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "500! important",
                    color: "#2a2929",
                    "&:hover": {
                      color: "rgb(9, 140, 196)",
                    },
                  }}
                >
                  {item.display}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </>
      )}
      <Box
        sx={{
          height: "8px",
          background: "#f4f0f0",
        }}
      />
      <Stack
        sx={{
          width: "100%",
        }}
      >
        {basicItems.map((item, index) => (
          <Stack
            direction={"row"}
            sx={{
              borderBottom: "1px solid #e0e0e0",
              paddingX: 1,
              paddingY: 1.5,
              cursor: "pointer",
            }}
            key={`item-${index}`}
            onClick={() => {
              navigate(item.to);
              onOpenClose(false);
            }}
          >
            <CustomListItemIcon>{item.icon}</CustomListItemIcon>
            <Typography
              variant="body1"
              sx={{
                color: "#2a2929",
                fontWeight: "500! important",
                "&:hover": {
                  color: "rgb(9, 140, 196)",
                },
              }}
            >
              {item.display}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Box
        sx={{
          height: "8px",
          background: "#f4f0f0",
        }}
      />
      <Stack
        sx={{
          width: "100%",
        }}
      >
        {contactItems.map((item, index) => (
          <Stack
            direction={"row"}
            sx={{
              borderBottom: "1px solid #e0e0e0",
              paddingX: 1,
              paddingY: 1.5,
              cursor: "pointer",
            }}
            key={`item-${index}`}
          >
            <CustomListItemIcon
              sx={{
                color: "#e23939 !important",
              }}
            >
              {item.icon}
            </CustomListItemIcon>
            <Typography
              variant="body1"
              sx={{
                color: "#2a2929",
                fontWeight: "500! important",
                overflow: "hidden",
                "&:hover": {
                  color: "rgb(9, 140, 196)",
                },
              }}
            >
              {item.display}
            </Typography>
          </Stack>
        ))}

        {token && (
          <Stack
            direction={"row"}
            sx={{
              borderBottom: "1px solid #e0e0e0",
              paddingX: 1,
              paddingY: 1.5,
              cursor: "pointer",
            }}
            onClick={() => {
              setToken(null);
              onOpenClose(false);
              window.location.href = "/";
            }}
          >
            <CustomListItemIcon
              sx={{
                color: "#e23939 !important",
              }}
            >
              <LogoutOutlined />
            </CustomListItemIcon>
            <Typography
              variant="body1"
              sx={{
                color: "#e23939",
                fontWeight: "500! important",
                "&:hover": {
                  color: "#d62e2ec4",
                },
              }}
            >
              Đăng xuất
            </Typography>
          </Stack>
        )}
      </Stack>

      <DialogSearchRoom
        open={nurseDialogOpen}
        setOpen={setNurseDialogOpen}
        onClose={() => onOpenClose(false)}
      />

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
    </Box>
  );

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Lắng nghe sự kiện thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Đảm bảo hủy lắng nghe khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // [] để chỉ đăng ký một lần khi component mount
  return (
    <SwipeableDrawer
      anchor="right"
      onClose={() => onOpenClose(false)}
      onOpen={() => onOpenClose(true)}
      open={open}
      PaperProps={{
        sx: {
          background: "#ffff",
          color: "common.white",
          maxWidth: "500px", // 500px là chiều rộng tối đa của drawer
          width: `${windowWidth}px`,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </SwipeableDrawer>
  );
}

export default RightNavBar;
