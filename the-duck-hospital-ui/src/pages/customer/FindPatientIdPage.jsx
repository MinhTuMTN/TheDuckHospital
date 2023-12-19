import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllProvinces } from "../../services/common/AddressesServices";

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "400 !important",
  fontSize: "16px",
}));
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "8px 6px",
  },
}));

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));
const CustomButton = styled(Button)(({ theme }) => ({
  padding: "8px 15px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",
  background: theme.palette.template.normal1,
  ":hover": {
    background: theme.palette.template.normal1,
  },
}));

const convertToTitleCase = (input) => {
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function FindPatientIdPage(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const profile = useLocation().state?.profile;
  const breakcrumbs = [
    <CustomTextBreakcrumb key={1}>Trang chủ</CustomTextBreakcrumb>,
    <CustomTextBreakcrumb key={2}>Tìm mã bệnh nhân</CustomTextBreakcrumb>,
  ];
  const gradientStyle = {
    fontWeight: "600",
    fontSize: isLgUp ? "2.2rem" : "1.8rem",
    background: `linear-gradient(180deg, #00a0ff, #8be8fd)`,
    WebkitBackgroundClip: "text",
    color: "transparent",
  };

  const [fullName, setFullName] = React.useState("");
  const [yearBirth, setYearBirth] = React.useState("");
  const [gender, setGender] = React.useState(0);

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

  useEffect(() => {
    handleGetAllProvinces();
  }, [handleGetAllProvinces]);
  return (
    <Box
      sx={{
        paddingX: isLgUp ? 22 : 2,
        py: 4,
        backgroundColor: "#E8F2F7",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breakcrumbs}
      </Breadcrumbs>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 3,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "auto",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            paddingLeft: "0px",
          }}
        >
          <Typography variant="h5" style={gradientStyle}>
            Tìm lại mã bệnh nhân
          </Typography>
        </Grid>

        <Grid
          item
          container
          spacing={2}
          sx={{
            maxWidth: "800px",
            justifyContent: "center",
          }}
        >
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
                disabled={profile?.patientCode}
                size="medium"
                variant="outlined"
                id="outlined-basic"
                fullWidth
                required
                placeholder="Nguyễn Gia Văn"
                value={fullName}
                onChange={(e) =>
                  setFullName(convertToTitleCase(e.target.value))
                }
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
                Năm sinh{" "}
                <span style={{ color: "#e91919", fontWeight: "bold" }}>*</span>
              </CustomTypography>
              <CustomTextField
                disabled={profile?.patientCode}
                size="medium"
                variant="outlined"
                fullWidth
                required
                maxLength={4}
                placeholder="Năm sinh"
                value={yearBirth}
                onChange={(e) => {
                  // Kiểm tra xem giá trị nhập vào có phải là số không
                  const input = e.target.value;
                  if (/^\d+$/.test(input) || input === "") {
                    // Nếu là số hoặc trống, và không quá 4 ký tự, cho phép cập nhật giá trị
                    if (input.length <= 4) {
                      setYearBirth(input);
                    }
                  }
                }}
                type="tel"
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
          <Grid item xs={12} marginTop={2}>
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
            marginTop={1}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="text"
              color="primary"
              sx={{
                width: "fit-content",
                padding: "8px 15px",
                toUpperCase: "none",
                fontSize: "14px !important",
                textTransform: "none",
                marginRight: "20px",
              }}
            >
              Quay lại
            </Button>

            <CustomButton
              variant="contained"
              color="primary"
              sx={{
                width: "fit-content",
                padding: "8px 15px",
                toUpperCase: "none",
                fontSize: "14px !important",
                textTransform: "none",
              }}
            >
              Tìm kiếm
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FindPatientIdPage;
