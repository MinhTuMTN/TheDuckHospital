import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CustomLi from "../../components/Customer/BookingItemPage/CustomLi";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Search } from "@mui/icons-material";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const CustomTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "400 !important",
  fontSize: "16px",
}));
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "11px 8px",
  },
}));
const medicalBill = {
  queueNumber: 1,
  patientName: "Nguyễn Ngọc Tuyết Vi",
  patientDob: "12/11/2002",
  patientAddress: "210 Lê Văn Thịnh, phường Cát Lái, quận 2, tp HCM",
  patientId: "Đang cập nhật",
};
function ReceivingPatientsItem(props) {
  const [open, setOpen] = React.useState(false);
  const [searchString, setSearchString] = React.useState("....");
  const handlePopupClose = () => {
    setOpen(false);
  };
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "700",
          color: "#00b5f1",
          fontSize: "60px",
          paddingTop: "20px",
          paddingBottom: "20px",
          lineHeight: "1.3rem",
          paddingRight: 2,
        }}
      >
        {medicalBill.queueNumber < 10
          ? "0" + medicalBill.queueNumber
          : medicalBill.queueNumber}
      </Typography>
      <Stack
        direction={"column"}
        sx={{
          width: "100%",
        }}
      >
        <ul
          style={{
            width: "100%",
            borderLeft: "1px solid #00b5f1",
            paddingLeft: "20px",
          }}
        >
          <CustomLi lableName="Họ tên:" value="Nguyễn Ngọc Tuyết Vi" />
          <CustomLi lableName="Ngày sinh:" value="12/11/2002" />
          <CustomLi
            lableName="Địa chỉ:"
            value="210 Lê Văn Thịnh, phường Cát Lái, quận 2, tp HCM"
          />
          <CustomLi
            lableName="Mã bệnh nhân:"
            value="Đang cập nhật"
            color="red"
          />
          <li
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Button
              fullWidth
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                fontSize: "14px",
                backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
                color: "#fff", // Màu chữ
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(to right, #42a5f5, #6fccea)",
                },
              }}
              onClick={() => setOpen(true)}
            >
              Tiếp nhận
            </Button>
          </li>
        </ul>
      </Stack>
      {medicalBill.patientId === "Đang cập nhật" ? (
        <>
          <BootstrapDialog
            open={open}
            onClose={handlePopupClose}
            aria-labelledby="customized-dialog-title"
            maxWidth="xs"
          >
            <DialogTitle
              sx={{ m: 0, p: 2 }}
              id="customized-dialog-title"
              style={{
                display: "flex",
                alignItems: "center",
              }}
              component={"div"}
            >
              <HelpOutlineIcon
                sx={{
                  fontSize: "20px",
                }}
              />{" "}
              <Typography
                variant="h5"
                sx={{
                  marginLeft: "5px",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Tìm mã bệnh nhân
              </Typography>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handlePopupClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "text.secondary",
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <CustomTypography
                variant="body1"
                style={{
                  color: "#12263f",
                  textAlign: "left",
                  marginBottom: "8px",
                }}
              >
                * Tìm theo số CMND/CCCD
              </CustomTypography>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <CustomTextField
                  size="medium"
                  variant="outlined"
                  id="outlined-basic"
                  fullWidth
                  required
                  placeholder="Nhập số CCCD/CMND"
                  onChange={(e) => e.target.value}
                  sx={{
                    minWidth: "250px",
                    "& input": {
                      // Sửa cú pháp CSS cho InputBase-input
                      fontSize: "14px",
                      padding: "10px 8px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    ),
                    style: { fontSize: 14, padding: "10px 4px" },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    width: "100px",
                    padding: "8px 0",
                    fontSize: "14px",
                  }}
                >
                  Tìm
                </Button>
              </Stack>
              <Box sx={{ height: 1, mt: 1.5 }}>
                {searchString !== "" ? (
                  <>
                    <Typography>Mã bệnh nhân cần tìm là: </Typography>
                    <span style={{ color: "#f81f1f", fontWeight: "bold" }}>
                      BN2039183 - Nguyễn Ngọc Tuyết Vi
                    </span>
                  </>
                ) : (
                  <>
                    <Typography>
                      Không tìm thấy mã bệnh nhân tương ứng.
                    </Typography>
                    <Typography>
                      Nhấp vào nút{" "}
                      <span style={{ color: "#02b10d", fontWeight: "bold" }}>
                        "Tiếp nhận"
                      </span>{" "}
                      để tiếp nhận bệnh nhân.
                    </Typography>
                  </>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button autoFocus sx={{ color: "#5aafff" }}>
                Tiếp nhận
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </>
      ) : (
        <>
          <BootstrapDialog
            open={open}
            onClose={handlePopupClose}
            aria-labelledby="customized-dialog-title"
            maxWidth="xs"
          >
            <DialogTitle
              sx={{ m: 0, p: 2 }}
              id="customized-dialog-title"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <HelpOutlineIcon
                sx={{
                  fontSize: "20px",
                }}
              />{" "}
              <Typography
                variant="h5"
                sx={{
                  marginLeft: "5px",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Xác nhận
              </Typography>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handlePopupClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "text.secondary",
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom textAlign={"justify"}>
                Bạn có chắc chắn muốn tiếp nhận bệnh nhân có mã bệnh nhân{" "}
                <span
                  style={{
                    color: "#f81f1f",
                    fontWeight: "bold",
                  }}
                >
                  BN2039183
                </span>{" "}
                này không?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus sx={{ color: "#5aafff" }}>
                Tiếp nhận
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </>
      )}
    </Stack>
  );
}

export default ReceivingPatientsItem;
