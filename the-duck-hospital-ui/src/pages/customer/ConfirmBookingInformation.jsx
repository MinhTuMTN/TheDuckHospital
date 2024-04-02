import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ConfirmBookingTable from "../../components/Customer/ConfirmBookingTable";
import ConfirmPatientInfo from "../../components/Customer/ConfirmPatientInfo";
import { useLocation, useNavigate } from "react-router-dom";
import CustomLink from "../../components/General/CustomLink";

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 15px",
  toUpperCase: "none",
  fontSize: "14px !important",

  textTransform: "none",
}));

function ConfirmBookingInformation(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { schedules, profile } = useLocation().state;
  console.log("schedules", schedules);

  const breakcrumbs = [
    <CustomTextBreakcrumb key={1}>Trang chủ</CustomTextBreakcrumb>,
    <CustomLink to={"/choose-patient-profiles"} key={2}>
      <CustomTextBreakcrumb>Đăng ký khám bệnh</CustomTextBreakcrumb>
    </CustomLink>,
    <CustomTextBreakcrumb key={3}>...</CustomTextBreakcrumb>,
    <CustomTextBreakcrumb
      key={3}
      onClick={() => navigate(-1)}
      sx={{ cursor: "pointer" }}
    >
      Chọn ngày khám
    </CustomTextBreakcrumb>,
    <CustomTextBreakcrumb key={2}>Xác nhận thông tin</CustomTextBreakcrumb>,
  ];
  return (
    <Box
      sx={{
        paddingX: isLgUp ? 22 : 2,
        py: 4,
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#E8F2F7",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breakcrumbs}
      </Breadcrumbs>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          mt: 3,
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            paddingLeft: "0px",
            paddingRight: isMdUp ? "20px" : "0",
            textAlign: "left",
            justifyContent: "space-between",
          }}
        >
          <CustomButton
            variant="text"
            sx={{
              "&:hover": {
                backgroundColor: "	#ffffff",
              },
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon
              sx={{
                marginRight: "5px",
              }}
            />
            Quay lại
          </CustomButton>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            borderRadius: "8px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "0px !important",
          }}
        >
          <ConfirmBookingTable schedules={schedules} profile={profile} />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            borderRadius: "8px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "0px !important",
            marginTop: "25px",
          }}
        >
          <ConfirmPatientInfo profile={profile} />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "right",
            paddingRight: isMdUp ? "75px" : "0",
          }}
        >
          <Stack direction={"row"} spacing={1} justifyContent={"flex-end"}>
            <CustomButton
              variant="contained"
              sx={{
                display:
                  !schedules || schedules.length < 3 ? "inline-flex" : "none",
                width: "fit-content",
                backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
                color: "#fff", // Màu chữ
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(to right, #42a5f5, #6fccea)",
                },
              }}
              onClick={() =>
                navigate("/choose-doctor", {
                  state: {
                    profile,
                    schedules,
                  },
                })
              }
            >
              Chọn thêm chuyên khoa
            </CustomButton>
            <CustomButton
              variant="contained"
              sx={{
                width: isLgUp ? "10%" : "100px",
                backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
                color: "#fff", // Màu chữ
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(to right, #42a5f5, #6fccea)",
                },
              }}
              onClick={() => {
                navigate("/payment-orders", {
                  state: {
                    profile,
                    schedules,
                  },
                });
              }}
            >
              Xác nhận
            </CustomButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ConfirmBookingInformation;
