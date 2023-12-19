import styled from "@emotion/styled";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import React from "react";

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
  const { row, index } = props;
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
              disabled
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
              disabled
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
    </>
  );
}

function ListTestHaveDone(props) {
  const { medicalTests } = props;

  return (
    <TableContainer
      sx={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption
          style={{
            textAlign: "right",
          }}
        >
          Danh sách các xét nghiệm đã thực hiện
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
          {medicalTests?.map((row, index) => (
            <Row
              key={row.medicalTestId}
              row={row}
              index={index}
              patientInfo={props.patientInfo}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListTestHaveDone;
