import Dns from "@mui/icons-material/Dns";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import {
  Box,
  Breadcrumbs,
  Grid,
  Link,
  Typography,
  styled,
} from "@mui/material";
import React, { createContext, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdmissionDetailsByDate from "../../../components/Nurse/Hospitalize/AdmissionDetailsByDate";
import PatientInfoTab from "../../../components/Nurse/Hospitalize/PatientInfoTab";
import { appColors } from "../../../utils/appColorsUtils";
import InpatientMedicalTest from "../../../components/Nurse/Hospitalize/InpatientMedicalTest";
import {
  getAllMedicalTestServices,
  getDoctorInDepartment,
  getGeneralInfoOfHospitalization,
} from "../../../services/nurse/HospitalizeServices";
import { enqueueSnackbar } from "notistack";
import HospitalDischarge from "../../../components/Nurse/Hospitalize/HospitalDischarge";
import AdmissionReceipt from "../../../components/Nurse/Hospitalize/AdmissionReceipt";
import PrescriptionHospitalDischarge from "../../../components/Nurse/Hospitalize/PrescriptionHospitalDischarge";

const data = [
  { icon: <FolderSharedIcon />, label: "Hồ sơ bệnh án", menu: [] },
  { icon: <Dns />, label: "Xét nghiệm", menu: [] },
  {
    icon: <ExitToAppIcon />,
    label: "Xuất viện",
    menu: [
      { id: 4, labelMenu: "Biên lai thanh toán" },
      { id: 6, labelMenu: "Toa thuốc ra viện" },
      { id: 5, labelMenu: "Phiếu xuất viện" },
    ],
  },
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

export const HospitalizationContext = createContext();

function HospitalizationDetails() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [generalInfo, setGeneralInfo] = React.useState({});
  const [medicalTestServices, setMedicalTestServices] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);
  const [onRefresh, setOnRefresh] = React.useState(() => {});
  const { hospitalizationId, roomId } = useParams();
  const roomName = useMemo(() => {
    try {
      const strArr = roomId.split("-");
      return strArr[1];
    } catch (error) {
      return "";
    }
  }, [roomId]);
  const navigate = useNavigate();
  const breadcrumbs = useMemo(() => {
    return [
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
        Phòng {roomName}
      </Typography>,
    ];
  }, [roomName, navigate]);

  useEffect(() => {
    const handleGetGeneralInfoOfHospitalization = async () => {
      const response = await getGeneralInfoOfHospitalization(hospitalizationId);
      if (response.success) setGeneralInfo(response.data.data);
      else
        enqueueSnackbar("Không thể lấy thông tin bệnh nhân", {
          variant: "error",
        });
    };
    const handleGetAllMedicalTests = async () => {
      const response = await getAllMedicalTestServices();
      if (response.success) setMedicalTestServices(response.data.data);
      else
        enqueueSnackbar("Không thể lấy thông tin xét nghiệm", {
          variant: "error",
        });
    };
    const handleGetAllDoctorsInDepartment = async () => {
      const response = await getDoctorInDepartment();
      if (response.success) setDoctors(response.data.data);
    };

    if (hospitalizationId) {
      handleGetGeneralInfoOfHospitalization();
      handleGetAllMedicalTests();
      handleGetAllDoctorsInDepartment();
    }
  }, [hospitalizationId]);

  return (
    <HospitalizationContext.Provider
      value={{ generalInfo, onRefresh, setOnRefresh, doctors }}
    >
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
            generalInfo={generalInfo}
          />
          <Grid
            item
            xs={12}
            md={8.8}
            lg={9}
            xl={9}
            marginTop={2}
            sx={{
              paddingX: "12px",
            }}
          >
            <Typography variant="h5" fontWeight={600} letterSpacing={1}>
              Phòng {roomName}
            </Typography>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
            {selectedTab === 0 ? (
              <AdmissionDetailsByDate />
            ) : selectedTab === 1 ? (
              <InpatientMedicalTest medicalTestServices={medicalTestServices} />
            ) : selectedTab === 4 ? (
              <AdmissionReceipt />
            ) : selectedTab === 5 ? (
              <HospitalDischarge />
            ) : (
              <PrescriptionHospitalDischarge
                info={generalInfo}
                doctorName={generalInfo?.dischargeDoctorName}
                diagnostic={generalInfo?.dischargeDiagnosis}
              />
            )}
          </Grid>
        </StyledGrid>
      </Box>
    </HospitalizationContext.Provider>
  );
}

export default HospitalizationDetails;
