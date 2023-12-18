import {
  Autocomplete,
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
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import styled from "@emotion/styled";
const medicalExaminationService = [
  { label: "Siêu âm tim", value: "Siêu âm tim" },
  { label: "Siêu âm", value: "Siêu âm bụng" },
  { label: "Xét nghiệm máu", value: "Xét nghiệm máu" },
  { label: "Xét nghiệm nước tiểu", value: "Xét nghiệm nước tiểu" },
  { label: "Chụp X-quang", value: "Chụp X-quang" },
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

function ListTestToDo(props) {
  const [hiddenButtonAdd, setHidden] = React.useState(false);
  const [service, setService] = React.useState("");
  const [rows, setRows] = React.useState([
    { id: 1, name: "Siêu âm", description: "Siêu âm ổ bụng" },
    { id: 2, name: "Chụp X-quang", description: "Chụp X-quang phổi" },
    { id: 3, name: "Siêu âm tim", description: "Siêu âm tâm thất và tâm nhĩ" },
  ]);

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
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
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Autocomplete
                  size="medium"
                  disablePortal
                  id="combo-box-demo"
                  options={medicalExaminationService}
                  placeholder="Tên dịch vụ"
                  sx={{ width: "300px" }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Favorites" />
                  )}
                />
                <CustomTextField
                  size="medium"
                  variant="outlined"
                  id="outlined-basic"
                  placeholder="Chỉ định thực hiện"
                  sx={{ width: "320px" }}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={() => {
                    setHidden(false);
                    setService("");
                  }}
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
            <TableRow key={row.id}>
              <TableCell align="center" width={"10%"}>
                {index + 1}
              </TableCell>
              <TableCell align="left" width={"30%"}>
                {row.name}
              </TableCell>
              <TableCell align="left" width={"35%"}>
                {row.description}
              </TableCell>
              <TableCell align="center" width={"25%"}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <IconButton
                    size="small"
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

export default ListTestToDo;
