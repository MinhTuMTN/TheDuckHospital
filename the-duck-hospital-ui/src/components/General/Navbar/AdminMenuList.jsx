import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  MenuList,
  SvgIcon,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomMenuItem, CustomMenuItemLogOut } from "./PatientMenuList";

function AdminMenuList(props) {
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
            navigate("/admin");
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
          Admin Dashboard
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

export default AdminMenuList;
