import {
  Celebration,
  Print,
  ReportGmailerrorredOutlined,
  Save,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { HospitalizationContext } from "../../../pages/Nurse/Hospitalization/HospitalizationDetails";
import { getGender } from "../../../utils/genderUtils";
import { getAge } from "../../../utils/getAgeUtils";
import {
  confirmDischarge,
  getDischargeDetails,
  updateDischargeDetails,
} from "../../../services/nurse/HospitalizeServices";
import { enqueueSnackbar } from "notistack";
import { appColors } from "../../../utils/appColorsUtils";
import { globalStyles } from "../../../theme/globalStyles";
import { useNavigate } from "react-router-dom";

const ViewStyle = styled(Grid)(({ theme }) => ({
  padding: "18px 16px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
}));

const ButtonCustom = styled(Button)(({ theme }) => ({
  textTransform: "none",
  padding: "4px 10px",
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
}));

const LableTypography = styled(Typography)(({ theme }) => ({
  marginRight: "4px",
  display: "flex",
  fontSize: "14px",
  fontWeight: 500,
}));

function HospitalDischarge() {
  const { generalInfo, doctors } = useContext(HospitalizationContext);
  const [confirmModal, setConfirmModal] = useState(false);
  const navigate = useNavigate();
  const [discharge, setDischarge] = useState({
    dischargeSummary: "",
    treatments: "",
    note: "",
    dischargeDate: null,
    reExaminationDate: null,
    isReExamination: false,
    doctorId: "",
    doctorName: "",
    doctorDegree: "",
  });
  const ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const cursorPosition = event.target.selectionStart;
      const newText =
        discharge.note.slice(0, cursorPosition) +
        "\n- " +
        discharge.note.slice(cursorPosition);
      setDischarge((prev) => {
        return {
          ...prev,
          note: newText,
        };
      });
      // Đặt lại vị trí con trỏ sau khi thêm dấu gạch ngang
      setTimeout(() => {
        event.target.selectionStart = event.target.selectionEnd =
          cursorPosition + 3;
      }, 0);
    }
  };
  const handleOnChangeNote = (event) => {
    setDischarge((prev) => {
      return {
        ...prev,
        note: event.target.value,
      };
    });
  };
  const handleOnFocus = () => {
    if (discharge.note === "") {
      setDischarge({
        ...discharge,
        note: "- ",
      });
    }
  };

  const handleSaveDischargeDetails = async () => {
    const data = {
      dischargeSummary: discharge.dischargeSummary,
      treatments: discharge.treatments,
      note: discharge.note,
      reExaminationDate: discharge.isReExamination
        ? discharge.reExaminationDate
        : null,
      doctorId: discharge.doctorId,
    };

    const response = await updateDischargeDetails(
      generalInfo?.hospitalAdmissionId,
      data
    );
    if (response.success) {
      enqueueSnackbar("Lưu thông tin phiếu xuất viện thành công", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Lỗi khi lưu thông tin phiếu xuất viện", {
        variant: "error",
      });
    }
  };

  const handleDischarge = async () => {
    const response = await confirmDischarge(generalInfo?.hospitalAdmissionId);
    if (response.success) {
      enqueueSnackbar("Xác nhận xuất viện thành công", {
        variant: "success",
      });
      setConfirmModal(false);
      navigate("/nurse-inpatient");
    } else {
      enqueueSnackbar("Lỗi khi xác nhận xuất viện", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const handleGetDischargeDetails = async (hospitalAdmissionId) => {
      const response = await getDischargeDetails(hospitalAdmissionId);
      if (response.success) {
        const data = response.data.data;
        setDischarge((prev) => {
          return {
            ...prev,
            dischargeSummary: data.dischargeSummary,
            treatments: data.treatments,
            note: data.note,
            dischargeDate: data.dischargeDate,
            reExaminationDate: dayjs(data.reExaminationDate),
            isReExamination: data.reExaminationDate !== null,
            doctorId: data.doctorId,
            doctorName: data.doctorName,
            doctorDegree: data.doctorDegree,
          };
        });
      } else {
        enqueueSnackbar("Lỗi khi lấy thông tin phiếu xuất viện", {
          variant: "error",
        });
      }
    };

    if (generalInfo?.hospitalAdmissionId) {
      handleGetDischargeDetails(generalInfo.hospitalAdmissionId);
    }
  }, [generalInfo]);
  return (
    <Box>
      <ViewStyle container>
        <Box item xs={12} container component={Grid} ref={ref}>
          <Grid item xs={12} justifyContent={"center"}>
            <Typography
              variant="subtitle1"
              textTransform={"capitalize"}
              fontWeight={600}
              letterSpacing={0.5}
              fontSize={"24px"}
              textAlign={"center"}
            >
              Phiếu xuất viện
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "120px",
                }}
              >
                Họ và tên:
              </LableTypography>
              <ValueTypography
                style={{
                  textTransform: "uppercase",
                }}
              >
                {generalInfo?.patientName}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={5} marginTop={1}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "120px",
                }}
              >
                Ngày sinh:
              </LableTypography>
              <ValueTypography>
                {dayjs(generalInfo?.patientBirthDate).format("DD/MM/YYYY")}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={5} marginTop={1}>
            <Stack direction={"row"} justifyContent={"end"}>
              <LableTypography>Tuổi:</LableTypography>
              <ValueTypography>
                {getAge(generalInfo?.patientBirthDate)}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={2} marginTop={1}>
            <Stack direction={"row"} justifyContent={"end"}>
              <LableTypography>Giới tính:</LableTypography>
              <ValueTypography>
                {getGender(generalInfo?.patientGender)}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "120px",
                }}
              >
                Địa chỉ:
              </LableTypography>
              <ValueTypography>
                {`${generalInfo?.streetName}, ${generalInfo?.wardName}, ${generalInfo?.districtName}, ${generalInfo?.provinceName}`}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8} marginTop={1}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "120px",
                }}
              >
                Ngày vào viện:
              </LableTypography>
              <ValueTypography>
                {dayjs(generalInfo?.admissionDate).format("DD/MM/YYYY")}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} marginTop={1}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "100px",
                }}
              >
                Phòng nằm viện:
              </LableTypography>
              <ValueTypography>{generalInfo?.roomName}</ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <Stack direction={"column"}>
              <LableTypography
                style={{
                  marginBottom: "4px",
                }}
              >
                Chuẩn đoán cuối:
              </LableTypography>
              <TextField
                fullWidth
                multiline
                rows={5}
                value={discharge.dischargeSummary}
                onChange={(e) =>
                  setDischarge((prev) => {
                    return {
                      ...prev,
                      dischargeSummary: e.target.value,
                    };
                  })
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={12} marginTop={1.5}>
            <Stack direction={"column"}>
              <LableTypography
                style={{
                  marginBottom: "4px",
                }}
              >
                Phương pháp điều trị:
              </LableTypography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Nhập phương pháp điều trị"
                value={discharge.treatments}
                onChange={(e) =>
                  setDischarge((prev) => {
                    return {
                      ...prev,
                      treatments: e.target.value,
                    };
                  })
                }
              />
            </Stack>
          </Grid>

          <Grid item xs={12} marginTop={1.5}>
            <Stack direction={"column"}>
              <LableTypography
                style={{
                  marginBottom: "4px",
                }}
              >
                Ghi chú:
              </LableTypography>
              <TextField
                value={discharge.note}
                onChange={handleOnChangeNote}
                onKeyDown={handleKeyDown}
                onFocus={handleOnFocus}
                placeholder="Nhập ghi chú"
                fullWidth
                multiline
                rows={3}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} marginTop={1.5}>
            <Stack direction={"column"}>
              <LableTypography
                style={{
                  marginBottom: "4px",
                }}
              >
                Bác sĩ điều trị:
              </LableTypography>
              <Autocomplete
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
                value={discharge}
                onChange={(event, newValue) => {
                  setDischarge((prev) => {
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
                    placeholder="Chọn bác sĩ điều trị"
                  />
                )}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} marginTop={1.5}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Stack direction={"row"} alignItems={"center"} spacing={1} py={1}>
                <Checkbox
                  checked={discharge.isReExamination}
                  onChange={(e) => {
                    setDischarge((prev) => {
                      return {
                        ...prev,
                        isReExamination: e.target.checked,
                      };
                    });
                  }}
                  sx={{
                    padding: "0px",
                    paddingBottom: "2px",
                  }}
                />
                <LableTypography
                  style={{
                    marginBottom: "4px",
                  }}
                >
                  Ngày tái khám
                </LableTypography>
              </Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box>
                  <DatePicker
                    format="DD/MM/YYYY"
                    value={discharge.reExaminationDate}
                    onChange={(newValue) => {
                      setDischarge((prev) => {
                        return {
                          ...prev,
                          reExaminationDate: newValue,
                        };
                      });
                    }}
                    disabled={!discharge.isReExamination}
                  />
                </Box>
              </LocalizationProvider>
            </Stack>
          </Grid>
        </Box>
        <Grid item xs={12} marginTop={2}>
          <Stack direction={"row"} justifyContent={"space-between"} spacing={1}>
            <ButtonCustom
              disabled={!generalInfo?.dischargePaid}
              variant="text"
              style={{
                color: !generalInfo?.dischargePaid ? "#c3c3c3" : "#ff4e4e",
              }}
              endIcon={<Celebration />}
              onClick={() => {
                setConfirmModal(true);
              }}
            >
              Xuất viện
            </ButtonCustom>
            <Box>
              <ButtonCustom
                disabled={!generalInfo?.dischargePaid}
                variant="text"
                style={{
                  color: !generalInfo?.dischargePaid ? "#c3c3c3" : "#000092",
                }}
                endIcon={<Print />}
                onClick={handlePrint}
              >
                In
              </ButtonCustom>
              <ButtonCustom
                variant="text"
                style={{
                  color: "#1b9200",
                }}
                endIcon={<Save />}
                onClick={handleSaveDischargeDetails}
              >
                Lưu
              </ButtonCustom>
            </Box>
          </Stack>
        </Grid>
      </ViewStyle>

      <Modal
        open={confirmModal}
        onClose={() => {
          setConfirmModal(false);
        }}
        sx={globalStyles.center}
      >
        <Box
          sx={{
            backgroundColor: appColors.white,
            position: "relative",
          }}
        >
          <Box
            sx={{
              backgroundColor: appColors.warning,
              height: "7px",
            }}
          />

          <Stack
            direction={"row"}
            alignItems={"center"}
            maxWidth={"700px"}
            columnGap={"12px"}
            p={2}
          >
            <ReportGmailerrorredOutlined
              sx={{
                color: appColors.warning,
                fontSize: "70px",
              }}
            />
            <Box>
              <Typography fontWeight={500} fontSize={"24px"}>
                Xác nhận xuất viện
              </Typography>
              <Typography textAlign={"justify"}>
                Bạn có chắc chắn muốn xuất viện cho bệnh nhân này? Bạn phải chắc
                chắn rằng đã in phiếu xuất viện và toa thuốc cho bệnh nhân trước
                khi xác nhận. Sau khi xác nhận, bạn không thể chỉnh sửa và truy
                cập thông tin điều trị của bệnh nhân.
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            columnGap={"8px"}
            p={1}
          >
            <Button
              variant="outlined"
              sx={{
                color: appColors.primary,
                borderColor: appColors.primary,
                "&:hover": {
                  backgroundColor: appColors.primary,
                  color: "#ffffff",
                },
              }}
              onClick={handleDischarge}
            >
              Xác nhận
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: appColors.error,
                borderColor: appColors.error,
                "&:hover": {
                  backgroundColor: appColors.error,
                  color: "#ffffff",
                },
              }}
              onClick={() => {
                setConfirmModal(false);
              }}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default HospitalDischarge;
