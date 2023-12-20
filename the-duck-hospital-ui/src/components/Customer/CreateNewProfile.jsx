import styled from "@emotion/styled";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
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
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllDistricts,
  getAllProvinces,
  getAllWards,
} from "../../services/common/AddressesServices";
import { getAllNations } from "../../services/common/NationServices";
import {
  createPatientProfile,
  updatePatientProfile,
} from "../../services/customer/PatientProfileServices";

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

const convertToTitleCase = (input) => {
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function CreateNewProfile(props) {
  const { profile } = props;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [fullName, setFullName] = React.useState(profile?.fullName || "");
  const [dateOfBirth, setDateOfBirth] = React.useState(
    dayjs(profile?.dateOfBirth) || ""
  );
  const [phoneNumber, setPhoneNumber] = React.useState(
    profile?.phoneNumber || ""
  );
  const [identityNumber, setIdentityNumber] = React.useState(
    profile?.identityNumber || ""
  );
  const [email, setEmail] = React.useState(profile?.email || "");
  const [streetName, setStreetName] = React.useState(profile?.streetName || "");
  const [gender, setGender] = React.useState(
    profile?.gender === "FEMALE" ? 1 : 0
  );

  // Nations
  const [nations, setNations] = useState([]);
  const [selectedNationId, setSelectedNationId] = useState(
    profile?.nation?.nationId || ""
  );
  const handleGetAllNations = useCallback(async () => {
    const response = await getAllNations();
    if (response.success) {
      setNations(response.data.data);
      if (profile) setSelectedNationId(profile?.nation?.nationId);
      else setSelectedNationId(response.data.data[0].nationId);
    }
  }, [profile]);

  // Provinces
  const [provinces, setProvinces] = React.useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = React.useState("");
  const handleGetAllProvinces = useCallback(async () => {
    const response = await getAllProvinces();
    if (response.success) {
      setProvinces(response.data.data);
      if (profile) setSelectedProvinceId(profile?.province?.provinceId);
      else setSelectedProvinceId(response.data.data[0]?.provinceId);
    }
  }, [profile]);

  // Districts
  const [districts, setDistricts] = React.useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = React.useState("");
  const handleGetAllDistricts = useCallback(async () => {
    if (!selectedProvinceId) return;

    const response = await getAllDistricts(selectedProvinceId);
    if (response.success) {
      setDistricts(response.data.data);
      if (profile) setSelectedDistrictId(profile?.district?.districtId);
      else setSelectedDistrictId(response.data.data[0]?.districtId);
    }
  }, [selectedProvinceId, profile]);

  // Wards
  const [wards, setWards] = useState([]);
  const [selectedWardId, setSelectedWardId] = React.useState("");
  const handleGetAllWards = useCallback(async () => {
    if (!selectedDistrictId) return;

    const response = await getAllWards(selectedDistrictId);
    if (response.success) {
      setWards(response.data.data);
      if (profile) setSelectedWardId(profile?.ward?.wardId);
      else setSelectedWardId(response.data.data[0]?.wardId);
    }
  }, [selectedDistrictId, profile]);

  useEffect(() => {
    handleGetAllNations();
    handleGetAllProvinces();
  }, [handleGetAllNations, handleGetAllProvinces]);

  useEffect(() => {
    handleGetAllDistricts();
  }, [handleGetAllDistricts]);

  useEffect(() => {
    handleGetAllWards();
  }, [handleGetAllWards]);

  const handleCreateUpdatePatientProfile = async () => {
    if (fullName.trim() === "") {
      enqueueSnackbar("Vui lòng nhập họ và tên", { variant: "error" });
      return;
    }

    if (phoneNumber.trim() === "") {
      enqueueSnackbar("Vui lòng nhập số điện thoại", { variant: "error" });
      return;
    }

    if (
      !profile &&
      (phoneNumber.trim().length !== 10 || !phoneNumber.startsWith("0"))
    ) {
      enqueueSnackbar("Số điện thoại không hợp lệ", { variant: "error" });
      return;
    }

    if (streetName.trim() === "") {
      enqueueSnackbar("Vui lòng nhập địa chỉ", { variant: "error" });
      return;
    }

    if (gender === "") {
      enqueueSnackbar("Vui lòng chọn giới tính", { variant: "error" });
      return;
    }

    if (dateOfBirth === "") {
      enqueueSnackbar("Vui lòng chọn ngày sinh", { variant: "error" });
      return;
    }

    if (dateOfBirth > dayjs()) {
      enqueueSnackbar("Ngày sinh không hợp lệ", { variant: "error" });
      return;
    }

    const data = {
      fullName,
      phoneNumber,
      dateOfBirth: dayjs(dateOfBirth).add(7, "hour").toISOString(),
      gender,
      wardId: selectedWardId,
      streetName,
      email,
      identityNumber,
      nationId: selectedNationId,
    };

    if (profile)
      enqueueSnackbar("Đang cập nhật hồ sơ bệnh nhân...", {
        variant: "info",
      });
    else enqueueSnackbar("Đang tạo hồ sơ bệnh nhân...", { variant: "info" });
    let response;
    if (profile) {
      response = await updatePatientProfile(profile.patientProfileId, data);
    } else {
      response = await createPatientProfile(data);
    }
    if (response.success) {
      let message = "Tạo hồ sơ bệnh nhân thành công";
      if (profile) message = "Cập nhật hồ sơ bệnh nhân thành công";

      enqueueSnackbar(message, { variant: "success" });
      window.scrollTo(0, 0);
      navigate("/user", { replace: true });
    } else if (response.statusCode === 409) {
      enqueueSnackbar("Số điện thoại không hợp lệ", { variant: "error" });
    } else {
      let message = "Tạo hồ sơ bệnh nhân thất bại";
      if (profile) message = "Cập nhật hồ sơ bệnh nhân thất bại";

      enqueueSnackbar(message, { variant: "error" });
    }
  };
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const validatePhoneNumber = () => {
    // Biểu thức chính quy để kiểm tra số điện thoại (định dạng: +12 345-6789)
    const phoneRegex = /^0\d{9}$/;

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError("Số điện thoại không hợp lệ");
    } else {
      setPhoneNumberError("");
    }
  };

  const isValidPhoneNumber = (input) => {
    const phoneNumberRegex = /^0[0-9]{0,9}$/; // Giả sử số điện thoại có tối đa 10 số
    return phoneNumberRegex.test(input);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} marginTop={1}>
        <Typography
          variant="body1"
          style={{
            color: "#12263f",
            fontWeight: "bold",
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
            autoComplete="off"
            disabled={profile?.patientCode}
            size="medium"
            variant="outlined"
            id="outlined-basic"
            fullWidth
            required
            placeholder="Nguyễn Gia Văn"
            value={fullName}
            onChange={(e) => setFullName(convertToTitleCase(e.target.value))}
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
            <CustomDatePicker
              disabled={profile?.patientCode}
              format="DD/MM/YYYY"
              value={dateOfBirth}
              onChange={(newValue) => setDateOfBirth(newValue)}
              defaultValue={dayjs()}
              shouldDisableDate={(day) => dayjs(day).isAfter(dayjs())}
            />
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
            autoComplete="off"
            size="medium"
            variant="outlined"
            id="outlined-basic"
            fullWidth
            required
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChange={(e) => {
              const inputValue = e.target.value;
              // Kiểm tra nếu giá trị nhập vào là số hợp lệ thì cập nhật state
              if (isValidPhoneNumber(inputValue) || inputValue === "") {
                setPhoneNumber(inputValue);
              }
            }}
            type="tel" // Sử dụng type="tel"
            onBlur={validatePhoneNumber}
            helperText={phoneNumberError}
            error={!!phoneNumberError}
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
            Giới tính
            <span style={{ color: "#e91919", fontWeight: "bold" }}>*</span>
          </CustomTypography>
          <FormControl fullWidth>
            <Select
              disabled={profile?.patientCode}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{
                textAlign: "left",
              }}
            >
              <MenuItem value={0}>Nam</MenuItem>
              <MenuItem value={1}>Nữ</MenuItem>
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
            Số CMND/CCCD
          </CustomTypography>
          <CustomTextField
            autoComplete="off"
            disabled={profile?.patientCode}
            size="medium"
            variant="outlined"
            id="outlined-basic"
            fullWidth
            required
            placeholder="Nhập số CCCD/CMND"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
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
            Dân tộc
          </CustomTypography>
          <FormControl fullWidth>
            <Select
              disabled={profile?.patientCode}
              labelId="demo-simple-select-label"
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
            Xã/Phường{" "}
            <span style={{ color: "#e91919", fontWeight: "bold" }}>*</span>
          </CustomTypography>
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
            autoComplete="off"
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
            autoComplete="off"
            size="medium"
            variant="outlined"
            id="outlined-basic"
            fullWidth
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleCreateUpdatePatientProfile}
        >
          <PersonAddAlt1Icon sx={{ marginRight: "5px" }} />
          {profile ? "Cập nhật hồ sơ" : "Tạo hồ sơ"}
        </CustomButton>
      </Grid>
    </Grid>
  );
}

export default CreateNewProfile;
