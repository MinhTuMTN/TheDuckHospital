import { LocalHospitalOutlined } from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { CardMedia, MenuList } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DialogSearchRoom from "../../Nurse/DialogSearchRoom";
import { CustomMenuItem, CustomMenuItemLogOut } from "./PatientMenuList";

function NurseMenuList(props) {
  const { onClose, setToken } = props;
  const [open, setOpen] = React.useState(false);
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
            navigate("/nurse/counter");
            onClose();
          }}
        >
          <CardMedia
            src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702289485/reception_dufvjx.png"
            component="img"
            sx={{
              width: "20px",
              height: "20px",
              marginRight: "8px",
            }}
          />
          Quầy dịch vụ
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            setOpen(true);
          }}
        >
          <LocalHospitalOutlined
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          />
          Phòng khám
        </CustomMenuItem>

        <CustomMenuItemLogOut
          sx={{
            color: "red",
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

      <DialogSearchRoom open={open} setOpen={setOpen} onClose={onClose} />
    </>
  );
}

export default NurseMenuList;
