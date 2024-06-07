import { HomeOutlined, LogoutOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Popover,
  Typography,
  styled,
} from "@mui/material";
import React, { memo } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { appColors } from "../../utils/appColorsUtils";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  margin: "10px 0 0 0",
  columnGap: "4px",
  alignItems: "center",
  cursor: "pointer",
});

const PopoverItem = memo(({ children, color, icon, onClick }) => {
  const Icon = icon;
  return (
    <StyledBox display={"flex"} onClick={onClick}>
      <Icon
        sx={{
          fontSize: "20px",
          color: color,
        }}
      />
      <Typography
        variant="body1"
        color={color}
        fontWeight={500}
        fontSize={"15px"}
      >
        {children}
      </Typography>
    </StyledBox>
  );
});

function CashierAvatar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { fullName, setToken } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexBasis: "10%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Avatar
        onClick={handleClick}
        aria-describedby={id}
        alt="Avatar"
        src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702377250/camel_ckn4py.png"
        sx={{
          width: 40,
          height: 40,
          cursor: "pointer",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.419)",
          padding: 0.5,
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            padding: "12px",
          }}
        >
          <Typography fontWeight={500}>Xin chào, {fullName}</Typography>
          <Divider />
          <PopoverItem
            color={appColors.primary}
            icon={HomeOutlined}
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </PopoverItem>
          <PopoverItem
            color={appColors.error}
            icon={LogoutOutlined}
            onClick={() => {
              setToken(null);
              handleClose();
              navigate("/");
            }}
          >
            Đăng xuất
          </PopoverItem>
        </Box>
      </Popover>
    </Box>
  );
}

export default CashierAvatar;
