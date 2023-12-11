import styled from "@emotion/styled";
import {
  BookmarkBorderOutlined,
  Close,
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
  IconButton,
  ListItemIcon,
  Stack,
  SvgIcon,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const mainItems = [
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
  const { token, setToken, fullName } = useAuth();
  const navigate = useNavigate();

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
                  navigate(item.to);
                  onOpenClose(false);
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
