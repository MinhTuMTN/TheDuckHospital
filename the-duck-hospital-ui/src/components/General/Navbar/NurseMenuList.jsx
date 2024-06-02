import {
  CalendarMonthOutlined,
  LocalHospitalOutlined,
} from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { CardMedia, MenuList } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CustomMenuItem, CustomMenuItemLogOut } from "./PatientMenuList";
import { NurseContext } from "../../../auth/NurseProvider";
import { useAuth } from "../../../auth/AuthProvider";
import DialogTodayExamSchedule from "../../Nurse/DialogTodayExamSchedule";

function NurseMenuList(props) {
  const { onClose, setToken } = props;
  const [open, setOpen] = React.useState(false);
  const { updateRoomName } = useContext(NurseContext);
  const { nurseType } = useAuth();
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
        {nurseType === null && (
          <CustomMenuItem
            onClick={() => {
              updateRoomName("counter");
              navigate("/nurse-counter");
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
        )}

        {nurseType === "CLINICAL_NURSE" && (
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
        )}

        {nurseType === "INPATIENT_NURSE" && (
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
            Phòng khám nội trú
          </CustomMenuItem>
        )}

        <CustomMenuItem
          onClick={() => {
            navigate("/nurse-schedule");
            onClose();
          }}
        >
          <CalendarMonthOutlined
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          />
          Lịch trực
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

      <DialogTodayExamSchedule
        open={open}
        setOpen={setOpen}
        onClose={onClose}
      />
    </>
  );
}

export default NurseMenuList;
