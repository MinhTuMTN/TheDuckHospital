import { Create, Delete, PlaylistAdd } from "@mui/icons-material";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect } from "react";
import { searchMedicine } from "../../../services/doctor/MedicineServices";
import {
  addTreatmenMedicines,
  deleteTreatmentMedicine,
} from "../../../services/nurse/HospitalizeServices";
import { getMedicineUnit } from "../../../utils/medicineUtils";
import { getScheduleSessionForMedicine } from "../../../utils/scheduleSessionUtils";
import ModalMedication from "./ModalMedication";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: "34px",
  height: "34px",

  "& svg": {
    fontSize: "18px",
  },
}));

function MedicationManagementInAdmission(props) {
  const {
    treatmentMedicines,
    onChange,
    date,
    hospitalizationId,
    isNotTodayOrYesterday,
    handleAlertNotTodayOrYesterday = () => {},
  } = props;
  const [medicines, setMedicines] = React.useState([]);
  const [medicineQuery, setMedicineQuery] = React.useState("");

  const [modalState, setModalState] = React.useState("CLOSED");
  const [selectedMedication, setSelectedMedication] = React.useState({});

  const handleScheduleSessionChange = (scheduleSession) => {
    setSelectedMedication((prev) => {
      return {
        ...prev,
        [scheduleSession.toLowerCase()]: !prev[scheduleSession.toLowerCase()],
      };
    });
  };
  const handleGetAllMedicines = useCallback(async () => {
    const response = await searchMedicine(medicineQuery);
    if (response.success) {
      setMedicines(response.data.data);
    }
  }, [medicineQuery]);
  const handleAddMedicines = useCallback(async () => {
    console.log(selectedMedication);
    if (isNaN(selectedMedication.quantityPerTime)) {
      enqueueSnackbar("Liều lượng không hợp lệ", { variant: "error" });
      return;
    }

    const dataToSent = {
      date: date,
      medicineId: selectedMedication.medicineId,
      quantityPerTime: selectedMedication.quantityPerTime,
      note: selectedMedication.note,
      morning: selectedMedication.morning,
      afternoon: selectedMedication.afternoon,
      evening: selectedMedication.evening,
      night: selectedMedication.night,
    };

    const response = await addTreatmenMedicines(hospitalizationId, dataToSent);
    if (response.success) {
      onChange(response.data.data);
      setModalState("CLOSED");
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  }, [onChange, selectedMedication, date, hospitalizationId]);

  const handleDeleteTreatmentMedicine = useCallback(
    async (tomorrow) => {
      const response = await deleteTreatmentMedicine(
        hospitalizationId,
        selectedMedication.treatmentMedicineId,
        tomorrow
      );

      if (response.success) {
        onChange(response.data.data);
        enqueueSnackbar("Đã xoá thuốc thành công", { variant: "success" });
        setModalState("CLOSED");
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
      }
    },
    [hospitalizationId, selectedMedication, onChange]
  );

  useEffect(() => {
    handleGetAllMedicines();
  }, [handleGetAllMedicines]);
  return (
    <>
      <Stack
        direction={"row"}
        style={{
          width: "100%",
          paddingBottom: "4px",
          borderBottom: "1px solid #eaeaea",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={600} fontSize={"18px"}>
          Quản lý thuốc trong ngày
        </Typography>
        <Button
          onClick={() => {
            if (isNotTodayOrYesterday) {
              handleAlertNotTodayOrYesterday();
              return;
            }

            setModalState("ADD");
            setSelectedMedication({
              medicineId: "",
              medicineName: "",
              unit: "",
              quantityPerTime: "",
              morning: false,
              afternoon: false,
              evening: false,
              night: false,
            });
          }}
          style={{
            textTransform: "none",
          }}
          endIcon={<PlaylistAdd />}
        >
          Thêm thuốc
        </Button>
      </Stack>
      <Box width={"100%"} marginTop={2}>
        <Table
          sx={{
            width: "100%",
          }}
        >
          <TableHead style={{ backgroundColor: "#ececec" }}>
            <TableRow sx={{ width: "100%" }}>
              <TableCell width={"5%"} align="center">
                STT
              </TableCell>
              <TableCell width={"40%"} align="center">
                Thuốc
              </TableCell>
              <TableCell width={"15%"} align="right">
                Liều lượng
              </TableCell>
              <TableCell width={"10%"} align="left">
                Đơn vị
              </TableCell>
              <TableCell width={"15%"} align="left">
                Thời gian
              </TableCell>
              <TableCell width={"15%"}>Điều chỉnh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {treatmentMedicines?.length > 0 ? (
              treatmentMedicines?.map((medication, index) => (
                <TableRow key={medication.treatmentMedicineId}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="left">
                    <Stack direction={"column"}>
                      <Typography>{medication.medicineName}</Typography>
                      {medication.note && (
                        <Typography
                          style={{
                            color: "#666666",
                            fontSize: "13px",
                          }}
                        >
                          Chỉ định: {medication.note}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    {medication.quantityPerTime}
                  </TableCell>
                  <TableCell align="left">
                    {getMedicineUnit(medication.unit)}
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction={"column"} spacing={0}>
                      {["MORNING", "AFTERNOON", "EVENING", "NIGHT"].map(
                        (time, index) => {
                          if (!medication[time.toLowerCase()]) return null;

                          return (
                            <Typography
                              fontSize={"14px"}
                              key={`${
                                medication.treatmentMedicineId
                              }-${time.toLowerCase()}`}
                            >
                              {getScheduleSessionForMedicine(time)}
                            </Typography>
                          );
                        }
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction={"row"} spacing={0.5}>
                      <StyledIconButton
                        onClick={() => {
                          if (isNotTodayOrYesterday) {
                            handleAlertNotTodayOrYesterday();
                            return;
                          }
                          setSelectedMedication(medication);
                          setModalState("EDIT");
                        }}
                      >
                        <Create color="primary" />
                      </StyledIconButton>
                      <StyledIconButton
                        onClick={() => {
                          if (isNotTodayOrYesterday) {
                            handleAlertNotTodayOrYesterday();
                            return;
                          }
                          setSelectedMedication(medication);
                          setModalState("DELETE");
                        }}
                      >
                        <Delete color="error" />
                      </StyledIconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography>Không có dữ liệu</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <ModalMedication
        openModal={modalState === "ADD" || modalState === "EDIT"}
        onClose={() => setModalState("CLOSED")}
        modalTitle={modalState === "EDIT" ? "Chỉnh sửa thuốc" : "Thêm thuốc"}
        iconTitle={
          modalState === "EDIT" ? (
            <Create fontSize="18px" />
          ) : (
            <PlaylistAdd fontSize="18px" />
          )
        }
        buttonAPIName={modalState === "EDIT" ? "Cập nhật" : "Thêm"}
        onButtonAPIClick={handleAddMedicines}
      >
        <Autocomplete
          disabled={modalState === "EDIT"}
          size="medium"
          disablePortal
          id="combo-box-demo"
          options={modalState === "EDIT" ? [selectedMedication] : medicines}
          getOptionLabel={(option) =>
            option.medicineId !== ""
              ? `${option.medicineName} (${getMedicineUnit(option.unit)})`
              : ""
          }
          isOptionEqualToValue={(option, value) =>
            option.medicineId === value.medicineId || value.medicineId === ""
          }
          value={selectedMedication}
          onChange={(event, value) => {
            setSelectedMedication((prev) => {
              return {
                ...prev,
                medicineId: value?.medicineId || "",
                medicineName: value?.medicineName || "",
                unit: value?.unit || "",
              };
            });
          }}
          width={"100%"}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Chọn thuốc"
              value={medicineQuery}
              onChange={(e) => setMedicineQuery(e.target.value)}
              onBlur={() => setMedicineQuery("")}
            />
          )}
          sx={{
            flex: 2,
          }}
        />
        <TextField
          fullWidth
          autoComplete="off"
          placeholder="Chỉ định"
          value={selectedMedication.note || ""}
          onChange={(e) =>
            setSelectedMedication((prev) => ({
              ...prev,
              note: e.target.value,
            }))
          }
          style={{ marginTop: "16px", marginBottom: "16px" }}
          InputProps={{
            style: { padding: "4px 0px" },
          }}
        />
        <TextField
          fullWidth
          autoComplete="off"
          placeholder="Liều lượng 1 lần"
          value={selectedMedication.quantityPerTime}
          onChange={(e) =>
            setSelectedMedication((prev) => ({
              ...prev,
              quantityPerTime: e.target.value,
            }))
          }
          style={{ marginBottom: "8px" }}
          InputProps={{
            style: { padding: "4px 0px" },
          }}
        />
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: "450",
            }}
          >
            Buổi :
          </Typography>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedMedication.morning}
                  onChange={() => handleScheduleSessionChange("MORNING")}
                  name="MORNING"
                />
              }
              label="Sáng"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedMedication.afternoon}
                  onChange={() => handleScheduleSessionChange("AFTERNOON")}
                  name="AFTERNOON"
                />
              }
              label="Trưa"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedMedication.evening}
                  onChange={() => handleScheduleSessionChange("EVENING")}
                  name="EVENING"
                />
              }
              label="Chiều"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedMedication.night}
                  onChange={() => handleScheduleSessionChange("NIGHT")}
                  name="NIGHT"
                />
              }
              label="Tối"
            />
          </FormGroup>
        </Stack>
      </ModalMedication>
      <ModalMedication
        openModal={modalState === "DELETE"}
        onClose={() => setModalState("CLOSED")}
        modalTitle="Dừng uống thuốc"
        iconTitle={<DoDisturbOnIcon fontSize="18px" />}
        buttonAPIName="Hôm nay"
        secondButtonAPIName="Ngày mai"
        onSecondButtonAPIClick={() => handleDeleteTreatmentMedicine(true)}
        onButtonAPIClick={() => handleDeleteTreatmentMedicine(false)}
      >
        <Typography variant="body2" fontSize={"14px"}>
          Bạn có chắc chắn muốn dừng uống thuốc{" "}
          <strong
            style={{
              textTransform: "capitalize",
            }}
          >
            {selectedMedication.medicineName}
          </strong>{" "}
          không?
        </Typography>
        <Typography fontSize={"12px"} marginTop={"4px"}>
          Nếu quyết định dừng thuốc:{" "}
        </Typography>
        <Typography fontSize={"12px"}>
          - Nhấn chọn <strong>Hôm nay</strong> để dừng thuốc từ hôm nay
        </Typography>
        <Typography fontSize={"12px"}>
          - Nhấn chọn <strong>Ngày mai</strong> để dừng thuốc từ ngày mai
        </Typography>
      </ModalMedication>
    </>
  );
}

export default MedicationManagementInAdmission;
