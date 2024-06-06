import { AccountBalanceOutlined, LogoutOutlined } from "@mui/icons-material";
import { MenuList } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomMenuItem, CustomMenuItemLogOut } from "./PatientMenuList";

function CashierMenuList(props) {
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
            navigate("/cashier");
            onClose();
          }}
        >
          <AccountBalanceOutlined
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          />
          Quầy thu ngân
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
          <LogoutOutlined
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

export default CashierMenuList;
