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
  tableCellClasses,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  addMedicine,
  deleteMedicine,
  getMedicineItems,
  getMedicineUnit,
  searchMedicine,
} from "../../services/doctor/MedicineServices";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import FormatCurrency from "../General/FormatCurrency";
import PrescriptionInvoice from "./PrescriptionInvoice";
import { useAuth } from "../../auth/AuthProvider";
import { useReactToPrint } from "react-to-print";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "4px 4px",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F4F6F8",
    color: theme.palette.text.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: "bold",
  },
}));

function Prescription(props) {
  const { patientInfo, diagnostic } = props;
  const { fullName } = useAuth();
  const { medicalRecordId } = useParams();
  const [hiddenButtonAdd, setHidden] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [medicines, setMedicines] = React.useState([]);
  const [prescriptionItems, setPrescriptionItems] = React.useState([]);
  const [selectedMedicineId, setSelectedMedicineId] = React.useState(null);
  const [prescriptionCode, setPrescriptionCode] = React.useState("");

  const handleDeleteRow = async (id) => {
    const response = await deleteMedicine(medicalRecordId, id);
    if (response.success) {
      setPrescriptionItems(response.data.data);
    } else {
      enqueueSnackbar("Xóa thất bại", { variant: "error" });
    }
  };

  const [totalForOneMedicine, setTotalForOneMedicine] = useState(0);
  const [noteForOneMedicine, setNoteForOneMedicine] = useState("");
  const [daysForOneMedicine, setDaysForOneMedicine] = useState(0);
  const [medicineOneTime, setMedicineOneTime] = useState(0);
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

  // Update the total whenever daysForOneMedicine, medicineOneTime, or selectedBuoi changes
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

  const handleAddMedicine = async () => {
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

    const response = await addMedicine(medicalRecordId, data);
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
      const response = await getMedicineItems(medicalRecordId);
      if (response.success) {
        setPrescriptionItems(response.data.data);
        setPrescriptionCode(response.data.data[0]?.prescriptionCode);
      }
    };
    handleGetPrescription();
  }, [medicalRecordId]);

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
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption style={{ width: "100%", textAlign: "right" }}>
          {hiddenButtonAdd === false ? (
            <>
              <Button
                variant="outlined"
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
                  patientInfo={patientInfo}
                  prescriptionItems={prescriptionItems}
                  prescriptionCode={prescriptionCode}
                  doctorName={fullName}
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
                          flex: 1,
                        }}
                        size="medium"
                        type="number"
                        variant="outlined"
                        id="outlined-basic"
                        placeholder="Số ngày"
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
                        id="outlined-basic"
                        placeholder="Liều lượng 1 buổi"
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
                      handleAddMedicine();
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

        <TableHead>
          <TableRow>
            <StyledTableCell align="center" width={"5%"}>
              #
            </StyledTableCell>

            <StyledTableCell align="left" width={"25%"}>
              Tên thuốc
            </StyledTableCell>
            <StyledTableCell align="left" width={"35%"}>
              Chỉ định sử dụng
            </StyledTableCell>
            <StyledTableCell align="right" width={"15%"}>
              Số lượng
            </StyledTableCell>
            <StyledTableCell align="right" width={"15%"}>
              Đơn giá
            </StyledTableCell>
            <StyledTableCell align="center" width={"5%"} />
          </TableRow>
        </TableHead>
        <TableBody>
          {prescriptionItems.map((item, index) => (
            <TableRow key={item.prescriptionItemId}>
              <TableCell align="center">
                {index < 9 ? `0${index + 1}` : index + 1}
              </TableCell>
              <TableCell align="left">{item.medicine?.medicineName}</TableCell>
              <TableCell align="left">{item.dosageInstruction}</TableCell>
              <TableCell align="right">
                x {item.quantity} {getMedicineUnit(item.medicine?.unit)}
              </TableCell>
              <TableCell align="right">
                <FormatCurrency amount={item.price} />
              </TableCell>
              <TableCell align="center">
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

export default Prescription;
