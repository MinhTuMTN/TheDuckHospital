import styled from "@emotion/styled";
import { PhoneOutlined } from "@mui/icons-material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import PatientItemCounter from "../../components/Nurse/PatientItemCounter";
import { updatePatientProfile } from "../../services/nurse/PatientProfileServices";
import { enqueueSnackbar } from "notistack";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function InfoItem(props) {
  const { patientProfile } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [identityNumber, setIdentityNumber] = React.useState("");
  const navigate = useNavigate();

  const handleAccept = () => {
    if (!patientProfile.patientCode) {
      setOpenDialog(true);
      return;
    }

    navigate("/nurse-counter/choose-doctor-and-time", {
      state: { patientProfile },
    });
  };

  const handleUpdateIdentityNumber = async () => {
    const response = await updatePatientProfile(
      patientProfile.patientProfileId,
      identityNumber
    );
    if (response.success) {
      setOpenDialog(false);
      navigate("/nurse-counter/choose-doctor-and-time", {
        state: { patientProfile: response.data.data },
      });
    } else
      enqueueSnackbar("Đã xảy ra lỗi khi cập nhật CCCD/CMND", {
        variant: "error",
      });
  };

  return (
    <>
      <div class="card">
        <div class="content">
          <p class="heading">Thông tin bệnh nhân</p>
          <PatientItemCounter
            class="para"
            lableName={"Mã bệnh nhân:"}
            value={
              !patientProfile.patientCode ||
              patientProfile.patientCode.trim === ""
                ? "Đang cập nhật"
                : patientProfile.patientCode
            }
            icon={<BadgeOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />}
          />
          <PatientItemCounter
            class="para"
            lableName={"Họ và tên:"}
            value={patientProfile.fullName}
            icon={
              <PersonOutlineOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />
            }
          />
          <PatientItemCounter
            class="para"
            lableName={"Giới tính:"}
            value={patientProfile.gender === "MALE" ? "Nam" : "Nữ"}
            icon={<WcOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />}
          />
          <PatientItemCounter
            class="para"
            lableName={"Ngày sinh:"}
            value={dayjs(patientProfile.dateOfBirth).format("DD/MM/YYYY")}
            icon={<CakeOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />}
          />

          <PatientItemCounter
            class="para"
            lableName={"Số điện thoại:"}
            value={patientProfile.phoneNumber}
            icon={<PhoneOutlined sx={{ fontSize: "18px", mr: "5px" }} />}
          />

          <PatientItemCounter
            class="para"
            lableName={"CCCD/CMND:"}
            value={
              !patientProfile.identityNumber
                ? "Đang cập nhật"
                : patientProfile.identityNumber
            }
            icon={
              <FingerprintOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />
            }
          />
          <PatientItemCounter
            class="para"
            lableName={"Địa chỉ:"}
            value={`${patientProfile.district.districtName}, ${patientProfile.province.provinceName}`}
            icon={
              <LocationOnOutlinedIcon sx={{ fontSize: "18px", mr: "5px" }} />
            }
          />
          <Button class="btn" onClick={handleAccept}>
            Tiếp nhận
          </Button>
        </div>
      </div>

      <BootstrapDialog
        onClose={() => setOpenDialog(false)}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Cập nhật CCCD/CMND
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenDialog(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack direction={"column"}>
            <Typography variant="body1" gutterBottom>
              Vui lòng bổ sung CCCD/CMND cho bệnh nhân.
            </Typography>
            <TextField
              size="medium"
              id="outlined-basic"
              variant="outlined"
              placeholder="Nhập CCCD/CMND"
              autoComplete="off"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              helperText="Trong trường hợp bệnh nhân là trẻ em, có thể bỏ qua bước này."
              autoFocus
              sx={{
                width: "100%",
                flex: 3,
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleUpdateIdentityNumber}>
            Cập nhật
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default InfoItem;
