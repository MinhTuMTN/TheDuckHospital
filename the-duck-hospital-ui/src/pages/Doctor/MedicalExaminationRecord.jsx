import styled from "@emotion/styled";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfoPatient from "../../components/Doctor/InfoPatient";
import ListTestToDo from "../../components/Doctor/ListTestToDo";
import Prescription from "../../components/Doctor/Prescription";
import DialogConfirm from "../../components/General/DialogConfirm";
import FormatDateTime from "../../components/General/FormatDateTime";
import {
  completeMedicalRecord,
  getMedicalRecord,
  updateMedicalRecord,
} from "../../services/doctor/MedicalExamServices";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  "& input": {
    height: "50px",
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

function MedicalExaminationRecord(props) {
  const navigate = useNavigate();
  const { medicalRecordId } = useParams();
  const [info, setInfo] = React.useState({});
  const [basicsInfo, setBasicsInfo] = React.useState([]);
  const [symptom, setSymptom] = React.useState("");
  const [diagnostic, setDiagnostic] = React.useState("");
  const [expanded, setExpanded] = React.useState("panel1");
  const [openComplete, setOpenComplete] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState(false);
  const [dateOfReExamination, setDateOfReExamination] = React.useState(dayjs());
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    const handleGetMedicalRecord = async () => {
      const response = await getMedicalRecord(medicalRecordId);
      if (response.success) {
        const data = response.data.data;
        setInfo(data);
        setBasicsInfo(handleBasicsInfo(data.patient));
        setSymptom(data.symptom || "");
        setDiagnostic(data.diagnosis || "");
      }
    };
    handleGetMedicalRecord();
  }, [medicalRecordId]);

  const handleUpdateMedicalRecord = async () => {
    const response = await updateMedicalRecord(
      medicalRecordId,
      symptom,
      diagnostic
    );
    if (response.success) {
      enqueueSnackbar("Cập nhật thành công", { variant: "success" });
      const data = response.data.data;
      setInfo(data);
      setBasicsInfo(handleBasicsInfo(data.patient));
      setSymptom(data.symptom || "");
      setDiagnostic(data.diagnosis || "");
    }
  };

  const handleCompleteMedicalRecord = async () => {
    console.log(medicalRecordId);
    const response = await completeMedicalRecord(medicalRecordId);
    if (response.success) {
      enqueueSnackbar("Hoàn thành khám bệnh thành công", {
        variant: "success",
      });
      navigate("/doctor/doctor-bookings", { replace: true });
    } else {
      enqueueSnackbar("Hoàn thành khám bệnh thất bại", {
        variant: "error",
      });
    }
  };

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
                onClick={() => navigate("/doctor/doctor-bookings")}
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
            <InfoPatient
              mainInfo={info?.patient}
              history={info?.history}
              info={basicsInfo}
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
              <Typography variant="h5" fontWeight={500}>
                Tạo hồ sơ khám bệnh
              </Typography>
              <CustomTextField
                size="medium"
                variant="outlined"
                id="outlined-basic"
                label="Triệu chứng"
                fullWidth
                required
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
              />
              <CustomTextField
                size="medium"
                variant="outlined"
                id="outlined-basic"
                label="Chuẩn đoán"
                fullWidth
                required
                value={diagnostic}
                onChange={(e) => setDiagnostic(e.target.value)}
              />

              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={1}
                style={{
                  justifyContent: "flex-start",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      label="Tái khám"
                      value={isCheck}
                      onClick={() => setIsCheck(!isCheck)}
                    />
                  }
                  sx={{
                    width: "150px",
                  }}
                  label="Tái khám"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <CustomDatePicker
                    readOnly={!isCheck}
                    format="DD/MM/YYYY"
                    value={dateOfReExamination}
                    onChange={(newValue) => setDateOfReExamination(newValue)}
                    defaultValue={dayjs()}
                  />
                </LocalizationProvider>
              </Stack>

              <div>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>Thực hiện xét nghiệm</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListTestToDo patientInfo={info} />
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
                    <Prescription patientInfo={info} diagnostic={diagnostic} />
                  </AccordionDetails>
                </Accordion>
              </div>
              <Stack
                direction={"row"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                spacing={1}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#00a9dd",
                    color: "#00a9dd",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "none",
                      borderColor: "#00a9dd",
                    },
                  }}
                  onClick={handleUpdateMedicalRecord}
                >
                  Lưu
                </Button>
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
                  onClick={() => setOpenComplete(true)}
                >
                  Hoàn thành
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <DialogConfirm
        cancelText={"Hủy"}
        okText={"Xác nhận"}
        open={openComplete}
        onClose={() => setOpenComplete(false)}
        title={"Xác nhận hoàn thành khám bệnh"}
        content={"Bạn có chắc chắn muốn hoàn thành khám bệnh này?"}
        onOk={() => handleCompleteMedicalRecord()}
        onCancel={() => setOpenComplete(false)}
      />
    </>
  );
}

export default MedicalExaminationRecord;
