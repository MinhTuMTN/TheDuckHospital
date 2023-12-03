import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import dayjs from "dayjs";
import React from "react";

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "400 !important",
  fontSize: "16px",
}));
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "11px 8px",
  },
}));

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  "& input": {
    height: "55px",
  },
}));
const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 15px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",
}));

function CreateNewProfile(props) {
  //const isSmDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [gender, setGender] = React.useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const [ethnic, setEthnic] = React.useState("0");

  const handleChangeEthnic = (event) => {
    setEthnic(event.target.value);
  };

  const [province, setProvince] = React.useState("");

  const handleChangeProvince = (event) => {
    setProvince(event.target.value);
  };

  const [district, setDistrict] = React.useState("");

  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
  };

  const [ward, setWard] = React.useState("");

  const handleChangeWard = (event) => {
    setWard(event.target.value);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          style={{
            color: "#12263f",
            fontWeight: "700 !important",
            fontSize: "1rem",
            textTransform: "uppercase",
          }}
        >
          Nhập thông tin bệnh nhân
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            border: "1px solid #b8daff",
            backgroundColor: "#e3f2fd",
            paddingX: "20px",
            paddingY: "12px",
          }}
        >
          <CustomTypography
            variant="body1"
            style={{
              color: "#004085",
              textAlign: "justify",
            }}
          >
            Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất.
            Trong trường hợp cung cấp sai thông tin bệnh nhân & điện thoại, việc
            xác nhận cuộc hẹn sẽ không hiệu lực trước khi đặt khám.
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <FormHelperText error>(*) Thông tin bắt buộc</FormHelperText>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={0.7} direction={"column"}>
          <CustomTypography
            variant="body1"
            style={{
              color: "#12263f",
              textAlign: "left",
            }}
          >
            Họ và tên{" "}
            <span style={{ color: "#e91919", fontWeight: "bold" }}>*</span>
          </CustomTypography>
          <CustomTextField
            size="medium"
            variant="outlined"
            id="outlined-basic"
            fullWidth
            required
            placeholder="Nguyễn Gia Văn"
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={0.7} direction={"column"}>
          <CustomTypography
            variant="body1"
            style={{
              color: "#12263f",
              textAlign: "left",
            }}
          >
            Ngày sinh{" "}
            <span style={{ color: "#e91919", fontWeight: "bold" }}>*</span>
          </CustomTypography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CustomDatePicker defaultValue={dayjs("2022-04-17")} />
          </LocalizationProvider>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={0.7} direction={"column"}>
          <CustomTypography
            variant="body1"
            style={{
              color: "#12263f",
              textAlign: "left",
            }}
          >
            Số điện thoại{" "}
            <span style={{ color: "#e91919", fontWeight: "bold" }}>*</span>
          </CustomTypography>
          <CustomTextField
            size="medium"
            variant="outlined"
            id="outlined-basic"
            fullWidth
            required
            placeholder="Nhập số điện thoại"
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={0.7} direction={"column"}>
          <CustomTypography
            variant="body1"
            style={{
              color: "#12263f",
              textAlign: "left",
            }}
          >
            Giới tính{" "}
            <span style={{ color: "#e91919", fontWeight: "bold" }}>*</span>
          </CustomTypography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              onChange={handleChange}
              sx={{
                textAlign: "left",
              }}
            >
              <MenuItem value={0}>Nữ</MenuItem>
              <MenuItem value={1}>Nam</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={0.7} direction={"column"}>
          <CustomTypography
            variant="body1"
            style={{
              color: "#12263f",
              textAlign: "left",
            }}
          >
            Số CMND/CCCD{" "}
          </CustomTypography>
          <CustomTextField
            size="medium"
            variant="outlined"
            id="outlined-basic"
            fullWidth
            required
            placeholder="Nhập số CCCD/CMND"
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={0.7} direction={"column"}>
          <CustomTypography
            variant="body1"
            style={{
              color: "#12263f",
              textAlign: "left",
            }}
          >
            Dân tộc{" "}
          </CustomTypography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ethnic}
              onChange={handleChangeEthnic}
              sx={{
                textAlign: "left",
              }}
            >
              <MenuItem value={0}>Kinh</MenuItem>
              <MenuItem value={1}>Tày</MenuItem>
              <MenuItem value={2}>Thái</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={0.7} direction={"column"}>
          <CustomTypography
            variant="body1"
            style={{
              color: "#12263f",
              textAlign: "left",
            }}
          >
            Tỉnh/Thành{" "}
            <span style={{ color: "#e91919", fontWeight: "bold" }}>*</span>
          </CustomTypography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={province}
              onChange={handleChangeProvince}
              sx={{
                textAlign: "left",
              }}
            >
              <MenuItem value={0}>Tp Hồ Chí Minh</MenuItem>
              <MenuItem value={1}>Hà Nội</MenuItem>
              <MenuItem value={2}>Lâm Đồng</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={0.7} direction={"column"}>
          <CustomTypography
            variant="body1"
            style={{
              color: "#12263f",
              textAlign: "left",
            }}
          >
            Quận/Huyện{" "}
            <span style={{ color: "#e91919", fontWeight: "bold" }}>*</span>
          </CustomTypography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={district}
              onChange={handleChangeDistrict}
              sx={{
                textAlign: "left",
              }}
            >
              <MenuItem value={0}>Tp Đà Lạt</MenuItem>
              <MenuItem value={1}>Tp Bảo Lộc</MenuItem>
              <MenuItem value={2}>Lộc Châu</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={0.7} direction={"column"}>
          <CustomTypography
            variant="body1"
            style={{
              color: "#12263f",
              textAlign: "left",
            }}
          >
            Tỉnh/Thành{" "}
            <span style={{ color: "#e91919", fontWeight: "bold" }}>*</span>
          </CustomTypography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ward}
              onChange={handleChangeWard}
              sx={{
                textAlign: "left",
              }}
            >
              <MenuItem value={0}>Phường 1</MenuItem>
              <MenuItem value={1}>Phường 2</MenuItem>
              <MenuItem value={2}>Phường B'Lao</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={0.7} direction={"column"}>
          <CustomTypography
            variant="body1"
            style={{
              color: "#12263f",
              textAlign: "left",
            }}
          >
            Địa chỉ{" "}
            <span style={{ color: "#e91919", fontWeight: "bold" }}>*</span>
          </CustomTypography>
          <CustomTextField
            size="medium"
            variant="outlined"
            id="outlined-basic"
            fullWidth
            required
            placeholder="Nhập địa chỉ"
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack spacing={0.7} direction={"column"}>
          <CustomTypography
            variant="body1"
            style={{
              color: "#12263f",
              textAlign: "left",
            }}
          >
            Email
          </CustomTypography>
          <CustomTextField
            size="medium"
            variant="outlined"
            id="outlined-basic"
            fullWidth
            required
            placeholder="Email"
          />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          marginTop: "16px",
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        <CustomButton
          sx={{
            backgroundColor: "	#41b6ed",
            color: "	#ffffff",
            "&:hover": {
              backgroundColor: "	#2c98cae9",
            },
            textAlign: "right",
          }}
          variant="contained"
        >
          <PersonAddAlt1Icon sx={{ marginRight: "5px" }} />
          Tạo hồ sơ
        </CustomButton>
      </Grid>
    </Grid>
  );
}

export default CreateNewProfile;
