import PersonIcon from "@mui/icons-material/Person";
import {
  Autocomplete,
  Box,
  Button,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { useTheme } from "@emotion/react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useDebounce from "../../../hooks/useDebounce";
import MedicalInAdmissionDatails from "./MedicalInAdmissionDatails";
import VitalSignsComponent from "./VitalSignsComponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MedicationManagementInAdmission from "./MedicationManagementInAdmission";
import {
  getHospitalizationDetailsByDate,
  getMedicalTestsByDate,
  getTreatmentMedicinesByDate,
  updateHospitalizationDetailsByDate,
} from "../../../services/nurse/HospitalizeServices";
import { enqueueSnackbar } from "notistack";
import { HospitalizationContext } from "../../../pages/Nurse/Hospitalization/HospitalizationDetails";

const ViewStyle = styled(Grid)(({ theme }) => ({
  padding: "16px 16px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
}));

const LayoutStyle = styled(Stack)(({ theme }) => ({
  padding: "16px 16px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
}));

function AdmissionDetailsByDate(props) {
  const { generalInfo, doctors } = useContext(HospitalizationContext);

  const [isEdit, setIsEdit] = useState(false);
  const [vitalSignEdit, setVitalSignEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [date, setDate] = useState(dayjs());
  const isNotTodayOrYesterday = useMemo(() => {
    return (
      date.format("YYYY-MM-DD") !== dayjs().format("YYYY-MM-DD") &&
      date.format("YYYY-MM-DD") !==
        dayjs().subtract(1, "day").format("YYYY-MM-DD")
    );
  }, [date]);
  const handleAlertNotTodayOrYesterday = useCallback(() => {
    enqueueSnackbar("Chỉ được cập nhật thông tin hôm nay hoặc hôm qua", {
      variant: "error",
    });
  }, []);
  const [info, setInfo] = useState({
    bloodPressure: 100,
    heartRate: 140,
    temperature: 37.5,
    symptom: "",
    diseaseProgression: "",
    diagnosis: "",
    doctorId: "",
    doctorName: "",
    doctorDegree: "",
  });
  const [medicalTests, setMedicalTests] = useState([]);
  const [treatmentMedicines, setTreatmentMedicines] = useState([]);

  const infoDebounce = useDebounce(
    {
      symptom: info.symptom,
      diseaseProgression: info.diseaseProgression,
      diagnosis: info.diagnosis,
      doctorId: info.doctorId,
    },
    1000
  );
  const theme = useTheme();
  const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleSignOfVitalityChange = useCallback(
    (bloodPressure, heartRate, temperature) => {
      setInfo((prev) => {
        return {
          ...prev,
          bloodPressure,
          heartRate,
          temperature,
        };
      });

      setVitalSignEdit(true);
    },
    []
  );

  useEffect(() => {
    const handleUpdateHospitalizationDetailsByDate = async () => {
      setSaving(true);
      setVitalSignEdit(false);
      const response = await updateHospitalizationDetailsByDate(
        generalInfo?.hospitalAdmissionId,
        {
          bloodPressure: info.bloodPressure,
          heartRate: info.heartRate,
          temperature: info.temperature,
          symptom: infoDebounce.symptom,
          diseaseProgression: infoDebounce.diseaseProgression,
          diagnosis: infoDebounce.diagnosis,
          date: date,
          doctorId: infoDebounce.doctorId,
        }
      );
      setSaving(false);

      if (response.success) {
        setInfo((prev) => {
          return {
            ...prev,
            updatedAt: response.data.data.updatedAt,
          };
        });
      } else {
        console.log(response.error);
        enqueueSnackbar("Đã xảy ra lỗi khi cập nhật thông tin chữa trị", {
          variant: "error",
        });
      }
    };

    if (vitalSignEdit || isEdit) {
      handleUpdateHospitalizationDetailsByDate();
    }
  }, [
    infoDebounce.diagnosis,
    infoDebounce.symptom,
    infoDebounce.diseaseProgression,
    infoDebounce.doctorId,
    info.bloodPressure,
    info.heartRate,
    info.temperature,
    date,
    generalInfo,
    isEdit,
    vitalSignEdit,
  ]);

  useEffect(() => {
    const handleGetHospitalizationDetailsByDate = async (hospitalizationId) => {
      const response = await getHospitalizationDetailsByDate(
        hospitalizationId,
        date.format("YYYY-MM-DD")
      );

      if (response.success) {
        const data = response.data.data;
        setInfo({
          bloodPressure: data.bloodPressure,
          heartRate: data.heartRate,
          temperature: data.temperature,
          symptom: data.symptom,
          diseaseProgression: data.diseaseProgression,
          diagnosis: data.diagnosis,
          updatedAt: data.updatedAt,
          doctorId: data.doctorId || "",
          doctorName: data.doctorName || "",
          doctorDegree: data.doctorDegree || "",
        });
      } else {
        enqueueSnackbar("Đã xảy ra lỗi khi lấy thông tin chữa trị", {
          variant: "error",
        });
      }
    };
    const handleGetMedicalTestsByDate = async (hospitalizationId) => {
      const response = await getMedicalTestsByDate(
        hospitalizationId,
        date.format("YYYY-MM-DD")
      );

      if (response.success) {
        setMedicalTests(response.data.data);
      } else {
        enqueueSnackbar("Đã xảy ra lỗi khi lấy thông tin xét nghiệm", {
          variant: "error",
        });
      }
    };
    const handleGetTreatmentMedicinesByDate = async (hospitalizationId) => {
      const response = await getTreatmentMedicinesByDate(
        hospitalizationId,
        date.format("YYYY-MM-DD")
      );

      if (response.success) {
        setTreatmentMedicines(response.data.data);
      } else {
        enqueueSnackbar("Đã xảy ra lỗi khi lấy thông tin thuốc", {
          variant: "error",
        });
      }
    };

    const hospitalizationId = generalInfo?.hospitalAdmissionId;
    if (!hospitalizationId) {
      return;
    }

    // Call 2 API at the same time
    Promise.all([
      handleGetHospitalizationDetailsByDate(hospitalizationId),
      handleGetMedicalTestsByDate(hospitalizationId),
      handleGetTreatmentMedicinesByDate(hospitalizationId),
    ]);
  }, [generalInfo, date]);

  return (
    <Box>
      <ViewStyle container>
        <Grid item xs={12} md={6}>
          <Stack direction="column">
            <Stack
              direction={"row"}
              style={{
                alignItems: "center",
              }}
            >
              <PersonIcon
                style={{
                  marginRight: "4px",
                  fontSize: "20px",
                }}
              />
              <Typography fontSize={"18px"} fontWeight={600}>
                Hồ sơ bệnh án:{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 500,
                    letterSpacing: 1,
                    marginLeft: "4px",
                  }}
                >
                  {generalInfo?.patientName}
                </span>
              </Typography>
            </Stack>
            <Typography variant="body1" fontSize={"10px"} marginLeft={"24px"}>
              {saving
                ? "Đang lưu..."
                : `Cập nhật lần cuối lúc: ${dayjs(info.updatedAt).format(
                    "HH:mm - DD/MM/YYYY"
                  )}`}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display={"flex"}
          marginTop={isDownMd ? "8px" : "0"}
          justifyContent={isDownMd ? "start" : "end"}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              sx={{ width: isDownMd ? "100%" : "auto" }}
              format="DD/MM/YYYY"
              value={date}
              minDate={dayjs(generalInfo?.admissionDate)}
              maxDate={dayjs()}
              onChange={(newValue) => {
                setIsEdit(false);
                setVitalSignEdit(false);
                setDate(newValue);
              }}
              renderInput={(params) => <Box>{params.inputProps.value}</Box>}
            />
          </LocalizationProvider>
        </Grid>
      </ViewStyle>
      <Grid container>
        <Grid item xs={12} md={3.5} minHeight={"100px"}>
          <VitalSignsComponent
            heartRate={info.heartRate}
            bloodPressure={info.bloodPressure}
            temperature={info.temperature}
            onChange={handleSignOfVitalityChange}
            isNotTodayOrYesterday={isNotTodayOrYesterday}
            handleAlertNotTodayOrYesterday={handleAlertNotTodayOrYesterday}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8.25}
          marginLeft={isDownLg ? 0 : 2.2}
          maxHeight={"100%"}
        >
          <LayoutStyle
            direction={"column"}
            style={{
              height: "330px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                paddingBottom: "8px",
                borderBottom: "1px solid #eaeaea",
                position: "sticky",
              }}
            >
              <Typography variant="h6" fontWeight={600} fontSize={"18px"}>
                Kết quả xét nghiệm và chuẩn đoán hình ảnh (
                {medicalTests?.length})
              </Typography>
            </Box>
            <Stack
              direction={"column"}
              marginTop={"8px"}
              width={"100%"}
              style={{
                overflow: "auto",
                paddingBottom: "20px",
              }}
            >
              {medicalTests?.length !== 0 ? (
                medicalTests.map((item, index) => (
                  <MedicalInAdmissionDatails
                    index={index}
                    key={`medical-test-by-date-${index}`}
                    medicalTest={item}
                  />
                ))
              ) : (
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CardMedia
                    component={"img"}
                    src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1720179868/NoData_zd2mwa.jpg"
                    alt="No_Data"
                    sx={{
                      width: "400px",
                      height: "220px",
                      objectFit: "contain",
                    }}
                  />
                  <Typography marginTop={-2} fontSize={"14px"}>
                    Không có yêu cầu xét nghiệm
                  </Typography>
                </Stack>
              )}
            </Stack>
          </LayoutStyle>
        </Grid>
      </Grid>
      <LayoutStyle direction={"column"}>
        <Stack
          direction={"row"}
          style={{
            width: "100%",
            paddingBottom: "8px",
            borderBottom: "1px solid #eaeaea",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight={600} fontSize={"18px"}>
            Triệu chứng và diễn biến bệnh
          </Typography>
          <Button
            onClick={() => {
              if (isNotTodayOrYesterday) {
                handleAlertNotTodayOrYesterday();
                return;
              }
              setIsEdit(true);
            }}
            color={isEdit ? "warning" : "info"}
            style={{
              textTransform: "none",
            }}
            endIcon={
              isEdit ? (
                <BorderColorIcon
                  style={{
                    fontSize: "14px",
                  }}
                />
              ) : (
                <VisibilityIcon
                  style={{
                    fontSize: "14px",
                  }}
                />
              )
            }
          >
            Chế độ: {isEdit ? "Cập nhật" : "Xem"}
          </Button>
        </Stack>
        <Stack direction={"column"} marginTop={"10px"} width={"100%"}>
          <TextField
            fullWidth
            label="Triệu chứng"
            value={info.symptom || ""}
            onChange={(e) => {
              setInfo({ ...info, symptom: e.target.value });
            }}
            multiline
            rows={2}
            placeholder="Nhập triệu chứng của bệnh nhân"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              readOnly: !isEdit,
            }}
          />
          <TextField
            fullWidth
            label={"Diễn biến bệnh phòng"}
            value={info.diseaseProgression || ""}
            onChange={(e) => {
              setInfo({ ...info, diseaseProgression: e.target.value });
            }}
            multiline
            rows={4}
            placeholder="Nhập diễn biến bệnh của bệnh nhân"
            style={{ marginTop: "16px" }}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              readOnly: !isEdit,
            }}
          />
          <TextField
            fullWidth
            label="Chuẩn đoán"
            value={info.diagnosis || ""}
            onChange={(e) => {
              setInfo({ ...info, diagnosis: e.target.value });
            }}
            multiline
            rows={2}
            placeholder="Nhập diễn biến bệnh của bệnh nhân"
            style={{ marginTop: "16px" }}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              readOnly: !isEdit,
            }}
          />
          <Autocomplete
            readOnly={!isEdit}
            size="medium"
            disablePortal
            id="combo-box-demo"
            disableClearable
            options={doctors}
            getOptionLabel={(option) =>
              `${option.doctorDegree} ${option.doctorName}`
            }
            isOptionEqualToValue={(option, value) =>
              option.doctorId === value.doctorId || value.doctorId === ""
            }
            value={info}
            onChange={(event, newValue) => {
              setInfo((prev) => {
                return {
                  ...prev,
                  doctorId: newValue.doctorId,
                  doctorName: newValue.doctorName,
                  doctorDegree: newValue.doctorDegree,
                };
              });
            }}
            width={"100%"}
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{ shrink: true }}
                label={"Bác sĩ điều trị"}
                placeholder="Chọn bác sĩ điều trị"
              />
            )}
            sx={{
              flex: 2,
            }}
            style={{ marginTop: "16px" }}
          />
        </Stack>
      </LayoutStyle>
      <LayoutStyle direction={"column"}>
        <MedicationManagementInAdmission
          treatmentMedicines={treatmentMedicines}
          onChange={setTreatmentMedicines}
          hospitalizationId={generalInfo?.hospitalAdmissionId}
          date={date}
          isNotTodayOrYesterday={isNotTodayOrYesterday}
          handleAlertNotTodayOrYesterday={handleAlertNotTodayOrYesterday}
        />
      </LayoutStyle>
    </Box>
  );
}

export default AdmissionDetailsByDate;
