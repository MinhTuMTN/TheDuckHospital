import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import React from "react";
import PatientItemCounter from "../../components/Nurse/PatientItemCounter";
import { Button } from "@mui/material";
function InfoItem(props) {
  return (
    <div class="card">
      <div class="content">
        <p class="heading">Thông tin bệnh nhân</p>
        <PatientItemCounter
          class="para"
          lableName={"Mã bệnh nhân:"}
          value={"Đang cập nhật"}
          icon={<BadgeOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />}
        />
        <PatientItemCounter
          class="para"
          lableName={"Họ và tên:"}
          value={"Nguyễn Ngọc Tuyết Vi"}
          icon={
            <PersonOutlineOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />
          }
        />
        <PatientItemCounter
          class="para"
          lableName={"Giới tính:"}
          value={"Nữ"}
          icon={<WcOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />}
        />
        <PatientItemCounter
          class="para"
          lableName={"Ngày sinh:"}
          value={"12/12/1999"}
          icon={<CakeOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />}
        />
        <PatientItemCounter
          class="para"
          lableName={"CCCD/CMND:"}
          value={"123456789"}
          icon={
            <FingerprintOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />
          }
        />
        <PatientItemCounter
          class="para"
          lableName={"Địa chỉ:"}
          value={"Thành phố Bảo Lộc, tỉnh Lâm Đồng"}
          icon={<LocationOnOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />}
        />
        <Button class="btn">Tiếp nhận</Button>
      </div>
    </div>
  );
}

export default InfoItem;
