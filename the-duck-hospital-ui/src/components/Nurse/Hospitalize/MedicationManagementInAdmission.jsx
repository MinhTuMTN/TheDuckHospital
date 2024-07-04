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
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import ModalMedication from "./ModalMedication";
import { getScheduleSession } from "../../../utils/scheduleSessionUtils";
import { searchMedicine } from "../../../services/doctor/MedicineServices";
const listMedication = [
  {
    id: 1,
    name: "Paracetamol",
    dosage: "150",
    unit: "ml",
    prescription: "Uống sau khi ăn",
    time: ["MORNING"],
  },
  {
    id: 2,
    name: "Adrenergic Modifiers",
    dosage: "1",
    unit: "viên",
    prescription: "Uống trước khi ăn 30 phút",
    time: ["MORNING", "AFTERNOON"],
  },
  {
    id: 3,
    name: "Jardiance",
    dosage: "1",
    unit: "viên",
    prescription: "",
    time: ["MORNING", "AFTERNOON"],
  },
];

const listMedicationForNurse = [
  {
    id: 1,
    name: "Paracetamol",
  },
  {
    id: 2,
    name: "Adrenergic Modifiers",
  },
  {
    id: 3,
    name: "Jardiance",
  },
  {
    id: 4,
    name: "Beta Blockers",
  },
];

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: "34px",
  height: "34px",

  "& svg": {
    fontSize: "18px",
  },
}));

function MedicationManagementInAdmission() {
  const [medicines, setMedicines] = React.useState([]);
  const [medicineQuery, setMedicineQuery] = React.useState("");

  const [addMedication, setAddMedication] = React.useState(false);
  const [editMedication, setEditMedication] = React.useState(false);
  const [deleteMedication, setDeleteMedication] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedMedication, setSelectedMedication] = React.useState({});
  const [selectedBuoi, setSelectedBuoi] = React.useState({
    MORNING: false,
    AFTERNOON: false,
    EVENING: false,
    NIGHT: false,
  });
  const handleBuoiChange = (buoi) => {
    setSelectedBuoi((prev) => ({
      ...prev,
      [buoi]: !prev[buoi],
    }));
  };

  const handleGetAllMedicines = useCallback(async () => {
    const response = await searchMedicine(medicineQuery);
    if (response.success) {
      setMedicines(response.data.data);
    }
  }, [medicineQuery]);

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
          onClick={() => setAddMedication(true)}
          style={{
            textTransform: "none",
          }}
          endIcon={<PlaylistAdd />}
        >
          Thêm thuốc
        </Button>
      </Stack>
      <Box width={"100%"} marginTop={2}>
        <TableContainer
          sx={{
            width: "100%",
          }}
        >
          <TableHead sx={{ width: "100%", backgroundColor: "#ececec" }}>
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
            {listMedication?.length > 0 ? (
              listMedication?.map((medication, index) => (
                <TableRow key={medication.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="left">
                    <Stack direction={"column"}>
                      <Typography>{medication.name}</Typography>
                      {medication.prescription && (
                        <Typography
                          style={{
                            color: "#666666",
                            fontSize: "13px",
                          }}
                        >
                          Chỉ định: {medication.prescription}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">{medication.dosage}</TableCell>
                  <TableCell align="left">{medication.unit}</TableCell>
                  <TableCell align="left">
                    <Stack direction={"column"} spacing={0}>
                      {medication.time.map((time, index) => (
                        <Typography fontSize={"14px"}>
                          {getScheduleSession(time)}
                        </Typography>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction={"row"} spacing={0.5}>
                      <StyledIconButton
                        onClick={() => {
                          setSelectedMedication(medication);
                          setEditMedication(true);
                        }}
                      >
                        <Create color="primary" />
                      </StyledIconButton>
                      <StyledIconButton
                        onClick={() => {
                          setSelectedMedication(medication);
                          setDeleteMedication(true);
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
        </TableContainer>
      </Box>
      <ModalMedication
        openModal={addMedication || editMedication}
        setOpenModal={editMedication ? setEditMedication : setAddMedication}
        modalTitle={editMedication ? "Chỉnh sửa thuốc" : "Thêm thuốc"}
        iconTitle={
          editMedication ? (
            <Create fontSize="18px" />
          ) : (
            <PlaylistAdd fontSize="18px" />
          )
        }
        buttonAPIName={editMedication ? "Cập nhật" : "Thêm"}
      >
        <Autocomplete
          disabled={editMedication}
          size="medium"
          disablePortal
          id="combo-box-demo"
          options={editMedication ? [selectedMedication] : medicines}
          getOptionLabel={(option) => `${option.medicineName}`}
          isOptionEqualToValue={(option, value) =>
            option.medicineId === value.medicineId
          }
          value={editMedication ? selectedMedication : null}
          onChange={(event, value) => {}}
          width={"100%"}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Chọn thuốc"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => setQuery("")}
            />
          )}
          sx={{
            flex: 2,
          }}
        />
        <TextField
          fullWidth
          placeholder="Chỉ định"
          value={editMedication ? selectedMedication.prescription : ""}
          style={{ marginTop: "16px", marginBottom: "16px" }}
          InputProps={{
            style: { padding: "4px 0px" },
          }}
        />
        <TextField
          fullWidth
          placeholder="Liều lượng 1 lần"
          value={editMedication ? selectedMedication.dosage : ""}
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
                  checked={
                    editMedication
                      ? selectedMedication.time.includes("MORNING")
                      : selectedBuoi.MORNING
                  }
                  onChange={() => handleBuoiChange("MORNING")}
                  name="MORNING"
                />
              }
              label="Sáng"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    editMedication
                      ? selectedMedication.time.includes("AFTERNOON")
                      : selectedBuoi.AFTERNOON
                  }
                  onChange={() => handleBuoiChange("AFTERNOON")}
                  name="AFTERNOON"
                />
              }
              label="Trưa"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    editMedication
                      ? selectedMedication.time.includes("EVENING")
                      : selectedBuoi.EVENING
                  }
                  onChange={() => handleBuoiChange("EVENING")}
                  name="EVENING"
                />
              }
              label="Chiều"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    editMedication
                      ? selectedMedication.time.includes("NIGHT")
                      : selectedBuoi.NIGHT
                  }
                  onChange={() => handleBuoiChange("NIGHT")}
                  name="NIGHT"
                />
              }
              label="Tối"
            />
          </FormGroup>
        </Stack>
      </ModalMedication>
      <ModalMedication
        openModal={deleteMedication}
        setOpenModal={setDeleteMedication}
        modalTitle="Dừng uống thuốc"
        iconTitle={<DoDisturbOnIcon fontSize="18px" />}
        buttonAPIName="Hôm nay"
        secondButtonAPIName="Ngày mai"
      >
        <Typography variant="body2" fontSize={"14px"}>
          Bạn có chắc chắn muốn dừng uống thuốc{" "}
          <strong
            style={{
              textTransform: "capitalize",
            }}
          >
            {selectedMedication.name}
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
