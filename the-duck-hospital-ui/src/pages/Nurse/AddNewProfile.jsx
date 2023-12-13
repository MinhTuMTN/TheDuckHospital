import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  FormControl,
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
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  minWidth: "400px",
  "& .MuiOutlinedInput-root": {
    padding: "10px 8px",
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
  const [gender, setGender] = React.useState("");
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
                flex: "1",
              }}
            />
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                sx={{
                  textAlign: "left",
                }}
              >
                <MenuItem value={""}>Chọn giới tính</MenuItem>
                <MenuItem value={0}>Nam</MenuItem>
                <MenuItem value={1}>Nữ</MenuItem>
              </Select>
            </FormControl>
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
