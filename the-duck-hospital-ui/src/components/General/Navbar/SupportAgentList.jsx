import { MenuList } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomMenuItem, CustomMenuItemLogOut } from "./PatientMenuList";
import { BiotechOutlined } from "@mui/icons-material";

function SupportAgentList(props) {
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
            navigate("/support-agent");
            onClose();
          }}
        >
          <BiotechOutlined
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          />
          Hỗ trợ khách hàng
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

export default SupportAgentList;
