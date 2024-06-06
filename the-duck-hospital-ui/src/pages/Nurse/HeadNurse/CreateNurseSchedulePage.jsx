import {
  Box,
  Breadcrumbs,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { appColors } from "../../../utils/appColorsUtils";
import ShiftCreationTabComponent from "../../../components/Nurse/Schedule/ShiftCreationTabComponent";

const Layout = styled(Grid)(({ theme }) => ({
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 15,
  paddingBottom: 25,
  flex: 1,
  backgroundColor: appColors.backgroundColorMain,
  height: "100%",
  [theme.breakpoints.up("lg")]: {},
}));

function CustomTabPanel(props) {
  const { children } = props;

  return (
    <div role="tabpanel">
      <Box sx={{ pt: 4, pb: 0 }}>
        <Box>{children}</Box>
      </Box>
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function CreateNurseSchedulePage() {
  const [value, setValue] = React.useState("INPATIENT_NURSE");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href=">"
      onClick={() => navigate("/")}
      style={{
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Trang chủ
    </Link>,
    <Typography
      key="2"
      color={"#5a5a5a"}
      style={{
        fontWeight: "560",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Tạo ca trực
    </Typography>,
  ];

  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: appColors.backgroundColorMain,
        display: "flex",
      }}
    >
      <Layout container flex={1}>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={600} letterSpacing={1}>
            Tạo ca trực
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid
          item
          xs={12}
          marginTop={3}
          style={{
            borderRadius: 10,
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
            backgroundColor: "#ffffff",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor={"secondary"}
              indicatorColor={"secondary"}
              sx={{
                ".css-1a4cg4j-MuiButtonBase-root-MuiTab-root.Mui-selected ": {
                  color: appColors.lightBlue,
                  fontWeight: "550",
                },
                ".MuiTabs-indicator": {
                  backgroundColor: appColors.lightBlue,
                },
              }}
            >
              <Tab
                label="Nội trú"
                style={{
                  width: "200px",
                }}
                value={"INPATIENT_NURSE"}
              />
              <Tab
                label="Phòng khám"
                style={{
                  width: "200px",
                }}
                value={"CLINICAL_NURSE"}
              />
            </Tabs>
          </Box>

          {value === "INPATIENT_NURSE" && (
            <CustomTabPanel index={0} value={0}>
              <ShiftCreationTabComponent nurseType={"INPATIENT_NURSE"} />
            </CustomTabPanel>
          )}
          {value === "CLINICAL_NURSE" && (
            <CustomTabPanel index={1} value={1}>
              <ShiftCreationTabComponent nurseType={"CLINICAL_NURSE"} />
            </CustomTabPanel>
          )}
        </Grid>
      </Layout>
    </Box>
  );
}

export default CreateNurseSchedulePage;
