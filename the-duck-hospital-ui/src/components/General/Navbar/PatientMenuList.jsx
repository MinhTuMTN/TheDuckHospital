import styled from "@emotion/styled";
import { BookmarkBorderOutlined } from "@mui/icons-material";
import { MenuItem, MenuList } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

export const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "500",
  alignItems: "center",
  ":hover": {
    color: "#0974f1",
    backgroundColor: "#ddf6fe8d",
  },
}));

export const CustomMenuItemLogOut = styled(MenuItem)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "500",
  alignItems: "center",
  ":hover": {
    backgroundColor: "#ddf6fe8d",
  },
}));

function PatientMenuList(props) {
  const { onClose, setToken } = props;
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
          navigate("/choose-patient-profiles");
          onClose();
        }}
      >
        <BookmarkBorderOutlined
          fontSize="small"
          sx={{
            marginRight: "8px",
          }}
        />
        Đặt khám ngay
      </CustomMenuItem>
      <CustomMenuItem
        onClick={() => {
          navigate("/user");
          onClose();
        }}
      >
        <InfoOutlinedIcon
          fontSize="small"
          sx={{
            marginRight: "8px",
          }}
        />
        Hồ sơ bệnh nhân
      </CustomMenuItem>
      <CustomMenuItem
        onClick={() => {
          navigate("/user/medical-bills");
          onClose();
        }}
      >
        <NoteAddOutlinedIcon
          fontSize="small"
          sx={{
            marginRight: "8px",
          }}
        />
        Phiếu khám bệnh
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
  );
}

export default PatientMenuList;
