import styled from "@emotion/styled";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import { getMedicineUnit } from "../../services/doctor/MedicineServices";
import FormatCurrency from "../General/FormatCurrency";

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

function OldPrescription(props) {
  const { prescriptionItems } = props;

  return (
    <TableContainer
      sx={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption style={{ width: "100%", textAlign: "right" }}>
          Danh sách các thuốc đã kê
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
          </TableRow>
        </TableHead>
        <TableBody>
          {prescriptionItems?.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell align="center">
                {index < 9 ? `0${index + 1}` : index + 1}
              </TableCell>
              <TableCell align="left">{row?.medicine?.medicineName}</TableCell>
              <TableCell align="left">{row?.dosageInstruction}</TableCell>
              <TableCell align="right">
                x {row.quantity} {getMedicineUnit(row?.medicine?.unit)}
              </TableCell>
              <TableCell align="right">
                <FormatCurrency amount={row.price} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OldPrescription;
