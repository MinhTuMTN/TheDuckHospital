import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import styled from "@emotion/styled";
import {
  createMedicalTest,
  deleteMedicalTest,
  getAllMedicalTests,
  getMedicalTestByMedicalRecordId,
} from "../../services/doctor/MedicalTestServices";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useReactToPrint } from "react-to-print";
import Invoice from "./Invoice";
import { useAuth } from "../../auth/AuthProvider";

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

function Row(props) {
  const { row, index, handleDeleteTest } = props;
  const { fullName } = useAuth();
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <TableRow key={row.medicalTestId}>
        <TableCell align="center" width={"10%"}>
          {index + 1}
        </TableCell>
        <TableCell align="left" width={"30%"}>
          {row.serviceName}
        </TableCell>
        <TableCell align="left" width={"35%"}>
          {row.note}
        </TableCell>
        <TableCell align="center" width={"25%"}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <IconButton
              size="small"
              disabled={!row.result}
              sx={{
                width: "34px",
                height: "34px",
                color: "#396cf0",
                backgroundColor: "rgba(57,108,240,.1)",
                border: "1px solid rgba(57,108,240,.1)",
                padding: "10px",
                boxShadow: "0 3px 5px 0 rgba(57,108,240,.3)",
                "&:hover": {
                  backgroundColor: "rgba(57,108,240,.1)",
                  color: "#396cf0",
                },
              }}
              onClick={() => {
                window.open(row.result, "_blank");
              }}
            >
              <FileDownloadOutlinedIcon
                sx={{
                  fontSize: "16px",
                }}
              />
            </IconButton>

            <IconButton
              size="small"
              sx={{
                width: "34px",
                height: "34px",
                color: "#53c797",
                backgroundColor: "rgba(83,199,151,.1)",
                border: " 1px solid rgba(83,199,151,.1)",
                padding: "10px",
                boxShadow: "0 3px 5px 0 rgba(83,199,151,.3)",
                "&:hover": {
                  backgroundColor: "rgba(83,199,151,.1)",
                  color: "#4caf50",
                },
              }}
              onClick={handlePrint}
            >
              <PrintOutlinedIcon
                sx={{
                  fontSize: "16px",
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                width: "34px",
                height: "34px",
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
              onClick={() => handleDeleteTest(row.medicalTestId)}
            >
              <DeleteOutlineOutlinedIcon
                sx={{
                  fontSize: "16px",
                }}
              />
            </IconButton>
          </Stack>
        </TableCell>
        <TableCell align="center" width={"0%"}>
          <Box sx={{ display: "none" }}>
            <Invoice
              ref={componentRef}
              patientInfo={props.patientInfo}
              doctorName={fullName}
              medicalTest={row}
            />
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}

function ListTestToDo(props) {
  const [hiddenButtonAdd, setHidden] = React.useState(false);
  const { medicalRecordId } = useParams();
  const [selectedTest, setSelectedTest] = React.useState({
    service: null,
    serviceNote: "",
  });
  const [testServices, setTestServices] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    const handleGetAllTest = async () => {
      const response = await getAllMedicalTests();
      if (response.success) setTestServices(response.data.data);
    };

    const handleGetMedicalTest = async () => {
      const response = await getMedicalTestByMedicalRecordId(medicalRecordId);
      if (response.success) setRows(response.data.data);
    };

    handleGetMedicalTest();
    handleGetAllTest();
  }, [medicalRecordId]);

  const handleAddTest = async () => {
    const response = await createMedicalTest(medicalRecordId, {
      serviceId: selectedTest.service.serviceId,
      note: selectedTest.serviceNote,
    });
    if (response.success) {
      setRows(response.data.data);
      setSelectedTest({ service: null, serviceNote: "" });
      setHidden(false);
    } else {
      enqueueSnackbar("Thêm xét nghiệm thất bại", { variant: "error" });
    }
  };

  const handleDeleteTest = async (medicalTestId) => {
    const response = await deleteMedicalTest(medicalRecordId, medicalTestId);
    if (response.success) {
      setRows(response.data.data);
    } else {
      enqueueSnackbar("Xóa xét nghiệm thất bại", { variant: "error" });
    }
  };

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
              Thêm xét nghiệm
            </Button>
          ) : (
            <>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{
                  "& .MuiAutocomplete-option": {
                    textAlign: "start",
                  },
                }}
              >
                <Autocomplete
                  size="medium"
                  disablePortal
                  id="combo-box-demo"
                  options={testServices}
                  getOptionLabel={(option) => option.serviceName}
                  placeholder="Tên dịch vụ"
                  value={selectedTest.service}
                  onChange={(event, newValue) => {
                    setSelectedTest({
                      ...selectedTest,
                      service: newValue,
                    });
                  }}
                  sx={{
                    width: "300px",
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Xét nghiệm" />
                  )}
                />
                <CustomTextField
                  size="medium"
                  variant="outlined"
                  id="outlined-basic"
                  placeholder="Chỉ định thực hiện"
                  autoComplete="off"
                  sx={{ width: "320px" }}
                  value={selectedTest.serviceNote}
                  onChange={(e) =>
                    setSelectedTest({
                      ...selectedTest,
                      serviceNote: e.target.value,
                    })
                  }
                />
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                  }}
                  disabled={!selectedTest.service}
                  onClick={handleAddTest}
                >
                  Thêm
                </Button>
              </Stack>
            </>
          )}
        </caption>

        <TableHead>
          <TableRow>
            <StyledTableCell align="center" width={"10%"}>
              #
            </StyledTableCell>

            <StyledTableCell align="left" width={"30%"}>
              Tên dịch vụ
            </StyledTableCell>
            <StyledTableCell align="left" width={"40%"}>
              Chỉ định thực hiện
            </StyledTableCell>
            <StyledTableCell align="center" width={"20%"}>
              Tuỳ chọn
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row
              key={row.medicalTestId}
              row={row}
              index={index}
              handleDeleteTest={handleDeleteTest}
              patientInfo={props.patientInfo}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListTestToDo;
