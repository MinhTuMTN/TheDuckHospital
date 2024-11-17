import styled from "@emotion/styled";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  CardMedia,
  IconButton,
  MenuItem,
  Stack,
  SvgIcon,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { usePopover } from "../../../hooks/use-popover";
import AccountPopover from "./AccountPopover";
import { useNavigate } from "react-router-dom";
import { checkInfo } from "../../../services/customer/AuthServices";
import { useAuth } from "../../../auth/AuthProvider";

const TOP_NAV_HEIGHT = 64;

const CustomButton = styled(Button)`
  padding: 10px 18px !important;
  color: #0b5394;
  border-radius: none;
  font-weight: bold;
  font-size: 14px;
  box-shadow: none;

  &:hover {
    background: linear-gradient(45deg, #4dc9e6 30%, #0974f1 90%);
    color: white;
    outline: none;
  }
`;
const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "white",
  display: "flex",
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: 100,
  boxShadow: "0 0 25px 0 rgba(0,0,0,.06)",
}));

const StyledLogo = styled(CardMedia)(({ theme }) => ({
  display: "flex",
  width: "190px",
  cover: "no-repeat",
  backgroundSize: "contain",
  height: theme.spacing(8),
  marginRight: "10px",
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.template.main,
  padding: "12px 20px !important",
  borderRadius: "none",
  fontWeight: "bold",
  fontSize: "18px",
}));

function NavBar(props) {
  const { onDrawerClick } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const { token, setFullName, fullName, setRole, setNurseType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetFullName = async () => {
      const response = await checkInfo();
      if (response.success) {
        setFullName(response.data.data.fullName);
        setRole(response.data.data.role);
        setNurseType(response.data.data.nurseType);
      }
    };
    handleGetFullName();
  }, [setFullName, setRole, setNurseType]);
  //const accountPopover = usePopover(); // Sử dụng usePopover để lấy ra giá trị của popover.
  return (
    <Wrapper>
      <Stack
        className="header-main"
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
        style={{
          width: "100%",
          minHeight: TOP_NAV_HEIGHT, // Đặt chiều cao tối thiểu cho phần header
        }}
      >
        {!lgUp && (
          <>
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingX: 2,
                paddingY: 1.5,
              }}
            >
              <StyledLogo
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
                image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701511186/Medical-removebg-preview_v5hwdt.png"
              />
              <IconButton onClick={() => onDrawerClick(true)}>
                <SvgIcon fontSize="medium">
                  <MenuIcon />
                </SvgIcon>
              </IconButton>
            </Stack>
          </>
        )}

        {lgUp && (
          <Stack
            className="header-for-web"
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              paddingX: 5,
              paddingY: 1.5,
              maxWidth: "1240px",
              width: "100%",
            }}
          >
            <StyledLogo
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
              image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701511186/Medical-removebg-preview_v5hwdt.png"
            />

            <Toolbar
              component={Stack}
              direction={"row"}
              sx={{
                backgroundColor: "white",
                height: "40px",
              }}
            >
              <CustomMenuItem onClick={() => navigate("/")}>
                Trang chủ
              </CustomMenuItem>
              <CustomMenuItem onClick={() => navigate("introduce")}>
                Giới thiệu
              </CustomMenuItem>
              <CustomMenuItem>Quy trình</CustomMenuItem>
              <CustomMenuItem>Thắc mắc</CustomMenuItem>
              <CustomMenuItem onClick={() => navigate("support")}>
                Liên hệ
              </CustomMenuItem>
            </Toolbar>
            <Box>
              {!token || !fullName ? (
                <Button
                  id="btn-account"
                  variant="contained"
                  sx={{
                    padding: "10px 18px !important",
                    background:
                      "linear-gradient(45deg, #4dc9e6 30%, #0974f1 90%)",
                    color: "white",
                    borderRadius: "none",
                    fontWeight: "bold",
                    fontSize: "14px",
                    boxShadow: "none",
                  }}
                  onClick={() => navigate("/auth/login")}
                >
                  <LoginIcon sx={{ marginRight: "5px" }} />
                  Đăng nhập
                </Button>
              ) : (
                <CustomButton
                  variant="outlined"
                  onClick={accountPopover.handleOpen}
                  ref={accountPopover.anchorRef}
                >
                  <PersonIcon sx={{ marginRight: "5px" }} />
                  {fullName}
                </CustomButton>
              )}
            </Box>
            <AccountPopover
              anchorEl={accountPopover.anchorRef.current}
              open={accountPopover.open}
              onClose={accountPopover.handleClose}
            />
          </Stack>
        )}
      </Stack>
    </Wrapper>
  );
}

export default NavBar;
