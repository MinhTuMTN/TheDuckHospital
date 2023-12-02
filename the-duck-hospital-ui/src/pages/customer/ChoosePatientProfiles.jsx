import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ChooseProfileItem from "../../components/Customer/ChooseProfileItem";

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));
function ChoosePatientProfiles(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
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
        sx={{
          mt: 3,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" style={gradientStyle}>
            Chọn Hồ Sơ Bệnh Nhân
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          spacing={2}
          sx={{
            marginTop: "20px",
          }}
        >
          <Grid
            item
            xs={12}
            md={5.5}
            sx={{
              margin: "auto",
            }}
          >
            <Box
              component={Paper}
              elevation={3}
              style={{
                borderRadius: "10px",
                width: "100%",
              }}
            >
              <ChooseProfileItem />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChoosePatientProfiles;
