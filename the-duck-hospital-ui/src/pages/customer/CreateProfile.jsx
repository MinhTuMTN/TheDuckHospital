import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Grid,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import CustomTabPanel from "../../components/Customer/CustomTabPanel";
import CreateNewProfile from "../../components/Customer/CreateNewProfile";
import FindPatientCode from "../../components/Customer/FindProfile/FindPatientCode";
import { useLocation } from "react-router-dom";

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTab = styled(Tab)(({ theme }) => ({
  fontSize: "14px",
  textTransform: "none",
}));

function CreatProfile(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isSmDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const profile = useLocation().state?.profile;
  const breakcrumbs = [
    <CustomTextBreakcrumb key={1}>Trang chủ</CustomTextBreakcrumb>,
    <CustomTextBreakcrumb key={2}>
      {profile ? "Chỉnh sửa hồ sơ bệnh nhân" : "Tạo hồ sơ bệnh nhân"}
    </CustomTextBreakcrumb>,
  ];
  const gradientStyle = {
    fontWeight: "600",
    fontSize: isLgUp ? "2.2rem" : "1.8rem",
    background: `linear-gradient(180deg, #00a0ff, #8be8fd)`,
    WebkitBackgroundClip: "text",
    color: "transparent",
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          }}
        >
          <Typography variant="h5" style={gradientStyle}>
            {profile ? "Chỉnh Sửa Hồ Sơ Bệnh Nhân" : "Tạo Hồ Sơ Bệnh Nhân"}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            paddingLeft: isSmDown ? "16px" : "0px",
            justifyContent: "center",
            textAlign: "center",
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "800px",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: profile ? "none" : "block",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                  display: "flex",

                  "& .MuiTabs-flexContainer": {
                    justifyContent: "center",
                    textAlign: "center",
                    display: "flex",
                  },
                }}
              >
                <CustomTab label="Chưa từng khám" {...a11yProps(0)} />
                <CustomTab label="Đã từng khám" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <CreateNewProfile profile={profile} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <FindPatientCode />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreatProfile;
