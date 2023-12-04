import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ChooseProfileItem from "../../components/Customer/ChooseProfileItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { getAllPatientProfiles } from "../../services/customer/PatientProfileServices";
import { enqueueSnackbar } from "notistack";

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

function ChoosePatientProfiles(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isSmDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const breakcrumbs = [
    <CustomTextBreakcrumb key={1}>Trang chủ</CustomTextBreakcrumb>,
    <CustomTextBreakcrumb key={2}>Đăng ký khám bệnh</CustomTextBreakcrumb>,
    <CustomTextBreakcrumb key={3}>Chọn hồ sơ bệnh nhân</CustomTextBreakcrumb>,
  ];
  const gradientStyle = {
    fontWeight: "600",
    fontSize: isLgUp ? "2.2rem" : "1.8rem",
    background: `linear-gradient(45deg, #00a0ff, #00d0ff)`,
    WebkitBackgroundClip: "text",
    color: "transparent",
  };

  const [patientProfiles, setPatientProfiles] = useState([]);

  const handleAllPatientProfiles = useCallback(async () => {
    const response = await getAllPatientProfiles();
    if (response.success) setPatientProfiles(response.data.data);
    else
      enqueueSnackbar("Đã xảy ra lỗi khi lấy danh sách hồ sơ bệnh nhân", {
        variant: "error",
      });
  }, []);

  useEffect(() => {
    handleAllPatientProfiles();
  }, [handleAllPatientProfiles]);

  return (
    <Box
      sx={{
        paddingX: isLgUp ? 22 : 2,
        py: 3,
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
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid
          item
          container
          xs={12}
          style={{
            paddingLeft: "0px",
            paddingRight: isMdUp ? "20px" : "0",
            textAlign: "left",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={6}>
            <CustomButton
              variant="text"
              sx={{
                "&:hover": {
                  backgroundColor: "	#ffffff",
                },
              }}
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
            xs={6}
            style={{
              textAlign: "right",
            }}
          >
            <CustomButton
              variant="contained"
              sx={{
                backgroundColor: "	#dbf1fb",
                color: "	#3fb8f1",
                "&:hover": {
                  backgroundColor: "	#dbf1fb",
                },
                textAlign: "right",
              }}
            >
              <PersonAddAlt1Icon />
              Thêm hồ sơ
            </CustomButton>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            paddingLeft: "0px",
          }}
        >
          <Typography variant="h5" style={gradientStyle}>
            Chọn Hồ Sơ Bệnh Nhân
          </Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          item
          xs={12}
          style={{
            paddingLeft: isSmDown ? "16px" : "0px",
          }}
        >
          {patientProfiles.map((profile) => (
            <Grid
              key={profile.patientProfileId}
              item
              xs={12}
              md={5.5}
              sx={{
                margin: "auto",
                borderRadius: "15px",
              }}
            >
              <Box
                className="choose-profile-item"
                component={Paper}
                elevation={3}
                style={{
                  borderRadius: "15px",
                  width: "100%",
                }}
              >
                <ChooseProfileItem
                  profile={profile}
                  onReload={handleAllPatientProfiles}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChoosePatientProfiles;
