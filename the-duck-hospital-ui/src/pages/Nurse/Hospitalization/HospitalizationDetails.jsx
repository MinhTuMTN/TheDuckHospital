import Dns from "@mui/icons-material/Dns";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import {
  Box,
  Breadcrumbs,
  Grid,
  Link,
  Typography,
  styled
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdmissionDetailsByDate from "../../../components/Nurse/Hospitalize/AdmissionDetailsByDate";
import PatientInfoTab from "../../../components/Nurse/Hospitalize/PatientInfoTab";
import { appColors } from "../../../utils/appColorsUtils";
import InpatientMedicalTest from "../../../components/Nurse/Hospitalize/InpatientMedicalTest";

const data = [
  { icon: <FolderSharedIcon />, label: "Hồ sơ bệnh án" },
  { icon: <Dns />, label: "Xét nghiệm" },
  { icon: <ExitToAppIcon />, label: "Xuất viện" },
];

const StyledGrid = styled(Grid)(({ theme }) => ({
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 15,
  paddingBottom: 25,
  flex: 1,
  backgroundColor: appColors.backgroundColorMain,
  width: "100%",
  [theme.breakpoints.up("lg")]: {},
}));

function HospitalizationDetails() {
  const [selectedTab, setSelectedTab] = React.useState(0);

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
      color={"inherit"}
      style={{
        fontWeight: "500",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Nội trú
    </Typography>,

    <Typography
      key="3"
      color={"#5a5a5a"}
      style={{
        fontWeight: "560",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Phòng A202
    </Typography>,
  ];
  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: appColors.backgroundColorMain,
      }}
    >
      <StyledGrid container>
        <PatientInfoTab
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          data={data}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={8.05}
          lg={9}
          marginTop={2}
          sx={{
            paddingX: "12px",
          }}
        >
          <Typography variant="h5" fontWeight={600} letterSpacing={1}>
            Phòng A202
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          {
            selectedTab === 0 ? (
              <AdmissionDetailsByDate />
            ) : (
              <InpatientMedicalTest />
            )
          }
        </Grid>
      </StyledGrid>
    </Box>
  );
}

export default HospitalizationDetails;
