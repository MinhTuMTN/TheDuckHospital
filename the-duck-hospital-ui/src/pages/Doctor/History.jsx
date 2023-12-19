import styled from "@emotion/styled";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonIcon from "@mui/icons-material/Person";
import TodayIcon from "@mui/icons-material/Today";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InfoPatientHistory from "../../components/Doctor/InfoPatientHistory";
import ListTestHaveDone from "../../components/Doctor/ListTestHaveDone";
import OldPrescription from "../../components/Doctor/OldPrescription";
import FormatDateTime from "../../components/General/FormatDateTime";
import { getHistoryMedicalRecord } from "../../services/doctor/MedicalExamServices";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const handleBasicsInfo = (patient) => {
  return [
    {
      label: "Ngày sinh:",
      value: dayjs(patient?.dateOfBirth)?.format("DD/MM/YYYY"),
      icon: <CakeOutlinedIcon fontSize="18px" />,
    },

    {
      label: "Địa chỉ:",
      value: patient?.address,
      icon: <LocationOnOutlinedIcon fontSize="18px" />,
    },
    {
      label: "Số điện thoại:",
      value: patient?.phoneNumber,
      icon: <LocalPhoneIcon fontSize="18px" />,
    },
  ];
};

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "10px 8px",
  },
}));

const createInfoDoctor = (doctorName, date) => {
  const infoDoctor = [
    {
      label: "Bác sĩ:",
      value: doctorName,
      icon: <PersonIcon fontSize="18px" />,
    },
    {
      label: "Ngày khám:",
      value: dayjs(date)?.format("DD/MM/YYYY"),
      icon: <TodayIcon fontSize="18px" />,
    },
  ];

  return infoDoctor;
};

function History(props) {
  const navigate = useNavigate();
  const { medicalRecordId } = useParams();
  const location = useLocation();
  const [info, setInfo] = React.useState({});
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    const handleGetMedicalRecord = async () => {
      if (!location?.state?.medicalRecordId) navigate(-1);

      const response = await getHistoryMedicalRecord(
        location?.state?.medicalRecordId,
        medicalRecordId
      );
      if (response.success) {
        const data = response.data.data;
        setInfo(data);
      }
    };
    handleGetMedicalRecord();
  }, [medicalRecordId, location?.state?.medicalRecordId, navigate]);

  return (
    <>
      <Box
        sx={{
          pt: 3,
          paddingBottom: 10,
          paddingX: 2,
          margin: "auto",
          minWidth: "1200px",
        }}
      >
        <Stack direction={"column"} spacing={4}>
          <Stack direction={"column"}>
            <Stack
              direction={"row"}
              spacing={0}
              alignItems={"center"}
              marginBottom={2}
            >
              <Button
                variant="text"
                sx={{
                  alignItems: "center",
                  width: "fit-content",
                  textTransform: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in",
                  color: "#474747",
                  fontWeight: "400",
                  ":hover": {
                    boxShadow: "9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;",
                    transform: "translateY(-2px)",
                    "& .icon": {
                      transform: "translateX(-5px)",
                    },
                  },
                }}
                onClick={() => navigate(-1)}
              >
                <KeyboardBackspaceIcon
                  className="icon"
                  sx={{
                    marginRight: "5px",
                    fontSize: "18px",
                    color: "#474747",
                    transition: "all 0.4s ease-in",
                  }}
                />
                Quay lại
              </Button>
            </Stack>
            <Typography
              variant="h3"
              fontWeight={600}
              style={{
                textTransform: "uppercase",
                fontSize: "2rem",
              }}
            >
              {info?.patient?.patientCode}
            </Typography>

            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              sx={{
                marginTop: 0.5,
              }}
            >
              <Typography
                variant="body1"
                fontWeight={400}
                style={{
                  fontSize: "14px",
                }}
              >
                Xác nhận lúc{" "}
              </Typography>
              <CalendarTodayOutlinedIcon
                sx={{
                  fontSize: "18px",
                }}
              />
              <Typography
                variant="body1"
                fontWeight={450}
                style={{
                  fontSize: "14px",
                }}
              >
                <FormatDateTime dateTime={info?.createdAt} />
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Grid
          container
          spacing={2}
          sx={{
            marginTop: 3,
          }}
        >
          <Grid item xs={12} md={3.5}>
            <InfoPatientHistory
              mainInfo={info?.patient}
              info={handleBasicsInfo(info?.patient)}
              infoDoctor={createInfoDoctor(info?.doctorName, info?.date)}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={8.5}
            sx={{
              borderRadius: "8px",
            }}
          >
            <Stack
              direction={"column"}
              spacing={2}
              component={Paper}
              elevation={2}
              sx={{
                borderRadius: "8px",
                paddingX: 3,
                paddingTop: 1.5,
                paddingBottom: 3,
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h5" fontWeight={500}>
                  Lịch sử khám bệnh
                </Typography>
                <Typography variant="body1" fontWeight={400}>
                  Tái khám:{" "}
                  <span style={{ fontWeight: "450" }}>
                    {info?.reExaminationDate
                      ? dayjs(info?.reExaminationDate).format("DD/MM/YYYY")
                      : "Không có"}
                  </span>
                </Typography>
              </Stack>
              <CustomTextField
                size="medium"
                variant="outlined"
                id="outlined-basic"
                fullWidth
                required
                value={info?.symptom}
              />
              <CustomTextField
                size="medium"
                variant="outlined"
                id="outlined-basic"
                fullWidth
                required
                value={info?.diagnosis}
              />

              <div>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>Xét nghiệm đã làm</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListTestHaveDone medicalTests={info?.medicalTests} />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                  >
                    <Typography>Toa thuốc</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <OldPrescription
                      prescriptionItems={info?.prescriptionItems}
                    />
                  </AccordionDetails>
                </Accordion>
              </div>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#4caf50",
                  },
                }}
                onClick={() => navigate(-1)}
              >
                Hoàn thành xem
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default History;
