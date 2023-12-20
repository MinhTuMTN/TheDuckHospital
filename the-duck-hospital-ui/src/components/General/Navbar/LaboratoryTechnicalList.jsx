import { BiotechOutlined } from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { MenuList } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomMenuItem, CustomMenuItemLogOut } from "./PatientMenuList";

function LaboratoryTechnicalList(props) {
  const { onClose, setToken } = props;
  const navigate = useNavigate();

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
            navigate("/doctor/doctor-test");
            onClose();
          }}
        >
          <BiotechOutlined
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          />
          Xét nghiệm
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
    </>
  );
}

export default LaboratoryTechnicalList;
