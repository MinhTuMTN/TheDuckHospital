import styled from "@emotion/styled";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "../../auth/AuthProvider";
import {
  addMedicine,
  deleteMedicine,
  getMedicineItems,
  searchMedicine,
} from "../../services/doctor/MedicineServices";
import { getMedicineUnit } from "../../utils/medicineUtils";
import FormatCurrency from "../General/FormatCurrency";
import PrescriptionInvoice from "./PrescriptionInvoice";
import PropTypes from "prop-types";
import {
  addDischargeMedicine,
  deleteDischargeMedicine,
  getDischargeMedicine,
} from "../../services/nurse/HospitalizeServices";
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "4px 4px",
  },
}));

const cellStyle = {
  padding: "12px 16px",
  color: "#1C252E",
};

const headCellStyle = {
  ...cellStyle,
  backgroundColor: "#f4f6f8",
};

function Prescription(props) {
  const { patientInfo, diagnostic, role, hospitalizationId } = props;
  const { fullName } = useAuth();
  const { medicalRecordId } = useParams();
  const [hiddenButtonAdd, setHidden] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [medicines, setMedicines] = React.useState([]);
  const [prescriptionItems, setPrescriptionItems] = React.useState([]);
  const [selectedMedicineId, setSelectedMedicineId] = React.useState(null);
  const [prescriptionCode, setPrescriptionCode] = React.useState("");

  const handleDeleteRow = async (id) => {
    let response;
    if (role === "doctor") {
      response = await deleteMedicine(medicalRecordId, id);
    } else {
      response = await deleteDischargeMedicine(hospitalizationId, id);
    }
    if (response.success) {
      setPrescriptionItems(response.data.data);
    } else {
      enqueueSnackbar("Xóa thất bại", { variant: "error" });
    }
  };

  const [totalForOneMedicine, setTotalForOneMedicine] = useState(0);
  const [noteForOneMedicine, setNoteForOneMedicine] = useState("");
  const [daysForOneMedicine, setDaysForOneMedicine] = useState();
  const [medicineOneTime, setMedicineOneTime] = useState();
  const [selectedBuoi, setSelectedBuoi] = useState({
    sang: false,
    trua: false,
    chieu: false,
    toi: false,
  });

  const handleBuoiChange = (buoi) => {
    setSelectedBuoi((prevSelected) => ({
      ...prevSelected,
      [buoi]: !prevSelected[buoi],
    }));
  };

  const calculateTotal = useCallback(() => {
    const selectedBuoiCount =
      Object.values(selectedBuoi).filter(Boolean).length;
    const total = selectedBuoiCount * daysForOneMedicine * medicineOneTime;
    setTotalForOneMedicine(total);
  }, [daysForOneMedicine, medicineOneTime, selectedBuoi]);

  React.useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  useEffect(() => {
    const handleGetMedicine = async () => {
      const response = await searchMedicine(query);
      if (response.success) {
        setMedicines(response.data.data);
      }
    };
    handleGetMedicine();
  }, [query]);

  const handleAddMedicine = async (role) => {
    let note = "";

    if (noteForOneMedicine) note = `${noteForOneMedicine}`;
    else {
      if (selectedBuoi.sang) note += "Sáng " + medicineOneTime + " viên, ";
      if (selectedBuoi.trua) note += "Trưa " + medicineOneTime + " viên, ";
      if (selectedBuoi.chieu) note += "Chiều " + medicineOneTime + " viên, ";
      if (selectedBuoi.toi) note += "Tối " + medicineOneTime + " viên, ";

      note = note.slice(0, -2);
    }

    if (!selectedMedicineId) {
      enqueueSnackbar("Vui lòng chọn thuốc", { variant: "error" });
      return;
    }

    if (
      !totalForOneMedicine ||
      typeof totalForOneMedicine !== "number" ||
      totalForOneMedicine <= 0
    ) {
      console.log(!totalForOneMedicine);
      enqueueSnackbar("Vui lòng nhập số lượng", { variant: "error" });
      return;
    }

    const data = {
      medicineId: selectedMedicineId,
      quantity: totalForOneMedicine,
      note: note,
      timesPerDay: [
        selectedBuoi.sang,
        selectedBuoi.trua,
        selectedBuoi.chieu,
        selectedBuoi.toi,
      ].filter(Boolean).length,
      days: daysForOneMedicine,
      quantityPerTime: medicineOneTime || 0,
      morning: selectedBuoi.sang,
      noon: selectedBuoi.trua,
      afternoon: selectedBuoi.chieu,
      evening: selectedBuoi.toi,
    };

    let response;
    if (role === "doctor") {
      response = await addMedicine(medicalRecordId, data);
    } else {
      response = await addDischargeMedicine(hospitalizationId, data);
    }

    if (response.success) {
      setPrescriptionItems(response.data.data);
      setHidden(false);
      setMedicineOneTime("");
      setSelectedMedicineId(null);
      setTotalForOneMedicine("");
      setNoteForOneMedicine("");
    } else {
      enqueueSnackbar("Thêm thuốc thất bại", { variant: "error" });
    }
  };

  useEffect(() => {
    const handleGetPrescription = async () => {
      let response;
      if (role === "doctor") {
        response = await getMedicineItems(medicalRecordId);
      } else {
        response = await getDischargeMedicine(hospitalizationId);
      }
      if (response.success) {
        setPrescriptionItems(response.data.data);
        setPrescriptionCode(response.data.data[0]?.prescriptionCode);
      }
    };
    handleGetPrescription();
  }, [medicalRecordId, role, hospitalizationId]);

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <TableContainer
      sx={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Table sx={{ minWidth: 650 }} padding="none" aria-label="caption table">
        <caption
          style={{
            width: "100%",
            textAlign: "right",
            borderTop: "0.8px solid #dfdfdf",
          }}
        >
          {hiddenButtonAdd === false ? (
            <>
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  mr: 1,
                  display: prescriptionItems.length > 0 ? "" : "none",
                }}
                color="normal2"
                onClick={handlePrint}
              >
                In toa thuốc
              </Button>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                }}
                onClick={() => setHidden(true)}
              >
                Thêm thuốc
              </Button>
              <Box
                sx={{
                  display: "none",
                }}
              >
                <PrescriptionInvoice
                  ref={componentRef}
                  patientInfo={role === "doctor" ? patientInfo : null}
                  dischargeInfo={role === "nurse" ? patientInfo : null}
                  prescriptionItems={prescriptionItems}
                  prescriptionCode={prescriptionCode}
                  doctorName={
                    role === "doctor"
                      ? fullName
                      : patientInfo?.dischargeDoctorName
                  }
                  diagnostic={diagnostic}
                />
              </Box>
            </>
          ) : (
            <>
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"flex-start"}
              >
                <Grid item xs={12} md={10.7}>
                  <Stack direction={"column"} spacing={2}>
                    <Stack direction={"row"} spacing={2} display={"flex"}>
                      <Autocomplete
                        size="medium"
                        disablePortal
                        id="combo-box-demo"
                        options={medicines}
                        getOptionLabel={(option) =>
                          `${option.medicineName} (${getMedicineUnit(
                            option.unit
                          )})`
                        }
                        disableClearable
                        isOptionEqualToValue={(option, value) =>
                          option.medicineId === value.medicineId
                        }
                        onChange={(event, value) => {
                          setSelectedMedicineId(value.medicineId);
                        }}
                        width={"100%"}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Thuốc"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onBlur={() => setQuery("")}
                          />
                        )}
                        sx={{
                          flex: 2,
                        }}
                      />
                      <CustomTextField
                        sx={{
                          flex: 1,
                        }}
                        size="medium"
                        type="number"
                        variant="outlined"
                        id="outlined-basic"
                        placeholder="Số lượng"
                        autoComplete="off"
                        value={Number(totalForOneMedicine) || ""}
                        onChange={(e) =>
                          setTotalForOneMedicine(Number(e.target.value))
                        }
                      />
                    </Stack>
                    <CustomTextField
                      sx={{
                        flex: 1,
                      }}
                      size="medium"
                      variant="outlined"
                      id="outlined-basic"
                      placeholder="Ghi chú"
                      autoComplete="off"
                      value={noteForOneMedicine}
                      onChange={(e) => setNoteForOneMedicine(e.target.value)}
                    />
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <CustomTextField
                        sx={{
                          flex: 2,
                        }}
                        size="medium"
                        type="number"
                        variant="outlined"
                        placeholder="Số ngày"
                        autoComplete="off"
                        value={daysForOneMedicine}
                        onChange={(e) => setDaysForOneMedicine(e.target.value)}
                      />
                      <CustomTextField
                        sx={{
                          flex: 1,
                        }}
                        size="medium"
                        type="number"
                        variant="outlined"
                        placeholder="Liều lượng 1 buổi"
                        autoComplete="off"
                        value={medicineOneTime}
                        onChange={(e) => setMedicineOneTime(e.target.value)}
                      />
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <Typography
                        sx={{
                          fontSize: "17px",
                          fontWeight: "450",
                        }}
                      >
                        Buổi :
                      </Typography>
                      <FormGroup
                        sx={{
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedBuoi.sang}
                              onChange={() => handleBuoiChange("sang")}
                            />
                          }
                          label="Sáng"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedBuoi.trua}
                              onChange={() => handleBuoiChange("trua")}
                            />
                          }
                          label="Trưa"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedBuoi.chieu}
                              onChange={() => handleBuoiChange("chieu")}
                            />
                          }
                          label="Chiều"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedBuoi.toi}
                              onChange={() => handleBuoiChange("toi")}
                            />
                          }
                          label="Tối"
                        />
                      </FormGroup>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={1.3}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      width: "85%",
                    }}
                    onClick={() => {
                      handleAddMedicine(role);
                    }}
                  >
                    Thêm
                  </Button>
                  <Button
                    variant="outlined"
                    color="delete"
                    sx={{
                      textTransform: "none",
                      width: "85%",
                      mt: 1,
                    }}
                    onClick={() => setHidden(false)}
                  >
                    Hủy
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </caption>

        <TableHead style={headCellStyle}>
          <TableRow>
            {["#", "Tên thuốc", "Số lượng", "Đơn giá", ""].map(
              (text, index) => (
                <TableCell
                  key={index}
                  align={
                    index === 0 || index === 4
                      ? "center"
                      : index > 1
                      ? "right"
                      : "left"
                  }
                  style={{
                    ...cellStyle,
                    width:
                      index === 0
                        ? "5%"
                        : index === 1
                        ? "55%"
                        : index === 4
                        ? "10%"
                        : "15%",
                    color: "#637381",
                    fontSize: "14px",
                  }}
                >
                  {text}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {prescriptionItems.map((item, index) => (
            <TableRow
              key={item.prescriptionItemId}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                align="left"
                style={cellStyle}
              >
                {index < 9 ? `0${index + 1}` : index + 1}
              </TableCell>

              <TableCell align="left" style={{ ...cellStyle }}>
                <Stack direction={"column"}>
                  <Typography>{item.medicine?.medicineName}</Typography>
                  <Typography variant="caption">
                    {item.dosageInstruction}
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell align="right" style={{ ...cellStyle }}>
                x {item.quantity} {getMedicineUnit(item.medicine?.unit)}
              </TableCell>
              <TableCell align="right" style={{ ...cellStyle }}>
                <FormatCurrency
                  amount={item.price}
                  showCurrencySymbol={false}
                />
              </TableCell>
              <TableCell align="center" style={{ ...cellStyle }}>
                <Stack direction={"row"} justifyContent={"center"}>
                  <IconButton
                    size="small"
                    sx={{
                      width: "30px",
                      height: "30px",
                      color: "#f0735a",
                      backgroundColor: "rgba(240,115,90,.1)",
                      border: " 1px solid rgba(240,115,90,.1)",
                      padding: "10px",
                      boxShadow: "0 3px 5px 0 rgba(240,115,90,.3)",
                      "&:hover": {
                        backgroundColor: "rgba(240,115,90,.1)",
                        color: "#f0735a",
                      },
                    }}
                    onClick={() => handleDeleteRow(item.prescriptionItemId)}
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{
                        fontSize: "16px",
                      }}
                    />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
Prescription.defaultProps = {
  role: "doctor",
};
Prescription.propTypes = {
  patientInfo: PropTypes.object,
  role: PropTypes.string,
};
export default Prescription;
