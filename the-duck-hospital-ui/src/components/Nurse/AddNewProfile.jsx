import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import {
  getAllDistricts,
  getAllProvinces,
  getAllWards,
} from "../../services/common/AddressesServices";
import { getAllNations } from "../../services/common/NationServices";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "10px 9px",
  },
}));

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  "& input": {
    height: "55px",
  },
}));
function AddNewProfile(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [fullName, setFullName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(dayjs());
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [gender, setGender] = React.useState("-1");
  const [identityNumber, setIdentityNumber] = React.useState("");
  const [streetName, setStreetName] = React.useState("");
  // Nations
  const [nations, setNations] = useState([]);
  const [selectedNationId, setSelectedNationId] = useState("");
  const handleGetAllNations = useCallback(async () => {
    const response = await getAllNations();
    if (response.success) {
      setNations(response.data.data);
      setSelectedNationId(response.data.data[0]?.nationId);
    }
  }, []);

  // Provinces
  const [provinces, setProvinces] = React.useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = React.useState("");

  const handleGetAllProvinces = useCallback(async () => {
    const response = await getAllProvinces();

    if (response.success) {
      setProvinces(response.data.data);
      setSelectedProvinceId(response.data.data[0]?.provinceId);
    }
  }, []);

  useEffect(() => {
    handleGetAllProvinces();
    handleGetAllNations();
  }, [handleGetAllNations, handleGetAllProvinces]);

  //Districts
  const [districts, setDistricts] = React.useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = React.useState("");

  const handleGetAllDistricts = useCallback(async () => {
    if (!selectedProvinceId) return;

    const response = await getAllDistricts(selectedProvinceId);
    if (response.success) {
      setDistricts(response.data.data);
      setSelectedDistrictId(response.data.data[0]?.districtId);
    }
  }, [selectedProvinceId]);

  useEffect(() => {
    handleGetAllDistricts();
  }, [handleGetAllDistricts]);

  //Wards
  const [wards, setWards] = React.useState([]);
  const [selectedWardId, setSelectedWardId] = React.useState("");
  const handleGetAllWards = useCallback(async () => {
    if (!selectedDistrictId) return;

    const response = await getAllWards(selectedDistrictId);
    if (response.success) {
      setWards(response.data.data);
      setSelectedWardId(response.data.data[0]?.wardId);
    }
  }, [selectedDistrictId]);

  useEffect(() => {
    handleGetAllWards();
  }, [handleGetAllWards]);

  return (
    <>
      <button type="button" class="button" onClick={handleClickOpen}>
        <span class="button__text">Tạo hồ sơ</span>
        <span class="button__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke="currentColor"
            height="24"
            fill="none"
            class="svg"
          >
            <line y2="19" y1="5" x2="12" x1="12"></line>
            <line y2="12" y1="12" x2="19" x1="5"></line>
          </svg>
        </span>
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Tạo hồ sơ bệnh nhân
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          <Stack spacing={1} direction={"column"}>
            <CustomTextField
              size="medium"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              required
              label="Họ và tên"
              placeholder="Nguyễn Gia Văn"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Stack>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CustomDatePicker
              label="Ngày sinh"
              sx={{
                marginTop: "16px",
              }}
              format="DD/MM/YYYY"
              value={dateOfBirth}
              onChange={(newValue) => setDateOfBirth(newValue)}
              defaultValue={dayjs()}
            />
          </LocalizationProvider>
          <Stack
            spacing={1}
            direction={"row"}
            sx={{ marginTop: "16px", display: "flex" }}
          >
            <CustomTextField
              label="Số điện thoại"
              size="medium"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              required
              placeholder="Nhập số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{
                flex: 1,
              }}
            />
            <CustomTextField
              label="Nhập số CCCD/CMND"
              size="medium"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              required
              placeholder="Nhập số CCCD/CMND"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              sx={{
                flex: 1,
              }}
            />
          </Stack>
          <Stack
            spacing={1}
            direction={"row"}
            sx={{
              marginTop: "16px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Dân tộc</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Dân tộc"
                id="demo-simple-select"
                value={selectedNationId}
                onChange={(event) => setSelectedNationId(event.target.value)}
                sx={{
                  textAlign: "left",
                }}
              >
                {nations?.map((nation) => (
                  <MenuItem
                    value={nation.nationId}
                    key={`nation-${nation.nationId}`}
                  >
                    {nation.nationName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Select
                required
                size="medium"
                id="demo-simple-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                sx={{
                  textAlign: "left",
                }}
              >
                <MenuItem value={-1} disabled>
                  Chọn giới tính
                </MenuItem>
                <MenuItem value={0}>Nam</MenuItem>
                <MenuItem value={1}>Nữ</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack
            spacing={"16px"}
            direction={"column"}
            sx={{
              marginTop: "16px",
            }}
          >
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedProvinceId}
                onChange={(e) => setSelectedProvinceId(e.target.value)}
                sx={{
                  textAlign: "left",
                }}
              >
                {provinces?.map((province) => (
                  <MenuItem
                    key={`province-${province.provinceId}`}
                    value={province.provinceId}
                  >
                    {province.provinceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                sx={{
                  textAlign: "left",
                }}
              >
                {districts?.map((district) => (
                  <MenuItem
                    key={`district-${district.districtId}`}
                    value={district.districtId}
                  >
                    {district.districtName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedWardId}
                onChange={(e) => setSelectedWardId(e.target.value)}
                sx={{
                  textAlign: "left",
                }}
              >
                {wards?.map((ward) => (
                  <MenuItem key={`ward-${ward.wardId}`} value={ward.wardId}>
                    {ward.wardName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <CustomTextField
              size="medium"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              required
              placeholder="Nhập địa chỉ"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Tạo
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default AddNewProfile;
