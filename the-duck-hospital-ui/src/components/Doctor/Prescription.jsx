import styled from "@emotion/styled";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Autocomplete,
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
import React, { useCallback, useState } from "react";
const medicines = [
  { label: "Paracetamol", value: "Paracetamol" },
  { label: "Oresol", value: "Oresol" },
  { label: "Panadol extra", value: "Panadol extra" },
  { label: "Salonpas", value: "Salonpas" },
  { label: "NACL 9%", value: "NACL 9%" },
];

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
  const [hiddenButtonAdd, setHidden] = React.useState(false);
  const [rows, setRows] = React.useState([
    {
      id: 1,
      medicineName: "Eugica",
      description: "Sáng uống 1 viên, tối uống 1 viên",
      quantity: 10,
      unit: "viên",
      total: 10000,
    },
    {
      id: 2,
      medicineName: "Sữa tẩy trang cho da nhạy cảm",
      description: "TẨY TRANG",
      quantity: 1,
      unit: "Chai",
      total: 244000,
    },
  ]);

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
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

  return (
    <TableContainer
      sx={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption style={{ width: "100%", textAlign: "right" }}>
          {hiddenButtonAdd === false ? (
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
              }}
              onClick={() => setHidden(true)}
            >
              Thêm thuốc
            </Button>
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
                        width={"100%"}
                        placeholder="Tên dịch vụ"
                        renderInput={(params) => (
                          <TextField {...params} placeholder="Thuốc" />
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
                        value={totalForOneMedicine}
                        onChange={(e) => setTotalForOneMedicine(e.target.value)}
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
                    }}
                    onClick={() => {
                      setHidden(false);
                      setMedicineOneTime("");
                      setTotalForOneMedicine("");
                      setNoteForOneMedicine("");
                    }}
                  >
                    Thêm
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
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell align="center">
                {index < 9 ? `0${index + 1}` : index + 1}
              </TableCell>
              <TableCell align="left">{row.medicineName}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="right">
                x {row.quantity} {row.unit}
              </TableCell>
              <TableCell align="right">{row.total}</TableCell>
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
                    onClick={() => handleDeleteRow(row.id)}
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
