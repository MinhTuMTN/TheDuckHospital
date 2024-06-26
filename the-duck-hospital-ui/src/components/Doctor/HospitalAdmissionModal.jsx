import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { appColors } from "../../utils/appColorsUtils";
import HospitalAdmissionLetter from "./HospitalAdmissionLetter";
import { useReactToPrint } from "react-to-print";
import { useSnackbar } from "notistack";
import { createHospitalAdmissionLetter } from "../../services/doctor/MedicalExamServices";
import { useParams } from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.paper,
  boxShadow: 24,
  borderRadius: 4,
  padding: 16,
  minWidth: 650,
  maxWidth: 650,
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "10px 8px",
  },
}));
const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  "& input": {
    height: "50px",
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "20%",
}));

HospitalAdmissionModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  diagnostic: PropTypes.string,
  symptoms: PropTypes.string,
  info: PropTypes.object,
};
function HospitalAdmissionModal(props) {
  const [symptoms, setSymptoms] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [underlyingDisease, setUnderlyingDisease] = useState("");
  const [historyOfAllergy, setHistoryOfAllergy] = useState("");
  const { medicalRecordId } = useParams();
  const [hospitalAdmissionDate, setHospitalAdmissionDate] = useState(dayjs());
  const [admissionLeter, setAdmissionLetter] = useState(null);
  const [loading, setLoading] = useState(false);
  const componentRef = React.useRef();
  const { enqueueSnackbar } = useSnackbar();

  const handleConfirm = async () => {
    if (!symptoms || !diagnostic) {
      enqueueSnackbar("Vui lòng nhập đủ thông tin", { variant: "error" });
      return;
    }

    setLoading(true);
    const response = await createHospitalAdmissionLetter(medicalRecordId, {
      symptom: symptoms,
      diagnosis: diagnostic,
      admissionDate: hospitalAdmissionDate.startOf("day").toISOString(),
      underlyingDisease: underlyingDisease,
      historyOfAllergy: historyOfAllergy,
    });

    if (response.success) {
      setAdmissionLetter(response.data.data);
      setTimeout(() => {
        handlePrint();
        props.onClose();
        setLoading(false);
      }, 1000);
    } else {
      enqueueSnackbar("Không thể tạo giấy nhập viện", { variant: "error" });
      setLoading(false);
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Giấy nhập viện - " + admissionLeter?.hospitalAdmissionCode,
  });

  useEffect(() => {
    setSymptoms(props.symptoms);
    setDiagnostic(props.diagnostic);
  }, [props.symptoms, props.diagnostic]);
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <Typography variant="h5" fontWeight={"500"} fontSize={"24px"}>
            Nhập thông tin nhập viện
          </Typography>
          <Typography>
            Bác sĩ nhập thông tin nhập viện cho bệnh nhân bao gồm: triệu chứng,
            chuẩn đoán và ngày bệnh nhân. Sau đó nhấn nút <b>"Xác nhận"</b> để
            in giấy nhập viện cho bệnh nhân.
          </Typography>

          <Stack spacing={2} mt={2}>
            <CustomTextField
              size="medium"
              variant="outlined"
              id="outlined-basic"
              label="Triệu chứng"
              fullWidth
              required
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
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
            <CustomTextField
              size="medium"
              variant="outlined"
              id="outlined-basic"
              label="Bệnh nền"
              fullWidth
              required
              value={underlyingDisease}
              onChange={(e) => setUnderlyingDisease(e.target.value)}
            />
            <CustomTextField
              size="medium"
              variant="outlined"
              id="outlined-basic"
              label="Tiền sử dị ứng"
              fullWidth
              required
              value={historyOfAllergy}
              onChange={(e) => setHistoryOfAllergy(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomDatePicker
                format="DD/MM/YYYY"
                shouldDisableDate={(day) =>
                  dayjs(day).isBefore(dayjs().startOf("day"))
                }
                value={hospitalAdmissionDate}
                onChange={(newValue) => setHospitalAdmissionDate(newValue)}
                defaultValue={dayjs()}
                label="Ngày nhập viện"
              />
            </LocalizationProvider>
          </Stack>

          <Stack spacing={2} mt={2} direction="row" justifyContent="flex-end">
            <StyledButton
              color="error"
              sx={{
                "&:hover": {
                  backgroundColor: appColors.error,
                  color: "#ffffff",
                },
              }}
              onClick={props.onClose}
            >
              Huỷ bỏ
            </StyledButton>
            <StyledButton
              onClick={handleConfirm}
              color="newPrimary"
              sx={{
                "&:hover": {
                  backgroundColor: appColors.primary,
                  color: "#ffffff",
                },
              }}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Xác nhận
            </StyledButton>
          </Stack>
        </StyledBox>
      </Modal>

      <Box sx={{ display: "none" }}>
        <HospitalAdmissionLetter
          ref={componentRef}
          info={props.info}
          symptoms={symptoms}
          diagnostic={diagnostic}
          hospitalAdmissionDate={hospitalAdmissionDate}
          admissionLeter={admissionLeter}
        />
      </Box>
    </>
  );
}

export default HospitalAdmissionModal;
